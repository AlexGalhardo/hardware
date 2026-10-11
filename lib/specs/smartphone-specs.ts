import { SpecSection } from "../spec-configs";
import { BaseProduct, Product } from "../types";

function isSmartphone(product: Product): product is Smartphone {
	return product.category === "smartphones";
}

function getSmartphone(p: Product): SmartphoneSpecs | null {
	return isSmartphone(p) ? p.specs : null;
}

export interface Smartphone extends BaseProduct {
	category: "smartphones";
	specs: SmartphoneSpecs;
}

export interface SmartphoneSpecs {
	display: {
		size: string;
		resolution: string;
		resolutionType?: string;
		type: string;
		screenType?: string;
		refreshRate?: string;
		ppi?: number;
		maxBrightness?: string;
		touchscreen: boolean;
		foldable?: boolean;
		secondaryTouchscreen?: boolean;
		screenRatio?: string;
	};
	processor: string;
	processorSpeed?: string;
	processorCores?: number;
	cpuModels?: string;
	chipset: string;
	gpu: string;
	gpuSpeed?: string;
	ram: string;
	storage: string;
	memoryCardSlot?: boolean;
	battery: {
		capacity: string;
		type: string;
		fastCharging: boolean;
		wirelessCharging?: boolean;
		removable?: boolean;
		batteryTalkTime?: string;
	};
	camera: {
		main: string;
		mainCameras?: string[];
		mainAperture?: string | string[];
		mainTypes?: string[];
		mainQuantity?: number;
		front: string;
		frontCameras?: string[];
		frontAperture?: string;
		frontTypes?: string[];
		frontQuantity?: number;
		videoResolutionRear?: string;
		videoResolutionFront?: string;
		opticalZoom?: string;
		digitalZoom?: string;
		features?: string[];
		frontFlash?: boolean;
		wideAngleResolution?: string;
	};
	os: string;
	osVersion?: string;
	osLatestVersion?: string;
	osEdition?: string;
	osCustomLayer?: string;
	latestCustomLayer?: string;
	dimensions: string;
	weight: string;
	waterResistance: boolean;
	ipRating?: string;
	splashResistant?: boolean;
	dustResistant?: boolean;
	dropResistant?: boolean;
	waterproof?: boolean;
	simCard: string;
	dualSim: boolean;
	simSlots?: number;
	esimSupport?: boolean;
	esimQuantity?: number;
	simCardSizes?: string[];
	network: {
		gsm?: string;
		hspa?: boolean;
		lte?: boolean;
		fiveG: boolean;
	};
	connectivity: {
		usb: string;
		usbConnector?: boolean;
		jackConnector?: boolean;
		nfc: boolean;
		gps: string;
		wifi: boolean;
		bluetooth: boolean;
		miniHdmi?: boolean;
		radio?: boolean;
		tvTuner?: boolean;
	};
	sensors: {
		accelerometer: boolean;
		proximity: boolean;
		gyroscope: boolean;
		compass: boolean;
		barometer: boolean;
		fingerprint: boolean;
		facialRecognition?: boolean;
		irisRecognition?: boolean;
		heartRate?: boolean;
		noiseCancellation?: boolean;
	};
	features: {
		fmRadio?: boolean;
		tv?: boolean;
		vibration?: boolean;
		speakerphone?: boolean;
		wifiDirect?: boolean;
		wifiHotspot?: boolean;
		usbOtg?: boolean;
		qwertyKeyboard?: boolean;
		sosButton?: boolean;
		gamingPhone?: boolean;
		ruggedPhone?: boolean;
		includesPen?: boolean;
	};
	ratings: {
		costBenefit: number | null;
		hardware: number;
		display: number;
		camera: number;
		performance: number;
	};
	versions?: string[];
	manufacturer?: string;
}

