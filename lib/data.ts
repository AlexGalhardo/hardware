import airfryers from "@/data/airfryers.json";
import arCondicionadoData from "@/data/ar-condicionado.json";
import cafeteirasData from "@/data/cafeteiras.json";
import caixasSomData from "@/data/caixas-de-som.json";
import camerasData from "@/data/cameras.json";
import camerasSegurancaData from "@/data/cameras-de-seguranca.json";
import cpusData from "@/data/cpus.json";
import dronesData from "@/data/drones.json";
import fechadurasData from "@/data/fechaduras.json";
import fonesDeOuvidoData from "@/data/fones-de-ouvido.json";
import geladeirasData from "@/data/geladeiras.json";
import gpusData from "@/data/gpus.json";
import impressorasData from "@/data/impressoras.json";
import roupasData from "@/data/maquina-lavar-roupas.json";
import microondas from "@/data/microondas.json";
import monitoresData from "@/data/monitores.json";
import mousesPcData from "@/data/mouses.json";
import notebooksData from "@/data/notebooks.json";
import placasMaeData from "@/data/placas-mae.json";
import smartphonesData from "@/data/smartphones.json";
import smartvsData from "@/data/smartvs.json";
import smartwatchesData from "@/data/smartwatches.json";
import tabletsData from "@/data/tablets.json";
import tecladosPcData from "@/data/teclados.json";
import { Airfryer } from "./specs/airfryer-specs";
import { ArCondicionado } from "./specs/ar-condicionado-specs";
import { Cafeteira } from "./specs/cafeteira-specs";
import { CaixaDeSom } from "./specs/caixa-de-som-specs";
import { CameraDeSeguranca } from "./specs/camera-de-seguranca-specs";
import { Camera } from "./specs/camera-specs";
import { CPU } from "./specs/cpu-specs";
import { Drone } from "./specs/drone-specs";
import { Fechadura } from "./specs/fechadura-specs";
import { FoneDeOuvido } from "./specs/fones-de-ouvido-specs";
import { Geladeira } from "./specs/geladeira-specs";
import { GPU } from "./specs/gpu-specs";
import { Impressora } from "./specs/impressora-specs";
import { WashingMachine } from "./specs/maquina-lavar-roupa-specs";
import { Microondas } from "./specs/microondas-specs";
import { Monitor } from "./specs/monitor-specs";
import { Mouse } from "./specs/mouse-specs";
import { Notebook } from "./specs/notebook-specs";
import { PlacaMae } from "./specs/placa-mae-specs";
import { Smartv } from "./specs/smart-tvs-specs";
import { Smartphone } from "./specs/smartphone-specs";
import { Smartwatch } from "./specs/smartwatch-specs";
import { Tablet } from "./specs/tablet-specs";
import { TecladoPC } from "./specs/teclado-pc-specs";
import type { CategoryInfo, Product, ProductCategory } from "./types";

