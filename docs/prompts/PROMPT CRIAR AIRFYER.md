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

function isAirfryer(product: Product): product is Airfryer {
  return product.category === "airfryers";
}

export interface Airfryer extends BaseProduct {
  category: "airfryers";
  specs: AirfryerSpecs;
}

function getAirfryer(p: Product): AirfryerSpecs | null {
  return isAirfryer(p) ? p.specs : null;
}

export interface AirfryerSpecs {
  capacity: {
    liters: number;
    servings?: number;
    baskets?: number;
  };
  power: {
    watts: number;
    voltage: string;
    frequency?: string;
  };
  temperature: {
    min: number;
    max: number;
    unit: "°C" | "°F";
  };
  timer: {
    max: number;
    unit: "minutos" | "horas";
    autoShutoff?: boolean;
  };
  technology: {
    type: string;
    rapidAir?: boolean;
    convection?: boolean;
  };
  programs: {
    preset?: number;
    customizable?: boolean;
    programs?: string[];
  };
  control: {
    type: "Digital" | "Analógico" | "Touch" | "App";
    display?: string;
    appControl?: boolean;
    voiceControl?: boolean;
  };
  features: {
    nonStick?: boolean;
    dishwasherSafe?: boolean;
    viewWindow?: boolean;
    keepWarm?: boolean;
    preheat?: boolean;
    shakeReminder?: boolean;
    oilLess?: boolean;
    removableBasket?: boolean;
  };
  safety: {
    overheatProtection?: boolean;
    autoShutoff?: boolean;
    coolTouch?: boolean;
    nonSlipFeet?: boolean;
  };
  accessories?: {
    included?: string[];
    compatible?: string[];
  };
  dimensions: {
    width: string;
    height: string;
    depth: string;
    weight: string;
    basketSize?: string;
  };
  maintenance: {
    cleaningEase?: string;
    filterReplacement?: boolean;
  };
  ratings: {
    costBenefit: number | null;
    cookingPerformance: number;
    easeOfUse: number;
    capacity: number;
    cleaning: number;
  };
}

