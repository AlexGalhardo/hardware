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

function isTablet(product: Product): product is Tablet {
  return product.category === "tablets";
}

export interface Tablet extends BaseProduct {
  category: "tablets";
  specs: TabletSpecs;
}

function getTablet(p: Product): TabletSpecs | null {
  return isTablet(p) ? p.specs : null;
}

export interface TabletSpecs {
  display: {
    size: string;
    resolution: string;
    type: string;
    refreshRate: string;
    height?: string;
    width?: string;
    maxResolution?: string;
    ppi?: number;
    multiTouch?: boolean;
  };
  processor: string;
  chipset: string;
  ram: string;
  storage: string;
  expandableStorage: boolean;
  memoryCardTypes?: string[];
  maxMemorySupported?: string;
  memorySpeed?: number;
  battery: {
    capacity: string;
    type: string;
    duration?: string;
  };
  camera: {
    main: string;
    mainResolution?: string;
    mainQuantity?: number;
    front: string;
    frontResolution?: string;
    frontQuantity?: number;
    videoResolution?: string;
    flash?: boolean;
  };
  os: string;
  osVersion?: string;
  osCustomization?: string;
  dimensions: string;
  depth?: string;
  height?: string;
  width?: string;
  weight: string;
  connectivity: {
    wifi: string;
    bluetooth: string;
    bluetoothVersion?: string;
    cellular: boolean;
    usb: string;
    simCardReader?: string;
    dualSim?: boolean;
    gps?: boolean;
    headphoneJack?: boolean;
    microphone?: boolean;
  };
  stylusSupport: boolean;
  keyboardSupport: boolean;
  speakers: string;
  processor_details?: {
    cores?: number;
    speed?: number;
    graphicProcessor?: string;
  };
  sensors?: string[];
  security?: {
    facialUnlock?: boolean;
    parentalControl?: boolean;
  };
  accessories?: string[];
  ratings: {
    costBenefit: number | null;
    display: number;
    performance: number;
    battery: number;
    productivity: number;
  };
}

