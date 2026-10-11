# Contexto

- Site: <https://alexgalhardo.github.io/tudohardware>
- Tenho um site de comparação de hardware parecido com o famoso <https://tudocelular.com>
- Os dados dos produtos são salvos em formato JSON

## Tipagem do objeto JSON que você vai criar

```ts
import { SpecSection } from "../spec-configs";
import { BaseProduct, Product } from "../types";

function isSmartphone(product: Product): product is Smartphone {
  return product.category === "smartphones";
}

function getSmartphone(p: Product): SmartphoneSpecs | null {
  return isSmartphone(p) ? p.specs : null;
}

export interface Smartphone extends BaseProduct {
  category: "smartphones";
  specs: SmartphoneSpecs;
}

export interface SmartphoneSpecs {
  display: {
    size: string;
    resolution: string;
    resolutionType?: string;
    type: string;
    screenType?: string;
    refreshRate?: string;
    ppi?: number;
    maxBrightness?: string;
    touchscreen: boolean;
    foldable?: boolean;
    secondaryTouchscreen?: boolean;
    screenRatio?: string;
  };
  processor: string;
  processorSpeed?: string;
  processorCores?: number;
  cpuModels?: string;
  chipset: string;
  gpu: string;
  gpuSpeed?: string;
  ram: string;
  storage: string;
  memoryCardSlot?: boolean;
  battery: {
    capacity: string;
    type: string;
    fastCharging: boolean;
    wirelessCharging?: boolean;
    removable?: boolean;
    batteryTalkTime?: string;
  };
  camera: {
    main: string;
    mainCameras?: string[];
    mainAperture?: string | string[];
    mainTypes?: string[];
    mainQuantity?: number;
    front: string;
    frontCameras?: string[];
    frontAperture?: string;
    frontTypes?: string[];
    frontQuantity?: number;
    videoResolutionRear?: string;
    videoResolutionFront?: string;
    opticalZoom?: string;
    digitalZoom?: string;
    features?: string[];
    frontFlash?: boolean;
    wideAngleResolution?: string;
  };
  os: string;
  osVersion?: string;
  osLatestVersion?: string;
  osEdition?: string;
  osCustomLayer?: string;
  latestCustomLayer?: string;
  dimensions: string;
  weight: string;
  waterResistance: boolean;
  ipRating?: string;
  splashResistant?: boolean;
  dustResistant?: boolean;
  dropResistant?: boolean;
  waterproof?: boolean;
  simCard: string;
  dualSim: boolean;
  simSlots?: number;
  esimSupport?: boolean;
  esimQuantity?: number;
  simCardSizes?: string[];
  network: {
    gsm?: string;
    hspa?: boolean;
    lte?: boolean;
    fiveG: boolean;
  };
  connectivity: {
    usb: string;
    usbConnector?: boolean;
    jackConnector?: boolean;
    nfc: boolean;
    gps: string;
    wifi: boolean;
    bluetooth: boolean;
    miniHdmi?: boolean;
    radio?: boolean;
    tvTuner?: boolean;
  };
  sensors: {
    accelerometer: boolean;
    proximity: boolean;
    gyroscope: boolean;
    compass: boolean;
    barometer: boolean;
    fingerprint: boolean;
    facialRecognition?: boolean;
    irisRecognition?: boolean;
    heartRate?: boolean;
    noiseCancellation?: boolean;
  };
  features: {
    fmRadio?: boolean;
    tv?: boolean;
    vibration?: boolean;
    speakerphone?: boolean;
    wifiDirect?: boolean;
    wifiHotspot?: boolean;
    usbOtg?: boolean;
    qwertyKeyboard?: boolean;
    sosButton?: boolean;
    gamingPhone?: boolean;
    ruggedPhone?: boolean;
    includesPen?: boolean;
  };
  ratings: {
    costBenefit: number | null;
    hardware: number;
    display: number;
    camera: number;
    performance: number;
  };
  versions?: string[];
  manufacturer?: string;
}

export const smartphoneSpecs: SpecSection[] = [
  {
    id: "ratings",
    title: "Notas",
    specs: [
      {
        key: "costBenefit",
        label: "Custo-benefício",
        getValue: (p) => getSmartphone(p)?.ratings.costBenefit ?? null,
        type: "rating",
      },
      {
        key: "hardware",
        label: "Hardware",
        getValue: (p) => getSmartphone(p)?.ratings.hardware ?? null,
        type: "rating",
      },
      {
        key: "display",
        label: "Tela",
        getValue: (p) => getSmartphone(p)?.ratings.display ?? null,
        type: "rating",
      },
      {
        key: "camera",
        label: "Câmera",
        getValue: (p) => getSmartphone(p)?.ratings.camera ?? null,
        type: "rating",
      },
      {
        key: "performance",
        label: "Desempenho",
        getValue: (p) => getSmartphone(p)?.ratings.performance ?? null,
        type: "rating",
      },
    ],
  },

  {
    id: "general",
    title: "Geral",
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
        getValue: (p) => p.color ?? "-",
        type: "text",
      },
      {
        key: "releaseDate",
        label: "Disponibilidade",
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
        key: "origin",
        label: "Origem",
        getValue: (p) => p.origin ?? "-",
        type: "text",
      },
      {
        key: "manufacturer",
        label: "Fabricante",
        getValue: (p) => getSmartphone(p)?.manufacturer ?? "-",
        type: "text",
      },
      {
        key: "anatelNumber",
        label: "Anatel",
        getValue: (p) => p.anatelNumber ?? "-",
        type: "text",
      },
      {
        key: "os",
        label: "SO",
        getValue: (p) => getSmartphone(p)?.os ?? "-",
        type: "text",
      },
      {
        key: "osVersion",
        label: "Versão",
        getValue: (p) => getSmartphone(p)?.osVersion ?? "-",
        type: "text",
      },
      {
        key: "osLatestVersion",
        label: "Última Versão",
        getValue: (p) => getSmartphone(p)?.osLatestVersion ?? "-",
        type: "text",
      },
      {
        key: "osCustomLayer",
        label: "Interface",
        getValue: (p) => getSmartphone(p)?.osCustomLayer ?? "-",
        type: "text",
      },
      {
        key: "versions",
        label: "Versões",
        getValue: (p) => getSmartphone(p)?.versions?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "dimensions",
        label: "Dimensões",
        getValue: (p) => getSmartphone(p)?.dimensions ?? "-",
        type: "text",
      },
      {
        key: "weight",
        label: "Peso",
        getValue: (p) => getSmartphone(p)?.weight ?? "-",
        type: "text",
      },
      {
        key: "waterResistance",
        label: "Resistente à água",
        getValue: (p) => getSmartphone(p)?.waterResistance ?? false,
        type: "boolean",
      },
      {
        key: "ipRating",
        label: "IP",
        getValue: (p) => getSmartphone(p)?.ipRating ?? "-",
        type: "text",
      },
    ],
  },

  {
    id: "hardware",
    title: "Hardware",
    specs: [
      {
        key: "processor",
        label: "Processador",
        getValue: (p) => getSmartphone(p)?.processor ?? "-",
        type: "text",
      },
      {
        key: "processorSpeed",
        label: "Clock",
        getValue: (p) => getSmartphone(p)?.processorSpeed ?? "-",
        type: "text",
      },
      {
        key: "processorCores",
        label: "Núcleos",
        getValue: (p) => getSmartphone(p)?.processorCores?.toString() ?? "-",
        type: "text",
      },
      {
        key: "chipset",
        label: "Chipset",
        getValue: (p) => getSmartphone(p)?.chipset ?? "-",
        type: "text",
      },
      {
        key: "gpu",
        label: "GPU",
        getValue: (p) => getSmartphone(p)?.gpu ?? "-",
        type: "text",
      },
      {
        key: "ram",
        label: "RAM",
        getValue: (p) => getSmartphone(p)?.ram ?? "-",
        type: "text",
      },
      {
        key: "storage",
        label: "Armazenamento",
        getValue: (p) => getSmartphone(p)?.storage ?? "-",
        type: "text",
      },
      {
        key: "memoryCardSlot",
        label: "MicroSD",
        getValue: (p) => getSmartphone(p)?.memoryCardSlot ?? false,
        type: "boolean",
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
        getValue: (p) => getSmartphone(p)?.display.size ?? "-",
        type: "text",
      },
      {
        key: "resolution",
        label: "Resolução",
        getValue: (p) => getSmartphone(p)?.display.resolution ?? "-",
        type: "text",
      },
      {
        key: "resolutionType",
        label: "Tipo",
        getValue: (p) => getSmartphone(p)?.display.resolutionType ?? "-",
        type: "text",
      },
      {
        key: "type",
        label: "Tecnologia",
        getValue: (p) => getSmartphone(p)?.display.type ?? "-",
        type: "text",
      },
      {
        key: "refreshRate",
        label: "Hz",
        getValue: (p) => getSmartphone(p)?.display.refreshRate ?? "-",
        type: "text",
      },
      {
        key: "ppi",
        label: "PPI",
        getValue: (p) => getSmartphone(p)?.display.ppi?.toString() ?? "-",
        type: "text",
      },
      {
        key: "touchscreen",
        label: "Touch",
        getValue: (p) => getSmartphone(p)?.display.touchscreen ?? false,
        type: "boolean",
      },
    ],
  },

  {
    id: "camera",
    title: "Câmeras",
    specs: [
      {
        key: "main",
        label: "Principal",
        getValue: (p) => getSmartphone(p)?.camera.main ?? "-",
        type: "text",
      },
      {
        key: "mainCameras",
        label: "Traseiras",
        getValue: (p) =>
          getSmartphone(p)?.camera.mainCameras?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "front",
        label: "Frontal",
        getValue: (p) => getSmartphone(p)?.camera.front ?? "-",
        type: "text",
      },
      {
        key: "videoResolutionRear",
        label: "Vídeo Traseiro",
        getValue: (p) => getSmartphone(p)?.camera.videoResolutionRear ?? "-",
        type: "text",
      },
      {
        key: "videoResolutionFront",
        label: "Vídeo Frontal",
        getValue: (p) => getSmartphone(p)?.camera.videoResolutionFront ?? "-",
        type: "text",
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
        getValue: (p) => getSmartphone(p)?.battery.capacity ?? "-",
        type: "text",
      },
      {
        key: "fastCharging",
        label: "Carga Rápida",
        getValue: (p) => getSmartphone(p)?.battery.fastCharging ?? false,
        type: "boolean",
      },
      {
        key: "wirelessCharging",
        label: "Wireless",
        getValue: (p) => getSmartphone(p)?.battery.wirelessCharging ?? false,
        type: "boolean",
      },
      {
        key: "removable",
        label: "Removível",
        getValue: (p) => getSmartphone(p)?.battery.removable ?? false,
        type: "boolean",
      },
    ],
  },

  {
    id: "connectivity",
    title: "Conectividade",
    specs: [
      {
        key: "usb",
        label: "USB",
        getValue: (p) => getSmartphone(p)?.connectivity.usb ?? "-",
        type: "text",
      },
      {
        key: "nfc",
        label: "NFC",
        getValue: (p) => getSmartphone(p)?.connectivity.nfc ?? false,
        type: "boolean",
      },
      {
        key: "wifi",
        label: "Wi-Fi",
        getValue: (p) => getSmartphone(p)?.connectivity.wifi ?? false,
        type: "boolean",
      },
      {
        key: "bluetooth",
        label: "Bluetooth",
        getValue: (p) => getSmartphone(p)?.connectivity.bluetooth ?? false,
        type: "boolean",
      },
      {
        key: "fiveG",
        label: "5G",
        getValue: (p) => getSmartphone(p)?.network.fiveG ?? false,
        type: "boolean",
      },
    ],
  },
];
```

