import { SpecSection } from "../spec-configs";
import { BaseProduct, Product } from "../types";

function isMicroondas(product: Product): product is Microondas {
	return product.category === "microondas";
}

export interface Microondas extends BaseProduct {
	category: "microondas";
	specs: MicroondasSpecs;
}

function getMicroondas(p: Product): MicroondasSpecs | null {
	return isMicroondas(p) ? p.specs : null;
}

export interface MicroondasSpecs {
	type: "Solo" | "Com Grill" | "Com Convecção" | "De Embutir";
	capacity: {
		liters: number;
		familySize?: string;
	};
	power: {
		microwave: number;
		grill?: number;
		convection?: number;
		voltage: string;
		frequency?: string;
	};
	turntable: {
		diameter?: string;
		removable?: boolean;
	};
	powerLevels: number;
	programs: {
		preset?: number;
		autoDefrost?: boolean;
		autoReheat?: boolean;
		autoCook?: boolean;
		programs?: string[];
	};
	control: {
		type: "Digital" | "Mecânico" | "Touch";
		display?: string;
		childLock?: boolean;
		clock?: boolean;
	};
	features: {
		grill?: boolean;
		convection?: boolean;
		steamFunction?: boolean;
		crisper?: boolean;
		sensor?: boolean;
		inverter?: boolean;
		ecoMode?: boolean;
		keepWarm?: boolean;
		quickStart?: boolean;
	};
	interior: {
		material?: string;
		coating?: string;
		light?: boolean;
	};
	door: {
		type?: "Drop-down" | "Side-opening";
		window?: boolean;
	};
	dimensions: {
		external: {
			width: string;
			height: string;
			depth: string;
		};
		internal: {
			width?: string;
			height?: string;
			depth?: string;
		};
		weight: string;
	};
	safety: {
		childLock?: boolean;
		doorSafety?: boolean;
		overheatProtection?: boolean;
	};
	cleaning: {
		steamClean?: boolean;
		easyClean?: boolean;
		removableParts?: string[];
	};
	ratings: {
		costBenefit: number | null;
		heatingPerformance: number;
		easeOfUse: number;
		capacity: number;
		features: number;
	};
}

