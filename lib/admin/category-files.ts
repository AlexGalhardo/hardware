import type { ProductCategory } from "../types";

/** Data file of each category. The category id is the one in the URL; four files are named differently. */
export const CATEGORY_FILES: Record<ProductCategory, string> = {
	smartphones: "smartphones.json",
	gpus: "gpus.json",
	cpus: "cpus.json",
	tablets: "tablets.json",
	drones: "drones.json",
	smartwatches: "smartwatches.json",
	notebooks: "notebooks.json",
	"maquinas-lavar-roupas": "maquina-lavar-roupas.json",
	geladeiras: "geladeiras.json",
	"smart-tvs": "smartvs.json",
	"fones-de-ouvido": "fones-de-ouvido.json",
	"cameras-de-seguranca": "cameras-de-seguranca.json",
	airfryers: "airfryers.json",
	microondas: "microondas.json",
	teclados: "teclados.json",
	mouses: "mouses.json",
	"caixa-de-som": "caixas-de-som.json",
	"placa-mae": "placas-mae.json",
	"ar-condicionado": "ar-condicionado.json",
	monitores: "monitores.json",
	cameras: "cameras.json",
	cafeteiras: "cafeteiras.json",
	impressoras: "impressoras.json",
	fechaduras: "fechaduras.json",
};

export function isCategory(value: string): value is ProductCategory {
	return Object.hasOwn(CATEGORY_FILES, value);
}

export function categoryPath(category: ProductCategory): string {
	return `data/${CATEGORY_FILES[category]}`;
}
