import { SpecSection } from "../spec-configs";
import { BaseProduct, Product } from "../types";

function isPlacaMae(product: Product): product is PlacaMae {
	return product.category === "placa-mae";
}

export interface PlacaMae extends BaseProduct {
	category: "placa-mae";
	specs: PlacaMaeSpecs;
}

function getPlacaMae(p: Product): PlacaMaeSpecs | null {
	return isPlacaMae(p) ? p.specs : null;
}

export interface PlacaMaeSpecs {
	manufacturer: "ASUS" | "MSI" | "Gigabyte" | "ASRock" | "EVGA" | "Biostar" | "Colorful" | "NZXT" | "Outros";
	chipset: string;
	socket: string;
	formFactor: "ATX" | "Micro-ATX" | "Mini-ITX" | "E-ATX" | "XL-ATX";
	cpuSupport: {
		brands: ("Intel" | "AMD")[];
		generations: string[];
		maxTdp?: string;
	};
	memory: {
		type: string; // DDR4, DDR5
		slots: number;
		maxCapacity: string;
		maxSpeed: string;
		channels: number; // Dual, Quad
		supportedSpeeds: string[];
		xmp?: boolean;
		expo?: boolean;
		ecc?: boolean;
	};
	storage: {
		m2Slots: number;
		m2Specs?: {
			slot: number;
			interface: string; // PCIe 4.0 x4, PCIe 5.0 x4
			formFactors: string[]; // 2280, 22110
		}[];
		sataConnectors: number;
		sataVersion?: string; // SATA III 6Gb/s
		raidSupport?: string[]; // RAID 0, 1, 5, 10
	};
	expansion: {
		pciSlots: {
			type: string; // PCIe 5.0 x16, PCIe 4.0 x16, PCIe 3.0 x1
			count: number;
			mode?: string; // x16, x8/x8, x8/x4/x4
		}[];
		totalSlots: number;
	};
	networking: {
		ethernet?: {
			controller: string;
			speed: string; // 2.5GbE, 1GbE
			ports: number;
		};
		wifi?: {
			standard: string; // Wi-Fi 6E, Wi-Fi 7
			version?: string;
			bluetooth?: string;
			antenna?: boolean;
		};
	};
	audio: {
		codec: string;
		channels: string; // 7.1, 5.1
		features?: string[];
	};
	usb: {
		usb32Gen2x2TypeC?: number; // 20Gbps
		usb32Gen2TypeC?: number; // 10Gbps
		usb32Gen2TypeA?: number; // 10Gbps
		usb32Gen1?: number; // 5Gbps
		usb20?: number;
		total: number;
		frontPanelConnectors?: {
			usb32Gen2x2TypeC?: number;
			usb32Gen2TypeC?: number;
			usb32Gen1?: number;
			usb20?: number;
		};
	};
	videoOutputs?: {
		hdmi?: number;
		displayPort?: number;
		vga?: number;
		dvi?: number;
		thunderbolt?: number;
		maxDisplays?: number;
		maxResolution?: string;
	};
	power: {
		mainConnector: string; // 24-pin
		cpuConnector: string; // 8-pin, 8+4 pin, 8+8 pin
		phases: number;
		designPower?: string;
		features?: string[]; // Digital VRM, Dr.MOS
	};
	bios: {
		type: string; // UEFI, BIOS
		size?: string;
		flashback?: boolean;
		dualBios?: boolean;
	};
	cooling: {
		heatsinks?: string[];
		fanHeaders: number;
		cpuFanHeaders?: number;
		systemFanHeaders?: number;
		pumpHeaders?: number;
		argbHeaders?: number;
		rgbHeaders?: number;
	};
	rgb: {
		hasRgb: boolean;
		zones?: number;
		software?: string;
		compatibleWith?: string[];
	};
	features: {
		gaming?: boolean;
		overclocking?: boolean;
		clearCmos?: boolean;
		debugLed?: boolean;
		postCode?: boolean;
		qFlash?: boolean;
		wifi?: boolean;
		bluetooth?: boolean;
		thunderbolt?: boolean;
		tpm?: string;
		securityFeatures?: string[];
	};
	backPanel: {
		ps2?: number;
		usb?: {
			usb32Gen2x2TypeC?: number;
			usb32Gen2TypeC?: number;
			usb32Gen2TypeA?: number;
			usb32Gen1?: number;
			usb20?: number;
		};
		audio?: string[];
		network?: string[];
		video?: string[];
		other?: string[];
	};
	dimensions?: {
		length: string;
		width: string;
		height?: string;
		weight?: string;
	};
	compatibility?: {
		cases?: string[];
		coolers?: string[];
		notes?: string[];
	};
	bundled?: {
		cables?: string[];
		software?: string[];
		accessories?: string[];
	};
	warranty?: {
		period: string;
		type?: string;
	};
	ratings: {
		costBenefit: number | null;
		buildQuality: number;
		vrm: number;
		connectivity: number;
		overclocking: number;
		features: number;
	};
}