## Exemplo Objeto Smartphone JSON que você deve fazer

```json
{
  "id": "samsung-galaxy-s24-plus-exynos",
  "name": "Galaxy S24 Plus (Exynos)",
  "brand": "Samsung",
  "line": "Galaxy S",
  "model": "Galaxy S24+ Plus (Exynos)",
  "detailedModel": "SM-S926B/DS",
  "color": "Cinza",
  "image": "https://http2.mlstatic.com/D_NQ_NP_2X_697434-MLA99504410690_112025-F.webp",
  "price": 0,
  "releaseDate": "2024/1",
  "releaseMonth": "Janeiro",
  "releaseYear": 2024,
  "origin": "Brasil",
  "category": "smartphones",
  "anatelNumber": "203882300953",
  "mercadolivreUrl": "https://mercadolivre.com/sec/2RkfyB2",
  "specs": {
    "display": {
      "size": "6.7\"",
      "resolution": "3120 x 1440",
      "resolutionType": "QHD+",
      "type": "Dynamic AMOLED 2X",
      "screenType": "Dynamic AMOLED 2X",
      "refreshRate": "120 Hz",
      "ppi": 516,
      "touchscreen": true,
      "foldable": false,
      "secondaryTouchscreen": false
    },
    "processor": "Exynos 2400",
    "processorSpeed": "3.2 GHz",
    "processorCores": 10,
    "chipset": "Samsung Exynos 2400",
    "gpu": "Xclipse 940",
    "gpuSpeed": "3.2 GHz",
    "ram": "12 GB",
    "storage": "256 GB",
    "memoryCardSlot": false,
    "battery": {
      "capacity": "4750 mAh",
      "type": "Íon de lítio",
      "fastCharging": true,
      "wirelessCharging": true,
      "removable": false
    },
    "camera": {
      "main": "50 Mpx",
      "mainCameras": ["50 Mpx", "10 Mpx", "12 Mpx"],
      "mainAperture": ["f 1.8", "f 2.4", "f 2.2"],
      "mainQuantity": 3,
      "front": "12 Mpx",
      "frontCameras": ["12 Mpx"],
      "frontAperture": "f 2.2",
      "frontQuantity": 1,
      "videoResolutionRear": "7680 x 4320",
      "opticalZoom": "3x",
      "digitalZoom": "30x",
      "frontFlash": false,
      "wideAngleResolution": "12 Mpx"
    },
    "os": "Android 14",
    "osVersion": "14",
    "osLatestVersion": "14",
    "osEdition": "Android 14",
    "osCustomLayer": "One UI 6.1",
    "dimensions": "158.5 x 75.9 x 7.7 mm",
    "weight": "196 g",
    "waterResistance": true,
    "ipRating": "IP68",
    "splashResistant": true,
    "dustResistant": true,
    "waterproof": false,
    "simCard": "Nano-SIM",
    "dualSim": true,
    "simSlots": 2,
    "esimSupport": true,
    "esimQuantity": 1,
    "simCardSizes": ["Nano-SIM"],
    "network": {
      "lte": true,
      "fiveG": true
    },
    "connectivity": {
      "usb": "USB-C",
      "usbConnector": true,
      "jackConnector": false,
      "nfc": true,
      "gps": "Sim",
      "wifi": true,
      "bluetooth": true,
      "miniHdmi": false,
      "radio": false,
      "tvTuner": false
    },
    "sensors": {
      "accelerometer": true,
      "proximity": true,
      "gyroscope": true,
      "compass": true,
      "barometer": true,
      "fingerprint": true,
      "facialRecognition": true,
      "irisRecognition": false,
      "heartRate": false,
      "noiseCancellation": false
    },
    "features": {
      "fmRadio": false,
      "tv": false,
      "vibration": true,
      "speakerphone": true,
      "wifiDirect": true,
      "wifiHotspot": true,
      "usbOtg": true,
      "qwertyKeyboard": false,
      "sosButton": false,
      "gamingPhone": false,
      "ruggedPhone": false,
      "includesPen": false
    },
    "ratings": {
      "costBenefit": 8.5,
      "hardware": 8.5,
      "display": 9.2,
      "camera": 8.0,
      "performance": 8.3
    },
    "versions": [
      "SM-S926B",
      "SM-S926B/DS",
      "SM-S926W",
      "SM-S9260",
      "SM-S926E/DS"
    ],
    "manufacturer": "Samsung"
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
"smartphones": [
      {
        "name": "Galaxy S24 Plus (Exynos)",
        "brand": "Samsung",
        "detailedModel": "SM-S926B/DS"
      },
      {
        "name": "Moto G53 5G",
        "brand": "Motorola",
        "detailedModel": ""
      },
      {
        "name": "iPhone 15",
        "brand": "Apple",
        "detailedModel": ""
      },
      {
        "name": "Moto G56",
        "brand": "Motorola",
        "detailedModel": "Moto G56 5G 256GB"
      },
      {
        "name": "Redmi 15",
        "brand": "Xiaomi",
        "detailedModel": "RED158256CZ"
      },
      {
        "name": "iPhone 16",
        "brand": "Apple",
        "detailedModel": ""
      },
      {
        "name": "Galaxy S20 FE",
        "brand": "Samsung",
        "detailedModel": "128Gb"
      },
      {
        "name": "Galaxy S21 FE 5G (Exynos)",
        "brand": "Samsung",
        "detailedModel": "SM-G990B/DS"
      },
      {
        "name": "Galaxy A26 5G",
        "brand": "Samsung",
        "detailedModel": "SM-A266M"
      },
      {
        "name": "Galaxy A56 5G",
        "brand": "Samsung",
        "detailedModel": "SM-A566EZKCLTL"
      },
      {
        "name": "Galaxy A16",
        "brand": "Samsung",
        "detailedModel": "SM-A165M/DS"
      },
      {
        "name": "C63",
        "brand": "Realme",
        "detailedModel": "RMX3933"
      },
      {
        "name": "iPhone 17",
        "brand": "Apple",
        "detailedModel": "A3294"
      },
      {
        "name": "iPhone 17 Pro Max",
        "brand": "Apple",
        "detailedModel": "A3296"
      },
      {
        "name": "iPhone 17 Pro",
        "brand": "Apple",
        "detailedModel": "A3523"
      },
      {
        "name": "iPhone 14",
        "brand": "Apple",
        "detailedModel": "MPV03BE/A"
      },
      {
        "name": "iPhone 13",
        "brand": "Apple",
        "detailedModel": "A2634"
      },
      {
        "name": "Moto G35 5G",
        "brand": "Motorola",
        "detailedModel": "XT2433-2"
      },
      {
        "name": "Moto G15",
        "brand": "Motorola",
        "detailedModel": "XT2521-2"
      },
      {
        "name": "Edge 60 Fusion 5G",
        "brand": "Motorola",
        "detailedModel": "XT2503-1"
      },
      {
        "name": "Moto G06",
        "brand": "Motorola",
        "detailedModel": "XT2535-1"
      },
      {
        "name": "Moto G05",
        "brand": "Motorola",
        "detailedModel": "XT2523-2"
      },
      {
        "name": "Moto G86 5G",
        "brand": "Motorola",
        "detailedModel": "XT2527-1"
      },
      {
        "name": "Note 50X 5G",
        "brand": "Infinix",
        "detailedModel": "NOTE 50X 5G"
      },
      {
        "name": "F Pro 2",
        "brand": "Multilaser",
        "detailedModel": "P9153"
      },
      {
        "name": "Hot 50i",
        "brand": "Infinix",
        "detailedModel": "X6531"
      },
      {
        "name": "Note 40 5G",
        "brand": "Infinix",
        "detailedModel": "X6853"
      },
      {
        "name": "Galaxy A36 5G",
        "brand": "Samsung",
        "detailedModel": "SM-A366E/DS"
      },
      {
        "name": "Reno13 F",
        "brand": "Oppo",
        "detailedModel": "CPH2699"
      },
      {
        "name": "14T",
        "brand": "Xiaomi",
        "detailedModel": "2406APNFAG"
      },
      {
        "name": "Smart 10",
        "brand": "Infinix",
        "detailedModel": "Smart10"
      },
      {
        "name": "C73",
        "brand": "Realme",
        "detailedModel": "RMX5303"
      },
      {
        "name": "13+ 5G",
        "brand": "Realme",
        "detailedModel": "RMX5000"
      },
      {
        "name": "Redmi 14C",
        "brand": "Xiaomi",
        "detailedModel": "2409BRN2CA / 2409BRN2CC"
      },
      {
        "name": "Moto G86 5G",
        "brand": "Motorola",
        "detailedModel": "XT2527-1"
      },
      {
        "name": "G Max 2 (8 Mpx)",
        "brand": "Multilaser",
        "detailedModel": "P9183"
      },
      {
        "name": "Redmi 14C Azul",
        "brand": "Xiaomi",
        "detailedModel": "2409BRN2CL"
      },
      {
        "name": "K41s",
        "brand": "LG",
        "detailedModel": "LG K41s (K410BMW/K410ZMW/K410FMW/K410EMW)"
      }
    ],
```

- Se eu passar dados de um item já cadastrado antes, ou que você já mandou os dados, pare o processo e me pergunte se eu quero continuar mesmo assim.
