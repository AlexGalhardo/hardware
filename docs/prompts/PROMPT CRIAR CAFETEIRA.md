# Contexto

- Site: <https://alexgalhardo.github.io/tudohardware>
- Os dados dos produtos são salvos em formato JSON

## Tipagem do objeto JSON que você vai criar

```ts
export interface BaseProduct {
  id: string;
  name: string;
  brand: string;
  line?: string;
  model: string;
  detailedModel?: string;
  color?: string;
  image: string;
  price: number;
  releaseDate: string;
  releaseMonth?: string;
  releaseYear?: number;
  origin?: string;
  category: ProductCategory;
  subcategory?: string;
  anatelNumber?: string;
  amazonUrl?: string;
  mercadolivreUrl?: string;
  shopeeUrl?: string;
  alphanumericModel?: string;
  version?: string;
  manufacturer?: string;
}

import { SpecSection } from "../spec-configs";
import { BaseProduct, Product } from "../types";

function isCafeteira(product: Product): product is Cafeteira {
  return product.category === "cafeteiras";
}

export interface Cafeteira extends BaseProduct {
  category: "cafeteiras";
  specs: CafeteiraSpecs;
}

function getCafeteira(p: Product): CafeteiraSpecs | null {
  return isCafeteira(p) ? p.specs : null;
}

export interface CafeteiraSpecs {
  manufacturer:
    | "3 Corações"
    | "Nespresso"
    | "Dolce Gusto"
    | "Oster"
    | "Philips"
    | "Arno"
    | "Black+Decker"
    | "Electrolux"
    | "Mondial"
    | "Cadence"
    | "Eletrolux"
    | "Philco"
    | "Britânia"
    | "Hamilton Beach"
    | "Cuisinart"
    | "De'Longhi"
    | "Breville"
    | "Mr. Coffee"
    | "Keurig"
    | "Outros";
  type:
    | "Espresso"
    | "Expresso Automática"
    | "Expresso Manual"
    | "Filtro"
    | "Italiana"
    | "Prensa Francesa"
    | "Cápsulas"
    | "Coado"
    | "Superautomática"
    | "Semi-automática";
  technology:
    | "Automática"
    | "Manual"
    | "Semi-automática"
    | "Superautomática"
    | "Tradicional";
  powerSource: "Corrente doméstica" | "Bateria" | "Manual";
  capacity: {
    water: string;
    cups: number;
    grains?: string;
  };
  power: {
    watts: number;
    voltage: "110V" | "220V" | "Bivolt";
  };
  pressure: {
    bar: number;
    hasPressure: boolean;
  };
  filters: {
    type: "Permanente" | "Papel" | "Cápsula" | "Nenhum";
    washable: boolean;
    replacement?: string;
  };
  beverages: {
    recommended: string[];
    capsuleCompatible: boolean;
    compatibleCapsules?: string[];
  };
  brewing: {
    preparationTime: string;
    temperature?: {
      min: number;
      max: number;
    };
    cupCapacity: number;
    hasDoubleFaucet: boolean;
  };
  features: {
    hasTimer: boolean;
    hasSteamFunction: boolean;
    hasAntiDrip: boolean;
    hasCupWarmer: boolean;
    hasWaterIndicator: boolean;
    hasAutoClean: boolean;
    hasTemperatureControl: boolean;
    hasDigitalDisplay: boolean;
    hasMilkFrother: boolean;
    hasGrinder: boolean;
    grinderType?: "Cônico" | "Plano" | "Lâminas";
    grinderLevels?: number;
    hasKeepWarm: boolean;
    keepWarmTime?: string;
    hasProgrammableStart: boolean;
    hasStrengthControl: boolean;
    strengthLevels?: number;
    hasAutoShutoff: boolean;
    autoShutoffTime?: string;
    hasWaterFilter: boolean;
    hasDescalingAlert: boolean;
  };
  design: {
    materials: string[];
    color: string;
    coffeeType: "Cápsulas monodose" | "Pó" | "Grãos" | "Ambos";
    isPortable: boolean;
    isBuiltIn: boolean;
    hasRemovableDripTray: boolean;
    hasRemovableWaterTank: boolean;
    waterTankPosition?: "Traseira" | "Lateral" | "Superior";
  };
  dimensions: {
    width: string;
    depth: string;
    height: string;
    weight: string;
  };
  accessories: {
    included: string[];
    interchangeablePanels: boolean;
    hasRemovableDripTray: boolean;
    hasMeasuringSpoon: boolean;
    hasReusableFilter: boolean;
    numberOfCups?: number;
    hasMilkContainer?: boolean;
  };
  electrical: {
    voltage: "110V" | "220V" | "Bivolt";
    frequency: string;
    powerConsumption: string;
    includesBatteries: boolean;
    cableLength?: string;
  };
  maintenance: {
    cleaningFrequency: string;
    descalingFrequency?: string;
    filterReplacement?: string;
    hasRemovableParts: boolean;
    dishwasherSafeParts?: string[];
  };
  certifications: {
    inmetro: boolean;
    anatel?: boolean;
    other?: string[];
  };
  warranty: {
    general: string;
    parts?: string;
    conditions?: string[];
  };
  compatibility: {
    capsuleBrands?: string[];
    cupSizes?: string[];
    coffeeTypes: string[];
  };
  ratings: {
    costBenefit: number | null;
    brewingQuality: number;
    easeOfUse: number;
    easeCleaning: number;
    durability: number;
    features: number;
    design: number;
  };
}

export const cafeteiraSpecs: SpecSection[] = [
  {
    id: "ratings",
    title: "Notas",
    specs: [
      {
        key: "costBenefit",
        label: "Custo-benefício",
        getValue: (p) => getCafeteira(p)?.ratings.costBenefit ?? null,
        type: "rating",
      },
      {
        key: "brewingQuality",
        label: "Qualidade do Café",
        getValue: (p) => getCafeteira(p)?.ratings.brewingQuality ?? null,
        type: "rating",
      },
      {
        key: "easeOfUse",
        label: "Facilidade de Uso",
        getValue: (p) => getCafeteira(p)?.ratings.easeOfUse ?? null,
        type: "rating",
      },
      {
        key: "easeCleaning",
        label: "Facilidade de Limpeza",
        getValue: (p) => getCafeteira(p)?.ratings.easeCleaning ?? null,
        type: "rating",
      },
      {
        key: "durability",
        label: "Durabilidade",
        getValue: (p) => getCafeteira(p)?.ratings.durability ?? null,
        type: "rating",
      },
      {
        key: "features",
        label: "Recursos",
        getValue: (p) => getCafeteira(p)?.ratings.features ?? null,
        type: "rating",
      },
      {
        key: "design",
        label: "Design",
        getValue: (p) => getCafeteira(p)?.ratings.design ?? null,
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
        getValue: (p) => getCafeteira(p)?.manufacturer ?? "-",
        type: "text",
      },
      {
        key: "type",
        label: "Tipo",
        getValue: (p) => getCafeteira(p)?.type ?? "-",
        type: "text",
      },
      {
        key: "technology",
        label: "Tecnologia",
        getValue: (p) => getCafeteira(p)?.technology ?? "-",
        type: "text",
      },
      {
        key: "color",
        label: "Cor",
        getValue: (p) => p.color ?? "-",
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
    id: "capacity",
    title: "Capacidade",
    specs: [
      {
        key: "waterCapacity",
        label: "Capacidade de Água",
        getValue: (p) => getCafeteira(p)?.capacity.water ?? "-",
        type: "text",
      },
      {
        key: "cupCapacity",
        label: "Capacidade de Xícaras",
        getValue: (p) => getCafeteira(p)?.capacity.cups.toString() ?? "-",
        type: "text",
      },
      {
        key: "grainCapacity",
        label: "Capacidade de Grãos",
        getValue: (p) => getCafeteira(p)?.capacity.grains ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "power",
    title: "Alimentação e Potência",
    specs: [
      {
        key: "powerSource",
        label: "Tipo de Alimentação",
        getValue: (p) => getCafeteira(p)?.powerSource ?? "-",
        type: "text",
      },
      {
        key: "watts",
        label: "Potência",
        getValue: (p) => {
          const watts = getCafeteira(p)?.power.watts;
          return watts ? `${watts} W` : "-";
        },
        type: "text",
      },
      {
        key: "voltage",
        label: "Voltagem",
        getValue: (p) => getCafeteira(p)?.power.voltage ?? "-",
        type: "text",
      },
      {
        key: "frequency",
        label: "Frequência",
        getValue: (p) => getCafeteira(p)?.electrical.frequency ?? "-",
        type: "text",
      },
      {
        key: "powerConsumption",
        label: "Consumo de Energia",
        getValue: (p) => getCafeteira(p)?.electrical.powerConsumption ?? "-",
        type: "text",
      },
      {
        key: "cableLength",
        label: "Comprimento do Cabo",
        getValue: (p) => getCafeteira(p)?.electrical.cableLength ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "pressure-brewing",
    title: "Pressão e Preparo",
    specs: [
      {
        key: "pressure",
        label: "Pressão",
        getValue: (p) => {
          const pressure = getCafeteira(p)?.pressure;
          return pressure?.hasPressure ? `${pressure.bar} bar` : "-";
        },
        type: "text",
      },
      {
        key: "hasPressure",
        label: "Possui Pressão",
        getValue: (p) => getCafeteira(p)?.pressure.hasPressure ?? false,
        type: "boolean",
      },
      {
        key: "preparationTime",
        label: "Tempo de Preparo",
        getValue: (p) => getCafeteira(p)?.brewing.preparationTime ?? "-",
        type: "text",
      },
      {
        key: "brewingCupCapacity",
        label: "Capacidade de Preparo",
        getValue: (p) => {
          const capacity = getCafeteira(p)?.brewing.cupCapacity;
          return capacity ? `${capacity} xícara(s)` : "-";
        },
        type: "text",
      },
      {
        key: "doubleFaucet",
        label: "Bocal Duplo",
        getValue: (p) => getCafeteira(p)?.brewing.hasDoubleFaucet ?? false,
        type: "boolean",
      },
      {
        key: "temperatureRange",
        label: "Faixa de Temperatura",
        getValue: (p) => {
          const temp = getCafeteira(p)?.brewing.temperature;
          return temp ? `${temp.min}°C a ${temp.max}°C` : "-";
        },
        type: "text",
      },
    ],
  },
  {
    id: "filters-beverages",
    title: "Filtros e Bebidas",
    specs: [
      {
        key: "filterType",
        label: "Tipo de Filtro",
        getValue: (p) => getCafeteira(p)?.filters.type ?? "-",
        type: "text",
      },
      {
        key: "washableFilter",
        label: "Filtro Lavável",
        getValue: (p) => getCafeteira(p)?.filters.washable ?? false,
        type: "boolean",
      },
      {
        key: "filterReplacement",
        label: "Troca do Filtro",
        getValue: (p) => getCafeteira(p)?.filters.replacement ?? "-",
        type: "text",
      },
      {
        key: "recommendedBeverages",
        label: "Bebidas Recomendadas",
        getValue: (p) =>
          getCafeteira(p)?.beverages.recommended.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "capsuleCompatible",
        label: "Compatível com Cápsulas",
        getValue: (p) => getCafeteira(p)?.beverages.capsuleCompatible ?? false,
        type: "boolean",
      },
      {
        key: "compatibleCapsules",
        label: "Cápsulas Compatíveis",
        getValue: (p) =>
          getCafeteira(p)?.beverages.compatibleCapsules?.join(", ") ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "features-basic",
    title: "Recursos Básicos",
    specs: [
      {
        key: "hasTimer",
        label: "Timer",
        getValue: (p) => getCafeteira(p)?.features.hasTimer ?? false,
        type: "boolean",
      },
      {
        key: "hasSteamFunction",
        label: "Emissão de Vapor",
        getValue: (p) => getCafeteira(p)?.features.hasSteamFunction ?? false,
        type: "boolean",
      },
      {
        key: "hasAntiDrip",
        label: "Antigotejamento",
        getValue: (p) => getCafeteira(p)?.features.hasAntiDrip ?? false,
        type: "boolean",
      },
      {
        key: "hasCupWarmer",
        label: "Aquecimento de Xícaras",
        getValue: (p) => getCafeteira(p)?.features.hasCupWarmer ?? false,
        type: "boolean",
      },
      {
        key: "hasWaterIndicator",
        label: "Indicador de Água",
        getValue: (p) => getCafeteira(p)?.features.hasWaterIndicator ?? false,
        type: "boolean",
      },
      {
        key: "hasAutoClean",
        label: "Limpeza Automática",
        getValue: (p) => getCafeteira(p)?.features.hasAutoClean ?? false,
        type: "boolean",
      },
      {
        key: "hasTemperatureControl",
        label: "Controle de Temperatura",
        getValue: (p) =>
          getCafeteira(p)?.features.hasTemperatureControl ?? false,
        type: "boolean",
      },
      {
        key: "hasDigitalDisplay",
        label: "Tela Digital",
        getValue: (p) => getCafeteira(p)?.features.hasDigitalDisplay ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "features-advanced",
    title: "Recursos Avançados",
    specs: [
      {
        key: "hasMilkFrother",
        label: "Espumador de Leite",
        getValue: (p) => getCafeteira(p)?.features.hasMilkFrother ?? false,
        type: "boolean",
      },
      {
        key: "hasGrinder",
        label: "Moedor Integrado",
        getValue: (p) => getCafeteira(p)?.features.hasGrinder ?? false,
        type: "boolean",
      },
      {
        key: "grinderType",
        label: "Tipo de Moedor",
        getValue: (p) => getCafeteira(p)?.features.grinderType ?? "-",
        type: "text",
      },
      {
        key: "grinderLevels",
        label: "Níveis de Moagem",
        getValue: (p) =>
          getCafeteira(p)?.features.grinderLevels?.toString() ?? "-",
        type: "text",
      },
      {
        key: "hasKeepWarm",
        label: "Manter Aquecido",
        getValue: (p) => getCafeteira(p)?.features.hasKeepWarm ?? false,
        type: "boolean",
      },
      {
        key: "keepWarmTime",
        label: "Tempo Manter Aquecido",
        getValue: (p) => getCafeteira(p)?.features.keepWarmTime ?? "-",
        type: "text",
      },
      {
        key: "hasProgrammableStart",
        label: "Início Programável",
        getValue: (p) =>
          getCafeteira(p)?.features.hasProgrammableStart ?? false,
        type: "boolean",
      },
      {
        key: "hasStrengthControl",
        label: "Controle de Intensidade",
        getValue: (p) => getCafeteira(p)?.features.hasStrengthControl ?? false,
        type: "boolean",
      },
      {
        key: "strengthLevels",
        label: "Níveis de Intensidade",
        getValue: (p) =>
          getCafeteira(p)?.features.strengthLevels?.toString() ?? "-",
        type: "text",
      },
      {
        key: "hasAutoShutoff",
        label: "Desligamento Automático",
        getValue: (p) => getCafeteira(p)?.features.hasAutoShutoff ?? false,
        type: "boolean",
      },
      {
        key: "autoShutoffTime",
        label: "Tempo Desligamento Auto",
        getValue: (p) => getCafeteira(p)?.features.autoShutoffTime ?? "-",
        type: "text",
      },
      {
        key: "hasWaterFilter",
        label: "Filtro de Água",
        getValue: (p) => getCafeteira(p)?.features.hasWaterFilter ?? false,
        type: "boolean",
      },
      {
        key: "hasDescalingAlert",
        label: "Alerta de Descalcificação",
        getValue: (p) => getCafeteira(p)?.features.hasDescalingAlert ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "design",
    title: "Design e Construção",
    specs: [
      {
        key: "materials",
        label: "Materiais da Estrutura",
        getValue: (p) => getCafeteira(p)?.design.materials.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "designColor",
        label: "Cor",
        getValue: (p) => getCafeteira(p)?.design.color ?? "-",
        type: "text",
      },
      {
        key: "coffeeType",
        label: "Tipo de Café",
        getValue: (p) => getCafeteira(p)?.design.coffeeType ?? "-",
        type: "text",
      },
      {
        key: "isPortable",
        label: "Portátil",
        getValue: (p) => getCafeteira(p)?.design.isPortable ?? false,
        type: "boolean",
      },
      {
        key: "isBuiltIn",
        label: "Embutir",
        getValue: (p) => getCafeteira(p)?.design.isBuiltIn ?? false,
        type: "boolean",
      },
      {
        key: "hasRemovableDripTray",
        label: "Bandeja Removível",
        getValue: (p) => getCafeteira(p)?.design.hasRemovableDripTray ?? false,
        type: "boolean",
      },
      {
        key: "hasRemovableWaterTank",
        label: "Reservatório Removível",
        getValue: (p) => getCafeteira(p)?.design.hasRemovableWaterTank ?? false,
        type: "boolean",
      },
      {
        key: "waterTankPosition",
        label: "Posição do Reservatório",
        getValue: (p) => getCafeteira(p)?.design.waterTankPosition ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "dimensions",
    title: "Dimensões e Peso",
    specs: [
      {
        key: "width",
        label: "Largura",
        getValue: (p) => getCafeteira(p)?.dimensions.width ?? "-",
        type: "text",
      },
      {
        key: "depth",
        label: "Profundidade",
        getValue: (p) => getCafeteira(p)?.dimensions.depth ?? "-",
        type: "text",
      },
      {
        key: "height",
        label: "Altura",
        getValue: (p) => getCafeteira(p)?.dimensions.height ?? "-",
        type: "text",
      },
      {
        key: "weight",
        label: "Peso",
        getValue: (p) => getCafeteira(p)?.dimensions.weight ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "accessories",
    title: "Acessórios Inclusos",
    specs: [
      {
        key: "includedAccessories",
        label: "Acessórios Inclusos",
        getValue: (p) =>
          getCafeteira(p)?.accessories.included.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "interchangeablePanels",
        label: "Painéis Intercambiáveis",
        getValue: (p) =>
          getCafeteira(p)?.accessories.interchangeablePanels ?? false,
        type: "boolean",
      },
      {
        key: "removableDripTray",
        label: "Bandeja Coletora Removível",
        getValue: (p) =>
          getCafeteira(p)?.accessories.hasRemovableDripTray ?? false,
        type: "boolean",
      },
      {
        key: "measuringSpoon",
        label: "Colher Dosadora",
        getValue: (p) =>
          getCafeteira(p)?.accessories.hasMeasuringSpoon ?? false,
        type: "boolean",
      },
      {
        key: "reusableFilter",
        label: "Filtro Reutilizável",
        getValue: (p) =>
          getCafeteira(p)?.accessories.hasReusableFilter ?? false,
        type: "boolean",
      },
      {
        key: "numberOfCups",
        label: "Número de Xícaras",
        getValue: (p) =>
          getCafeteira(p)?.accessories.numberOfCups?.toString() ?? "-",
        type: "text",
      },
      {
        key: "hasMilkContainer",
        label: "Recipiente de Leite",
        getValue: (p) => getCafeteira(p)?.accessories.hasMilkContainer ?? false,
        type: "boolean",
      },
      {
        key: "includesBatteries",
        label: "Inclui Pilhas",
        getValue: (p) => getCafeteira(p)?.electrical.includesBatteries ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "maintenance",
    title: "Manutenção",
    specs: [
      {
        key: "cleaningFrequency",
        label: "Frequência de Limpeza",
        getValue: (p) => getCafeteira(p)?.maintenance.cleaningFrequency ?? "-",
        type: "text",
      },
      {
        key: "descalingFrequency",
        label: "Frequência de Descalcificação",
        getValue: (p) => getCafeteira(p)?.maintenance.descalingFrequency ?? "-",
        type: "text",
      },
      {
        key: "maintenanceFilterReplacement",
        label: "Troca de Filtros",
        getValue: (p) => getCafeteira(p)?.maintenance.filterReplacement ?? "-",
        type: "text",
      },
      {
        key: "hasRemovableParts",
        label: "Peças Removíveis",
        getValue: (p) =>
          getCafeteira(p)?.maintenance.hasRemovableParts ?? false,
        type: "boolean",
      },
      {
        key: "dishwasherSafeParts",
        label: "Peças Laváveis na Máquina",
        getValue: (p) =>
          getCafeteira(p)?.maintenance.dishwasherSafeParts?.join(", ") ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "compatibility",
    title: "Compatibilidade",
    specs: [
      {
        key: "capsuleBrands",
        label: "Marcas de Cápsulas Compatíveis",
        getValue: (p) =>
          getCafeteira(p)?.compatibility.capsuleBrands?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "cupSizes",
        label: "Tamanhos de Xícara",
        getValue: (p) =>
          getCafeteira(p)?.compatibility.cupSizes?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "coffeeTypes",
        label: "Tipos de Café Compatíveis",
        getValue: (p) =>
          getCafeteira(p)?.compatibility.coffeeTypes.join(", ") ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "certifications",
    title: "Certificações",
    specs: [
      {
        key: "inmetro",
        label: "INMETRO",
        getValue: (p) => getCafeteira(p)?.certifications.inmetro ?? false,
        type: "boolean",
      },
      {
        key: "anatel",
        label: "ANATEL",
        getValue: (p) => getCafeteira(p)?.certifications.anatel ?? false,
        type: "boolean",
      },
      {
        key: "otherCertifications",
        label: "Outras Certificações",
        getValue: (p) =>
          getCafeteira(p)?.certifications.other?.join(", ") ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "warranty",
    title: "Garantia",
    specs: [
      {
        key: "generalWarranty",
        label: "Garantia Geral",
        getValue: (p) => getCafeteira(p)?.warranty.general ?? "-",
        type: "text",
      },
      {
        key: "partsWarranty",
        label: "Garantia de Peças",
        getValue: (p) => getCafeteira(p)?.warranty.parts ?? "-",
        type: "text",
      },
      {
        key: "warrantyConditions",
        label: "Condições de Garantia",
        getValue: (p) =>
          getCafeteira(p)?.warranty.conditions?.join(", ") ?? "-",
        type: "text",
      },
    ],
  },
];
```

