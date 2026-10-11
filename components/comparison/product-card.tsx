"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { SiMercadopago, SiShopee } from "react-icons/si";
import { Button } from "@/components/ui/button";
import type { Product, ProductCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
	product: Product;
	onRemove?: () => void;
	compact?: boolean;
	category: ProductCategory;
}

export function ProductCard({ product, onRemove, compact = false, category }: ProductCardProps) {
	return (
		<div className={cn("bg-white dark:bg-white relative flex flex-col items-center", compact ? "p-2" : "p-4")}>
			{onRemove && (
				<Button
					variant="destructive"
					size="icon"
					className="absolute -right-2 -top-2 h-6 w-6 rounded-full z-10"
					onClick={onRemove}
				>
					<X className="h-3 w-3" />
					<span className="sr-only">Remover {product.name}</span>
				</Button>
			)}

			<Link
				href={`/${category}/${product.id}`}
				target="_blank"
				rel="noopener noreferrer"
				className={cn("relative overflow-hidden rounded-lg mb-3", compact ? "h-24 w-20" : "h-48 w-40")}
			>
				<Image
					src={product.image || "/placeholder.svg"}
					alt={product.name}
					fill
					className="object-contain"
					sizes={compact ? "80px" : "128px"}
				/>
			</Link>

			<Link
				href={`/${category}/${product.id}`}
				target="_blank"
				rel="noopener noreferrer"
				className={cn(
					"text-black dark:text-black font-semibold text-center text-balance leading-tight hover:text-primary transition-colors",
					compact ? "text-xs" : "text-sm",
				)}
			>
				{product.brand + " " + product.name}
			</Link>

			{!compact && (
				<div className="mt-4 flex flex-col gap-2 w-full max-w-[180px]">
					{product?.amazonUrl && (
						<a
							href={product.amazonUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center justify-center gap-1 px-4 py-2 rounded-sm bg-[#FF9900] hover:bg-[#e68a00] transition-all text-black font-semibold text-sm shadow-[0_5px_0_0_#cc7a00] hover:shadow-[0_2px_0_0_#cc7a00] hover:translate-y-[2px] active:shadow-[0_0px_0_0_#cc7a00] active:translate-y-[4px]"
						>
							VER PREÇO
						</a>
					)}
					{product?.mercadolivreUrl && (
						<a
							href={product.mercadolivreUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center justify-center gap-1 px-4 py-2 rounded-sm bg-[#FFE600] hover:bg-[#e6cf00] transition-all text-black font-semibold text-sm shadow-[0_5px_0_0_#ccb800] hover:shadow-[0_2px_0_0_#ccb800] hover:translate-y-[2px] active:shadow-[0_0px_0_0_#ccb800] active:translate-y-[4px]"
						>
							<SiMercadopago />
							VER PREÇO
						</a>
					)}
					{product?.shopeeUrl && (
						<a
							href={product.shopeeUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center justify-center gap-1 px-4 py-2 rounded-sm bg-[#EE4D2D] hover:bg-[#d84326] transition-all text-white font-semibold text-sm shadow-[0_5px_0_0_#b83820] hover:shadow-[0_2px_0_0_#b83820] hover:translate-y-[2px] active:shadow-[0_0px_0_0_#b83820] active:translate-y-[4px]"
						>
							<SiShopee className="w-4 h-4" />
							VER PREÇO
						</a>
					)}
				</div>
			)}
		</div>
	);
}

interface EmptyProductSlotProps {
	onAdd?: () => void;
	label?: string;
}

export function EmptyProductSlot({ onAdd, label = "Adicionar produto" }: EmptyProductSlotProps) {
	return (
		<button
			onClick={onAdd}
			className="flex flex-col items-center justify-center p-6 min-h-[280px] border-2 border-dashed border-border rounded-xl hover:border-primary/60 hover:bg-primary/5 transition-all group w-full"
		>
			<div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
				<span className="text-3xl text-black dark:text-white group-hover:text-primary transition-colors">
					+
				</span>
			</div>
			<span className="mt-3 text-sm font-medium text-black dark:text-white group-hover:text-primary transition-colors">
				{label}
			</span>
		</button>
	);
}
