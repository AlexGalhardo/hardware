import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductEditor } from "@/components/admin/product-editor";
import { ProductThumb } from "@/components/admin/product-thumb";
import { requireAdmin } from "@/lib/admin/auth";
import { isCategory } from "@/lib/admin/category-files";
import { tryListProducts } from "@/lib/admin/products";
import { categories } from "@/lib/data";

interface PageProps {
	params: Promise<{ category: string; productId: string }>;
}

/** `/admin/<category>/novo` creates; any other id edits that product. */
export default async function AdminProductPage({ params }: PageProps) {
	await requireAdmin();
	const { category, productId } = await params;
	if (!isCategory(category)) notFound();
	const list = await tryListProducts(category);
	if ("error" in list)
		return (
			<p role="alert" className="text-sm text-red-600">
				{list.error}
			</p>
		);
	const { products, sha } = list;
	const creating = productId === "novo";
	const product = creating ? undefined : products.find((candidate) => candidate.id === productId);
	if (!creating && !product) notFound();
	const info = categories.find((candidate) => candidate.id === category);

	return (
		<div className="max-w-3xl">
			<Link href={`/admin/${category}`} className="text-sm text-muted-foreground hover:underline">
				← {info?.name ?? category}
			</Link>
			<div className="mt-2 flex items-center gap-4">
				{product && <ProductThumb src={product.image} alt={`${product.brand} ${product.name}`} size={72} />}
				<h1 className="text-2xl font-bold">{product ? `${product.brand} ${product.name}` : "Novo produto"}</h1>
			</div>
			<ProductEditor category={category} sha={sha} product={product} template={products[0]} />
		</div>
	);
}
