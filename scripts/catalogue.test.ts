import { describe, expect, test } from "bun:test";
import { LINKS_DASHBOARD_URL, productAffiliateHref, SITE_URL } from "../lib/affiliate-catalogue";
import { catalogueProblems } from "../lib/affiliate-links";
import { categories, getProductsByCategory } from "../lib/data";
import { buildCatalogue } from "./catalogue";

describe("site catalogue", () => {
	test("every product page is in the catalogue once, with at least one https store link", async () => {
		const catalogue = await buildCatalogue();
		let pages = 0;
		for (const category of categories) pages += (await getProductsByCategory(category.id)).length;
		expect(catalogue).toHaveLength(pages);
		expect(catalogueProblems(catalogue)).toEqual([]);
		for (const product of catalogue) {
			expect(product.externalId.startsWith(`${SITE_URL}/`)).toBe(true);
			expect(product.pageUrl).toBe(product.externalId);
			for (const link of product.links) expect(link.url).toMatch(/^https:\/\//);
		}
	});

	test("the externalId uses the route category, not the data file name", async () => {
		const ids = (await buildCatalogue()).map((product) => product.externalId);
		expect(ids.some((id) => id.startsWith(`${SITE_URL}/smart-tvs/`))).toBe(true);
		expect(ids.some((id) => id.startsWith(`${SITE_URL}/smartvs/`))).toBe(false);
	});

	test("a button href goes through the dashboard and matches the registered id", async () => {
		const [first] = await buildCatalogue();
		const [, , , category = "", id = ""] = first?.externalId.split("/") ?? [];
		const href = new URL(productAffiliateHref(category as never, id, "mercadolivre"));
		expect(href.origin).toBe(LINKS_DASHBOARD_URL);
		expect(href.pathname).toBe("/link");
		expect(href.searchParams.get("id")).toBe(first?.externalId ?? "");
		expect(href.searchParams.get("store")).toBe("mercadolivre");
	});
});