export const airfryerSpecs: SpecSection[] = [
  {
    id: "ratings",
    title: "Notas",
    specs: [
      {
        key: "costBenefit",
        label: "Custo-benefício",
        getValue: (p) => getAirfryer(p)?.ratings.costBenefit ?? null,
        type: "rating",
      },
      {
        key: "cookingPerformance",
        label: "Performance de Cozimento",
        getValue: (p) => getAirfryer(p)?.ratings.cookingPerformance ?? null,
        type: "rating",
      },
      {
        key: "easeOfUse",
        label: "Facilidade de Uso",
        getValue: (p) => getAirfryer(p)?.ratings.easeOfUse ?? null,
        type: "rating",
      },
      {
        key: "capacityRating",
        label: "Capacidade",
        getValue: (p) => getAirfryer(p)?.ratings.capacity ?? null,
        type: "rating",
      },
      {
        key: "cleaning",
        label: "Facilidade de Limpeza",
        getValue: (p) => getAirfryer(p)?.ratings.cleaning ?? null,
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
        getValue: (p) => getAirfryer(p)?.capacity.liters.toString() ?? "-",
        type: "text",
      },
      {
        key: "servings",
        label: "Porções",
        getValue: (p) => getAirfryer(p)?.capacity.servings?.toString() ?? "-",
        type: "text",
      },
      {
        key: "baskets",
        label: "Cestos",
        getValue: (p) => getAirfryer(p)?.capacity.baskets?.toString() ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "power",
    title: "Potência",
    specs: [
      {
        key: "watts",
        label: "Watts",
        getValue: (p) => getAirfryer(p)?.power.watts.toString() ?? "-",
        type: "text",
      },
      {
        key: "voltage",
        label: "Voltagem",
        getValue: (p) => getAirfryer(p)?.power.voltage ?? "-",
        type: "text",
      },
      {
        key: "frequency",
        label: "Frequência",
        getValue: (p) => getAirfryer(p)?.power.frequency ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "temperature",
    title: "Temperatura",
    specs: [
      {
        key: "minTemp",
        label: "Mínima",
        getValue: (p) => {
          const airfryer = getAirfryer(p);
          return airfryer
            ? `${airfryer.temperature.min}${airfryer.temperature.unit}`
            : "-";
        },
        type: "text",
      },
      {
        key: "maxTemp",
        label: "Máxima",
        getValue: (p) => {
          const airfryer = getAirfryer(p);
          return airfryer
            ? `${airfryer.temperature.max}${airfryer.temperature.unit}`
            : "-";
        },
        type: "text",
      },
    ],
  },
  {
    id: "timer",
    title: "Timer",
    specs: [
      {
        key: "maxTimer",
        label: "Tempo Máximo",
        getValue: (p) => {
          const airfryer = getAirfryer(p);
          return airfryer
            ? `${airfryer.timer.max} ${airfryer.timer.unit}`
            : "-";
        },
        type: "text",
      },
      {
        key: "autoShutoff",
        label: "Desligamento Automático",
        getValue: (p) => getAirfryer(p)?.timer.autoShutoff ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "technology",
    title: "Tecnologia",
    specs: [
      {
        key: "technologyType",
        label: "Tipo",
        getValue: (p) => getAirfryer(p)?.technology.type ?? "-",
        type: "text",
      },
      {
        key: "rapidAir",
        label: "Rapid Air",
        getValue: (p) => getAirfryer(p)?.technology.rapidAir ?? false,
        type: "boolean",
      },
      {
        key: "convection",
        label: "Convecção",
        getValue: (p) => getAirfryer(p)?.technology.convection ?? false,
        type: "boolean",
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
        getValue: (p) => getAirfryer(p)?.programs.preset?.toString() ?? "-",
        type: "text",
      },
      {
        key: "customizable",
        label: "Customizável",
        getValue: (p) => getAirfryer(p)?.programs.customizable ?? false,
        type: "boolean",
      },
      {
        key: "programsList",
        label: "Lista de Programas",
        getValue: (p) => getAirfryer(p)?.programs.programs?.join(", ") ?? "-",
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
        getValue: (p) => getAirfryer(p)?.control.type ?? "-",
        type: "text",
      },
      {
        key: "display",
        label: "Display",
        getValue: (p) => getAirfryer(p)?.control.display ?? "-",
        type: "text",
      },
      {
        key: "appControl",
        label: "Controle por App",
        getValue: (p) => getAirfryer(p)?.control.appControl ?? false,
        type: "boolean",
      },
      {
        key: "voiceControl",
        label: "Controle por Voz",
        getValue: (p) => getAirfryer(p)?.control.voiceControl ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "features",
    title: "Recursos",
    specs: [
      {
        key: "nonStick",
        label: "Antiaderente",
        getValue: (p) => getAirfryer(p)?.features.nonStick ?? false,
        type: "boolean",
      },
      {
        key: "dishwasherSafe",
        label: "Lavável na Lava-louças",
        getValue: (p) => getAirfryer(p)?.features.dishwasherSafe ?? false,
        type: "boolean",
      },
      {
        key: "viewWindow",
        label: "Janela de Visualização",
        getValue: (p) => getAirfryer(p)?.features.viewWindow ?? false,
        type: "boolean",
      },
      {
        key: "keepWarm",
        label: "Manter Aquecido",
        getValue: (p) => getAirfryer(p)?.features.keepWarm ?? false,
        type: "boolean",
      },
      {
        key: "preheat",
        label: "Pré-aquecimento",
        getValue: (p) => getAirfryer(p)?.features.preheat ?? false,
        type: "boolean",
      },
      {
        key: "shakeReminder",
        label: "Lembrete de Agitar",
        getValue: (p) => getAirfryer(p)?.features.shakeReminder ?? false,
        type: "boolean",
      },
      {
        key: "oilLess",
        label: "Sem Óleo",
        getValue: (p) => getAirfryer(p)?.features.oilLess ?? false,
        type: "boolean",
      },
      {
        key: "removableBasket",
        label: "Cesto Removível",
        getValue: (p) => getAirfryer(p)?.features.removableBasket ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "safety",
    title: "Segurança",
    specs: [
      {
        key: "overheatProtection",
        label: "Proteção contra Superaquecimento",
        getValue: (p) => getAirfryer(p)?.safety.overheatProtection ?? false,
        type: "boolean",
      },
      {
        key: "safetyAutoShutoff",
        label: "Desligamento Automático",
        getValue: (p) => getAirfryer(p)?.safety.autoShutoff ?? false,
        type: "boolean",
      },
      {
        key: "coolTouch",
        label: "Toque Frio",
        getValue: (p) => getAirfryer(p)?.safety.coolTouch ?? false,
        type: "boolean",
      },
      {
        key: "nonSlipFeet",
        label: "Pés Antiderrapantes",
        getValue: (p) => getAirfryer(p)?.safety.nonSlipFeet ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "accessories",
    title: "Acessórios",
    specs: [
      {
        key: "included",
        label: "Inclusos",
        getValue: (p) =>
          getAirfryer(p)?.accessories?.included?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "compatible",
        label: "Compatíveis",
        getValue: (p) =>
          getAirfryer(p)?.accessories?.compatible?.join(", ") ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "dimensions",
    title: "Dimensões",
    specs: [
      {
        key: "width",
        label: "Largura",
        getValue: (p) => getAirfryer(p)?.dimensions.width ?? "-",
        type: "text",
      },
      {
        key: "height",
        label: "Altura",
        getValue: (p) => getAirfryer(p)?.dimensions.height ?? "-",
        type: "text",
      },
      {
        key: "depth",
        label: "Profundidade",
        getValue: (p) => getAirfryer(p)?.dimensions.depth ?? "-",
        type: "text",
      },
      {
        key: "weight",
        label: "Peso",
        getValue: (p) => getAirfryer(p)?.dimensions.weight ?? "-",
        type: "text",
      },
      {
        key: "basketSize",
        label: "Tamanho do Cesto",
        getValue: (p) => getAirfryer(p)?.dimensions.basketSize ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "maintenance",
    title: "Manutenção",
    specs: [
      {
        key: "cleaningEase",
        label: "Facilidade de Limpeza",
        getValue: (p) => getAirfryer(p)?.maintenance.cleaningEase ?? "-",
        type: "text",
      },
      {
        key: "filterReplacement",
        label: "Troca de Filtro",
        getValue: (p) => getAirfryer(p)?.maintenance.filterReplacement ?? false,
        type: "boolean",
      },
    ],
  },
];
```

## Exemplo Objeto Json Airfeyer que você deve fazer

```json
{
  "id": "airfryer-philips-walita-na130-00",
  "name": "NA130/00",
  "brand": "Philips Walita",
  "line": "Série 1000",
  "model": "NA130/00",
  "detailedModel": null,
  "color": "Preto",
  "image": "https://http2.mlstatic.com/D_NQ_NP_2X_623708-MLA99577999648_122025-F.webp",
  "price": 349.9,
  "releaseDate": "2024",
  "releaseMonth": null,
  "releaseYear": 2024,
  "origin": "China",
  "category": "airfryers",
  "anatelNumber": null,
  "amazonUrl": null,
  "mercadolivreUrl": "https://mercadolivre.com/sec/1YjhWYw",
  "shopeeUrl": null,
  "alphanumericModel": "NA130/00",
  "version": null,
  "manufacturer": "Versuni India Home Solutions Ltd.",
  "specs": {
    "capacity": {
      "liters": 6.2,
      "servings": 4,
      "baskets": 1
    },
    "power": {
      "watts": 1700,
      "voltage": "Bivolt (127V/220V)",
      "frequency": "50-60 Hz"
    },
    "temperature": {
      "min": 80,
      "max": 200,
      "unit": "°C"
    },
    "timer": {
      "max": 60,
      "unit": "minutos",
      "autoShutoff": true
    },
    "technology": {
      "type": "Rapid Air Technology",
      "rapidAir": true,
      "convection": true
    },
    "programs": {
      "preset": 12,
      "customizable": true,
      "programs": [
        "Fritar",
        "Assar",
        "Grelhar",
        "Tostar",
        "Reaquecer",
        "Descongelar",
        "Desidratar"
      ]
    },
    "control": {
      "type": "Digital",
      "display": "LED",
      "appControl": true,
      "voiceControl": false
    },
    "features": {
      "nonStick": true,
      "dishwasherSafe": true,
      "viewWindow": false,
      "keepWarm": false,
      "preheat": false,
      "shakeReminder": false,
      "oilLess": true,
      "removableBasket": true
    },
    "safety": {
      "overheatProtection": true,
      "autoShutoff": true,
      "coolTouch": true,
      "nonSlipFeet": true
    },
    "accessories": {
      "included": ["Grelha", "Manual de Instruções"],
      "compatible": ["Acessórios Philips Airfryer"]
    },
    "dimensions": {
      "width": "30,8 cm",
      "height": "40,3 cm",
      "depth": "30,8 cm",
      "weight": "4,2 kg",
      "basketSize": "6,2L"
    },
    "maintenance": {
      "cleaningEase": "Fácil - peças removíveis laváveis na lava-louças",
      "filterReplacement": false
    },
    "ratings": {
      "costBenefit": 9,
      "cookingPerformance": 9,
      "easeOfUse": 8,
      "capacity": 10,
      "cleaning": 9
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
"airfryers": [
      {
        "name": "NA130/00",
        "brand": "Philips Walita",
        "detailedModel": ""
      },
      {
        "name": "NA130/09",
        "brand": "Philips Walita",
        "detailedModel": ""
      },
      {
        "name": "AF-30",
        "brand": "Mondial",
        "detailedModel": "Family Inox IV"
      },
      {
        "name": "NA341",
        "brand": "Philips Walita",
        "detailedModel": ""
      },
      {
        "name": "FWM45P1",
        "brand": "Midea",
        "detailedModel": "Widemax"
      },
      {
        "name": "CKSTAF60WDDF",
        "brand": "Oster",
        "detailedModel": "Diamondtech"
      },
      {
        "name": "AFITA1035A",
        "brand": "Itatiaia",
        "detailedModel": ""
      },
      {
        "name": "PFR2200P",
        "brand": "Philco",
        "detailedModel": "Air Fryer Oven 4 em 1"
      }
    ],
```

- Se eu passar dados de um item já cadastrado antes, ou que você já mandou os dados, pare o processo e me pergunte se eu quero continuar mesmo assim.
