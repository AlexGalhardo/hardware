import { SpecSection } from "../spec-configs";
import { BaseProduct, Product } from "../types";

function isNotebook(product: Product): product is Notebook {
	return product.category === "notebooks";
}

function getNotebook(p: Product) {
	return isNotebook(p) ? p.specs : null;
}

export interface Notebook extends BaseProduct {
	category: "notebooks";
	specs: NotebookSpecs;
}

export interface NotebookSpecs {
	display: {
		size: string;
		resolution: string;
		type: string;
		refreshRate: string;
		touchscreen: boolean;
		retina?: boolean;
		antiGlare?: boolean;
		panelType?: string;
		colorGamut?: string;
		aspectRatio?: string;
	};
	processor: string;
	processorBrand?: string;
	processorLine?: string;
	processorModel?: string;
	processorMaxSpeed?: string;
	processorCores?: number;
	chipset: string | null;
	gpu: string;
	gpuBrand?: string;
	gpuLine?: string;
	gpuModel?: string;
	integratedGpu?: {
		brand?: string;
		line?: string;
		model?: string;
	};
	dedicatedGpu?: {
		brand?: string;
		line?: string;
		model?: string;
		memory?: string;
		memoryType?: string;
	};
	ram: string;
	ramSpeed?: string;
	ramType?: string;
	maxRamSupported?: string;
	ramSlots?: number;
	storage: string;
	storageType: string;
	ssdInterface?: string;
	m2StorageCapacity?: string;
	expandableStorage: boolean;
	battery: {
		capacity: string | null;
		type: string;
		duration?: string | null;
	};
	os: string;
	osVersion?: string;
	osEdition?: string;
	dimensions: string;
	width?: string;
	depth?: string;
	height?: string;
	weight: string;
	keyboard: {
		backlit: boolean;
		numpad: boolean;
		type: string;
		language?: string;
	};
	webcam: {
		resolution: string;
		privacy: boolean;
	};
	audio: {
		speakers: string;
		speakerCount?: number;
		microphoneQuality: string;
		soundModes?: string | null;
	};
	connectivity: {
		wifi: string;
		bluetooth: string;
		ethernet: boolean;
		usb: string;
		hdmi: boolean;
		thunderbolt: boolean;
		sdCardReader: boolean;
		headphoneJack?: boolean;
		videoPortTypes?: string;
	};
	ports: string;
	coolingSystem: string | null;
	fingerprint: boolean;
	material?: string;
	manufacturer?: string;
	includedAccessories?: string;
	optimizedForAI?: boolean;
	ratings: {
		costBenefit: number | null;
		performance: number;
		display: number;
		battery: number;
		portability: number;
	};
}