export const tabletSpecs: SpecSection[] = [
  {
    id: "ratings",
    title: "Notas",
    specs: [
      {
        key: "costBenefit",
        label: "Custo-benefício",
        getValue: (p) => getTablet(p)?.ratings.costBenefit ?? null,
        type: "rating",
      },
      {
        key: "display",
        label: "Tela",
        getValue: (p) => getTablet(p)?.ratings.display ?? null,
        type: "rating",
      },
      {
        key: "performance",
        label: "Performance",
        getValue: (p) => getTablet(p)?.ratings.performance ?? null,
        type: "rating",
      },
      {
        key: "battery",
        label: "Bateria",
        getValue: (p) => getTablet(p)?.ratings.battery ?? null,
        type: "rating",
      },
      {
        key: "productivity",
        label: "Produtividade",
        getValue: (p) => getTablet(p)?.ratings.productivity ?? null,
        type: "rating",
      },
    ],
  },

  {
    id: "general",
    title: "Informações Gerais",
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
        key: "version",
        label: "Versão",
        getValue: (p) => p.version ?? "-",
        type: "text",
      },
      {
        key: "manufacturer",
        label: "Fabricante",
        getValue: (p) => p.manufacturer ?? "-",
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
    title: "Tela",
    specs: [
      {
        key: "size",
        label: "Tamanho",
        getValue: (p) => getTablet(p)?.display.size ?? "-",
        type: "text",
      },
      {
        key: "resolution",
        label: "Resolução",
        getValue: (p) => getTablet(p)?.display.resolution ?? "-",
        type: "text",
      },
      {
        key: "maxResolution",
        label: "Resolução Máxima",
        getValue: (p) => getTablet(p)?.display.maxResolution ?? "-",
        type: "text",
      },
      {
        key: "type",
        label: "Tipo",
        getValue: (p) => getTablet(p)?.display.type ?? "-",
        type: "text",
      },
      {
        key: "refreshRate",
        label: "Hz",
        getValue: (p) => getTablet(p)?.display.refreshRate ?? "-",
        type: "text",
      },
      {
        key: "ppi",
        label: "PPI",
        getValue: (p) => getTablet(p)?.display.ppi?.toString() ?? "-",
        type: "text",
      },
      {
        key: "multiTouch",
        label: "Multi-touch",
        getValue: (p) => getTablet(p)?.display.multiTouch ?? false,
        type: "boolean",
      },
    ],
  },

  {
    id: "performance",
    title: "Performance",
    specs: [
      {
        key: "processor",
        label: "Processador",
        getValue: (p) => getTablet(p)?.processor ?? "-",
        type: "text",
      },
      {
        key: "chipset",
        label: "Chipset",
        getValue: (p) => getTablet(p)?.chipset ?? "-",
        type: "text",
      },
      {
        key: "cores",
        label: "Núcleos",
        getValue: (p) =>
          getTablet(p)?.processor_details?.cores?.toString() ?? "-",
        type: "text",
      },
      {
        key: "speed",
        label: "Clock",
        getValue: (p) => {
          const v = getTablet(p)?.processor_details?.speed;
          return v != null ? `${v} GHz` : "-";
        },
        type: "text",
      },
      {
        key: "graphicProcessor",
        label: "GPU",
        getValue: (p) =>
          getTablet(p)?.processor_details?.graphicProcessor ?? "-",
        type: "text",
      },
      {
        key: "ram",
        label: "RAM",
        getValue: (p) => getTablet(p)?.ram ?? "-",
        type: "text",
      },
      {
        key: "storage",
        label: "Armazenamento",
        getValue: (p) => getTablet(p)?.storage ?? "-",
        type: "text",
      },
      {
        key: "expandableStorage",
        label: "Expansível",
        getValue: (p) => getTablet(p)?.expandableStorage ?? false,
        type: "boolean",
      },
      {
        key: "memoryCardTypes",
        label: "Tipos de Cartão",
        getValue: (p) => getTablet(p)?.memoryCardTypes?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "maxMemorySupported",
        label: "Máx. Suportado",
        getValue: (p) => getTablet(p)?.maxMemorySupported ?? "-",
        type: "text",
      },
      {
        key: "memorySpeed",
        label: "Velocidade Memória",
        getValue: (p) => {
          const v = getTablet(p)?.memorySpeed;
          return v != null ? `${v} MHz` : "-";
        },
        type: "text",
      },
    ],
  },

  {
    id: "camera",
    title: "Câmera",
    specs: [
      {
        key: "main",
        label: "Principal",
        getValue: (p) => getTablet(p)?.camera.main ?? "-",
        type: "text",
      },
      {
        key: "mainResolution",
        label: "Resolução Traseira",
        getValue: (p) => getTablet(p)?.camera.mainResolution ?? "-",
        type: "text",
      },
      {
        key: "front",
        label: "Frontal",
        getValue: (p) => getTablet(p)?.camera.front ?? "-",
        type: "text",
      },
      {
        key: "videoResolution",
        label: "Vídeo",
        getValue: (p) => getTablet(p)?.camera.videoResolution ?? "-",
        type: "text",
      },
      {
        key: "flash",
        label: "Flash",
        getValue: (p) => getTablet(p)?.camera.flash ?? false,
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
        getValue: (p) => getTablet(p)?.battery.capacity ?? "-",
        type: "text",
      },
      {
        key: "type",
        label: "Tipo",
        getValue: (p) => getTablet(p)?.battery.type ?? "-",
        type: "text",
      },
      {
        key: "duration",
        label: "Duração",
        getValue: (p) => getTablet(p)?.battery.duration ?? "-",
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
        getValue: (p) => getTablet(p)?.connectivity.wifi ?? "-",
        type: "text",
      },
      {
        key: "bluetooth",
        label: "Bluetooth",
        getValue: (p) => getTablet(p)?.connectivity.bluetooth ?? "-",
        type: "text",
      },
      {
        key: "bluetoothVersion",
        label: "Versão BT",
        getValue: (p) => getTablet(p)?.connectivity.bluetoothVersion ?? "-",
        type: "text",
      },
      {
        key: "cellular",
        label: "Rede Móvel",
        getValue: (p) => getTablet(p)?.connectivity.cellular ?? false,
        type: "boolean",
      },
      {
        key: "usb",
        label: "USB",
        getValue: (p) => getTablet(p)?.connectivity.usb ?? "-",
        type: "text",
      },
      {
        key: "gps",
        label: "GPS",
        getValue: (p) => getTablet(p)?.connectivity.gps ?? false,
        type: "boolean",
      },
    ],
  },

  {
    id: "features",
    title: "Recursos",
    specs: [
      {
        key: "stylusSupport",
        label: "Caneta",
        getValue: (p) => getTablet(p)?.stylusSupport ?? false,
        type: "boolean",
      },
      {
        key: "keyboardSupport",
        label: "Teclado",
        getValue: (p) => getTablet(p)?.keyboardSupport ?? false,
        type: "boolean",
      },
      {
        key: "speakers",
        label: "Alto-falantes",
        getValue: (p) => getTablet(p)?.speakers ?? "-",
        type: "text",
      },
      {
        key: "sensors",
        label: "Sensores",
        getValue: (p) => getTablet(p)?.sensors?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "accessories",
        label: "Acessórios",
        getValue: (p) => getTablet(p)?.accessories?.join(", ") ?? "-",
        type: "text",
      },
    ],
  },

  {
    id: "dimensions",
    title: "Dimensões e Peso",
    specs: [
      {
        key: "dimensions",
        label: "Dimensões",
        getValue: (p) => getTablet(p)?.dimensions ?? "-",
        type: "text",
      },
      {
        key: "weight",
        label: "Peso",
        getValue: (p) => getTablet(p)?.weight ?? "-",
        type: "text",
      },
    ],
  },
];
```

## Exemplo Produto Object JSON de Tablet que você deve criar

```json
{
  "id": "lenovo-idea-tab-zafr0856br",
  "name": "Idea Tab",
  "brand": "Lenovo",
  "line": "Idea Tab",
  "model": "Idea Tab",
  "detailedModel": "ZAFR0856BR",
  "color": "Cinza",
  "image": "https://http2.mlstatic.com/D_NQ_NP_2X_786165-MLA104009600019_012026-F.webp",
  "price": 0,
  "releaseDate": "2024",
  "releaseMonth": null,
  "releaseYear": 2024,
  "origin": null,
  "category": "tablets",
  "anatelNumber": "031032506667",
  "amazonUrl": null,
  "mercadolivreUrl": "https://mercadolivre.com/sec/1c6bEGy",
  "shopeeUrl": null,
  "alphanumericModel": "ZAFR0856BR",
  "version": "WI-FI",
  "manufacturer": "LENOVO Tecnologia",
  "specs": {
    "display": {
      "size": "11\"",
      "resolution": "2560 x 1600",
      "type": "LCD",
      "refreshRate": "90Hz",
      "height": null,
      "width": null,
      "maxResolution": "2560 px x 1600 px",
      "ppi": 260,
      "multiTouch": true
    },
    "processor": "Octa-core 2x A76, 6x A55",
    "chipset": "MediaTek Dimensity 6300",
    "ram": "8 GB",
    "storage": "128 GB",
    "expandableStorage": true,
    "memoryCardTypes": ["Micro SD"],
    "maxMemorySupported": "1 TB",
    "memorySpeed": 2133,
    "battery": {
      "capacity": "7040 mAh",
      "type": "Lithium-Polymer",
      "duration": "Mediante ao tipo de uso"
    },
    "camera": {
      "main": "8 MP",
      "mainResolution": "8 MP",
      "mainQuantity": 1,
      "front": "5 MP",
      "frontResolution": "5 MP",
      "frontQuantity": 1,
      "videoResolution": "FHD",
      "flash": false
    },
    "os": "Android",
    "osVersion": "15",
    "osCustomization": "Lenovo",
    "dimensions": "254,59 x 166,15 x 6,99 mm",
    "depth": "16,61 cm",
    "height": "6,99 cm",
    "width": "25,46 cm",
    "weight": "480 g",
    "connectivity": {
      "wifi": "Wi-Fi 5 (802.11ac)",
      "bluetooth": "Sim",
      "bluetoothVersion": "5.2",
      "cellular": false,
      "usb": "USB-C 2.0",
      "simCardReader": "Micro-SIM",
      "dualSim": false,
      "gps": false,
      "headphoneJack": true,
      "microphone": true
    },
    "stylusSupport": true,
    "keyboardSupport": true,
    "speakers": "4 alto-falantes Dolby Atmos",
    "processor_details": {
      "cores": 8,
      "speed": 2.4,
      "graphicProcessor": "Mali-G57 MC2"
    },
    "sensors": ["Giroscópio", "Acelerômetro", "Sensor de luz ambiente"],
    "security": {
      "facialUnlock": true,
      "parentalControl": false
    },
    "accessories": ["Caneta Lenovo Tab Pen", "Case/Capa", "Cabo USB-C"],
    "ratings": {
      "costBenefit": 8.5,
      "display": 8.0,
      "performance": 6.5,
      "battery": 7.5,
      "productivity": 8.0
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
"tablets": [
      {
        "name": "iPad 11",
        "brand": "Apple",
        "detailedModel": "iPad 11 (11ª Geração)",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_807691-MLA95669871706_102025-F.webp"
      },
      {
        "name": "iPad Air 11 M3",
        "brand": "Apple",
        "detailedModel": "iPad Air 11 (M3)",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_936383-MLA95664439654_102025-F.webp"
      },
      {
        "name": "iPad 10",
        "brand": "Apple",
        "detailedModel": "iPad 10 (10ª Geração)",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_967247-MLA96145680653_102025-F.webp"
      },
      {
        "name": "iPad Air 11",
        "brand": "Apple",
        "detailedModel": "iPad Air 11 (M3)",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_969466-MLA85623105900_062025-F.webp"
      },
      {
        "name": "Idea Tab",
        "brand": "Lenovo",
        "detailedModel": "ZAFR0856BR",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_786165-MLA104009600019_012026-F.webp"
      },
      {
        "name": "Galaxy Tab A11",
        "brand": "Samsung",
        "detailedModel": "SM-X133N",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_892318-MLA99419882190_112025-F.webp"
      },
      {
        "name": "Tab",
        "brand": "Lenovo",
        "detailedModel": "ZAEH0151BR",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_933341-MLA99583622650_122025-F.webp"
      },
      {
        "name": "Galaxy Tab A9+",
        "brand": "Samsung",
        "detailedModel": "SM-X210NZAAZTO",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_669379-MLA95704100626_102025-F.webp"
      },
      {
        "name": "Vision Tab 10",
        "brand": "Positivo",
        "detailedModel": "Vision Tab 10",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_703910-MLA99998133755_112025-F.webp"
      },
      {
        "name": "TL10",
        "brand": "VAIO",
        "detailedModel": "TL10",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_964580-MLA99469499718_112025-F.webp"
      },
      {
        "name": "Galaxy Tab S10 Lite",
        "brand": "Samsung",
        "detailedModel": "BSM-X400/1R6",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_986238-MLA99505933208_112025-F.webp"
      },
      {
        "name": "Tab Q10",
        "brand": "Positivo",
        "detailedModel": "T2070D",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_874109-MLA99904916883_112025-F.webp"
      },
      {
        "name": "M10",
        "brand": "Multi",
        "detailedModel": "NB359",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_716343-MLA99982884809_112025-F.webp"
      },
      {
        "name": "Galaxy Tab A9",
        "brand": "Samsung",
        "detailedModel": "SM-X115N",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_826577-MLA96868181557_102025-F.webp"
      },
      {
        "name": "Tab 10L Gen 3",
        "brand": "TCL",
        "detailedModel": "8193A1-JALCBR11",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_715797-MLA99453120962_112025-F.webp"
      },
      {
        "name": "E1035",
        "brand": "Easytech",
        "detailedModel": "E1035",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_803583-MLB103763554255_012026-F.webp"
      },
      {
        "name": "PC036",
        "brand": "Acrensly",
        "detailedModel": "PC036",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_668332-MLA105655711815_012026-F.webp"
      },
      {
        "name": "Galaxy Tab S10 FE",
        "brand": "Samsung",
        "detailedModel": "SM-X520N",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_820024-MLA99950929155_112025-F.webp"
      },
      {
        "name": "Tab Plus Pro",
        "brand": "Amiyo",
        "detailedModel": "A06PLUS",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_957744-MLA99926493433_112025-F.webp"
      }
    ]
```

- Se eu passar dados de um item já cadastrado antes, ou que você já mandou os dados, pare o processo e me pergunte se eu quero continuar mesmo assim.
