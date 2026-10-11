import { SpecSection } from "../spec-configs";
import { BaseProduct, Product } from "../types";

function isCpu(product: Product): product is CPU {
	return product.category === "cpus";
}

export interface CPU extends BaseProduct {
	category: "cpus";
	specs: CpuSpecs;
}

function getCpu(p: Product): CpuSpecs | null {
	return isCpu(p) ? p.specs : null;
}

export interface CpuSpecs {
	manufacturer: "Intel" | "AMD";
	series?: string;
	architecture?: string;
	lithography?: string;
	socket: string;
	application: "Computadores de mesa" | "Notebooks" | "Servidores" | "Workstation";
	cores: {
		count: number;
		threads: number;
		performanceCores?: number;
		efficientCores?: number;
	};
	frequency: {
		base: string;
		boost: string;
		allCoreBoost?: string;
	};
	cache: {
		l1?: string;
		l2?: string;
		l3: string;
		total?: string;
	};
	memory: {
		types: string[];
		maxSize: string;
		channels?: number;
		maxSpeed?: string;
		maxBandwidth?: string;
	};
	power: {
		tdp: string;
		maxTurbo?: string;
		baseWatts?: number;
	};
	graphics?: {
		hasIntegrated: boolean;
		model?: string;
		brand?: string;
		baseFrequency?: string;
		maxFrequency?: string;
		executionUnits?: number;
		computeUnits?: number;
		directX?: string;
		openGL?: string;
		outputsSupport?: string;
		maxDisplays?: number;
		maxResolution?: string;
	};
	pcie?: {
		version: string;
		lanes?: number;
	};
	features: {
		unlocked?: boolean;
		hyperThreading?: boolean;
		turboBoost?: boolean;
		precisionBoost?: boolean;
		overclocking?: boolean;
		virtualization?: boolean;
		k4Support?: boolean;
		ecc?: boolean;
		secure?: string[];
	};
	cooling?: {
		type?: string;
		included?: boolean;
		coolerModel?: string;
	};
	temperature?: {
		max?: string;
		tjMax?: string;
	};
	other?: {
		isGaming?: boolean;
		isOEM?: boolean;
		instructionSet?: string[];
		boxContents?: string[];
	};
	ratings: {
		costBenefit: number | null;
		singleCorePerformance: number;
		multiCorePerformance: number;
		gaming: number;
		powerEfficiency: number;
	};
}

