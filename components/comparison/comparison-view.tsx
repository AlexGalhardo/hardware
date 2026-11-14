"use client";

import { RotateCcw, Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaPinterest, FaReddit, FaTelegram, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { withBase } from "@/lib/base";
import type { CategoryInfo, Product, ProductCategory } from "@/lib/types";
import { ComparisonTable } from "./comparison-table";
import { EmptyProductSlot, ProductCard } from "./product-card";
import { ProductSuggestions } from "./product-suggestions";

interface ComparisonViewProps {
	category: ProductCategory;
	categoryInfo: CategoryInfo;
	allProducts: Product[];
	initialProductIds: string[];
}

export function ComparisonView({ category, categoryInfo, allProducts, initialProductIds }: ComparisonViewProps) {
	const isUpdatingUrl = useRef(false);
	const previousCategory = useRef(category);

	const [selectedProducts, setSelectedProducts] = useState<(Product | null)[]>(() => {
		const products: (Product | null)[] = [null, null, null, null];
		initialProductIds.slice(0, 4).forEach((id, index) => {
			const product = allProducts.find((p) => p.id === id);
			if (product) {
				products[index] = product;
			}
		});
		return products;
	});

	const [searchSlot, setSearchSlot] = useState<number | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [currentUrl, setCurrentUrl] = useState("");

	// biome-ignore lint/correctness/useExhaustiveDependencies: selectedProducts is the trigger, the address changes when the selection does
	useEffect(() => {
		setCurrentUrl(globalThis.window.location.href);
	}, [selectedProducts]);

	const updateUrl = useCallback(
		(products: (Product | null)[]) => {
			if (isUpdatingUrl.current) return;
			isUpdatingUrl.current = true;

			const ids = products.filter((p): p is Product => p !== null).map((p) => p.id);

			const params = new URLSearchParams();
			if (ids.length > 0) {
				params.set("products", ids.join(","));
			}

			const newUrl = withBase(ids.length > 0 ? `/${category}?${params.toString()}` : `/${category}`);

			globalThis.window.history.replaceState({}, "", newUrl);
			setCurrentUrl(globalThis.window.location.href);

			setTimeout(() => {
				isUpdatingUrl.current = false;
			}, 0);
		},
		[category],
	);

	useEffect(() => {
		if (previousCategory.current !== category) {
			const emptyProducts: (Product | null)[] = [null, null, null, null];
			setSelectedProducts(emptyProducts);
			setSearchSlot(null);
			setSearchQuery("");
			updateUrl(emptyProducts);
			previousCategory.current = category;
		}
	}, [category, updateUrl]);

	const handleAddProduct = (product: Product, slot?: number) => {
		setSelectedProducts((prev) => {
			const newProducts = [...prev];
			const targetSlot = slot ?? prev.indexOf(null);
			if (targetSlot !== -1 && targetSlot < 4) {
				newProducts[targetSlot] = product;
			}
			setTimeout(() => updateUrl(newProducts), 0);
			return newProducts;
		});
		setSearchSlot(null);
		setSearchQuery("");
	};

	const handleRemoveProduct = (index: number) => {
		setSelectedProducts((prev) => {
			const newProducts = [...prev];
			newProducts[index] = null;
			setTimeout(() => updateUrl(newProducts), 0);
			return newProducts;
		});
	};

	const handleReset = () => {
		const emptyProducts: (Product | null)[] = [null, null, null, null];
		setSelectedProducts(emptyProducts);
		updateUrl(emptyProducts);
	};

	const selectedIds = selectedProducts.filter((p): p is Product => p !== null).map((p) => p.id);

	const hasProducts = selectedProducts.some((p) => p !== null);
	const isFull = selectedIds.length >= 4;
	const hasMultipleProducts = selectedIds.length >= 2;

	const filteredProducts = useMemo(() => {
		if (!searchQuery.trim()) {
			return allProducts.filter((p) => !selectedIds.includes(p.id));
		}
		const query = searchQuery.toLowerCase();
		return allProducts.filter(
			(p) =>
				!selectedIds.includes(p.id) &&
				(p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query)),
		);
	}, [allProducts, selectedIds, searchQuery]);

	const openSearch = (slot: number) => {
		setSearchSlot(slot);
		setSearchQuery("");
	};

	const closeSearch = () => {
		setSearchSlot(null);
		setSearchQuery("");
	};

	const encodedUrl = encodeURIComponent(currentUrl);
	const shareTitle = `Compare ${categoryInfo.name} - ${selectedProducts
		.filter((p) => p !== null)
		.map((p) => p!.name)
		.join(" vs ")}`;
	const encodedTitle = encodeURIComponent(shareTitle);

	const shareLinks = [
		{
			name: "Twitter",
			url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
			color: "bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200",
			icon: <FaXTwitter />,
		},
		{
			name: "Facebook",
			url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
			color: "bg-blue-600 hover:bg-blue-700",
			icon: <FaFacebookF />,
		},
		{
			name: "WhatsApp",
			url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
			color: "bg-green-500 hover:bg-green-600",
			icon: <FaWhatsapp />,
		},
		{
			name: "Telegram",
			url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
			color: "bg-blue-400 hover:bg-blue-500",
			icon: <FaTelegram />,
		},
		{
			name: "LinkedIn",
			url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
			color: "bg-blue-700 hover:bg-blue-800",
			icon: <FaLinkedinIn />,
		},
		{
			name: "Reddit",
			url: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
			color: "bg-orange-500 hover:bg-orange-600",
			icon: <FaReddit />,
		},
		{
			name: "Pinterest",
			url: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
			color: "bg-red-600 hover:bg-red-700",
			icon: <FaPinterest />,
		},
	];

	return (
		<div className="container px-4 py-8 mx-auto">
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
				<div className="flex items-center gap-2">
					{hasProducts && (
						<Button variant="outline" size="sm" onClick={handleReset}>
							<RotateCcw className="mr-2 h-4 w-4" />
							Limpar
						</Button>
					)}
				</div>
				{hasMultipleProducts && (
					<div className="flex items-center gap-1.5">
						<span className="text-sm text-black dark:text-white mr-1 hidden sm:inline">
							Compartilhar essa comparação:
						</span>
						{shareLinks.map((link) => (
							<a
								key={link.name}
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								className={`flex items-center justify-center w-7 h-7 rounded-full text-white transition-colors ${link.color}`}
								title={`Compartilhar no ${link.name}`}
							>
								{link.icon}
							</a>
						))}
					</div>
				)}
			</div>

			<div className="flex flex-col lg:flex-row gap-8">
				<div className="flex-1 min-w-0">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
						{selectedProducts.map((product, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: the four comparison slots are positional and never reorder
							<div key={index} className="relative">
								{searchSlot === index ? (
									<div className="border border-primary rounded-xl bg-card p-4 min-h-[280px]">
										<div className="flex items-center justify-between mb-3">
											<span className="text-sm font-medium text-black dark:text-white">
												Buscar produto
											</span>
											<Button
												variant="ghost"
												size="icon"
												className="h-6 w-6"
												onClick={closeSearch}
											>
												<X className="h-4 w-4" />
											</Button>
										</div>
										<div className="relative mb-3">
											<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black dark:text-white" />
											<Input
												type="text"
												placeholder="Digite o nome do produto..."
												value={searchQuery}
												onChange={(e) => setSearchQuery(e.target.value)}
												className="pl-9"
												autoFocus
											/>
										</div>
										<div className="max-h-[200px] overflow-y-auto space-y-1">
											{filteredProducts.length > 0 ? (
												filteredProducts.slice(0, 20).map((p) => (
													<button
														type="button"
														key={p.id}
														onClick={() => handleAddProduct(p, index)}
														className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-muted transition-colors text-left"
													>
														<div className="relative h-10 w-10 rounded-md overflow-hidden bg-muted flex-shrink-0">
															<img
																src={p.image || withBase("/placeholder.svg")}
																alt={p.name}
																className="absolute inset-0 h-full w-full object-cover"
																loading="lazy"
															/>
														</div>
														<div className="flex-1 min-w-0">
															<p className="text-sm font-medium truncate">{p.name}</p>
															<p className="text-xs text-black dark:text-white">
																{p.brand}
															</p>
														</div>
													</button>
												))
											) : (
												<p className="text-sm text-black dark:text-white text-center py-4">
													Nenhum produto encontrado
												</p>
											)}
										</div>
									</div>
								) : product ? (
									<div className="border border-border rounded-xl bg-card">
										<ProductCard
											product={product}
											onRemove={() => handleRemoveProduct(index)}
											category={category}
										/>
									</div>
								) : (
									<EmptyProductSlot
										onAdd={() => openSearch(index)}
										label={
											index === 0
												? `Adicionar ${index + 1}° produto`
												: `Adicionar ${index + 1}° produto`
										}
									/>
								)}
							</div>
						))}
					</div>

					{hasProducts && <ComparisonTable products={selectedProducts} category={category} />}

					{!hasProducts && (
						<div className="text-center py-12 border border-dashed border-border rounded-xl">
							<h3 className="text-lg font-semibold text-foreground">Comece sua comparação</h3>
							<p className="text-black dark:text-white mt-2 max-w-md mx-auto">
								Clique em um dos cards acima para buscar e adicionar até 4 produtos para comparar suas
								especificações técnicas lado a lado.
							</p>
						</div>
					)}
				</div>

				<div className="w-full lg:w-64 flex-shrink-0">
					<div className="lg:sticky lg:top-24">
						<ProductSuggestions
							products={allProducts}
							onAdd={handleAddProduct}
							excludeIds={selectedIds}
							disabled={isFull}
							category={category}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
