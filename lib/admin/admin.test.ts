import { afterAll, beforeEach, describe, expect, test } from "bun:test";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { isAllowedAdmin } from "./allow-list";
import { CATEGORY_FILES, categoryPath, isCategory } from "./category-files";
import { deleteProduct, getProduct, listProducts, NotFoundError, saveProduct, ValidationError } from "./products";
import { blobSha, ConflictError, githubStore, localStore, StoreError } from "./store";

const root = mkdtempSync(path.join(tmpdir(), "tudohardware-admin-"));
afterAll(() => rmSync(root, { recursive: true, force: true }));

const author = { name: "Admin", email: "admin@example.com" };
const product = (id: string, extra: Record<string, unknown> = {}) => ({
	id,
	name: `Produto ${id}`,
	brand: "Marca",
	image: "https://img.example.com/p.jpg",
	mercadolivreUrl: "https://mercadolivre.com/sec/abc",
	screen: "6.1",
	...extra,
});
const file = path.join(root, "data", "smartphones.json");
const onDisk = (): { id: string }[] => JSON.parse(readFileSync(file, "utf8"));

beforeEach(() => {
	mkdirSync(path.join(root, "data"), { recursive: true });
	writeFileSync(file, `${JSON.stringify([product("a"), product("b")], null, "\t")}\n`);
});

describe("category files", () => {
	test("every category maps to a file that exists in data/", () => {
		for (const name of Object.values(CATEGORY_FILES))
			expect(() => readFileSync(path.join(process.cwd(), "data", name))).not.toThrow();
	});

	test("the category id is the route id, not the file name", () => {
		expect(categoryPath("smart-tvs")).toBe("data/smartvs.json");
		expect(isCategory("smart-tvs")).toBe(true);
		expect(isCategory("smartvs")).toBe(false);
		expect(isCategory("constructor")).toBe(false);
	});
});

describe("isAllowedAdmin", () => {
	test("only a verified e-mail on the list, ignoring case and spaces", () => {
		const list = " Dono@Example.com , outro@example.com";
		expect(isAllowedAdmin("dono@example.com", true, list)).toBe(true);
		expect(isAllowedAdmin("OUTRO@example.com ", true, list)).toBe(true);
		expect(isAllowedAdmin("dono@example.com", false, list)).toBe(false);
		expect(isAllowedAdmin("intruso@example.com", true, list)).toBe(false);
		expect(isAllowedAdmin("dono@example.com", true, "")).toBe(false);
		expect(isAllowedAdmin("", true, ",")).toBe(false);
	});
});

