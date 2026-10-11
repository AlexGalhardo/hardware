import { SpecSection } from "../spec-configs";
import { BaseProduct, Product } from "../types";

function isAirfryer(product: Product): product is Airfryer {
	return product.category === "airfryers";
}

export interface Airfryer extends BaseProduct {
	category: "airfryers";
	specs: AirfryerSpecs;
}

function getAirfryer(p: Product): AirfryerSpecs | null {
	return isAirfryer(p) ? p.specs : null;
}

export interface AirfryerSpecs {
	capacity: {
		liters: number;
		servings?: number;
		baskets?: number;
	};
	power: {
		watts: number;
		voltage: string;
		frequency?: string;
	};
	temperature: {
		min: number;
		max: number;
		unit: "°C" | "°F";
	};
	timer: {
		max: number;
		unit: "minutos" | "horas";
		autoShutoff?: boolean;
	};
	technology: {
		type: string;
		rapidAir?: boolean;
		convection?: boolean;
	};
	programs: {
		preset?: number;
		customizable?: boolean;
		programs?: string[];
	};
	control: {
		type: "Digital" | "Analógico" | "Touch" | "App";
		display?: string;
		appControl?: boolean;
		voiceControl?: boolean;
	};
	features: {
		nonStick?: boolean;
		dishwasherSafe?: boolean;
		viewWindow?: boolean;
		keepWarm?: boolean;
		preheat?: boolean;
		shakeReminder?: boolean;
		oilLess?: boolean;
		removableBasket?: boolean;
	};
	safety: {
		overheatProtection?: boolean;
		autoShutoff?: boolean;
		coolTouch?: boolean;
		nonSlipFeet?: boolean;
	};
	accessories?: {
		included?: string[];
		compatible?: string[];
	};
	dimensions: {
		width: string;
		height: string;
		depth: string;
		weight: string;
		basketSize?: string;
	};
	maintenance: {
		cleaningEase?: string;
		filterReplacement?: boolean;
	};
	ratings: {
		costBenefit: number | null;
		cookingPerformance: number;
		easeOfUse: number;
		capacity: number;
		cleaning: number;
	};
}

