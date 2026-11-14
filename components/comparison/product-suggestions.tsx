"use client";

import { Plus } from "lucide-react";
import { withBase } from "@/lib/base";
import type { Product, ProductCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductSuggestionsProps {
	products: Product[];
	onAdd: (product: Product) => void;
	excludeIds: string[];
	disabled?: boolean;
	category: ProductCategory;
}

const categoryNames: Record<ProductCategory, string> = {
	smartphones: "Smartphones",
	gpus: "Placas de Vídeo",
	cpus: "Processadores",
	tablets: "Tablets",
	notebooks: "Notebooks",
	drones: "Drones",
	smartwatches: "Smartwatches",
	"fones-de-ouvido": "Fones De Ouvido",
	"smart-tvs": "Smart TVs",
	geladeiras: "Geladeiras",
	"maquinas-lavar-roupas": "Máquinas de Lavar Roupa",
	"cameras-de-seguranca": "Câmeras de Segurança",
	airfryers: "Air Fryers",
	microondas: "Microondas",
	teclados: "Teclados",
	mouses: "Mouses",
	"caixa-de-som": "Caixas de Som",
	"placa-mae": "Placas Mãe",
	"ar-condicionado": "Ar Condicionado",
	monitores: "Monitores",
	cameras: "Câmeras",
	cafeteiras: "Cafeteiras",
	impressoras: "Impressoras",
	fechaduras: "Fechaduras",
};

export function ProductSuggestions({
	products,
	onAdd,
	excludeIds,
	disabled = false,
	category,
}: ProductSuggestionsProps) {
	const availableProducts = products.filter((p) => !excludeIds.includes(p.id));

	if (availableProducts.length === 0) {
		return null;
	}

	return (
		<div className="space-y-2">
			<p className="text-sm font-medium text-black dark:text-white mb-3">
				<strong>
					{availableProducts.length} {categoryNames[category]}
				</strong>{" "}
				para comparar
			</p>
			<div className="space-y-2">
				{availableProducts.slice(0, 8).map((product) => (
					<button
						type="button"
						key={product.id}
						disabled={disabled}
						aria-label={`Adicionar ${product.name}`}
						className={cn(
							"flex items-center gap-3 p-2 rounded-lg border border-border transition-all w-full text-left",
							disabled
								? "opacity-50 cursor-not-allowed"
								: "hover:border-primary/60 hover:bg-primary/5 group cursor-pointer",
						)}
						onClick={() => onAdd(product)}
					>
						<div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-muted">
							<img
								src={product.image || withBase("/placeholder.svg")}
								alt={product.name}
								className="absolute inset-0 h-full w-full object-cover"
								loading="lazy"
							/>
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-xs text-black dark:text-white">{product.brand}</p>
							<small className="text-sm">{product.name}</small>
						</div>
						{!disabled && (
							<span className="flex h-8 w-8 flex-shrink-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
								<Plus className="h-4 w-4" aria-hidden="true" />
							</span>
						)}
					</button>
				))}
			</div>
		</div>
	);
}
