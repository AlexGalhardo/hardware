// Route handlers called directly, with the session replaced and the store pointed at a scratch folder.
import { afterAll, beforeEach, describe, expect, mock, test } from "bun:test";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { blobSha } from "@/lib/admin/store";

let admin: { name: string; email: string } | null = null;
mock.module("@/lib/admin/auth", () => ({ getAdmin: async () => admin }));

const root = mkdtempSync(path.join(tmpdir(), "tudohardware-api-"));
process.env.DATA_ROOT = root;
delete process.env.GITHUB_TOKEN;
delete process.env.VERCEL;
afterAll(() => rmSync(root, { recursive: true, force: true }));

const { GET: list, POST: create } = await import("./products/[category]/route");
const { PUT: update, DELETE: remove } = await import("./products/[category]/[productId]/route");
const { GET: exportFile } = await import("./export/route");

const file = path.join(root, "data", "smartphones.json");
const product = (id: string) => ({
	id,
	name: `Produto ${id}`,
	brand: "Marca",
	image: "https://img.example.com/p.jpg",
	mercadolivreUrl: "https://mercadolivre.com/sec/abc",
});
const sha = (): string => blobSha(readFileSync(file, "utf8"));
const ids = (): string[] => (JSON.parse(readFileSync(file, "utf8")) as { id: string }[]).map((p) => p.id);
const request = (method: string, body?: unknown): Request =>
	new Request("http://localhost/api/admin/products/smartphones", {
		method,
		body: body === undefined ? undefined : typeof body === "string" ? body : JSON.stringify(body),
	});
const category = (name = "smartphones") => ({ params: Promise.resolve({ category: name }) });
const item = (productId: string, name = "smartphones") => ({ params: Promise.resolve({ category: name, productId }) });

beforeEach(() => {
	admin = { name: "Admin", email: "admin@example.com" };
	mkdirSync(path.join(root, "data"), { recursive: true });
	writeFileSync(file, `${JSON.stringify([product("a"), product("b")], null, "\t")}\n`);
});

describe("admin API", () => {
	test("every route answers 401 without an admin session and changes nothing", async () => {
		admin = null;
		const before = sha();
		const responses = [
			await list(request("GET"), category()),
			await create(request("POST", { sha: before, product: product("c") }), category()),
			await update(request("PUT", { sha: before, product: product("a") }), item("a")),
			await remove(request("DELETE", { sha: before }), item("a")),
			await exportFile(new Request("http://localhost/api/admin/export")),
		];
		expect(responses.map((response) => response.status)).toEqual([401, 401, 401, 401, 401]);
		expect(sha()).toBe(before);
	});

	test("lists, creates, updates and deletes through the store", async () => {
		const listed = (await (await list(request("GET"), category())).json()) as {
			products: { id: string }[];
			sha: string;
		};
		expect(listed.products.map((p) => p.id)).toEqual(["a", "b"]);
		expect(listed.sha).toBe(sha());

		const created = await create(request("POST", { sha: sha(), product: product("c") }), category());
		expect(created.status).toBe(201);
		const updated = await update(
			request("PUT", { sha: sha(), product: { ...product("a"), name: "Novo nome" } }),
			item("a"),
		);
		expect(updated.status).toBe(200);
		expect(((await updated.json()) as { product: { name: string } }).product.name).toBe("Novo nome");
		expect((await remove(request("DELETE", { sha: sha() }), item("b"))).status).toBe(200);
		expect(ids()).toEqual(["a", "c"]);
	});

	test("maps each failure to its status", async () => {
		const current = sha();
		const cases: [Promise<Response>, number][] = [
			[list(request("GET"), category("nao-existe")), 404],
			[create(request("POST", "{oops"), category()), 400],
			[create(request("POST", { product: product("c") }), category()), 400],
			[create(request("POST", { sha: current, product: { id: "c" } }), category()), 400],
			[create(request("POST", { sha: current, product: product("a") }), category()), 400],
			[update(request("PUT", { sha: current, product: product("z") }), item("zzz")), 404],
			[remove(request("DELETE", { sha: current }), item("zzz")), 404],
			[create(request("POST", { sha: "outdated", product: product("c") }), category()), 409],
		];
		for (const [response, status] of cases) expect((await response).status).toBe(status);
		expect(ids()).toEqual(["a", "b"]);
	});

	test("exports the published catalogue as JSON by default and as CSV on request", async () => {
		const json = await exportFile(new Request("http://localhost/api/admin/export"));
		expect(json.headers.get("content-disposition")).toContain('filename="tudohardware.com-products.json"');
		const items = (await json.json()) as { externalId: string; links: unknown[] }[];
		expect(items.length).toBeGreaterThan(100);
		expect(
			items.every((entry) => entry.externalId.startsWith("https://tudohardware.com/") && entry.links.length > 0),
		).toBe(true);

		const csv = await exportFile(new Request("http://localhost/api/admin/export?format=csv"));
		expect(csv.headers.get("content-type")).toContain("text/csv");
		const lines = (await csv.text()).trimEnd().split("\n");
		expect(lines[0]).toBe("externalId,url,name,pageUrl,category,store");
		expect(lines.length - 1).toBe(items.reduce((sum, entry) => sum + entry.links.length, 0));
	});
});
