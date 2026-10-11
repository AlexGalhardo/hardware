"use client";

import { useEffect, useState } from "react";
import { categories, getProductsByCategory } from "@/lib/data";
import type { Product } from "@/lib/types";
import { Navbar } from "./layout/navbar";

export function NavbarWrapper() {
	const [allProducts, setAllProducts] = useState<Product[]>([]);

	useEffect(() => {
		const loadAllProducts = async () => {
			const allProductsData: Product[] = [];
			for (const category of categories) {
				const categoryProducts = await getProductsByCategory(category.id);
				allProductsData.push(...categoryProducts);
			}
			setAllProducts(allProductsData);
		};
		loadAllProducts();
	}, []);

	return <Navbar allProducts={allProducts} />;
}
