import { SpecSection } from "../spec-configs";
import { BaseProduct, Product } from "../types";

function isImpressora(product: BaseProduct): product is Impressora {
	return product.category === "impressoras";
}

export interface Impressora extends BaseProduct {
	category: "impressoras";
	specs: ImpressoraSpecs;
}

function getImpressora(p: Product): ImpressoraSpecs | null {
	if (isImpressora(p)) {
		return p.specs;
	}
	return null;
}

export interface ImpressoraSpecs {
	manufacturer:
		| "HP"
		| "Epson"
		| "Canon"
		| "Brother"
		| "Samsung"
		| "Xerox"
		| "Lexmark"
		| "Ricoh"
		| "Kyocera"
		| "Outros";
	type: "Multifuncional" | "Impressora" | "Copiadora" | "Scanner";
	printingTechnology: "Jato de tinta" | "Laser" | "Térmica" | "Matricial" | "Sublimação" | "Tanque de tinta";
	printType: "Cor" | "Monocromática" | "Preto e branco";
	functions: ("Impressão" | "Cópia" | "Digitalização" | "Fax")[];

	connectivity: {
		wifi?: boolean;
		bluetooth?: boolean;
		ethernet?: boolean;
		usb?: boolean;
		nfc?: boolean;
		mobileConnections?: string[]; // Wi-Fi Direct, AirPrint, Mopria
		usbType?: string; // USB 2.0, USB 3.0
		ethernetSpeed?: string; // 10/100 Mbps, Gigabit
	};

	printing: {
		maxResolutionBlackWhite?: string; // dpi
		maxResolutionColor?: string; // dpi
		maxSpeedBlackWhite?: number; // ppm (páginas por minuto)
		maxSpeedColor?: number; // ppm
		firstPageOut?: string; // tempo em segundos
		duplexPrinting?: "Automático" | "Manual" | "Não";
		monthlyCycle?: number; // páginas por mês
		recommendedVolume?: string; // páginas por mês
		languages?: string[]; // PCL, PostScript, PDF
	};

	paper: {
		types?: string[]; // A4, Carta, Legal, Fotográfico, Envelope
		sizes?: string[]; // A4, A5, A6, Carta, Ofício
		maxCapacity: number; // folhas
		trays: number;
		maxWeight?: number; // g/m²
		minWeight?: number; // g/m²
		customSizes?: boolean;
		borderlessPrinting?: boolean;
	};

	scanner?: {
		type?: "Flatbed" | "ADF" | "Duplex ADF" | "Flatbed + ADF";
		maxResolution?: string; // dpi
		scanSpeed?: string; // páginas por minuto
		adfCapacity?: number; // folhas
		scanArea?: string; // dimensões
		fileFormats?: string[]; // PDF, JPEG, TIFF, PNG
		colorDepth?: string; // bits
		duplexScanning?: boolean;
	};

	copier?: {
		maxCopies?: number;
		copySpeed?: string; // cpm (cópias por minuto)
		reduction?: string; // percentual
		enlargement?: string; // percentual
		idCopy?: boolean;
	};

	fax?: {
		speed?: string;
		memory?: string;
		resolution?: string;
		autoRedialing?: boolean;
		speedDial?: number;
	};

	ink: {
		cartridges: number;
		cartridgeType?: "Cartucho" | "Tanque de tinta" | "Toner";
		colors?: string[]; // Preto, Ciano, Magenta, Amarelo
		cartridgeYield?: {
			black?: string; // páginas
			color?: string; // páginas
		};
		tankSystem?: boolean;
		inkBottles?: string[];
	};

	display?: {
		hasDisplay: boolean;
		type?: "LCD" | "LED" | "Touchscreen" | "OLED";
		size?: string; // polegadas
		color?: boolean;
		touchscreen?: boolean;
		resolution?: string;
	};

	specifications: {
		portable?: boolean;
		processorSpeed?: string;
		memory?: string; // RAM
		storage?: string; // Memória interna
		energyEfficiency?: string; // A, B, C, etc.
		operatingSystem?: string;
		supportedOS?: string[]; // Windows, macOS, Linux, Android, iOS
	};

	power: {
		voltage?: string; // 110V, 220V, Bivolt
		powerConsumption?: string; // Watts
		standbyPower?: string; // Watts
		sleepMode?: boolean;
		autoShutoff?: boolean;
	};

