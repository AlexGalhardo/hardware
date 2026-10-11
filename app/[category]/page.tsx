import { notFound } from "next/navigation";
import { categories, getProductsByCategory } from "@/lib/data";
import type { ProductCategory } from "@/lib/types";
import type { Metadata } from "next";
import { HomePageClient } from "@/components/home-page-client";

interface PageProps {
	params: Promise<{ category: string }>;
	searchParams: Promise<{ products?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { category } = await params;
	const categoryInfo = categories.find((c) => c.id === category);

	if (!categoryInfo) {
		return {
			title: "TudoHardware - Comparações Técnicas",
		};
	}

	return {
		title: `Comparar ${categoryInfo.name} - TudoHardware`,
		description: categoryInfo.description,
	};
}

export async function generateStaticParams() {
	return categories.map((category) => ({
		category: category.id,
	}));
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
	const { category } = await params;
	const { products } = await searchParams;

	const isValidCategory = categories.some((c) => c.id === category);

	if (!isValidCategory) {
		notFound();
	}

	const initialProducts = await getProductsByCategory(category as ProductCategory);
	const categoryInfo = categories.find((c) => c.id === category)!;
	const productIds = products ? products.split(",").filter(Boolean) : [];

	return (
		<HomePageClient
			initialCategory={category as ProductCategory}
			initialProducts={initialProducts}
			initialCategoryInfo={categoryInfo}
			initialProductIds={productIds}
		/>
	);
}
