import { SpecSection } from "../spec-configs";
import { BaseProduct, Product } from "../types";

function isCaixaDeSom(product: Product): product is CaixaDeSom {
	return product.category === "caixa-de-som";
}

export interface CaixaDeSom extends BaseProduct {
	category: "caixa-de-som";
	specs: CaixaDeSomSpecs;
}

function getCaixaDeSom(p: Product): CaixaDeSomSpecs | null {
	return isCaixaDeSom(p) ? p.specs : null;
}

export interface CaixaDeSomSpecs {
	type: "Portátil" | "Home" | "Soundbar" | "Torre" | "Bookshelf" | "Subwoofer";
	audio: {
		power: {
			rms: number;
			peak?: number;
			unit: "W";
		};
		drivers: {
			configuration?: string;
			woofer?: string;
			tweeter?: string;
			midrange?: string;
			subwoofer?: string;
			passive?: boolean;
		};
		frequency: {
			min: number;
			max: number;
			unit: "Hz" | "kHz";
		};
		impedance?: string;
		sensitivity?: string;
		snr?: string;
	};
	connectivity: {
		bluetooth?: {
			version?: string;
			range?: string;
			multipoint?: boolean;
			codec?: string[];
		};
		wifi?: {
			standards?: string[];
			multiroom?: boolean;
		};
		wired?: {
			aux?: boolean;
			optical?: boolean;
			usb?: boolean;
			hdmi?: boolean;
			rca?: boolean;
		};
		nfc?: boolean;
	};
	features: {
		waterproof?: string;
		dustproof?: string;
		portability?: boolean;
		stereo?: boolean;
		partyMode?: boolean;
		twsTechnology: boolean;
		voiceAssistant?: string[];
		eqSettings?: boolean;
		customEQ?: boolean;
		app?: boolean;
		ledLights?: boolean;
		micInput?: boolean;
		karaoke?: boolean;
	};
	battery?: {
		capacity?: string;
		playTime?: string;
		chargingTime?: string;
		quickCharge?: boolean;
		powerBank?: boolean;
	};
	power?: {
		type?: string;
		voltage?: string;
		acAdapter?: boolean;
	};
	build: {
		material?: string;
		dimensions: {
			width: string;
			height: string;
			depth: string;
			weight: string;
		};
		mounting?: string[];
	};
	controls: {
		type?: string;
		volume?: boolean;
		playback?: boolean;
		voiceControl?: boolean;
		touch?: boolean;
	};
	accessories?: string[];
	ratings: {
		costBenefit: number | null;
		soundQuality: number;
		bassResponse: number;
		portability: number;
		batteryLife: number;
	};
}

