import { describe, expect, test } from "bun:test";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

// An on-demand route (the contact API) makes Astro put the static files in dist/client.
const root = path.join(import.meta.dir, "..", "dist");
const dist = existsSync(path.join(root, "client")) ? path.join(root, "client") : root;

function htmlFiles(dir: string): string[] {
	return readdirSync(dir).flatMap((entry) => {
		const full = path.join(dir, entry);
		if (statSync(full).isDirectory()) return entry === "_astro" ? [] : htmlFiles(full);
		return full.endsWith(".html") ? [full] : [];
	});
}

// Runs against the output of `bunx astro build`; skipped when there is no build.
describe.skipIf(!existsSync(path.join(dist, "index.html")))("astro build output", () => {
	const files = htmlFiles(dist);
	// Home + 24 categories + 653 products + 3 text pages + the contact page.
	const minimum = 1 + 24 + 653 + 4;

	test("renders every public page", () => {
		expect(files.length).toBeGreaterThanOrEqual(minimum);
	});

	test("every page has a title and a canonical link, and none references Next", () => {
		for (const file of files) {
			const html = readFileSync(file, "utf8");
			expect(html, file).toMatch(/<title>[^<]+<\/title>/);
			if (!file.endsWith("404.html")) expect(html, file).toContain('rel="canonical"');
			expect(html, file).not.toContain("/_next/");
		}
	}, 60_000);
});
