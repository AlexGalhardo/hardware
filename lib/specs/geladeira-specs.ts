import { SpecSection } from "../spec-configs";
import { BaseProduct, Product } from "../types";

function isGeladeira(product: Product): product is Geladeira {
	return product.category === "geladeiras";
}

export interface Geladeira extends BaseProduct {
	category: "geladeiras";
	specs: GeladeiraSpecs;
}

export interface GeladeiraSpecs {
	totalCapacityL: number;
	fridgeCapacityL: number;
	freezerCapacityL: number;

	widthCm: number;
	depthCm: number;
	heightCm: number;
	weightKg: number;

	doors: number;

	defrostType: "frost-free" | "manual" | "cycle-defrost";
	energyRating: string;

	inverter: boolean;
	controlPanel: "mecânico" | "digital" | "táctil";
	temperatureLevels?: number;

	freezerLocation: "superior" | "inferior";
	freezerShelves?: number;
	fridgeShelves?: number;

	iceMaker: boolean;
	wifi: boolean;
	doorAlarm: boolean;
	waterDispenser: boolean;
	iceDispenser: boolean;
	fastFreeze: boolean;
	deodorizerFilter: boolean;
	reversibleDoors: boolean;
	internalLight: boolean;

	multiAirFlow?: boolean;
	bottleRack?: boolean;
	canRack?: boolean;
	eggTray?: boolean;
	multiPurposeDrawer?: boolean;
	vegetableDrawer?: boolean;
	freezerDrawers?: number;

	ratings: {
		costBenefit: number | null;
		efficiency: number;
		internalSpace: number;
		buildQuality: number;
		features: number;
	};
}

