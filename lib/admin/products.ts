// Admin service: every product write goes through here, whatever the store behind it.
import { z } from "zod";
import { isAffiliateUrl } from "../affiliate-links";
import type { ProductCategory } from "../types";
import { categoryPath } from "./category-files";
import { type DataStore, getStore, StoreError } from "./store";

export class ValidationError extends Error {
	constructor(public readonly issues: string[]) {
		super(issues.join("; "));
	}
}
export class NotFoundError extends Error {}

const storeUrl = z
	.union([z.string().trim(), z.null()])
	.optional()
	.transform((value) => (value ? value : null))
	.refine((value) => value === null || isAffiliateUrl(value), "Use um endereço https://");

/**
 * Only what every category shares is checked; the spec fields differ per category and are kept as sent.
 * The id is part of the page URL and of the product's id in the links dashboard.
 */
export const productSchema = z
	.looseObject({
		id: z
			.string()
			.trim()
			.regex(/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/, "Id: minúsculas, números, hífen e ponto"),
		name: z.string().trim().min(1, "Nome obrigatório"),
		brand: z.string().trim().min(1, "Marca obrigatória"),
		image: z.string().trim().min(1, "Imagem obrigatória"),
		mercadolivreUrl: storeUrl,
		amazonUrl: storeUrl,
		shopeeUrl: storeUrl,
	})
	// Every product page shows store buttons and the build refuses a product without one.
	.refine((product) => product.mercadolivreUrl || product.amazonUrl || product.shopeeUrl, {
		message: "Informe ao menos um link de loja",
		path: ["mercadolivreUrl"],
	});

export type StoredProduct = z.infer<typeof productSchema>;

export interface ProductList {
	products: StoredProduct[];
	sha: string;
}

export interface Author {
	name: string;
	email: string;
}

const serialize = (products: unknown[]): string => `${JSON.stringify(products, null, "\t")}\n`;

function parseList(text: string, file: string): StoredProduct[] {
	const data: unknown = JSON.parse(text);
	if (!Array.isArray(data)) throw new Error(`${file} is not a JSON array`);
	// Existing files hold fields this schema does not know; they are read as they are and validated on save.
	return data as StoredProduct[];
}

/** For pages: the list, or the reason the store could not be read (missing token, GitHub down). */
export async function tryListProducts(category: ProductCategory): Promise<ProductList | { error: string }> {
	try {
		return await listProducts(getStore(), category);
	} catch (error) {
		if (error instanceof StoreError) return { error: error.message };
		throw error;
	}
}

export async function listProducts(store: DataStore, category: ProductCategory): Promise<ProductList> {
	const file = categoryPath(category);
	const { text, sha } = await store.read(file);
	return { products: parseList(text, file), sha };
}

export async function getProduct(
	store: DataStore,
	category: ProductCategory,
	id: string,
): Promise<{ product: StoredProduct; sha: string }> {
	const { products, sha } = await listProducts(store, category);
	const product = products.find((candidate) => candidate.id === id);
	if (!product) throw new NotFoundError(`Produto ${id} não existe em ${category}.`);
	return { product, sha };
}

export interface SaveOptions {
	/** Id the product had when it was opened. Absent when creating. */
	originalId?: string;
	/** Hash of the file as the editor saw it. */
	sha: string;
	author: Author;
}

/** Creates a product, or replaces the one that had `originalId`, keeping its position in the list. */
export async function saveProduct(
	store: DataStore,
	category: ProductCategory,
	input: unknown,
	{ originalId, sha, author }: SaveOptions,
): Promise<StoredProduct> {
	const parsed = productSchema.safeParse(input);
	if (!parsed.success)
		throw new ValidationError(parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`));
	const product: StoredProduct = { ...parsed.data, category };

	const file = categoryPath(category);
	const products = parseList((await store.read(file)).text, file);
	const index = originalId === undefined ? -1 : products.findIndex((candidate) => candidate.id === originalId);
	if (originalId !== undefined && index === -1)
		throw new NotFoundError(`Produto ${originalId} não existe em ${category}.`);
	if (products.some((candidate, position) => candidate.id === product.id && position !== index))
		throw new ValidationError([`id: já existe um produto "${product.id}" em ${category}`]);

	if (index === -1) products.push(product);
	else products[index] = product;
	const verb = index === -1 ? "add" : "update";
	await store.write(
		file,
		serialize(products),
		`content: ${verb} product ${product.id} in ${category} (${author.email})`,
		sha,
	);
	return product;
}

export async function deleteProduct(
	store: DataStore,
	category: ProductCategory,
	id: string,
	{ sha, author }: Pick<SaveOptions, "sha" | "author">,
): Promise<void> {
	const file = categoryPath(category);
	const products = parseList((await store.read(file)).text, file);
	if (!products.some((candidate) => candidate.id === id))
		throw new NotFoundError(`Produto ${id} não existe em ${category}.`);
	const rest = products.filter((candidate) => candidate.id !== id);
	// The build refuses an empty catalogue for a category page, and an empty file would 404 its page.
	if (rest.length === 0) throw new ValidationError(["A categoria não pode ficar sem produtos."]);
	await store.write(file, serialize(rest), `content: remove product ${id} from ${category} (${author.email})`, sha);
}
