import { SpecSection } from "../spec-configs";
import { BaseProduct, Product } from "../types";

function isMonitor(product: Product): product is Monitor {
	return product.category === "monitores";
}

export interface Monitor extends BaseProduct {
	category: "monitores";
	specs: MonitorSpecs;
}

function getMonitor(p: Product): MonitorSpecs | null {
	return isMonitor(p) ? p.specs : null;
}

export interface MonitorSpecs {
	screen: {
		size: string; // Ex: "24\"", "27\"", "32\""
		resolution: string; // Ex: "1920x1080", "2560x1440", "3840x2160"
		resolutionType: "HD" | "Full HD" | "QHD" | "WQHD" | "4K UHD" | "5K" | "8K" | "UWQHD" | "DQHD";
		pixelDensity?: string; // Ex: "92 PPI", "109 PPI"
		screenType: "LCD" | "LED" | "OLED" | "QLED" | "Mini-LED" | "Micro-LED" | "VA" | "TN";
		panelType: "IPS" | "VA" | "TN" | "OLED" | "PLS" | "ADS" | "IGZO";
		aspectRatio: "16:9" | "16:10" | "21:9" | "32:9" | "4:3" | "5:4";
		isCurved: boolean;
		curvature?: string; // Ex: "1000R", "1500R", "1800R", "Flat"
		refreshRate: string; // Ex: "60 Hz", "144 Hz", "240 Hz"
		maxRefreshRate: string;
		responseTime: string; // Ex: "1ms", "5ms"
		responseTimeGTG?: string; // Gray to Gray
		responseTimeMPRT?: string; // Moving Picture Response Time
	};
	display: {
		brightness: string; // Ex: "250 cd/m²", "400 cd/m²"
		contrast: string; // Ex: "1000:1", "3000:1"
		dynamicContrast?: string; // Ex: "100000000:1"
		viewingAngleHorizontal: string; // Ex: "178°"
		viewingAngleVertical: string; // Ex: "178°"
		colorGamut?: {
			sRGB?: string; // Ex: "99%", "125%"
			adobeRGB?: string;
			dciP3?: string;
			ntsc?: string;
		};
		colorDepth?: string; // Ex: "8-bit", "10-bit", "12-bit"
		maxColors?: string; // Ex: "16.7 milhões", "1.07 bilhões"
		hdr?: boolean;
		hdrStandards?: string[]; // Ex: ["HDR10", "HDR400", "HDR600", "Dolby Vision"]
		peakBrightness?: string; // Para HDR
	};
	features: {
		touchScreen: boolean;
		builtInSpeakers: boolean;
		speakerPower?: string; // Ex: "2W x 2"
		webcam: boolean;
		webcamResolution?: string;
		microphone: boolean;
		usb?: {
			hasHub: boolean;
			usbPorts?: string; // Ex: "4x USB 3.0"
			usbCPort?: boolean;
			usbCPower?: string; // Ex: "65W", "90W"
		};
		antiGlare: boolean;
		blueLightReduction: boolean;
		flickerFree: boolean;
		is3D: boolean;
		pip: boolean; // Picture-in-Picture
		pbp: boolean; // Picture-by-Picture
		kvm?: boolean; // KVM Switch
		voiceControl: boolean;
		remoteControl: boolean;
	};
	adjustability: {
		heightAdjustable: boolean;
		heightRange?: string; // Ex: "0-130mm"
		tiltAdjustable: boolean;
		tiltRange?: string; // Ex: "-5° a +20°"
		swivelAdjustable: boolean;
		swivelRange?: string; // Ex: "-30° a +30°"
		pivotAdjustable: boolean;
		pivotRange?: string; // Ex: "90°"
		vesaMount: boolean;
		vesaPattern?: string; // Ex: "100x100", "75x75"
	};
	connectivity: {
		hdmi?: {
			count: number;
			version?: string; // Ex: "2.0", "2.1"
		};
		displayPort?: {
			count: number;
			version?: string; // Ex: "1.2", "1.4"
		};
		dvi?: {
			count: number;
			type?: string; // Ex: "DVI-D", "DVI-I"
		};
		vga?: number;
		usbC?: {
			count: number;
			displayAlt: boolean;
			powerDelivery?: string;
		};
		thunderbolt?: {
			count: number;
			version?: string;
		};
		audioOut?: boolean;
		headphoneJack?: boolean;
		ethernet?: boolean;
	};
	gaming: {
		isGamingMonitor: boolean;
		adaptiveSync?:
			| "G-SYNC"
			| "G-SYNC Compatible"
			| "FreeSync"
			| "FreeSync Premium"
			| "FreeSync Premium Pro"
			| "Adaptive-Sync";
		gsyncUltimate?: boolean;
		lowInputLag?: boolean;
		crosshair?: boolean;
		blackStabilizer?: boolean;
		motionBlur?: string; // Ex: "ULMB", "DyAc"
		gameMode?: boolean;
	};
	power: {
		consumption: string; // Ex: "25W"
		consumptionStandby?: string;
		consumptionMax?: string;
		powerSupply: "Interno" | "Externo";
		voltage?: string; // Ex: "100-240V"
		energyRating?: string; // Ex: "Energy Star 8.0"
	};
	dimensions: {
		withStand: {
			height: string;
			width: string;
			depth: string;
			weight: string;
		};
		withoutStand: {
			height: string;
			width: string;
			depth: string;
			weight: string;
		};
	};
	additional: {
		isPortable: boolean;
		batteryPowered?: boolean;
		batteryLife?: string;
		professionalUse?: string[]; // Ex: ["Design Gráfico", "Edição de Vídeo", "CAD"]
		certifications?: string[]; // Ex: ["TÜV Rheinland", "Eye Care", "Flicker-Free"]
		warranty?: string;
	};
	ratings: {
		costBenefit: number | null;
		imageQuality: number;
		gamingPerformance: number;
		professionalUse: number;
		buildQuality: number;
		features: number;
	};
}

