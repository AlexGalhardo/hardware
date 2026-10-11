# Contexto

- Site: <https://alexgalhardo.github.io/tudohardware>
- Os dados dos produtos são salvos em formato JSON

## Tipagem do objeto JSON que você vai criar

```ts
import { SpecSection } from "../spec-configs";
import { BaseProduct, Product } from "../types";

function isNotebook(product: Product): product is Notebook {
  return product.category === "notebooks";
}

function getNotebook(p: Product) {
  return isNotebook(p) ? p.specs : null;
}

export interface Notebook extends BaseProduct {
  category: "notebooks";
  specs: NotebookSpecs;
}

export interface NotebookSpecs {
  display: {
    size: string;
    resolution: string;
    type: string;
    refreshRate: string;
    touchscreen: boolean;
    retina?: boolean;
    antiGlare?: boolean;
    panelType?: string;
    colorGamut?: string;
    aspectRatio?: string;
  };
  processor: string;
  processorBrand?: string;
  processorLine?: string;
  processorModel?: string;
  processorMaxSpeed?: string;
  processorCores?: number;
  chipset: string | null;
  gpu: string;
  gpuBrand?: string;
  gpuLine?: string;
  gpuModel?: string;
  integratedGpu?: {
    brand?: string;
    line?: string;
    model?: string;
  };
  dedicatedGpu?: {
    brand?: string;
    line?: string;
    model?: string;
    memory?: string;
    memoryType?: string;
  };
  ram: string;
  ramSpeed?: string;
  ramType?: string;
  maxRamSupported?: string;
  ramSlots?: number;
  storage: string;
  storageType: string;
  ssdInterface?: string;
  m2StorageCapacity?: string;
  expandableStorage: boolean;
  battery: {
    capacity: string | null;
    type: string;
    duration?: string | null;
  };
  os: string;
  osVersion?: string;
  osEdition?: string;
  dimensions: string;
  width?: string;
  depth?: string;
  height?: string;
  weight: string;
  keyboard: {
    backlit: boolean;
    numpad: boolean;
    type: string;
    language?: string;
  };
  webcam: {
    resolution: string;
    privacy: boolean;
  };
  audio: {
    speakers: string;
    speakerCount?: number;
    microphoneQuality: string;
    soundModes?: string | null;
  };
  connectivity: {
    wifi: string;
    bluetooth: string;
    ethernet: boolean;
    usb: string;
    hdmi: boolean;
    thunderbolt: boolean;
    sdCardReader: boolean;
    headphoneJack?: boolean;
    videoPortTypes?: string;
  };
  ports: string;
  coolingSystem: string | null;
  fingerprint: boolean;
  material?: string;
  manufacturer?: string;
  includedAccessories?: string;
  optimizedForAI?: boolean;
  ratings: {
    costBenefit: number | null;
    performance: number;
    display: number;
    battery: number;
    portability: number;
  };
}

export const notebookSpecs: SpecSection[] = [
  {
    id: "ratings",
    title: "Notas",
    specs: [
      {
        key: "costBenefit",
        label: "Custo-benefício",
        getValue: (p) => getNotebook(p)?.ratings.costBenefit ?? null,
        type: "rating",
      },
      {
        key: "performance",
        label: "Performance",
        getValue: (p) => getNotebook(p)?.ratings.performance ?? null,
        type: "rating",
      },
      {
        key: "display",
        label: "Display",
        getValue: (p) => getNotebook(p)?.ratings.display ?? null,
        type: "rating",
      },
      {
        key: "battery",
        label: "Bateria",
        getValue: (p) => getNotebook(p)?.ratings.battery ?? null,
        type: "rating",
      },
      {
        key: "portability",
        label: "Portabilidade",
        getValue: (p) => getNotebook(p)?.ratings.portability ?? null,
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
        key: "name",
        label: "Nome",
        getValue: (p) => p.name ?? "-",
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
      {
        key: "anatelNumber",
        label: "Anatel",
        getValue: (p) => p.anatelNumber ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "display",
    title: "Display",
    specs: [
      {
        key: "size",
        label: "Tamanho",
        getValue: (p) => getNotebook(p)?.display.size ?? "-",
        type: "text",
      },
      {
        key: "resolution",
        label: "Resolução",
        getValue: (p) => getNotebook(p)?.display.resolution ?? "-",
        type: "text",
      },
      {
        key: "type",
        label: "Tipo",
        getValue: (p) => getNotebook(p)?.display.type ?? "-",
        type: "text",
      },
      {
        key: "refreshRate",
        label: "Taxa de Atualização",
        getValue: (p) => getNotebook(p)?.display.refreshRate ?? "-",
        type: "text",
      },
      {
        key: "panelType",
        label: "Tipo de Painel",
        getValue: (p) => getNotebook(p)?.display.panelType ?? "-",
        type: "text",
      },
      {
        key: "colorGamut",
        label: "Gama de Cores",
        getValue: (p) => getNotebook(p)?.display.colorGamut ?? "-",
        type: "text",
      },
      {
        key: "aspectRatio",
        label: "Aspect Ratio",
        getValue: (p) => getNotebook(p)?.display.aspectRatio ?? "-",
        type: "text",
      },
      {
        key: "touchscreen",
        label: "Touchscreen",
        getValue: (p) => getNotebook(p)?.display.touchscreen ?? false,
        type: "boolean",
      },
      {
        key: "retina",
        label: "Retina",
        getValue: (p) => getNotebook(p)?.display.retina ?? false,
        type: "boolean",
      },
      {
        key: "antiGlare",
        label: "Antirreflexo",
        getValue: (p) => getNotebook(p)?.display.antiGlare ?? false,
        type: "boolean",
      },
    ],
  },

  {
    id: "processor",
    title: "Processador e GPU",
    specs: [
      {
        key: "processorBrand",
        label: "Marca CPU",
        getValue: (p) => getNotebook(p)?.processorBrand ?? "-",
        type: "text",
      },
      {
        key: "processorLine",
        label: "Linha CPU",
        getValue: (p) => getNotebook(p)?.processorLine ?? "-",
        type: "text",
      },
      {
        key: "processorModel",
        label: "Modelo CPU",
        getValue: (p) => getNotebook(p)?.processorModel ?? "-",
        type: "text",
      },
      {
        key: "processor",
        label: "Processador",
        getValue: (p) => getNotebook(p)?.processor ?? "-",
        type: "text",
      },
      {
        key: "processorMaxSpeed",
        label: "Velocidade Máx",
        getValue: (p) => getNotebook(p)?.processorMaxSpeed ?? "-",
        type: "text",
      },
      {
        key: "processorCores",
        label: "Núcleos",
        getValue: (p) => getNotebook(p)?.processorCores?.toString() ?? "-",
        type: "text",
      },
      {
        key: "chipset",
        label: "Chipset",
        getValue: (p) => getNotebook(p)?.chipset ?? "-",
        type: "text",
      },
      {
        key: "gpuBrand",
        label: "GPU Marca",
        getValue: (p) => getNotebook(p)?.gpuBrand ?? "-",
        type: "text",
      },
      {
        key: "gpuLine",
        label: "GPU Linha",
        getValue: (p) => getNotebook(p)?.gpuLine ?? "-",
        type: "text",
      },
      {
        key: "gpuModel",
        label: "GPU Modelo",
        getValue: (p) => getNotebook(p)?.gpuModel ?? "-",
        type: "text",
      },
      {
        key: "gpu",
        label: "GPU",
        getValue: (p) => getNotebook(p)?.gpu ?? "-",
        type: "text",
      },
    ],
  },

  {
    id: "memory",
    title: "Memória e Armazenamento",
    specs: [
      {
        key: "ram",
        label: "RAM",
        getValue: (p) => getNotebook(p)?.ram ?? "-",
        type: "text",
      },
      {
        key: "ramSpeed",
        label: "Velocidade RAM",
        getValue: (p) => getNotebook(p)?.ramSpeed ?? "-",
        type: "text",
      },
      {
        key: "ramType",
        label: "Tipo RAM",
        getValue: (p) => getNotebook(p)?.ramType ?? "-",
        type: "text",
      },
      {
        key: "ramSlots",
        label: "Slots RAM",
        getValue: (p) => getNotebook(p)?.ramSlots?.toString() ?? "-",
        type: "text",
      },
      {
        key: "maxRamSupported",
        label: "RAM Máx",
        getValue: (p) => getNotebook(p)?.maxRamSupported ?? "-",
        type: "text",
      },
      {
        key: "storage",
        label: "Armazenamento",
        getValue: (p) => getNotebook(p)?.storage ?? "-",
        type: "text",
      },
      {
        key: "storageType",
        label: "Tipo Armazenamento",
        getValue: (p) => getNotebook(p)?.storageType ?? "-",
        type: "text",
      },
      {
        key: "ssdInterface",
        label: "Interface SSD",
        getValue: (p) => getNotebook(p)?.ssdInterface ?? "-",
        type: "text",
      },
      {
        key: "expandableStorage",
        label: "Expansível",
        getValue: (p) => getNotebook(p)?.expandableStorage ?? false,
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
        getValue: (p) => getNotebook(p)?.battery.capacity ?? "-",
        type: "text",
      },
      {
        key: "type",
        label: "Tipo",
        getValue: (p) => getNotebook(p)?.battery.type ?? "-",
        type: "text",
      },
      {
        key: "duration",
        label: "Duração",
        getValue: (p) => getNotebook(p)?.battery.duration ?? "-",
        type: "text",
      },
    ],
  },

  {
    id: "connectivity",
    title: "Conectividade",
    specs: [
      {
        key: "wifi",
        label: "Wi-Fi",
        getValue: (p) => getNotebook(p)?.connectivity.wifi ?? "-",
        type: "text",
      },
      {
        key: "bluetooth",
        label: "Bluetooth",
        getValue: (p) => getNotebook(p)?.connectivity.bluetooth ?? "-",
        type: "text",
      },
      {
        key: "ethernet",
        label: "Ethernet",
        getValue: (p) => getNotebook(p)?.connectivity.ethernet ?? false,
        type: "boolean",
      },
      {
        key: "usb",
        label: "USB",
        getValue: (p) => getNotebook(p)?.connectivity.usb ?? "-",
        type: "text",
      },
      {
        key: "hdmi",
        label: "HDMI",
        getValue: (p) => getNotebook(p)?.connectivity.hdmi ?? false,
        type: "boolean",
      },
      {
        key: "thunderbolt",
        label: "Thunderbolt",
        getValue: (p) => getNotebook(p)?.connectivity.thunderbolt ?? false,
        type: "boolean",
      },
      {
        key: "sdCardReader",
        label: "Leitor SD",
        getValue: (p) => getNotebook(p)?.connectivity.sdCardReader ?? false,
        type: "boolean",
      },
      {
        key: "headphoneJack",
        label: "P2",
        getValue: (p) => getNotebook(p)?.connectivity.headphoneJack ?? false,
        type: "boolean",
      },
    ],
  },

  {
    id: "physical",
    title: "Físico",
    specs: [
      {
        key: "dimensions",
        label: "Dimensões",
        getValue: (p) => getNotebook(p)?.dimensions ?? "-",
        type: "text",
      },
      {
        key: "weight",
        label: "Peso",
        getValue: (p) => getNotebook(p)?.weight ?? "-",
        type: "text",
      },
      {
        key: "material",
        label: "Material",
        getValue: (p) => getNotebook(p)?.material ?? "-",
        type: "text",
      },
      {
        key: "ports",
        label: "Portas",
        getValue: (p) => getNotebook(p)?.ports ?? "-",
        type: "text",
      },
      {
        key: "coolingSystem",
        label: "Refrigeração",
        getValue: (p) => getNotebook(p)?.coolingSystem ?? "-",
        type: "text",
      },
      {
        key: "fingerprint",
        label: "Leitor Digital",
        getValue: (p) => getNotebook(p)?.fingerprint ?? false,
        type: "boolean",
      },
      {
        key: "optimizedForAI",
        label: "IA",
        getValue: (p) => getNotebook(p)?.optimizedForAI ?? false,
        type: "boolean",
      },
    ],
  },
];
```