export const airfryerSpecs: SpecSection[] = [
	{
		id: "ratings",
		title: "Notas",
		specs: [
			{
				key: "costBenefit",
				label: "Custo-benefício",
				getValue: (p) => getAirfryer(p)?.ratings.costBenefit ?? null,
				type: "rating",
			},
			{
				key: "cookingPerformance",
				label: "Performance de Cozimento",
				getValue: (p) => getAirfryer(p)?.ratings.cookingPerformance ?? null,
				type: "rating",
			},
			{
				key: "easeOfUse",
				label: "Facilidade de Uso",
				getValue: (p) => getAirfryer(p)?.ratings.easeOfUse ?? null,
				type: "rating",
			},
			{
				key: "capacityRating",
				label: "Capacidade",
				getValue: (p) => getAirfryer(p)?.ratings.capacity ?? null,
				type: "rating",
			},
			{
				key: "cleaning",
				label: "Facilidade de Limpeza",
				getValue: (p) => getAirfryer(p)?.ratings.cleaning ?? null,
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
			{ key: "model", label: "Modelo", getValue: (p) => p.model ?? "-", type: "text" },
			{
				key: "alphanumericModel",
				label: "Modelo Alfanumérico",
				getValue: (p) => p.alphanumericModel ?? "-",
				type: "text",
			},
			{ key: "releaseDate", label: "Lançamento", getValue: (p) => p.releaseDate ?? "-", type: "text" },
			{ key: "releaseYear", label: "Ano", getValue: (p) => p.releaseYear?.toString() ?? "-", type: "text" },
		],
	},
	{
		id: "capacity",
		title: "Capacidade",
		specs: [
			{
				key: "liters",
				label: "Litros",
				getValue: (p) => getAirfryer(p)?.capacity.liters.toString() ?? "-",
				type: "text",
			},
			{
				key: "servings",
				label: "Porções",
				getValue: (p) => getAirfryer(p)?.capacity.servings?.toString() ?? "-",
				type: "text",
			},
			{
				key: "baskets",
				label: "Cestos",
				getValue: (p) => getAirfryer(p)?.capacity.baskets?.toString() ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "power",
		title: "Potência",
		specs: [
			{
				key: "watts",
				label: "Watts",
				getValue: (p) => getAirfryer(p)?.power.watts.toString() ?? "-",
				type: "text",
			},
			{
				key: "voltage",
				label: "Voltagem",
				getValue: (p) => getAirfryer(p)?.power.voltage ?? "-",
				type: "text",
			},
			{
				key: "frequency",
				label: "Frequência",
				getValue: (p) => getAirfryer(p)?.power.frequency ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "temperature",
		title: "Temperatura",
		specs: [
			{
				key: "minTemp",
				label: "Mínima",
				getValue: (p) => {
					const airfryer = getAirfryer(p);
					return airfryer ? `${airfryer.temperature.min}${airfryer.temperature.unit}` : "-";
				},
				type: "text",
			},
			{
				key: "maxTemp",
				label: "Máxima",
				getValue: (p) => {
					const airfryer = getAirfryer(p);
					return airfryer ? `${airfryer.temperature.max}${airfryer.temperature.unit}` : "-";
				},
				type: "text",
			},
		],
	},
	{
		id: "timer",
		title: "Timer",
		specs: [
			{
				key: "maxTimer",
				label: "Tempo Máximo",
				getValue: (p) => {
					const airfryer = getAirfryer(p);
					return airfryer ? `${airfryer.timer.max} ${airfryer.timer.unit}` : "-";
				},
				type: "text",
			},
			{
				key: "autoShutoff",
				label: "Desligamento Automático",
				getValue: (p) => getAirfryer(p)?.timer.autoShutoff ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "technology",
		title: "Tecnologia",
		specs: [
			{
				key: "technologyType",
				label: "Tipo",
				getValue: (p) => getAirfryer(p)?.technology.type ?? "-",
				type: "text",
			},
			{
				key: "rapidAir",
				label: "Rapid Air",
				getValue: (p) => getAirfryer(p)?.technology.rapidAir ?? false,
				type: "boolean",
			},
			{
				key: "convection",
				label: "Convecção",
				getValue: (p) => getAirfryer(p)?.technology.convection ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "programs",
		title: "Programas",
		specs: [
			{
				key: "preset",
				label: "Programas Pré-definidos",
				getValue: (p) => getAirfryer(p)?.programs.preset?.toString() ?? "-",
				type: "text",
			},
			{
				key: "customizable",
				label: "Customizável",
				getValue: (p) => getAirfryer(p)?.programs.customizable ?? false,
				type: "boolean",
			},
			{
				key: "programsList",
				label: "Lista de Programas",
				getValue: (p) => getAirfryer(p)?.programs.programs?.join(", ") ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "control",
		title: "Controle",
		specs: [
			{
				key: "controlType",
				label: "Tipo",
				getValue: (p) => getAirfryer(p)?.control.type ?? "-",
				type: "text",
			},
			{
				key: "display",
				label: "Display",
				getValue: (p) => getAirfryer(p)?.control.display ?? "-",
				type: "text",
			},
			{
				key: "appControl",
				label: "Controle por App",
				getValue: (p) => getAirfryer(p)?.control.appControl ?? false,
				type: "boolean",
			},
			{
				key: "voiceControl",
				label: "Controle por Voz",
				getValue: (p) => getAirfryer(p)?.control.voiceControl ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "features",
		title: "Recursos",
		specs: [
			{
				key: "nonStick",
				label: "Antiaderente",
				getValue: (p) => getAirfryer(p)?.features.nonStick ?? false,
				type: "boolean",
			},
			{
				key: "dishwasherSafe",
				label: "Lavável na Lava-louças",
				getValue: (p) => getAirfryer(p)?.features.dishwasherSafe ?? false,
				type: "boolean",
			},
			{
				key: "viewWindow",
				label: "Janela de Visualização",
				getValue: (p) => getAirfryer(p)?.features.viewWindow ?? false,
				type: "boolean",
			},
			{
				key: "keepWarm",
				label: "Manter Aquecido",
				getValue: (p) => getAirfryer(p)?.features.keepWarm ?? false,
				type: "boolean",
			},
			{
				key: "preheat",
				label: "Pré-aquecimento",
				getValue: (p) => getAirfryer(p)?.features.preheat ?? false,
				type: "boolean",
			},
			{
				key: "shakeReminder",
				label: "Lembrete de Agitar",
				getValue: (p) => getAirfryer(p)?.features.shakeReminder ?? false,
				type: "boolean",
			},
			{
				key: "oilLess",
				label: "Sem Óleo",
				getValue: (p) => getAirfryer(p)?.features.oilLess ?? false,
				type: "boolean",
			},
			{
				key: "removableBasket",
				label: "Cesto Removível",
				getValue: (p) => getAirfryer(p)?.features.removableBasket ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "safety",
		title: "Segurança",
		specs: [
			{
				key: "overheatProtection",
				label: "Proteção contra Superaquecimento",
				getValue: (p) => getAirfryer(p)?.safety.overheatProtection ?? false,
				type: "boolean",
			},
			{
				key: "safetyAutoShutoff",
				label: "Desligamento Automático",
				getValue: (p) => getAirfryer(p)?.safety.autoShutoff ?? false,
				type: "boolean",
			},
			{
				key: "coolTouch",
				label: "Toque Frio",
				getValue: (p) => getAirfryer(p)?.safety.coolTouch ?? false,
				type: "boolean",
			},
			{
				key: "nonSlipFeet",
				label: "Pés Antiderrapantes",
				getValue: (p) => getAirfryer(p)?.safety.nonSlipFeet ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "accessories",
		title: "Acessórios",
		specs: [
			{
				key: "included",
				label: "Inclusos",
				getValue: (p) => getAirfryer(p)?.accessories?.included?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "compatible",
				label: "Compatíveis",
				getValue: (p) => getAirfryer(p)?.accessories?.compatible?.join(", ") ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "dimensions",
		title: "Dimensões",
		specs: [
			{
				key: "width",
				label: "Largura",
				getValue: (p) => getAirfryer(p)?.dimensions.width ?? "-",
				type: "text",
			},
			{
				key: "height",
				label: "Altura",
				getValue: (p) => getAirfryer(p)?.dimensions.height ?? "-",
				type: "text",
			},
			{
				key: "depth",
				label: "Profundidade",
				getValue: (p) => getAirfryer(p)?.dimensions.depth ?? "-",
				type: "text",
			},
			{
				key: "weight",
				label: "Peso",
				getValue: (p) => getAirfryer(p)?.dimensions.weight ?? "-",
				type: "text",
			},
			{
				key: "basketSize",
				label: "Tamanho do Cesto",
				getValue: (p) => getAirfryer(p)?.dimensions.basketSize ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "maintenance",
		title: "Manutenção",
		specs: [
			{
				key: "cleaningEase",
				label: "Facilidade de Limpeza",
				getValue: (p) => getAirfryer(p)?.maintenance.cleaningEase ?? "-",
				type: "text",
			},
			{
				key: "filterReplacement",
				label: "Troca de Filtro",
				getValue: (p) => getAirfryer(p)?.maintenance.filterReplacement ?? false,
				type: "boolean",
			},
		],
	},
];
