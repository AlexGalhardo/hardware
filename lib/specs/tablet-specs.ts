import { SpecSection } from "../spec-configs";
import { BaseProduct, Product } from "../types";

function isTablet(product: Product): product is Tablet {
	return product.category === "tablets";
}

export interface Tablet extends BaseProduct {
	category: "tablets";
	specs: TabletSpecs;
}

function getTablet(p: Product): TabletSpecs | null {
	return isTablet(p) ? p.specs : null;
}

export interface TabletSpecs {
	display: {
		size: string;
		resolution: string;
		type: string;
		refreshRate: string;
		height?: string;
		width?: string;
		maxResolution?: string;
		ppi?: number;
		multiTouch?: boolean;
	};
	processor: string;
	chipset: string;
	ram: string;
	storage: string;
	expandableStorage: boolean;
	memoryCardTypes?: string[];
	maxMemorySupported?: string;
	memorySpeed?: number;
	battery: {
		capacity: string;
		type: string;
		duration?: string;
	};
	camera: {
		main: string;
		mainResolution?: string;
		mainQuantity?: number;
		front: string;
		frontResolution?: string;
		frontQuantity?: number;
		videoResolution?: string;
		flash?: boolean;
	};
	os: string;
	osVersion?: string;
	osCustomization?: string;
	dimensions: string;
	depth?: string;
	height?: string;
	width?: string;
	weight: string;
	connectivity: {
		wifi: string;
		bluetooth: string;
		bluetoothVersion?: string;
		cellular: boolean;
		usb: string;
		simCardReader?: string;
		dualSim?: boolean;
		gps?: boolean;
		headphoneJack?: boolean;
		microphone?: boolean;
	};
	stylusSupport: boolean;
	keyboardSupport: boolean;
	speakers: string;
	processor_details?: {
		cores?: number;
		speed?: number;
		graphicProcessor?: string;
	};
	sensors?: string[];
	security?: {
		facialUnlock?: boolean;
		parentalControl?: boolean;
	};
	accessories?: string[];
	ratings: {
		costBenefit: number | null;
		display: number;
		performance: number;
		battery: number;
		productivity: number;
	};
}

