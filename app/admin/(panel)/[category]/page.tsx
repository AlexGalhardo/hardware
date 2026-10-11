import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductThumb } from "@/components/admin/product-thumb";
import { requireAdmin } from "@/lib/admin/auth";
import { isCategory } from "@/lib/admin/category-files";
import { tryListProducts } from "@/lib/admin/products";
import { isAffiliateUrl } from "@/lib/affiliate-links";
import { categories } from "@/lib/data";

export default async function AdminCategoryPage({ params }: { params: Promise<{ category: string }> }) {
	await requireAdmin();
	const { category } = await params;
	if (!isCategory(category)) notFound();
	const info = categories.find((candidate) => candidate.id === category);
	const list = await tryListProducts(category);
	if ("error" in list)
		return (
			<p role="alert" className="text-sm text-red-600">
				{list.error}
			</p>
		);
	const { products } = list;

	return (
		<div>
			<div className="flex flex-wrap items-center justify-between gap-3">
				<h1 className="text-2xl font-bold">
					{info?.name ?? category}{" "}
					<span className="text-base font-normal text-muted-foreground">({products.length})</span>
				</h1>
				<Link
					href={`/admin/${category}/novo`}
					className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
				>
					Novo produto
				</Link>
			</div>
			<div className="mt-4 overflow-x-auto">
				<table className="w-full text-left text-sm">
					<thead className="border-b border-border text-muted-foreground">
						<tr>
							<th className="py-2 pr-4 font-medium">Produto</th>
							<th className="py-2 pr-4 font-medium">Id</th>
							<th className="py-2 pr-4 font-medium">Lojas</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product.id} className="border-b border-border">
								<td className="py-2 pr-4">
									<Link
										href={`/admin/${category}/${product.id}`}
										className="flex items-center gap-3 font-medium hover:underline"
									>
										<ProductThumb src={product.image} alt="" size={40} />
										<span>
											{product.brand} {product.name}
										</span>
									</Link>
								</td>
								<td className="py-2 pr-4 font-mono text-xs">{product.id}</td>
								<td className="py-2 pr-4 text-xs">
									{[
										isAffiliateUrl(product.mercadolivreUrl) && "Mercado Livre",
										isAffiliateUrl(product.amazonUrl) && "Amazon",
										isAffiliateUrl(product.shopeeUrl) && "Shopee",
									]
										.filter(Boolean)
										.join(", ") || "nenhuma"}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
