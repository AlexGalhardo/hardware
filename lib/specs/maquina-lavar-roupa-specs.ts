import { SpecSection } from "../spec-configs";
import { BaseProduct, Product } from "../types";

function isWashingMachine(product: Product): product is WashingMachine {
	return product.category === "maquinas-lavar-roupas";
}

export interface WashingMachine extends BaseProduct {
	category: "maquinas-lavar-roupas";
	specs: WashingMachineSpecs;
}

function getWashingMachine(p: Product): WashingMachineSpecs | null {
	return isWashingMachine(p) ? p.specs : null;
}

export interface WashingMachineSpecs {
	type: "Automática" | "Semiautomática" | "Manual";
	loadType: "Superior" | "Frontal";
	capacity: {
		washing: string;
		drying?: string;
	};
	isWasherDryer: boolean;
	energyEfficiency?: "A+++" | "A++" | "A+" | "A" | "B" | "C" | "D" | "E" | "F" | "G";
	washing: {
		waterLoadType: "Automática" | "Manual";
		programs: number;
		waterLevels?: number;
		washSystem: "Agitação" | "Impeller" | "Americano" | "Europeu" | "Turbilhão";
		quickWash?: boolean;
		antiWrinkle?: boolean;
		autoAdaptableLoad?: boolean;
		specificPrograms?: string[];
		steamWash?: boolean;
		sanitize?: boolean;
		allergenCycle?: boolean;
		delicateCycle?: boolean;
	};
	spin: {
		hasSpin: boolean;
		speed?: string;
		speedRegulation?: boolean;
		autoBalance?: boolean;
	};
	drying?: {
		type?: "Condensação" | "Ventilação" | "Bomba de Calor";
		hasDrainPump?: boolean;
	};
	technology: {
		inverter?: boolean;
		smartControl?: boolean;
		wifi?: boolean;
		voiceControl?: string[];
		delayedStart?: boolean;
		endAlarm?: boolean;
		loadSensor?: boolean;
		autoDispense?: boolean;
		aiFeatures?: string[];
	};
	temperature: {
		hasRegulation?: boolean;
		waterTemp?: "Quente e Fria" | "Fria" | "Quente";
		options?: string[];
	};
	structure: {
		hasFilter: boolean;
		hasDisplay?: boolean;
		displayType?: "Digital" | "LED" | "Botões de acionamento manual" | "Touch";
		panelLock?: boolean;
		doorLock?: boolean;
		controlType: "Manípulos" | "Botões" | "Touch" | "Misto";
		basketCount?: number;
		basketMaterial: "Aço inoxidável" | "Plástico" | "Porcelana";
		isPortable?: boolean;
		drumLight?: boolean;
	};
	dimensions: {
		height: string;
		width: string;
		depth: string;
		weight: string;
	};
	other?: {
		isIndustrial?: boolean;
		positiveImpact?: boolean;
		warranty?: string;
		color?: string;
		noiseLevel?: string;
		waterConsumption?: string;
		energyConsumption?: string;
		powerInput?: string;
	};
	ratings: {
		costBenefit: number | null;
		washingPerformance: number;
		energyEfficiency: number;
		noiseLevel: number;
		durability: number;
	};
}

