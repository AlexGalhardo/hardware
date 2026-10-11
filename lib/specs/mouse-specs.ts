import { SpecSection } from "../spec-configs";
import { BaseProduct, Product } from "../types";

function isMouse(product: Product): product is Mouse {
	return product.category === "mouses";
}

export interface Mouse extends BaseProduct {
	category: "mouses";
	specs: MouseSpecs;
}

function getMouse(p: Product): MouseSpecs | null {
	return isMouse(p) ? p.specs : null;
}

export interface MouseSpecs {
	type: "Gaming" | "Office" | "Ergonômico" | "Trackball" | "Vertical";
	sensor: {
		type: "Óptico" | "Laser" | "Infravermelho";
		brand?: string;
		model?: string;
		maxDPI: number;
		maxIPS?: number;
		maxAcceleration?: string;
		pollingRate?: number;
	};
	buttons: {
		count: number;
		programmable?: number;
		sideBbuttons?: number;
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
			braided?: boolean;
		};
	};
	lighting?: {
		rgb?: boolean;
		zones?: number;
		effects?: string[];
		software?: string;
	};
	features: {
		onboardMemory?: boolean;
		profiles?: number;
		weightTuning?: boolean;
		adjustableWeight?: boolean;
		scrollWheel?: string;
		tiltScroll?: boolean;
		horizontalScroll?: boolean;
		hyperScroll?: boolean;
	};
	battery?: {
		type?: string;
		capacity?: string;
		life?: string;
		rechargeable?: boolean;
		quickCharge?: boolean;
	};
	ergonomics: {
		handedness: "Destro" | "Canhoto" | "Ambidestro";
		grip: string[];
		shape?: string;
	};
	build: {
		material?: string;
		coating?: string;
		feet?: string;
	};
	software?: {
		name?: string;
		features?: string[];
		platforms?: string[];
	};
	dimensions: {
		length: string;
		width: string;
		height: string;
		weight: string;
	};
	compatibility: string[];
	ratings: {
		costBenefit: number | null;
		precision: number;
		comfort: number;
		buildQuality: number;
		gaming: number;
	};
}

