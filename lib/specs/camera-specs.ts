import { SpecSection } from "../spec-configs";
import { BaseProduct, Product } from "../types";

function isCamera(product: Product): product is Camera {
	return product.category === "cameras";
}

function getCamera(p: Product): CameraSpecs | null {
	return isCamera(p) ? p.specs : null;
}

export interface Camera extends BaseProduct {
	category: "cameras";
	specs: CameraSpecs;
}

export interface CameraSpecs {
	type: string; // DSLR, Mirrorless, Action, Compact, Cinema, 360°
	sensor: {
		type: string; // Full Frame, APS-C, Micro Four Thirds, 1", etc
		size: string; // 35.9 x 24mm, 23.5 x 15.6mm
		resolution: string; // 24.2 MP, 45.7 MP
		megapixels: number;
		cropFactor?: string;
		iso: {
			native: string; // 100-32000
			expanded?: string; // 50-102400
			max: number;
		};
		stabilization: boolean;
		ibis?: boolean; // In-Body Image Stabilization
		stabilizationType?: string; // 5-axis, 3-axis
		dualNativeIso?: boolean;
	};
	processor: string;
	autofocus: {
		type: string; // Phase Detection, Contrast Detection, Hybrid
		points: number;
		faceDetection: boolean;
		eyeDetection: boolean;
		animalDetection?: boolean;
		tracking: boolean;
		touchFocus?: boolean;
		lowLightSensitivity?: string; // -6 EV
	};
	video: {
		maxResolution: string; // 4K, 8K, 6K
		maxFrameRate: string; // 60fps, 120fps, 240fps
		fourKFrameRates?: string[]; // ["24p", "30p", "60p", "120p"]
		fullHdFrameRates?: string[];
		slowMotion?: string;
		codec: string[]; // H.264, H.265, ProRes, ALL-I
		bitRate?: string; // 400 Mbps
		colorSampling?: string; // 4:2:2, 4:2:0
		bitDepth?: string; // 8-bit, 10-bit, 12-bit
		logProfile?: string; // S-Log3, V-Log, C-Log
		hdr?: boolean;
		timelapseBuiltIn?: boolean;
		externalRecording?: boolean;
		hdmiOutput?: string; // 4:2:2 10-bit
	};
	display: {
		type: string; // LCD, OLED, AMOLED
		size: string; // 3.2", 3.0"
		resolution: string; // 2.1M dots
		touchscreen: boolean;
		articulating: boolean; // Vari-angle, Tilting, Fixed
		articulationType?: string;
		viewfinder: boolean;
		viewfinderType?: string; // OLED, LCD
		viewfinderResolution?: string;
		viewfinderMagnification?: string;
		viewfinderCoverage?: string; // 100%
	};
	burstMode: {
		maxFps: number; // 20 fps, 30 fps
		bufferDepth?: string; // RAW, JPEG
		electronicShutter?: boolean;
		mechanicalShutter?: boolean;
		shutterSpeed: string; // 1/8000s
		bulbMode?: boolean;
	};
	lens: {
		mount: string; // E-mount, RF, Z, L, MFT
		included?: string;
		interchangeable: boolean;
		focalLength?: string; // For fixed lens cameras
		aperture?: string; // f/2.8, f/1.4-2.8
		opticalZoom?: string;
		digitalZoom?: string;
	};
	storage: {
		slots: number;
		types: string[]; // SD, CFexpress Type A, CFexpress Type B, microSD
		dualSlotRecording?: boolean;
		uhs?: string; // UHS-I, UHS-II
	};
	connectivity: {
		wifi: boolean;
		bluetooth: boolean;
		nfc?: boolean;
		usb: string; // USB-C, USB 3.2 Gen 2, micro-USB
		hdmi: boolean;
		hdmiType?: string; // micro HDMI, full HDMI
		microphone: boolean;
		microphoneType?: string; // 3.5mm jack
		headphone: boolean;
		remote?: boolean;
		ethernet?: boolean;
		timecode?: boolean;
	};
	battery: {
		type: string; // NP-FZ100, LP-E6NH
		capacity: string; // 2280 mAh
		shotsPerCharge?: number; // CIPA rating
		videoRuntime?: string;
		usbCharging: boolean;
		batteryGrip?: boolean;
	};
	build: {
		weatherSealing: boolean;
		material: string; // Magnesium alloy, Polycarbonate, Aluminum
		dimensions: string; // 126.9 x 95.1 x 73.7 mm
		weight: string; // 650g (body only)
		bodyOnly?: string; // weight
		withLens?: string; // weight
		tripodMount: boolean;
		coldShoeMount?: boolean;
		hotShoeMount?: boolean;
	};
	features: {
		rawCapture: boolean;
		rawFormat?: string; // ARW, CR3, NEF, ORF
		jpeg: boolean;
		heif?: boolean;
		bracketing?: boolean;
		hdr?: boolean;
		panorama?: boolean;
		multipleExposure?: boolean;
		intervalShooting?: boolean;
		bulbTimer?: boolean;
		gps?: boolean;
		waterproof?: boolean;
		waterproofDepth?: string; // 10m, 60m
		shockproof?: boolean;
		freezeproof?: boolean;
		dustproof?: boolean;
		builtInNdFilter?: boolean;
		ndFilterStops?: string;
		voiceControl?: boolean;
		touchscreenGestures?: boolean;
	};
	audio: {
		builtInMicrophone: boolean;
		microphoneType?: string; // Stereo, Mono
		externalMicSupport: boolean;
		windNoiseReduction?: boolean;
		audioLevels?: boolean;
		headphoneMonitoring?: boolean;
		audioFormat?: string[]; // AAC, LPCM
	};
	ratings: {
		costBenefit: number | null;
		imageQuality: number;
		videoQuality: number;
		autofocus: number;
		buildQuality: number;
		versatility: number;
	};
	targetAudience?: string; // Vlogger, Professional, Action Sports, Beginner
	manufacturer?: string;
	versions?: string[];
}

