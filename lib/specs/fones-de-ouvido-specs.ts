import { SpecSection } from "../spec-configs";
import { BaseProduct, Product } from "../types";

export interface FoneDeOuvido extends BaseProduct {
	category: "fones-de-ouvido";
	specs: FoneDeOuvidoSpecs;
}

function isFoneDeOuvido(product: Product): product is FoneDeOuvido {
	return product.category === "fones-de-ouvido";
}

function getFoneDeOuvido(p: Product): FoneDeOuvidoSpecs | null {
	return isFoneDeOuvido(p) ? p.specs : null;
}

export interface FoneDeOuvidoSpecs {
	driverSize?: string;
	frequencyResponse?: string;
	sensitivityDb?: number | null;
	bluetoothCodecs?: string;
	bluetoothVersion?: string;
	wirelessRangeMeters?: number | null;
	connectors?: string;
	twsTechnology?: boolean;
	anc?: boolean;
	transparency?: boolean;
	batteryEarbuds?: string;
	batteryCase?: string;
	totalBattery?: string;
	batteryCapacityEarbudsMah?: number | null;
	batteryCapacityCaseMah?: number | null;
	chargingTimeEarbuds?: string;
	chargingTimeCase?: string;
	fastCharging?: boolean;
	wirelessCharging?: boolean;
	includesChargingCase?: boolean;
	microphone?: boolean;
	microphonesCount?: number | null;
	handsFreeMode?: boolean;
	detachableMic?: boolean;
	flexibleMic?: boolean;
	micOrientation?: string;
	waterResistance?: boolean;
	waterproof?: boolean;
	dustResistance?: boolean;
	ipRating?: string;
	formFactor?: string;
	monaural?: boolean;
	weight?: string;
	touchControls?: boolean;
	ledLight?: boolean;
	proximitySensor?: boolean;
	voiceAssistant?: boolean;
	integratedAssistants?: string;
	multipoint?: boolean;
	appSupport?: boolean;
	mp3Player?: boolean;
	fmRadio?: boolean;
	recommendedUse?: string;
	compatibleConsoles?: string;
	cableLength?: string;
	kids?: boolean;
	accessoriesIncluded?: string;
	ratings: {
		costBenefit: number | null;
		soundQuality: number;
		anc: number;
		comfort: number;
		battery: number;
	};
}

