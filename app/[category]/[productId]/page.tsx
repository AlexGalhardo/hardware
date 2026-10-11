import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getProductsByCategory } from "@/lib/data";
import type { ProductCategory } from "@/lib/types";
import { ProductDetailClient } from "./product-detail-client";

interface PageProps {
	params: Promise<{ category: string; productId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { category, productId } = await params;
	const categoryInfo = categories.find((c) => c.id === category);

	if (!categoryInfo) {
		return {
			title: "TudoHardware - Comparações Técnicas de Hardware",
		};
	}

	const products = await getProductsByCategory(category as ProductCategory);
	const product = products.find((p) => p.id === productId);

	if (!product) {
		return {
			title: `${categoryInfo.name} - TudoHardware`,
		};
	}

	return {
		title: `${product.brand} ${product.name} - Ficha Técnica | TudoHardware`,
		description: `Veja as especificações técnicas completas do ${product.brand} ${product.name}. Confira todos os detalhes, características e compare com outros ${categoryInfo.name.toLowerCase()}.`,
		alternates: { canonical: `/${category}/${productId}` },
	};
}

export async function generateStaticParams() {
	const allParams: Array<{ category: string; productId: string }> = [];

	for (const category of categories) {
		const products = await getProductsByCategory(category.id);
		for (const product of products) {
			allParams.push({
				category: category.id,
				productId: product.id,
			});
		}
	}

	return allParams;
}

export default async function ProductDetailPage({ params }: PageProps) {
	const { category, productId } = await params;

	const isValidCategory = categories.some((c) => c.id === category);

	if (!isValidCategory) {
		notFound();
	}

	const products = await getProductsByCategory(category as ProductCategory);
	const product = products.find((p) => p.id === productId);

	if (!product) {
		notFound();
	}

	const categoryInfo = categories.find((c) => c.id === category)!;
	const relatedProducts = products.filter((p) => p.id !== productId).slice(0, 6);

	return (
		<ProductDetailClient
			product={product}
			category={category as ProductCategory}
			categoryInfo={categoryInfo}
			relatedProducts={relatedProducts}
		/>
	);
}
