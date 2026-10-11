import { SpecSection } from "../spec-configs";
import { BaseProduct, Product } from "../types";

function isCameraDeSeguranca(product: Product): product is CameraDeSeguranca {
	return product.category === "cameras-de-seguranca";
}

export interface CameraDeSeguranca extends BaseProduct {
	category: "cameras-de-seguranca";
	specs: CameraDeSegurancaSpecs;
}

function getCameraDeSeguranca(p: Product): CameraDeSegurancaSpecs | null {
	return isCameraDeSeguranca(p) ? p.specs : null;
}

export interface CameraDeSegurancaSpecs {
	type: "Interna" | "Externa" | "Dome" | "Bullet" | "PTZ";
	resolution: string;
	videoQuality: {
		maxResolution: string;
		fps: number;
		hdr?: boolean;
		nightVision?: boolean;
		nightVisionRange?: string;
	};
	lens: {
		type?: string;
		focalLength?: string;
		aperture?: string;
		viewingAngle: string;
		zoom?: string;
	};
	sensor: {
		type?: string;
		size?: string;
		megapixels: number;
	};
	connectivity: {
		wifi?: boolean;
		wifiStandards?: string[];
		ethernet?: boolean;
		bluetooth?: boolean;
		cellular?: boolean;
	};
	storage: {
		internal?: string;
		sdCard?: boolean;
		maxSdCard?: string;
		cloud?: boolean;
		nvr?: boolean;
	};
	audio: {
		microphone?: boolean;
		speaker?: boolean;
		twoWayAudio?: boolean;
	};
	power: {
		type: string;
		poe?: boolean;
		battery?: boolean;
		batteryLife?: string;
		voltage?: string;
	};
	features: {
		motionDetection?: boolean;
		personDetection?: boolean;
		faceRecognition?: boolean;
		soundDetection?: boolean;
		alerts?: boolean;
		scheduling?: boolean;
		privacyMode?: boolean;
		pan?: boolean;
		tilt?: boolean;
		zoom?: boolean;
		autoTracking?: boolean;
	};
	environmental: {
		ipRating?: string;
		operatingTemp?: string;
		weatherResistant?: boolean;
	};
	app?: {
		name?: string;
		platforms?: string[];
		remoteAccess?: boolean;
	};
	dimensions?: {
		width?: string;
		height?: string;
		depth?: string;
		weight?: string;
	};
	ratings: {
		costBenefit: number | null;
		videoQuality: number;
		nightVision: number;
		easeOfUse: number;
		features: number;
	};
}

