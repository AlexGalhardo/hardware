# Contexto

- Site: <https://tudohardware.com>
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

function isArCondicionado(product: Product): product is ArCondicionado {
  return product.category === "ar-condicionado";
}

export interface ArCondicionado extends BaseProduct {
  category: "ar-condicionado";
  specs: ArCondicionadoSpecs;
}

function getArCondicionado(p: Product): ArCondicionadoSpecs | null {
  return isArCondicionado(p) ? p.specs : null;
}

export interface ArCondicionadoSpecs {
  manufacturer:
    | "LG"
    | "Samsung"
    | "Midea"
    | "Electrolux"
    | "Daikin"
    | "Gree"
    | "Carrier"
    | "Fujitsu"
    | "Springer"
    | "Philco"
    | "Consul"
    | "Elgin"
    | "Outros";
  type:
    | "Split"
    | "Split Hi-Wall"
    | "Split Piso Teto"
    | "Cassete"
    | "Janela"
    | "Portátil"
    | "Multi-Split"
    | "VRF";
  technology: "Inverter" | "On/Off" | "Dual Inverter" | "Digital Inverter";
  capacity: {
    btu: number; // 9000, 12000, 18000, 24000, 30000
    watts: number;
    coverage: {
      minArea: number; // m²
      maxArea: number; // m²
      idealArea: number; // m²
    };
  };
  efficiency: {
    energyClass: "A" | "B" | "C" | "D" | "E";
    eer?: number; // Energy Efficiency Ratio
    cop?: number; // Coefficient of Performance
    procelSeal?: string;
    annualConsumption?: string; // kWh/ano
  };
  cooling: {
    capacity: string; // BTU/h
    powerConsumption: string; // Watts
    eer?: number;
    operatingRange: {
      minTemp: number; // °C
      maxTemp: number; // °C
    };
  };
  heating?: {
    capacity: string; // BTU/h
    powerConsumption: string; // Watts
    cop?: number;
    operatingRange: {
      minTemp: number; // °C
      maxTemp: number; // °C
    };
  };
  electrical: {
    voltage: "110V" | "220V" | "Bivolt";
    phases: "Monofásico" | "Bifásico" | "Trifásico";
    frequency: string; // 60Hz
    powerConsumption: {
      cooling: string;
      heating?: string;
      standby?: string;
    };
    currentRating: string; // Amperes
    wireGauge?: string;
    circuitBreaker?: string;
  };
  refrigerant: {
    type: string; // R-410A, R-32, R-290
    amount: string; // gramas
    gwp?: number; // Global Warming Potential
    environmentalImpact: "Baixo" | "Médio" | "Alto";
  };
  airflow: {
    indoorUnit: {
      coolingMode: string; // m³/h
      heatingMode?: string; // m³/h
      fanSpeeds: number;
      autoMode: boolean;
    };
    outdoorUnit?: {
      airflow: string; // m³/h
    };
  };
  noise: {
    indoorUnit: {
      min: number; // dB(A)
      max: number; // dB(A)
      silentMode?: number; // dB(A)
    };
    outdoorUnit: {
      level: number; // dB(A)
    };
  };
  filters: {
    types: string[]; // "Anti-poeira", "Anti-bacteriano", "HEPA", "Carvão Ativado", "Ionizador"
    washable: boolean;
    replacement?: string; // Período de troca
  };
  features: {
    wifi: boolean;
    smartControl: boolean;
    voiceControl?: string[]; // "Alexa", "Google Assistant"
    mobileApp?: string;
    sleepMode: boolean;
    ecoMode: boolean;
    turboMode: boolean;
    dryMode: boolean;
    fanMode: boolean;
    autoClean: boolean;
    autoRestart: boolean;
    timer: boolean;
    timerHours?: number;
    display: boolean;
    displayType?: string; // "LED", "LCD"
    remoteControl: boolean;
    swingHorizontal: boolean;
    swingVertical: boolean;
    swingAuto: boolean;
    ionizer: boolean;
    airPurifier: boolean;
    dehumidifier: boolean;
    followMe?: boolean;
    iFeelSensor?: boolean;
    coldPlasma?: boolean;
    childLock: boolean;
  };
  indoorUnit: {
    dimensions: {
      width: string; // mm
      height: string; // mm
      depth: string; // mm
    };
    weight: string; // kg
    color?: string;
    material?: string;
    displayLocation?: string;
    installation: "Parede" | "Teto" | "Piso" | "Embutido" | "Janela";
  };
  outdoorUnit: {
    dimensions: {
      width: string; // mm
      height: string; // mm
      depth: string; // mm
    };
    weight: string; // kg
    material?: string;
    compressor: {
      type: string; // "Rotativo", "Scroll", "Pistão"
      brand?: string;
    };
    protection: {
      anticorrosion: boolean;
      weatherproof: boolean;
      ipRating?: string;
    };
  };
  installation: {
    type: string; // "Split", "Janela", etc
    tubeLength: {
      included: string; // metros
      maximum: string; // metros
    };
    heightDifference?: string; // metros (diferença de altura entre unidades)
    drain: {
      type: string; // "Gravidade", "Bomba"
      included: boolean;
    };
    mounting: {
      bracket: boolean;
      screws: boolean;
      template: boolean;
    };
    difficulty: "Fácil" | "Média" | "Difícil" | "Profissional";
    estimatedTime?: string;
    professionalRequired: boolean;
  };
  warranty: {
    general: string; // anos
    compressor?: string; // anos
    parts?: string;
    labor?: string;
    conditions?: string[];
  };
  certifications: {
    inmetro: boolean;
    procel?: string;
    iso?: string[];
    ansi?: boolean;
    other?: string[];
  };
  compatibility?: {
    exteriorUnits?: string[];
    smartHome?: string[];
    voltageRange?: string;
  };
  maintenance: {
    filterCleaning: string; // Frequência recomendada
    professionalService: string; // Frequência recomendada
    gasRefill?: string;
    estimatedLifespan?: string;
  };
  bundled?: {
    remoteControl: boolean;
    batteries?: boolean;
    installationKit?: boolean;
    drainHose?: boolean;
    sealingKit?: boolean;
    manual: boolean;
    warrantyCard: boolean;
    accessories?: string[];
  };
  environment: {
    operatingTemp: {
      cooling: {
        min: number; // °C
        max: number; // °C
      };
      heating?: {
        min: number; // °C
        max: number; // °C
      };
    };
    operatingHumidity?: {
      min: number; // %
      max: number; // %
    };
    recommendedUse?: string[];
  };
  ratings: {
    costBenefit: number | null;
    efficiency: number;
    quietness: number;
    coolingPower: number;
    features: number;
    durability: number;
    easeOfUse: number;
  };
}