## Exemplo de Objeto Json cafeteira que você deve fazer

```json
{
  "id": "tres-coracoes-luna-preta",
  "name": "Luna",
  "brand": "3 Corações",
  "line": "Espresso",
  "model": "Luna",
  "alphanumericModel": "20911391",
  "color": "Preto",
  "image": "https://http2.mlstatic.com/D_NQ_NP_2X_703405-MLA99854893367_112025-F.webp",
  "price": 0,
  "releaseDate": "2024",
  "releaseYear": 2024,
  "category": "cafeteiras",
  "mercadolivreUrl": "https://mercadolivre.com/sec/2Fwz8on",
  "manufacturer": "3 Corações",
  "specs": {
    "manufacturer": "3 Corações",
    "type": "Espresso",
    "technology": "Automática",
    "powerSource": "Corrente doméstica",
    "capacity": {
      "water": "600 mL",
      "cups": 1,
      "grains": null
    },
    "power": {
      "watts": 1200,
      "voltage": "Bivolt"
    },
    "pressure": {
      "bar": 15,
      "hasPressure": true
    },
    "filters": {
      "type": "Permanente",
      "washable": true,
      "replacement": null
    },
    "beverages": {
      "recommended": [
        "Espresso",
        "Cappuccino",
        "Café Filtrado",
        "Café com Leite",
        "Chocolate Quente",
        "Chás Naturais",
        "Bebidas Cremosas"
      ],
      "capsuleCompatible": true,
      "compatibleCapsules": ["TRES"]
    },
    "brewing": {
      "preparationTime": "30 segundos",
      "temperature": null,
      "cupCapacity": 1,
      "hasDoubleFaucet": false
    },
    "features": {
      "hasTimer": false,
      "hasSteamFunction": false,
      "hasAntiDrip": false,
      "hasCupWarmer": false,
      "hasWaterIndicator": true,
      "hasAutoClean": false,
      "hasTemperatureControl": false,
      "hasDigitalDisplay": true,
      "hasMilkFrother": false,
      "hasGrinder": false,
      "grinderType": null,
      "grinderLevels": null,
      "hasKeepWarm": false,
      "keepWarmTime": null,
      "hasProgrammableStart": false,
      "hasStrengthControl": true,
      "strengthLevels": 3,
      "hasAutoShutoff": true,
      "autoShutoffTime": "Após breve período de inatividade",
      "hasWaterFilter": false,
      "hasDescalingAlert": false
    },
    "design": {
      "materials": ["Plástico ABS", "Aço inoxidável"],
      "color": "Preto",
      "coffeeType": "Cápsulas monodose",
      "isPortable": true,
      "isBuiltIn": false,
      "hasRemovableDripTray": true,
      "hasRemovableWaterTank": true,
      "waterTankPosition": null
    },
    "dimensions": {
      "width": "12,8 cm",
      "depth": "28,3 cm",
      "height": "25,5 cm",
      "weight": "3 kg"
    },
    "accessories": {
      "included": [
        "Painéis intercambiáveis",
        "Bandeja coletora removível",
        "Cápsula de retrolavagem",
        "Certificado de garantia",
        "Guia rápido",
        "Manual"
      ],
      "interchangeablePanels": true,
      "hasRemovableDripTray": true,
      "hasMeasuringSpoon": false,
      "hasReusableFilter": false,
      "numberOfCups": null,
      "hasMilkContainer": false
    },
    "electrical": {
      "voltage": "Bivolt",
      "frequency": "60 Hz",
      "powerConsumption": "1200 W",
      "includesBatteries": false,
      "cableLength": null
    },
    "maintenance": {
      "cleaningFrequency": "Após cada uso (bandeja e reservatório de cápsulas)",
      "descalingFrequency": null,
      "filterReplacement": null,
      "hasRemovableParts": true,
      "dishwasherSafeParts": ["Bandeja coletora"]
    },
    "certifications": {
      "inmetro": true,
      "anatel": false,
      "other": ["Livre de BPA"]
    },
    "warranty": {
      "general": "5 anos",
      "parts": "5 anos",
      "conditions": [
        "Incluindo 90 dias do prazo legal",
        "Válida a partir da data de emissão da nota fiscal"
      ]
    },
    "compatibility": {
      "capsuleBrands": ["TRES"],
      "cupSizes": ["50 ml", "80 ml", "100 ml"],
      "coffeeTypes": ["Cápsulas TRES exclusivamente"]
    },
    "ratings": {
      "costBenefit": 8.5,
      "brewingQuality": 8,
      "easeOfUse": 9,
      "easeCleaning": 7.5,
      "durability": 8,
      "features": 7,
      "design": 8.5
    }
  }
}
```

