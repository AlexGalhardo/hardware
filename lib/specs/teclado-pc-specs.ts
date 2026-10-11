import { SpecSection } from "../spec-configs";
import { BaseProduct, Product } from "../types";

function isTecladoPC(product: Product): product is TecladoPC {
	return product.category === "teclados";
}

export interface TecladoPC extends BaseProduct {
	category: "teclados";
	specs: TecladoPCSpecs;
}

function getTecladoPC(p: Product): TecladoPCSpecs | null {
	return isTecladoPC(p) ? p.specs : null;
}

export interface TecladoPCSpecs {
	type: "Mecânico" | "Membrana" | "Semi-mecânico" | "Óptico";
	layout: string;
	size: "Full Size" | "TKL" | "75%" | "65%" | "60%" | "40%";
	switches?: {
		type?: string;
		brand?: string;
		actuationForce?: string;
		travelDistance?: string;
		lifespan?: string;
		hotSwappable?: boolean;
	};
	keycaps: {
		material?: string;
		profile?: string;
		printMethod?: string;
		doubleShot?: boolean;
	};
	connectivity: {
		type: "Com fio" | "Sem fio" | "Híbrido";
		wireless?: {
			bluetooth?: boolean;
			rf24ghz?: boolean;
			multiDevice?: boolean;
			maxDevices?: number;
		};
		cable?: {
			type?: string;
			length?: string;
			detachable?: boolean;
		};
	};
	backlighting?: {
		type: "Nenhum" | "Single Color" | "RGB" | "Per-Key RGB";
		software?: string;
		effects?: string[];
		brightness?: number;
	};
	features: {
		nkro?: boolean;
		antiGhosting?: boolean;
		macroKeys?: number;
		mediaKeys?: boolean;
		volumeWheel?: boolean;
		wristRest?: boolean;
		programmable?: boolean;
		onboardMemory?: boolean;
		passthrough?: boolean;
	};
	battery?: {
		type?: string;
		capacity?: string;
		life?: string;
		rechargeable?: boolean;
	};
	build: {
		frame?: string;
		plate?: string;
		weight?: string;
	};
	software?: {
		name?: string;
		features?: string[];
		platforms?: string[];
	};
	dimensions: {
		width: string;
		height: string;
		depth: string;
		weight: string;
	};
	compatibility: string[];
	ratings: {
		costBenefit: number | null;
		typingExperience: number;
		buildQuality: number;
		features: number;
		gaming: number;
	};
}

