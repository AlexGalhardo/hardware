import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { categories } from "@/lib/data";

const exportLink = "rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted";

export default async function AdminHomePage() {
	await requireAdmin();
	const total = categories.reduce((sum, category) => sum + (category.total ?? 0), 0);

	return (
		<div className="flex flex-col gap-8">
			<section>
				<h1 className="text-2xl font-bold">Produtos</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					{total} produtos em {categories.length} categorias na versão publicada. Cada alteração vira um
					commit no repositório e entra no ar no deploy seguinte.
				</p>
				<ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
					{categories.map((category) => (
						<li key={category.id}>
							<Link
								href={`/admin/${category.id}`}
								className="flex items-center justify-between rounded-lg border border-border p-4 hover:border-primary"
							>
								<span className="font-medium">{category.name}</span>
								<span className="text-sm text-muted-foreground">{category.total ?? 0}</span>
							</Link>
						</li>
					))}
				</ul>
			</section>

			<section>
				<h2 className="text-lg font-bold">Exportar produtos</h2>
				<p className="mt-1 text-sm text-muted-foreground">
					Todos os produtos publicados com seus links de loja, no formato que o dashboard de links importa.
				</p>
				<div className="mt-3 flex flex-wrap gap-2">
					<a href="/api/admin/export?format=json" download className={exportLink}>
						Exportar produtos (JSON)
					</a>
					<a href="/api/admin/export?format=csv" download className={exportLink}>
						Exportar produtos (CSV)
					</a>
				</div>
			</section>
		</div>
	);
}