	dimensions?: {
		height: string;
		width: string;
		depth: string;
		weight?: string;
	};

	environmental?: {
		energyStar?: boolean;
		ecoMode?: boolean;
		recyclable?: boolean;
		certifications?: string[]; // Energy Star, Blue Angel, EPEAT
	};

	security?: {
		passwordProtection?: boolean;
		encryption?: string[];
		secureErase?: boolean;
		pinPrinting?: boolean;
	};

	features: {
		cloudPrinting?: boolean;
		mobilePrinting?: boolean;
		automaticDocumentFeeder?: boolean;
		adfCapacity?: number;
		twoSidedId?: boolean;
		voiceActivated?: boolean;
		smartTasks?: boolean;
		colorDisplay?: boolean;
		quietMode?: boolean;
	};

	software?: {
		included?: string[];
		compatible?: string[];
		driverSupport?: string[];
		mobileApps?: string[];
	};

	bundled?: {
		cables?: string[];
		cartridges?: string[];
		software?: string[];
		accessories?: string[];
	};

	warranty?: {
		period: string;
		type?: string;
		support?: string;
	};

	ratings: {
		costBenefit: number | null;
		printQuality: number;
		speed: number;
		connectivity: number;
		reliability: number;
		features: number;
		costPerPage: number;
	};
}

