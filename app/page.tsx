import { categories, getProductsByCategory } from "@/lib/data";
import { HomePageClient } from "@/components/home-page-client";

export default async function HomePage() {
	const initialCategory = "smartphones";
	const initialProducts = await getProductsByCategory(initialCategory);
	const initialCategoryInfo = categories.find((c) => c.id === initialCategory)!;

	return (
		<HomePageClient
			initialCategory={initialCategory}
			initialProducts={initialProducts}
			initialCategoryInfo={initialCategoryInfo}
			initialProductIds={[]}
		/>
	);
}