export const tecladoPCSpecs: SpecSection[] = [
	{
		id: "ratings",
		title: "Notas",
		specs: [
			{
				key: "costBenefit",
				label: "Custo-benefício",
				getValue: (p) => getTecladoPC(p)?.ratings.costBenefit ?? null,
				type: "rating",
			},
			{
				key: "typingExperience",
				label: "Experiência de Digitação",
				getValue: (p) => getTecladoPC(p)?.ratings.typingExperience ?? null,
				type: "rating",
			},
			{
				key: "buildQuality",
				label: "Qualidade de Construção",
				getValue: (p) => getTecladoPC(p)?.ratings.buildQuality ?? null,
				type: "rating",
			},
			{
				key: "features",
				label: "Recursos",
				getValue: (p) => getTecladoPC(p)?.ratings.features ?? null,
				type: "rating",
			},
			{
				key: "gaming",
				label: "Gaming",
				getValue: (p) => getTecladoPC(p)?.ratings.gaming ?? null,
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
			{ key: "type", label: "Tipo", getValue: (p) => getTecladoPC(p)?.type ?? "-", type: "text" },
			{ key: "layout", label: "Layout", getValue: (p) => getTecladoPC(p)?.layout ?? "-", type: "text" },
			{ key: "size", label: "Tamanho", getValue: (p) => getTecladoPC(p)?.size ?? "-", type: "text" },
			{ key: "releaseDate", label: "Lançamento", getValue: (p) => p.releaseDate ?? "-", type: "text" },
			{ key: "releaseYear", label: "Ano", getValue: (p) => p.releaseYear?.toString() ?? "-", type: "text" },
		],
	},
	{
		id: "switches",
		title: "Switches",
		specs: [
			{
				key: "switchType",
				label: "Tipo",
				getValue: (p) => getTecladoPC(p)?.switches?.type ?? "-",
				type: "text",
			},
			{
				key: "switchBrand",
				label: "Marca",
				getValue: (p) => getTecladoPC(p)?.switches?.brand ?? "-",
				type: "text",
			},
			{
				key: "actuationForce",
				label: "Força de Acionamento",
				getValue: (p) => getTecladoPC(p)?.switches?.actuationForce ?? "-",
				type: "text",
			},
			{
				key: "travelDistance",
				label: "Distância de Curso",
				getValue: (p) => getTecladoPC(p)?.switches?.travelDistance ?? "-",
				type: "text",
			},
			{
				key: "lifespan",
				label: "Vida Útil",
				getValue: (p) => getTecladoPC(p)?.switches?.lifespan ?? "-",
				type: "text",
			},
			{
				key: "hotSwappable",
				label: "Hot-Swappable",
				getValue: (p) => getTecladoPC(p)?.switches?.hotSwappable ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "keycaps",
		title: "Keycaps",
		specs: [
			{
				key: "material",
				label: "Material",
				getValue: (p) => getTecladoPC(p)?.keycaps.material ?? "-",
				type: "text",
			},
			{
				key: "profile",
				label: "Perfil",
				getValue: (p) => getTecladoPC(p)?.keycaps.profile ?? "-",
				type: "text",
			},
			{
				key: "printMethod",
				label: "Método de Impressão",
				getValue: (p) => getTecladoPC(p)?.keycaps.printMethod ?? "-",
				type: "text",
			},
			{
				key: "doubleShot",
				label: "Double-Shot",
				getValue: (p) => getTecladoPC(p)?.keycaps.doubleShot ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "connectivity",
		title: "Conectividade",
		specs: [
			{
				key: "connectivityType",
				label: "Tipo",
				getValue: (p) => getTecladoPC(p)?.connectivity.type ?? "-",
				type: "text",
			},
			{
				key: "bluetooth",
				label: "Bluetooth",
				getValue: (p) => getTecladoPC(p)?.connectivity.wireless?.bluetooth ?? false,
				type: "boolean",
			},
			{
				key: "rf24ghz",
				label: "RF 2.4GHz",
				getValue: (p) => getTecladoPC(p)?.connectivity.wireless?.rf24ghz ?? false,
				type: "boolean",
			},
			{
				key: "multiDevice",
				label: "Multi-dispositivo",
				getValue: (p) => getTecladoPC(p)?.connectivity.wireless?.multiDevice ?? false,
				type: "boolean",
			},
			{
				key: "maxDevices",
				label: "Máximo de Dispositivos",
				getValue: (p) => getTecladoPC(p)?.connectivity.wireless?.maxDevices?.toString() ?? "-",
				type: "text",
			},
			{
				key: "cableType",
				label: "Tipo de Cabo",
				getValue: (p) => getTecladoPC(p)?.connectivity.cable?.type ?? "-",
				type: "text",
			},
			{
				key: "cableLength",
				label: "Comprimento do Cabo",
				getValue: (p) => getTecladoPC(p)?.connectivity.cable?.length ?? "-",
				type: "text",
			},
			{
				key: "detachable",
				label: "Cabo Destacável",
				getValue: (p) => getTecladoPC(p)?.connectivity.cable?.detachable ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "backlighting",
		title: "Iluminação",
		specs: [
			{
				key: "backlightType",
				label: "Tipo",
				getValue: (p) => getTecladoPC(p)?.backlighting?.type ?? "-",
				type: "text",
			},
			{
				key: "software",
				label: "Software",
				getValue: (p) => getTecladoPC(p)?.backlighting?.software ?? "-",
				type: "text",
			},
			{
				key: "effects",
				label: "Efeitos",
				getValue: (p) => getTecladoPC(p)?.backlighting?.effects?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "brightness",
				label: "Níveis de Brilho",
				getValue: (p) => getTecladoPC(p)?.backlighting?.brightness?.toString() ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "features",
		title: "Recursos",
		specs: [
			{
				key: "nkro",
				label: "N-Key Rollover",
				getValue: (p) => getTecladoPC(p)?.features.nkro ?? false,
				type: "boolean",
			},
			{
				key: "antiGhosting",
				label: "Anti-Ghosting",
				getValue: (p) => getTecladoPC(p)?.features.antiGhosting ?? false,
				type: "boolean",
			},
			{
				key: "macroKeys",
				label: "Teclas Macro",
				getValue: (p) => getTecladoPC(p)?.features.macroKeys?.toString() ?? "-",
				type: "text",
			},
			{
				key: "mediaKeys",
				label: "Teclas de Mídia",
				getValue: (p) => getTecladoPC(p)?.features.mediaKeys ?? false,
				type: "boolean",
			},
			{
				key: "volumeWheel",
				label: "Roda de Volume",
				getValue: (p) => getTecladoPC(p)?.features.volumeWheel ?? false,
				type: "boolean",
			},
			{
				key: "wristRest",
				label: "Apoio de Punho",
				getValue: (p) => getTecladoPC(p)?.features.wristRest ?? false,
				type: "boolean",
			},
			{
				key: "programmable",
				label: "Programável",
				getValue: (p) => getTecladoPC(p)?.features.programmable ?? false,
				type: "boolean",
			},
			{
				key: "onboardMemory",
				label: "Memória Integrada",
				getValue: (p) => getTecladoPC(p)?.features.onboardMemory ?? false,
				type: "boolean",
			},
			{
				key: "passthrough",
				label: "USB Passthrough",
				getValue: (p) => getTecladoPC(p)?.features.passthrough ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "battery",
		title: "Bateria",
		specs: [
			{
				key: "batteryType",
				label: "Tipo",
				getValue: (p) => getTecladoPC(p)?.battery?.type ?? "-",
				type: "text",
			},
			{
				key: "capacity",
				label: "Capacidade",
				getValue: (p) => getTecladoPC(p)?.battery?.capacity ?? "-",
				type: "text",
			},
			{
				key: "batteryLife",
				label: "Duração",
				getValue: (p) => getTecladoPC(p)?.battery?.life ?? "-",
				type: "text",
			},
			{
				key: "rechargeable",
				label: "Recarregável",
				getValue: (p) => getTecladoPC(p)?.battery?.rechargeable ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "build",
		title: "Construção",
		specs: [
			{
				key: "frame",
				label: "Estrutura",
				getValue: (p) => getTecladoPC(p)?.build.frame ?? "-",
				type: "text",
			},
			{
				key: "plate",
				label: "Placa",
				getValue: (p) => getTecladoPC(p)?.build.plate ?? "-",
				type: "text",
			},
			{
				key: "buildWeight",
				label: "Peso da Estrutura",
				getValue: (p) => getTecladoPC(p)?.build.weight ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "software",
		title: "Software",
		specs: [
			{
				key: "softwareName",
				label: "Nome",
				getValue: (p) => getTecladoPC(p)?.software?.name ?? "-",
				type: "text",
			},
			{
				key: "softwareFeatures",
				label: "Recursos",
				getValue: (p) => getTecladoPC(p)?.software?.features?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "platforms",
				label: "Plataformas",
				getValue: (p) => getTecladoPC(p)?.software?.platforms?.join(", ") ?? "-",
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
				getValue: (p) => getTecladoPC(p)?.dimensions.width ?? "-",
				type: "text",
			},
			{
				key: "height",
				label: "Altura",
				getValue: (p) => getTecladoPC(p)?.dimensions.height ?? "-",
				type: "text",
			},
			{
				key: "depth",
				label: "Profundidade",
				getValue: (p) => getTecladoPC(p)?.dimensions.depth ?? "-",
				type: "text",
			},
			{
				key: "weight",
				label: "Peso",
				getValue: (p) => getTecladoPC(p)?.dimensions.weight ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "compatibility",
		title: "Compatibilidade",
		specs: [
			{
				key: "compatibility",
				label: "Sistemas Compatíveis",
				getValue: (p) => getTecladoPC(p)?.compatibility.join(", ") ?? "-",
				type: "text",
			},
		],
	},
];
