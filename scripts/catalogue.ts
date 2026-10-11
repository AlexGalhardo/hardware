import { productExternalId } from "../lib/affiliate-catalogue";
import { type CatalogueProduct, storeLinks } from "../lib/affiliate-links";
import { categories, getProductsByCategory } from "../lib/data";

/** Every product page of the site, in the shape the links dashboard receives. */
export async function buildCatalogue(): Promise<CatalogueProduct[]> {
	const catalogue: CatalogueProduct[] = [];
	for (const category of categories) {
		for (const product of await getProductsByCategory(category.id)) {
			const externalId = productExternalId(category.id, product.id);
			catalogue.push({
				externalId,
				name: `${product.brand} ${product.name}`.trim().slice(0, 200),
				pageUrl: externalId,
				category: category.id,
				links: storeLinks(product),
			});
		}
	}
	return catalogue;
}