export const washingMachineSpecs: SpecSection[] = [
	{
		id: "ratings",
		title: "Notas",
		specs: [
			{
				key: "costBenefit",
				label: "Custo-benefício",
				getValue: (p) => getWashingMachine(p)?.ratings.costBenefit ?? null,
				type: "rating",
			},
			{
				key: "washingPerformance",
				label: "Performance de Lavagem",
				getValue: (p) => getWashingMachine(p)?.ratings.washingPerformance ?? null,
				type: "rating",
			},
			{
				key: "energyEfficiency",
				label: "Eficiência Energética",
				getValue: (p) => getWashingMachine(p)?.ratings.energyEfficiency ?? null,
				type: "rating",
			},
			{
				key: "noiseLevel",
				label: "Nível de Ruído",
				getValue: (p) => getWashingMachine(p)?.ratings.noiseLevel ?? null,
				type: "rating",
			},
			{
				key: "durability",
				label: "Durabilidade",
				getValue: (p) => getWashingMachine(p)?.ratings.durability ?? null,
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
				key: "detailedModel",
				label: "Modelo Detalhado",
				getValue: (p) => p.detailedModel ?? "-",
				type: "text",
			},
			{
				key: "color",
				label: "Cor",
				getValue: (p) => getWashingMachine(p)?.other?.color ?? p.color ?? "-",
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
		id: "specifications",
		title: "Especificações",
		specs: [
			{
				key: "type",
				label: "Tipo",
				getValue: (p) => getWashingMachine(p)?.type ?? "-",
				type: "text",
			},
			{
				key: "loadType",
				label: "Tipo de Carga",
				getValue: (p) => getWashingMachine(p)?.loadType ?? "-",
				type: "text",
			},
			{
				key: "washingCapacity",
				label: "Capacidade de Lavagem",
				getValue: (p) => getWashingMachine(p)?.capacity.washing ?? "-",
				type: "text",
			},
			{
				key: "isWasherDryer",
				label: "Lava e Seca",
				getValue: (p) => getWashingMachine(p)?.isWasherDryer ?? false,
				type: "boolean",
			},
			{
				key: "dryingCapacity",
				label: "Capacidade de Secagem",
				getValue: (p) => getWashingMachine(p)?.capacity.drying ?? "-",
				type: "text",
			},
			{
				key: "energyEfficiency",
				label: "Eficiência Energética",
				getValue: (p) => getWashingMachine(p)?.energyEfficiency ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "washing",
		title: "Lavagem",
		specs: [
			{
				key: "waterLoadType",
				label: "Carga de Água",
				getValue: (p) => getWashingMachine(p)?.washing.waterLoadType ?? "-",
				type: "text",
			},
			{
				key: "programs",
				label: "Programas de Lavagem",
				getValue: (p) => getWashingMachine(p)?.washing.programs?.toString() ?? "-",
				type: "text",
			},
			{
				key: "waterLevels",
				label: "Níveis de Água",
				getValue: (p) => getWashingMachine(p)?.washing.waterLevels?.toString() ?? "-",
				type: "text",
			},
			{
				key: "washSystem",
				label: "Sistema de Lavagem",
				getValue: (p) => getWashingMachine(p)?.washing.washSystem ?? "-",
				type: "text",
			},
			{
				key: "quickWash",
				label: "Lavagem Rápida",
				getValue: (p) => getWashingMachine(p)?.washing.quickWash ?? false,
				type: "boolean",
			},
			{
				key: "antiWrinkle",
				label: "Anti-Rugas",
				getValue: (p) => getWashingMachine(p)?.washing.antiWrinkle ?? false,
				type: "boolean",
			},
			{
				key: "autoAdaptableLoad",
				label: "Carga Auto-Adaptável",
				getValue: (p) => getWashingMachine(p)?.washing.autoAdaptableLoad ?? false,
				type: "boolean",
			},
			{
				key: "steamWash",
				label: "Lavagem a Vapor",
				getValue: (p) => getWashingMachine(p)?.washing.steamWash ?? false,
				type: "boolean",
			},
			{
				key: "sanitize",
				label: "Sanitização",
				getValue: (p) => getWashingMachine(p)?.washing.sanitize ?? false,
				type: "boolean",
			},
			{
				key: "allergenCycle",
				label: "Ciclo Anti-Alérgeno",
				getValue: (p) => getWashingMachine(p)?.washing.allergenCycle ?? false,
				type: "boolean",
			},
			{
				key: "specificPrograms",
				label: "Programas Específicos",
				getValue: (p) => getWashingMachine(p)?.washing.specificPrograms?.join(", ") ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "spin",
		title: "Centrifugação",
		specs: [
			{
				key: "hasSpin",
				label: "Possui Centrifugação",
				getValue: (p) => getWashingMachine(p)?.spin.hasSpin ?? false,
				type: "boolean",
			},
			{
				key: "spinSpeed",
				label: "Velocidade",
				getValue: (p) => getWashingMachine(p)?.spin.speed ?? "-",
				type: "text",
			},
			{
				key: "speedRegulation",
				label: "Regulação de Velocidade",
				getValue: (p) => getWashingMachine(p)?.spin.speedRegulation ?? false,
				type: "boolean",
			},
			{
				key: "autoBalance",
				label: "Auto-Balanceamento",
				getValue: (p) => getWashingMachine(p)?.spin.autoBalance ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "drying",
		title: "Secagem",
		specs: [
			{
				key: "dryingType",
				label: "Tipo de Secagem",
				getValue: (p) => getWashingMachine(p)?.drying?.type ?? "-",
				type: "text",
			},
			{
				key: "drainPump",
				label: "Bomba de Drenagem",
				getValue: (p) => getWashingMachine(p)?.drying?.hasDrainPump ?? false,
				type: "boolean",
			},
		],
	},
	{
		id: "technology",
		title: "Tecnologia",
		specs: [
			{
				key: "inverter",
				label: "Tecnologia Inverter",
				getValue: (p) => getWashingMachine(p)?.technology.inverter ?? false,
				type: "boolean",
			},
			{
				key: "smartControl",
				label: "Controle Inteligente",
				getValue: (p) => getWashingMachine(p)?.technology.smartControl ?? false,
				type: "boolean",
			},
			{
				key: "wifi",
				label: "Wi-Fi",
				getValue: (p) => getWashingMachine(p)?.technology.wifi ?? false,
				type: "boolean",
			},
			{
				key: "voiceControl",
				label: "Controle por Voz",
				getValue: (p) => getWashingMachine(p)?.technology.voiceControl?.join(", ") ?? "-",
				type: "text",
			},
			{
				key: "delayedStart",
				label: "Início Programado",
				getValue: (p) => getWashingMachine(p)?.technology.delayedStart ?? false,
				type: "boolean",
			},
			{
				key: "endAlarm",
				label: "Alarme de Finalização",
				getValue: (p) => getWashingMachine(p)?.technology.endAlarm ?? false,
				type: "boolean",
			},
			{
				key: "loadSensor",
				label: "Sensor de Carga",
				getValue: (p) => getWashingMachine(p)?.technology.loadSensor ?? false,
				type: "boolean",
			},
			{
				key: "autoDispense",
				label: "Dispenser Automático",
				getValue: (p) => getWashingMachine(p)?.technology.autoDispense ?? false,
				type: "boolean",
			},
			{
				key: "aiFeatures",
				label: "Recursos de IA",
				getValue: (p) => getWashingMachine(p)?.technology.aiFeatures?.join(", ") ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "temperature",
		title: "Temperatura",
		specs: [
			{
				key: "hasRegulation",
				label: "Regulador de Temperatura",
				getValue: (p) => getWashingMachine(p)?.temperature.hasRegulation ?? false,
				type: "boolean",
			},
			{
				key: "waterTemp",
				label: "Temperatura da Água",
				getValue: (p) => getWashingMachine(p)?.temperature.waterTemp ?? "-",
				type: "text",
			},
			{
				key: "tempOptions",
				label: "Opções de Temperatura",
				getValue: (p) => getWashingMachine(p)?.temperature.options?.join(", ") ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "structure",
		title: "Estrutura",
		specs: [
			{
				key: "hasFilter",
				label: "Filtro",
				getValue: (p) => getWashingMachine(p)?.structure.hasFilter ?? false,
				type: "boolean",
			},
			{
				key: "hasDisplay",
				label: "Display",
				getValue: (p) => getWashingMachine(p)?.structure.hasDisplay ?? false,
				type: "boolean",
			},
			{
				key: "displayType",
				label: "Tipo de Display",
				getValue: (p) => getWashingMachine(p)?.structure.displayType ?? "-",
				type: "text",
			},
			{
				key: "panelLock",
				label: "Bloqueio de Painel",
				getValue: (p) => getWashingMachine(p)?.structure.panelLock ?? false,
				type: "boolean",
			},
			{
				key: "doorLock",
				label: "Trava de Segurança",
				getValue: (p) => getWashingMachine(p)?.structure.doorLock ?? false,
				type: "boolean",
			},
			{
				key: "controlType",
				label: "Tipo de Controle",
				getValue: (p) => getWashingMachine(p)?.structure.controlType ?? "-",
				type: "text",
			},
			{
				key: "basketCount",
				label: "Quantidade de Cestos",
				getValue: (p) => getWashingMachine(p)?.structure.basketCount?.toString() ?? "-",
				type: "text",
			},
			{
				key: "basketMaterial",
				label: "Material do Cesto",
				getValue: (p) => getWashingMachine(p)?.structure.basketMaterial ?? "-",
				type: "text",
			},
			{
				key: "isPortable",
				label: "Portátil",
				getValue: (p) => getWashingMachine(p)?.structure.isPortable ?? false,
				type: "boolean",
			},
			{
				key: "drumLight",
				label: "Luz no Tambor",
				getValue: (p) => getWashingMachine(p)?.structure.drumLight ?? false,
				type: "boolean",
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
				getValue: (p) => getWashingMachine(p)?.dimensions.height ?? "-",
				type: "text",
			},
			{
				key: "width",
				label: "Largura",
				getValue: (p) => getWashingMachine(p)?.dimensions.width ?? "-",
				type: "text",
			},
			{
				key: "depth",
				label: "Profundidade",
				getValue: (p) => getWashingMachine(p)?.dimensions.depth ?? "-",
				type: "text",
			},
			{
				key: "weight",
				label: "Peso",
				getValue: (p) => getWashingMachine(p)?.dimensions.weight ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "consumption",
		title: "Consumo",
		specs: [
			{
				key: "waterConsumption",
				label: "Consumo de Água",
				getValue: (p) => getWashingMachine(p)?.other?.waterConsumption ?? "-",
				type: "text",
			},
			{
				key: "energyConsumption",
				label: "Consumo de Energia",
				getValue: (p) => getWashingMachine(p)?.other?.energyConsumption ?? "-",
				type: "text",
			},
			{
				key: "powerInput",
				label: "Potência",
				getValue: (p) => getWashingMachine(p)?.other?.powerInput ?? "-",
				type: "text",
			},
		],
	},
	{
		id: "other",
		title: "Outros",
		specs: [
			{
				key: "isIndustrial",
				label: "Industrial",
				getValue: (p) => getWashingMachine(p)?.other?.isIndustrial ?? false,
				type: "boolean",
			},
			{
				key: "positiveImpact",
				label: "Impacto Positivo",
				getValue: (p) => getWashingMachine(p)?.other?.positiveImpact ?? false,
				type: "boolean",
			},
			{
				key: "noiseLevel",
				label: "Nível de Ruído",
				getValue: (p) => getWashingMachine(p)?.other?.noiseLevel ?? "-",
				type: "text",
			},
			{
				key: "warranty",
				label: "Garantia",
				getValue: (p) => getWashingMachine(p)?.other?.warranty ?? "-",
				type: "text",
			},
		],
	},
];