export const caixaDeSomSpecs: SpecSection[] = [
	{
		id: "ratings",
		title: "Notas",
		specs: [
			{
				key: "costBenefit",
				label: "Custo-benefício",
				getValue: (p) => getCaixaDeSom(p)?.ratings.costBenefit ?? null,
				type: "rating",
			},
			{
				key: "soundQuality",
				label: "Qualidade de Som",
				getValue: (p) => getCaixaDeSom(p)?.ratings.soundQuality ?? null,
				type: "rating",
			},
			{
				key: "bassResponse",
				label: "Resposta de Graves",
				getValue: (p) => getCaixaDeSom(p)?.ratings.bassResponse ?? null,
				type: "rating",
			},
			{
				key: "portability",
				label: "Portabilidade",
				getValue: (p) => getCaixaDeSom(p)?.ratings.portability ?? null,
				type: "rating",
			},
			{
				key: "batteryLife",
				label: "Duração da Bateria",
				getValue: (p) => getCaixaDeSom(p)?.ratings.batteryLife ?? null,
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
			{ key: "type", label: "Tipo", getValue: (p) => getCaixaDeSom(p)?.type ?? "-", type: "text" },
			{ key: "releaseDate", label: "Lançamento", getValue: (p) => p.releaseDate ?? "-", type: "text" },
			{ key: "releaseYear", label: "Ano", getValue: (p) => p.releaseYear?.toString() ?? "-", type: "text" },
		],
	},
	{
		id: "audio",
		title: "Áudio",
		specs: [
			{
				key: "rms",
				label: "Potência RMS",
				getValue: (p) => {
					const audio = getCaixaDeSom(p)?.audio;
					return audio ? `${audio.power.rms}${audio.power.unit}` : "-";
				},
				type: "text",
			},
			{
				key: "peak",
				label: "Potência Pico",
				getValue: (p) => {
					const audio = getCaixaDeSom(p)?.audio;
					return audio?.power.peak ? `${audio.power.peak}${audio.power.unit}` : "-";
				},
				type: "text",
			},
			{
				key: "configuration",
				label: "Configuração dos Drivers",
				getValue: (p) => getCaixaDeSom(p)?.audio.drivers.configuration ?? "-",
				type: "text",
			},
			{
				key: "woofer",
				label: "Woofer",
				getValue: (p) => getCaixaDeSom(p)?.audio.drivers.woofer ?? "-",
				type: "text",
			},
			{
				key: "tweeter",
				label: "Tweeter",
				getValue: (p) => getCaixaDeSom(p)?.audio.drivers.tweeter ?? "-",
				type: "text",
			},
			{
				key: "midrange",
				label: "Midrange",
				getValue: (p) => getCaixaDeSom(p)?.audio.drivers.midrange ?? "-",
				type: "text",
			},
			{
				key: "subwoofer",
				label: "Subwoofer",
				getValue: (p) => getCaixaDeSom(p)?.audio.drivers.subwoofer ?? "-",
				type: "text",
			},
			{
				key: "passive",
				label: "Radiador Passivo",
				getValue: (p) => getCaixaDeSom(p)?.audio.drivers.passive ?? false,
				type: "boolean",
			},
			{
				key: "frequencyRange",
				label: "Resposta de Frequência",
				getValue: (p) => {
					const audio = getCaixaDeSom(p)?.audio;
					return audio ? `${audio.frequency.min}-${audio.frequency.max}${audio.frequency.unit}` : "-";
				},
				type: "text",
			},
			{
				key: "impedance",
				label: "Impedância",
				getValue: (p) => getCaixaDeSom(p)?.audio.impedance ?? "-",
				type: "text",
			},
			{
				key: "sensitivity",
				label: "Sensibilidade",
				getValue: (p) => getCaixaDeSom(p)?.audio.sensitivity ?? "-",
				type: "text",
			},
			{
				key: "snr",
				label: "Relação Sinal/Ruído",
				getValue: (p) => getCaixaDeSom(p)?.audio.snr ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "connectivity",
		title: "Conectividade",
		specs: [
			{
				key: "bluetoothVersion",
				label: "Versão Bluetooth",
				getValue: (p) => getCaixaDeSom(p)?.connectivity.bluetooth?.version ?? "-",
				type: "text",
			},
			{
				key: "bluetoothRange",
				label: "Alcance Bluetooth",
				getValue: (p) => getCaixaDeSom(p)?.connectivity.bluetooth?.range ?? "-",
				type: "text",
			},
			{
				key: "multipoint",
				label: "Multipoint",
				getValue: (p) => getCaixaDeSom(p)?.connectivity.bluetooth?.multipoint ?? false,
				type: "boolean",
			},
			{
				key: "codec",
				label: "Codecs",
				getValue: (p) => getCaixaDeSom(p)?.connectivity.bluetooth?.codec?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "wifiStandards",
				label: "Padrões Wi-Fi",
				getValue: (p) => getCaixaDeSom(p)?.connectivity.wifi?.standards?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "multiroom",
				label: "Multiroom",
				getValue: (p) => getCaixaDeSom(p)?.connectivity.wifi?.multiroom ?? false,
				type: "boolean",
			},
			{
				key: "aux",
				label: "Entrada AUX",
				getValue: (p) => getCaixaDeSom(p)?.connectivity.wired?.aux ?? false,
				type: "boolean",
			},
			{
				key: "optical",
				label: "Entrada Óptica",
				getValue: (p) => getCaixaDeSom(p)?.connectivity.wired?.optical ?? false,
				type: "boolean",
			},
			{
				key: "usb",
				label: "USB",
				getValue: (p) => getCaixaDeSom(p)?.connectivity.wired?.usb ?? false,
				type: "boolean",
			},
			{
				key: "hdmi",
				label: "HDMI",
				getValue: (p) => getCaixaDeSom(p)?.connectivity.wired?.hdmi ?? false,
				type: "boolean",
			},
			{
				key: "rca",
				label: "RCA",
				getValue: (p) => getCaixaDeSom(p)?.connectivity.wired?.rca ?? false,
				type: "boolean",
			},
			{
				key: "nfc",
				label: "NFC",
				getValue: (p) => getCaixaDeSom(p)?.connectivity.nfc ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "features",
		title: "Recursos",
		specs: [
			{
				key: "waterproof",
				label: "Resistência à Água",
				getValue: (p) => getCaixaDeSom(p)?.features.waterproof ?? "-",
				type: "text",
			},
			{
				key: "dustproof",
				label: "Resistência à Poeira",
				getValue: (p) => getCaixaDeSom(p)?.features.dustproof ?? "-",
				type: "text",
			},
			{
				key: "portability",
				label: "Portátil",
				getValue: (p) => getCaixaDeSom(p)?.features.portability ?? false,
				type: "boolean",
			},
			{
				key: "stereo",
				label: "Estéreo",
				getValue: (p) => getCaixaDeSom(p)?.features.stereo ?? false,
				type: "boolean",
			},
			{
				key: "partyMode",
				label: "Modo Festa",
				getValue: (p) => getCaixaDeSom(p)?.features.partyMode ?? false,
				type: "boolean",
			},
			{
				key: "twsTechnology",
				label: "TWS (True Wireless Stereo)",
				getValue: (p) => getCaixaDeSom(p)?.features?.twsTechnology ?? false,
				type: "boolean",
			},
			{
				key: "voiceAssistant",
				label: "Assistente de Voz",
				getValue: (p) => getCaixaDeSom(p)?.features.voiceAssistant?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "eqSettings",
				label: "Configurações de EQ",
				getValue: (p) => getCaixaDeSom(p)?.features.eqSettings ?? false,
				type: "boolean",
			},
			{
				key: "customEQ",
				label: "EQ Customizável",
				getValue: (p) => getCaixaDeSom(p)?.features.customEQ ?? false,
				type: "boolean",
			},
			{
				key: "app",
				label: "Aplicativo",
				getValue: (p) => getCaixaDeSom(p)?.features.app ?? false,
				type: "boolean",
			},
			{
				key: "ledLights",
				label: "Luzes LED",
				getValue: (p) => getCaixaDeSom(p)?.features.ledLights ?? false,
				type: "boolean",
			},
			{
				key: "micInput",
				label: "Entrada de Microfone",
				getValue: (p) => getCaixaDeSom(p)?.features.micInput ?? false,
				type: "boolean",
			},
			{
				key: "karaoke",
				label: "Modo Karaokê",
				getValue: (p) => getCaixaDeSom(p)?.features.karaoke ?? false,
				type: "boolean",
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
				getValue: (p) => getCaixaDeSom(p)?.battery?.capacity ?? "-",
				type: "text",
			},
			{
				key: "playTime",
				label: "Tempo de Reprodução",
				getValue: (p) => getCaixaDeSom(p)?.battery?.playTime ?? "-",
				type: "text",
			},
			{
				key: "chargingTime",
				label: "Tempo de Carga",
				getValue: (p) => getCaixaDeSom(p)?.battery?.chargingTime ?? "-",
				type: "text",
			},
			{
				key: "quickCharge",
				label: "Carga Rápida",
				getValue: (p) => getCaixaDeSom(p)?.battery?.quickCharge ?? false,
				type: "boolean",
			},
			{
				key: "powerBank",
				label: "Função Power Bank",
				getValue: (p) => getCaixaDeSom(p)?.battery?.powerBank ?? false,
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
				getValue: (p) => getCaixaDeSom(p)?.power?.type ?? "-",
				type: "text",
			},
			{
				key: "voltage",
				label: "Voltagem",
				getValue: (p) => getCaixaDeSom(p)?.power?.voltage ?? "-",
				type: "text",
			},
			{
				key: "acAdapter",
				label: "Adaptador AC",
				getValue: (p) => getCaixaDeSom(p)?.power?.acAdapter ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "build",
		title: "Construção",
		specs: [
			{
				key: "material",
				label: "Material",
				getValue: (p) => getCaixaDeSom(p)?.build.material ?? "-",
				type: "text",
			},
			{
				key: "width",
				label: "Largura",
				getValue: (p) => getCaixaDeSom(p)?.build.dimensions.width ?? "-",
				type: "text",
			},
			{
				key: "height",
				label: "Altura",
				getValue: (p) => getCaixaDeSom(p)?.build.dimensions.height ?? "-",
				type: "text",
			},
			{
				key: "depth",
				label: "Profundidade",
				getValue: (p) => getCaixaDeSom(p)?.build.dimensions.depth ?? "-",
				type: "text",
			},
			{
				key: "weight",
				label: "Peso",
				getValue: (p) => getCaixaDeSom(p)?.build.dimensions.weight ?? "-",
				type: "text",
			},
			{
				key: "mounting",
				label: "Opções de Montagem",
				getValue: (p) => getCaixaDeSom(p)?.build.mounting?.join(", ") ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "controls",
		title: "Controles",
		specs: [
			{
				key: "controlType",
				label: "Tipo",
				getValue: (p) => getCaixaDeSom(p)?.controls.type ?? "-",
				type: "text",
			},
			{
				key: "volume",
				label: "Controle de Volume",
				getValue: (p) => getCaixaDeSom(p)?.controls.volume ?? false,
				type: "boolean",
			},
			{
				key: "playback",
				label: "Controle de Reprodução",
				getValue: (p) => getCaixaDeSom(p)?.controls.playback ?? false,
				type: "boolean",
			},
			{
				key: "voiceControl",
				label: "Controle por Voz",
				getValue: (p) => getCaixaDeSom(p)?.controls.voiceControl ?? false,
				type: "boolean",
			},
			{
				key: "touch",
				label: "Controle Touch",
				getValue: (p) => getCaixaDeSom(p)?.controls.touch ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "accessories",
		title: "Acessórios",
		specs: [
			{
				key: "accessories",
				label: "Inclusos",
				getValue: (p) => getCaixaDeSom(p)?.accessories?.join(", ") ?? "-",
				type: "text",
			},
		],
	},
];