export const cameraDeSegurancaSpecs: SpecSection[] = [
	{
		id: "ratings",
		title: "Notas",
		specs: [
			{
				key: "costBenefit",
				label: "Custo-benefício",
				getValue: (p) => getCameraDeSeguranca(p)?.ratings.costBenefit ?? null,
				type: "rating",
			},
			{
				key: "videoQuality",
				label: "Qualidade de Vídeo",
				getValue: (p) => getCameraDeSeguranca(p)?.ratings.videoQuality ?? null,
				type: "rating",
			},
			{
				key: "nightVision",
				label: "Visão Noturna",
				getValue: (p) => getCameraDeSeguranca(p)?.ratings.nightVision ?? null,
				type: "rating",
			},
			{
				key: "easeOfUse",
				label: "Facilidade de Uso",
				getValue: (p) => getCameraDeSeguranca(p)?.ratings.easeOfUse ?? null,
				type: "rating",
			},
			{
				key: "features",
				label: "Recursos",
				getValue: (p) => getCameraDeSeguranca(p)?.ratings.features ?? null,
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
			{ key: "type", label: "Tipo", getValue: (p) => getCameraDeSeguranca(p)?.type ?? "-", type: "text" },
			{ key: "releaseDate", label: "Lançamento", getValue: (p) => p.releaseDate ?? "-", type: "text" },
			{ key: "releaseYear", label: "Ano", getValue: (p) => p.releaseYear?.toString() ?? "-", type: "text" },
		],
	},
	{
		id: "video",
		title: "Vídeo",
		specs: [
			{
				key: "resolution",
				label: "Resolução",
				getValue: (p) => getCameraDeSeguranca(p)?.resolution ?? "-",
				type: "text",
			},
			{
				key: "maxResolution",
				label: "Resolução Máxima",
				getValue: (p) => getCameraDeSeguranca(p)?.videoQuality.maxResolution ?? "-",
				type: "text",
			},
			{
				key: "fps",
				label: "FPS",
				getValue: (p) => getCameraDeSeguranca(p)?.videoQuality.fps.toString() ?? "-",
				type: "text",
			},
			{
				key: "hdr",
				label: "HDR",
				getValue: (p) => getCameraDeSeguranca(p)?.videoQuality.hdr ?? false,
				type: "boolean",
			},
			{
				key: "nightVision",
				label: "Visão Noturna",
				getValue: (p) => getCameraDeSeguranca(p)?.videoQuality.nightVision ?? false,
				type: "boolean",
			},
			{
				key: "nightVisionRange",
				label: "Alcance Visão Noturna",
				getValue: (p) => getCameraDeSeguranca(p)?.videoQuality.nightVisionRange ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "lens",
		title: "Lente",
		specs: [
			{
				key: "lensType",
				label: "Tipo",
				getValue: (p) => getCameraDeSeguranca(p)?.lens.type ?? "-",
				type: "text",
			},
			{
				key: "focalLength",
				label: "Distância Focal",
				getValue: (p) => getCameraDeSeguranca(p)?.lens.focalLength ?? "-",
				type: "text",
			},
			{
				key: "aperture",
				label: "Abertura",
				getValue: (p) => getCameraDeSeguranca(p)?.lens.aperture ?? "-",
				type: "text",
			},
			{
				key: "viewingAngle",
				label: "Ângulo de Visão",
				getValue: (p) => getCameraDeSeguranca(p)?.lens.viewingAngle ?? "-",
				type: "text",
			},
			{
				key: "zoom",
				label: "Zoom",
				getValue: (p) => getCameraDeSeguranca(p)?.lens.zoom ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "sensor",
		title: "Sensor",
		specs: [
			{
				key: "sensorType",
				label: "Tipo",
				getValue: (p) => getCameraDeSeguranca(p)?.sensor.type ?? "-",
				type: "text",
			},
			{
				key: "sensorSize",
				label: "Tamanho",
				getValue: (p) => getCameraDeSeguranca(p)?.sensor.size ?? "-",
				type: "text",
			},
			{
				key: "megapixels",
				label: "Megapixels",
				getValue: (p) => getCameraDeSeguranca(p)?.sensor.megapixels.toString() ?? "-",
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
				getValue: (p) => getCameraDeSeguranca(p)?.connectivity.wifi ?? false,
				type: "boolean",
			},
			{
				key: "wifiStandards",
				label: "Padrões Wi-Fi",
				getValue: (p) => getCameraDeSeguranca(p)?.connectivity.wifiStandards?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "ethernet",
				label: "Ethernet",
				getValue: (p) => getCameraDeSeguranca(p)?.connectivity.ethernet ?? false,
				type: "boolean",
			},
			{
				key: "bluetooth",
				label: "Bluetooth",
				getValue: (p) => getCameraDeSeguranca(p)?.connectivity.bluetooth ?? false,
				type: "boolean",
			},
			{
				key: "cellular",
				label: "Celular",
				getValue: (p) => getCameraDeSeguranca(p)?.connectivity.cellular ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "storage",
		title: "Armazenamento",
		specs: [
			{
				key: "internal",
				label: "Interno",
				getValue: (p) => getCameraDeSeguranca(p)?.storage.internal ?? "-",
				type: "text",
			},
			{
				key: "sdCard",
				label: "Cartão SD",
				getValue: (p) => getCameraDeSeguranca(p)?.storage.sdCard ?? false,
				type: "boolean",
			},
			{
				key: "maxSdCard",
				label: "SD Máximo",
				getValue: (p) => getCameraDeSeguranca(p)?.storage.maxSdCard ?? "-",
				type: "text",
			},
			{
				key: "cloud",
				label: "Nuvem",
				getValue: (p) => getCameraDeSeguranca(p)?.storage.cloud ?? false,
				type: "boolean",
			},
			{
				key: "nvr",
				label: "NVR",
				getValue: (p) => getCameraDeSeguranca(p)?.storage.nvr ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "audio",
		title: "Áudio",
		specs: [
			{
				key: "microphone",
				label: "Microfone",
				getValue: (p) => getCameraDeSeguranca(p)?.audio.microphone ?? false,
				type: "boolean",
			},
			{
				key: "speaker",
				label: "Alto-falante",
				getValue: (p) => getCameraDeSeguranca(p)?.audio.speaker ?? false,
				type: "boolean",
			},
			{
				key: "twoWayAudio",
				label: "Áudio Bidirecional",
				getValue: (p) => getCameraDeSeguranca(p)?.audio.twoWayAudio ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "power",
		title: "Energia",
		specs: [
			{
				key: "powerType",
				label: "Tipo",
				getValue: (p) => getCameraDeSeguranca(p)?.power.type ?? "-",
				type: "text",
			},
			{
				key: "poe",
				label: "PoE",
				getValue: (p) => getCameraDeSeguranca(p)?.power.poe ?? false,
				type: "boolean",
			},
			{
				key: "battery",
				label: "Bateria",
				getValue: (p) => getCameraDeSeguranca(p)?.power.battery ?? false,
				type: "boolean",
			},
			{
				key: "batteryLife",
				label: "Duração da Bateria",
				getValue: (p) => getCameraDeSeguranca(p)?.power.batteryLife ?? "-",
				type: "text",
			},
			{
				key: "voltage",
				label: "Voltagem",
				getValue: (p) => getCameraDeSeguranca(p)?.power.voltage ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "features",
		title: "Recursos",
		specs: [
			{
				key: "motionDetection",
				label: "Detecção de Movimento",
				getValue: (p) => getCameraDeSeguranca(p)?.features.motionDetection ?? false,
				type: "boolean",
			},
			{
				key: "personDetection",
				label: "Detecção de Pessoa",
				getValue: (p) => getCameraDeSeguranca(p)?.features.personDetection ?? false,
				type: "boolean",
			},
			{
				key: "faceRecognition",
				label: "Reconhecimento Facial",
				getValue: (p) => getCameraDeSeguranca(p)?.features.faceRecognition ?? false,
				type: "boolean",
			},
			{
				key: "soundDetection",
				label: "Detecção de Som",
				getValue: (p) => getCameraDeSeguranca(p)?.features.soundDetection ?? false,
				type: "boolean",
			},
			{
				key: "alerts",
				label: "Alertas",
				getValue: (p) => getCameraDeSeguranca(p)?.features.alerts ?? false,
				type: "boolean",
			},
			{
				key: "scheduling",
				label: "Agendamento",
				getValue: (p) => getCameraDeSeguranca(p)?.features.scheduling ?? false,
				type: "boolean",
			},
			{
				key: "privacyMode",
				label: "Modo Privacidade",
				getValue: (p) => getCameraDeSeguranca(p)?.features.privacyMode ?? false,
				type: "boolean",
			},
			{
				key: "pan",
				label: "Pan",
				getValue: (p) => getCameraDeSeguranca(p)?.features.pan ?? false,
				type: "boolean",
			},
			{
				key: "tilt",
				label: "Tilt",
				getValue: (p) => getCameraDeSeguranca(p)?.features.tilt ?? false,
				type: "boolean",
			},
			{
				key: "featureZoom",
				label: "Zoom",
				getValue: (p) => getCameraDeSeguranca(p)?.features.zoom ?? false,
				type: "boolean",
			},
			{
				key: "autoTracking",
				label: "Rastreamento Automático",
				getValue: (p) => getCameraDeSeguranca(p)?.features.autoTracking ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "environmental",
		title: "Ambiental",
		specs: [
			{
				key: "ipRating",
				label: "Classificação IP",
				getValue: (p) => getCameraDeSeguranca(p)?.environmental.ipRating ?? "-",
				type: "text",
			},
			{
				key: "operatingTemp",
				label: "Temperatura de Operação",
				getValue: (p) => getCameraDeSeguranca(p)?.environmental.operatingTemp ?? "-",
				type: "text",
			},
			{
				key: "weatherResistant",
				label: "Resistente ao Clima",
				getValue: (p) => getCameraDeSeguranca(p)?.environmental.weatherResistant ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "app",
		title: "Aplicativo",
		specs: [
			{
				key: "appName",
				label: "Nome",
				getValue: (p) => getCameraDeSeguranca(p)?.app?.name ?? "-",
				type: "text",
			},
			{
				key: "platforms",
				label: "Plataformas",
				getValue: (p) => getCameraDeSeguranca(p)?.app?.platforms?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "remoteAccess",
				label: "Acesso Remoto",
				getValue: (p) => getCameraDeSeguranca(p)?.app?.remoteAccess ?? false,
				type: "boolean",
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
				getValue: (p) => getCameraDeSeguranca(p)?.dimensions?.width ?? "-",
				type: "text",
			},
			{
				key: "height",
				label: "Altura",
				getValue: (p) => getCameraDeSeguranca(p)?.dimensions?.height ?? "-",
				type: "text",
			},
			{
				key: "depth",
				label: "Profundidade",
				getValue: (p) => getCameraDeSeguranca(p)?.dimensions?.depth ?? "-",
				type: "text",
			},
			{
				key: "weight",
				label: "Peso",
				getValue: (p) => getCameraDeSeguranca(p)?.dimensions?.weight ?? "-",
				type: "text",
			},
		],
	},
];
