import { SpecSection } from "../spec-configs";
import { BaseProduct, Product } from "../types";

function isGpu(product: Product): product is GPU {
	return product.category === "gpus";
}

export interface GPU extends BaseProduct {
	category: "gpus";
	specs: GpuSpecs;
}

function getGpu(p: Product): GpuSpecs | null {
	return isGpu(p) ? p.specs : null;
}

export interface GpuSpecs {
	manufacturer: "Nvidia" | "AMD" | "Intel";
	chipset: string;
	series?: string;
	edition?: string;
	memory: {
		size: string;
		type: "GDDR3" | "GDDR5" | "GDDR5X" | "GDDR6" | "GDDR6X" | "GDDR7" | "HBM2" | "HBM2e" | "HBM3";
		bus: string;
		bandwidth?: string;
		speed?: string;
	};
	processor: {
		cudaCores?: number;
		streamProcessors?: number;
		rtCores?: number;
		tensorCores?: number;
		baseClock?: string;
		boostClock?: string;
		ocBoostClock?: string;
	};
	display: {
		maxResolution?: string;
		outputs: string;
		outputCount?: number;
		hdmiVersion?: string;
		displayPortVersion?: string;
	};
	power: {
		tdp?: string;
		tgp?: string;
		requirement?: string;
		connector?: string;
	};
	interface: "PCI-Express 2.0" | "PCI-Express 3.0" | "PCI-Express 4.0" | "PCI-Express 5.0" | "PCIe 5.0" | "AGP";
	cooling: {
		type: "Ar" | "Líquido" | "Passivo" | "Híbrido";
		slotSize?: string;
		fanCount?: number;
	};
	features: {
		rayTracing?: boolean;
		dlss?: boolean;
		dlssVersion?: string;
		fsr?: boolean;
		fsrVersion?: string;
		nvidiaReflex?: boolean;
		nvenc?: boolean;
		nvdec?: boolean;
		vr?: boolean;
		gSync?: boolean;
		freeSync?: boolean;
		resizableBar?: boolean;
		directX?: string;
		openGL?: string;
		vulkan?: string;
		cuda?: string;
		openCL?: string;
	};
	dimensions?: {
		height?: string;
		width?: string;
		length?: string;
		weight?: string;
	};
	ratings: {
		costBenefit: number | null;
		gamingPerformance: number;
		powerEfficiency: number;
		cooling: number;
		features: number;
	};
}