describe("products with the local store", () => {
	const store = localStore(root);

	test("lists the products with the hash of the file", async () => {
		const { products, sha } = await listProducts(store, "smartphones");
		expect(products.map((p) => p.id)).toEqual(["a", "b"]);
		expect(sha).toBe(blobSha(readFileSync(file, "utf8")));
		expect((await getProduct(store, "smartphones", "b")).product.name).toBe("Produto b");
		await expect(getProduct(store, "smartphones", "zzz")).rejects.toThrow(NotFoundError);
	});

	test("creates a product at the end, forcing the category and keeping the spec fields", async () => {
		const { sha } = await listProducts(store, "smartphones");
		const saved = await saveProduct(store, "smartphones", product("c", { category: "errada", ram: 8 }), {
			sha,
			author,
		});
		expect(saved).toMatchObject({ id: "c", category: "smartphones", ram: 8, screen: "6.1" });
		expect(onDisk().map((p) => p.id)).toEqual(["a", "b", "c"]);
		expect(readFileSync(file, "utf8").endsWith("]\n")).toBe(true);
	});

	test("updates in place, including a change of id", async () => {
		const { sha } = await listProducts(store, "smartphones");
		await saveProduct(store, "smartphones", product("a-novo", { name: "Renomeado" }), {
			originalId: "a",
			sha,
			author,
		});
		expect(onDisk()).toMatchObject([{ id: "a-novo", name: "Renomeado" }, { id: "b" }]);
	});

	test("refuses an id that another product has, on create and on rename", async () => {
		const { sha } = await listProducts(store, "smartphones");
		await expect(saveProduct(store, "smartphones", product("b"), { sha, author })).rejects.toThrow(ValidationError);
		await expect(saveProduct(store, "smartphones", product("b"), { originalId: "a", sha, author })).rejects.toThrow(
			"já existe",
		);
		expect(onDisk().map((p) => p.id)).toEqual(["a", "b"]);
	});

	test("refuses invalid products without touching the file", async () => {
		const { sha } = await listProducts(store, "smartphones");
		const bad: unknown[] = [
			null,
			"texto",
			product("Com Espaço"),
			product("-começa-com-hífen"),
			product("c", { name: " " }),
			product("c", { brand: "" }),
			product("c", { image: "" }),
			product("c", { mercadolivreUrl: "http://sem-https.example.com" }),
			product("c", { mercadolivreUrl: "#" }),
			product("c", { mercadolivreUrl: null }),
			product("c", { mercadolivreUrl: "", amazonUrl: "", shopeeUrl: "" }),
		];
		for (const input of bad)
			await expect(saveProduct(store, "smartphones", input, { sha, author })).rejects.toThrow(ValidationError);
		expect(onDisk().map((p) => p.id)).toEqual(["a", "b"]);
	});

	test("an empty store field is stored as null, and one https link is enough", async () => {
		const { sha } = await listProducts(store, "smartphones");
		const saved = await saveProduct(
			store,
			"smartphones",
			product("c", { mercadolivreUrl: "", amazonUrl: " https://amzn.to/x ", shopeeUrl: undefined }),
			{ sha, author },
		);
		expect(saved).toMatchObject({ mercadolivreUrl: null, amazonUrl: "https://amzn.to/x", shopeeUrl: null });
	});

	test("refuses a save made on an outdated copy of the file", async () => {
		const { sha } = await listProducts(store, "smartphones");
		await saveProduct(store, "smartphones", product("c"), { sha, author });
		await expect(saveProduct(store, "smartphones", product("d"), { sha, author })).rejects.toThrow(ConflictError);
		expect(onDisk().map((p) => p.id)).toEqual(["a", "b", "c"]);
	});

	test("deletes a product, but never the last one of a category", async () => {
		let { sha } = await listProducts(store, "smartphones");
		await expect(deleteProduct(store, "smartphones", "zzz", { sha, author })).rejects.toThrow(NotFoundError);
		await deleteProduct(store, "smartphones", "a", { sha, author });
		expect(onDisk().map((p) => p.id)).toEqual(["b"]);
		({ sha } = await listProducts(store, "smartphones"));
		await expect(deleteProduct(store, "smartphones", "b", { sha, author })).rejects.toThrow(ValidationError);
		expect(onDisk().map((p) => p.id)).toEqual(["b"]);
	});
});

describe("github store", () => {
	function fake(answers: Response[]) {
		const calls: { url: string; init: RequestInit }[] = [];
		const impl = async (url: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
			calls.push({ url: String(url), init: init ?? {} });
			const answer = answers.shift();
			if (!answer) throw new Error("no answer queued");
			return answer;
		};
		return { fetch: impl as typeof fetch, calls };
	}
	const options = { token: "ghp_test", repo: "dono/site", branch: "main" };
	const text = `${JSON.stringify([product("a")], null, "\t")}\n`;

	test("reads the raw file from the branch", async () => {
		const { fetch, calls } = fake([new Response(text)]);
		const stored = await githubStore({ ...options, fetch }).read("data/smartphones.json");
		expect(stored).toEqual({ text, sha: blobSha(text) });
		expect(calls[0]?.url).toBe("https://api.github.com/repos/dono/site/contents/data/smartphones.json?ref=main");
		expect(new Headers(calls[0]?.init.headers).get("authorization")).toBe("Bearer ghp_test");
	});

	test("a save is one commit with the message, the previous hash and the new content", async () => {
		const { fetch, calls } = fake([new Response(text), new Response("{}", { status: 200 })]);
		const store = githubStore({ ...options, fetch });
		await saveProduct(store, "smartphones", product("b"), { sha: blobSha(text), author });
		const body = JSON.parse(String(calls[1]?.init.body)) as Record<string, string>;
		expect(calls[1]?.init.method).toBe("PUT");
		expect(body.message).toBe("content: add product b in smartphones (admin@example.com)");
		expect(body).toMatchObject({ branch: "main", sha: blobSha(text) });
		const written = JSON.parse(Buffer.from(body.content ?? "", "base64").toString("utf8")) as { id: string }[];
		expect(written.map((p) => p.id)).toEqual(["a", "b"]);
	});

	test("maps a stale hash to a conflict and any other failure to a store error", async () => {
		for (const [status, error] of [
			[409, ConflictError],
			[422, ConflictError],
			[401, StoreError],
			[500, StoreError],
		] as const) {
			const { fetch } = fake([new Response("{}", { status })]);
			await expect(
				githubStore({ ...options, fetch }).write("data/x.json", "[]", "content: x", "sha"),
			).rejects.toThrow(error);
		}
		const { fetch } = fake([new Response("not found", { status: 404 })]);
		await expect(githubStore({ ...options, fetch }).read("data/x.json")).rejects.toThrow(StoreError);
	});
});
