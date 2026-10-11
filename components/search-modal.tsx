"use client";

import Fuse from "fuse.js";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SearchModalProps {
	allProducts: Product[];
}

export function SearchModal({ allProducts }: SearchModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedIndex, setSelectedIndex] = useState(0);
	const inputRef = useRef<HTMLInputElement>(null);
	const resultsContainerRef = useRef<HTMLDivElement>(null);
	const selectedItemRef = useRef<HTMLAnchorElement>(null);

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setIsOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	const filteredProducts = useMemo(() => {
		if (searchTerm.trim().length < 2) {
			return [];
		}

		const fuse = new Fuse(allProducts, {
			keys: [
				{ name: "name", weight: 0.5 },
				{ name: "brand", weight: 0.3 },
				{ name: "category", weight: 0.2 },
				...(allProducts.some((product) => product.subcategory) ? [{ name: "subcategory", weight: 0.2 }] : []),
			],
			threshold: 0.4,
			distance: 200,
			ignoreLocation: true,
			minMatchCharLength: 1,
			useExtendedSearch: true,
			includeScore: true,
			getFn: (obj, path) => {
				const value = Fuse.config.getFn(obj, path);
				if (typeof value === "string") {
					return value
						.normalize("NFD")
						.replaceAll(/[\u0300-\u036f]/g, "")
						.toLowerCase();
				}
				return value;
			},
		});

		const normalizedSearch = searchTerm
			.normalize("NFD")
			.replaceAll(/[\u0300-\u036f]/g, "")
			.toLowerCase()
			.trim();

		const results = fuse.search(normalizedSearch);
		const uniqueProducts = new Map<string, Product>();

		results.forEach((result) => {
			if (!uniqueProducts.has(result.item.id)) {
				uniqueProducts.set(result.item.id, result.item);
			}
		});

		return Array.from(uniqueProducts.values()).slice(0, 8);
	}, [searchTerm, allProducts]);

	useEffect(() => {
		setSelectedIndex(0);
	}, [filteredProducts]);

	useEffect(() => {
		if (isOpen) {
			setSearchTerm("");
			setSelectedIndex(0);
		}
	}, [isOpen]);

	useEffect(() => {
		if (selectedItemRef.current && resultsContainerRef.current) {
			const container = resultsContainerRef.current;
			const item = selectedItemRef.current;

			const containerRect = container.getBoundingClientRect();
			const itemRect = item.getBoundingClientRect();

			if (itemRect.bottom > containerRect.bottom) {
				container.scrollTop += itemRect.bottom - containerRect.bottom;
			} else if (itemRect.top < containerRect.top) {
				container.scrollTop -= containerRect.top - itemRect.top;
			}
		}
	}, [selectedIndex]);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (filteredProducts.length === 0) return;

		if (e.key === "ArrowDown") {
			e.preventDefault();
			setSelectedIndex((prev) => (prev < filteredProducts.length - 1 ? prev + 1 : prev));
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
		} else if (e.key === "Enter" && filteredProducts[selectedIndex]) {
			e.preventDefault();
			const product = filteredProducts[selectedIndex];
			window.location.href = `/${product.category}/${product.id}`;
			setIsOpen(false);
		}
	};

	const handleClose = () => {
		setIsOpen(false);
		setSearchTerm("");
	};

	return (
		<>
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm border w-full sm:w-auto"
				title="Buscar produtos (Ctrl+K)"
			>
				<Search className="h-5 w-5" />
				<span className="text-black dark:text-white">Buscar Produto</span>
				<kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono bg-muted rounded border border-border ml-auto">
					<span>Ctrl+</span>
					<span>K</span>
				</kbd>
			</button>

			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className="max-w-2xl p-0 gap-0">
					<div className="flex items-center border-b border-border px-4 py-3">
						<Search className="h-5 w-5 text-gray-400 mr-3" />
						<Input
							ref={inputRef}
							type="text"
							placeholder="Buscar produtos..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							onKeyDown={handleKeyDown}
							className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
							autoFocus
						/>
					</div>

					<div ref={resultsContainerRef} className="max-h-[400px] overflow-y-auto p-2">
						{searchTerm.trim().length < 2 ? (
							<div className="text-center py-12 text-black dark:text-white dark:text-white">
								<Search className="h-12 w-12 mx-auto mb-3 opacity-20" />
								<p className="text-sm">Digite pelo menos 2 caracteres para buscar</p>
								<p className="text-xs mt-2 text-gray-400">
									Dica: Use <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded">Ctrl+K</kbd> para
									abrir a busca
								</p>
							</div>
						) : filteredProducts.length > 0 ? (
							<div className="space-y-2">
								{filteredProducts.map((product, index) => (
									<Link
										key={product.id}
										ref={index === selectedIndex ? selectedItemRef : null}
										href={`/${product.category}/${product.id}`}
										onClick={handleClose}
										className={cn(
											"flex items-center gap-3 p-3 rounded-lg transition-colors group",
											index === selectedIndex
												? "bg-primary/10 border-2 border-primary"
												: "hover:bg-muted border-2 border-transparent",
										)}
									>
										<div className="relative h-16 w-16 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
											<Image
												src={product.image || "/placeholder.svg"}
												alt={product.name}
												fill
												className="object-contain p-1"
											/>
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-xs text-black dark:text-white dark:text-white mb-0.5">
												{product.brand}
											</p>
											<p className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
												{product.name}
											</p>
										</div>
									</Link>
								))}
							</div>
						) : (
							<div className="text-center py-12 text-black dark:text-white dark:text-white">
								<p className="text-sm">Nenhum produto encontrado</p>
								<p className="text-xs mt-2">Tente usar termos diferentes</p>
							</div>
						)}
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
