import { SpecSection } from "../spec-configs";
import { BaseProduct, Product } from "../types";

function isSmartwatch(product: Product): product is Smartwatch {
	return product.category === "smartwatches";
}

export interface Smartwatch extends BaseProduct {
	category: "smartwatches";
	specs: SmartwatchSpecs;
}

function getSmartwatch(p: Product): SmartwatchSpecs | null {
	return isSmartwatch(p) ? p.specs : null;
}

export interface SmartwatchSpecs {
	display: {
		size: string;
		resolution?: string;
		type: string;
		alwaysOn?: boolean;
	};
	processor?: string;
	ram: string;
	storage: string;
	os?: string;
	compatibility: string;
	batteryLife: string;
	waterResistance: string;
	waterResistanceDepth?: string;
	dimensions?: string;
	weight?: string;
	case: {
		size: string;
		material: string;
		color?: string;
	};
	bezel: {
		material: string;
		color?: string;
	};
	strap: {
		material: string;
		color?: string;
		type: string;
	};
	sensors: {
		heartRate: boolean;
		spo2: boolean;
		gps: boolean;
		altimeter?: boolean;
		compass?: boolean;
		accelerometer?: boolean;
		gyroscope?: boolean;
		ecg: boolean;
		temperature?: boolean;
		bloodPressure?: boolean;
	};
	features: {
		calls: boolean;
		music: boolean;
		nfc: boolean;
		voiceAssistant: boolean;
		sleepTracking: boolean;
		stressMonitoring?: boolean;
		cameraControl?: boolean;
		calculator?: boolean;
		calendar?: boolean;
		findDevice?: boolean;
		chatGPT?: boolean;
		dynamicIsland?: boolean;
		sportsMode?: boolean;
		calorieTracking?: boolean;
		textReplies?: boolean;
		audioReplies?: boolean;
	};
	connectivity: {
		bluetooth: string;
		wifi: boolean;
		cellular: boolean;
	};
	languages?: string[];
	accessories?: string[];
	isKids?: boolean;
	isSmartband?: boolean;
	version?: string;
	ratings: {
		costBenefit: number | null;
		display: number;
		healthFeatures: number;
		battery: number;
		fitness: number;
	};
}

