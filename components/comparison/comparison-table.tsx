"use client";

import { Check, Minus, X } from "lucide-react";
import React, { useEffect } from "react";
import { formatRating } from "@/lib/data";
import { getSpecConfig, type SpecSection } from "@/lib/spec-configs";
import type { Product, ProductCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ComparisonTableProps {
	products: (Product | null)[];
	category: ProductCategory;
}

export function ComparisonTable({ products, category }: ComparisonTableProps) {
	const specSections = getSpecConfig(category);

	const validProducts = products.filter((p): p is Product => p !== null);

	useEffect(() => {
		const contentElement = document.getElementById("comparison-table-protected");

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

	if (validProducts.length === 0) {
		return null;
	}

	return (
		<div id="comparison-table-protected" className="w-full overflow-x-auto">
			<div className="min-w-[600px]">
				{specSections.map((section) => (
					<SpecSectionComponent key={section.id} section={section} products={validProducts} />
				))}
			</div>
		</div>
	);
}

interface SpecSectionComponentProps {
	section: SpecSection;
	products: Product[];
}

function SpecSectionComponent({ section, products }: SpecSectionComponentProps) {
	const hasRatings = section.specs.some((spec) => spec.type === "rating");

	const calculateAverageForProduct = (product: Product) => {
		const ratings = section.specs
			.map((spec) => {
				const value = spec.getValue(product);
				return spec.type === "rating" && typeof value === "number" ? value : null;
			})
			.filter((value): value is number => value !== null);

		if (ratings.length === 0) return null;

		const sum = ratings.reduce((acc, curr) => acc + curr, 0);
		return sum / ratings.length;
	};

	const averageRatings = hasRatings ? products.map(calculateAverageForProduct) : [];

	return (
		<div className="mb-6">
			<div className="mb-2 px-4 py-2 bg-blue-600 text-white font-semibold text-sm rounded-t-lg w-fit">
				{section.title.toUpperCase()}
			</div>

			<div className="border rounded-lg overflow-hidden">
				{section.specs.map((spec, index) => {
					const values = products.map((p) => spec.getValue(p));

					return (
						<SpecRow
							key={spec.key}
							label={spec.label}
							values={values}
							type={spec.type}
							isLast={index === section.specs.length - 1 && !hasRatings}
						/>
					);
				})}

				{hasRatings && (
					<div
						className="grid gap-4 bg-orange-200 dark:bg-orange-300"
						style={{
							gridTemplateColumns: `180px repeat(${Math.max(products.length, 1)}, 1fr)`,
						}}
					>
						<div className="flex items-center px-4 py-3 font-bold text-sm text-black">NOTA FINAL</div>

						{averageRatings.map((average, index) => (
							<div key={index} className="flex items-center justify-center px-4 py-3">
								{average !== null ? (
									<span className="font-bold text-black">
										{average.toFixed(1)}
										<span className="ml-0.5">/ 10</span>
									</span>
								) : (
									<Minus className="h-4 w-4 text-black" />
								)}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

interface SpecRowProps {
	label: string;
	values: (string | boolean | number | null)[];
	type: "text" | "boolean" | "rating";
	isLast?: boolean;
}

function SpecRow({ label, values, type, isLast = false }: SpecRowProps) {
	return (
		<div
			className={cn("grid gap-4", !isLast && "border-b border")}
			style={{
				gridTemplateColumns: `180px repeat(${Math.max(values.length, 1)}, 1fr)`,
			}}
		>
			<div className="flex items-center px-4 py-3 bg-gray-200 dark:bg-muted/100 font-bold text-sm">
				{label.toUpperCase()}
			</div>

			{values.map((value, index) => (
				<div key={index} className="flex items-center justify-center px-4 py-3">
					{renderValue(value, type)}
				</div>
			))}
		</div>
	);
}

function renderValue(value: string | boolean | number | null, type: "text" | "boolean" | "rating"): React.ReactNode {
	if (value === null) {
		return <Minus className="h-4 w-4 text-black dark:text-white" />;
	}

	switch (type) {
		case "boolean":
			return value ? <Check className="h-5 w-5 text-green-600" /> : <X className="h-5 w-5 text-red-500" />;

		case "rating":
			if (typeof value === "number") {
				return (
					<span className="font-semibold">
						{formatRating(value)}
						<span className="text-black dark:text-white ml-0.5">/ 10</span>
					</span>
				);
			}
			return <Minus className="h-4 w-4 text-black dark:text-white" />;

		default:
			return String(value);
	}
}