export const microondasSpecs: SpecSection[] = [
	{
		id: "ratings",
		title: "Notas",
		specs: [
			{
				key: "costBenefit",
				label: "Custo-benefício",
				getValue: (p) => getMicroondas(p)?.ratings.costBenefit ?? null,
				type: "rating",
			},
			{
				key: "heatingPerformance",
				label: "Performance de Aquecimento",
				getValue: (p) => getMicroondas(p)?.ratings.heatingPerformance ?? null,
				type: "rating",
			},
			{
				key: "easeOfUse",
				label: "Facilidade de Uso",
				getValue: (p) => getMicroondas(p)?.ratings.easeOfUse ?? null,
				type: "rating",
			},
			{
				key: "capacityRating",
				label: "Capacidade",
				getValue: (p) => getMicroondas(p)?.ratings.capacity ?? null,
				type: "rating",
			},
			{
				key: "features",
				label: "Recursos",
				getValue: (p) => getMicroondas(p)?.ratings.features ?? null,
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
			{ key: "type", label: "Tipo", getValue: (p) => getMicroondas(p)?.type ?? "-", type: "text" },
			{ key: "releaseDate", label: "Lançamento", getValue: (p) => p.releaseDate ?? "-", type: "text" },
			{ key: "releaseYear", label: "Ano", getValue: (p) => p.releaseYear?.toString() ?? "-", type: "text" },
		],
	},
	{
		id: "capacity",
		title: "Capacidade",
		specs: [
			{
				key: "liters",
				label: "Litros",
				getValue: (p) => getMicroondas(p)?.capacity.liters.toString() ?? "-",
				type: "text",
			},
			{
				key: "familySize",
				label: "Tamanho da Família",
				getValue: (p) => getMicroondas(p)?.capacity.familySize ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "power",
		title: "Potência",
		specs: [
			{
				key: "microwavePower",
				label: "Potência Micro-ondas",
				getValue: (p) => {
					const power = getMicroondas(p)?.power.microwave;
					return power ? `${power}W` : "-";
				},
				type: "text",
			},
			{
				key: "grillPower",
				label: "Potência Grill",
				getValue: (p) => {
					const power = getMicroondas(p)?.power.grill;
					return power ? `${power}W` : "-";
				},
				type: "text",
			},
			{
				key: "convectionPower",
				label: "Potência Convecção",
				getValue: (p) => {
					const power = getMicroondas(p)?.power.convection;
					return power ? `${power}W` : "-";
				},
				type: "text",
			},
			{
				key: "voltage",
				label: "Voltagem",
				getValue: (p) => getMicroondas(p)?.power.voltage ?? "-",
				type: "text",
			},
			{
				key: "frequency",
				label: "Frequência",
				getValue: (p) => getMicroondas(p)?.power.frequency ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "turntable",
		title: "Prato Giratório",
		specs: [
			{
				key: "diameter",
				label: "Diâmetro",
				getValue: (p) => getMicroondas(p)?.turntable.diameter ?? "-",
				type: "text",
			},
			{
				key: "removable",
				label: "Removível",
				getValue: (p) => getMicroondas(p)?.turntable.removable ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "powerLevels",
		title: "Níveis de Potência",
		specs: [
			{
				key: "powerLevels",
				label: "Níveis",
				getValue: (p) => getMicroondas(p)?.powerLevels.toString() ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "programs",
		title: "Programas",
		specs: [
			{
				key: "preset",
				label: "Programas Pré-definidos",
				getValue: (p) => getMicroondas(p)?.programs.preset?.toString() ?? "-",
				type: "text",
			},
			{
				key: "autoDefrost",
				label: "Descongelamento Automático",
				getValue: (p) => getMicroondas(p)?.programs.autoDefrost ?? false,
				type: "boolean",
			},
			{
				key: "autoReheat",
				label: "Reaquecimento Automático",
				getValue: (p) => getMicroondas(p)?.programs.autoReheat ?? false,
				type: "boolean",
			},
			{
				key: "autoCook",
				label: "Cozimento Automático",
				getValue: (p) => getMicroondas(p)?.programs.autoCook ?? false,
				type: "boolean",
			},
			{
				key: "programsList",
				label: "Lista de Programas",
				getValue: (p) => getMicroondas(p)?.programs.programs?.join(", ") ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "control",
		title: "Controle",
		specs: [
			{
				key: "controlType",
				label: "Tipo",
				getValue: (p) => getMicroondas(p)?.control.type ?? "-",
				type: "text",
			},
			{
				key: "display",
				label: "Display",
				getValue: (p) => getMicroondas(p)?.control.display ?? "-",
				type: "text",
			},
			{
				key: "childLock",
				label: "Trava de Segurança",
				getValue: (p) => getMicroondas(p)?.control.childLock ?? false,
				type: "boolean",
			},
			{
				key: "clock",
				label: "Relógio",
				getValue: (p) => getMicroondas(p)?.control.clock ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "features",
		title: "Recursos",
		specs: [
			{
				key: "grill",
				label: "Grill",
				getValue: (p) => getMicroondas(p)?.features.grill ?? false,
				type: "boolean",
			},
			{
				key: "convection",
				label: "Convecção",
				getValue: (p) => getMicroondas(p)?.features.convection ?? false,
				type: "boolean",
			},
			{
				key: "steamFunction",
				label: "Função Vapor",
				getValue: (p) => getMicroondas(p)?.features.steamFunction ?? false,
				type: "boolean",
			},
			{
				key: "crisper",
				label: "Crisper",
				getValue: (p) => getMicroondas(p)?.features.crisper ?? false,
				type: "boolean",
			},
			{
				key: "sensor",
				label: "Sensor",
				getValue: (p) => getMicroondas(p)?.features.sensor ?? false,
				type: "boolean",
			},
			{
				key: "inverter",
				label: "Inverter",
				getValue: (p) => getMicroondas(p)?.features.inverter ?? false,
				type: "boolean",
			},
			{
				key: "ecoMode",
				label: "Modo Eco",
				getValue: (p) => getMicroondas(p)?.features.ecoMode ?? false,
				type: "boolean",
			},
			{
				key: "keepWarm",
				label: "Manter Aquecido",
				getValue: (p) => getMicroondas(p)?.features.keepWarm ?? false,
				type: "boolean",
			},
			{
				key: "quickStart",
				label: "Início Rápido",
				getValue: (p) => getMicroondas(p)?.features.quickStart ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "interior",
		title: "Interior",
		specs: [
			{
				key: "material",
				label: "Material",
				getValue: (p) => getMicroondas(p)?.interior.material ?? "-",
				type: "text",
			},
			{
				key: "coating",
				label: "Revestimento",
				getValue: (p) => getMicroondas(p)?.interior.coating ?? "-",
				type: "text",
			},
			{
				key: "light",
				label: "Iluminação",
				getValue: (p) => getMicroondas(p)?.interior.light ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "door",
		title: "Porta",
		specs: [
			{
				key: "doorType",
				label: "Tipo",
				getValue: (p) => getMicroondas(p)?.door.type ?? "-",
				type: "text",
			},
			{
				key: "window",
				label: "Janela",
				getValue: (p) => getMicroondas(p)?.door.window ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "dimensions",
		title: "Dimensões",
		specs: [
			{
				key: "externalWidth",
				label: "Largura Externa",
				getValue: (p) => getMicroondas(p)?.dimensions.external.width ?? "-",
				type: "text",
			},
			{
				key: "externalHeight",
				label: "Altura Externa",
				getValue: (p) => getMicroondas(p)?.dimensions.external.height ?? "-",
				type: "text",
			},
			{
				key: "externalDepth",
				label: "Profundidade Externa",
				getValue: (p) => getMicroondas(p)?.dimensions.external.depth ?? "-",
				type: "text",
			},
			{
				key: "internalWidth",
				label: "Largura Interna",
				getValue: (p) => getMicroondas(p)?.dimensions.internal.width ?? "-",
				type: "text",
			},
			{
				key: "internalHeight",
				label: "Altura Interna",
				getValue: (p) => getMicroondas(p)?.dimensions.internal.height ?? "-",
				type: "text",
			},
			{
				key: "internalDepth",
				label: "Profundidade Interna",
				getValue: (p) => getMicroondas(p)?.dimensions.internal.depth ?? "-",
				type: "text",
			},
			{
				key: "weight",
				label: "Peso",
				getValue: (p) => getMicroondas(p)?.dimensions.weight ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "safety",
		title: "Segurança",
		specs: [
			{
				key: "safetyChildLock",
				label: "Trava de Segurança",
				getValue: (p) => getMicroondas(p)?.safety.childLock ?? false,
				type: "boolean",
			},
			{
				key: "doorSafety",
				label: "Segurança da Porta",
				getValue: (p) => getMicroondas(p)?.safety.doorSafety ?? false,
				type: "boolean",
			},
			{
				key: "overheatProtection",
				label: "Proteção contra Superaquecimento",
				getValue: (p) => getMicroondas(p)?.safety.overheatProtection ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "cleaning",
		title: "Limpeza",
		specs: [
			{
				key: "steamClean",
				label: "Limpeza a Vapor",
				getValue: (p) => getMicroondas(p)?.cleaning.steamClean ?? false,
				type: "boolean",
			},
			{
				key: "easyClean",
				label: "Limpeza Fácil",
				getValue: (p) => getMicroondas(p)?.cleaning.easyClean ?? false,
				type: "boolean",
			},
			{
				key: "removableParts",
				label: "Peças Removíveis",
				getValue: (p) => getMicroondas(p)?.cleaning.removableParts?.join(", ") ?? "-",
				type: "text",
			},
		],
	},
];