export const cpuSpecs: SpecSection[] = [
	{
		id: "ratings",
		title: "Notas",
		specs: [
			{
				key: "costBenefit",
				label: "Custo-benefício",
				getValue: (p) => getCpu(p)?.ratings.costBenefit ?? null,
				type: "rating",
			},
			{
				key: "singleCorePerformance",
				label: "Performance Single-Core",
				getValue: (p) => getCpu(p)?.ratings.singleCorePerformance ?? null,
				type: "rating",
			},
			{
				key: "multiCorePerformance",
				label: "Performance Multi-Core",
				getValue: (p) => getCpu(p)?.ratings.multiCorePerformance ?? null,
				type: "rating",
			},
			{
				key: "gaming",
				label: "Gaming",
				getValue: (p) => getCpu(p)?.ratings.gaming ?? null,
				type: "rating",
			},
			{
				key: "powerEfficiency",
				label: "Eficiência Energética",
				getValue: (p) => getCpu(p)?.ratings.powerEfficiency ?? null,
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
			{ key: "manufacturer", label: "Fabricante", getValue: (p) => getCpu(p)?.manufacturer ?? "-", type: "text" },
			{ key: "series", label: "Série", getValue: (p) => getCpu(p)?.series ?? "-", type: "text" },
			{ key: "releaseDate", label: "Lançamento", getValue: (p) => p.releaseDate ?? "-", type: "text" },
			{ key: "releaseYear", label: "Ano", getValue: (p) => p.releaseYear?.toString() ?? "-", type: "text" },
		],
	},
	{
		id: "specifications",
		title: "Especificações",
		specs: [
			{ key: "socket", label: "Soquete", getValue: (p) => getCpu(p)?.socket ?? "-", type: "text" },
			{
				key: "architecture",
				label: "Arquitetura",
				getValue: (p) => getCpu(p)?.architecture ?? "-",
				type: "text",
			},
			{ key: "lithography", label: "Litografia", getValue: (p) => getCpu(p)?.lithography ?? "-", type: "text" },
			{ key: "application", label: "Aplicação", getValue: (p) => getCpu(p)?.application ?? "-", type: "text" },
		],
	},
	{
		id: "cores",
		title: "Núcleos e Threads",
		specs: [
			{
				key: "coreCount",
				label: "Núcleos",
				getValue: (p) => getCpu(p)?.cores.count.toString() ?? "-",
				type: "text",
			},
			{
				key: "threadCount",
				label: "Threads",
				getValue: (p) => getCpu(p)?.cores.threads.toString() ?? "-",
				type: "text",
			},
			{
				key: "performanceCores",
				label: "P-Cores",
				getValue: (p) => getCpu(p)?.cores.performanceCores?.toString() ?? "-",
				type: "text",
			},
			{
				key: "efficientCores",
				label: "E-Cores",
				getValue: (p) => getCpu(p)?.cores.efficientCores?.toString() ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "frequency",
		title: "Frequência",
		specs: [
			{
				key: "baseFrequency",
				label: "Frequência Base",
				getValue: (p) => getCpu(p)?.frequency.base ?? "-",
				type: "text",
			},
			{
				key: "boostFrequency",
				label: "Frequência Turbo",
				getValue: (p) => getCpu(p)?.frequency.boost ?? "-",
				type: "text",
			},
			{
				key: "allCoreBoost",
				label: "All-Core Boost",
				getValue: (p) => getCpu(p)?.frequency.allCoreBoost ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "cache",
		title: "Cache",
		specs: [
			{ key: "l1Cache", label: "Cache L1", getValue: (p) => getCpu(p)?.cache.l1 ?? "-", type: "text" },
			{ key: "l2Cache", label: "Cache L2", getValue: (p) => getCpu(p)?.cache.l2 ?? "-", type: "text" },
			{ key: "l3Cache", label: "Cache L3", getValue: (p) => getCpu(p)?.cache.l3 ?? "-", type: "text" },
			{ key: "totalCache", label: "Cache Total", getValue: (p) => getCpu(p)?.cache.total ?? "-", type: "text" },
		],
	},
	{
		id: "memory",
		title: "Memória",
		specs: [
			{
				key: "memoryTypes",
				label: "Tipos Suportados",
				getValue: (p) => getCpu(p)?.memory.types.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "maxMemorySize",
				label: "Tamanho Máximo",
				getValue: (p) => getCpu(p)?.memory.maxSize ?? "-",
				type: "text",
			},
			{
				key: "memoryChannels",
				label: "Canais",
				getValue: (p) => getCpu(p)?.memory.channels?.toString() ?? "-",
				type: "text",
			},
			{
				key: "maxMemorySpeed",
				label: "Velocidade Máxima",
				getValue: (p) => getCpu(p)?.memory.maxSpeed ?? "-",
				type: "text",
			},
			{
				key: "maxBandwidth",
				label: "Largura de Banda",
				getValue: (p) => getCpu(p)?.memory.maxBandwidth ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "power",
		title: "Energia",
		specs: [
			{ key: "tdp", label: "TDP", getValue: (p) => getCpu(p)?.power.tdp ?? "-", type: "text" },
			{
				key: "maxTurbo",
				label: "TDP Turbo Máximo",
				getValue: (p) => getCpu(p)?.power.maxTurbo ?? "-",
				type: "text",
			},
			{
				key: "baseWatts",
				label: "Potência Base",
				getValue: (p) => getCpu(p)?.power.baseWatts?.toString() ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "graphics",
		title: "Gráficos Integrados",
		specs: [
			{
				key: "hasIntegrated",
				label: "Gráficos Integrados",
				getValue: (p) => getCpu(p)?.graphics?.hasIntegrated ?? false,
				type: "boolean",
			},
			{ key: "gpuModel", label: "Modelo", getValue: (p) => getCpu(p)?.graphics?.model ?? "-", type: "text" },
			{ key: "gpuBrand", label: "Marca", getValue: (p) => getCpu(p)?.graphics?.brand ?? "-", type: "text" },
			{
				key: "gpuBaseFreq",
				label: "Frequência Base",
				getValue: (p) => getCpu(p)?.graphics?.baseFrequency ?? "-",
				type: "text",
			},
			{
				key: "gpuMaxFreq",
				label: "Frequência Máxima",
				getValue: (p) => getCpu(p)?.graphics?.maxFrequency ?? "-",
				type: "text",
			},
			{
				key: "executionUnits",
				label: "Execution Units",
				getValue: (p) => getCpu(p)?.graphics?.executionUnits?.toString() ?? "-",
				type: "text",
			},
			{
				key: "computeUnits",
				label: "Compute Units",
				getValue: (p) => getCpu(p)?.graphics?.computeUnits?.toString() ?? "-",
				type: "text",
			},
			{ key: "directX", label: "DirectX", getValue: (p) => getCpu(p)?.graphics?.directX ?? "-", type: "text" },
			{ key: "openGL", label: "OpenGL", getValue: (p) => getCpu(p)?.graphics?.openGL ?? "-", type: "text" },
			{
				key: "maxDisplays",
				label: "Máximo de Monitores",
				getValue: (p) => getCpu(p)?.graphics?.maxDisplays?.toString() ?? "-",
				type: "text",
			},
			{
				key: "maxResolution",
				label: "Resolução Máxima",
				getValue: (p) => getCpu(p)?.graphics?.maxResolution ?? "-",
				type: "text",
			},
			{
				key: "outputsSupport",
				label: "Saídas",
				getValue: (p) => getCpu(p)?.graphics?.outputsSupport ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "pcie",
		title: "PCI Express",
		specs: [
			{
				key: "pcieVersion",
				label: "Versão PCIe",
				getValue: (p) => getCpu(p)?.pcie?.version ?? "-",
				type: "text",
			},
			{
				key: "pcieLanes",
				label: "Lanes PCIe",
				getValue: (p) => getCpu(p)?.pcie?.lanes?.toString() ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "features",
		title: "Recursos",
		specs: [
			{
				key: "unlocked",
				label: "Desbloqueado",
				getValue: (p) => getCpu(p)?.features.unlocked ?? false,
				type: "boolean",
			},
			{
				key: "hyperThreading",
				label: "Hyper-Threading",
				getValue: (p) => getCpu(p)?.features.hyperThreading ?? false,
				type: "boolean",
			},
			{
				key: "turboBoost",
				label: "Turbo Boost",
				getValue: (p) => getCpu(p)?.features.turboBoost ?? false,
				type: "boolean",
			},
			{
				key: "precisionBoost",
				label: "Precision Boost",
				getValue: (p) => getCpu(p)?.features.precisionBoost ?? false,
				type: "boolean",
			},
			{
				key: "overclocking",
				label: "Overclocking",
				getValue: (p) => getCpu(p)?.features.overclocking ?? false,
				type: "boolean",
			},
			{
				key: "virtualization",
				label: "Virtualização",
				getValue: (p) => getCpu(p)?.features.virtualization ?? false,
				type: "boolean",
			},
			{
				key: "k4Support",
				label: "Suporte 4K",
				getValue: (p) => getCpu(p)?.features.k4Support ?? false,
				type: "boolean",
			},
			{
				key: "ecc",
				label: "Memória ECC",
				getValue: (p) => getCpu(p)?.features.ecc ?? false,
				type: "boolean",
			},
			{
				key: "secure",
				label: "Segurança",
				getValue: (p) => getCpu(p)?.features.secure?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "instructionSet",
				label: "Instruction Sets",
				getValue: (p) => getCpu(p)?.other?.instructionSet?.join(", ") ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "cooling",
		title: "Refrigeração",
		specs: [
			{ key: "coolingType", label: "Tipo", getValue: (p) => getCpu(p)?.cooling?.type ?? "-", type: "text" },
			{
				key: "coolerIncluded",
				label: "Cooler Incluso",
				getValue: (p) => getCpu(p)?.cooling?.included ?? false,
				type: "boolean",
			},
			{
				key: "coolerModel",
				label: "Modelo do Cooler",
				getValue: (p) => getCpu(p)?.cooling?.coolerModel ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "temperature",
		title: "Temperatura",
		specs: [
			{
				key: "maxTemp",
				label: "Temperatura Máxima",
				getValue: (p) => getCpu(p)?.temperature?.max ?? "-",
				type: "text",
			},
			{ key: "tjMax", label: "TJ Max", getValue: (p) => getCpu(p)?.temperature?.tjMax ?? "-", type: "text" },
		],
	},
	{
		id: "other",
		title: "Outros",
		specs: [
			{
				key: "isGaming",
				label: "Gaming",
				getValue: (p) => getCpu(p)?.other?.isGaming ?? false,
				type: "boolean",
			},
			{
				key: "isOEM",
				label: "OEM",
				getValue: (p) => getCpu(p)?.other?.isOEM ?? false,
				type: "boolean",
			},
			{
				key: "boxContents",
				label: "Conteúdo da Caixa",
				getValue: (p) => getCpu(p)?.other?.boxContents?.join(", ") ?? "-",
				type: "text",
			},
		],
	},
];
