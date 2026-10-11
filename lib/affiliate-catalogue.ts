// This site's side of the links dashboard contract: how a product becomes an externalId and a button href.
// Imported by client components, so it must not import the product data.
import { affiliateHref, type Store } from "./affiliate-links";
import type { ProductCategory } from "./types";

export const SITE_URL = "https://alexgalhardo.github.io/tudohardware";
export const LINKS_DASHBOARD_URL = "https://links.lekzera.xyz";

export function productExternalId(category: ProductCategory, productId: string): string {
	return `${SITE_URL}/${category}/${productId}`;
}

export function productAffiliateHref(category: ProductCategory, productId: string, store: Store): string {
	return affiliateHref(LINKS_DASHBOARD_URL, productExternalId(category, productId), store);
}
