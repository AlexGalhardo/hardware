# Contexto

- Site: <https://alexgalhardo.github.io/tudohardware>
- Os dados dos produtos são salvos em formato JSON

## Tipagem do objeto JSON que você vai criar

```ts
import { SpecSection } from "../spec-configs";
import { BaseProduct, Product } from "../types";

function isCpu(product: Product): product is CPU {
  return product.category === "cpus";
}

export interface CPU extends BaseProduct {
  category: "cpus";
  specs: CpuSpecs;
}

function getCpu(p: Product): CpuSpecs | null {
  return isCpu(p) ? p.specs : null;
}

export interface CpuSpecs {
  manufacturer: "Intel" | "AMD";
  series?: string;
  architecture?: string;
  lithography?: string;
  socket: string;
  application:
    | "Computadores de mesa"
    | "Notebooks"
    | "Servidores"
    | "Workstation";
  cores: {
    count: number;
    threads: number;
    performanceCores?: number;
    efficientCores?: number;
  };
  frequency: {
    base: string;
    boost: string;
    allCoreBoost?: string;
  };
  cache: {
    l1?: string;
    l2?: string;
    l3: string;
    total?: string;
  };
  memory: {
    types: string[];
    maxSize: string;
    channels?: number;
    maxSpeed?: string;
    maxBandwidth?: string;
  };
  power: {
    tdp: string;
    maxTurbo?: string;
    baseWatts?: number;
  };
  graphics?: {
    hasIntegrated: boolean;
    model?: string;
    brand?: string;
    baseFrequency?: string;
    maxFrequency?: string;
    executionUnits?: number;
    computeUnits?: number;
    directX?: string;
    openGL?: string;
    outputsSupport?: string;
    maxDisplays?: number;
    maxResolution?: string;
  };
  pcie?: {
    version: string;
    lanes?: number;
  };
  features: {
    unlocked?: boolean;
    hyperThreading?: boolean;
    turboBoost?: boolean;
    precisionBoost?: boolean;
    overclocking?: boolean;
    virtualization?: boolean;
    k4Support?: boolean;
    ecc?: boolean;
    secure?: string[];
  };
  cooling?: {
    type?: string;
    included?: boolean;
    coolerModel?: string;
  };
  temperature?: {
    max?: string;
    tjMax?: string;
  };
  other?: {
    isGaming?: boolean;
    isOEM?: boolean;
    instructionSet?: string[];
    boxContents?: string[];
  };
  ratings: {
    costBenefit: number | null;
    singleCorePerformance: number;
    multiCorePerformance: number;
    gaming: number;
    powerEfficiency: number;
  };
}

export const cpuSpecs: SpecSection[] = [
  {
    id: "ratings",
    title: "Notas",
    specs: [
      {
        key: "costBenefit",
        label: "Custo-benefício",
        getValue: (p) => getCpu(p)?.ratings.costBenefit ?? null,
        type: "rating",
      },
      {
        key: "singleCorePerformance",
        label: "Performance Single-Core",
        getValue: (p) => getCpu(p)?.ratings.singleCorePerformance ?? null,
        type: "rating",
      },
      {
        key: "multiCorePerformance",
        label: "Performance Multi-Core",
        getValue: (p) => getCpu(p)?.ratings.multiCorePerformance ?? null,
        type: "rating",
      },
      {
        key: "gaming",
        label: "Gaming",
        getValue: (p) => getCpu(p)?.ratings.gaming ?? null,
        type: "rating",
      },
      {
        key: "powerEfficiency",
        label: "Eficiência Energética",
        getValue: (p) => getCpu(p)?.ratings.powerEfficiency ?? null,
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
        getValue: (p) => getCpu(p)?.manufacturer ?? "-",
        type: "text",
      },
      {
        key: "series",
        label: "Série",
        getValue: (p) => getCpu(p)?.series ?? "-",
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
        key: "socket",
        label: "Soquete",
        getValue: (p) => getCpu(p)?.socket ?? "-",
        type: "text",
      },
      {
        key: "architecture",
        label: "Arquitetura",
        getValue: (p) => getCpu(p)?.architecture ?? "-",
        type: "text",
      },
      {
        key: "lithography",
        label: "Litografia",
        getValue: (p) => getCpu(p)?.lithography ?? "-",
        type: "text",
      },
      {
        key: "application",
        label: "Aplicação",
        getValue: (p) => getCpu(p)?.application ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "cores",
    title: "Núcleos e Threads",
    specs: [
      {
        key: "coreCount",
        label: "Núcleos",
        getValue: (p) => getCpu(p)?.cores.count.toString() ?? "-",
        type: "text",
      },
      {
        key: "threadCount",
        label: "Threads",
        getValue: (p) => getCpu(p)?.cores.threads.toString() ?? "-",
        type: "text",
      },
      {
        key: "performanceCores",
        label: "P-Cores",
        getValue: (p) => getCpu(p)?.cores.performanceCores?.toString() ?? "-",
        type: "text",
      },
      {
        key: "efficientCores",
        label: "E-Cores",
        getValue: (p) => getCpu(p)?.cores.efficientCores?.toString() ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "frequency",
    title: "Frequência",
    specs: [
      {
        key: "baseFrequency",
        label: "Frequência Base",
        getValue: (p) => getCpu(p)?.frequency.base ?? "-",
        type: "text",
      },
      {
        key: "boostFrequency",
        label: "Frequência Turbo",
        getValue: (p) => getCpu(p)?.frequency.boost ?? "-",
        type: "text",
      },
      {
        key: "allCoreBoost",
        label: "All-Core Boost",
        getValue: (p) => getCpu(p)?.frequency.allCoreBoost ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "cache",
    title: "Cache",
    specs: [
      {
        key: "l1Cache",
        label: "Cache L1",
        getValue: (p) => getCpu(p)?.cache.l1 ?? "-",
        type: "text",
      },
      {
        key: "l2Cache",
        label: "Cache L2",
        getValue: (p) => getCpu(p)?.cache.l2 ?? "-",
        type: "text",
      },
      {
        key: "l3Cache",
        label: "Cache L3",
        getValue: (p) => getCpu(p)?.cache.l3 ?? "-",
        type: "text",
      },
      {
        key: "totalCache",
        label: "Cache Total",
        getValue: (p) => getCpu(p)?.cache.total ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "memory",
    title: "Memória",
    specs: [
      {
        key: "memoryTypes",
        label: "Tipos Suportados",
        getValue: (p) => getCpu(p)?.memory.types.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "maxMemorySize",
        label: "Tamanho Máximo",
        getValue: (p) => getCpu(p)?.memory.maxSize ?? "-",
        type: "text",
      },
      {
        key: "memoryChannels",
        label: "Canais",
        getValue: (p) => getCpu(p)?.memory.channels?.toString() ?? "-",
        type: "text",
      },
      {
        key: "maxMemorySpeed",
        label: "Velocidade Máxima",
        getValue: (p) => getCpu(p)?.memory.maxSpeed ?? "-",
        type: "text",
      },
      {
        key: "maxBandwidth",
        label: "Largura de Banda",
        getValue: (p) => getCpu(p)?.memory.maxBandwidth ?? "-",
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
        getValue: (p) => getCpu(p)?.power.tdp ?? "-",
        type: "text",
      },
      {
        key: "maxTurbo",
        label: "TDP Turbo Máximo",
        getValue: (p) => getCpu(p)?.power.maxTurbo ?? "-",
        type: "text",
      },
      {
        key: "baseWatts",
        label: "Potência Base",
        getValue: (p) => getCpu(p)?.power.baseWatts?.toString() ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "graphics",
    title: "Gráficos Integrados",
    specs: [
      {
        key: "hasIntegrated",
        label: "Gráficos Integrados",
        getValue: (p) => getCpu(p)?.graphics?.hasIntegrated ?? false,
        type: "boolean",
      },
      {
        key: "gpuModel",
        label: "Modelo",
        getValue: (p) => getCpu(p)?.graphics?.model ?? "-",
        type: "text",
      },
      {
        key: "gpuBrand",
        label: "Marca",
        getValue: (p) => getCpu(p)?.graphics?.brand ?? "-",
        type: "text",
      },
      {
        key: "gpuBaseFreq",
        label: "Frequência Base",
        getValue: (p) => getCpu(p)?.graphics?.baseFrequency ?? "-",
        type: "text",
      },
      {
        key: "gpuMaxFreq",
        label: "Frequência Máxima",
        getValue: (p) => getCpu(p)?.graphics?.maxFrequency ?? "-",
        type: "text",
      },
      {
        key: "executionUnits",
        label: "Execution Units",
        getValue: (p) => getCpu(p)?.graphics?.executionUnits?.toString() ?? "-",
        type: "text",
      },
      {
        key: "computeUnits",
        label: "Compute Units",
        getValue: (p) => getCpu(p)?.graphics?.computeUnits?.toString() ?? "-",
        type: "text",
      },
      {
        key: "directX",
        label: "DirectX",
        getValue: (p) => getCpu(p)?.graphics?.directX ?? "-",
        type: "text",
      },
      {
        key: "openGL",
        label: "OpenGL",
        getValue: (p) => getCpu(p)?.graphics?.openGL ?? "-",
        type: "text",
      },
      {
        key: "maxDisplays",
        label: "Máximo de Monitores",
        getValue: (p) => getCpu(p)?.graphics?.maxDisplays?.toString() ?? "-",
        type: "text",
      },
      {
        key: "maxResolution",
        label: "Resolução Máxima",
        getValue: (p) => getCpu(p)?.graphics?.maxResolution ?? "-",
        type: "text",
      },
      {
        key: "outputsSupport",
        label: "Saídas",
        getValue: (p) => getCpu(p)?.graphics?.outputsSupport ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "pcie",
    title: "PCI Express",
    specs: [
      {
        key: "pcieVersion",
        label: "Versão PCIe",
        getValue: (p) => getCpu(p)?.pcie?.version ?? "-",
        type: "text",
      },
      {
        key: "pcieLanes",
        label: "Lanes PCIe",
        getValue: (p) => getCpu(p)?.pcie?.lanes?.toString() ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "features",
    title: "Recursos",
    specs: [
      {
        key: "unlocked",
        label: "Desbloqueado",
        getValue: (p) => getCpu(p)?.features.unlocked ?? false,
        type: "boolean",
      },
      {
        key: "hyperThreading",
        label: "Hyper-Threading",
        getValue: (p) => getCpu(p)?.features.hyperThreading ?? false,
        type: "boolean",
      },
      {
        key: "turboBoost",
        label: "Turbo Boost",
        getValue: (p) => getCpu(p)?.features.turboBoost ?? false,
        type: "boolean",
      },
      {
        key: "precisionBoost",
        label: "Precision Boost",
        getValue: (p) => getCpu(p)?.features.precisionBoost ?? false,
        type: "boolean",
      },
      {
        key: "overclocking",
        label: "Overclocking",
        getValue: (p) => getCpu(p)?.features.overclocking ?? false,
        type: "boolean",
      },
      {
        key: "virtualization",
        label: "Virtualização",
        getValue: (p) => getCpu(p)?.features.virtualization ?? false,
        type: "boolean",
      },
      {
        key: "k4Support",
        label: "Suporte 4K",
        getValue: (p) => getCpu(p)?.features.k4Support ?? false,
        type: "boolean",
      },
      {
        key: "ecc",
        label: "Memória ECC",
        getValue: (p) => getCpu(p)?.features.ecc ?? false,
        type: "boolean",
      },
      {
        key: "secure",
        label: "Segurança",
        getValue: (p) => getCpu(p)?.features.secure?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "instructionSet",
        label: "Instruction Sets",
        getValue: (p) => getCpu(p)?.other?.instructionSet?.join(", ") ?? "-",
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
        getValue: (p) => getCpu(p)?.cooling?.type ?? "-",
        type: "text",
      },
      {
        key: "coolerIncluded",
        label: "Cooler Incluso",
        getValue: (p) => getCpu(p)?.cooling?.included ?? false,
        type: "boolean",
      },
      {
        key: "coolerModel",
        label: "Modelo do Cooler",
        getValue: (p) => getCpu(p)?.cooling?.coolerModel ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "temperature",
    title: "Temperatura",
    specs: [
      {
        key: "maxTemp",
        label: "Temperatura Máxima",
        getValue: (p) => getCpu(p)?.temperature?.max ?? "-",
        type: "text",
      },
      {
        key: "tjMax",
        label: "TJ Max",
        getValue: (p) => getCpu(p)?.temperature?.tjMax ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "other",
    title: "Outros",
    specs: [
      {
        key: "isGaming",
        label: "Gaming",
        getValue: (p) => getCpu(p)?.other?.isGaming ?? false,
        type: "boolean",
      },
      {
        key: "isOEM",
        label: "OEM",
        getValue: (p) => getCpu(p)?.other?.isOEM ?? false,
        type: "boolean",
      },
      {
        key: "boxContents",
        label: "Conteúdo da Caixa",
        getValue: (p) => getCpu(p)?.other?.boxContents?.join(", ") ?? "-",
        type: "text",
      },
    ],
  },
];
```