export const categories: CategoryInfo[] = [
	{
		id: "smartphones",
		name: "Smartphones",
		nameEn: "Smartphones",
		icon: "smartphone",
		description: "Compare os melhores celulares do mercado",
		total: (smartphonesData as Smartphone[]).length,
	},
	{
		id: "gpus",
		name: "GPUs",
		nameEn: "GPUs",
		icon: "gpu",
		description: "Compare placas gráficas para gaming e trabalho",
		total: (gpusData as unknown as GPU[]).length,
	},
	{
		id: "cpus",
		name: "CPUs",
		nameEn: "CPUs",
		icon: "cpu",
		description: "Compare CPUs Intel, AMD e Apple",
		total: (cpusData as unknown as CPU[]).length,
	},
	{
		id: "tablets",
		name: "Tablets",
		nameEn: "Tablets",
		icon: "tablet",
		description: "Compare tablets para produtividade e entretenimento",
		total: (tabletsData as unknown as Tablet[]).length,
	},
	{
		id: "notebooks",
		name: "Notebooks",
		nameEn: "Notebooks",
		icon: "notebook",
		description: "Compare notebooks para produtividade e entretenimento",
		total: (notebooksData as unknown as Notebook[]).length,
	},
	{
		id: "geladeiras",
		name: "Geladeiras",
		nameEn: "Refrigerators",
		icon: "refrigerator",
		description: "Compare geladeiras para sua cozinha",
		total: (geladeirasData as unknown as Geladeira[]).length,
	},
	{
		id: "drones",
		name: "Drones",
		nameEn: "Drones",
		icon: "drone",
		description: "Compare drones para fotografia e diversão",
		total: (dronesData as unknown as Drone[]).length,
	},
	{
		id: "smartwatches",
		name: "Smartwatches",
		nameEn: "Smartwatches",
		icon: "watch",
		description: "Compare relógios inteligentes",
		total: (smartwatchesData as unknown as Smartwatch[]).length,
	},
	{
		id: "fones-de-ouvido",
		name: "Fones De Ouvido",
		nameEn: "TWS Earbuds",
		icon: "earbuds",
		description: "Compare fones true wireless",
		total: (fonesDeOuvidoData as unknown as FoneDeOuvido[]).length,
	},
	{
		id: "smart-tvs",
		name: "Smart TVs",
		nameEn: "Smart TVs",
		icon: "tv",
		description: "Compare smart TVs para sua sala",
		total: (smartvsData as unknown as Smartv[]).length,
	},
	{
		id: "maquinas-lavar-roupas",
		name: "Máquina Lavar Roupas",
		nameEn: "Clothes",
		icon: "washing-machine",
		description: "Compare Máquinas De Lavar Roupas para todas as ocasiões",
		total: (roupasData as unknown as WashingMachine[]).length,
	},
	{
		id: "cameras-de-seguranca",
		name: "Câmeras de Segurança",
		nameEn: "Security Cameras",
		icon: "camera",
		description: "Compare câmeras de segurança para sua casa",
		total: (camerasSegurancaData as unknown as CameraDeSeguranca[]).length,
	},
	{
		id: "airfryers",
		name: "Air Fryers",
		nameEn: "Air Fryers",
		icon: "air-fryer",
		description: "Compare Air Fryers para sua cozinha",
		total: (airfryers as unknown as Airfryer[]).length,
	},
	{
		id: "microondas",
		name: "Microondas",
		nameEn: "Ovens",
		icon: "oven",
		description: "Compare microondas para sua cozinha",
		total: (microondas as unknown as Microondas[]).length,
	},
	{
		id: "teclados",
		name: "Teclados",
		nameEn: "Keyboards",
		icon: "keyboard",
		description: "Compare teclados para seu computador",
		total: (tecladosPcData as unknown as TecladoPC[]).length,
	},
	{
		id: "mouses",
		name: "Mouses",
		nameEn: "Mice",
		icon: "mouse",
		description: "Compare mouses para seu computador",
		total: (mousesPcData as unknown as Mouse[]).length,
	},
	{
		id: "caixa-de-som",
		name: "Caixas de Som",
		nameEn: "Speakers",
		icon: "speaker",
		description: "Compare caixas de som para sua música",
		total: (caixasSomData as unknown as CaixaDeSom[]).length,
	},
	{
		id: "placa-mae",
		name: "Placas Mãe",
		nameEn: "Motherboards",
		icon: "motherboard",
		description: "Compare placas mãe para seu computador",
		total: (placasMaeData as unknown as PlacaMae[]).length,
	},
	{
		id: "ar-condicionado",
		name: "Ar Condicionado",
		nameEn: "Air Conditioner",
		icon: "air-conditioner",
		description: "Compare ar condicionado para sua casa",
		total: (arCondicionadoData as unknown as ArCondicionado[]).length,
	},
	{
		id: "monitores",
		name: "Monitores",
		nameEn: "Monitors",
		icon: "monitor",
		description: "Compare monitores para sua sala",
		total: (monitoresData as unknown as Monitor[]).length,
	},
	{
		id: "cameras",
		name: "Câmeras",
		nameEn: "Cameras",
		icon: "camera",
		description: "Compare câmeras para sua casa",
		total: (camerasData as unknown as Camera[]).length,
	},
	{
		id: "cafeteiras",
		name: "Cafeteiras",
		nameEn: "Cafeteiras",
		icon: "coffee",
		description: "Compare cafeteiras para sua casa",
		total: (cafeteirasData as unknown as Cafeteira[]).length,
	},
	{
		id: "impressoras",
		name: "Impressoras",
		nameEn: "Printers",
		icon: "printer",
		description: "Compare impressoras para sua casa",
		total: (impressorasData as unknown as Impressora[]).length,
	},
	{
		id: "fechaduras",
		name: "Fechaduras",
		nameEn: "Locks",
		icon: "lock",
		description: "Compare fechaduras para sua casa",
		total: (fechadurasData as unknown as Fechadura[]).length,
	},
];