## Tarefa

- Vou copiar e colar os dados que eu pegar direto das páginas dos produtos aqui no chat para você
- Quando eu passar o nome -> coloque no JSON apenas o modelo do notebook, não coloque junto no nome a marca e especificações técnicas
- Se eu passar um link parecido com esse aqui "<https://mercadolivre.com/sec/2rpCeic>" -> isso quer dizer que você vai colocar esse link no atributo "mercadolivreUrl" do objeto JSON
- Se eu passar um link parecido com esse aqui "<https://http2.mlstatic.com/D_NQ_NP_2X_840134-MLA99989589639_112025-F.webp>" -> isso quer dizer que você vai colocar esse link no atributo "imagem" do objeto JSON
- Nas especificações técnicas, todas que eu não passar diretamente, coloque como null no JSON
- Se eu passar alguma especificação técnica que NÃO esta tipada no typescript que eu passei, me avise, para eu adicionar na tipagem e renderizar no front-end

## Antes de começar a fazer o JSON

- Faça uma busca/pesquisa rápida na internet para pegar especificações técnicas adicionais que eu não passei para deixar o objeto JSON o mais completo possível.
- No atributo ratings do JSON: faça uma busca/pesquisa rápida na internet (web_fetch) sobre esse notebook e coloque você mesmo essas informações, ponderando cada nota de acordo com as pesquisas (benchmarkings, etc)
- Não faça comentários desnecessários no chat para economizar tokens de output.
- Só faça comentários para dizer que tem alguma especificação técnica não tipada no typescript.
- Se você perceber que você já criou um objeto JSON do mesmo produto antes, me avise e pergunte se eu quero continuar.

