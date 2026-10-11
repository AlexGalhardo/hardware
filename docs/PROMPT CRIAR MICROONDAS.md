# Contexto

- Site: <https://alexgalhardo.github.io/tudohardware>
- Os dados dos produtos são salvos em formato JSON

## Tipagem do objeto JSON que você vai criar

```ts
export type ProductCategory =
  | "smartphones"
  | "gpus"
  | "cpus"
  | "tablets"
  | "drones"
  | "smartwatches"
  | "notebooks"
  | "maquinas-lavar-roupas"
  | "geladeiras"
  | "smart-tvs"
  | "fones-de-ouvido"
  | "cameras-de-seguranca"
  | "airfryers"
  | "microondas"
  | "teclados"
  | "mouses"
  | "caixa-de-som"
  | "placa-mae";

export type Product =
  | Smartphone
  | GPU
  | CPU
  | Tablet
  | WashingMachine
  | Smartv
  | Drone
  | Smartwatch
  | TWS
  | Notebook
  | Geladeira
  | CameraDeSeguranca
  | Airfryer
  | Microondas
  | TecladoPC
  | Mouse
  | CaixaDeSom
  | PlacaMae;

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
  anatelNumber?: string;
  amazonUrl?: string;
  mercadolivreUrl?: string;
  shopeeUrl?: string;
  alphanumericModel?: string;
  version?: string;
  manufacturer?: string;
}
```

```ts
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
        key: "type",
        label: "Tipo",
        getValue: (p) => getMicroondas(p)?.type ?? "-",
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
        getValue: (p) =>
          getMicroondas(p)?.cleaning.removableParts?.join(", ") ?? "-",
        type: "text",
      },
    ],
  },
];
```

## Exemplo Produto Object JSON de microondas que você deve fazer

```json
{
  "id": "electrolux-mto30",
  "name": "MTO30",
  "brand": "Electrolux",
  "line": "Micro-ondas",
  "model": "MTO30",
  "detailedModel": "10201PBA206",
  "color": "Branco",
  "image": "https://http2.mlstatic.com/D_NQ_NP_2X_647082-MLA99701605242_122025-F.webp",
  "price": 0,
  "releaseDate": "2024",
  "releaseMonth": null,
  "releaseYear": 2024,
  "origin": null,
  "category": "microondas",
  "anatelNumber": null,
  "mercadolivreUrl": "https://mercadolivre.com/sec/2mdAbG9",
  "alphanumericModel": "10201PBA206",
  "specs": {
    "type": "Solo",
    "capacity": {
      "liters": 20,
      "familySize": "1-2 pessoas"
    },
    "power": {
      "microwave": 1000,
      "grill": null,
      "convection": null,
      "voltage": "110V / 220V",
      "frequency": "60 Hz"
    },
    "turntable": {
      "diameter": "24,5 cm",
      "removable": true
    },
    "powerLevels": 10,
    "programs": {
      "preset": 9,
      "autoDefrost": true,
      "autoReheat": true,
      "autoCook": true,
      "programs": [
        "Arroz",
        "Macarrão",
        "Batata",
        "Vegetais",
        "Frutas",
        "Sopas",
        "Bolo de Caneca",
        "Pipoca",
        "Brigadeiro"
      ]
    },
    "control": {
      "type": "Digital",
      "display": "Display numérico LED",
      "childLock": true,
      "clock": true
    },
    "features": {
      "grill": false,
      "convection": false,
      "steamFunction": false,
      "crisper": false,
      "sensor": false,
      "inverter": false,
      "ecoMode": false,
      "keepWarm": true,
      "quickStart": true
    },
    "interior": {
      "material": "Aço esmaltado",
      "coating": "Acabamento branco",
      "light": true
    },
    "door": {
      "type": "Side-opening",
      "window": true
    },
    "dimensions": {
      "external": {
        "width": "45,5 cm",
        "height": "26,25 cm",
        "depth": "34,8 cm"
      },
      "internal": {
        "width": null,
        "height": null,
        "depth": null
      },
      "weight": "11,1 kg"
    },
    "safety": {
      "childLock": true,
      "doorSafety": true,
      "overheatProtection": false
    },
    "cleaning": {
      "steamClean": false,
      "easyClean": true,
      "removableParts": ["Prato giratório"]
    },
    "ratings": {
      "costBenefit": 8.5,
      "heatingPerformance": 7.0,
      "easeOfUse": 8.5,
      "capacity": 6.5,
      "features": 7.5
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
"microondas": [
      {
        "name": "MTO30",
        "brand": "Electrolux",
        "detailedModel": "10201PBA206"
      },
      {
        "name": "CMS46AB",
        "brand": "Consul",
        "detailedModel": "CMS46AB"
      },
      {
        "name": "MHP20S2",
        "brand": "Midea",
        "detailedModel": "MHP20S2"
      },
      {
        "name": "MHP20B1",
        "brand": "Midea",
        "detailedModel": "MHP20B1"
      },
      {
        "name": "MTO30",
        "brand": "Electrolux",
        "detailedModel": "10201PBA106"
      },
      {
        "name": "CMS46",
        "brand": "Consul",
        "detailedModel": "CMS46ARANA"
      },
      {
        "name": "MRAS22",
        "brand": "Midea",
        "detailedModel": "MRAS22"
      },
      {
        "name": "BMS46AB",
        "brand": "Brastemp",
        "detailedModel": "BMS46ABBNA"
      },
      {
        "name": "ME36B",
        "brand": "Electrolux",
        "detailedModel": "ME36B"
      },
      {
        "name": "CMA20BB",
        "brand": "Consul",
        "detailedModel": "CMA20BBA"
      },
      {
        "name": "NN-ST25LWRU",
        "brand": "Panasonic",
        "detailedModel": "NN-ST25LWRUK"
      }
    ],
```

- Se eu passar dados de um item já cadastrado antes, ou que você já mandou os dados, pare o processo e me pergunte se eu quero continuar mesmo assim.