export const arCondicionadoSpecs: SpecSection[] = [
  {
    id: "ratings",
    title: "Notas",
    specs: [
      {
        key: "costBenefit",
        label: "Custo-benefício",
        getValue: (p) => getArCondicionado(p)?.ratings.costBenefit ?? null,
        type: "rating",
      },
      {
        key: "efficiency",
        label: "Eficiência Energética",
        getValue: (p) => getArCondicionado(p)?.ratings.efficiency ?? null,
        type: "rating",
      },
      {
        key: "quietness",
        label: "Silenciosidade",
        getValue: (p) => getArCondicionado(p)?.ratings.quietness ?? null,
        type: "rating",
      },
      {
        key: "coolingPower",
        label: "Potência de Refrigeração",
        getValue: (p) => getArCondicionado(p)?.ratings.coolingPower ?? null,
        type: "rating",
      },
      {
        key: "features",
        label: "Recursos",
        getValue: (p) => getArCondicionado(p)?.ratings.features ?? null,
        type: "rating",
      },
      {
        key: "durability",
        label: "Durabilidade",
        getValue: (p) => getArCondicionado(p)?.ratings.durability ?? null,
        type: "rating",
      },
      {
        key: "easeOfUse",
        label: "Facilidade de Uso",
        getValue: (p) => getArCondicionado(p)?.ratings.easeOfUse ?? null,
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
        getValue: (p) => getArCondicionado(p)?.manufacturer ?? "-",
        type: "text",
      },
      {
        key: "type",
        label: "Tipo",
        getValue: (p) => getArCondicionado(p)?.type ?? "-",
        type: "text",
      },
      {
        key: "technology",
        label: "Tecnologia",
        getValue: (p) => getArCondicionado(p)?.technology ?? "-",
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
        key: "btu",
        label: "Capacidade (BTU/h)",
        getValue: (p) =>
          getArCondicionado(p)?.capacity.btu.toLocaleString() ?? "-",
        type: "text",
      },
      {
        key: "watts",
        label: "Potência (Watts)",
        getValue: (p) =>
          getArCondicionado(p)?.capacity.watts.toLocaleString() ?? "-",
        type: "text",
      },
      {
        key: "minArea",
        label: "Área Mínima",
        getValue: (p) => {
          const area = getArCondicionado(p)?.capacity.coverage.minArea;
          return area ? `${area} m²` : "-";
        },
        type: "text",
      },
      {
        key: "maxArea",
        label: "Área Máxima",
        getValue: (p) => {
          const area = getArCondicionado(p)?.capacity.coverage.maxArea;
          return area ? `${area} m²` : "-";
        },
        type: "text",
      },
      {
        key: "idealArea",
        label: "Área Ideal",
        getValue: (p) => {
          const area = getArCondicionado(p)?.capacity.coverage.idealArea;
          return area ? `${area} m²` : "-";
        },
        type: "text",
      },
    ],
  },
  {
    id: "efficiency",
    title: "Eficiência Energética",
    specs: [
      {
        key: "energyClass",
        label: "Classe Energética",
        getValue: (p) => getArCondicionado(p)?.efficiency.energyClass ?? "-",
        type: "text",
      },
      {
        key: "procelSeal",
        label: "Selo Procel",
        getValue: (p) => getArCondicionado(p)?.efficiency.procelSeal ?? "-",
        type: "text",
      },
      {
        key: "eer",
        label: "EER (Eficiência)",
        getValue: (p) =>
          getArCondicionado(p)?.efficiency.eer?.toString() ?? "-",
        type: "text",
      },
      {
        key: "cop",
        label: "COP (Aquecimento)",
        getValue: (p) =>
          getArCondicionado(p)?.efficiency.cop?.toString() ?? "-",
        type: "text",
      },
      {
        key: "annualConsumption",
        label: "Consumo Anual Estimado",
        getValue: (p) =>
          getArCondicionado(p)?.efficiency.annualConsumption ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "cooling",
    title: "Refrigeração",
    specs: [
      {
        key: "coolingCapacity",
        label: "Capacidade de Refrigeração",
        getValue: (p) => getArCondicionado(p)?.cooling.capacity ?? "-",
        type: "text",
      },
      {
        key: "coolingPower",
        label: "Consumo em Refrigeração",
        getValue: (p) => getArCondicionado(p)?.cooling.powerConsumption ?? "-",
        type: "text",
      },
      {
        key: "coolingEER",
        label: "EER Refrigeração",
        getValue: (p) => getArCondicionado(p)?.cooling.eer?.toString() ?? "-",
        type: "text",
      },
      {
        key: "coolingTempRange",
        label: "Faixa de Temperatura",
        getValue: (p) => {
          const range = getArCondicionado(p)?.cooling.operatingRange;
          return range ? `${range.minTemp}°C a ${range.maxTemp}°C` : "-";
        },
        type: "text",
      },
    ],
  },
  {
    id: "heating",
    title: "Aquecimento",
    specs: [
      {
        key: "heatingCapacity",
        label: "Capacidade de Aquecimento",
        getValue: (p) => getArCondicionado(p)?.heating?.capacity ?? "-",
        type: "text",
      },
      {
        key: "heatingPower",
        label: "Consumo em Aquecimento",
        getValue: (p) => getArCondicionado(p)?.heating?.powerConsumption ?? "-",
        type: "text",
      },
      {
        key: "heatingCOP",
        label: "COP Aquecimento",
        getValue: (p) => getArCondicionado(p)?.heating?.cop?.toString() ?? "-",
        type: "text",
      },
      {
        key: "heatingTempRange",
        label: "Faixa de Temperatura",
        getValue: (p) => {
          const range = getArCondicionado(p)?.heating?.operatingRange;
          return range ? `${range.minTemp}°C a ${range.maxTemp}°C` : "-";
        },
        type: "text",
      },
    ],
  },
  {
    id: "electrical",
    title: "Elétrica",
    specs: [
      {
        key: "voltage",
        label: "Voltagem",
        getValue: (p) => getArCondicionado(p)?.electrical.voltage ?? "-",
        type: "text",
      },
      {
        key: "phases",
        label: "Fases",
        getValue: (p) => getArCondicionado(p)?.electrical.phases ?? "-",
        type: "text",
      },
      {
        key: "frequency",
        label: "Frequência",
        getValue: (p) => getArCondicionado(p)?.electrical.frequency ?? "-",
        type: "text",
      },
      {
        key: "powerCooling",
        label: "Consumo Refrigeração",
        getValue: (p) =>
          getArCondicionado(p)?.electrical.powerConsumption.cooling ?? "-",
        type: "text",
      },
      {
        key: "powerHeating",
        label: "Consumo Aquecimento",
        getValue: (p) =>
          getArCondicionado(p)?.electrical.powerConsumption.heating ?? "-",
        type: "text",
      },
      {
        key: "currentRating",
        label: "Corrente Nominal",
        getValue: (p) => getArCondicionado(p)?.electrical.currentRating ?? "-",
        type: "text",
      },
      {
        key: "wireGauge",
        label: "Bitola do Fio",
        getValue: (p) => getArCondicionado(p)?.electrical.wireGauge ?? "-",
        type: "text",
      },
      {
        key: "circuitBreaker",
        label: "Disjuntor Recomendado",
        getValue: (p) => getArCondicionado(p)?.electrical.circuitBreaker ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "refrigerant",
    title: "Gás Refrigerante",
    specs: [
      {
        key: "refrigerantType",
        label: "Tipo de Gás",
        getValue: (p) => getArCondicionado(p)?.refrigerant.type ?? "-",
        type: "text",
      },
      {
        key: "refrigerantAmount",
        label: "Quantidade",
        getValue: (p) => getArCondicionado(p)?.refrigerant.amount ?? "-",
        type: "text",
      },
      {
        key: "gwp",
        label: "GWP (Potencial de Aquecimento)",
        getValue: (p) =>
          getArCondicionado(p)?.refrigerant.gwp?.toString() ?? "-",
        type: "text",
      },
      {
        key: "environmentalImpact",
        label: "Impacto Ambiental",
        getValue: (p) =>
          getArCondicionado(p)?.refrigerant.environmentalImpact ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "airflow",
    title: "Fluxo de Ar",
    specs: [
      {
        key: "indoorAirflowCooling",
        label: "Vazão Interna (Refrigeração)",
        getValue: (p) =>
          getArCondicionado(p)?.airflow.indoorUnit.coolingMode ?? "-",
        type: "text",
      },
      {
        key: "indoorAirflowHeating",
        label: "Vazão Interna (Aquecimento)",
        getValue: (p) =>
          getArCondicionado(p)?.airflow.indoorUnit.heatingMode ?? "-",
        type: "text",
      },
      {
        key: "fanSpeeds",
        label: "Velocidades do Ventilador",
        getValue: (p) =>
          getArCondicionado(p)?.airflow.indoorUnit.fanSpeeds.toString() ?? "-",
        type: "text",
      },
      {
        key: "autoMode",
        label: "Modo Automático",
        getValue: (p) =>
          getArCondicionado(p)?.airflow.indoorUnit.autoMode ?? false,
        type: "boolean",
      },
      {
        key: "outdoorAirflow",
        label: "Vazão Externa",
        getValue: (p) =>
          getArCondicionado(p)?.airflow.outdoorUnit?.airflow ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "noise",
    title: "Ruído",
    specs: [
      {
        key: "indoorNoiseMin",
        label: "Unidade Interna (Mínimo)",
        getValue: (p) => {
          const noise = getArCondicionado(p)?.noise.indoorUnit.min;
          return noise ? `${noise} dB(A)` : "-";
        },
        type: "text",
      },
      {
        key: "indoorNoiseMax",
        label: "Unidade Interna (Máximo)",
        getValue: (p) => {
          const noise = getArCondicionado(p)?.noise.indoorUnit.max;
          return noise ? `${noise} dB(A)` : "-";
        },
        type: "text",
      },
      {
        key: "silentMode",
        label: "Modo Silencioso",
        getValue: (p) => {
          const noise = getArCondicionado(p)?.noise.indoorUnit.silentMode;
          return noise ? `${noise} dB(A)` : "-";
        },
        type: "text",
      },
      {
        key: "outdoorNoise",
        label: "Unidade Externa",
        getValue: (p) => {
          const noise = getArCondicionado(p)?.noise.outdoorUnit.level;
          return noise ? `${noise} dB(A)` : "-";
        },
        type: "text",
      },
    ],
  },
  {
    id: "filters",
    title: "Filtros",
    specs: [
      {
        key: "filterTypes",
        label: "Tipos de Filtro",
        getValue: (p) => getArCondicionado(p)?.filters.types.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "washable",
        label: "Filtros Laváveis",
        getValue: (p) => getArCondicionado(p)?.filters.washable ?? false,
        type: "boolean",
      },
      {
        key: "replacement",
        label: "Período de Troca",
        getValue: (p) => getArCondicionado(p)?.filters.replacement ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "smart-features",
    title: "Recursos Inteligentes",
    specs: [
      {
        key: "wifi",
        label: "Wi-Fi",
        getValue: (p) => getArCondicionado(p)?.features.wifi ?? false,
        type: "boolean",
      },
      {
        key: "smartControl",
        label: "Controle Inteligente",
        getValue: (p) => getArCondicionado(p)?.features.smartControl ?? false,
        type: "boolean",
      },
      {
        key: "voiceControl",
        label: "Controle por Voz",
        getValue: (p) =>
          getArCondicionado(p)?.features.voiceControl?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "mobileApp",
        label: "Aplicativo",
        getValue: (p) => getArCondicionado(p)?.features.mobileApp ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "operation-features",
    title: "Recursos de Operação",
    specs: [
      {
        key: "sleepMode",
        label: "Modo Sleep",
        getValue: (p) => getArCondicionado(p)?.features.sleepMode ?? false,
        type: "boolean",
      },
      {
        key: "ecoMode",
        label: "Modo Eco",
        getValue: (p) => getArCondicionado(p)?.features.ecoMode ?? false,
        type: "boolean",
      },
      {
        key: "turboMode",
        label: "Modo Turbo",
        getValue: (p) => getArCondicionado(p)?.features.turboMode ?? false,
        type: "boolean",
      },
      {
        key: "dryMode",
        label: "Modo Desumidificação",
        getValue: (p) => getArCondicionado(p)?.features.dryMode ?? false,
        type: "boolean",
      },
      {
        key: "fanMode",
        label: "Modo Ventilação",
        getValue: (p) => getArCondicionado(p)?.features.fanMode ?? false,
        type: "boolean",
      },
      {
        key: "autoClean",
        label: "Limpeza Automática",
        getValue: (p) => getArCondicionado(p)?.features.autoClean ?? false,
        type: "boolean",
      },
      {
        key: "autoRestart",
        label: "Reinício Automático",
        getValue: (p) => getArCondicionado(p)?.features.autoRestart ?? false,
        type: "boolean",
      },
      {
        key: "timer",
        label: "Timer",
        getValue: (p) => getArCondicionado(p)?.features.timer ?? false,
        type: "boolean",
      },
      {
        key: "timerHours",
        label: "Timer (horas)",
        getValue: (p) =>
          getArCondicionado(p)?.features.timerHours?.toString() ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "comfort-features",
    title: "Recursos de Conforto",
    specs: [
      {
        key: "swingHorizontal",
        label: "Swing Horizontal",
        getValue: (p) =>
          getArCondicionado(p)?.features.swingHorizontal ?? false,
        type: "boolean",
      },
      {
        key: "swingVertical",
        label: "Swing Vertical",
        getValue: (p) => getArCondicionado(p)?.features.swingVertical ?? false,
        type: "boolean",
      },
      {
        key: "swingAuto",
        label: "Swing Automático",
        getValue: (p) => getArCondicionado(p)?.features.swingAuto ?? false,
        type: "boolean",
      },
      {
        key: "followMe",
        label: "Follow Me",
        getValue: (p) => getArCondicionado(p)?.features.followMe ?? false,
        type: "boolean",
      },
      {
        key: "iFeelSensor",
        label: "Sensor iFeel",
        getValue: (p) => getArCondicionado(p)?.features.iFeelSensor ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "air-quality",
    title: "Qualidade do Ar",
    specs: [
      {
        key: "ionizer",
        label: "Ionizador",
        getValue: (p) => getArCondicionado(p)?.features.ionizer ?? false,
        type: "boolean",
      },
      {
        key: "airPurifier",
        label: "Purificador de Ar",
        getValue: (p) => getArCondicionado(p)?.features.airPurifier ?? false,
        type: "boolean",
      },
      {
        key: "dehumidifier",
        label: "Desumidificador",
        getValue: (p) => getArCondicionado(p)?.features.dehumidifier ?? false,
        type: "boolean",
      },
      {
        key: "coldPlasma",
        label: "Cold Plasma",
        getValue: (p) => getArCondicionado(p)?.features.coldPlasma ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "indoor-unit",
    title: "Unidade Interna",
    specs: [
      {
        key: "indoorWidth",
        label: "Largura",
        getValue: (p) =>
          getArCondicionado(p)?.indoorUnit.dimensions.width ?? "-",
        type: "text",
      },
      {
        key: "indoorHeight",
        label: "Altura",
        getValue: (p) =>
          getArCondicionado(p)?.indoorUnit.dimensions.height ?? "-",
        type: "text",
      },
      {
        key: "indoorDepth",
        label: "Profundidade",
        getValue: (p) =>
          getArCondicionado(p)?.indoorUnit.dimensions.depth ?? "-",
        type: "text",
      },
      {
        key: "indoorWeight",
        label: "Peso",
        getValue: (p) => getArCondicionado(p)?.indoorUnit.weight ?? "-",
        type: "text",
      },
      {
        key: "indoorColor",
        label: "Cor",
        getValue: (p) => getArCondicionado(p)?.indoorUnit.color ?? "-",
        type: "text",
      },
      {
        key: "installation",
        label: "Instalação",
        getValue: (p) => getArCondicionado(p)?.indoorUnit.installation ?? "-",
        type: "text",
      },
      {
        key: "display",
        label: "Display",
        getValue: (p) => getArCondicionado(p)?.features.display ?? false,
        type: "boolean",
      },
      {
        key: "displayType",
        label: "Tipo de Display",
        getValue: (p) => getArCondicionado(p)?.features.displayType ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "outdoor-unit",
    title: "Unidade Externa",
    specs: [
      {
        key: "outdoorWidth",
        label: "Largura",
        getValue: (p) =>
          getArCondicionado(p)?.outdoorUnit.dimensions.width ?? "-",
        type: "text",
      },
      {
        key: "outdoorHeight",
        label: "Altura",
        getValue: (p) =>
          getArCondicionado(p)?.outdoorUnit.dimensions.height ?? "-",
        type: "text",
      },
      {
        key: "outdoorDepth",
        label: "Profundidade",
        getValue: (p) =>
          getArCondicionado(p)?.outdoorUnit.dimensions.depth ?? "-",
        type: "text",
      },
      {
        key: "outdoorWeight",
        label: "Peso",
        getValue: (p) => getArCondicionado(p)?.outdoorUnit.weight ?? "-",
        type: "text",
      },
      {
        key: "compressorType",
        label: "Tipo de Compressor",
        getValue: (p) =>
          getArCondicionado(p)?.outdoorUnit.compressor.type ?? "-",
        type: "text",
      },
      {
        key: "compressorBrand",
        label: "Marca do Compressor",
        getValue: (p) =>
          getArCondicionado(p)?.outdoorUnit.compressor.brand ?? "-",
        type: "text",
      },
      {
        key: "anticorrosion",
        label: "Proteção Anticorrosão",
        getValue: (p) =>
          getArCondicionado(p)?.outdoorUnit.protection.anticorrosion ?? false,
        type: "boolean",
      },
      {
        key: "weatherproof",
        label: "Proteção contra Intempéries",
        getValue: (p) =>
          getArCondicionado(p)?.outdoorUnit.protection.weatherproof ?? false,
        type: "boolean",
      },
      {
        key: "ipRating",
        label: "Classificação IP",
        getValue: (p) =>
          getArCondicionado(p)?.outdoorUnit.protection.ipRating ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "installation",
    title: "Instalação",
    specs: [
      {
        key: "installationType",
        label: "Tipo de Instalação",
        getValue: (p) => getArCondicionado(p)?.installation.type ?? "-",
        type: "text",
      },
      {
        key: "tubeLengthIncluded",
        label: "Comprimento de Tubulação Incluso",
        getValue: (p) =>
          getArCondicionado(p)?.installation.tubeLength.included ?? "-",
        type: "text",
      },
      {
        key: "tubeLengthMaximum",
        label: "Comprimento Máximo de Tubulação",
        getValue: (p) =>
          getArCondicionado(p)?.installation.tubeLength.maximum ?? "-",
        type: "text",
      },
      {
        key: "heightDifference",
        label: "Diferença de Altura Máxima",
        getValue: (p) =>
          getArCondicionado(p)?.installation.heightDifference ?? "-",
        type: "text",
      },
      {
        key: "drainType",
        label: "Tipo de Drenagem",
        getValue: (p) => getArCondicionado(p)?.installation.drain.type ?? "-",
        type: "text",
      },
      {
        key: "drainIncluded",
        label: "Drenagem Inclusa",
        getValue: (p) =>
          getArCondicionado(p)?.installation.drain.included ?? false,
        type: "boolean",
      },
      {
        key: "mountingBracket",
        label: "Suporte de Fixação",
        getValue: (p) =>
          getArCondicionado(p)?.installation.mounting.bracket ?? false,
        type: "boolean",
      },
      {
        key: "mountingScrews",
        label: "Parafusos Inclusos",
        getValue: (p) =>
          getArCondicionado(p)?.installation.mounting.screws ?? false,
        type: "boolean",
      },
      {
        key: "mountingTemplate",
        label: "Gabarito de Instalação",
        getValue: (p) =>
          getArCondicionado(p)?.installation.mounting.template ?? false,
        type: "boolean",
      },
      {
        key: "installationDifficulty",
        label: "Dificuldade de Instalação",
        getValue: (p) => getArCondicionado(p)?.installation.difficulty ?? "-",
        type: "text",
      },
      {
        key: "estimatedTime",
        label: "Tempo Estimado de Instalação",
        getValue: (p) =>
          getArCondicionado(p)?.installation.estimatedTime ?? "-",
        type: "text",
      },
      {
        key: "professionalRequired",
        label: "Requer Profissional",
        getValue: (p) =>
          getArCondicionado(p)?.installation.professionalRequired ?? false,
        type: "boolean",
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
        getValue: (p) => getArCondicionado(p)?.warranty.general ?? "-",
        type: "text",
      },
      {
        key: "compressorWarranty",
        label: "Garantia do Compressor",
        getValue: (p) => getArCondicionado(p)?.warranty.compressor ?? "-",
        type: "text",
      },
      {
        key: "partsWarranty",
        label: "Garantia de Peças",
        getValue: (p) => getArCondicionado(p)?.warranty.parts ?? "-",
        type: "text",
      },
      {
        key: "laborWarranty",
        label: "Garantia de Mão de Obra",
        getValue: (p) => getArCondicionado(p)?.warranty.labor ?? "-",
        type: "text",
      },
      {
        key: "warrantyConditions",
        label: "Condições de Garantia",
        getValue: (p) =>
          getArCondicionado(p)?.warranty.conditions?.join(", ") ?? "-",
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
        getValue: (p) => getArCondicionado(p)?.certifications.inmetro ?? false,
        type: "boolean",
      },
      {
        key: "procel",
        label: "PROCEL",
        getValue: (p) => getArCondicionado(p)?.certifications.procel ?? "-",
        type: "text",
      },
      {
        key: "iso",
        label: "ISO",
        getValue: (p) =>
          getArCondicionado(p)?.certifications.iso?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "ansi",
        label: "ANSI",
        getValue: (p) => getArCondicionado(p)?.certifications.ansi ?? false,
        type: "boolean",
      },
      {
        key: "otherCertifications",
        label: "Outras Certificações",
        getValue: (p) =>
          getArCondicionado(p)?.certifications.other?.join(", ") ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "compatibility",
    title: "Compatibilidade",
    specs: [
      {
        key: "exteriorUnits",
        label: "Unidades Externas Compatíveis",
        getValue: (p) =>
          getArCondicionado(p)?.compatibility?.exteriorUnits?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "smartHome",
        label: "Compatibilidade Smart Home",
        getValue: (p) =>
          getArCondicionado(p)?.compatibility?.smartHome?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "voltageRange",
        label: "Faixa de Voltagem",
        getValue: (p) =>
          getArCondicionado(p)?.compatibility?.voltageRange ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "maintenance",
    title: "Manutenção",
    specs: [
      {
        key: "filterCleaning",
        label: "Limpeza dos Filtros",
        getValue: (p) =>
          getArCondicionado(p)?.maintenance.filterCleaning ?? "-",
        type: "text",
      },
      {
        key: "professionalService",
        label: "Manutenção Profissional",
        getValue: (p) =>
          getArCondicionado(p)?.maintenance.professionalService ?? "-",
        type: "text",
      },
      {
        key: "gasRefill",
        label: "Recarga de Gás",
        getValue: (p) => getArCondicionado(p)?.maintenance.gasRefill ?? "-",
        type: "text",
      },
      {
        key: "estimatedLifespan",
        label: "Vida Útil Estimada",
        getValue: (p) =>
          getArCondicionado(p)?.maintenance.estimatedLifespan ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "bundled",
    title: "Itens Inclusos",
    specs: [
      {
        key: "remoteControl",
        label: "Controle Remoto",
        getValue: (p) => getArCondicionado(p)?.bundled?.remoteControl ?? false,
        type: "boolean",
      },
      {
        key: "batteries",
        label: "Pilhas",
        getValue: (p) => getArCondicionado(p)?.bundled?.batteries ?? false,
        type: "boolean",
      },
      {
        key: "installationKit",
        label: "Kit de Instalação",
        getValue: (p) =>
          getArCondicionado(p)?.bundled?.installationKit ?? false,
        type: "boolean",
      },
      {
        key: "drainHose",
        label: "Mangueira de Dreno",
        getValue: (p) => getArCondicionado(p)?.bundled?.drainHose ?? false,
        type: "boolean",
      },
      {
        key: "sealingKit",
        label: "Kit de Vedação",
        getValue: (p) => getArCondicionado(p)?.bundled?.sealingKit ?? false,
        type: "boolean",
      },
      {
        key: "manual",
        label: "Manual",
        getValue: (p) => getArCondicionado(p)?.bundled?.manual ?? false,
        type: "boolean",
      },
      {
        key: "warrantyCard",
        label: "Cartão de Garantia",
        getValue: (p) => getArCondicionado(p)?.bundled?.warrantyCard ?? false,
        type: "boolean",
      },
      {
        key: "accessories",
        label: "Acessórios",
        getValue: (p) =>
          getArCondicionado(p)?.bundled?.accessories?.join(", ") ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "environment",
    title: "Ambiente de Operação",
    specs: [
      {
        key: "operatingTempCooling",
        label: "Temperatura de Operação (Refrigeração)",
        getValue: (p) => {
          const temp = getArCondicionado(p)?.environment.operatingTemp.cooling;
          return temp ? `${temp.min}°C a ${temp.max}°C` : "-";
        },
        type: "text",
      },
      {
        key: "operatingTempHeating",
        label: "Temperatura de Operação (Aquecimento)",
        getValue: (p) => {
          const temp = getArCondicionado(p)?.environment.operatingTemp.heating;
          return temp ? `${temp.min}°C a ${temp.max}°C` : "-";
        },
        type: "text",
      },
      {
        key: "operatingHumidity",
        label: "Umidade de Operação",
        getValue: (p) => {
          const humidity = getArCondicionado(p)?.environment.operatingHumidity;
          return humidity ? `${humidity.min}% a ${humidity.max}%` : "-";
        },
        type: "text",
      },
      {
        key: "recommendedUse",
        label: "Uso Recomendado",
        getValue: (p) =>
          getArCondicionado(p)?.environment.recommendedUse?.join(", ") ?? "-",
        type: "text",
      },
    ],
  },
];
```

## Exemplo de Objeto Json ar condicionado que você deve fazer

```json
{
  "id": "britania-prime-air-9fc",
  "name": "Prime Air 9FC",
  "brand": "Britânia",
  "line": "Prime Air",
  "model": "PRIME AIR 9FC",
  "alphanumericModel": "9FC",
  "color": "Branco",
  "image": "https://http2.mlstatic.com/D_NQ_NP_2X_969183-MLA99888990131_112025-F.webp",
  "price": 0,
  "releaseDate": "2024",
  "releaseYear": 2024,
  "category": "ar-condicionado",
  "mercadolivreUrl": "https://mercadolivre.com/sec/1byXwu4",
  "manufacturer": "Philco",
  "specs": {
   "manufacturer": "Philco",
   "type": "Split Hi-Wall",
   "technology": "On/Off",
   "capacity": {
    "btu": 9000,
    "watts": 900,
    "coverage": {
     "minArea": 8,
     "maxArea": 12,
     "idealArea": 10
    }
   },
   "efficiency": {
    "energyClass": "A",
    "eer": 3.0,
    "cop": null,
    "procelSeal": "A",
    "annualConsumption": "550 kWh/ano"
   },
   "cooling": {
    "capacity": "9000 BTU/h",
    "powerConsumption": "900 W",
    "eer": 3.0,
    "operatingRange": {
     "minTemp": 16,
     "maxTemp": 32
    }
   },
   "heating": null,
   "electrical": {
    "voltage": "220V",
    "phases": "Monofásico",
    "frequency": "60Hz",
    "powerConsumption": {
     "cooling": "900 W",
     "heating": null,
     "standby": "1 W"
    },
    "currentRating": "4,1 A",
    "wireGauge": "2,5 mm²",
    "circuitBreaker": "15 A"
   },
   "refrigerant": {
    "type": "R-32",
    "amount": "550 g",
    "gwp": 675,
    "environmentalImpact": "Baixo"
   },
   "airflow": {
    "indoorUnit": {
     "coolingMode": "450 m³/h",
     "heatingMode": null,
     "fanSpeeds": 3,
     "autoMode": true
    },
    "outdoorUnit": {
     "airflow": "1100 m³/h"
    }
   },
   "noise": {
    "indoorUnit": {
     "min": 40,
     "max": 46,
     "silentMode": 40
    },
    "outdoorUnit": {
     "level": 55
    }
   },
   "filters": {
    "types": ["Anti-bacteriano", "Antifungos", "Anti-poeira"],
    "washable": true,
    "replacement": "Mensal (limpeza)"
   },
   "features": {
    "wifi": false,
    "smartControl": false,
    "voiceControl": null,
    "mobileApp": null,
    "sleepMode": true,
    "ecoMode": false,
    "turboMode": true,
    "dryMode": true,
    "fanMode": true,
    "autoClean": false,
    "autoRestart": false,
    "timer": true,
    "timerHours": 24,
    "display": true,
    "displayType": "LED",
    "remoteControl": true,
    "swingHorizontal": true,
    "swingVertical": true,
    "swingAuto": true,
    "ionizer": false,
    "airPurifier": false,
    "dehumidifier": true,
    "followMe": false,
    "iFeelSensor": false,
    "coldPlasma": false,
    "childLock": false
   },
   "indoorUnit": {
    "dimensions": {
     "width": "725 mm",
     "height": "200 mm",
     "depth": "295 mm"
    },
    "weight": "7,5 kg",
    "color": "Branco",
    "material": "Plástico ABS",
    "displayLocation": "Frontal",
    "installation": "Parede"
   },
   "outdoorUnit": {
    "dimensions": {
     "width": "655 mm",
     "height": "450 mm",
     "depth": "240 mm"
    },
    "weight": "18 kg",
    "material": "Metal com aletas anticorrosivas",
    "compressor": {
     "type": "Rotativo",
     "brand": null
    },
    "protection": {
     "anticorrosion": true,
     "weatherproof": true,
     "ipRating": "IPX4"
    }
   },
   "installation": {
    "type": "Split",
    "tubeLength": {
     "included": "3 m",
     "maximum": "15 m"
    },
    "heightDifference": "10 m",
    "drain": {
     "type": "Gravidade",
     "included": true
    },
    "mounting": {
     "bracket": true,
     "screws": true,
     "template": true
    },
    "difficulty": "Profissional",
    "estimatedTime": "3-4 horas",
    "professionalRequired": true
   },
   "warranty": {
    "general": "1 ano",
    "compressor": "5 anos",
    "parts": "1 ano",
    "labor": "1 ano",
    "conditions": ["Defeitos de fabricação", "Instalação por técnico autorizado"]
   },
   "certifications": {
    "inmetro": true,
    "procel": "A",
    "iso": null,
    "ansi": false,
    "other": null
   },
   "compatibility": {
    "exteriorUnits": null,
    "smartHome": ["Compatível com Kit Philco Home Smart Wi-Fi (vendido separadamente)"],
    "voltageRange": "220V"
   },
   "maintenance": {
    "filterCleaning": "Mensal",
    "professionalService": "Anual",
    "gasRefill": "A cada 3-5 anos (se necessário)",
    "estimatedLifespan": "8-10 anos"
   },
   "bundled": {
    "remoteControl": true,
    "batteries": true,
    "installationKit": false,
    "drainHose": true,
    "sealingKit": false,
    "manual": true,
    "warrantyCard": true,
    "accessories": ["Tubulação 1/4\" e 3/8\""]
   },
   "environment": {
    "operatingTemp": {
     "cooling": {
      "min": 16,
      "max": 43
     },
     "heating": null
    },
    "operatingHumidity": {
     "min": 30,
     "max": 80
    },
    "recommendedUse": ["Quartos", "Escritórios", "Salas pequenas"]
   },
   "ratings": {
    "costBenefit": 8,
    "efficiency": 7,
    "quietness": 7,
    "coolingPower": 7,
    "features": 6,
    "durability": 7,
    "easeOfUse": 8
   }
  }
 },
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
"ar-condicionado": [
      {
        "name": "CCB10F",
        "brand": "Consul",
        "detailedModel": "CCB10F",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_931498-MLA99939956835_112025-F.webp"
      },
      {
        "name": "CCB07FB",
        "brand": "Consul",
        "detailedModel": "CCB07FB",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_712967-MLA99388471618_112025-F.webp"
      },
      {
        "name": "CCN07EB",
        "brand": "Consul",
        "detailedModel": "CCN07EB",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_952763-MLU73213834909_122023-F.webp"
      },
      {
        "name": "KV-ACJ-ELET",
        "brand": "Kian",
        "detailedModel": "KV-ACJ-ELET",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_783755-MLA98882484461_112025-F.webp"
      },
      {
        "name": "VTR-2VT",
        "brand": "VTR ELETRONICS",
        "detailedModel": "MINI CLIMATIZADOR",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_752372-MLA99995725591_112025-F.webp"
      },
      {
        "name": "PAC9FB",
        "brand": "Philco",
        "detailedModel": "PAC9FB",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_830937-MLA99932316841_112025-F.webp"
      },
      {
        "name": "HJQE09C2CC",
        "brand": "Elgin",
        "detailedModel": "HJQE09C2CC-HJQI09C2WC",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_873448-MLA98140273367_112025-F.webp"
      },
      {
        "name": "Prime Air 9FC",
        "brand": "Britânia",
        "detailedModel": "PRIME AIR 9FC",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_969183-MLA99888990131_112025-F.webp"
      },
      {
        "name": "Voice +AI",
        "brand": "LG",
        "detailedModel": "Voice +AI",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_697001-MLA99563539662_122025-F.webp"
      },
      {
        "name": "MPH-12CRV1",
        "brand": "Midea",
        "detailedModel": "MPH-12CRV",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_784612-MLA98823688728_112025-F.webp"
      },
      {
        "name": "Color Adapt",
        "brand": "Electrolux",
        "detailedModel": "YI12F/YE12F",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_752001-MLA100001155415_112025-F.webp"
      },
      {
        "name": "WindFree AI",
        "brand": "Samsung",
        "detailedModel": "WF AI Frio",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_753644-MLA99451198906_112025-F.webp"
      }
    ]
```

- Se eu passar dados de um item já cadastrado antes, ou que você já mandou os dados, pare o processo e me pergunte se eu quero continuar mesmo assim.