export const geladeiraSpecs: SpecSection[] = [
	{
		id: "ratings",
		title: "Notas",
		specs: [
			{
				key: "costBenefit",
				label: "Custo-benefício",
				getValue: (p) => (isGeladeira(p) ? p?.specs?.ratings?.costBenefit : null),
				type: "rating",
			},
			{
				key: "efficiency",
				label: "Eficiência",
				getValue: (p) => (isGeladeira(p) ? p?.specs?.ratings?.efficiency : null),
				type: "rating",
			},
			{
				key: "internalSpace",
				label: "Espaço Interno",
				getValue: (p) => (isGeladeira(p) ? p?.specs?.ratings?.internalSpace : null),
				type: "rating",
			},
			{
				key: "buildQuality",
				label: "Construção",
				getValue: (p) => (isGeladeira(p) ? p?.specs?.ratings?.buildQuality : null),
				type: "rating",
			},
			{
				key: "features",
				label: "Recursos",
				getValue: (p) => (isGeladeira(p) ? p?.specs?.ratings?.features : null),
				type: "rating",
			},
		],
	},
	{
		id: "basic",
		title: "Informações Básicas",
		specs: [
			{ key: "brand", label: "Marca", getValue: (p) => p.brand ?? "-", type: "text" },
			{ key: "line", label: "Linha", getValue: (p) => p.line ?? "-", type: "text" },
			{ key: "name", label: "Nome", getValue: (p) => p.name ?? "-", type: "text" },
			{ key: "model", label: "Modelo", getValue: (p) => p.model ?? "-", type: "text" },
			{ key: "detailedModel", label: "Modelo Detalhado", getValue: (p) => p.detailedModel ?? "-", type: "text" },
			{
				key: "alphanumericModel",
				label: "Modelo Alfanumérico",
				getValue: (p) => p.alphanumericModel ?? "-",
				type: "text",
			},
			{ key: "manufacturer", label: "Fabricante", getValue: (p) => p.manufacturer ?? "-", type: "text" },
			{ key: "color", label: "Cor", getValue: (p) => p.color ?? "-", type: "text" },
			{ key: "releaseDate", label: "Lançamento", getValue: (p) => p.releaseDate ?? "-", type: "text" },
			{ key: "releaseYear", label: "Ano", getValue: (p) => p.releaseYear?.toString() ?? "-", type: "text" },
			{ key: "origin", label: "Origem", getValue: (p) => p.origin ?? "-", type: "text" },
			{ key: "anatelNumber", label: "Anatel", getValue: (p) => p.anatelNumber ?? "-", type: "text" },
		],
	},
	{
		id: "capacity",
		title: "Capacidade",
		specs: [
			{
				key: "totalCapacityL",
				label: "Total",
				getValue: (p) => (isGeladeira(p) ? `${p.specs.totalCapacityL} L` : "-"),
				type: "text",
			},
			{
				key: "fridgeCapacityL",
				label: "Geladeira",
				getValue: (p) => (isGeladeira(p) ? `${p.specs.fridgeCapacityL} L` : "-"),
				type: "text",
			},
			{
				key: "freezerCapacityL",
				label: "Freezer",
				getValue: (p) => (isGeladeira(p) ? `${p.specs.freezerCapacityL} L` : "-"),
				type: "text",
			},
		],
	},
	{
		id: "dimensions",
		title: "Dimensões",
		specs: [
			{
				key: "size",
				label: "Tamanho (L × P × A)",
				getValue: (p) =>
					isGeladeira(p) ? `${p.specs.widthCm} × ${p.specs.depthCm} × ${p.specs.heightCm} cm` : "-",
				type: "text",
			},
			{
				key: "weightKg",
				label: "Peso",
				getValue: (p) => (isGeladeira(p) ? `${p.specs.weightKg} kg` : "-"),
				type: "text",
			},
			{
				key: "doors",
				label: "Portas",
				getValue: (p) => (isGeladeira(p) ? p.specs.doors : "-"),
				type: "text",
			},
		],
	},
	{
		id: "technology",
		title: "Tecnologia",
		specs: [
			{
				key: "defrostType",
				label: "Degelo",
				getValue: (p) => (isGeladeira(p) ? p.specs.defrostType : "-"),
				type: "text",
			},
			{
				key: "energyRating",
				label: "Eficiência Energética",
				getValue: (p) => (isGeladeira(p) ? p.specs.energyRating : "-"),
				type: "text",
			},
			{
				key: "inverter",
				label: "Inverter",
				getValue: (p) => (isGeladeira(p) ? p.specs.inverter : false),
				type: "boolean",
			},
			{
				key: "controlPanel",
				label: "Painel",
				getValue: (p) => (isGeladeira(p) ? p.specs.controlPanel : "-"),
				type: "text",
			},
			{
				key: "temperatureLevels",
				label: "Níveis de Temperatura",
				getValue: (p) => (isGeladeira(p) ? (p.specs.temperatureLevels ?? "-") : "-"),
				type: "text",
			},
			{
				key: "freezerLocation",
				label: "Posição do Freezer",
				getValue: (p) => (isGeladeira(p) ? p.specs.freezerLocation : "-"),
				type: "text",
			},
			{
				key: "wifi",
				label: "Wi-Fi",
				getValue: (p) => (isGeladeira(p) ? p.specs.wifi : false),
				type: "boolean",
			},
			{
				key: "multiAirFlow",
				label: "Multi Air Flow",
				getValue: (p) => (isGeladeira(p) ? (p.specs.multiAirFlow ?? false) : false),
				type: "boolean",
			},
		],
	},
	{
		id: "features",
		title: "Recursos",
		specs: [
			{
				key: "doorAlarm",
				label: "Alarme porta aberta",
				getValue: (p) => (isGeladeira(p) ? p.specs.doorAlarm : false),
				type: "boolean",
			},
			{
				key: "waterDispenser",
				label: "Dispensador de água",
				getValue: (p) => (isGeladeira(p) ? p.specs.waterDispenser : false),
				type: "boolean",
			},
			{
				key: "iceDispenser",
				label: "Dispensador de gelo",
				getValue: (p) => (isGeladeira(p) ? p.specs.iceDispenser : false),
				type: "boolean",
			},
			{
				key: "iceMaker",
				label: "Fabricador de gelo",
				getValue: (p) => (isGeladeira(p) ? p.specs.iceMaker : false),
				type: "boolean",
			},
			{
				key: "fastFreeze",
				label: "Congelação rápida",
				getValue: (p) => (isGeladeira(p) ? p.specs.fastFreeze : false),
				type: "boolean",
			},
			{
				key: "deodorizerFilter",
				label: "Filtro desodorizador",
				getValue: (p) => (isGeladeira(p) ? p.specs.deodorizerFilter : false),
				type: "boolean",
			},
			{
				key: "reversibleDoors",
				label: "Portas reversíveis",
				getValue: (p) => (isGeladeira(p) ? p.specs.reversibleDoors : false),
				type: "boolean",
			},
			{
				key: "internalLight",
				label: "Luz interna",
				getValue: (p) => (isGeladeira(p) ? p.specs.internalLight : false),
				type: "boolean",
			},
		],
	},
	{
		id: "organization",
		title: "Organização Interna",
		specs: [
			{
				key: "fridgeShelves",
				label: "Prateleiras Geladeira",
				getValue: (p) => (isGeladeira(p) ? (p.specs.fridgeShelves ?? "-") : "-"),
				type: "text",
			},
			{
				key: "freezerShelves",
				label: "Prateleiras Freezer",
				getValue: (p) => (isGeladeira(p) ? (p.specs.freezerShelves ?? "-") : "-"),
				type: "text",
			},
			{
				key: "freezerDrawers",
				label: "Gavetas Freezer",
				getValue: (p) => (isGeladeira(p) ? (p.specs.freezerDrawers ?? "-") : "-"),
				type: "text",
			},
			{
				key: "bottleRack",
				label: "Porta garrafas",
				getValue: (p) => (isGeladeira(p) ? (p.specs.bottleRack ?? false) : false),
				type: "boolean",
			},
			{
				key: "canRack",
				label: "Porta latas",
				getValue: (p) => (isGeladeira(p) ? (p.specs.canRack ?? false) : false),
				type: "boolean",
			},
			{
				key: "eggTray",
				label: "Porta ovos",
				getValue: (p) => (isGeladeira(p) ? (p.specs.eggTray ?? false) : false),
				type: "boolean",
			},
			{
				key: "multiPurposeDrawer",
				label: "Gaveta multiúso",
				getValue: (p) => (isGeladeira(p) ? (p.specs.multiPurposeDrawer ?? false) : false),
				type: "boolean",
			},
			{
				key: "vegetableDrawer",
				label: "Gaveta vegetais",
				getValue: (p) => (isGeladeira(p) ? (p.specs.vegetableDrawer ?? false) : false),
				type: "boolean",
			},
		],
	},
];