export const cameraSpecs: SpecSection[] = [
	{
		id: "ratings",
		title: "Notas",
		specs: [
			{
				key: "costBenefit",
				label: "Custo-benefício",
				getValue: (p) => getCamera(p)?.ratings.costBenefit ?? null,
				type: "rating",
			},
			{
				key: "imageQuality",
				label: "Qualidade de Imagem",
				getValue: (p) => getCamera(p)?.ratings.imageQuality ?? null,
				type: "rating",
			},
			{
				key: "videoQuality",
				label: "Qualidade de Vídeo",
				getValue: (p) => getCamera(p)?.ratings.videoQuality ?? null,
				type: "rating",
			},
			{
				key: "autofocus",
				label: "Autofoco",
				getValue: (p) => getCamera(p)?.ratings.autofocus ?? null,
				type: "rating",
			},
			{
				key: "buildQuality",
				label: "Construção",
				getValue: (p) => getCamera(p)?.ratings.buildQuality ?? null,
				type: "rating",
			},
			{
				key: "versatility",
				label: "Versatilidade",
				getValue: (p) => getCamera(p)?.ratings.versatility ?? null,
				type: "rating",
			},
		],
	},

	{
		id: "general",
		title: "Geral",
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
				key: "detailedModel",
				label: "Modelo Detalhado",
				getValue: (p) => p.detailedModel ?? "-",
				type: "text",
			},
			{
				key: "color",
				label: "Cor",
				getValue: (p) => p.color ?? "-",
				type: "text",
			},
			{
				key: "type",
				label: "Tipo",
				getValue: (p) => getCamera(p)?.type ?? "-",
				type: "text",
			},
			{
				key: "targetAudience",
				label: "Público-Alvo",
				getValue: (p) => getCamera(p)?.targetAudience ?? "-",
				type: "text",
			},
			{
				key: "releaseDate",
				label: "Disponibilidade",
				getValue: (p) => p.releaseDate ?? "-",
				type: "text",
			},
			{
				key: "releaseYear",
				label: "Ano",
				getValue: (p) => p.releaseYear?.toString() ?? "-",
				type: "text",
			},
			{
				key: "origin",
				label: "Origem",
				getValue: (p) => p.origin ?? "-",
				type: "text",
			},
			{
				key: "manufacturer",
				label: "Fabricante",
				getValue: (p) => getCamera(p)?.manufacturer ?? "-",
				type: "text",
			},
			{
				key: "versions",
				label: "Versões",
				getValue: (p) => getCamera(p)?.versions?.join(", ") ?? "-",
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
				getValue: (p) => getCamera(p)?.sensor.type ?? "-",
				type: "text",
			},
			{
				key: "sensorSize",
				label: "Tamanho",
				getValue: (p) => getCamera(p)?.sensor.size ?? "-",
				type: "text",
			},
			{
				key: "resolution",
				label: "Resolução",
				getValue: (p) => getCamera(p)?.sensor.resolution ?? "-",
				type: "text",
			},
			{
				key: "megapixels",
				label: "Megapixels",
				getValue: (p) => getCamera(p)?.sensor.megapixels?.toString() ?? "-",
				type: "text",
			},
			{
				key: "cropFactor",
				label: "Crop Factor",
				getValue: (p) => getCamera(p)?.sensor.cropFactor ?? "-",
				type: "text",
			},
			{
				key: "nativeIso",
				label: "ISO Nativo",
				getValue: (p) => getCamera(p)?.sensor.iso.native ?? "-",
				type: "text",
			},
			{
				key: "expandedIso",
				label: "ISO Expandido",
				getValue: (p) => getCamera(p)?.sensor.iso.expanded ?? "-",
				type: "text",
			},
			{
				key: "stabilization",
				label: "Estabilização",
				getValue: (p) => getCamera(p)?.sensor.stabilization ?? false,
				type: "boolean",
			},
			{
				key: "ibis",
				label: "IBIS",
				getValue: (p) => getCamera(p)?.sensor.ibis ?? false,
				type: "boolean",
			},
			{
				key: "stabilizationType",
				label: "Tipo de Estabilização",
				getValue: (p) => getCamera(p)?.sensor.stabilizationType ?? "-",
				type: "text",
			},
			{
				key: "processor",
				label: "Processador",
				getValue: (p) => getCamera(p)?.processor ?? "-",
				type: "text",
			},
		],
	},

	{
		id: "autofocus",
		title: "Autofoco",
		specs: [
			{
				key: "afType",
				label: "Tipo",
				getValue: (p) => getCamera(p)?.autofocus.type ?? "-",
				type: "text",
			},
			{
				key: "afPoints",
				label: "Pontos",
				getValue: (p) => getCamera(p)?.autofocus.points?.toString() ?? "-",
				type: "text",
			},
			{
				key: "faceDetection",
				label: "Detecção de Rosto",
				getValue: (p) => getCamera(p)?.autofocus.faceDetection ?? false,
				type: "boolean",
			},
			{
				key: "eyeDetection",
				label: "Detecção de Olhos",
				getValue: (p) => getCamera(p)?.autofocus.eyeDetection ?? false,
				type: "boolean",
			},
			{
				key: "animalDetection",
				label: "Detecção de Animais",
				getValue: (p) => getCamera(p)?.autofocus.animalDetection ?? false,
				type: "boolean",
			},
			{
				key: "tracking",
				label: "Rastreamento",
				getValue: (p) => getCamera(p)?.autofocus.tracking ?? false,
				type: "boolean",
			},
			{
				key: "lowLightAf",
				label: "AF Baixa Luz",
				getValue: (p) => getCamera(p)?.autofocus.lowLightSensitivity ?? "-",
				type: "text",
			},
		],
	},

	{
		id: "video",
		title: "Vídeo",
		specs: [
			{
				key: "maxResolution",
				label: "Resolução Máx.",
				getValue: (p) => getCamera(p)?.video.maxResolution ?? "-",
				type: "text",
			},
			{
				key: "maxFrameRate",
				label: "FPS Máximo",
				getValue: (p) => getCamera(p)?.video.maxFrameRate ?? "-",
				type: "text",
			},
			{
				key: "fourKFrameRates",
				label: "4K Frame Rates",
				getValue: (p) => getCamera(p)?.video.fourKFrameRates?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "slowMotion",
				label: "Slow Motion",
				getValue: (p) => getCamera(p)?.video.slowMotion ?? "-",
				type: "text",
			},
			{
				key: "codec",
				label: "Codec",
				getValue: (p) => getCamera(p)?.video.codec?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "bitRate",
				label: "Bit Rate",
				getValue: (p) => getCamera(p)?.video.bitRate ?? "-",
				type: "text",
			},
			{
				key: "colorSampling",
				label: "Amostragem de Cor",
				getValue: (p) => getCamera(p)?.video.colorSampling ?? "-",
				type: "text",
			},
			{
				key: "bitDepth",
				label: "Profundidade de Bits",
				getValue: (p) => getCamera(p)?.video.bitDepth ?? "-",
				type: "text",
			},
			{
				key: "logProfile",
				label: "Perfil Log",
				getValue: (p) => getCamera(p)?.video.logProfile ?? "-",
				type: "text",
			},
			{
				key: "videoHdr",
				label: "HDR",
				getValue: (p) => getCamera(p)?.video.hdr ?? false,
				type: "boolean",
			},
			{
				key: "externalRecording",
				label: "Gravação Externa",
				getValue: (p) => getCamera(p)?.video.externalRecording ?? false,
				type: "boolean",
			},
		],
	},

	{
		id: "display",
		title: "Tela e Visor",
		specs: [
			{
				key: "displayType",
				label: "Tipo de Tela",
				getValue: (p) => getCamera(p)?.display.type ?? "-",
				type: "text",
			},
			{
				key: "displaySize",
				label: "Tamanho",
				getValue: (p) => getCamera(p)?.display.size ?? "-",
				type: "text",
			},
			{
				key: "displayResolution",
				label: "Resolução",
				getValue: (p) => getCamera(p)?.display.resolution ?? "-",
				type: "text",
			},
			{
				key: "touchscreen",
				label: "Touchscreen",
				getValue: (p) => getCamera(p)?.display.touchscreen ?? false,
				type: "boolean",
			},
			{
				key: "articulating",
				label: "Articulada",
				getValue: (p) => getCamera(p)?.display.articulating ?? false,
				type: "boolean",
			},
			{
				key: "articulationType",
				label: "Tipo de Articulação",
				getValue: (p) => getCamera(p)?.display.articulationType ?? "-",
				type: "text",
			},
			{
				key: "viewfinder",
				label: "Visor",
				getValue: (p) => getCamera(p)?.display.viewfinder ?? false,
				type: "boolean",
			},
			{
				key: "viewfinderType",
				label: "Tipo de Visor",
				getValue: (p) => getCamera(p)?.display.viewfinderType ?? "-",
				type: "text",
			},
			{
				key: "viewfinderResolution",
				label: "Resolução Visor",
				getValue: (p) => getCamera(p)?.display.viewfinderResolution ?? "-",
				type: "text",
			},
		],
	},

	{
		id: "performance",
		title: "Performance",
		specs: [
			{
				key: "burstFps",
				label: "Burst Mode",
				getValue: (p) => {
					const fps = getCamera(p)?.burstMode.maxFps;
					return fps !== undefined ? `${fps} fps` : "-";
				},
				type: "text",
			},
			{
				key: "bufferDepth",
				label: "Buffer",
				getValue: (p) => getCamera(p)?.burstMode.bufferDepth ?? "-",
				type: "text",
			},
			{
				key: "shutterSpeed",
				label: "Velocidade do Obturador",
				getValue: (p) => getCamera(p)?.burstMode.shutterSpeed ?? "-",
				type: "text",
			},
			{
				key: "electronicShutter",
				label: "Obturador Eletrônico",
				getValue: (p) => getCamera(p)?.burstMode.electronicShutter ?? false,
				type: "boolean",
			},
			{
				key: "mechanicalShutter",
				label: "Obturador Mecânico",
				getValue: (p) => getCamera(p)?.burstMode.mechanicalShutter ?? false,
				type: "boolean",
			},
		],
	},

	{
		id: "lens",
		title: "Lente",
		specs: [
			{
				key: "lensMount",
				label: "Montagem",
				getValue: (p) => getCamera(p)?.lens.mount ?? "-",
				type: "text",
			},
			{
				key: "interchangeable",
				label: "Intercambiável",
				getValue: (p) => getCamera(p)?.lens.interchangeable ?? false,
				type: "boolean",
			},
			{
				key: "includedLens",
				label: "Lente Incluída",
				getValue: (p) => getCamera(p)?.lens.included ?? "-",
				type: "text",
			},
			{
				key: "focalLength",
				label: "Distância Focal",
				getValue: (p) => getCamera(p)?.lens.focalLength ?? "-",
				type: "text",
			},
			{
				key: "aperture",
				label: "Abertura",
				getValue: (p) => getCamera(p)?.lens.aperture ?? "-",
				type: "text",
			},
			{
				key: "opticalZoom",
				label: "Zoom Óptico",
				getValue: (p) => getCamera(p)?.lens.opticalZoom ?? "-",
				type: "text",
			},
		],
	},

	{
		id: "storage",
		title: "Armazenamento",
		specs: [
			{
				key: "storageSlots",
				label: "Slots",
				getValue: (p) => getCamera(p)?.storage.slots?.toString() ?? "-",
				type: "text",
			},
			{
				key: "storageTypes",
				label: "Tipos de Cartão",
				getValue: (p) => getCamera(p)?.storage.types?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "dualSlotRecording",
				label: "Gravação Dupla",
				getValue: (p) => getCamera(p)?.storage.dualSlotRecording ?? false,
				type: "boolean",
			},
			{
				key: "uhs",
				label: "UHS",
				getValue: (p) => getCamera(p)?.storage.uhs ?? "-",
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
				getValue: (p) => getCamera(p)?.connectivity.wifi ?? false,
				type: "boolean",
			},
			{
				key: "bluetooth",
				label: "Bluetooth",
				getValue: (p) => getCamera(p)?.connectivity.bluetooth ?? false,
				type: "boolean",
			},
			{
				key: "nfc",
				label: "NFC",
				getValue: (p) => getCamera(p)?.connectivity.nfc ?? false,
				type: "boolean",
			},
			{
				key: "usb",
				label: "USB",
				getValue: (p) => getCamera(p)?.connectivity.usb ?? "-",
				type: "text",
			},
			{
				key: "hdmi",
				label: "HDMI",
				getValue: (p) => getCamera(p)?.connectivity.hdmi ?? false,
				type: "boolean",
			},
			{
				key: "hdmiType",
				label: "Tipo HDMI",
				getValue: (p) => getCamera(p)?.connectivity.hdmiType ?? "-",
				type: "text",
			},
			{
				key: "microphone",
				label: "Entrada Microfone",
				getValue: (p) => getCamera(p)?.connectivity.microphone ?? false,
				type: "boolean",
			},
			{
				key: "headphone",
				label: "Saída Fone",
				getValue: (p) => getCamera(p)?.connectivity.headphone ?? false,
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
				getValue: (p) => getCamera(p)?.battery.type ?? "-",
				type: "text",
			},
			{
				key: "batteryCapacity",
				label: "Capacidade",
				getValue: (p) => getCamera(p)?.battery.capacity ?? "-",
				type: "text",
			},
			{
				key: "shotsPerCharge",
				label: "Fotos por Carga",
				getValue: (p) => getCamera(p)?.battery.shotsPerCharge?.toString() ?? "-",
				type: "text",
			},
			{
				key: "videoRuntime",
				label: "Tempo de Vídeo",
				getValue: (p) => getCamera(p)?.battery.videoRuntime ?? "-",
				type: "text",
			},
			{
				key: "usbCharging",
				label: "Carga USB",
				getValue: (p) => getCamera(p)?.battery.usbCharging ?? false,
				type: "boolean",
			},
			{
				key: "batteryGrip",
				label: "Battery Grip",
				getValue: (p) => getCamera(p)?.battery.batteryGrip ?? false,
				type: "boolean",
			},
		],
	},

	{
		id: "build",
		title: "Construção",
		specs: [
			{
				key: "weatherSealing",
				label: "Selagem",
				getValue: (p) => getCamera(p)?.build.weatherSealing ?? false,
				type: "boolean",
			},
			{
				key: "material",
				label: "Material",
				getValue: (p) => getCamera(p)?.build.material ?? "-",
				type: "text",
			},
			{
				key: "dimensions",
				label: "Dimensões",
				getValue: (p) => getCamera(p)?.build.dimensions ?? "-",
				type: "text",
			},
			{
				key: "weight",
				label: "Peso",
				getValue: (p) => getCamera(p)?.build.weight ?? "-",
				type: "text",
			},
			{
				key: "bodyOnly",
				label: "Peso (Corpo)",
				getValue: (p) => getCamera(p)?.build.bodyOnly ?? "-",
				type: "text",
			},
		],
	},

	{
		id: "features",
		title: "Recursos",
		specs: [
			{
				key: "rawCapture",
				label: "RAW",
				getValue: (p) => getCamera(p)?.features.rawCapture ?? false,
				type: "boolean",
			},
			{
				key: "rawFormat",
				label: "Formato RAW",
				getValue: (p) => getCamera(p)?.features.rawFormat ?? "-",
				type: "text",
			},
			{
				key: "hdr",
				label: "HDR",
				getValue: (p) => getCamera(p)?.features.hdr ?? false,
				type: "boolean",
			},
			{
				key: "bracketing",
				label: "Bracketing",
				getValue: (p) => getCamera(p)?.features.bracketing ?? false,
				type: "boolean",
			},
			{
				key: "waterproof",
				label: "À Prova d'Água",
				getValue: (p) => getCamera(p)?.features.waterproof ?? false,
				type: "boolean",
			},
			{
				key: "waterproofDepth",
				label: "Profundidade",
				getValue: (p) => getCamera(p)?.features.waterproofDepth ?? "-",
				type: "text",
			},
			{
				key: "shockproof",
				label: "À Prova de Choque",
				getValue: (p) => getCamera(p)?.features.shockproof ?? false,
				type: "boolean",
			},
			{
				key: "gps",
				label: "GPS",
				getValue: (p) => getCamera(p)?.features.gps ?? false,
				type: "boolean",
			},
			{
				key: "voiceControl",
				label: "Controle por Voz",
				getValue: (p) => getCamera(p)?.features.voiceControl ?? false,
				type: "boolean",
			},
		],
	},

	{
		id: "audio",
		title: "Áudio",
		specs: [
			{
				key: "builtInMic",
				label: "Microfone Embutido",
				getValue: (p) => getCamera(p)?.audio.builtInMicrophone ?? false,
				type: "boolean",
			},
			{
				key: "microphoneType",
				label: "Tipo de Microfone",
				getValue: (p) => getCamera(p)?.audio.microphoneType ?? "-",
				type: "text",
			},
			{
				key: "externalMic",
				label: "Microfone Externo",
				getValue: (p) => getCamera(p)?.audio.externalMicSupport ?? false,
				type: "boolean",
			},
			{
				key: "windNoise",
				label: "Redução de Vento",
				getValue: (p) => getCamera(p)?.audio.windNoiseReduction ?? false,
				type: "boolean",
			},
			{
				key: "audioLevels",
				label: "Controle de Níveis",
				getValue: (p) => getCamera(p)?.audio.audioLevels ?? false,
				type: "boolean",
			},
			{
				key: "headphoneMonitoring",
				label: "Monitoramento",
				getValue: (p) => getCamera(p)?.audio.headphoneMonitoring ?? false,
				type: "boolean",
			},
		],
	},
];
