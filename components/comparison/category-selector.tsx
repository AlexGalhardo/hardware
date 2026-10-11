"use client";

import {
	AirVent,
	Camera,
	CircuitBoard,
	Coffee,
	Computer,
	Cpu,
	Flame,
	Headphones,
	Keyboard,
	Lock,
	Monitor,
	MonitorCog,
	Mouse,
	Plane,
	Printer,
	Refrigerator,
	Smartphone,
	Tablet,
	Tv,
	Volume2,
	WashingMachine,
	Watch,
	Waves,
} from "lucide-react";
import React from "react";
import { PiSecurityCamera } from "react-icons/pi";
import { categories } from "@/lib/data";
import type { ProductCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

const categoryIcons: Record<ProductCategory, React.ReactNode> = {
	smartphones: <Smartphone className="h-5 w-5" />,
	gpus: <MonitorCog className="h-5 w-5" />,
	cpus: <Cpu className="h-5 w-5" />,
	tablets: <Tablet className="h-5 w-5" />,
	"maquinas-lavar-roupas": <WashingMachine className="h-5 w-5" />,
	"smart-tvs": <Tv className="h-5 w-5" />,
	notebooks: <Computer className="h-5 w-5" />,
	drones: <Plane className="h-5 w-5" />,
	smartwatches: <Watch className="h-5 w-5" />,
	"fones-de-ouvido": <Headphones className="h-5 w-5" />,
	geladeiras: <Refrigerator className="h-5 w-5" />,
	cameras: <Camera className="h-5 w-5" />,
	"cameras-de-seguranca": <PiSecurityCamera className="h-5 w-5" />,
	airfryers: <Flame className="h-5 w-5" />,
	microondas: <Waves className="h-5 w-5" />,
	teclados: <Keyboard className="h-5 w-5" />,
	mouses: <Mouse className="h-5 w-5" />,
	"caixa-de-som": <Volume2 className="h-5 w-5" />,
	"placa-mae": <CircuitBoard className="h-5 w-5" />,
	"ar-condicionado": <AirVent className="h-5 w-5" />,
	monitores: <Monitor className="h-5 w-5" />,
	cafeteiras: <Coffee className="h-5 w-5" />,
	impressoras: <Printer className="h-5 w-5" />,
	fechaduras: <Lock className="h-5 w-5" />,
};

interface CategorySelectorProps {
	selectedCategory: ProductCategory;
	onCategoryChange: (category: ProductCategory) => void;
}

export function CategorySelector({ selectedCategory, onCategoryChange }: CategorySelectorProps) {
	return (
		<div className="w-full">
			<div className="flex flex-wrap justify-center gap-2">
				{categories.map((category) => (
					<button
						type="button"
						key={category.id}
						onClick={() => onCategoryChange(category.id)}
						className={cn(
							"flex items-center gap-1 px-4 py-3 rounded-sm text-sm font-medium transition-all",
							selectedCategory === category.id
								? "bg-primary text-primary-foreground shadow-md"
								: "bg-muted text-gray-700 hover:bg-muted/80 hover:text-foreground dark:text-white",
						)}
					>
						{categoryIcons[category.id]}
						<span>
							{category.name} ({category?.total})
						</span>
					</button>
				))}
			</div>
		</div>
	);
}