export const smartphoneSpecs: SpecSection[] = [
	{
		id: "ratings",
		title: "Notas",
		specs: [
			{
				key: "costBenefit",
				label: "Custo-benefício",
				getValue: (p) => getSmartphone(p)?.ratings.costBenefit ?? null,
				type: "rating",
			},
			{
				key: "hardware",
				label: "Hardware",
				getValue: (p) => getSmartphone(p)?.ratings.hardware ?? null,
				type: "rating",
			},
			{
				key: "display",
				label: "Tela",
				getValue: (p) => getSmartphone(p)?.ratings.display ?? null,
				type: "rating",
			},
			{
				key: "camera",
				label: "Câmera",
				getValue: (p) => getSmartphone(p)?.ratings.camera ?? null,
				type: "rating",
			},
			{
				key: "performance",
				label: "Desempenho",
				getValue: (p) => getSmartphone(p)?.ratings.performance ?? null,
				type: "rating",
			},
		],
	},

	{
		id: "general",
		title: "Geral",
		specs: [
			{ key: "brand", label: "Marca", getValue: (p) => p.brand ?? "-", type: "text" },
			{ key: "line", label: "Linha", getValue: (p) => p.line ?? "-", type: "text" },
			{ key: "model", label: "Modelo", getValue: (p) => p.model ?? "-", type: "text" },
			{ key: "detailedModel", label: "Modelo Detalhado", getValue: (p) => p.detailedModel ?? "-", type: "text" },
			{ key: "color", label: "Cor", getValue: (p) => p.color ?? "-", type: "text" },
			{ key: "releaseDate", label: "Disponibilidade", getValue: (p) => p.releaseDate ?? "-", type: "text" },
			{ key: "releaseYear", label: "Ano", getValue: (p) => p.releaseYear?.toString() ?? "-", type: "text" },
			{ key: "origin", label: "Origem", getValue: (p) => p.origin ?? "-", type: "text" },
			{
				key: "manufacturer",
				label: "Fabricante",
				getValue: (p) => getSmartphone(p)?.manufacturer ?? "-",
				type: "text",
			},
			{ key: "anatelNumber", label: "Anatel", getValue: (p) => p.anatelNumber ?? "-", type: "text" },
			{ key: "os", label: "SO", getValue: (p) => getSmartphone(p)?.os ?? "-", type: "text" },
			{ key: "osVersion", label: "Versão", getValue: (p) => getSmartphone(p)?.osVersion ?? "-", type: "text" },
			{
				key: "osLatestVersion",
				label: "Última Versão",
				getValue: (p) => getSmartphone(p)?.osLatestVersion ?? "-",
				type: "text",
			},
			{
				key: "osCustomLayer",
				label: "Interface",
				getValue: (p) => getSmartphone(p)?.osCustomLayer ?? "-",
				type: "text",
			},
			{
				key: "versions",
				label: "Versões",
				getValue: (p) => getSmartphone(p)?.versions?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "dimensions",
				label: "Dimensões",
				getValue: (p) => getSmartphone(p)?.dimensions ?? "-",
				type: "text",
			},
			{ key: "weight", label: "Peso", getValue: (p) => getSmartphone(p)?.weight ?? "-", type: "text" },
			{
				key: "waterResistance",
				label: "Resistente à água",
				getValue: (p) => getSmartphone(p)?.waterResistance ?? false,
				type: "boolean",
			},
			{ key: "ipRating", label: "IP", getValue: (p) => getSmartphone(p)?.ipRating ?? "-", type: "text" },
		],
	},

	{
		id: "hardware",
		title: "Hardware",
		specs: [
			{
				key: "processor",
				label: "Processador",
				getValue: (p) => getSmartphone(p)?.processor ?? "-",
				type: "text",
			},
			{
				key: "processorSpeed",
				label: "Clock",
				getValue: (p) => getSmartphone(p)?.processorSpeed ?? "-",
				type: "text",
			},
			{
				key: "processorCores",
				label: "Núcleos",
				getValue: (p) => getSmartphone(p)?.processorCores?.toString() ?? "-",
				type: "text",
			},
			{ key: "chipset", label: "Chipset", getValue: (p) => getSmartphone(p)?.chipset ?? "-", type: "text" },
			{ key: "gpu", label: "GPU", getValue: (p) => getSmartphone(p)?.gpu ?? "-", type: "text" },
			{ key: "ram", label: "RAM", getValue: (p) => getSmartphone(p)?.ram ?? "-", type: "text" },
			{ key: "storage", label: "Armazenamento", getValue: (p) => getSmartphone(p)?.storage ?? "-", type: "text" },
			{
				key: "memoryCardSlot",
				label: "MicroSD",
				getValue: (p) => getSmartphone(p)?.memoryCardSlot ?? false,
				type: "boolean",
			},
		],
	},

	{
		id: "display",
		title: "Tela",
		specs: [
			{ key: "size", label: "Tamanho", getValue: (p) => getSmartphone(p)?.display.size ?? "-", type: "text" },
			{
				key: "resolution",
				label: "Resolução",
				getValue: (p) => getSmartphone(p)?.display.resolution ?? "-",
				type: "text",
			},
			{
				key: "resolutionType",
				label: "Tipo",
				getValue: (p) => getSmartphone(p)?.display.resolutionType ?? "-",
				type: "text",
			},
			{ key: "type", label: "Tecnologia", getValue: (p) => getSmartphone(p)?.display.type ?? "-", type: "text" },
			{
				key: "refreshRate",
				label: "Hz",
				getValue: (p) => getSmartphone(p)?.display.refreshRate ?? "-",
				type: "text",
			},
			{
				key: "ppi",
				label: "PPI",
				getValue: (p) => getSmartphone(p)?.display.ppi?.toString() ?? "-",
				type: "text",
			},
			{
				key: "touchscreen",
				label: "Touch",
				getValue: (p) => getSmartphone(p)?.display.touchscreen ?? false,
				type: "boolean",
			},
		],
	},

	{
		id: "camera",
		title: "Câmeras",
		specs: [
			{ key: "main", label: "Principal", getValue: (p) => getSmartphone(p)?.camera.main ?? "-", type: "text" },
			{
				key: "mainCameras",
				label: "Traseiras",
				getValue: (p) => getSmartphone(p)?.camera.mainCameras?.join(", ") ?? "-",
				type: "text",
			},
			{ key: "front", label: "Frontal", getValue: (p) => getSmartphone(p)?.camera.front ?? "-", type: "text" },
			{
				key: "videoResolutionRear",
				label: "Vídeo Traseiro",
				getValue: (p) => getSmartphone(p)?.camera.videoResolutionRear ?? "-",
				type: "text",
			},
			{
				key: "videoResolutionFront",
				label: "Vídeo Frontal",
				getValue: (p) => getSmartphone(p)?.camera.videoResolutionFront ?? "-",
				type: "text",
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
				getValue: (p) => getSmartphone(p)?.battery.capacity ?? "-",
				type: "text",
			},
			{
				key: "fastCharging",
				label: "Carga Rápida",
				getValue: (p) => getSmartphone(p)?.battery.fastCharging ?? false,
				type: "boolean",
			},
			{
				key: "wirelessCharging",
				label: "Wireless",
				getValue: (p) => getSmartphone(p)?.battery.wirelessCharging ?? false,
				type: "boolean",
			},
			{
				key: "removable",
				label: "Removível",
				getValue: (p) => getSmartphone(p)?.battery.removable ?? false,
				type: "boolean",
			},
		],
	},

	{
		id: "connectivity",
		title: "Conectividade",
		specs: [
			{ key: "usb", label: "USB", getValue: (p) => getSmartphone(p)?.connectivity.usb ?? "-", type: "text" },
			{ key: "nfc", label: "NFC", getValue: (p) => getSmartphone(p)?.connectivity.nfc ?? false, type: "boolean" },
			{
				key: "wifi",
				label: "Wi-Fi",
				getValue: (p) => getSmartphone(p)?.connectivity.wifi ?? false,
				type: "boolean",
			},
			{
				key: "bluetooth",
				label: "Bluetooth",
				getValue: (p) => getSmartphone(p)?.connectivity.bluetooth ?? false,
				type: "boolean",
			},
			{ key: "fiveG", label: "5G", getValue: (p) => getSmartphone(p)?.network.fiveG ?? false, type: "boolean" },
		],
	},
];