## Exemplo Produto Object JSON Notebook que você deve fazer

```json
{
  "id": "multi-ultra-ub261",
  "name": "Ultra UB261",
  "brand": "Multi",
  "line": "Ultra",
  "model": "UB261",
  "detailedModel": "UB261",
  "color": "Cinza",
  "image": "https://http2.mlstatic.com/D_NQ_NP_2X_971996-MLA99584761368_122025-F.webp",
  "price": 0,
  "releaseDate": "2022",
  "releaseMonth": null,
  "releaseYear": 2022,
  "origin": null,
  "category": "notebooks",
  "anatelNumber": "157772203111",
  "mercadolivreUrl": "https://mercadolivre.com/sec/2daonYX",
  "specs": {
    "display": {
      "size": "15,6\"",
      "resolution": "1366 x 768",
      "type": "LED",
      "refreshRate": "60 Hz",
      "touchscreen": false,
      "retina": false,
      "antiGlare": false,
      "panelType": "TN",
      "colorGamut": null,
      "aspectRatio": "16:9"
    },
    "processor": "Intel Celeron N4020C",
    "processorBrand": "Intel",
    "processorLine": "Celeron",
    "processorModel": "N4020C",
    "processorMaxSpeed": "2,8 GHz",
    "processorCores": 2,
    "chipset": null,
    "gpu": "Intel UHD Graphics 600",
    "gpuBrand": "Intel",
    "gpuLine": "UHD",
    "gpuModel": "UHD Graphics 600",
    "integratedGpu": {
      "brand": "Intel",
      "line": "UHD",
      "model": "UHD Graphics 600"
    },
    "dedicatedGpu": null,
    "ram": "4 GB",
    "ramSpeed": null,
    "ramType": "LPDDR4",
    "maxRamSupported": "4 GB",
    "ramSlots": null,
    "storage": "128 GB",
    "storageType": "eMMC",
    "ssdInterface": "eMMC",
    "m2StorageCapacity": null,
    "expandableStorage": true,
    "battery": {
      "capacity": null,
      "type": "Íon de lítio",
      "duration": null
    },
    "os": "Windows",
    "osVersion": "11",
    "osEdition": "Home",
    "dimensions": "35,74 x 23,38 x 1,99 cm",
    "width": "35,74 cm",
    "depth": "23,38 cm",
    "height": "1,99 cm",
    "weight": "1,45 kg",
    "keyboard": {
      "backlit": false,
      "numpad": true,
      "type": "ABNT2",
      "language": "Português"
    },
    "webcam": {
      "resolution": "2MP",
      "privacy": false
    },
    "audio": {
      "speakers": "Áudio de Alta Definição (HD)",
      "speakerCount": 2,
      "microphoneQuality": "Sim",
      "soundModes": null
    },
    "connectivity": {
      "wifi": "Wi-Fi 4 (802.11n)",
      "bluetooth": "Bluetooth 5.0",
      "ethernet": false,
      "usb": "2x USB 3.2",
      "hdmi": true,
      "thunderbolt": false,
      "sdCardReader": true,
      "headphoneJack": true,
      "videoPortTypes": "Mini HDMI"
    },
    "ports": "2x USB 3.2, 1x Micro SD, 1x Mini HDMI, 1x Audio Combo",
    "coolingSystem": null,
    "fingerprint": false,
    "material": "Plástico",
    "manufacturer": "Multilaser Industrial S.A.",
    "includedAccessories": "Notebook, fonte de alimentação, guia rápido",
    "optimizedForAI": false,
    "ratings": {
      "costBenefit": 6.5,
      "performance": 2.5,
      "display": 4.0,
      "battery": 5.5,
      "portability": 7.5
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
"notebooks": [
      {
        "name": "MacBook Air M2 2022",
        "brand": "Apple",
        "detailedModel": "A2681",
        "model": "MacBook Air M2"
      },
      {
        "name": "Nitro V15 ANV15-52-737P",
        "brand": "Acer",
        "detailedModel": "ANV15-52-737P",
        "model": "Nitro V15"
      },
      {
        "name": "Nitro ANV15-51-51UZ",
        "brand": "Acer",
        "detailedModel": "ANV15-51-51UZ",
        "model": "Nitro V15"
      },
      {
        "name": "MacBook Air M4",
        "brand": "Apple",
        "detailedModel": "MacBook Air M4",
        "model": "MacBook Air M4"
      },
      {
        "name": "IdeaPad 1i 15IJL7",
        "brand": "Lenovo",
        "detailedModel": "82QH0007BR",
        "model": "IdeaPad 1i 15IJL7"
      },
      {
        "name": "Vivobook Go 15 E1504",
        "brand": "ASUS",
        "detailedModel": "E1504FA-NJ825W",
        "model": "E1504FA"
      },
      {
        "name": "Aspire Go 15",
        "brand": "Acer",
        "detailedModel": "AG15-51P-39MU",
        "model": "AG15-51P"
      },
      {
        "name": "Inspiron 15",
        "brand": "Dell",
        "detailedModel": "I15-I3100-A15P",
        "model": "I15-I3100"
      },
      {
        "name": "Inspiron I15-I1300-A60P",
        "brand": "Dell",
        "detailedModel": "I15-I1300-A60P",
        "model": "I15-I1300-A60P"
      },
      {
        "name": "256R G9",
        "brand": "HP",
        "detailedModel": "BQ9L2AT#AK4",
        "model": "256R G9"
      },
      {
        "name": "Ultra UB250",
        "brand": "Multi",
        "detailedModel": "UB250",
        "model": "UB250"
      },
      {
        "name": "Ultra UB261",
        "brand": "Multi",
        "detailedModel": "UB261",
        "model": "UB261"
      },
      {
        "name": "IdeaPad 1 15IRU7",
        "brand": "Lenovo",
        "detailedModel": "83QJ0001BO",
        "model": "IdeaPad 1 15IRU7"
      },
      {
        "name": "TUF Gaming F16",
        "brand": "Asus",
        "detailedModel": "FX607VJ-RL007W",
        "model": "TUF Gaming F16"
      }
    ]
```

Se eu passar dados de um item já cadastrado antes, ou que você já mandou os dados, pare o processo e me pergunte se eu quero continuar mesmo assim.