export const gpuSpecs: SpecSection[] = [
	{
		id: "ratings",
		title: "Notas",
		specs: [
			{
				key: "costBenefit",
				label: "Custo-benefício",
				getValue: (p) => getGpu(p)?.ratings.costBenefit ?? null,
				type: "rating",
			},
			{
				key: "gamingPerformance",
				label: "Performance em Jogos",
				getValue: (p) => getGpu(p)?.ratings.gamingPerformance ?? null,
				type: "rating",
			},
			{
				key: "powerEfficiency",
				label: "Eficiência Energética",
				getValue: (p) => getGpu(p)?.ratings.powerEfficiency ?? null,
				type: "rating",
			},
			{
				key: "cooling",
				label: "Refrigeração",
				getValue: (p) => getGpu(p)?.ratings.cooling ?? null,
				type: "rating",
			},
			{
				key: "features",
				label: "Recursos",
				getValue: (p) => getGpu(p)?.ratings.features ?? null,
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
			{ key: "detailedModel", label: "Modelo Detalhado", getValue: (p) => p.detailedModel ?? "-", type: "text" },
			{ key: "manufacturer", label: "Fabricante", getValue: (p) => getGpu(p)?.manufacturer ?? "-", type: "text" },
			{ key: "chipset", label: "Chipset", getValue: (p) => getGpu(p)?.chipset ?? "-", type: "text" },
			{ key: "series", label: "Série", getValue: (p) => getGpu(p)?.series ?? "-", type: "text" },
			{ key: "edition", label: "Edição", getValue: (p) => getGpu(p)?.edition ?? "-", type: "text" },
			{ key: "releaseDate", label: "Lançamento", getValue: (p) => p.releaseDate ?? "-", type: "text" },
			{ key: "releaseYear", label: "Ano", getValue: (p) => p.releaseYear?.toString() ?? "-", type: "text" },
		],
	},
	{
		id: "memory",
		title: "Memória",
		specs: [
			{ key: "memorySize", label: "Tamanho", getValue: (p) => getGpu(p)?.memory.size ?? "-", type: "text" },
			{ key: "memoryType", label: "Tipo", getValue: (p) => getGpu(p)?.memory.type ?? "-", type: "text" },
			{ key: "memoryBus", label: "Bus", getValue: (p) => getGpu(p)?.memory.bus ?? "-", type: "text" },
			{
				key: "memoryBandwidth",
				label: "Largura de Banda",
				getValue: (p) => getGpu(p)?.memory.bandwidth ?? "-",
				type: "text",
			},
			{ key: "memorySpeed", label: "Velocidade", getValue: (p) => getGpu(p)?.memory.speed ?? "-", type: "text" },
		],
	},
	{
		id: "processor",
		title: "Processador Gráfico",
		specs: [
			{
				key: "cudaCores",
				label: "CUDA Cores",
				getValue: (p) => getGpu(p)?.processor.cudaCores?.toString() ?? "-",
				type: "text",
			},
			{
				key: "streamProcessors",
				label: "Stream Processors",
				getValue: (p) => getGpu(p)?.processor.streamProcessors?.toString() ?? "-",
				type: "text",
			},
			{
				key: "rtCores",
				label: "RT Cores",
				getValue: (p) => getGpu(p)?.processor.rtCores?.toString() ?? "-",
				type: "text",
			},
			{
				key: "tensorCores",
				label: "Tensor Cores",
				getValue: (p) => getGpu(p)?.processor.tensorCores?.toString() ?? "-",
				type: "text",
			},
			{
				key: "baseClock",
				label: "Clock Base",
				getValue: (p) => getGpu(p)?.processor.baseClock ?? "-",
				type: "text",
			},
			{
				key: "boostClock",
				label: "Clock Boost",
				getValue: (p) => getGpu(p)?.processor.boostClock ?? "-",
				type: "text",
			},
			{
				key: "ocBoostClock",
				label: "Clock OC",
				getValue: (p) => getGpu(p)?.processor.ocBoostClock ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "display",
		title: "Vídeo",
		specs: [
			{
				key: "maxResolution",
				label: "Resolução Máxima",
				getValue: (p) => getGpu(p)?.display.maxResolution ?? "-",
				type: "text",
			},
			{ key: "outputs", label: "Saídas", getValue: (p) => getGpu(p)?.display.outputs ?? "-", type: "text" },
			{
				key: "outputCount",
				label: "Número de Saídas",
				getValue: (p) => getGpu(p)?.display.outputCount?.toString() ?? "-",
				type: "text",
			},
			{ key: "hdmiVersion", label: "HDMI", getValue: (p) => getGpu(p)?.display.hdmiVersion ?? "-", type: "text" },
			{
				key: "displayPortVersion",
				label: "DisplayPort",
				getValue: (p) => getGpu(p)?.display.displayPortVersion ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "power",
		title: "Energia",
		specs: [
			{ key: "tdp", label: "TDP", getValue: (p) => getGpu(p)?.power.tdp ?? "-", type: "text" },
			{ key: "tgp", label: "TGP", getValue: (p) => getGpu(p)?.power.tgp ?? "-", type: "text" },
			{
				key: "requirement",
				label: "Fonte Recomendada",
				getValue: (p) => getGpu(p)?.power.requirement ?? "-",
				type: "text",
			},
			{ key: "connector", label: "Conector", getValue: (p) => getGpu(p)?.power.connector ?? "-", type: "text" },
		],
	},
	{
		id: "interface",
		title: "Interface",
		specs: [{ key: "interface", label: "Slot", getValue: (p) => getGpu(p)?.interface ?? "-", type: "text" }],
	},
	{
		id: "cooling",
		title: "Refrigeração",
		specs: [
			{ key: "coolingType", label: "Tipo", getValue: (p) => getGpu(p)?.cooling.type ?? "-", type: "text" },
			{
				key: "slotSize",
				label: "Tamanho do Slot",
				getValue: (p) => getGpu(p)?.cooling.slotSize ?? "-",
				type: "text",
			},
			{
				key: "fanCount",
				label: "Número de Ventoinhas",
				getValue: (p) => getGpu(p)?.cooling.fanCount?.toString() ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "features",
		title: "Recursos",
		specs: [
			{
				key: "rayTracing",
				label: "Ray Tracing",
				getValue: (p) => getGpu(p)?.features.rayTracing ?? false,
				type: "boolean",
			},
			{
				key: "dlss",
				label: "DLSS",
				getValue: (p) => getGpu(p)?.features.dlss ?? false,
				type: "boolean",
			},
			{
				key: "dlssVersion",
				label: "Versão DLSS",
				getValue: (p) => getGpu(p)?.features.dlssVersion ?? "-",
				type: "text",
			},
			{
				key: "fsr",
				label: "FSR",
				getValue: (p) => getGpu(p)?.features.fsr ?? false,
				type: "boolean",
			},
			{
				key: "fsrVersion",
				label: "Versão FSR",
				getValue: (p) => getGpu(p)?.features.fsrVersion ?? "-",
				type: "text",
			},
			{
				key: "nvidiaReflex",
				label: "NVIDIA Reflex",
				getValue: (p) => getGpu(p)?.features.nvidiaReflex ?? false,
				type: "boolean",
			},
			{
				key: "nvenc",
				label: "NVENC",
				getValue: (p) => getGpu(p)?.features.nvenc ?? false,
				type: "boolean",
			},
			{
				key: "nvdec",
				label: "NVDEC",
				getValue: (p) => getGpu(p)?.features.nvdec ?? false,
				type: "boolean",
			},
			{
				key: "vr",
				label: "VR Ready",
				getValue: (p) => getGpu(p)?.features.vr ?? false,
				type: "boolean",
			},
			{
				key: "gSync",
				label: "G-SYNC",
				getValue: (p) => getGpu(p)?.features.gSync ?? false,
				type: "boolean",
			},
			{
				key: "freeSync",
				label: "FreeSync",
				getValue: (p) => getGpu(p)?.features.freeSync ?? false,
				type: "boolean",
			},
			{
				key: "resizableBar",
				label: "Resizable BAR",
				getValue: (p) => getGpu(p)?.features.resizableBar ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "compatibility",
		title: "Compatibilidade",
		specs: [
			{
				key: "directX",
				label: "DirectX",
				getValue: (p) => getGpu(p)?.features.directX ?? "-",
				type: "text",
			},
			{
				key: "openGL",
				label: "OpenGL",
				getValue: (p) => getGpu(p)?.features.openGL ?? "-",
				type: "text",
			},
			{
				key: "vulkan",
				label: "Vulkan",
				getValue: (p) => getGpu(p)?.features.vulkan ?? "-",
				type: "text",
			},
			{
				key: "cuda",
				label: "CUDA",
				getValue: (p) => getGpu(p)?.features.cuda ?? "-",
				type: "text",
			},
			{
				key: "openCL",
				label: "OpenCL",
				getValue: (p) => getGpu(p)?.features.openCL ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "dimensions",
		title: "Dimensões",
		specs: [
			{
				key: "height",
				label: "Altura",
				getValue: (p) => getGpu(p)?.dimensions?.height ?? "-",
				type: "text",
			},
			{
				key: "width",
				label: "Largura",
				getValue: (p) => getGpu(p)?.dimensions?.width ?? "-",
				type: "text",
			},
			{
				key: "length",
				label: "Comprimento",
				getValue: (p) => getGpu(p)?.dimensions?.length ?? "-",
				type: "text",
			},
			{
				key: "weight",
				label: "Peso",
				getValue: (p) => getGpu(p)?.dimensions?.weight ?? "-",
				type: "text",
			},
		],
	},
];
