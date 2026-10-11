# Contexto

- Site: <https://tudohardware.com>
- Os dados dos produtos são salvos em formato JSON

## Tipagem do objeto JSON que você vai criar

```ts
import { SpecSection } from "../spec-configs";
import { BaseProduct, Product } from "../types";

function isGpu(product: Product): product is GPU {
  return product.category === "gpus";
}

export interface GPU extends BaseProduct {
  category: "gpus";
  specs: GpuSpecs;
}

function getGpu(p: Product): GpuSpecs | null {
  return isGpu(p) ? p.specs : null;
}

export interface GpuSpecs {
  manufacturer: "Nvidia" | "AMD" | "Intel";
  chipset: string;
  series?: string;
  edition?: string;
  memory: {
    size: string;
    type:
      | "GDDR3"
      | "GDDR5"
      | "GDDR5X"
      | "GDDR6"
      | "GDDR6X"
      | "GDDR7"
      | "HBM2"
      | "HBM2e"
      | "HBM3";
    bus: string;
    bandwidth?: string;
    speed?: string;
  };
  processor: {
    cudaCores?: number;
    streamProcessors?: number;
    rtCores?: number;
    tensorCores?: number;
    baseClock?: string;
    boostClock?: string;
    ocBoostClock?: string;
  };
  display: {
    maxResolution?: string;
    outputs: string;
    outputCount?: number;
    hdmiVersion?: string;
    displayPortVersion?: string;
  };
  power: {
    tdp?: string;
    tgp?: string;
    requirement?: string;
    connector?: string;
  };
  interface:
    | "PCI-Express 2.0"
    | "PCI-Express 3.0"
    | "PCI-Express 4.0"
    | "PCI-Express 5.0"
    | "PCIe 5.0"
    | "AGP";
  cooling: {
    type: "Ar" | "Líquido" | "Passivo" | "Híbrido";
    slotSize?: string;
    fanCount?: number;
  };
  features: {
    rayTracing?: boolean;
    dlss?: boolean;
    dlssVersion?: string;
    fsr?: boolean;
    fsrVersion?: string;
    nvidiaReflex?: boolean;
    nvenc?: boolean;
    nvdec?: boolean;
    vr?: boolean;
    gSync?: boolean;
    freeSync?: boolean;
    resizableBar?: boolean;
    directX?: string;
    openGL?: string;
    vulkan?: string;
    cuda?: string;
    openCL?: string;
  };
  dimensions?: {
    height?: string;
    width?: string;
    length?: string;
    weight?: string;
  };
  ratings: {
    costBenefit: number | null;
    gamingPerformance: number;
    powerEfficiency: number;
    cooling: number;
    features: number;
  };
}

export const gpuSpecs: SpecSection[] = [
  {
    id: "ratings",
    title: "Notas",
    specs: [
      {
        key: "costBenefit",
        label: "Custo-benefício",
        getValue: (p) => getGpu(p)?.ratings.costBenefit ?? null,
        type: "rating",
      },
      {
        key: "gamingPerformance",
        label: "Performance em Jogos",
        getValue: (p) => getGpu(p)?.ratings.gamingPerformance ?? null,
        type: "rating",
      },
      {
        key: "powerEfficiency",
        label: "Eficiência Energética",
        getValue: (p) => getGpu(p)?.ratings.powerEfficiency ?? null,
        type: "rating",
      },
      {
        key: "cooling",
        label: "Refrigeração",
        getValue: (p) => getGpu(p)?.ratings.cooling ?? null,
        type: "rating",
      },
      {
        key: "features",
        label: "Recursos",
        getValue: (p) => getGpu(p)?.ratings.features ?? null,
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
        key: "manufacturer",
        label: "Fabricante",
        getValue: (p) => getGpu(p)?.manufacturer ?? "-",
        type: "text",
      },
      {
        key: "chipset",
        label: "Chipset",
        getValue: (p) => getGpu(p)?.chipset ?? "-",
        type: "text",
      },
      {
        key: "series",
        label: "Série",
        getValue: (p) => getGpu(p)?.series ?? "-",
        type: "text",
      },
      {
        key: "edition",
        label: "Edição",
        getValue: (p) => getGpu(p)?.edition ?? "-",
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
    id: "memory",
    title: "Memória",
    specs: [
      {
        key: "memorySize",
        label: "Tamanho",
        getValue: (p) => getGpu(p)?.memory.size ?? "-",
        type: "text",
      },
      {
        key: "memoryType",
        label: "Tipo",
        getValue: (p) => getGpu(p)?.memory.type ?? "-",
        type: "text",
      },
      {
        key: "memoryBus",
        label: "Bus",
        getValue: (p) => getGpu(p)?.memory.bus ?? "-",
        type: "text",
      },
      {
        key: "memoryBandwidth",
        label: "Largura de Banda",
        getValue: (p) => getGpu(p)?.memory.bandwidth ?? "-",
        type: "text",
      },
      {
        key: "memorySpeed",
        label: "Velocidade",
        getValue: (p) => getGpu(p)?.memory.speed ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "processor",
    title: "Processador Gráfico",
    specs: [
      {
        key: "cudaCores",
        label: "CUDA Cores",
        getValue: (p) => getGpu(p)?.processor.cudaCores?.toString() ?? "-",
        type: "text",
      },
      {
        key: "streamProcessors",
        label: "Stream Processors",
        getValue: (p) =>
          getGpu(p)?.processor.streamProcessors?.toString() ?? "-",
        type: "text",
      },
      {
        key: "rtCores",
        label: "RT Cores",
        getValue: (p) => getGpu(p)?.processor.rtCores?.toString() ?? "-",
        type: "text",
      },
      {
        key: "tensorCores",
        label: "Tensor Cores",
        getValue: (p) => getGpu(p)?.processor.tensorCores?.toString() ?? "-",
        type: "text",
      },
      {
        key: "baseClock",
        label: "Clock Base",
        getValue: (p) => getGpu(p)?.processor.baseClock ?? "-",
        type: "text",
      },
      {
        key: "boostClock",
        label: "Clock Boost",
        getValue: (p) => getGpu(p)?.processor.boostClock ?? "-",
        type: "text",
      },
      {
        key: "ocBoostClock",
        label: "Clock OC",
        getValue: (p) => getGpu(p)?.processor.ocBoostClock ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "display",
    title: "Vídeo",
    specs: [
      {
        key: "maxResolution",
        label: "Resolução Máxima",
        getValue: (p) => getGpu(p)?.display.maxResolution ?? "-",
        type: "text",
      },
      {
        key: "outputs",
        label: "Saídas",
        getValue: (p) => getGpu(p)?.display.outputs ?? "-",
        type: "text",
      },
      {
        key: "outputCount",
        label: "Número de Saídas",
        getValue: (p) => getGpu(p)?.display.outputCount?.toString() ?? "-",
        type: "text",
      },
      {
        key: "hdmiVersion",
        label: "HDMI",
        getValue: (p) => getGpu(p)?.display.hdmiVersion ?? "-",
        type: "text",
      },
      {
        key: "displayPortVersion",
        label: "DisplayPort",
        getValue: (p) => getGpu(p)?.display.displayPortVersion ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "power",
    title: "Energia",
    specs: [
      {
        key: "tdp",
        label: "TDP",
        getValue: (p) => getGpu(p)?.power.tdp ?? "-",
        type: "text",
      },
      {
        key: "tgp",
        label: "TGP",
        getValue: (p) => getGpu(p)?.power.tgp ?? "-",
        type: "text",
      },
      {
        key: "requirement",
        label: "Fonte Recomendada",
        getValue: (p) => getGpu(p)?.power.requirement ?? "-",
        type: "text",
      },
      {
        key: "connector",
        label: "Conector",
        getValue: (p) => getGpu(p)?.power.connector ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "interface",
    title: "Interface",
    specs: [
      {
        key: "interface",
        label: "Slot",
        getValue: (p) => getGpu(p)?.interface ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "cooling",
    title: "Refrigeração",
    specs: [
      {
        key: "coolingType",
        label: "Tipo",
        getValue: (p) => getGpu(p)?.cooling.type ?? "-",
        type: "text",
      },
      {
        key: "slotSize",
        label: "Tamanho do Slot",
        getValue: (p) => getGpu(p)?.cooling.slotSize ?? "-",
        type: "text",
      },
      {
        key: "fanCount",
        label: "Número de Ventoinhas",
        getValue: (p) => getGpu(p)?.cooling.fanCount?.toString() ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "features",
    title: "Recursos",
    specs: [
      {
        key: "rayTracing",
        label: "Ray Tracing",
        getValue: (p) => getGpu(p)?.features.rayTracing ?? false,
        type: "boolean",
      },
      {
        key: "dlss",
        label: "DLSS",
        getValue: (p) => getGpu(p)?.features.dlss ?? false,
        type: "boolean",
      },
      {
        key: "dlssVersion",
        label: "Versão DLSS",
        getValue: (p) => getGpu(p)?.features.dlssVersion ?? "-",
        type: "text",
      },
      {
        key: "fsr",
        label: "FSR",
        getValue: (p) => getGpu(p)?.features.fsr ?? false,
        type: "boolean",
      },
      {
        key: "fsrVersion",
        label: "Versão FSR",
        getValue: (p) => getGpu(p)?.features.fsrVersion ?? "-",
        type: "text",
      },
      {
        key: "nvidiaReflex",
        label: "NVIDIA Reflex",
        getValue: (p) => getGpu(p)?.features.nvidiaReflex ?? false,
        type: "boolean",
      },
      {
        key: "nvenc",
        label: "NVENC",
        getValue: (p) => getGpu(p)?.features.nvenc ?? false,
        type: "boolean",
      },
      {
        key: "nvdec",
        label: "NVDEC",
        getValue: (p) => getGpu(p)?.features.nvdec ?? false,
        type: "boolean",
      },
      {
        key: "vr",
        label: "VR Ready",
        getValue: (p) => getGpu(p)?.features.vr ?? false,
        type: "boolean",
      },
      {
        key: "gSync",
        label: "G-SYNC",
        getValue: (p) => getGpu(p)?.features.gSync ?? false,
        type: "boolean",
      },
      {
        key: "freeSync",
        label: "FreeSync",
        getValue: (p) => getGpu(p)?.features.freeSync ?? false,
        type: "boolean",
      },
      {
        key: "resizableBar",
        label: "Resizable BAR",
        getValue: (p) => getGpu(p)?.features.resizableBar ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "compatibility",
    title: "Compatibilidade",
    specs: [
      {
        key: "directX",
        label: "DirectX",
        getValue: (p) => getGpu(p)?.features.directX ?? "-",
        type: "text",
      },
      {
        key: "openGL",
        label: "OpenGL",
        getValue: (p) => getGpu(p)?.features.openGL ?? "-",
        type: "text",
      },
      {
        key: "vulkan",
        label: "Vulkan",
        getValue: (p) => getGpu(p)?.features.vulkan ?? "-",
        type: "text",
      },
      {
        key: "cuda",
        label: "CUDA",
        getValue: (p) => getGpu(p)?.features.cuda ?? "-",
        type: "text",
      },
      {
        key: "openCL",
        label: "OpenCL",
        getValue: (p) => getGpu(p)?.features.openCL ?? "-",
        type: "text",
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
        getValue: (p) => getGpu(p)?.dimensions?.height ?? "-",
        type: "text",
      },
      {
        key: "width",
        label: "Largura",
        getValue: (p) => getGpu(p)?.dimensions?.width ?? "-",
        type: "text",
      },
      {
        key: "length",
        label: "Comprimento",
        getValue: (p) => getGpu(p)?.dimensions?.length ?? "-",
        type: "text",
      },
      {
        key: "weight",
        label: "Peso",
        getValue: (p) => getGpu(p)?.dimensions?.weight ?? "-",
        type: "text",
      },
    ],
  },
];
```