export const impressoraSpecs: SpecSection[] = [
	{
		id: "ratings",
		title: "Notas",
		specs: [
			{
				key: "costBenefit",
				label: "Custo-benefício",
				getValue: (p) => getImpressora(p)?.ratings.costBenefit ?? null,
				type: "rating",
			},
			{
				key: "printQuality",
				label: "Qualidade de Impressão",
				getValue: (p) => getImpressora(p)?.ratings.printQuality ?? null,
				type: "rating",
			},
			{
				key: "speed",
				label: "Velocidade",
				getValue: (p) => getImpressora(p)?.ratings.speed ?? null,
				type: "rating",
			},
			{
				key: "connectivity",
				label: "Conectividade",
				getValue: (p) => getImpressora(p)?.ratings.connectivity ?? null,
				type: "rating",
			},
			{
				key: "reliability",
				label: "Confiabilidade",
				getValue: (p) => getImpressora(p)?.ratings.reliability ?? null,
				type: "rating",
			},
			{
				key: "features",
				label: "Recursos",
				getValue: (p) => getImpressora(p)?.ratings.features ?? null,
				type: "rating",
			},
			{
				key: "costPerPage",
				label: "Custo por Página",
				getValue: (p) => getImpressora(p)?.ratings.costPerPage ?? null,
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
				key: "line",
				label: "Linha",
				getValue: (p) => p.line ?? "-",
				type: "text",
			},
			{
				key: "model",
				label: "Modelo",
				getValue: (p) => p.model ?? "-",
				type: "text",
			},
			{
				key: "alphanumericModel",
				label: "Modelo Alfanumérico",
				getValue: (p) => p.alphanumericModel ?? "-",
				type: "text",
			},
			{
				key: "manufacturer",
				label: "Fabricante",
				getValue: (p) => getImpressora(p)?.manufacturer ?? "-",
				type: "text",
			},
			{
				key: "type",
				label: "Tipo de Impressora",
				getValue: (p) => getImpressora(p)?.type ?? "-",
				type: "text",
			},
			{
				key: "printingTechnology",
				label: "Tecnologia de Impressão",
				getValue: (p) => getImpressora(p)?.printingTechnology ?? "-",
				type: "text",
			},
			{
				key: "printType",
				label: "Tipo de Impressão",
				getValue: (p) => getImpressora(p)?.printType ?? "-",
				type: "text",
			},
			{
				key: "functions",
				label: "Funções",
				getValue: (p) => getImpressora(p)?.functions?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "releaseDate",
				label: "Lançamento",
				getValue: (p) => p.releaseDate ?? "-",
				type: "text",
			},
			{
				key: "releaseYear",
				label: "Ano",
				getValue: (p) => p.releaseYear?.toString() ?? "-",
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
				getValue: (p) => getImpressora(p)?.connectivity.wifi ?? false,
				type: "boolean",
			},
			{
				key: "bluetooth",
				label: "Bluetooth",
				getValue: (p) => getImpressora(p)?.connectivity.bluetooth ?? false,
				type: "boolean",
			},
			{
				key: "ethernet",
				label: "Ethernet",
				getValue: (p) => getImpressora(p)?.connectivity.ethernet ?? false,
				type: "boolean",
			},
			{
				key: "usb",
				label: "USB",
				getValue: (p) => getImpressora(p)?.connectivity.usb ?? false,
				type: "boolean",
			},
			{
				key: "nfc",
				label: "NFC",
				getValue: (p) => getImpressora(p)?.connectivity.nfc ?? false,
				type: "boolean",
			},
			{
				key: "mobileConnections",
				label: "Conexões Móveis",
				getValue: (p) => getImpressora(p)?.connectivity.mobileConnections?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "usbType",
				label: "Tipo USB",
				getValue: (p) => getImpressora(p)?.connectivity.usbType ?? "-",
				type: "text",
			},
			{
				key: "ethernetSpeed",
				label: "Velocidade Ethernet",
				getValue: (p) => getImpressora(p)?.connectivity.ethernetSpeed ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "printing",
		title: "Impressão",
		specs: [
			{
				key: "maxResolutionBlackWhite",
				label: "Resolução Máxima P&B",
				getValue: (p) => getImpressora(p)?.printing.maxResolutionBlackWhite ?? "-",
				type: "text",
			},
			{
				key: "maxResolutionColor",
				label: "Resolução Máxima Colorida",
				getValue: (p) => getImpressora(p)?.printing.maxResolutionColor ?? "-",
				type: "text",
			},
			{
				key: "maxSpeedBlackWhite",
				label: "Velocidade Máxima P&B (ppm)",
				getValue: (p) => getImpressora(p)?.printing.maxSpeedBlackWhite?.toString() ?? "-",
				type: "text",
			},
			{
				key: "maxSpeedColor",
				label: "Velocidade Máxima Cor (ppm)",
				getValue: (p) => getImpressora(p)?.printing.maxSpeedColor?.toString() ?? "-",
				type: "text",
			},
			{
				key: "firstPageOut",
				label: "Primeira Página",
				getValue: (p) => getImpressora(p)?.printing.firstPageOut ?? "-",
				type: "text",
			},
			{
				key: "duplexPrinting",
				label: "Impressão Duplex",
				getValue: (p) => getImpressora(p)?.printing.duplexPrinting ?? "-",
				type: "text",
			},
			{
				key: "monthlyCycle",
				label: "Ciclo Mensal (páginas)",
				getValue: (p) => getImpressora(p)?.printing.monthlyCycle?.toString() ?? "-",
				type: "text",
			},
			{
				key: "recommendedVolume",
				label: "Volume Recomendado",
				getValue: (p) => getImpressora(p)?.printing.recommendedVolume ?? "-",
				type: "text",
			},
			{
				key: "languages",
				label: "Linguagens de Impressão",
				getValue: (p) => getImpressora(p)?.printing.languages?.join(", ") ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "paper",
		title: "Papel",
		specs: [
			{
				key: "paperTypes",
				label: "Tipos de Papel",
				getValue: (p) => getImpressora(p)?.paper.types?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "paperSizes",
				label: "Tamanhos de Papel",
				getValue: (p) => getImpressora(p)?.paper.sizes?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "maxCapacity",
				label: "Capacidade Máxima (folhas)",
				getValue: (p) => getImpressora(p)?.paper.maxCapacity?.toString() ?? "-",
				type: "text",
			},
			{
				key: "trays",
				label: "Quantidade de Bandejas",
				getValue: (p) => getImpressora(p)?.paper.trays?.toString() ?? "-",
				type: "text",
			},
			{
				key: "maxWeight",
				label: "Gramatura Máxima (g/m²)",
				getValue: (p) => getImpressora(p)?.paper.maxWeight?.toString() ?? "-",
				type: "text",
			},
			{
				key: "minWeight",
				label: "Gramatura Mínima (g/m²)",
				getValue: (p) => getImpressora(p)?.paper.minWeight?.toString() ?? "-",
				type: "text",
			},
			{
				key: "customSizes",
				label: "Tamanhos Personalizados",
				getValue: (p) => getImpressora(p)?.paper.customSizes ?? false,
				type: "boolean",
			},
			{
				key: "borderlessPrinting",
				label: "Impressão sem Bordas",
				getValue: (p) => getImpressora(p)?.paper.borderlessPrinting ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "scanner",
		title: "Scanner",
		specs: [
			{
				key: "scannerType",
				label: "Tipo de Scanner",
				getValue: (p) => getImpressora(p)?.scanner?.type ?? "-",
				type: "text",
			},
			{
				key: "scannerResolution",
				label: "Resolução Máxima",
				getValue: (p) => getImpressora(p)?.scanner?.maxResolution ?? "-",
				type: "text",
			},
			{
				key: "scanSpeed",
				label: "Velocidade de Digitalização",
				getValue: (p) => getImpressora(p)?.scanner?.scanSpeed ?? "-",
				type: "text",
			},
			{
				key: "adfCapacity",
				label: "Capacidade ADF (folhas)",
				getValue: (p) => getImpressora(p)?.scanner?.adfCapacity?.toString() ?? "-",
				type: "text",
			},
			{
				key: "scanArea",
				label: "Área de Digitalização",
				getValue: (p) => getImpressora(p)?.scanner?.scanArea ?? "-",
				type: "text",
			},
			{
				key: "fileFormats",
				label: "Formatos de Arquivo",
				getValue: (p) => getImpressora(p)?.scanner?.fileFormats?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "colorDepth",
				label: "Profundidade de Cor",
				getValue: (p) => getImpressora(p)?.scanner?.colorDepth ?? "-",
				type: "text",
			},
			{
				key: "duplexScanning",
				label: "Digitalização Duplex",
				getValue: (p) => getImpressora(p)?.scanner?.duplexScanning ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "copier",
		title: "Copiadora",
		specs: [
			{
				key: "maxCopies",
				label: "Número Máximo de Cópias",
				getValue: (p) => getImpressora(p)?.copier?.maxCopies?.toString() ?? "-",
				type: "text",
			},
			{
				key: "copySpeed",
				label: "Velocidade de Cópia",
				getValue: (p) => getImpressora(p)?.copier?.copySpeed ?? "-",
				type: "text",
			},
			{
				key: "reduction",
				label: "Redução",
				getValue: (p) => getImpressora(p)?.copier?.reduction ?? "-",
				type: "text",
			},
			{
				key: "enlargement",
				label: "Ampliação",
				getValue: (p) => getImpressora(p)?.copier?.enlargement ?? "-",
				type: "text",
			},
			{
				key: "idCopy",
				label: "Cópia de ID",
				getValue: (p) => getImpressora(p)?.copier?.idCopy ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "fax",
		title: "Fax",
		specs: [
			{
				key: "faxSpeed",
				label: "Velocidade",
				getValue: (p) => getImpressora(p)?.fax?.speed ?? "-",
				type: "text",
			},
			{
				key: "faxMemory",
				label: "Memória",
				getValue: (p) => getImpressora(p)?.fax?.memory ?? "-",
				type: "text",
			},
			{
				key: "faxResolution",
				label: "Resolução",
				getValue: (p) => getImpressora(p)?.fax?.resolution ?? "-",
				type: "text",
			},
			{
				key: "autoRedialing",
				label: "Rediscagem Automática",
				getValue: (p) => getImpressora(p)?.fax?.autoRedialing ?? false,
				type: "boolean",
			},
			{
				key: "speedDial",
				label: "Discagem Rápida",
				getValue: (p) => getImpressora(p)?.fax?.speedDial?.toString() ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "ink",
		title: "Tinta/Toner",
		specs: [
			{
				key: "cartridges",
				label: "Quantidade de Cartuchos",
				getValue: (p) => getImpressora(p)?.ink.cartridges?.toString() ?? "-",
				type: "text",
			},
			{
				key: "cartridgeType",
				label: "Tipo de Cartucho",
				getValue: (p) => getImpressora(p)?.ink.cartridgeType ?? "-",
				type: "text",
			},
			{
				key: "colors",
				label: "Cores",
				getValue: (p) => getImpressora(p)?.ink.colors?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "cartridgeYieldBlack",
				label: "Rendimento Preto",
				getValue: (p) => getImpressora(p)?.ink.cartridgeYield?.black ?? "-",
				type: "text",
			},
			{
				key: "cartridgeYieldColor",
				label: "Rendimento Colorido",
				getValue: (p) => getImpressora(p)?.ink.cartridgeYield?.color ?? "-",
				type: "text",
			},
			{
				key: "tankSystem",
				label: "Sistema de Tanque",
				getValue: (p) => getImpressora(p)?.ink.tankSystem ?? false,
				type: "boolean",
			},
			{
				key: "inkBottles",
				label: "Frascos de Tinta",
				getValue: (p) => getImpressora(p)?.ink.inkBottles?.join(", ") ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "display",
		title: "Display",
		specs: [
			{
				key: "hasDisplay",
				label: "Possui Display",
				getValue: (p) => getImpressora(p)?.display?.hasDisplay ?? false,
				type: "boolean",
			},
			{
				key: "displayType",
				label: "Tipo de Tela",
				getValue: (p) => getImpressora(p)?.display?.type ?? "-",
				type: "text",
			},
			{
				key: "displaySize",
				label: "Tamanho da Tela",
				getValue: (p) => getImpressora(p)?.display?.size ?? "-",
				type: "text",
			},
			{
				key: "colorDisplay",
				label: "Tela Colorida",
				getValue: (p) => getImpressora(p)?.display?.color ?? false,
				type: "boolean",
			},
			{
				key: "touchscreen",
				label: "Touchscreen",
				getValue: (p) => getImpressora(p)?.display?.touchscreen ?? false,
				type: "boolean",
			},
			{
				key: "displayResolution",
				label: "Resolução da Tela",
				getValue: (p) => getImpressora(p)?.display?.resolution ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "specifications",
		title: "Especificações Técnicas",
		specs: [
			{
				key: "portable",
				label: "Portátil",
				getValue: (p) => getImpressora(p)?.specifications.portable ?? false,
				type: "boolean",
			},
			{
				key: "processorSpeed",
				label: "Velocidade do Processador",
				getValue: (p) => getImpressora(p)?.specifications.processorSpeed ?? "-",
				type: "text",
			},
			{
				key: "memory",
				label: "Memória RAM",
				getValue: (p) => getImpressora(p)?.specifications.memory ?? "-",
				type: "text",
			},
			{
				key: "storage",
				label: "Armazenamento",
				getValue: (p) => getImpressora(p)?.specifications.storage ?? "-",
				type: "text",
			},
			{
				key: "energyEfficiency",
				label: "Eficiência Energética",
				getValue: (p) => getImpressora(p)?.specifications.energyEfficiency ?? "-",
				type: "text",
			},
			{
				key: "operatingSystem",
				label: "Sistema Operacional",
				getValue: (p) => getImpressora(p)?.specifications.operatingSystem ?? "-",
				type: "text",
			},
			{
				key: "supportedOS",
				label: "Sistemas Compatíveis",
				getValue: (p) => getImpressora(p)?.specifications.supportedOS?.join(", ") ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "power",
		title: "Energia",
		specs: [
			{
				key: "voltage",
				label: "Voltagem",
				getValue: (p) => getImpressora(p)?.power.voltage ?? "-",
				type: "text",
			},
			{
				key: "powerConsumption",
				label: "Consumo de Energia",
				getValue: (p) => getImpressora(p)?.power.powerConsumption ?? "-",
				type: "text",
			},
			{
				key: "standbyPower",
				label: "Consumo em Standby",
				getValue: (p) => getImpressora(p)?.power.standbyPower ?? "-",
				type: "text",
			},
			{
				key: "sleepMode",
				label: "Modo Sleep",
				getValue: (p) => getImpressora(p)?.power.sleepMode ?? false,
				type: "boolean",
			},
			{
				key: "autoShutoff",
				label: "Desligamento Automático",
				getValue: (p) => getImpressora(p)?.power.autoShutoff ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "features",
		title: "Recursos",
		specs: [
			{
				key: "cloudPrinting",
				label: "Impressão na Nuvem",
				getValue: (p) => getImpressora(p)?.features.cloudPrinting ?? false,
				type: "boolean",
			},
			{
				key: "mobilePrinting",
				label: "Impressão Móvel",
				getValue: (p) => getImpressora(p)?.features.mobilePrinting ?? false,
				type: "boolean",
			},
			{
				key: "automaticDocumentFeeder",
				label: "Alimentador Automático",
				getValue: (p) => getImpressora(p)?.features.automaticDocumentFeeder ?? false,
				type: "boolean",
			},
			{
				key: "adfCapacityFeature",
				label: "Capacidade do ADF",
				getValue: (p) => getImpressora(p)?.features.adfCapacity?.toString() ?? "-",
				type: "text",
			},
			{
				key: "twoSidedId",
				label: "Cópia de ID em 2 Lados",
				getValue: (p) => getImpressora(p)?.features.twoSidedId ?? false,
				type: "boolean",
			},
			{
				key: "voiceActivated",
				label: "Ativação por Voz",
				getValue: (p) => getImpressora(p)?.features.voiceActivated ?? false,
				type: "boolean",
			},
			{
				key: "smartTasks",
				label: "Tarefas Inteligentes",
				getValue: (p) => getImpressora(p)?.features.smartTasks ?? false,
				type: "boolean",
			},
			{
				key: "quietMode",
				label: "Modo Silencioso",
				getValue: (p) => getImpressora(p)?.features.quietMode ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "environmental",
		title: "Sustentabilidade",
		specs: [
			{
				key: "energyStar",
				label: "Energy Star",
				getValue: (p) => getImpressora(p)?.environmental?.energyStar ?? false,
				type: "boolean",
			},
			{
				key: "ecoMode",
				label: "Modo Econômico",
				getValue: (p) => getImpressora(p)?.environmental?.ecoMode ?? false,
				type: "boolean",
			},
			{
				key: "recyclable",
				label: "Reciclável",
				getValue: (p) => getImpressora(p)?.environmental?.recyclable ?? false,
				type: "boolean",
			},
			{
				key: "certifications",
				label: "Certificações",
				getValue: (p) => getImpressora(p)?.environmental?.certifications?.join(", ") ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "security",
		title: "Segurança",
		specs: [
			{
				key: "passwordProtection",
				label: "Proteção por Senha",
				getValue: (p) => getImpressora(p)?.security?.passwordProtection ?? false,
				type: "boolean",
			},
			{
				key: "encryption",
				label: "Criptografia",
				getValue: (p) => getImpressora(p)?.security?.encryption?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "secureErase",
				label: "Apagamento Seguro",
				getValue: (p) => getImpressora(p)?.security?.secureErase ?? false,
				type: "boolean",
			},
			{
				key: "pinPrinting",
				label: "Impressão com PIN",
				getValue: (p) => getImpressora(p)?.security?.pinPrinting ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "software",
		title: "Software",
		specs: [
			{
				key: "softwareIncluded",
				label: "Software Incluído",
				getValue: (p) => getImpressora(p)?.software?.included?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "softwareCompatible",
				label: "Software Compatível",
				getValue: (p) => getImpressora(p)?.software?.compatible?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "driverSupport",
				label: "Suporte de Drivers",
				getValue: (p) => getImpressora(p)?.software?.driverSupport?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "mobileApps",
				label: "Aplicativos Móveis",
				getValue: (p) => getImpressora(p)?.software?.mobileApps?.join(", ") ?? "-",
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
				getValue: (p) => getImpressora(p)?.dimensions?.height ?? "-",
				type: "text",
			},
			{
				key: "width",
				label: "Largura",
				getValue: (p) => getImpressora(p)?.dimensions?.width ?? "-",
				type: "text",
			},
			{
				key: "depth",
				label: "Profundidade",
				getValue: (p) => getImpressora(p)?.dimensions?.depth ?? "-",
				type: "text",
			},
			{
				key: "weight",
				label: "Peso",
				getValue: (p) => getImpressora(p)?.dimensions?.weight ?? "-",
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
				getValue: (p) => getImpressora(p)?.warranty?.period ?? "-",
				type: "text",
			},
			{
				key: "warrantyType",
				label: "Tipo",
				getValue: (p) => getImpressora(p)?.warranty?.type ?? "-",
				type: "text",
			},
			{
				key: "support",
				label: "Suporte",
				getValue: (p) => getImpressora(p)?.warranty?.support ?? "-",
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
				getValue: (p) => getImpressora(p)?.bundled?.cables?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "cartridges",
				label: "Cartuchos",
				getValue: (p) => getImpressora(p)?.bundled?.cartridges?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "software",
				label: "Software",
				getValue: (p) => getImpressora(p)?.bundled?.software?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "accessories",
				label: "Acessórios",
				getValue: (p) => getImpressora(p)?.bundled?.accessories?.join(", ") ?? "-",
				type: "text",
			},
		],
	},
];
