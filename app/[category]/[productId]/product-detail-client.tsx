"use client";

import { ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { SiMercadopago, SiShopee } from "react-icons/si";
import { useDashboardDown } from "@/hooks/use-dashboard-down";
import { productAffiliateHref } from "@/lib/affiliate-catalogue";
import { isAffiliateUrl } from "@/lib/affiliate-links";
import { formatRating } from "@/lib/data";
import { getSpecConfig, type SpecItem } from "@/lib/spec-configs";
import type { CategoryInfo, Product, ProductCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductDetailClientProps {
	product: Product;
	category: ProductCategory;
	categoryInfo: CategoryInfo;
	relatedProducts: Product[];
}

export function ProductDetailClient({ product, category, categoryInfo, relatedProducts }: ProductDetailClientProps) {
	const specSections = getSpecConfig(category);
	const dashboardDown = useDashboardDown();

	useEffect(() => {
		const contentElement = document.getElementById("product-detail-protected");

		if (!contentElement) return;

		const preventCopy = (e: Event) => e.preventDefault();
		const preventSelect = (e: Event) => e.preventDefault();

		contentElement.addEventListener("copy", preventCopy);
		contentElement.addEventListener("cut", preventCopy);
		contentElement.addEventListener("contextmenu", preventCopy);
		contentElement.addEventListener("dragstart", preventCopy);
		contentElement.addEventListener("selectstart", preventSelect);

		contentElement.style.userSelect = "none";

		return () => {
			contentElement.removeEventListener("copy", preventCopy);
			contentElement.removeEventListener("cut", preventCopy);
			contentElement.removeEventListener("contextmenu", preventCopy);
			contentElement.removeEventListener("dragstart", preventCopy);
			contentElement.removeEventListener("selectstart", preventSelect);

			contentElement.style.userSelect = "";
		};
	}, []);

	const calculateAverage = (specs: SpecItem[]) => {
		const ratings = specs
			.map((spec) => {
				const value = spec.getValue(product);
				return spec.type === "rating" && typeof value === "number" ? value : null;
			})
			.filter((value): value is number => value !== null);

		if (ratings.length === 0) return null;

		const sum = ratings.reduce((acc, curr) => acc + curr, 0);
		return sum / ratings.length;
	};

	const hasRatings = (specs: SpecItem[]) => {
		return specs.some((spec) => spec.type === "rating");
	};

	return (
		<div id="product-detail-protected" className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-6">
				<div className="flex items-center gap-2 text-xs md:text-sm text-black dark:text-white mb-6">
					<a href="/" className="hover:text-primary transition-colors">
						Home
					</a>
					<ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
					<a href={`/${category}`} className="hover:text-primary transition-colors">
						{categoryInfo.name}
					</a>
					<ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
					<span className="text-foreground">{`${product.brand} ${product.name}`}</span>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-[3fr_4fr_3fr] gap-6">
					<div className="lg:sticky lg:top-24 lg:self-start bg-white dark:bg-white">
						<div className=" rounded-lg border border-border p-4">
							<div className="relative w-75 aspect-square mb-4  rounded-lg overflow-hidden mx-auto">
								<img
									src={product.image || "/placeholder.svg"}
									alt={`${product.brand} ${product.name}`}
									className="absolute inset-0 h-full w-full object-contain p-4"
								/>
							</div>

							<h1 className="text-xl font-semibold text-center mb-4 text-black dark:text-black">
								{product.brand} {product.name}
							</h1>

							<div className="w-70 max-w-[320px] mx-auto space-y-2">
								<div className="flex flex-col gap-3 mb-6 mt-6">
									{isAffiliateUrl(product.amazonUrl) && (
										<a
											href={
												dashboardDown
													? product.amazonUrl
													: productAffiliateHref(category, product.id, "amazon")
											}
											target="_blank"
											rel="noopener noreferrer sponsored"
											className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-[#FF9900] hover:bg-[#e68a00] transition-all text-black font-semibold text-sm shadow-[0_5px_0_0_#cc7a00] hover:shadow-[0_2px_0_0_#cc7a00] hover:translate-y-[2px] active:shadow-[0_0px_0_0_#cc7a00] active:translate-y-[4px]"
										>
											{/* <SiAmazon className="h-5 w-5" /> */}
											PREÇO AMAZON
										</a>
									)}

									{isAffiliateUrl(product.mercadolivreUrl) && (
										<a
											href={
												dashboardDown
													? product.mercadolivreUrl
													: productAffiliateHref(category, product.id, "mercadolivre")
											}
											target="_blank"
											rel="noopener noreferrer sponsored"
											className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-[#FFE600] hover:bg-[#e6cf00] transition-all text-black font-semibold text-sm shadow-[0_5px_0_0_#ccb800] hover:shadow-[0_2px_0_0_#ccb800] hover:translate-y-[2px] active:shadow-[0_0px_0_0_#ccb800] active:translate-y-[4px]"
										>
											<SiMercadopago className="h-5 w-5" />
											PREÇO MERCADO LIVRE
										</a>
									)}

									{isAffiliateUrl(product.shopeeUrl) && (
										<a
											href={
												dashboardDown
													? product.shopeeUrl
													: productAffiliateHref(category, product.id, "shopee")
											}
											target="_blank"
											rel="noopener noreferrer sponsored"
											className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-[#EE4D2D] hover:bg-[#d84326] transition-all text-white font-semibold text-sm shadow-[0_5px_0_0_#b83820] hover:shadow-[0_2px_0_0_#b83820] hover:translate-y-[2px] active:shadow-[0_0px_0_0_#b83820] active:translate-y-[4px]"
										>
											<SiShopee className="h-5 w-5" />
											PREÇO SHOPEE
										</a>
									)}
								</div>
							</div>
						</div>
					</div>

					<div className=" rounded-lg border border-border overflow-hidden">
						<div className="p-6">
							<div className="space-y-6">
								{specSections.map((section) => {
									const sectionHasRatings = hasRatings(section.specs);
									const averageRating = sectionHasRatings ? calculateAverage(section.specs) : null;

									return (
										<div key={section.id}>
											<h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
												{section.title}
											</h2>
											<div className="overflow-hidden rounded-lg border border-border">
												{section.specs.map((spec, index) => {
													const value = spec.getValue(product);
													const isLast = index === section.specs.length - 1;

													return (
														<div
															key={spec.key}
															className={cn(
																"grid grid-cols-2 border-border",
																!isLast && "border-b",
																isLast && sectionHasRatings && "border-b",
															)}
														>
															<div className="bg-gray-100 dark:bg-gray-800 px-3 py-2.5 font-semibold uppercase text-sm">
																{spec.label}
															</div>
															<div className="px-3 py-2.5 text-sm">
																{spec.type === "boolean" ? (
																	value ? (
																		"Sim"
																	) : (
																		"Não"
																	)
																) : spec.type === "rating" &&
																	typeof value === "number" ? (
																	<span className="font-semibold">
																		{formatRating(value)}
																		<span className="text-black dark:text-white font-semibold ml-1">
																			/ 10
																		</span>
																	</span>
																) : value !== null ? (
																	String(value)
																) : (
																	<span className="text-black dark:text-white font-bold">
																		-
																	</span>
																)}
															</div>
														</div>
													);
												})}

												{/* Linha de Nota Final - apenas se a seção tiver ratings */}
												{sectionHasRatings && averageRating !== null && (
													<div className="grid grid-cols-2 bg-orange-200 dark:bg-orange-300">
														<div className="px-3 py-2.5 font-bold uppercase text-sm text-black">
															NOTA FINAL
														</div>
														<div className="px-3 py-2.5 text-sm">
															<span className="font-bold text-black">
																{averageRating.toFixed(1)}
																<span className="font-bold ml-1">/ 10</span>
															</span>
														</div>
													</div>
												)}
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>

					<div className="lg:sticky lg:top-24 lg:self-start">
						<div className=" rounded-lg border border-border p-4">
							<h3 className="text-lg font-semibold mb-4">Produtos Similares</h3>
							<div className="space-y-3">
								{relatedProducts.slice(0, 8).map((relatedProduct) => (
									<a
										key={relatedProduct.id}
										href={`/${category}/${relatedProduct.id}`}
										className="flex items-center gap-3 p-2 rounded-lg transition-colors group hover:bg-muted"
									>
										<div className="relative h-16 w-16 flex-shrink-0  rounded-lg overflow-hidden">
											<img
												src={relatedProduct.image || "/placeholder.svg"}
												alt={relatedProduct.name}
												className="absolute inset-0 h-full w-full object-contain p-1"
												loading="lazy"
											/>
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-xs text-black dark:text-white mb-0.5">
												{relatedProduct.brand}
											</p>
											<p className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
												{relatedProduct.name}
											</p>
										</div>
									</a>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