## Exemplo Produto Object JSON de Placa de vídeo que você deve fazer

```json
{
  "id": "arktek-gtx-1050-ti-4gb",
  "name": "GTX 1050 Ti 4GB",
  "brand": "Arktek",
  "line": "GeForce 10 Series",
  "model": "GTX 1050 Ti",
  "detailedModel": "GTX 1050 Ti 4GB GDDR5",
  "color": null,
  "image": "https://http2.mlstatic.com/D_NQ_NP_2X_881331-MLA99924157499_112025-F.webp",
  "price": 0,
  "releaseDate": "Outubro de 2016",
  "releaseMonth": 10,
  "releaseYear": 2016,
  "origin": null,
  "category": "gpus",
  "anatelNumber": null,
  "mercadolivreUrl": "https://mercadolivre.com/sec/26EkNgN",
  "specs": {
    "manufacturer": "Nvidia",
    "chipset": "GP107",
    "series": "GeForce 10 Series",
    "edition": null,
    "memory": {
      "size": "4 GB",
      "type": "GDDR5",
      "bus": "128-bit",
      "bandwidth": "112 GB/s",
      "speed": "7000 MHz"
    },
    "processor": {
      "cudaCores": 768,
      "streamProcessors": null,
      "rtCores": null,
      "tensorCores": null,
      "baseClock": "1290 MHz",
      "boostClock": "1392 MHz",
      "ocBoostClock": null
    },
    "display": {
      "maxResolution": "8K",
      "outputs": "DVI-D, HDMI, DisplayPort",
      "outputCount": 3,
      "hdmiVersion": "2.0b",
      "displayPortVersion": "1.4"
    },
    "power": {
      "tdp": "75 W",
      "tgp": null,
      "requirement": "300 W",
      "connector": null
    },
    "interface": "PCI-Express 3.0",
    "cooling": {
      "type": "Ar",
      "slotSize": "Dual-slot",
      "fanCount": null
    },
    "features": {
      "rayTracing": false,
      "dlss": false,
      "dlssVersion": null,
      "fsr": false,
      "fsrVersion": null,
      "nvidiaReflex": false,
      "nvenc": true,
      "nvdec": true,
      "vr": false,
      "gSync": true,
      "freeSync": false,
      "resizableBar": false,
      "directX": "12",
      "openGL": "4.5",
      "vulkan": "1.3",
      "cuda": "6.1",
      "openCL": "1.2"
    },
    "dimensions": {
      "height": "120 mm",
      "width": null,
      "length": "210 mm",
      "weight": null
    },
    "ratings": {
      "costBenefit": 4.5,
      "gamingPerformance": 4.0,
      "powerEfficiency": 8.0,
      "cooling": 6.5,
      "features": 3.0
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

```json
"gpus": [
      {
        "name": "GTX 1050 Ti 4GB",
        "brand": "Arktek",
        "detailedModel": "GTX 1050 Ti 4GB GDDR5",
        "model": "GTX 1050 Ti"
      },
      {
        "name": "RTX 5060 8GB Dual",
        "brand": "Asus",
        "detailedModel": "ASUS Dual GeForce RTX 5060 8GB",
        "model": "DUAL-RTX5060-O8G"
      },
      {
        "name": "RX 6600 8GB",
        "brand": "ASRock",
        "detailedModel": "Asrock Challenger D RX 6600 8GB",
        "model": "RX 6600"
      },
      {
        "name": "GeForce RTX 3050 Ventus 2X 6G OC",
        "brand": "MSI",
        "detailedModel": "MSI GeForce RTX 3050 Ventus 2X 6G OC",
        "model": "GeForce RTX 3050 Ventus 2X"
      },
      {
        "name": "RTX5060 8GB Black GF 1-click OC",
        "brand": "Galax",
        "detailedModel": "GPU NV RTX5060 56NSN8MDDCOC",
        "model": "56NSN8MDDCOC"
      },
      {
        "name": "RTX 5060 8G VENTUS 2X OC",
        "brand": "MSI",
        "detailedModel": "VENTUS 2X OC",
        "model": "RTX 5060 8G VENTUS 2X OC"
      },
      {
        "name": "RX580/8G",
        "brand": "Revenger",
        "detailedModel": "RX580/8G",
        "model": "RX580/8G"
      },
      {
        "name": "GeForce GT 730",
        "brand": "Revenger",
        "detailedModel": "GeForce GT 730 4GB DDR3",
        "model": "GeForce GT 730"
      },
      {
        "name": "RTX 3060 Black Edition",
        "brand": "Zotac",
        "detailedModel": "ZT-A30600E-10M 12GB",
        "model": "RTX 3060"
      },
      {
        "name": "RTX 5060 Windforce OC",
        "brand": "Gigabyte",
        "detailedModel": "GV-N5060WF2OC-8GB",
        "model": "Windforce OC"
      },
      {
        "name": "RTX 5060 Ti Shadow 2X OC Plus",
        "brand": "MSI",
        "detailedModel": "GPU NV RTX5060TI 912-V535-029",
        "model": "Shadow 2X OC Plus"
      },
      {
        "name": "RX 7600 Gaming OC",
        "brand": "Gigabyte",
        "detailedModel": "GV-R76GAMING OC-8GD",
        "model": "RX 7600"
      }
    ]
```

- Se eu passar dados de um item já cadastrado antes, ou que você já mandou os dados, pare o processo e me pergunte se eu quero continuar mesmo assim.