- Esses são alguns produtos já cadastrados:

```json
"cafeteiras": [
      {
        "name": "Luna",
        "brand": "3 Corações",
        "detailedModel": "Luna",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_703405-MLA99854893367_112025-F.webp"
      },
      {
        "name": "Passione",
        "brand": "3 Corações",
        "detailedModel": "Passione",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_702554-MLA99936325089_112025-F.webp"
      },
      {
        "name": "Essenza Mini",
        "brand": "Nespresso",
        "detailedModel": "C White",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_652965-MLA100059078099_122025-F.webp"
      },
      {
        "name": "Essenza Mini",
        "brand": "Nespresso",
        "detailedModel": "D30-BR3-RE-NE2",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_861961-MLA99899361577_112025-F.webp"
      },
      {
        "name": "CitiZ",
        "brand": "Nespresso",
        "detailedModel": "D113-BR3-BK-NE2",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_879258-MLA99562179084_122025-F.webp"
      },
      {
        "name": "Série 2300 LatteGo",
        "brand": "Philips",
        "detailedModel": "EP2330/33/CINZA",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_910256-MLA99930308533_112025-F.webp"
      },
      {
        "name": "Dolce Crema",
        "brand": "Mondial",
        "detailedModel": "Espresso Dolce Crema",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_935625-MLA99525311366_122025-F.webp"
      },
      {
        "name": "Insta Coffee Portátil",
        "brand": "Neonway",
        "detailedModel": "Insta Coffee",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_890274-MLB101805056037_122025-F-cafeteira-portatil-eletrica-display-digital-capsulas-e-po.webp"
      },
      {
        "name": "Supreme Touch",
        "brand": "Gradiente",
        "detailedModel": "PGCA012",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_875228-MLA99957147193_112025-F.webp"
      },
      {
        "name": "PCF04A",
        "brand": "Philco",
        "detailedModel": "PCF04A",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_815034-MLA99531483428_122025-F.webp"
      },
      {
        "name": "CMM15P",
        "brand": "Midea",
        "detailedModel": "CMM15P",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_604516-MLA100072586257_122025-F.webp"
      },
      {
        "name": "WCM20",
        "brand": "Wap",
        "detailedModel": "WCM20",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_910521-MLA100072886333_122025-F.webp"
      },
      {
        "name": "EP1220",
        "brand": "Philips Walita",
        "detailedModel": "EP1220/02",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_968593-MLA99502704490_112025-F.webp"
      },
      {
        "name": "CAF230",
        "brand": "Cadence",
        "detailedModel": "CAF230",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_995719-MLA99443401184_112025-F.webp"
      },
      {
        "name": "PGCA012",
        "brand": "Gradiente",
        "detailedModel": "PGCA012",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_646340-MLA99443347984_112025-F.webp"
      },
      {
        "name": "Latte Easy",
        "brand": "Gradiente",
        "detailedModel": "Easy Latte Touch",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_898589-MLA81450489289_122024-F.webp"
      },
      {
        "name": "Café Expresso 3 em 1",
        "brand": "Sokany",
        "detailedModel": "Café Expresso 3 em 1",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_739373-MLA88408528483_072025-F.webp"
      },
      {
        "name": "BrewStation Elite",
        "brand": "Hamilton Beach",
        "detailedModel": "48465",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_910347-MLA99525902094_122025-F.webp"
      },
      {
        "name": "KF440",
        "brand": "Reaken",
        "detailedModel": "KF440",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_931225-MLB101035199844_122025-F-cafeteira-eeletrica-automatica-55litro-industrial-de-110v.webp"
      },
      {
        "name": "KF440",
        "brand": "Reaken",
        "detailedModel": "KF440",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_931225-MLB101035199844_122025-F-cafeteira-eeletrica-automatica-55litro-industrial-de-110v.webp"
      }
    ]
```

- Se eu passar dados de um item já cadastrado antes, ou que você já mandou os dados, pare o processo e me pergunte se eu quero continuar mesmo assim.
