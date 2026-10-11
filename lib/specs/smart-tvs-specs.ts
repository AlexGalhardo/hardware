import { SpecSection } from "../spec-configs";
import { BaseProduct, Product } from "../types";

export interface Smartv extends BaseProduct {
	category: "smart-tvs";
	specs: SmartvSpecs;
}

export const SMARTV_CATEGORY = "smart-tvs" as const;

function isSmartv(product: Product): product is Smartv {
	return product.category === SMARTV_CATEGORY;
}

function getSmartv(p: Product): SmartvSpecs | null {
	return isSmartv(p) ? p.specs : null;
}

export interface SmartvSpecs {
	screen: {
		sizeInches: number;
		resolution: "HD" | "Full HD" | "4K" | "8K";
		panelType: "LED" | "QLED" | "OLED" | "Mini LED";
		hdr?: boolean;
		refreshRateHz?: number;
		brightnessNits?: number;
		contrastRatio?: number;
		responseTimeMs?: number;
		viewingAngleDegrees?: number;
		aspectRatio?: string;
	};

	system: {
		os: string;
		apps?: string[];
		voiceAssistant?: string;
		isSmart: true;
		storageGb?: number;
		processorCores?: number;
		screenShare?: boolean;
	};

	audio: {
		speakers?: number;
		powerWatts?: number;
		dolbyAudio?: boolean;
		surround?: boolean;
	};

	connectivity: {
		wifi: boolean;
		bluetooth?: boolean;
		ethernet?: boolean;
	};

	ports: {
		hdmi: number;
		usb?: number;
		spdif?: boolean;
		component?: boolean;
		composite?: boolean;
		rfAntenna?: boolean;
		vga?: boolean;
	};

	design?: {
		vesa?: boolean;
		widthCm?: number;
		heightCm?: number;
		depthCm?: number;
		weightKg?: number;
		cableManagement?: boolean;
	};

	energy?: {
		energyEfficiencyClass?: string;
		inmetroCertification?: string;
	};

	ratings: {
		costBenefit: number | null;
		imageQuality: number;
		soundQuality: number;
		systemSpeed: number;
		connectivity: number;
	};
}