export const smartwatchSpecs: SpecSection[] = [
	{
		id: "ratings",
		title: "Notas",
		specs: [
			{
				key: "costBenefit",
				label: "Custo-benefício",
				getValue: (p) => getSmartwatch(p)?.ratings.costBenefit ?? null,
				type: "rating",
			},
			{
				key: "display",
				label: "Tela",
				getValue: (p) => getSmartwatch(p)?.ratings.display ?? null,
				type: "rating",
			},
			{
				key: "healthFeatures",
				label: "Recursos de Saúde",
				getValue: (p) => getSmartwatch(p)?.ratings.healthFeatures ?? null,
				type: "rating",
			},
			{
				key: "battery",
				label: "Bateria",
				getValue: (p) => getSmartwatch(p)?.ratings.battery ?? null,
				type: "rating",
			},
			{
				key: "fitness",
				label: "Fitness",
				getValue: (p) => getSmartwatch(p)?.ratings.fitness ?? null,
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
			{ key: "color", label: "Cor", getValue: (p) => p.color ?? "-", type: "text" },
			{ key: "releaseDate", label: "Lançamento", getValue: (p) => p.releaseDate ?? "-", type: "text" },
			{ key: "releaseYear", label: "Ano", getValue: (p) => p.releaseYear?.toString() ?? "-", type: "text" },
			{ key: "anatelNumber", label: "Anatel", getValue: (p) => p.anatelNumber ?? "-", type: "text" },
		],
	},
	{
		id: "display",
		title: "Tela",
		specs: [
			{ key: "size", label: "Tamanho", getValue: (p) => getSmartwatch(p)?.display.size ?? "-", type: "text" },
			{ key: "type", label: "Tipo", getValue: (p) => getSmartwatch(p)?.display.type ?? "-", type: "text" },
			{
				key: "resolution",
				label: "Resolução",
				getValue: (p) => getSmartwatch(p)?.display.resolution ?? "-",
				type: "text",
			},
			{
				key: "alwaysOn",
				label: "Always On",
				getValue: (p) => getSmartwatch(p)?.display.alwaysOn ?? false,
				type: "boolean",
			},
		],
	},

	{
		id: "hardware",
		title: "Hardware",
		specs: [
			{
				key: "processor",
				label: "Processador",
				getValue: (p) => getSmartwatch(p)?.processor ?? "-",
				type: "text",
			},
			{ key: "ram", label: "RAM", getValue: (p) => getSmartwatch(p)?.ram ?? "-", type: "text" },
			{ key: "storage", label: "Armazenamento", getValue: (p) => getSmartwatch(p)?.storage ?? "-", type: "text" },
		],
	},

	{
		id: "case",
		title: "Caixa",
		specs: [
			{ key: "size", label: "Tamanho", getValue: (p) => getSmartwatch(p)?.case.size ?? "-", type: "text" },
			{
				key: "material",
				label: "Material",
				getValue: (p) => getSmartwatch(p)?.case.material ?? "-",
				type: "text",
			},
			{ key: "color", label: "Cor", getValue: (p) => getSmartwatch(p)?.case.color ?? "-", type: "text" },
		],
	},

	{
		id: "bezel",
		title: "Bisel",
		specs: [
			{
				key: "material",
				label: "Material",
				getValue: (p) => getSmartwatch(p)?.bezel.material ?? "-",
				type: "text",
			},
			{ key: "color", label: "Cor", getValue: (p) => getSmartwatch(p)?.bezel.color ?? "-", type: "text" },
		],
	},

	{
		id: "strap",
		title: "Pulseira",
		specs: [
			{
				key: "material",
				label: "Material",
				getValue: (p) => getSmartwatch(p)?.strap.material ?? "-",
				type: "text",
			},
			{ key: "type", label: "Tipo", getValue: (p) => getSmartwatch(p)?.strap.type ?? "-", type: "text" },
			{ key: "color", label: "Cor", getValue: (p) => getSmartwatch(p)?.strap.color ?? "-", type: "text" },
		],
	},

	{
		id: "dimensions",
		title: "Dimensões",
		specs: [
			{
				key: "dimensions",
				label: "Dimensões",
				getValue: (p) => getSmartwatch(p)?.dimensions ?? "-",
				type: "text",
			},
			{ key: "weight", label: "Peso", getValue: (p) => getSmartwatch(p)?.weight ?? "-", type: "text" },
		],
	},

	{
		id: "sensors",
		title: "Sensores",
		specs: [
			{
				key: "heartRate",
				label: "Frequência Cardíaca",
				getValue: (p) => getSmartwatch(p)?.sensors.heartRate ?? false,
				type: "boolean",
			},
			{ key: "spo2", label: "SpO2", getValue: (p) => getSmartwatch(p)?.sensors.spo2 ?? false, type: "boolean" },
			{ key: "gps", label: "GPS", getValue: (p) => getSmartwatch(p)?.sensors.gps ?? false, type: "boolean" },
			{
				key: "altimeter",
				label: "Altímetro",
				getValue: (p) => getSmartwatch(p)?.sensors.altimeter ?? false,
				type: "boolean",
			},
			{
				key: "compass",
				label: "Bússola",
				getValue: (p) => getSmartwatch(p)?.sensors.compass ?? false,
				type: "boolean",
			},
			{
				key: "accelerometer",
				label: "Acelerômetro",
				getValue: (p) => getSmartwatch(p)?.sensors.accelerometer ?? false,
				type: "boolean",
			},
			{
				key: "gyroscope",
				label: "Giroscópio",
				getValue: (p) => getSmartwatch(p)?.sensors.gyroscope ?? false,
				type: "boolean",
			},
			{ key: "ecg", label: "ECG", getValue: (p) => getSmartwatch(p)?.sensors.ecg ?? false, type: "boolean" },
			{
				key: "temperature",
				label: "Temperatura",
				getValue: (p) => getSmartwatch(p)?.sensors.temperature ?? false,
				type: "boolean",
			},
			{
				key: "bloodPressure",
				label: "Pressão",
				getValue: (p) => getSmartwatch(p)?.sensors.bloodPressure ?? false,
				type: "boolean",
			},
		],
	},

	{
		id: "battery",
		title: "Bateria",
		specs: [
			{
				key: "batteryLife",
				label: "Duração",
				getValue: (p) => getSmartwatch(p)?.batteryLife ?? "-",
				type: "text",
			},
		],
	},

	{
		id: "features",
		title: "Recursos",
		specs: [
			{
				key: "calls",
				label: "Chamadas",
				getValue: (p) => getSmartwatch(p)?.features.calls ?? false,
				type: "boolean",
			},
			{
				key: "music",
				label: "Música",
				getValue: (p) => getSmartwatch(p)?.features.music ?? false,
				type: "boolean",
			},
			{ key: "nfc", label: "NFC", getValue: (p) => getSmartwatch(p)?.features.nfc ?? false, type: "boolean" },
			{
				key: "voiceAssistant",
				label: "Assistente",
				getValue: (p) => getSmartwatch(p)?.features.voiceAssistant ?? false,
				type: "boolean",
			},
			{
				key: "sleepTracking",
				label: "Sono",
				getValue: (p) => getSmartwatch(p)?.features.sleepTracking ?? false,
				type: "boolean",
			},
			{
				key: "stressMonitoring",
				label: "Estresse",
				getValue: (p) => getSmartwatch(p)?.features.stressMonitoring ?? false,
				type: "boolean",
			},
			{
				key: "sportsMode",
				label: "Modo Esportivo",
				getValue: (p) => getSmartwatch(p)?.features.sportsMode ?? false,
				type: "boolean",
			},
			{
				key: "calorieTracking",
				label: "Calorias",
				getValue: (p) => getSmartwatch(p)?.features.calorieTracking ?? false,
				type: "boolean",
			},
		],
	},

	{
		id: "connectivity",
		title: "Conectividade",
		specs: [
			{
				key: "bluetooth",
				label: "Bluetooth",
				getValue: (p) => getSmartwatch(p)?.connectivity.bluetooth ?? "-",
				type: "text",
			},
			{
				key: "wifi",
				label: "Wi-Fi",
				getValue: (p) => getSmartwatch(p)?.connectivity.wifi ?? false,
				type: "boolean",
			},
			{
				key: "cellular",
				label: "Rede Móvel",
				getValue: (p) => getSmartwatch(p)?.connectivity.cellular ?? false,
				type: "boolean",
			},
		],
	},

	{
		id: "compatibility",
		title: "Compatibilidade",
		specs: [
			{
				key: "compatibility",
				label: "Compatível com",
				getValue: (p) => getSmartwatch(p)?.compatibility ?? "-",
				type: "text",
			},
			{ key: "os", label: "Sistema", getValue: (p) => getSmartwatch(p)?.os ?? "-", type: "text" },
		],
	},

	{
		id: "other",
		title: "Outros",
		specs: [
			{
				key: "languages",
				label: "Idiomas",
				getValue: (p) => getSmartwatch(p)?.languages?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "accessories",
				label: "Acessórios",
				getValue: (p) => getSmartwatch(p)?.accessories?.join(", ") ?? "-",
				type: "text",
			},
			{ key: "isKids", label: "Infantil", getValue: (p) => getSmartwatch(p)?.isKids ?? false, type: "boolean" },
			{
				key: "isSmartband",
				label: "Smartband",
				getValue: (p) => getSmartwatch(p)?.isSmartband ?? false,
				type: "boolean",
			},
			{ key: "version", label: "Versão", getValue: (p) => getSmartwatch(p)?.version ?? "-", type: "text" },
		],
	},
];
