import { cpuSpecs } from "./specs/cpu-specs";
import { droneSpecs } from "./specs/drone-specs";
import { geladeiraSpecs } from "./specs/geladeira-specs";
import { gpuSpecs } from "./specs/gpu-specs";
import { washingMachineSpecs } from "./specs/maquina-lavar-roupa-specs";
import { notebookSpecs } from "./specs/notebook-specs";
import { smartphoneSpecs } from "./specs/smartphone-specs";
import { smartvSpecs } from "./specs/smart-tvs-specs";
import { smartwatchSpecs } from "./specs/smartwatch-specs";
import { tabletSpecs } from "./specs/tablet-specs";
import type { Product, ProductCategory } from "./types";
import { cameraDeSegurancaSpecs } from "./specs/camera-de-seguranca-specs";
import { airfryerSpecs } from "./specs/airfryer-specs";
import { microondasSpecs } from "./specs/microondas-specs";
import { mouseSpecs } from "./specs/mouse-specs";
import { caixaDeSomSpecs } from "./specs/caixa-de-som-specs";
import { tecladoPCSpecs } from "./specs/teclado-pc-specs";
import { placaMaeSpecs } from "./specs/placa-mae-specs";
import { fonesDeOuvidoSpecs } from "./specs/fones-de-ouvido-specs";
import { arCondicionadoSpecs } from "./specs/ar-condicionado-specs";
import { monitorSpecs } from "./specs/monitor-specs";
import { cameraSpecs } from "./specs/camera-specs";
import { cafeteiraSpecs } from "./specs/cafeteira-specs";
import { impressoraSpecs } from "./specs/impressora-specs";
import { fechaduraSpecs } from "./specs/fechadura-specs";

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

export const specConfigs: Record<ProductCategory, SpecSection[]> = {
	smartphones: smartphoneSpecs,
	gpus: gpuSpecs,
	cpus: cpuSpecs,
	tablets: tabletSpecs,
	geladeiras: geladeiraSpecs,
	drones: droneSpecs,
	smartwatches: smartwatchSpecs,
	"fones-de-ouvido": fonesDeOuvidoSpecs,
	notebooks: notebookSpecs,
	"smart-tvs": smartvSpecs,
	"maquinas-lavar-roupas": washingMachineSpecs,
	"cameras-de-seguranca": cameraDeSegurancaSpecs,
	airfryers: airfryerSpecs,
	microondas: microondasSpecs,
	teclados: tecladoPCSpecs,
	mouses: mouseSpecs,
	"caixa-de-som": caixaDeSomSpecs,
	"placa-mae": placaMaeSpecs,
	"ar-condicionado": arCondicionadoSpecs,
	monitores: monitorSpecs,
	cameras: cameraSpecs,
	cafeteiras: cafeteiraSpecs,
	impressoras: impressoraSpecs,
	fechaduras: fechaduraSpecs,
};

export function getSpecConfig(category: ProductCategory): SpecSection[] {
	return specConfigs[category] || [];
}