## Exemplo Produto Object JSON de Smartwatch

```json
{
  "id": "intel-i3-550",
  "name": "Core i3-550",
  "brand": "Intel",
  "line": "Core i3",
  "model": "i3-550",
  "alphanumericModel": "BX80616I3550",
  "color": null,
  "image": "https://http2.mlstatic.com/D_NQ_NP_2X_767061-MLA99525926448_122025-F.webp",
  "price": 0,
  "releaseDate": "Q2 2010",
  "releaseMonth": 5,
  "releaseYear": 2010,
  "origin": null,
  "category": "cpus",
  "mercadolivreUrl": "https://mercadolivre.com/sec/1H5CAna",
  "specs": {
    "manufacturer": "Intel",
    "series": "1ª Geração Clarkdale",
    "architecture": "Clarkdale",
    "lithography": "32 nm",
    "socket": "FCLGA1156",
    "application": "Computadores de mesa",
    "cores": {
      "count": 2,
      "threads": 4,
      "performanceCores": null,
      "efficientCores": null
    },
    "frequency": {
      "base": "3,2 GHz",
      "boost": "3,2 GHz",
      "allCoreBoost": null
    },
    "cache": {
      "l1": "64 KB (32 KB I-Cache + 32 KB D-Cache por núcleo)",
      "l2": "512 KB (256 KB por núcleo)",
      "l3": "4 MB",
      "total": null
    },
    "memory": {
      "types": ["DDR3-1066/1333"],
      "maxSize": "16 GB",
      "channels": 2,
      "maxSpeed": "DDR3-1333 MHz",
      "maxBandwidth": "21 GB/s"
    },
    "power": {
      "tdp": "73 W",
      "maxTurbo": null,
      "baseWatts": null
    },
    "graphics": {
      "hasIntegrated": true,
      "model": "Intel HD Graphics",
      "brand": "Intel",
      "baseFrequency": "733 MHz",
      "maxFrequency": null,
      "executionUnits": null,
      "computeUnits": null,
      "directX": null,
      "openGL": null,
      "outputsSupport": null,
      "maxDisplays": 2,
      "maxResolution": null
    },
    "pcie": {
      "version": "2.0",
      "lanes": null
    },
    "features": {
      "unlocked": false,
      "hyperThreading": true,
      "turboBoost": false,
      "precisionBoost": false,
      "overclocking": false,
      "virtualization": true,
      "k4Support": false,
      "ecc": false,
      "secure": ["Intel AES New Instructions"]
    },
    "cooling": {
      "type": "Ar",
      "included": true,
      "coolerModel": null
    },
    "temperature": {
      "max": null,
      "tjMax": null
    },
    "other": {
      "isGaming": false,
      "isOEM": false,
      "instructionSet": ["x86-64", "SSE4.1", "SSE4.2"],
      "boxContents": null
    },
    "ratings": {
      "costBenefit": 5.0,
      "singleCorePerformance": 3.0,
      "multiCorePerformance": 2.5,
      "gaming": 2.0,
      "powerEfficiency": 4.5
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
"cpus": [
{
"name": "Core i3-6100",
"brand": "Intel",
"detailedModel": "i3-6100",
"model": "i3-6100"
},
{
"name": "Core i3-550",
"brand": "Intel",
"detailedModel": "i3-550",
"model": "i3-550"
},
{
"name": "Core i5-12400F",
"brand": "Intel",
"detailedModel": "i5-12400F",
"model": "i5-12400F"
},
{
"name": "Core i5-3570",
"brand": "Intel",
"detailedModel": "i5-3570",
"model": "i5-3570"
},
{
"name": "Ryzen 5 5600GT",
"brand": "AMD",
"detailedModel": "5600GT",
"model": "5600GT"
},
{
"name": "Ryzen 5 5500",
"brand": "AMD",
"detailedModel": "5500",
"model": "5500"
},
{
"name": "Core i5-2400",
"brand": "Intel",
"detailedModel": "i5-2400",
"model": "i5-2400"
},
{
"name": "FX-4300",
"brand": "AMD",
"detailedModel": "4300",
"model": "4300"
},
{
"name": "Ryzen 7 5700",
"brand": "AMD",
"detailedModel": "5700",
"model": "5700"
},
{
"name": "Core i3-8100",
"brand": "Intel",
"detailedModel": "i3-8100",
"model": "i3-8100"
},
{
"name": "Core i9-11900KF",
"brand": "Intel",
"detailedModel": "i9-11900KF",
"model": "i9-11900KF"
},
{
"name": "Core i7-14700F",
"brand": "Intel",
"detailedModel": "i7-14700F",
"model": "i7-14700F"
}
]
```

- Se eu passar dados de um item já cadastrado antes, ou que você já mandou os dados, pare o processo e me pergunte se eu quero continuar mesmo assim.