export const fonesDeOuvidoSpecs: SpecSection[] = [
	{
		id: "ratings",
		title: "Notas",
		specs: [
			{
				key: "costBenefit",
				label: "Custo-benefício",
				getValue: (p) => getFoneDeOuvido(p)?.ratings.costBenefit ?? null,
				type: "rating",
			},
			{
				key: "soundQuality",
				label: "Som",
				getValue: (p) => getFoneDeOuvido(p)?.ratings.soundQuality ?? null,
				type: "rating",
			},
			{
				key: "ancRating",
				label: "Cancelamento de Ruído",
				getValue: (p) => getFoneDeOuvido(p)?.ratings.anc ?? null,
				type: "rating",
			},
			{
				key: "comfort",
				label: "Conforto",
				getValue: (p) => getFoneDeOuvido(p)?.ratings.comfort ?? null,
				type: "rating",
			},
			{
				key: "batteryRating",
				label: "Bateria",
				getValue: (p) => getFoneDeOuvido(p)?.ratings.battery ?? null,
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
			{
				key: "anatel",
				label: "ANATEL",
				getValue: (p) => p.anatelNumber ?? "-",
				type: "text",
			},
		],
	},

	{
		id: "audio",
		title: "Áudio",
		specs: [
			{
				key: "driverSize",
				label: "Driver",
				getValue: (p) => getFoneDeOuvido(p)?.driverSize ?? "-",
				type: "text",
			},
			{
				key: "frequencyResponse",
				label: "Frequência",
				getValue: (p) => getFoneDeOuvido(p)?.frequencyResponse ?? "-",
				type: "text",
			},
			{
				key: "sensitivityDb",
				label: "Sensibilidade",
				getValue: (p) =>
					getFoneDeOuvido(p)?.sensitivityDb != null ? `${getFoneDeOuvido(p)!.sensitivityDb} dB` : "-",
				type: "text",
			},
			{
				key: "bluetoothCodecs",
				label: "Codecs",
				getValue: (p) => getFoneDeOuvido(p)?.bluetoothCodecs ?? "-",
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
				label: "Bluetooth",
				getValue: (p) => getFoneDeOuvido(p)?.bluetoothVersion ?? "-",
				type: "text",
			},
			{
				key: "wirelessRangeMeters",
				label: "Alcance",
				getValue: (p) =>
					getFoneDeOuvido(p)?.wirelessRangeMeters != null
						? `${getFoneDeOuvido(p)!.wirelessRangeMeters} m`
						: "-",
				type: "text",
			},
			{
				key: "connectors",
				label: "Conector",
				getValue: (p) => getFoneDeOuvido(p)?.connectors ?? "-",
				type: "text",
			},
			{
				key: "multipoint",
				label: "Multipoint",
				getValue: (p) => getFoneDeOuvido(p)?.multipoint ?? false,
				type: "boolean",
			},
		],
	},

	{
		id: "battery",
		title: "Bateria",
		specs: [
			{
				key: "batteryEarbuds",
				label: "Autonomia (Fones)",
				getValue: (p) => getFoneDeOuvido(p)?.batteryEarbuds ?? "-",
				type: "text",
			},
			{
				key: "batteryCase",
				label: "Autonomia (Case)",
				getValue: (p) => getFoneDeOuvido(p)?.batteryCase ?? "-",
				type: "text",
			},
			{
				key: "totalBattery",
				label: "Total",
				getValue: (p) => getFoneDeOuvido(p)?.totalBattery ?? "-",
				type: "text",
			},
			{
				key: "batteryCapacityEarbudsMah",
				label: "Cap. Fones",
				getValue: (p) =>
					getFoneDeOuvido(p)?.batteryCapacityEarbudsMah != null
						? `${getFoneDeOuvido(p)!.batteryCapacityEarbudsMah} mAh`
						: "-",
				type: "text",
			},
			{
				key: "batteryCapacityCaseMah",
				label: "Cap. Case",
				getValue: (p) =>
					getFoneDeOuvido(p)?.batteryCapacityCaseMah != null
						? `${getFoneDeOuvido(p)!.batteryCapacityCaseMah} mAh`
						: "-",
				type: "text",
			},
			{
				key: "fastCharging",
				label: "Carga Rápida",
				getValue: (p) => getFoneDeOuvido(p)?.fastCharging ?? false,
				type: "boolean",
			},
			{
				key: "wirelessCharging",
				label: "Wireless",
				getValue: (p) => getFoneDeOuvido(p)?.wirelessCharging ?? false,
				type: "boolean",
			},
		],
	},

	{
		id: "features",
		title: "Recursos",
		specs: [
			{
				key: "anc",
				label: "Cancelamento de Ruído",
				getValue: (p) => getFoneDeOuvido(p)?.anc ?? false,
				type: "boolean",
			},
			{
				key: "transparency",
				label: "Transparência",
				getValue: (p) => getFoneDeOuvido(p)?.transparency ?? false,
				type: "boolean",
			},
			{
				key: "touchControls",
				label: "Touch",
				getValue: (p) => getFoneDeOuvido(p)?.touchControls ?? false,
				type: "boolean",
			},
			{
				key: "voiceAssistant",
				label: "Assistente",
				getValue: (p) => getFoneDeOuvido(p)?.voiceAssistant ?? false,
				type: "boolean",
			},
			{
				key: "ipRating",
				label: "Proteção IP",
				getValue: (p) => getFoneDeOuvido(p)?.ipRating ?? "-",
				type: "text",
			},
			{
				key: "weight",
				label: "Peso",
				getValue: (p) => getFoneDeOuvido(p)?.weight ?? "-",
				type: "text",
			},
			{
				key: "accessoriesIncluded",
				label: "Acessórios",
				getValue: (p) => getFoneDeOuvido(p)?.accessoriesIncluded ?? "-",
				type: "text",
			},
		],
	},
];