export const tabletSpecs: SpecSection[] = [
	{
		id: "ratings",
		title: "Notas",
		specs: [
			{
				key: "costBenefit",
				label: "Custo-benefício",
				getValue: (p) => getTablet(p)?.ratings.costBenefit ?? null,
				type: "rating",
			},
			{ key: "display", label: "Tela", getValue: (p) => getTablet(p)?.ratings.display ?? null, type: "rating" },
			{
				key: "performance",
				label: "Performance",
				getValue: (p) => getTablet(p)?.ratings.performance ?? null,
				type: "rating",
			},
			{
				key: "battery",
				label: "Bateria",
				getValue: (p) => getTablet(p)?.ratings.battery ?? null,
				type: "rating",
			},
			{
				key: "productivity",
				label: "Produtividade",
				getValue: (p) => getTablet(p)?.ratings.productivity ?? null,
				type: "rating",
			},
		],
	},

	{
		id: "general",
		title: "Informações Gerais",
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
			{ key: "version", label: "Versão", getValue: (p) => p.version ?? "-", type: "text" },
			{ key: "manufacturer", label: "Fabricante", getValue: (p) => p.manufacturer ?? "-", type: "text" },
			{ key: "anatelNumber", label: "Anatel", getValue: (p) => p.anatelNumber ?? "-", type: "text" },
		],
	},

	{
		id: "display",
		title: "Tela",
		specs: [
			{ key: "size", label: "Tamanho", getValue: (p) => getTablet(p)?.display.size ?? "-", type: "text" },
			{
				key: "resolution",
				label: "Resolução",
				getValue: (p) => getTablet(p)?.display.resolution ?? "-",
				type: "text",
			},
			{
				key: "maxResolution",
				label: "Resolução Máxima",
				getValue: (p) => getTablet(p)?.display.maxResolution ?? "-",
				type: "text",
			},
			{ key: "type", label: "Tipo", getValue: (p) => getTablet(p)?.display.type ?? "-", type: "text" },
			{
				key: "refreshRate",
				label: "Hz",
				getValue: (p) => getTablet(p)?.display.refreshRate ?? "-",
				type: "text",
			},
			{ key: "ppi", label: "PPI", getValue: (p) => getTablet(p)?.display.ppi?.toString() ?? "-", type: "text" },
			{
				key: "multiTouch",
				label: "Multi-touch",
				getValue: (p) => getTablet(p)?.display.multiTouch ?? false,
				type: "boolean",
			},
		],
	},

	{
		id: "performance",
		title: "Performance",
		specs: [
			{ key: "processor", label: "Processador", getValue: (p) => getTablet(p)?.processor ?? "-", type: "text" },
			{ key: "chipset", label: "Chipset", getValue: (p) => getTablet(p)?.chipset ?? "-", type: "text" },
			{
				key: "cores",
				label: "Núcleos",
				getValue: (p) => getTablet(p)?.processor_details?.cores?.toString() ?? "-",
				type: "text",
			},
			{
				key: "speed",
				label: "Clock",
				getValue: (p) => {
					const v = getTablet(p)?.processor_details?.speed;
					return v != null ? `${v} GHz` : "-";
				},
				type: "text",
			},
			{
				key: "graphicProcessor",
				label: "GPU",
				getValue: (p) => getTablet(p)?.processor_details?.graphicProcessor ?? "-",
				type: "text",
			},
			{ key: "ram", label: "RAM", getValue: (p) => getTablet(p)?.ram ?? "-", type: "text" },
			{ key: "storage", label: "Armazenamento", getValue: (p) => getTablet(p)?.storage ?? "-", type: "text" },
			{
				key: "expandableStorage",
				label: "Expansível",
				getValue: (p) => getTablet(p)?.expandableStorage ?? false,
				type: "boolean",
			},
			{
				key: "memoryCardTypes",
				label: "Tipos de Cartão",
				getValue: (p) => getTablet(p)?.memoryCardTypes?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "maxMemorySupported",
				label: "Máx. Suportado",
				getValue: (p) => getTablet(p)?.maxMemorySupported ?? "-",
				type: "text",
			},
			{
				key: "memorySpeed",
				label: "Velocidade Memória",
				getValue: (p) => {
					const v = getTablet(p)?.memorySpeed;
					return v != null ? `${v} MHz` : "-";
				},
				type: "text",
			},
		],
	},

	{
		id: "camera",
		title: "Câmera",
		specs: [
			{ key: "main", label: "Principal", getValue: (p) => getTablet(p)?.camera.main ?? "-", type: "text" },
			{
				key: "mainResolution",
				label: "Resolução Traseira",
				getValue: (p) => getTablet(p)?.camera.mainResolution ?? "-",
				type: "text",
			},
			{ key: "front", label: "Frontal", getValue: (p) => getTablet(p)?.camera.front ?? "-", type: "text" },
			{
				key: "videoResolution",
				label: "Vídeo",
				getValue: (p) => getTablet(p)?.camera.videoResolution ?? "-",
				type: "text",
			},
			{ key: "flash", label: "Flash", getValue: (p) => getTablet(p)?.camera.flash ?? false, type: "boolean" },
		],
	},

	{
		id: "battery",
		title: "Bateria",
		specs: [
			{
				key: "capacity",
				label: "Capacidade",
				getValue: (p) => getTablet(p)?.battery.capacity ?? "-",
				type: "text",
			},
			{ key: "type", label: "Tipo", getValue: (p) => getTablet(p)?.battery.type ?? "-", type: "text" },
			{ key: "duration", label: "Duração", getValue: (p) => getTablet(p)?.battery.duration ?? "-", type: "text" },
		],
	},

	{
		id: "connectivity",
		title: "Conectividade",
		specs: [
			{ key: "wifi", label: "Wi-Fi", getValue: (p) => getTablet(p)?.connectivity.wifi ?? "-", type: "text" },
			{
				key: "bluetooth",
				label: "Bluetooth",
				getValue: (p) => getTablet(p)?.connectivity.bluetooth ?? "-",
				type: "text",
			},
			{
				key: "bluetoothVersion",
				label: "Versão BT",
				getValue: (p) => getTablet(p)?.connectivity.bluetoothVersion ?? "-",
				type: "text",
			},
			{
				key: "cellular",
				label: "Rede Móvel",
				getValue: (p) => getTablet(p)?.connectivity.cellular ?? false,
				type: "boolean",
			},
			{ key: "usb", label: "USB", getValue: (p) => getTablet(p)?.connectivity.usb ?? "-", type: "text" },
			{ key: "gps", label: "GPS", getValue: (p) => getTablet(p)?.connectivity.gps ?? false, type: "boolean" },
		],
	},

	{
		id: "features",
		title: "Recursos",
		specs: [
			{
				key: "stylusSupport",
				label: "Caneta",
				getValue: (p) => getTablet(p)?.stylusSupport ?? false,
				type: "boolean",
			},
			{
				key: "keyboardSupport",
				label: "Teclado",
				getValue: (p) => getTablet(p)?.keyboardSupport ?? false,
				type: "boolean",
			},
			{ key: "speakers", label: "Alto-falantes", getValue: (p) => getTablet(p)?.speakers ?? "-", type: "text" },
			{
				key: "sensors",
				label: "Sensores",
				getValue: (p) => getTablet(p)?.sensors?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "accessories",
				label: "Acessórios",
				getValue: (p) => getTablet(p)?.accessories?.join(", ") ?? "-",
				type: "text",
			},
		],
	},

	{
		id: "dimensions",
		title: "Dimensões e Peso",
		specs: [
			{ key: "dimensions", label: "Dimensões", getValue: (p) => getTablet(p)?.dimensions ?? "-", type: "text" },
			{ key: "weight", label: "Peso", getValue: (p) => getTablet(p)?.weight ?? "-", type: "text" },
		],
	},
];