export const mouseSpecs: SpecSection[] = [
	{
		id: "ratings",
		title: "Notas",
		specs: [
			{
				key: "costBenefit",
				label: "Custo-benefício",
				getValue: (p) => getMouse(p)?.ratings.costBenefit ?? null,
				type: "rating",
			},
			{
				key: "precision",
				label: "Precisão",
				getValue: (p) => getMouse(p)?.ratings.precision ?? null,
				type: "rating",
			},
			{
				key: "comfort",
				label: "Conforto",
				getValue: (p) => getMouse(p)?.ratings.comfort ?? null,
				type: "rating",
			},
			{
				key: "buildQuality",
				label: "Qualidade de Construção",
				getValue: (p) => getMouse(p)?.ratings.buildQuality ?? null,
				type: "rating",
			},
			{
				key: "gaming",
				label: "Gaming",
				getValue: (p) => getMouse(p)?.ratings.gaming ?? null,
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
			{ key: "type", label: "Tipo", getValue: (p) => getMouse(p)?.type ?? "-", type: "text" },
			{ key: "releaseDate", label: "Lançamento", getValue: (p) => p.releaseDate ?? "-", type: "text" },
			{ key: "releaseYear", label: "Ano", getValue: (p) => p.releaseYear?.toString() ?? "-", type: "text" },
		],
	},
	{
		id: "sensor",
		title: "Sensor",
		specs: [
			{
				key: "sensorType",
				label: "Tipo",
				getValue: (p) => getMouse(p)?.sensor.type ?? "-",
				type: "text",
			},
			{
				key: "sensorBrand",
				label: "Marca",
				getValue: (p) => getMouse(p)?.sensor.brand ?? "-",
				type: "text",
			},
			{
				key: "sensorModel",
				label: "Modelo",
				getValue: (p) => getMouse(p)?.sensor.model ?? "-",
				type: "text",
			},
			{
				key: "maxDPI",
				label: "DPI Máximo",
				getValue: (p) => getMouse(p)?.sensor.maxDPI.toString() ?? "-",
				type: "text",
			},
			{
				key: "maxIPS",
				label: "IPS Máximo",
				getValue: (p) => getMouse(p)?.sensor.maxIPS?.toString() ?? "-",
				type: "text",
			},
			{
				key: "maxAcceleration",
				label: "Aceleração Máxima",
				getValue: (p) => getMouse(p)?.sensor.maxAcceleration ?? "-",
				type: "text",
			},
			{
				key: "pollingRate",
				label: "Taxa de Polling",
				getValue: (p) => {
					const rate = getMouse(p)?.sensor.pollingRate;
					return rate ? `${rate}Hz` : "-";
				},
				type: "text",
			},
		],
	},
	{
		id: "buttons",
		title: "Botões",
		specs: [
			{
				key: "buttonCount",
				label: "Total",
				getValue: (p) => getMouse(p)?.buttons.count.toString() ?? "-",
				type: "text",
			},
			{
				key: "programmable",
				label: "Programáveis",
				getValue: (p) => getMouse(p)?.buttons.programmable?.toString() ?? "-",
				type: "text",
			},
			{
				key: "sideButtons",
				label: "Botões Laterais",
				getValue: (p) => getMouse(p)?.buttons.sideBbuttons?.toString() ?? "-",
				type: "text",
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
				getValue: (p) => getMouse(p)?.connectivity.type ?? "-",
				type: "text",
			},
			{
				key: "bluetooth",
				label: "Bluetooth",
				getValue: (p) => getMouse(p)?.connectivity.wireless?.bluetooth ?? false,
				type: "boolean",
			},
			{
				key: "rf24ghz",
				label: "RF 2.4GHz",
				getValue: (p) => getMouse(p)?.connectivity.wireless?.rf24ghz ?? false,
				type: "boolean",
			},
			{
				key: "multiDevice",
				label: "Multi-dispositivo",
				getValue: (p) => getMouse(p)?.connectivity.wireless?.multiDevice ?? false,
				type: "boolean",
			},
			{
				key: "maxDevices",
				label: "Máximo de Dispositivos",
				getValue: (p) => getMouse(p)?.connectivity.wireless?.maxDevices?.toString() ?? "-",
				type: "text",
			},
			{
				key: "cableType",
				label: "Tipo de Cabo",
				getValue: (p) => getMouse(p)?.connectivity.cable?.type ?? "-",
				type: "text",
			},
			{
				key: "cableLength",
				label: "Comprimento do Cabo",
				getValue: (p) => getMouse(p)?.connectivity.cable?.length ?? "-",
				type: "text",
			},
			{
				key: "braided",
				label: "Cabo Trançado",
				getValue: (p) => getMouse(p)?.connectivity.cable?.braided ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "lighting",
		title: "Iluminação",
		specs: [
			{
				key: "rgb",
				label: "RGB",
				getValue: (p) => getMouse(p)?.lighting?.rgb ?? false,
				type: "boolean",
			},
			{
				key: "zones",
				label: "Zonas RGB",
				getValue: (p) => getMouse(p)?.lighting?.zones?.toString() ?? "-",
				type: "text",
			},
			{
				key: "effects",
				label: "Efeitos",
				getValue: (p) => getMouse(p)?.lighting?.effects?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "software",
				label: "Software",
				getValue: (p) => getMouse(p)?.lighting?.software ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "features",
		title: "Recursos",
		specs: [
			{
				key: "onboardMemory",
				label: "Memória Integrada",
				getValue: (p) => getMouse(p)?.features.onboardMemory ?? false,
				type: "boolean",
			},
			{
				key: "profiles",
				label: "Perfis",
				getValue: (p) => getMouse(p)?.features.profiles?.toString() ?? "-",
				type: "text",
			},
			{
				key: "weightTuning",
				label: "Ajuste de Peso",
				getValue: (p) => getMouse(p)?.features.weightTuning ?? false,
				type: "boolean",
			},
			{
				key: "adjustableWeight",
				label: "Peso Ajustável",
				getValue: (p) => getMouse(p)?.features.adjustableWeight ?? false,
				type: "boolean",
			},
			{
				key: "scrollWheel",
				label: "Scroll Wheel",
				getValue: (p) => getMouse(p)?.features.scrollWheel ?? "-",
				type: "text",
			},
			{
				key: "tiltScroll",
				label: "Tilt Scroll",
				getValue: (p) => getMouse(p)?.features.tiltScroll ?? false,
				type: "boolean",
			},
			{
				key: "horizontalScroll",
				label: "Scroll Horizontal",
				getValue: (p) => getMouse(p)?.features.horizontalScroll ?? false,
				type: "boolean",
			},
			{
				key: "hyperScroll",
				label: "Hyper Scroll",
				getValue: (p) => getMouse(p)?.features.hyperScroll ?? false,
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
				getValue: (p) => getMouse(p)?.battery?.type ?? "-",
				type: "text",
			},
			{
				key: "capacity",
				label: "Capacidade",
				getValue: (p) => getMouse(p)?.battery?.capacity ?? "-",
				type: "text",
			},
			{
				key: "batteryLife",
				label: "Duração",
				getValue: (p) => getMouse(p)?.battery?.life ?? "-",
				type: "text",
			},
			{
				key: "rechargeable",
				label: "Recarregável",
				getValue: (p) => getMouse(p)?.battery?.rechargeable ?? false,
				type: "boolean",
			},
			{
				key: "quickCharge",
				label: "Carga Rápida",
				getValue: (p) => getMouse(p)?.battery?.quickCharge ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "ergonomics",
		title: "Ergonomia",
		specs: [
			{
				key: "handedness",
				label: "Lateralidade",
				getValue: (p) => getMouse(p)?.ergonomics.handedness ?? "-",
				type: "text",
			},
			{
				key: "grip",
				label: "Estilo de Pegada",
				getValue: (p) => getMouse(p)?.ergonomics.grip.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "shape",
				label: "Formato",
				getValue: (p) => getMouse(p)?.ergonomics.shape ?? "-",
				type: "text",
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
				getValue: (p) => getMouse(p)?.build.material ?? "-",
				type: "text",
			},
			{
				key: "coating",
				label: "Revestimento",
				getValue: (p) => getMouse(p)?.build.coating ?? "-",
				type: "text",
			},
			{
				key: "feet",
				label: "Pés",
				getValue: (p) => getMouse(p)?.build.feet ?? "-",
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
				getValue: (p) => getMouse(p)?.software?.name ?? "-",
				type: "text",
			},
			{
				key: "softwareFeatures",
				label: "Recursos",
				getValue: (p) => getMouse(p)?.software?.features?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "platforms",
				label: "Plataformas",
				getValue: (p) => getMouse(p)?.software?.platforms?.join(", ") ?? "-",
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
				getValue: (p) => getMouse(p)?.dimensions.length ?? "-",
				type: "text",
			},
			{
				key: "width",
				label: "Largura",
				getValue: (p) => getMouse(p)?.dimensions.width ?? "-",
				type: "text",
			},
			{
				key: "height",
				label: "Altura",
				getValue: (p) => getMouse(p)?.dimensions.height ?? "-",
				type: "text",
			},
			{
				key: "weight",
				label: "Peso",
				getValue: (p) => getMouse(p)?.dimensions.weight ?? "-",
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
				getValue: (p) => getMouse(p)?.compatibility.join(", ") ?? "-",
				type: "text",
			},
		],
	},
];