export const placaMaeSpecs: SpecSection[] = [
	{
		id: "ratings",
		title: "Notas",
		specs: [
			{
				key: "costBenefit",
				label: "Custo-benefício",
				getValue: (p) => getPlacaMae(p)?.ratings.costBenefit ?? null,
				type: "rating",
			},
			{
				key: "buildQuality",
				label: "Qualidade de Construção",
				getValue: (p) => getPlacaMae(p)?.ratings.buildQuality ?? null,
				type: "rating",
			},
			{
				key: "vrm",
				label: "VRM / Entrega de Energia",
				getValue: (p) => getPlacaMae(p)?.ratings.vrm ?? null,
				type: "rating",
			},
			{
				key: "connectivity",
				label: "Conectividade",
				getValue: (p) => getPlacaMae(p)?.ratings.connectivity ?? null,
				type: "rating",
			},
			{
				key: "overclocking",
				label: "Overclocking",
				getValue: (p) => getPlacaMae(p)?.ratings.overclocking ?? null,
				type: "rating",
			},
			{
				key: "features",
				label: "Recursos",
				getValue: (p) => getPlacaMae(p)?.ratings.features ?? null,
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
			{
				key: "manufacturer",
				label: "Fabricante",
				getValue: (p) => getPlacaMae(p)?.manufacturer ?? "-",
				type: "text",
			},
			{ key: "chipset", label: "Chipset", getValue: (p) => getPlacaMae(p)?.chipset ?? "-", type: "text" },
			{ key: "socket", label: "Soquete", getValue: (p) => getPlacaMae(p)?.socket ?? "-", type: "text" },
			{
				key: "formFactor",
				label: "Formato",
				getValue: (p) => getPlacaMae(p)?.formFactor ?? "-",
				type: "text",
			},
			{ key: "releaseDate", label: "Lançamento", getValue: (p) => p.releaseDate ?? "-", type: "text" },
			{ key: "releaseYear", label: "Ano", getValue: (p) => p.releaseYear?.toString() ?? "-", type: "text" },
		],
	},
	{
		id: "cpu-support",
		title: "Suporte de CPU",
		specs: [
			{
				key: "cpuBrands",
				label: "Marcas Suportadas",
				getValue: (p) => getPlacaMae(p)?.cpuSupport.brands?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "cpuGenerations",
				label: "Gerações Suportadas",
				getValue: (p) => getPlacaMae(p)?.cpuSupport.generations?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "maxTdp",
				label: "TDP Máximo",
				getValue: (p) => getPlacaMae(p)?.cpuSupport.maxTdp ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "memory",
		title: "Memória RAM",
		specs: [
			{
				key: "memoryType",
				label: "Tipo",
				getValue: (p) => getPlacaMae(p)?.memory.type ?? "-",
				type: "text",
			},
			{
				key: "memorySlots",
				label: "Slots",
				getValue: (p) => getPlacaMae(p)?.memory.slots?.toString() ?? "-",
				type: "text",
			},
			{
				key: "maxMemory",
				label: "Capacidade Máxima",
				getValue: (p) => getPlacaMae(p)?.memory.maxCapacity ?? "-",
				type: "text",
			},
			{
				key: "maxMemorySpeed",
				label: "Velocidade Máxima",
				getValue: (p) => getPlacaMae(p)?.memory.maxSpeed ?? "-",
				type: "text",
			},
			{
				key: "memoryChannels",
				label: "Canais",
				getValue: (p) => getPlacaMae(p)?.memory.channels?.toString() ?? "-",
				type: "text",
			},
			{
				key: "supportedSpeeds",
				label: "Velocidades Suportadas",
				getValue: (p) => getPlacaMae(p)?.memory.supportedSpeeds?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "xmp",
				label: "Intel XMP",
				getValue: (p) => getPlacaMae(p)?.memory.xmp ?? false,
				type: "boolean",
			},
			{
				key: "expo",
				label: "AMD EXPO",
				getValue: (p) => getPlacaMae(p)?.memory.expo ?? false,
				type: "boolean",
			},
			{
				key: "ecc",
				label: "Suporte ECC",
				getValue: (p) => getPlacaMae(p)?.memory.ecc ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "storage",
		title: "Armazenamento",
		specs: [
			{
				key: "m2Slots",
				label: "Slots M.2",
				getValue: (p) => getPlacaMae(p)?.storage.m2Slots?.toString() ?? "-",
				type: "text",
			},
			{
				key: "m2Interface",
				label: "Especificações M.2",
				getValue: (p) => {
					const specs = getPlacaMae(p)?.storage.m2Specs;
					return specs
						? specs.map((s) => `Slot ${s.slot}: ${s.interface} (${s.formFactors?.join(", ")})`)?.join(" | ")
						: "-";
				},
				type: "text",
			},
			{
				key: "sataConnectors",
				label: "Conectores SATA",
				getValue: (p) => getPlacaMae(p)?.storage.sataConnectors?.toString() ?? "-",
				type: "text",
			},
			{
				key: "sataVersion",
				label: "Versão SATA",
				getValue: (p) => getPlacaMae(p)?.storage.sataVersion ?? "-",
				type: "text",
			},
			{
				key: "raidSupport",
				label: "Suporte RAID",
				getValue: (p) => getPlacaMae(p)?.storage.raidSupport?.join(", ") ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "expansion",
		title: "Slots de Expansão",
		specs: [
			{
				key: "pciSlots",
				label: "Slots PCI Express",
				getValue: (p) => {
					const slots = getPlacaMae(p)?.expansion.pciSlots;
					return slots
						? slots.map((s) => `${s.count}x ${s.type}${s.mode ? ` (${s.mode})` : ""}`)?.join(" | ")
						: "-";
				},
				type: "text",
			},
			{
				key: "totalSlots",
				label: "Total de Slots",
				getValue: (p) => getPlacaMae(p)?.expansion.totalSlots?.toString() ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "networking",
		title: "Rede",
		specs: [
			{
				key: "ethernetController",
				label: "Controladora Ethernet",
				getValue: (p) => getPlacaMae(p)?.networking.ethernet?.controller ?? "-",
				type: "text",
			},
			{
				key: "ethernetSpeed",
				label: "Velocidade Ethernet",
				getValue: (p) => getPlacaMae(p)?.networking.ethernet?.speed ?? "-",
				type: "text",
			},
			{
				key: "ethernetPorts",
				label: "Portas Ethernet",
				getValue: (p) => getPlacaMae(p)?.networking.ethernet?.ports?.toString() ?? "-",
				type: "text",
			},
			{
				key: "wifiStandard",
				label: "Padrão Wi-Fi",
				getValue: (p) => getPlacaMae(p)?.networking.wifi?.standard ?? "-",
				type: "text",
			},
			{
				key: "bluetooth",
				label: "Bluetooth",
				getValue: (p) => getPlacaMae(p)?.networking.wifi?.bluetooth ?? "-",
				type: "text",
			},
			{
				key: "wifiAntenna",
				label: "Antena Wi-Fi Inclusa",
				getValue: (p) => getPlacaMae(p)?.networking.wifi?.antenna ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "audio",
		title: "Áudio",
		specs: [
			{
				key: "audioCodec",
				label: "Codec de Áudio",
				getValue: (p) => getPlacaMae(p)?.audio?.codec ?? "-",
				type: "text",
			},
			{
				key: "audioChannels",
				label: "Canais",
				getValue: (p) => getPlacaMae(p)?.audio?.channels ?? "-",
				type: "text",
			},
			{
				key: "audioFeatures",
				label: "Recursos de Áudio",
				getValue: (p) => getPlacaMae(p)?.audio?.features?.join(", ") ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "usb",
		title: "USB",
		specs: [
			{
				key: "usb32Gen2x2TypeC",
				label: "USB 3.2 Gen 2x2 Type-C (20Gbps)",
				getValue: (p) => getPlacaMae(p)?.usb.usb32Gen2x2TypeC?.toString() ?? "0",
				type: "text",
			},
			{
				key: "usb32Gen2TypeC",
				label: "USB 3.2 Gen 2 Type-C (10Gbps)",
				getValue: (p) => getPlacaMae(p)?.usb.usb32Gen2TypeC?.toString() ?? "0",
				type: "text",
			},
			{
				key: "usb32Gen2TypeA",
				label: "USB 3.2 Gen 2 Type-A (10Gbps)",
				getValue: (p) => getPlacaMae(p)?.usb.usb32Gen2TypeA?.toString() ?? "0",
				type: "text",
			},
			{
				key: "usb32Gen1",
				label: "USB 3.2 Gen 1 (5Gbps)",
				getValue: (p) => getPlacaMae(p)?.usb.usb32Gen1?.toString() ?? "0",
				type: "text",
			},
			{
				key: "usb20",
				label: "USB 2.0",
				getValue: (p) => getPlacaMae(p)?.usb.usb20?.toString() ?? "0",
				type: "text",
			},
			{
				key: "totalUsb",
				label: "Total de Portas USB",
				getValue: (p) => getPlacaMae(p)?.usb.total?.toString() ?? "-",
				type: "text",
			},
			{
				key: "frontPanelUsb",
				label: "Conectores Painel Frontal",
				getValue: (p) => {
					const front = getPlacaMae(p)?.usb.frontPanelConnectors;
					if (!front) return "-";
					const parts = [];
					if (front.usb32Gen2x2TypeC) parts.push(`${front.usb32Gen2x2TypeC}x USB 3.2 Gen 2x2 Type-C`);
					if (front.usb32Gen2TypeC) parts.push(`${front.usb32Gen2TypeC}x USB 3.2 Gen 2 Type-C`);
					if (front.usb32Gen1) parts.push(`${front.usb32Gen1}x USB 3.2 Gen 1`);
					if (front.usb20) parts.push(`${front.usb20}x USB 2.0`);
					return parts?.join(", ") || "-";
				},
				type: "text",
			},
		],
	},
	{
		id: "video-outputs",
		title: "Saídas de Vídeo",
		specs: [
			{
				key: "hdmiPorts",
				label: "HDMI",
				getValue: (p) => getPlacaMae(p)?.videoOutputs?.hdmi?.toString() ?? "0",
				type: "text",
			},
			{
				key: "displayPort",
				label: "DisplayPort",
				getValue: (p) => getPlacaMae(p)?.videoOutputs?.displayPort?.toString() ?? "0",
				type: "text",
			},
			{
				key: "vgaPorts",
				label: "VGA",
				getValue: (p) => getPlacaMae(p)?.videoOutputs?.vga?.toString() ?? "0",
				type: "text",
			},
			{
				key: "dviPorts",
				label: "DVI",
				getValue: (p) => getPlacaMae(p)?.videoOutputs?.dvi?.toString() ?? "0",
				type: "text",
			},
			{
				key: "thunderbolt",
				label: "Thunderbolt",
				getValue: (p) => getPlacaMae(p)?.videoOutputs?.thunderbolt?.toString() ?? "0",
				type: "text",
			},
			{
				key: "maxDisplays",
				label: "Máximo de Monitores",
				getValue: (p) => getPlacaMae(p)?.videoOutputs?.maxDisplays?.toString() ?? "-",
				type: "text",
			},
			{
				key: "maxResolution",
				label: "Resolução Máxima",
				getValue: (p) => getPlacaMae(p)?.videoOutputs?.maxResolution ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "power",
		title: "Energia",
		specs: [
			{
				key: "mainConnector",
				label: "Conector Principal",
				getValue: (p) => getPlacaMae(p)?.power?.mainConnector ?? "-",
				type: "text",
			},
			{
				key: "cpuConnector",
				label: "Conector CPU",
				getValue: (p) => getPlacaMae(p)?.power?.cpuConnector ?? "-",
				type: "text",
			},
			{
				key: "phases",
				label: "Fases de Energia",
				getValue: (p) => getPlacaMae(p)?.power?.phases?.toString() ?? "-",
				type: "text",
			},
			{
				key: "designPower",
				label: "Potência de Design",
				getValue: (p) => getPlacaMae(p)?.power?.designPower ?? "-",
				type: "text",
			},
			{
				key: "powerFeatures",
				label: "Recursos de Energia",
				getValue: (p) => getPlacaMae(p)?.power?.features?.join(", ") ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "bios",
		title: "BIOS",
		specs: [
			{
				key: "biosType",
				label: "Tipo",
				getValue: (p) => getPlacaMae(p)?.bios.type ?? "-",
				type: "text",
			},
			{
				key: "biosSize",
				label: "Tamanho",
				getValue: (p) => getPlacaMae(p)?.bios.size ?? "-",
				type: "text",
			},
			{
				key: "flashback",
				label: "BIOS Flashback",
				getValue: (p) => getPlacaMae(p)?.bios.flashback ?? false,
				type: "boolean",
			},
			{
				key: "dualBios",
				label: "Dual BIOS",
				getValue: (p) => getPlacaMae(p)?.bios.dualBios ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "cooling",
		title: "Refrigeração",
		specs: [
			{
				key: "heatsinks",
				label: "Dissipadores",
				getValue: (p) => getPlacaMae(p)?.cooling?.heatsinks?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "fanHeaders",
				label: "Total de Headers",
				getValue: (p) => getPlacaMae(p)?.cooling?.fanHeaders?.toString() ?? "-",
				type: "text",
			},
			{
				key: "cpuFanHeaders",
				label: "Headers CPU",
				getValue: (p) => getPlacaMae(p)?.cooling.cpuFanHeaders?.toString() ?? "-",
				type: "text",
			},
			{
				key: "systemFanHeaders",
				label: "Headers Sistema",
				getValue: (p) => getPlacaMae(p)?.cooling?.systemFanHeaders?.toString() ?? "-",
				type: "text",
			},
			{
				key: "pumpHeaders",
				label: "Headers Bomba",
				getValue: (p) => getPlacaMae(p)?.cooling?.pumpHeaders?.toString() ?? "-",
				type: "text",
			},
			{
				key: "argbHeaders",
				label: "Headers ARGB",
				getValue: (p) => getPlacaMae(p)?.cooling?.argbHeaders?.toString() ?? "-",
				type: "text",
			},
			{
				key: "rgbHeaders",
				label: "Headers RGB",
				getValue: (p) => getPlacaMae(p)?.cooling.rgbHeaders?.toString() ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "rgb",
		title: "Iluminação RGB",
		specs: [
			{
				key: "hasRgb",
				label: "RGB",
				getValue: (p) => getPlacaMae(p)?.rgb.hasRgb ?? false,
				type: "boolean",
			},
			{
				key: "rgbZones",
				label: "Zonas RGB",
				getValue: (p) => getPlacaMae(p)?.rgb.zones?.toString() ?? "-",
				type: "text",
			},
			{
				key: "rgbSoftware",
				label: "Software RGB",
				getValue: (p) => getPlacaMae(p)?.rgb.software ?? "-",
				type: "text",
			},
			{
				key: "rgbCompatibility",
				label: "Compatibilidade RGB",
				getValue: (p) => getPlacaMae(p)?.rgb.compatibleWith?.join(", ") ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "features",
		title: "Recursos",
		specs: [
			{
				key: "gaming",
				label: "Gaming",
				getValue: (p) => getPlacaMae(p)?.features.gaming ?? false,
				type: "boolean",
			},
			{
				key: "overclocking",
				label: "Overclocking",
				getValue: (p) => getPlacaMae(p)?.features.overclocking ?? false,
				type: "boolean",
			},
			{
				key: "clearCmos",
				label: "Clear CMOS",
				getValue: (p) => getPlacaMae(p)?.features.clearCmos ?? false,
				type: "boolean",
			},
			{
				key: "debugLed",
				label: "Debug LED",
				getValue: (p) => getPlacaMae(p)?.features.debugLed ?? false,
				type: "boolean",
			},
			{
				key: "postCode",
				label: "POST Code",
				getValue: (p) => getPlacaMae(p)?.features.postCode ?? false,
				type: "boolean",
			},
			{
				key: "qFlash",
				label: "Q-Flash",
				getValue: (p) => getPlacaMae(p)?.features.qFlash ?? false,
				type: "boolean",
			},
			{
				key: "wifiFeature",
				label: "Wi-Fi",
				getValue: (p) => getPlacaMae(p)?.features.wifi ?? false,
				type: "boolean",
			},
			{
				key: "bluetoothFeature",
				label: "Bluetooth",
				getValue: (p) => getPlacaMae(p)?.features.bluetooth ?? false,
				type: "boolean",
			},
			{
				key: "thunderboltFeature",
				label: "Thunderbolt",
				getValue: (p) => getPlacaMae(p)?.features.thunderbolt ?? false,
				type: "boolean",
			},
			{
				key: "tpm",
				label: "TPM",
				getValue: (p) => getPlacaMae(p)?.features.tpm ?? "-",
				type: "text",
			},
			{
				key: "securityFeatures",
				label: "Recursos de Segurança",
				getValue: (p) => getPlacaMae(p)?.features.securityFeatures?.join(", ") ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "dimensions",
		title: "Dimensões",
		specs: [
			{
				key: "length",
				label: "Comprimento",
				getValue: (p) => getPlacaMae(p)?.dimensions?.length ?? "-",
				type: "text",
			},
			{
				key: "width",
				label: "Largura",
				getValue: (p) => getPlacaMae(p)?.dimensions?.width ?? "-",
				type: "text",
			},
			{
				key: "height",
				label: "Altura",
				getValue: (p) => getPlacaMae(p)?.dimensions?.height ?? "-",
				type: "text",
			},
			{
				key: "weight",
				label: "Peso",
				getValue: (p) => getPlacaMae(p)?.dimensions?.weight ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "warranty",
		title: "Garantia",
		specs: [
			{
				key: "warrantyPeriod",
				label: "Período",
				getValue: (p) => getPlacaMae(p)?.warranty?.period ?? "-",
				type: "text",
			},
			{
				key: "warrantyType",
				label: "Tipo",
				getValue: (p) => getPlacaMae(p)?.warranty?.type ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "bundled",
		title: "Itens Inclusos",
		specs: [
			{
				key: "cables",
				label: "Cabos",
				getValue: (p) => getPlacaMae(p)?.bundled?.cables?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "software",
				label: "Software",
				getValue: (p) => getPlacaMae(p)?.bundled?.software?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "accessories",
				label: "Acessórios",
				getValue: (p) => getPlacaMae(p)?.bundled?.accessories?.join(", ") ?? "-",
				type: "text",
			},
		],
	},
];
