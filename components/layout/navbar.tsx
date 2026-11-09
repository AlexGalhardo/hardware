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
	Menu,
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
	X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PiSecurityCamera } from "react-icons/pi";
import { categories } from "@/lib/data";
import type { Product, ProductCategory } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SearchModal } from "../search-modal";
import { ThemeToggle } from "./theme-toggle";

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
	"cameras-de-seguranca": <PiSecurityCamera className="h-5 w-5" />,
	airfryers: <Flame className="h-5 w-5" />,
	microondas: <Waves className="h-5 w-5" />,
	teclados: <Keyboard className="h-5 w-5" />,
	mouses: <Mouse className="h-5 w-5" />,
	"caixa-de-som": <Volume2 className="h-5 w-5" />,
	"placa-mae": <CircuitBoard className="h-5 w-5" />,
	"ar-condicionado": <AirVent className="h-5 w-5" />,
	monitores: <Monitor className="h-5 w-5" />,
	cameras: <Camera className="h-5 w-5" />,
	cafeteiras: <Coffee className="h-5 w-5" />,
	impressoras: <Printer className="h-5 w-5" />,
	fechaduras: <Lock className="h-5 w-5" />,
};

const categoryHoverColors: Record<ProductCategory, string> = {
	smartphones: "hover:bg-blue-500 hover:text-white",
	gpus: "hover:bg-purple-500 hover:text-white",
	cpus: "hover:bg-red-500 hover:text-white",
	tablets: "hover:bg-green-500 hover:text-white",
	"maquinas-lavar-roupas": "hover:bg-cyan-500 hover:text-white",
	"smart-tvs": "hover:bg-indigo-500 hover:text-white",
	notebooks: "hover:bg-orange-500 hover:text-white",
	drones: "hover:bg-pink-500 hover:text-white",
	smartwatches: "hover:bg-yellow-500 hover:text-white",
	"fones-de-ouvido": "hover:bg-rose-500 hover:text-white",
	geladeiras: "hover:bg-emerald-500 hover:text-white",
	"cameras-de-seguranca": "hover:bg-slate-500 hover:text-white",
	airfryers: "hover:bg-amber-500 hover:text-white",
	microondas: "hover:bg-teal-500 hover:text-white",
	teclados: "hover:bg-violet-500 hover:text-white",
	mouses: "hover:bg-fuchsia-500 hover:text-white",
	"caixa-de-som": "hover:bg-lime-500 hover:text-white",
	"placa-mae": "hover:bg-sky-500 hover:text-white",
	"ar-condicionado": "hover:bg-blue-400 hover:text-white",
	monitores: "hover:bg-pink-500 hover:text-white",
	cameras: "hover:bg-purple-600 hover:text-white",
	cafeteiras: "hover:bg-yellow-600 hover:text-white",
	impressoras: "hover:bg-gray-600 hover:text-white",
	fechaduras: "hover:bg-zinc-600 hover:text-white",
};

const categoryActiveColors: Record<ProductCategory, string> = {
	smartphones: "bg-blue-500 text-white shadow-md",
	gpus: "bg-purple-500 text-white shadow-md",
	cpus: "bg-red-500 text-white shadow-md",
	tablets: "bg-green-500 text-white shadow-md",
	"maquinas-lavar-roupas": "bg-cyan-500 text-white shadow-md",
	"smart-tvs": "bg-indigo-500 text-white shadow-md",
	notebooks: "bg-orange-500 text-white shadow-md",
	drones: "bg-pink-500 text-white shadow-md",
	smartwatches: "bg-yellow-500 text-white shadow-md",
	"fones-de-ouvido": "bg-rose-500 text-white shadow-md",
	geladeiras: "bg-emerald-500 text-white shadow-md",
	"cameras-de-seguranca": "bg-slate-500 text-white shadow-md",
	airfryers: "bg-amber-500 text-white shadow-md",
	microondas: "bg-teal-500 text-white shadow-md",
	teclados: "bg-violet-500 text-white shadow-md",
	mouses: "bg-fuchsia-500 text-white shadow-md",
	"caixa-de-som": "bg-lime-500 text-white shadow-md",
	"placa-mae": "bg-sky-500 text-white shadow-md",
	"ar-condicionado": "bg-blue-400 text-white shadow-md",
	monitores: "bg-pink-500 text-white shadow-md",
	cameras: "bg-purple-600 text-white shadow-md",
	cafeteiras: "bg-yellow-600 text-white shadow-md",
	impressoras: "bg-gray-600 text-white shadow-md",
	fechaduras: "bg-zinc-600 text-white shadow-md",
};

