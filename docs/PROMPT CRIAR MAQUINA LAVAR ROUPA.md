# Contexto

- Site: <https://alexgalhardo.github.io/tudohardware>
- Os dados dos produtos são salvos em formato JSON

## Tipagem do objeto JSON que você vai criar do objeto JSON que você vai criar

```ts
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
  energyEfficiency?:
    | "A+++"
    | "A++"
    | "A+"
    | "A"
    | "B"
    | "C"
    | "D"
    | "E"
    | "F"
    | "G";
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
        getValue: (p) =>
          getWashingMachine(p)?.ratings.washingPerformance ?? null,
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
        getValue: (p) =>
          getWashingMachine(p)?.washing.programs?.toString() ?? "-",
        type: "text",
      },
      {
        key: "waterLevels",
        label: "Níveis de Água",
        getValue: (p) =>
          getWashingMachine(p)?.washing.waterLevels?.toString() ?? "-",
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
        getValue: (p) =>
          getWashingMachine(p)?.washing.autoAdaptableLoad ?? false,
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
        getValue: (p) =>
          getWashingMachine(p)?.washing.specificPrograms?.join(", ") ?? "-",
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
        getValue: (p) =>
          getWashingMachine(p)?.technology.voiceControl?.join(", ") ?? "-",
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
        getValue: (p) =>
          getWashingMachine(p)?.technology.aiFeatures?.join(", ") ?? "-",
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
        getValue: (p) =>
          getWashingMachine(p)?.temperature.hasRegulation ?? false,
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
        getValue: (p) =>
          getWashingMachine(p)?.temperature.options?.join(", ") ?? "-",
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
        getValue: (p) =>
          getWashingMachine(p)?.structure.basketCount?.toString() ?? "-",
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
```

## Exemplo Produto Object JSON de máquina de lavar roupa que você deve fazer

```json
{
  "id": "colormaq-lcs10",
  "name": "LCS - 10kg",
  "brand": "Colormaq",
  "line": "Ecomax",
  "model": "LCS",
  "detailedModel": "LCS10MBR1NAC/2",
  "color": "Branco",
  "image": "https://http2.mlstatic.com/D_NQ_NP_2X_624438-MLA48818375173_012022-F.webp",
  "price": 0,
  "releaseDate": "2024",
  "releaseMonth": null,
  "releaseYear": 2024,
  "origin": null,
  "category": "maquinas-lavar-roupas",
  "anatelNumber": null,
  "mercadolivreUrl": "https://mercadolivre.com/sec/1dDgg5V",
  "specs": {
    "type": "Semiautomática",
    "loadType": "Superior",
    "capacity": {
      "washing": "10 kg",
      "drying": null
    },
    "isWasherDryer": false,
    "energyEfficiency": "A",
    "washing": {
      "waterLoadType": "Manual",
      "programs": 5,
      "waterLevels": 3,
      "washSystem": "Turbilhão",
      "quickWash": false,
      "antiWrinkle": false,
      "autoAdaptableLoad": false,
      "specificPrograms": [
        "Muito Sujo",
        "Jeans",
        "Dia a Dia",
        "Enxágue",
        "Delicado"
      ],
      "steamWash": false,
      "sanitize": false,
      "allergenCycle": false,
      "delicateCycle": true
    },
    "spin": {
      "hasSpin": false,
      "speed": null,
      "speedRegulation": false,
      "autoBalance": false
    },
    "drying": {
      "type": null,
      "hasDrainPump": false
    },
    "technology": {
      "inverter": false,
      "smartControl": false,
      "wifi": false,
      "voiceControl": null,
      "delayedStart": false,
      "endAlarm": false,
      "loadSensor": false,
      "autoDispense": false,
      "aiFeatures": null
    },
    "temperature": {
      "hasRegulation": false,
      "waterTemp": "Fria",
      "options": null
    },
    "structure": {
      "hasFilter": true,
      "hasDisplay": false,
      "displayType": null,
      "panelLock": false,
      "doorLock": false,
      "controlType": "Manípulos",
      "basketCount": 1,
      "basketMaterial": "Plástico",
      "isPortable": false,
      "drumLight": false
    },
    "dimensions": {
      "height": "96,5 cm",
      "width": "48,5 cm",
      "depth": "56,2 cm",
      "weight": "9,3 kg"
    },
    "other": {
      "isIndustrial": false,
      "positiveImpact": true,
      "warranty": "12 meses",
      "color": "Branco",
      "noiseLevel": "Baixo",
      "waterConsumption": "160 litros/ciclo",
      "energyConsumption": "0,11 kWh/ciclo",
      "powerInput": "370W"
    },
    "ratings": {
      "costBenefit": 9.0,
      "washingPerformance": 7.5,
      "energyEfficiency": 9.0,
      "noiseLevel": 9.0,
      "durability": 7.0
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
"maquina-lavar-roupas": [
{
"name": "LEC15",
"brand": "Electrolux",
"detailedModel": "LEC15",
"model": "LEC15"
},
{
"name": "BWK13AB",
"brand": "Brastemp",
"detailedModel": "BWK13AB",
"model": "BWK13AB"
},
{
"name": "Tradicional",
"brand": "Wanke",
"detailedModel": "11150024",
"model": "Tradicional"
},
{
"name": "LAS10",
"brand": "Arno",
"detailedModel": "LAS10",
"model": "LAS10"
},
{
"name": "CWN15AB",
"brand": "Consul",
"detailedModel": "CWN15AB",
"model": "CWN15AB"
},
{
"name": "CWB09BB",
"brand": "Consul",
"detailedModel": "CWB09BB",
"model": "CWB09BB"
},
{
"name": "BWF18AB",
"brand": "Brastemp",
"detailedModel": "BWF18ABBNA",
"model": "BWF18AB"
},
{
"name": "LCS - 10kg",
"brand": "Colormaq",
"detailedModel": "LCS10MBR1NAC/2",
"model": "LCS"
},
{
"name": "Wave Impeller",
"brand": "Midea",
"detailedModel": "MA512W140/WK-05",
"model": "MA512W140"
},
{
"name": "LEC15",
"brand": "Electrolux",
"detailedModel": "LEC15",
"model": "LEC15"
},
{
"name": "LCS15",
"brand": "Colormaq",
"detailedModel": "LCS15",
"model": "LCS15"
}
]
```

- Se eu passar dados de um item já cadastrado antes, ou que você já mandou os dados, pare o processo e me pergunte se eu quero continuar mesmo assim.

