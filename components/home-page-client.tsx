"use client";

import { useEffect, useState } from "react";
import { ComparisonView } from "@/components/comparison/comparison-view";
import { categories, getProductsByCategory } from "@/lib/data";
import type { CategoryInfo, Product, ProductCategory } from "@/lib/types";
import Footer from "./Footer";

interface HomePageClientProps {
	initialCategory: ProductCategory;
	initialProducts: Product[];
	initialCategoryInfo: CategoryInfo;
	initialProductIds: string[];
}

export function HomePageClient({
	initialCategory,
	initialProducts,
	initialCategoryInfo,
	initialProductIds,
}: HomePageClientProps) {
	const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(initialCategory);
	const [products, setProducts] = useState<Product[]>(initialProducts);
	const [categoryInfo, setCategoryInfo] = useState<CategoryInfo>(initialCategoryInfo);
	const [productIds, setProductIds] = useState<string[]>(initialProductIds);

	useEffect(() => {
		if (selectedCategory !== initialCategory) {
			const loadProducts = async () => {
				const data = await getProductsByCategory(selectedCategory);
				setProducts(data);
				setCategoryInfo(categories.find((c) => c.id === selectedCategory) || categories[0]);
				setProductIds([]);
			};
			loadProducts();
		}
	}, [selectedCategory, initialCategory]);

	useEffect(() => {
		const handlePopState = () => {
			const path = globalThis.window.location.pathname.replace("/", "");
			if (path && categories.some((c) => c.id === path)) {
				setSelectedCategory(path as ProductCategory);
				setProductIds([]);
			} else if (path === "") {
				setSelectedCategory("smartphones");
				setProductIds([]);
			}
		};
		globalThis.window.addEventListener("popstate", handlePopState);
		return () => globalThis.window.removeEventListener("popstate", handlePopState);
	}, []);

	return (
		<main className="min-h-screen pb-8 mb-3">
			{products.length > 0 && (
				<ComparisonView
					key={selectedCategory}
					category={selectedCategory}
					categoryInfo={categoryInfo}
					allProducts={products}
					initialProductIds={productIds}
				/>
			)}

			<Footer />
		</main>
	);
}