interface NavbarProps {
	allProducts: Product[];
}

export function Navbar({ allProducts }: NavbarProps) {
	const pathname = usePathname();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const currentCategory = pathname.split("/")[1] as ProductCategory;

	const closeMobileMenu = () => setMobileMenuOpen(false);

	return (
		<header className="w-full bg-background border-b border-border">
			<div className="container px-4 mx-auto">
				<div className="flex h-16 items-center justify-between gap-2">
					<div className="flex items-center gap-2 flex-1 xl:flex-initial">
						<a href="/" className="flex-shrink-0">
							<span className="font-orbitron uppercase font-bold text-lg flex items-center gap-2 hover:opacity-80 transition-opacity">
								<img
									src="/new-logo.webp"
									alt="Logo TudoHardware.com"
									width={40}
									height={40}
									className="rounded-lg"
								/>
								<span className="hidden xl:inline text-black dark:text-white">TUDO HARDWARE</span>
							</span>
						</a>

						<div className="flex-1 xl:hidden">
							<SearchModal allProducts={allProducts} />
						</div>
					</div>

					<div className="hidden xl:flex flex-1 items-center justify-center max-w-2xl">
						<SearchModal allProducts={allProducts} />
					</div>

					<div className="hidden xl:flex items-center gap-2 flex-shrink-0">
						<ThemeToggle />
					</div>

					<div className="flex xl:hidden items-center gap-2 flex-shrink-0">
						<ThemeToggle />
						<button
							type="button"
							className="flex items-center justify-center p-2 rounded-lg hover:bg-muted transition-colors"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							aria-label="Toggle menu"
						>
							{mobileMenuOpen ? (
								<X className="h-6 w-6 text-foreground" />
							) : (
								<Menu className="h-6 w-6 text-foreground" />
							)}
						</button>
					</div>
				</div>

				<div className="hidden xl:flex h-12 items-center justify-between border-t border-border">
					{categories.map((category) => {
						const isActive = currentCategory === category.id;

						return (
							<a
								key={category.id}
								href={`/${category.id}`}
								title={category.name}
								className={cn(
									"flex items-center justify-center p-2 rounded-lg transition-all",
									isActive
										? categoryActiveColors[category.id]
										: `text-gray-700 dark:text-white ${categoryHoverColors[category.id]}`,
								)}
							>
								{categoryIcons[category.id]}
							</a>
						);
					})}
				</div>

				{mobileMenuOpen && (
					<div className="xl:hidden border-t border-border py-4 space-y-4">
						<div className="space-y-1">
							<p className="px-2 text-xs font-semibold text-black dark:text-white uppercase tracking-wider mb-2">
								Categorias
							</p>

							{categories.map((category) => {
								const isActive = currentCategory === category.id;

								return (
									<a
										key={category.id}
										href={`/${category.id}`}
										onClick={closeMobileMenu}
										className={cn(
											"flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
											isActive
												? categoryActiveColors[category.id]
												: `text-gray-700 dark:text-white ${categoryHoverColors[category.id]}`,
										)}
									>
										{categoryIcons[category.id]}
										<span>{category.name}</span>
									</a>
								);
							})}
						</div>
					</div>
				)}
			</div>
		</header>
	);
}