export const notebookSpecs: SpecSection[] = [
	{
		id: "ratings",
		title: "Notas",
		specs: [
			{
				key: "costBenefit",
				label: "Custo-benefício",
				getValue: (p) => getNotebook(p)?.ratings.costBenefit ?? null,
				type: "rating",
			},
			{
				key: "performance",
				label: "Performance",
				getValue: (p) => getNotebook(p)?.ratings.performance ?? null,
				type: "rating",
			},
			{
				key: "display",
				label: "Display",
				getValue: (p) => getNotebook(p)?.ratings.display ?? null,
				type: "rating",
			},
			{
				key: "battery",
				label: "Bateria",
				getValue: (p) => getNotebook(p)?.ratings.battery ?? null,
				type: "rating",
			},
			{
				key: "portability",
				label: "Portabilidade",
				getValue: (p) => getNotebook(p)?.ratings.portability ?? null,
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
		title: "Display",
		specs: [
			{
				key: "size",
				label: "Tamanho",
				getValue: (p) => getNotebook(p)?.display.size ?? "-",
				type: "text",
			},
			{
				key: "resolution",
				label: "Resolução",
				getValue: (p) => getNotebook(p)?.display.resolution ?? "-",
				type: "text",
			},
			{
				key: "type",
				label: "Tipo",
				getValue: (p) => getNotebook(p)?.display.type ?? "-",
				type: "text",
			},
			{
				key: "refreshRate",
				label: "Taxa de Atualização",
				getValue: (p) => getNotebook(p)?.display.refreshRate ?? "-",
				type: "text",
			},
			{
				key: "panelType",
				label: "Tipo de Painel",
				getValue: (p) => getNotebook(p)?.display.panelType ?? "-",
				type: "text",
			},
			{
				key: "colorGamut",
				label: "Gama de Cores",
				getValue: (p) => getNotebook(p)?.display.colorGamut ?? "-",
				type: "text",
			},
			{
				key: "aspectRatio",
				label: "Aspect Ratio",
				getValue: (p) => getNotebook(p)?.display.aspectRatio ?? "-",
				type: "text",
			},
			{
				key: "touchscreen",
				label: "Touchscreen",
				getValue: (p) => getNotebook(p)?.display.touchscreen ?? false,
				type: "boolean",
			},
			{
				key: "retina",
				label: "Retina",
				getValue: (p) => getNotebook(p)?.display.retina ?? false,
				type: "boolean",
			},
			{
				key: "antiGlare",
				label: "Antirreflexo",
				getValue: (p) => getNotebook(p)?.display.antiGlare ?? false,
				type: "boolean",
			},
		],
	},

	{
		id: "processor",
		title: "Processador e GPU",
		specs: [
			{
				key: "processorBrand",
				label: "Marca CPU",
				getValue: (p) => getNotebook(p)?.processorBrand ?? "-",
				type: "text",
			},
			{
				key: "processorLine",
				label: "Linha CPU",
				getValue: (p) => getNotebook(p)?.processorLine ?? "-",
				type: "text",
			},
			{
				key: "processorModel",
				label: "Modelo CPU",
				getValue: (p) => getNotebook(p)?.processorModel ?? "-",
				type: "text",
			},
			{
				key: "processor",
				label: "Processador",
				getValue: (p) => getNotebook(p)?.processor ?? "-",
				type: "text",
			},
			{
				key: "processorMaxSpeed",
				label: "Velocidade Máx",
				getValue: (p) => getNotebook(p)?.processorMaxSpeed ?? "-",
				type: "text",
			},
			{
				key: "processorCores",
				label: "Núcleos",
				getValue: (p) => getNotebook(p)?.processorCores?.toString() ?? "-",
				type: "text",
			},
			{
				key: "chipset",
				label: "Chipset",
				getValue: (p) => getNotebook(p)?.chipset ?? "-",
				type: "text",
			},
			{
				key: "gpuBrand",
				label: "GPU Marca",
				getValue: (p) => getNotebook(p)?.gpuBrand ?? "-",
				type: "text",
			},
			{
				key: "gpuLine",
				label: "GPU Linha",
				getValue: (p) => getNotebook(p)?.gpuLine ?? "-",
				type: "text",
			},
			{
				key: "gpuModel",
				label: "GPU Modelo",
				getValue: (p) => getNotebook(p)?.gpuModel ?? "-",
				type: "text",
			},
			{
				key: "gpu",
				label: "GPU",
				getValue: (p) => getNotebook(p)?.gpu ?? "-",
				type: "text",
			},
		],
	},

	{
		id: "memory",
		title: "Memória e Armazenamento",
		specs: [
			{
				key: "ram",
				label: "RAM",
				getValue: (p) => getNotebook(p)?.ram ?? "-",
				type: "text",
			},
			{
				key: "ramSpeed",
				label: "Velocidade RAM",
				getValue: (p) => getNotebook(p)?.ramSpeed ?? "-",
				type: "text",
			},
			{
				key: "ramType",
				label: "Tipo RAM",
				getValue: (p) => getNotebook(p)?.ramType ?? "-",
				type: "text",
			},
			{
				key: "ramSlots",
				label: "Slots RAM",
				getValue: (p) => getNotebook(p)?.ramSlots?.toString() ?? "-",
				type: "text",
			},
			{
				key: "maxRamSupported",
				label: "RAM Máx",
				getValue: (p) => getNotebook(p)?.maxRamSupported ?? "-",
				type: "text",
			},
			{
				key: "storage",
				label: "Armazenamento",
				getValue: (p) => getNotebook(p)?.storage ?? "-",
				type: "text",
			},
			{
				key: "storageType",
				label: "Tipo Armazenamento",
				getValue: (p) => getNotebook(p)?.storageType ?? "-",
				type: "text",
			},
			{
				key: "ssdInterface",
				label: "Interface SSD",
				getValue: (p) => getNotebook(p)?.ssdInterface ?? "-",
				type: "text",
			},
			{
				key: "expandableStorage",
				label: "Expansível",
				getValue: (p) => getNotebook(p)?.expandableStorage ?? false,
				type: "boolean",
			},
		],
	},

	{
		id: "battery",
		title: "Bateria",
		specs: [
			{
				key: "capacity",
				label: "Capacidade",
				getValue: (p) => getNotebook(p)?.battery.capacity ?? "-",
				type: "text",
			},
			{
				key: "type",
				label: "Tipo",
				getValue: (p) => getNotebook(p)?.battery.type ?? "-",
				type: "text",
			},
			{
				key: "duration",
				label: "Duração",
				getValue: (p) => getNotebook(p)?.battery.duration ?? "-",
				type: "text",
			},
		],
	},

	{
		id: "connectivity",
		title: "Conectividade",
		specs: [
			{
				key: "wifi",
				label: "Wi-Fi",
				getValue: (p) => getNotebook(p)?.connectivity.wifi ?? "-",
				type: "text",
			},
			{
				key: "bluetooth",
				label: "Bluetooth",
				getValue: (p) => getNotebook(p)?.connectivity.bluetooth ?? "-",
				type: "text",
			},
			{
				key: "ethernet",
				label: "Ethernet",
				getValue: (p) => getNotebook(p)?.connectivity.ethernet ?? false,
				type: "boolean",
			},
			{
				key: "usb",
				label: "USB",
				getValue: (p) => getNotebook(p)?.connectivity.usb ?? "-",
				type: "text",
			},
			{
				key: "hdmi",
				label: "HDMI",
				getValue: (p) => getNotebook(p)?.connectivity.hdmi ?? false,
				type: "boolean",
			},
			{
				key: "thunderbolt",
				label: "Thunderbolt",
				getValue: (p) => getNotebook(p)?.connectivity.thunderbolt ?? false,
				type: "boolean",
			},
			{
				key: "sdCardReader",
				label: "Leitor SD",
				getValue: (p) => getNotebook(p)?.connectivity.sdCardReader ?? false,
				type: "boolean",
			},
			{
				key: "headphoneJack",
				label: "P2",
				getValue: (p) => getNotebook(p)?.connectivity.headphoneJack ?? false,
				type: "boolean",
			},
		],
	},

	{
		id: "physical",
		title: "Físico",
		specs: [
			{
				key: "dimensions",
				label: "Dimensões",
				getValue: (p) => getNotebook(p)?.dimensions ?? "-",
				type: "text",
			},
			{
				key: "weight",
				label: "Peso",
				getValue: (p) => getNotebook(p)?.weight ?? "-",
				type: "text",
			},
			{
				key: "material",
				label: "Material",
				getValue: (p) => getNotebook(p)?.material ?? "-",
				type: "text",
			},
			{
				key: "ports",
				label: "Portas",
				getValue: (p) => getNotebook(p)?.ports ?? "-",
				type: "text",
			},
			{
				key: "coolingSystem",
				label: "Refrigeração",
				getValue: (p) => getNotebook(p)?.coolingSystem ?? "-",
				type: "text",
			},
			{
				key: "fingerprint",
				label: "Leitor Digital",
				getValue: (p) => getNotebook(p)?.fingerprint ?? false,
				type: "boolean",
			},
			{
				key: "optimizedForAI",
				label: "IA",
				getValue: (p) => getNotebook(p)?.optimizedForAI ?? false,
				type: "boolean",
			},
		],
	},
];
