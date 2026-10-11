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

export type ProductCategory =
	| "smartphones"
	| "gpus"
	| "cpus"
	| "tablets"
	| "drones"
	| "smartwatches"
	| "notebooks"
	| "maquinas-lavar-roupas"
	| "geladeiras"
	| "smart-tvs"
	| "fones-de-ouvido"
	| "cameras-de-seguranca"
	| "airfryers"
	| "microondas"
	| "teclados"
	| "mouses"
	| "caixa-de-som"
	| "placa-mae"
	| "ar-condicionado"
	| "monitores"
	| "cameras"
	| "cafeteiras"
	| "impressoras"
	| "fechaduras";

export type Product =
	| Smartphone
	| GPU
	| CPU
	| Tablet
	| WashingMachine
	| Smartv
	| Drone
	| Smartwatch
	| FoneDeOuvido
	| Notebook
	| Geladeira
	| CameraDeSeguranca
	| Airfryer
	| Microondas
	| TecladoPC
	| Mouse
	| CaixaDeSom
	| PlacaMae
	| ArCondicionado
	| Monitor
	| Camera
	| Cafeteira
	| Impressora
	| Fechadura;

export interface BaseProduct {
	id: string;
	name: string;
	brand: string;
	line?: string;
	model: string;
	detailedModel?: string;
	color?: string;
	image: string;
	price: number;
	releaseDate: string;
	releaseMonth?: string;
	releaseYear?: number;
	origin?: string;
	category: ProductCategory;
	subcategory?: string;
	anatelNumber?: string;
	amazonUrl?: string;
	mercadolivreUrl?: string;
	shopeeUrl?: string;
	alphanumericModel?: string;
	version?: string;
	manufacturer?: string;
}

export interface CategoryInfo {
	id: ProductCategory;
	name: string;
	nameEn: string;
	icon: string;
	description: string;
	total?: number;
}

export interface ComparisonSlot {
	product: Product | null;
	position: number;
}

export interface SpecSection {
	id: string;
	title: string;
	specs: SpecItem[];
}

export interface SpecItem {
	key: string;
	label: string;
	getValue: (product: Product) => string | boolean | number | null;
	type: "text" | "boolean" | "rating";
}