export const monitorSpecs: SpecSection[] = [
	{
		id: "ratings",
		title: "Avaliações",
		specs: [
			{
				key: "costBenefit",
				label: "Custo-benefício",
				getValue: (p) => getMonitor(p)?.ratings.costBenefit ?? null,
				type: "rating",
			},
			{
				key: "imageQuality",
				label: "Qualidade de Imagem",
				getValue: (p) => getMonitor(p)?.ratings.imageQuality ?? null,
				type: "rating",
			},
			{
				key: "gamingPerformance",
				label: "Performance em Jogos",
				getValue: (p) => getMonitor(p)?.ratings.gamingPerformance ?? null,
				type: "rating",
			},
			{
				key: "professionalUse",
				label: "Uso Profissional",
				getValue: (p) => getMonitor(p)?.ratings.professionalUse ?? null,
				type: "rating",
			},
			{
				key: "buildQuality",
				label: "Qualidade de Construção",
				getValue: (p) => getMonitor(p)?.ratings.buildQuality ?? null,
				type: "rating",
			},
			{
				key: "features",
				label: "Recursos",
				getValue: (p) => getMonitor(p)?.ratings.features ?? null,
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
			{ key: "releaseDate", label: "Lançamento", getValue: (p) => p.releaseDate ?? "-", type: "text" },
			{ key: "releaseYear", label: "Ano", getValue: (p) => p.releaseYear?.toString() ?? "-", type: "text" },
		],
	},
	{
		id: "screen",
		title: "Tela",
		specs: [
			{ key: "screenSize", label: "Tamanho", getValue: (p) => getMonitor(p)?.screen.size ?? "-", type: "text" },
			{
				key: "resolution",
				label: "Resolução",
				getValue: (p) => getMonitor(p)?.screen.resolution ?? "-",
				type: "text",
			},
			{
				key: "resolutionType",
				label: "Tipo de Resolução",
				getValue: (p) => getMonitor(p)?.screen.resolutionType ?? "-",
				type: "text",
			},
			{
				key: "pixelDensity",
				label: "Densidade de Pixels",
				getValue: (p) => getMonitor(p)?.screen.pixelDensity ?? "-",
				type: "text",
			},
			{
				key: "screenType",
				label: "Tipo de Tela",
				getValue: (p) => getMonitor(p)?.screen.screenType ?? "-",
				type: "text",
			},
			{
				key: "panelType",
				label: "Tipo de Painel",
				getValue: (p) => getMonitor(p)?.screen.panelType ?? "-",
				type: "text",
			},
			{
				key: "aspectRatio",
				label: "Proporção",
				getValue: (p) => getMonitor(p)?.screen.aspectRatio ?? "-",
				type: "text",
			},
			{
				key: "isCurved",
				label: "É Curvo",
				getValue: (p) => getMonitor(p)?.screen.isCurved ?? false,
				type: "boolean",
			},
			{
				key: "curvature",
				label: "Curvatura",
				getValue: (p) => getMonitor(p)?.screen.curvature ?? "-",
				type: "text",
			},
			{
				key: "refreshRate",
				label: "Taxa de Atualização",
				getValue: (p) => getMonitor(p)?.screen.refreshRate ?? "-",
				type: "text",
			},
			{
				key: "maxRefreshRate",
				label: "Taxa Máxima de Atualização",
				getValue: (p) => getMonitor(p)?.screen.maxRefreshRate ?? "-",
				type: "text",
			},
			{
				key: "responseTime",
				label: "Tempo de Resposta",
				getValue: (p) => getMonitor(p)?.screen.responseTime ?? "-",
				type: "text",
			},
			{
				key: "responseTimeGTG",
				label: "Tempo de Resposta GTG",
				getValue: (p) => getMonitor(p)?.screen.responseTimeGTG ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "display",
		title: "Qualidade de Imagem",
		specs: [
			{
				key: "brightness",
				label: "Brilho",
				getValue: (p) => getMonitor(p)?.display.brightness ?? "-",
				type: "text",
			},
			{
				key: "contrast",
				label: "Contraste",
				getValue: (p) => getMonitor(p)?.display.contrast ?? "-",
				type: "text",
			},
			{
				key: "dynamicContrast",
				label: "Contraste Dinâmico",
				getValue: (p) => getMonitor(p)?.display.dynamicContrast ?? "-",
				type: "text",
			},
			{
				key: "viewingAngleH",
				label: "Ângulo de Visão Horizontal",
				getValue: (p) => getMonitor(p)?.display.viewingAngleHorizontal ?? "-",
				type: "text",
			},
			{
				key: "viewingAngleV",
				label: "Ângulo de Visão Vertical",
				getValue: (p) => getMonitor(p)?.display.viewingAngleVertical ?? "-",
				type: "text",
			},
			{
				key: "sRGB",
				label: "Cobertura sRGB",
				getValue: (p) => getMonitor(p)?.display.colorGamut?.sRGB ?? "-",
				type: "text",
			},
			{
				key: "dciP3",
				label: "Cobertura DCI-P3",
				getValue: (p) => getMonitor(p)?.display.colorGamut?.dciP3 ?? "-",
				type: "text",
			},
			{
				key: "colorDepth",
				label: "Profundidade de Cor",
				getValue: (p) => getMonitor(p)?.display.colorDepth ?? "-",
				type: "text",
			},
			{
				key: "hdr",
				label: "Suporte HDR",
				getValue: (p) => getMonitor(p)?.display.hdr ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "connectivity",
		title: "Conectividade",
		specs: [
			{
				key: "hdmiCount",
				label: "Portas HDMI",
				getValue: (p) => getMonitor(p)?.connectivity.hdmi?.count.toString() ?? "-",
				type: "text",
			},
			{
				key: "hdmiVersion",
				label: "Versão HDMI",
				getValue: (p) => getMonitor(p)?.connectivity.hdmi?.version ?? "-",
				type: "text",
			},
			{
				key: "displayPortCount",
				label: "Portas DisplayPort",
				getValue: (p) => getMonitor(p)?.connectivity.displayPort?.count.toString() ?? "-",
				type: "text",
			},
			{
				key: "displayPortVersion",
				label: "Versão DisplayPort",
				getValue: (p) => getMonitor(p)?.connectivity.displayPort?.version ?? "-",
				type: "text",
			},
			{
				key: "usbCCount",
				label: "Portas USB-C",
				getValue: (p) => getMonitor(p)?.connectivity.usbC?.count.toString() ?? "-",
				type: "text",
			},
			{
				key: "usbCPower",
				label: "USB-C Power Delivery",
				getValue: (p) => getMonitor(p)?.connectivity.usbC?.powerDelivery ?? "-",
				type: "text",
			},
			{
				key: "vgaCount",
				label: "Portas VGA",
				getValue: (p) => getMonitor(p)?.connectivity.vga?.toString() ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "features",
		title: "Recursos",
		specs: [
			{
				key: "touchScreen",
				label: "Tela Touch",
				getValue: (p) => getMonitor(p)?.features.touchScreen ?? false,
				type: "boolean",
			},
			{
				key: "builtInSpeakers",
				label: "Alto-falantes Embutidos",
				getValue: (p) => getMonitor(p)?.features.builtInSpeakers ?? false,
				type: "boolean",
			},
			{
				key: "webcam",
				label: "Webcam",
				getValue: (p) => getMonitor(p)?.features.webcam ?? false,
				type: "boolean",
			},
			{
				key: "usbHub",
				label: "Hub USB",
				getValue: (p) => getMonitor(p)?.features.usb?.hasHub ?? false,
				type: "boolean",
			},
			{
				key: "antiGlare",
				label: "Anti-reflexo",
				getValue: (p) => getMonitor(p)?.features.antiGlare ?? false,
				type: "boolean",
			},
			{
				key: "blueLightReduction",
				label: "Redução de Luz Azul",
				getValue: (p) => getMonitor(p)?.features.blueLightReduction ?? false,
				type: "boolean",
			},
			{
				key: "flickerFree",
				label: "Sem Flicker",
				getValue: (p) => getMonitor(p)?.features.flickerFree ?? false,
				type: "boolean",
			},
			{
				key: "pip",
				label: "PIP",
				getValue: (p) => getMonitor(p)?.features.pip ?? false,
				type: "boolean",
			},
			{
				key: "pbp",
				label: "PBP",
				getValue: (p) => getMonitor(p)?.features.pbp ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "adjustability",
		title: "Ajustes",
		specs: [
			{
				key: "heightAdjustable",
				label: "Altura Ajustável",
				getValue: (p) => getMonitor(p)?.adjustability.heightAdjustable ?? false,
				type: "boolean",
			},
			{
				key: "heightRange",
				label: "Faixa de Altura",
				getValue: (p) => getMonitor(p)?.adjustability.heightRange ?? "-",
				type: "text",
			},
			{
				key: "tiltAdjustable",
				label: "Inclinação Ajustável",
				getValue: (p) => getMonitor(p)?.adjustability.tiltAdjustable ?? false,
				type: "boolean",
			},
			{
				key: "swivelAdjustable",
				label: "Rotação Horizontal",
				getValue: (p) => getMonitor(p)?.adjustability.swivelAdjustable ?? false,
				type: "boolean",
			},
			{
				key: "pivotAdjustable",
				label: "Pivô (Rotação 90°)",
				getValue: (p) => getMonitor(p)?.adjustability.pivotAdjustable ?? false,
				type: "boolean",
			},
			{
				key: "vesaMount",
				label: "Suporte VESA",
				getValue: (p) => getMonitor(p)?.adjustability.vesaMount ?? false,
				type: "boolean",
			},
			{
				key: "vesaPattern",
				label: "Padrão VESA",
				getValue: (p) => getMonitor(p)?.adjustability.vesaPattern ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "gaming",
		title: "Gaming",
		specs: [
			{
				key: "isGamingMonitor",
				label: "Monitor Gamer",
				getValue: (p) => getMonitor(p)?.gaming.isGamingMonitor ?? false,
				type: "boolean",
			},
			{
				key: "adaptiveSync",
				label: "Sincronização Adaptativa",
				getValue: (p) => getMonitor(p)?.gaming.adaptiveSync ?? "-",
				type: "text",
			},
			{
				key: "gsyncUltimate",
				label: "G-SYNC Ultimate",
				getValue: (p) => getMonitor(p)?.gaming.gsyncUltimate ?? false,
				type: "boolean",
			},
			{
				key: "lowInputLag",
				label: "Baixa Latência",
				getValue: (p) => getMonitor(p)?.gaming.lowInputLag ?? false,
				type: "boolean",
			},
			{
				key: "gameMode",
				label: "Modo Game",
				getValue: (p) => getMonitor(p)?.gaming.gameMode ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "power",
		title: "Energia",
		specs: [
			{
				key: "consumption",
				label: "Consumo",
				getValue: (p) => getMonitor(p)?.power.consumption ?? "-",
				type: "text",
			},
			{
				key: "consumptionMax",
				label: "Consumo Máximo",
				getValue: (p) => getMonitor(p)?.power.consumptionMax ?? "-",
				type: "text",
			},
			{
				key: "powerSupply",
				label: "Fonte de Alimentação",
				getValue: (p) => getMonitor(p)?.power.powerSupply ?? "-",
				type: "text",
			},
			{
				key: "energyRating",
				label: "Certificação Energética",
				getValue: (p) => getMonitor(p)?.power.energyRating ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "dimensions",
		title: "Dimensões e Peso",
		specs: [
			{
				key: "heightWithStand",
				label: "Altura (com suporte)",
				getValue: (p) => getMonitor(p)?.dimensions.withStand.height ?? "-",
				type: "text",
			},
			{
				key: "widthWithStand",
				label: "Largura (com suporte)",
				getValue: (p) => getMonitor(p)?.dimensions.withStand.width ?? "-",
				type: "text",
			},
			{
				key: "depthWithStand",
				label: "Profundidade (com suporte)",
				getValue: (p) => getMonitor(p)?.dimensions.withStand.depth ?? "-",
				type: "text",
			},
			{
				key: "weightWithStand",
				label: "Peso (com suporte)",
				getValue: (p) => getMonitor(p)?.dimensions.withStand.weight ?? "-",
				type: "text",
			},
			{
				key: "heightWithoutStand",
				label: "Altura (sem suporte)",
				getValue: (p) => getMonitor(p)?.dimensions.withoutStand.height ?? "-",
				type: "text",
			},
			{
				key: "widthWithoutStand",
				label: "Largura (sem suporte)",
				getValue: (p) => getMonitor(p)?.dimensions.withoutStand.width ?? "-",
				type: "text",
			},
			{
				key: "depthWithoutStand",
				label: "Profundidade (sem suporte)",
				getValue: (p) => getMonitor(p)?.dimensions.withoutStand.depth ?? "-",
				type: "text",
			},
			{
				key: "weightWithoutStand",
				label: "Peso (sem suporte)",
				getValue: (p) => getMonitor(p)?.dimensions.withoutStand.weight ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "additional",
		title: "Informações Adicionais",
		specs: [
			{
				key: "isPortable",
				label: "É Portátil",
				getValue: (p) => getMonitor(p)?.additional.isPortable ?? false,
				type: "boolean",
			},
			{
				key: "batteryPowered",
				label: "Alimentado por Bateria",
				getValue: (p) => getMonitor(p)?.additional.batteryPowered ?? false,
				type: "boolean",
			},
			{
				key: "warranty",
				label: "Garantia",
				getValue: (p) => getMonitor(p)?.additional.warranty ?? "-",
				type: "text",
			},
		],
	},
];