const dataMap: Record<ProductCategory, Product[]> = {
	smartphones: smartphonesData as Smartphone[],
	gpus: gpusData as unknown as GPU[],
	cpus: cpusData as unknown as CPU[],
	tablets: tabletsData as unknown as Tablet[],
	notebooks: notebooksData as unknown as Notebook[],
	"maquinas-lavar-roupas": roupasData as unknown as WashingMachine[],
	drones: dronesData as unknown as Drone[],
	smartwatches: smartwatchesData as unknown as Smartwatch[],
	"fones-de-ouvido": fonesDeOuvidoData as unknown as FoneDeOuvido[],
	geladeiras: geladeirasData as unknown as Geladeira[],
	"smart-tvs": smartvsData as unknown as Smartv[],
	"cameras-de-seguranca": camerasSegurancaData as unknown as CameraDeSeguranca[],
	airfryers: airfryers as unknown as Airfryer[],
	microondas: microondas as unknown as Microondas[],
	teclados: tecladosPcData as unknown as TecladoPC[],
	mouses: mousesPcData as unknown as Mouse[],
	"caixa-de-som": caixasSomData as unknown as CaixaDeSom[],
	"placa-mae": placasMaeData as unknown as PlacaMae[],
	"ar-condicionado": arCondicionadoData as unknown as ArCondicionado[],
	monitores: monitoresData as unknown as Monitor[],
	cameras: camerasData as unknown as Camera[],
	cafeteiras: cafeteirasData as unknown as Cafeteira[],
	impressoras: impressorasData as unknown as Impressora[],
	fechaduras: fechadurasData as unknown as Fechadura[],
};

export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
	return dataMap[category] || [];
}

export async function searchProducts(category: ProductCategory, query: string): Promise<Product[]> {
	const products = await getProductsByCategory(category);
	const normalizedQuery = query.toLowerCase().trim();

	if (!normalizedQuery) return products;

	return products.filter(
		(product) =>
			product.name.toLowerCase().includes(normalizedQuery) ||
			product.brand.toLowerCase().includes(normalizedQuery),
	);
}

export async function getProductById(id: string): Promise<Product | null> {
	for (const category of Object.keys(dataMap) as ProductCategory[]) {
		const products = dataMap[category];
		const product = products.find((p) => p.id === id);
		if (product) return product;
	}
	return null;
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
	const products: Product[] = [];
	for (const id of ids) {
		const product = await getProductById(id);
		if (product) products.push(product);
	}
	return products;
}

export function getCategoryInfo(categoryId: ProductCategory): CategoryInfo | undefined {
	return categories.find((c) => c.id === categoryId);
}

export function formatPrice(price: number): string {
	if (price === 0) return "Sob consulta";
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(price);
}

export function formatRating(rating: number | null): string {
	if (rating === null) return "-";
	return rating.toFixed(1);
}