export const smartvSpecs: SpecSection[] = [
	{
		id: "ratings",
		title: "Notas",
		specs: [
			{
				key: "costBenefit",
				label: "Custo-benefício",
				getValue: (p) => getSmartv(p)?.ratings.costBenefit ?? null,
				type: "rating",
			},
			{
				key: "imageQuality",
				label: "Qualidade de Imagem",
				getValue: (p) => getSmartv(p)?.ratings.imageQuality ?? null,
				type: "rating",
			},
			{
				key: "soundQuality",
				label: "Som",
				getValue: (p) => getSmartv(p)?.ratings.soundQuality ?? null,
				type: "rating",
			},
			{
				key: "systemSpeed",
				label: "Sistema/Fluidez",
				getValue: (p) => getSmartv(p)?.ratings.systemSpeed ?? null,
				type: "rating",
			},
			{
				key: "connectivity",
				label: "Conectividade",
				getValue: (p) => getSmartv(p)?.ratings.connectivity ?? null,
				type: "rating",
			},
		],
	},

	{
		id: "basic",
		title: "Informações Básicas",
		specs: [
			{
				key: "brand",
				label: "Marca",
				getValue: (p) => p.brand ?? "-",
				type: "text",
			},
			{
				key: "model",
				label: "Modelo",
				getValue: (p) => p.model ?? "-",
				type: "text",
			},
			{
				key: "line",
				label: "Linha",
				getValue: (p) => p.line ?? "-",
				type: "text",
			},
			{
				key: "color",
				label: "Cor",
				getValue: (p) => p.color ?? "-",
				type: "text",
			},
			{
				key: "releaseYear",
				label: "Ano",
				getValue: (p) => p.releaseYear ?? "-",
				type: "text",
			},
			{
				key: "manufacturer",
				label: "Fabricante",
				getValue: (p) => p.manufacturer ?? "-",
				type: "text",
			},
		],
	},

	{
		id: "energy",
		title: "Energia & Certificação",
		specs: [
			{
				key: "energyEfficiencyClass",
				label: "Eficiência Energética",
				getValue: (p) => getSmartv(p)?.energy?.energyEfficiencyClass ?? "-",
				type: "text",
			},
			{
				key: "inmetroCertification",
				label: "Registro INMETRO",
				getValue: (p) => getSmartv(p)?.energy?.inmetroCertification ?? "-",
				type: "text",
			},
		],
	},

	{
		id: "screen",
		title: "Tela",
		specs: [
			{
				key: "sizeInches",
				label: "Tamanho",
				getValue: (p) => (getSmartv(p) ? `${getSmartv(p)!.screen.sizeInches}"` : "-"),
				type: "text",
			},
			{
				key: "resolution",
				label: "Resolução",
				getValue: (p) => getSmartv(p)?.screen.resolution ?? "-",
				type: "text",
			},
			{
				key: "panelType",
				label: "Painel",
				getValue: (p) => getSmartv(p)?.screen.panelType ?? "-",
				type: "text",
			},
			{
				key: "hdr",
				label: "HDR",
				getValue: (p) => getSmartv(p)?.screen.hdr ?? false,
				type: "boolean",
			},
			{
				key: "refreshRateHz",
				label: "Taxa",
				getValue: (p) =>
					getSmartv(p)?.screen.refreshRateHz != null ? `${getSmartv(p)!.screen.refreshRateHz} Hz` : "-",
				type: "text",
			},
		],
	},

	{
		id: "audio",
		title: "Áudio",
		specs: [
			{
				key: "speakers",
				label: "Caixas",
				getValue: (p) => getSmartv(p)?.audio.speakers ?? "-",
				type: "text",
			},
			{
				key: "powerWatts",
				label: "Potência",
				getValue: (p) => (getSmartv(p)?.audio.powerWatts != null ? `${getSmartv(p)!.audio.powerWatts} W` : "-"),
				type: "text",
			},
			{
				key: "dolbyAudio",
				label: "Dolby",
				getValue: (p) => getSmartv(p)?.audio.dolbyAudio ?? false,
				type: "boolean",
			},
			{
				key: "surround",
				label: "Surround",
				getValue: (p) => getSmartv(p)?.audio.surround ?? false,
				type: "boolean",
			},
		],
	},

	{
		id: "ports",
		title: "Portas",
		specs: [
			{
				key: "hdmi",
				label: "HDMI",
				getValue: (p) => getSmartv(p)?.ports.hdmi ?? "-",
				type: "text",
			},
			{
				key: "usb",
				label: "USB",
				getValue: (p) => getSmartv(p)?.ports.usb ?? "-",
				type: "text",
			},
			{
				key: "component",
				label: "Componente",
				getValue: (p) => getSmartv(p)?.ports.component ?? false,
				type: "boolean",
			},
			{
				key: "composite",
				label: "Composto",
				getValue: (p) => getSmartv(p)?.ports.composite ?? false,
				type: "boolean",
			},
			{
				key: "rfAntenna",
				label: "Antena RF",
				getValue: (p) => getSmartv(p)?.ports.rfAntenna ?? false,
				type: "boolean",
			},
			{
				key: "vga",
				label: "VGA",
				getValue: (p) => getSmartv(p)?.ports.vga ?? false,
				type: "boolean",
			},
		],
	},

	{
		id: "design",
		title: "Dimensões",
		specs: [
			{
				key: "widthCm",
				label: "Largura",
				getValue: (p) => (getSmartv(p)?.design?.widthCm != null ? `${getSmartv(p)!.design!.widthCm} cm` : "-"),
				type: "text",
			},
			{
				key: "heightCm",
				label: "Altura",
				getValue: (p) =>
					getSmartv(p)?.design?.heightCm != null ? `${getSmartv(p)!.design!.heightCm} cm` : "-",
				type: "text",
			},
			{
				key: "depthCm",
				label: "Profundidade",
				getValue: (p) => (getSmartv(p)?.design?.depthCm != null ? `${getSmartv(p)!.design!.depthCm} cm` : "-"),
				type: "text",
			},
			{
				key: "weightKg",
				label: "Peso",
				getValue: (p) =>
					getSmartv(p)?.design?.weightKg != null ? `${getSmartv(p)!.design!.weightKg} kg` : "-",
				type: "text",
			},
			{
				key: "vesa",
				label: "VESA",
				getValue: (p) => getSmartv(p)?.design?.vesa ?? false,
				type: "boolean",
			},
		],
	},
];
