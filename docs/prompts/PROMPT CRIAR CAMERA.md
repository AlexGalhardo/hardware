# Contexto

- Site: <https://tudohardware.com>
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
  | "placa-mae"
  | "ar-condicionado"
  | "monitores"
  | "cameras";

export type Product =
  | Smartphone
  | GPU
  | CPU
  | Tablet
  | WashingMachine
  | Smartv
  | Drone
  | Smartwatch
  | FoneDeOuvido
  | Notebook
  | Geladeira
  | CameraDeSeguranca
  | Airfryer
  | Microondas
  | TecladoPC
  | Mouse
  | CaixaDeSom
  | PlacaMae
  | ArCondicionado
  | Monitor
  | Camera;

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

function isCamera(product: Product): product is Camera {
  return product.category === "cameras";
}

function getCamera(p: Product): CameraSpecs | null {
  return isCamera(p) ? p.specs : null;
}

export interface Camera extends BaseProduct {
  category: "cameras";
  specs: CameraSpecs;
}

export interface CameraSpecs {
  type: string; // DSLR, Mirrorless, Action, Compact, Cinema, 360°
  sensor: {
    type: string; // Full Frame, APS-C, Micro Four Thirds, 1", etc
    size: string; // 35.9 x 24mm, 23.5 x 15.6mm
    resolution: string; // 24.2 MP, 45.7 MP
    megapixels: number;
    cropFactor?: string;
    iso: {
      native: string; // 100-32000
      expanded?: string; // 50-102400
      max: number;
    };
    stabilization: boolean;
    ibis?: boolean; // In-Body Image Stabilization
    stabilizationType?: string; // 5-axis, 3-axis
    dualNativeIso?: boolean;
  };
  processor: string;
  autofocus: {
    type: string; // Phase Detection, Contrast Detection, Hybrid
    points: number;
    faceDetection: boolean;
    eyeDetection: boolean;
    animalDetection?: boolean;
    tracking: boolean;
    touchFocus?: boolean;
    lowLightSensitivity?: string; // -6 EV
  };
  video: {
    maxResolution: string; // 4K, 8K, 6K
    maxFrameRate: string; // 60fps, 120fps, 240fps
    fourKFrameRates?: string[]; // ["24p", "30p", "60p", "120p"]
    fullHdFrameRates?: string[];
    slowMotion?: string;
    codec: string[]; // H.264, H.265, ProRes, ALL-I
    bitRate?: string; // 400 Mbps
    colorSampling?: string; // 4:2:2, 4:2:0
    bitDepth?: string; // 8-bit, 10-bit, 12-bit
    logProfile?: string; // S-Log3, V-Log, C-Log
    hdr?: boolean;
    timelapseBuiltIn?: boolean;
    externalRecording?: boolean;
    hdmiOutput?: string; // 4:2:2 10-bit
  };
  display: {
    type: string; // LCD, OLED, AMOLED
    size: string; // 3.2", 3.0"
    resolution: string; // 2.1M dots
    touchscreen: boolean;
    articulating: boolean; // Vari-angle, Tilting, Fixed
    articulationType?: string;
    viewfinder: boolean;
    viewfinderType?: string; // OLED, LCD
    viewfinderResolution?: string;
    viewfinderMagnification?: string;
    viewfinderCoverage?: string; // 100%
  };
  burstMode: {
    maxFps: number; // 20 fps, 30 fps
    bufferDepth?: string; // RAW, JPEG
    electronicShutter?: boolean;
    mechanicalShutter?: boolean;
    shutterSpeed: string; // 1/8000s
    bulbMode?: boolean;
  };
  lens: {
    mount: string; // E-mount, RF, Z, L, MFT
    included?: string;
    interchangeable: boolean;
    focalLength?: string; // For fixed lens cameras
    aperture?: string; // f/2.8, f/1.4-2.8
    opticalZoom?: string;
    digitalZoom?: string;
  };
  storage: {
    slots: number;
    types: string[]; // SD, CFexpress Type A, CFexpress Type B, microSD
    dualSlotRecording?: boolean;
    uhs?: string; // UHS-I, UHS-II
  };
  connectivity: {
    wifi: boolean;
    bluetooth: boolean;
    nfc?: boolean;
    usb: string; // USB-C, USB 3.2 Gen 2, micro-USB
    hdmi: boolean;
    hdmiType?: string; // micro HDMI, full HDMI
    microphone: boolean;
    microphoneType?: string; // 3.5mm jack
    headphone: boolean;
    remote?: boolean;
    ethernet?: boolean;
    timecode?: boolean;
  };
  battery: {
    type: string; // NP-FZ100, LP-E6NH
    capacity: string; // 2280 mAh
    shotsPerCharge?: number; // CIPA rating
    videoRuntime?: string;
    usbCharging: boolean;
    batteryGrip?: boolean;
  };
  build: {
    weatherSealing: boolean;
    material: string; // Magnesium alloy, Polycarbonate, Aluminum
    dimensions: string; // 126.9 x 95.1 x 73.7 mm
    weight: string; // 650g (body only)
    bodyOnly?: string; // weight
    withLens?: string; // weight
    tripodMount: boolean;
    coldShoeMount?: boolean;
    hotShoeMount?: boolean;
  };
  features: {
    rawCapture: boolean;
    rawFormat?: string; // ARW, CR3, NEF, ORF
    jpeg: boolean;
    heif?: boolean;
    bracketing?: boolean;
    hdr?: boolean;
    panorama?: boolean;
    multipleExposure?: boolean;
    intervalShooting?: boolean;
    bulbTimer?: boolean;
    gps?: boolean;
    waterproof?: boolean;
    waterproofDepth?: string; // 10m, 60m
    shockproof?: boolean;
    freezeproof?: boolean;
    dustproof?: boolean;
    builtInNdFilter?: boolean;
    ndFilterStops?: string;
    voiceControl?: boolean;
    touchscreenGestures?: boolean;
  };
  audio: {
    builtInMicrophone: boolean;
    microphoneType?: string; // Stereo, Mono
    externalMicSupport: boolean;
    windNoiseReduction?: boolean;
    audioLevels?: boolean;
    headphoneMonitoring?: boolean;
    audioFormat?: string[]; // AAC, LPCM
  };
  ratings: {
    costBenefit: number | null;
    imageQuality: number;
    videoQuality: number;
    autofocus: number;
    buildQuality: number;
    versatility: number;
  };
  targetAudience?: string; // Vlogger, Professional, Action Sports, Beginner
  manufacturer?: string;
  versions?: string[];
}

export const cameraSpecs: SpecSection[] = [
  {
    id: "ratings",
    title: "Notas",
    specs: [
      {
        key: "costBenefit",
        label: "Custo-benefício",
        getValue: (p) => getCamera(p)?.ratings.costBenefit ?? null,
        type: "rating",
      },
      {
        key: "imageQuality",
        label: "Qualidade de Imagem",
        getValue: (p) => getCamera(p)?.ratings.imageQuality ?? null,
        type: "rating",
      },
      {
        key: "videoQuality",
        label: "Qualidade de Vídeo",
        getValue: (p) => getCamera(p)?.ratings.videoQuality ?? null,
        type: "rating",
      },
      {
        key: "autofocus",
        label: "Autofoco",
        getValue: (p) => getCamera(p)?.ratings.autofocus ?? null,
        type: "rating",
      },
      {
        key: "buildQuality",
        label: "Construção",
        getValue: (p) => getCamera(p)?.ratings.buildQuality ?? null,
        type: "rating",
      },
      {
        key: "versatility",
        label: "Versatilidade",
        getValue: (p) => getCamera(p)?.ratings.versatility ?? null,
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
        key: "type",
        label: "Tipo",
        getValue: (p) => getCamera(p)?.type ?? "-",
        type: "text",
      },
      {
        key: "targetAudience",
        label: "Público-Alvo",
        getValue: (p) => getCamera(p)?.targetAudience ?? "-",
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
        getValue: (p) => getCamera(p)?.manufacturer ?? "-",
        type: "text",
      },
      {
        key: "versions",
        label: "Versões",
        getValue: (p) => getCamera(p)?.versions?.join(", ") ?? "-",
        type: "text",
      },
    ],
  },

  {
    id: "sensor",
    title: "Sensor",
    specs: [
      {
        key: "sensorType",
        label: "Tipo",
        getValue: (p) => getCamera(p)?.sensor.type ?? "-",
        type: "text",
      },
      {
        key: "sensorSize",
        label: "Tamanho",
        getValue: (p) => getCamera(p)?.sensor.size ?? "-",
        type: "text",
      },
      {
        key: "resolution",
        label: "Resolução",
        getValue: (p) => getCamera(p)?.sensor.resolution ?? "-",
        type: "text",
      },
      {
        key: "megapixels",
        label: "Megapixels",
        getValue: (p) => getCamera(p)?.sensor.megapixels?.toString() ?? "-",
        type: "text",
      },
      {
        key: "cropFactor",
        label: "Crop Factor",
        getValue: (p) => getCamera(p)?.sensor.cropFactor ?? "-",
        type: "text",
      },
      {
        key: "nativeIso",
        label: "ISO Nativo",
        getValue: (p) => getCamera(p)?.sensor.iso.native ?? "-",
        type: "text",
      },
      {
        key: "expandedIso",
        label: "ISO Expandido",
        getValue: (p) => getCamera(p)?.sensor.iso.expanded ?? "-",
        type: "text",
      },
      {
        key: "stabilization",
        label: "Estabilização",
        getValue: (p) => getCamera(p)?.sensor.stabilization ?? false,
        type: "boolean",
      },
      {
        key: "ibis",
        label: "IBIS",
        getValue: (p) => getCamera(p)?.sensor.ibis ?? false,
        type: "boolean",
      },
      {
        key: "stabilizationType",
        label: "Tipo de Estabilização",
        getValue: (p) => getCamera(p)?.sensor.stabilizationType ?? "-",
        type: "text",
      },
      {
        key: "processor",
        label: "Processador",
        getValue: (p) => getCamera(p)?.processor ?? "-",
        type: "text",
      },
    ],
  },

  {
    id: "autofocus",
    title: "Autofoco",
    specs: [
      {
        key: "afType",
        label: "Tipo",
        getValue: (p) => getCamera(p)?.autofocus.type ?? "-",
        type: "text",
      },
      {
        key: "afPoints",
        label: "Pontos",
        getValue: (p) => getCamera(p)?.autofocus.points?.toString() ?? "-",
        type: "text",
      },
      {
        key: "faceDetection",
        label: "Detecção de Rosto",
        getValue: (p) => getCamera(p)?.autofocus.faceDetection ?? false,
        type: "boolean",
      },
      {
        key: "eyeDetection",
        label: "Detecção de Olhos",
        getValue: (p) => getCamera(p)?.autofocus.eyeDetection ?? false,
        type: "boolean",
      },
      {
        key: "animalDetection",
        label: "Detecção de Animais",
        getValue: (p) => getCamera(p)?.autofocus.animalDetection ?? false,
        type: "boolean",
      },
      {
        key: "tracking",
        label: "Rastreamento",
        getValue: (p) => getCamera(p)?.autofocus.tracking ?? false,
        type: "boolean",
      },
      {
        key: "lowLightAf",
        label: "AF Baixa Luz",
        getValue: (p) => getCamera(p)?.autofocus.lowLightSensitivity ?? "-",
        type: "text",
      },
    ],
  },

  {
    id: "video",
    title: "Vídeo",
    specs: [
      {
        key: "maxResolution",
        label: "Resolução Máx.",
        getValue: (p) => getCamera(p)?.video.maxResolution ?? "-",
        type: "text",
      },
      {
        key: "maxFrameRate",
        label: "FPS Máximo",
        getValue: (p) => getCamera(p)?.video.maxFrameRate ?? "-",
        type: "text",
      },
      {
        key: "fourKFrameRates",
        label: "4K Frame Rates",
        getValue: (p) => getCamera(p)?.video.fourKFrameRates?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "slowMotion",
        label: "Slow Motion",
        getValue: (p) => getCamera(p)?.video.slowMotion ?? "-",
        type: "text",
      },
      {
        key: "codec",
        label: "Codec",
        getValue: (p) => getCamera(p)?.video.codec?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "bitRate",
        label: "Bit Rate",
        getValue: (p) => getCamera(p)?.video.bitRate ?? "-",
        type: "text",
      },
      {
        key: "colorSampling",
        label: "Amostragem de Cor",
        getValue: (p) => getCamera(p)?.video.colorSampling ?? "-",
        type: "text",
      },
      {
        key: "bitDepth",
        label: "Profundidade de Bits",
        getValue: (p) => getCamera(p)?.video.bitDepth ?? "-",
        type: "text",
      },
      {
        key: "logProfile",
        label: "Perfil Log",
        getValue: (p) => getCamera(p)?.video.logProfile ?? "-",
        type: "text",
      },
      {
        key: "videoHdr",
        label: "HDR",
        getValue: (p) => getCamera(p)?.video.hdr ?? false,
        type: "boolean",
      },
      {
        key: "externalRecording",
        label: "Gravação Externa",
        getValue: (p) => getCamera(p)?.video.externalRecording ?? false,
        type: "boolean",
      },
    ],
  },

  {
    id: "display",
    title: "Tela e Visor",
    specs: [
      {
        key: "displayType",
        label: "Tipo de Tela",
        getValue: (p) => getCamera(p)?.display.type ?? "-",
        type: "text",
      },
      {
        key: "displaySize",
        label: "Tamanho",
        getValue: (p) => getCamera(p)?.display.size ?? "-",
        type: "text",
      },
      {
        key: "displayResolution",
        label: "Resolução",
        getValue: (p) => getCamera(p)?.display.resolution ?? "-",
        type: "text",
      },
      {
        key: "touchscreen",
        label: "Touchscreen",
        getValue: (p) => getCamera(p)?.display.touchscreen ?? false,
        type: "boolean",
      },
      {
        key: "articulating",
        label: "Articulada",
        getValue: (p) => getCamera(p)?.display.articulating ?? false,
        type: "boolean",
      },
      {
        key: "articulationType",
        label: "Tipo de Articulação",
        getValue: (p) => getCamera(p)?.display.articulationType ?? "-",
        type: "text",
      },
      {
        key: "viewfinder",
        label: "Visor",
        getValue: (p) => getCamera(p)?.display.viewfinder ?? false,
        type: "boolean",
      },
      {
        key: "viewfinderType",
        label: "Tipo de Visor",
        getValue: (p) => getCamera(p)?.display.viewfinderType ?? "-",
        type: "text",
      },
      {
        key: "viewfinderResolution",
        label: "Resolução Visor",
        getValue: (p) => getCamera(p)?.display.viewfinderResolution ?? "-",
        type: "text",
      },
    ],
  },

  {
    id: "performance",
    title: "Performance",
    specs: [
      {
        key: "burstFps",
        label: "Burst Mode",
        getValue: (p) => {
          const fps = getCamera(p)?.burstMode.maxFps;
          return fps !== undefined ? `${fps} fps` : "-";
        },
        type: "text",
      },
      {
        key: "bufferDepth",
        label: "Buffer",
        getValue: (p) => getCamera(p)?.burstMode.bufferDepth ?? "-",
        type: "text",
      },
      {
        key: "shutterSpeed",
        label: "Velocidade do Obturador",
        getValue: (p) => getCamera(p)?.burstMode.shutterSpeed ?? "-",
        type: "text",
      },
      {
        key: "electronicShutter",
        label: "Obturador Eletrônico",
        getValue: (p) => getCamera(p)?.burstMode.electronicShutter ?? false,
        type: "boolean",
      },
      {
        key: "mechanicalShutter",
        label: "Obturador Mecânico",
        getValue: (p) => getCamera(p)?.burstMode.mechanicalShutter ?? false,
        type: "boolean",
      },
    ],
  },

  {
    id: "lens",
    title: "Lente",
    specs: [
      {
        key: "lensMount",
        label: "Montagem",
        getValue: (p) => getCamera(p)?.lens.mount ?? "-",
        type: "text",
      },
      {
        key: "interchangeable",
        label: "Intercambiável",
        getValue: (p) => getCamera(p)?.lens.interchangeable ?? false,
        type: "boolean",
      },
      {
        key: "includedLens",
        label: "Lente Incluída",
        getValue: (p) => getCamera(p)?.lens.included ?? "-",
        type: "text",
      },
      {
        key: "focalLength",
        label: "Distância Focal",
        getValue: (p) => getCamera(p)?.lens.focalLength ?? "-",
        type: "text",
      },
      {
        key: "aperture",
        label: "Abertura",
        getValue: (p) => getCamera(p)?.lens.aperture ?? "-",
        type: "text",
      },
      {
        key: "opticalZoom",
        label: "Zoom Óptico",
        getValue: (p) => getCamera(p)?.lens.opticalZoom ?? "-",
        type: "text",
      },
    ],
  },

  {
    id: "storage",
    title: "Armazenamento",
    specs: [
      {
        key: "storageSlots",
        label: "Slots",
        getValue: (p) => getCamera(p)?.storage.slots?.toString() ?? "-",
        type: "text",
      },
      {
        key: "storageTypes",
        label: "Tipos de Cartão",
        getValue: (p) => getCamera(p)?.storage.types?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "dualSlotRecording",
        label: "Gravação Dupla",
        getValue: (p) => getCamera(p)?.storage.dualSlotRecording ?? false,
        type: "boolean",
      },
      {
        key: "uhs",
        label: "UHS",
        getValue: (p) => getCamera(p)?.storage.uhs ?? "-",
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
        getValue: (p) => getCamera(p)?.connectivity.wifi ?? false,
        type: "boolean",
      },
      {
        key: "bluetooth",
        label: "Bluetooth",
        getValue: (p) => getCamera(p)?.connectivity.bluetooth ?? false,
        type: "boolean",
      },
      {
        key: "nfc",
        label: "NFC",
        getValue: (p) => getCamera(p)?.connectivity.nfc ?? false,
        type: "boolean",
      },
      {
        key: "usb",
        label: "USB",
        getValue: (p) => getCamera(p)?.connectivity.usb ?? "-",
        type: "text",
      },
      {
        key: "hdmi",
        label: "HDMI",
        getValue: (p) => getCamera(p)?.connectivity.hdmi ?? false,
        type: "boolean",
      },
      {
        key: "hdmiType",
        label: "Tipo HDMI",
        getValue: (p) => getCamera(p)?.connectivity.hdmiType ?? "-",
        type: "text",
      },
      {
        key: "microphone",
        label: "Entrada Microfone",
        getValue: (p) => getCamera(p)?.connectivity.microphone ?? false,
        type: "boolean",
      },
      {
        key: "headphone",
        label: "Saída Fone",
        getValue: (p) => getCamera(p)?.connectivity.headphone ?? false,
        type: "boolean",
      },
    ],
  },

  {
    id: "battery",
    title: "Bateria",
    specs: [
      {
        key: "batteryType",
        label: "Tipo",
        getValue: (p) => getCamera(p)?.battery.type ?? "-",
        type: "text",
      },
      {
        key: "batteryCapacity",
        label: "Capacidade",
        getValue: (p) => getCamera(p)?.battery.capacity ?? "-",
        type: "text",
      },
      {
        key: "shotsPerCharge",
        label: "Fotos por Carga",
        getValue: (p) =>
          getCamera(p)?.battery.shotsPerCharge?.toString() ?? "-",
        type: "text",
      },
      {
        key: "videoRuntime",
        label: "Tempo de Vídeo",
        getValue: (p) => getCamera(p)?.battery.videoRuntime ?? "-",
        type: "text",
      },
      {
        key: "usbCharging",
        label: "Carga USB",
        getValue: (p) => getCamera(p)?.battery.usbCharging ?? false,
        type: "boolean",
      },
      {
        key: "batteryGrip",
        label: "Battery Grip",
        getValue: (p) => getCamera(p)?.battery.batteryGrip ?? false,
        type: "boolean",
      },
    ],
  },

  {
    id: "build",
    title: "Construção",
    specs: [
      {
        key: "weatherSealing",
        label: "Selagem",
        getValue: (p) => getCamera(p)?.build.weatherSealing ?? false,
        type: "boolean",
      },
      {
        key: "material",
        label: "Material",
        getValue: (p) => getCamera(p)?.build.material ?? "-",
        type: "text",
      },
      {
        key: "dimensions",
        label: "Dimensões",
        getValue: (p) => getCamera(p)?.build.dimensions ?? "-",
        type: "text",
      },
      {
        key: "weight",
        label: "Peso",
        getValue: (p) => getCamera(p)?.build.weight ?? "-",
        type: "text",
      },
      {
        key: "bodyOnly",
        label: "Peso (Corpo)",
        getValue: (p) => getCamera(p)?.build.bodyOnly ?? "-",
        type: "text",
      },
    ],
  },

  {
    id: "features",
    title: "Recursos",
    specs: [
      {
        key: "rawCapture",
        label: "RAW",
        getValue: (p) => getCamera(p)?.features.rawCapture ?? false,
        type: "boolean",
      },
      {
        key: "rawFormat",
        label: "Formato RAW",
        getValue: (p) => getCamera(p)?.features.rawFormat ?? "-",
        type: "text",
      },
      {
        key: "hdr",
        label: "HDR",
        getValue: (p) => getCamera(p)?.features.hdr ?? false,
        type: "boolean",
      },
      {
        key: "bracketing",
        label: "Bracketing",
        getValue: (p) => getCamera(p)?.features.bracketing ?? false,
        type: "boolean",
      },
      {
        key: "waterproof",
        label: "À Prova d'Água",
        getValue: (p) => getCamera(p)?.features.waterproof ?? false,
        type: "boolean",
      },
      {
        key: "waterproofDepth",
        label: "Profundidade",
        getValue: (p) => getCamera(p)?.features.waterproofDepth ?? "-",
        type: "text",
      },
      {
        key: "shockproof",
        label: "À Prova de Choque",
        getValue: (p) => getCamera(p)?.features.shockproof ?? false,
        type: "boolean",
      },
      {
        key: "gps",
        label: "GPS",
        getValue: (p) => getCamera(p)?.features.gps ?? false,
        type: "boolean",
      },
      {
        key: "voiceControl",
        label: "Controle por Voz",
        getValue: (p) => getCamera(p)?.features.voiceControl ?? false,
        type: "boolean",
      },
    ],
  },

  {
    id: "audio",
    title: "Áudio",
    specs: [
      {
        key: "builtInMic",
        label: "Microfone Embutido",
        getValue: (p) => getCamera(p)?.audio.builtInMicrophone ?? false,
        type: "boolean",
      },
      {
        key: "microphoneType",
        label: "Tipo de Microfone",
        getValue: (p) => getCamera(p)?.audio.microphoneType ?? "-",
        type: "text",
      },
      {
        key: "externalMic",
        label: "Microfone Externo",
        getValue: (p) => getCamera(p)?.audio.externalMicSupport ?? false,
        type: "boolean",
      },
      {
        key: "windNoise",
        label: "Redução de Vento",
        getValue: (p) => getCamera(p)?.audio.windNoiseReduction ?? false,
        type: "boolean",
      },
      {
        key: "audioLevels",
        label: "Controle de Níveis",
        getValue: (p) => getCamera(p)?.audio.audioLevels ?? false,
        type: "boolean",
      },
      {
        key: "headphoneMonitoring",
        label: "Monitoramento",
        getValue: (p) => getCamera(p)?.audio.headphoneMonitoring ?? false,
        type: "boolean",
      },
    ],
  },
];
```

## Exemplo Produto Object JSON de camera que você deve fazer

```json
{
  "id": "gopro-hero13-black-chdhx-131",
  "name": "Hero13 Black",
  "brand": "GoPro",
  "line": "Hero",
  "model": "HERO13 BLACK",
  "detailedModel": "CHDHX-131-RW",
  "color": "Preto",
  "image": "https://http2.mlstatic.com/D_NQ_NP_2X_857219-MLA99391123950_112025-F.webp",
  "price": 0,
  "releaseDate": "Setembro 2024",
  "releaseMonth": "Setembro",
  "releaseYear": 2024,
  "origin": null,
  "category": "cameras",
  "subcategory": "gopro",
  "alphanumericModel": "CHDHX-131-RW",
  "mercadolivreUrl": "https://mercadolivre.com/sec/1NE5rhM",
  "specs": {
    "type": "Action",
    "sensor": {
      "type": "CMOS",
      "size": "1/1.9\" (6.74 x 5.05 mm)",
      "resolution": "27 MP",
      "megapixels": 27,
      "cropFactor": "8:7 aspect ratio",
      "iso": {
        "native": "100-800",
        "expanded": "até 3200",
        "max": 3200
      },
      "stabilization": true,
      "ibis": false,
      "stabilizationType": "HyperSmooth 6.0",
      "dualNativeIso": false
    },
    "processor": "GP2",
    "autofocus": {
      "type": "Contrast Detection",
      "points": 0,
      "faceDetection": true,
      "eyeDetection": false,
      "animalDetection": false,
      "tracking": true,
      "touchFocus": true,
      "lowLightSensitivity": null
    },
    "video": {
      "maxResolution": "5.3K",
      "maxFrameRate": "60fps",
      "fourKFrameRates": ["24p", "30p", "60p", "120p"],
      "fullHdFrameRates": ["24p", "30p", "60p", "120p", "240p"],
      "slowMotion": "720p 400fps, 900p 360fps, 5.3K 120fps",
      "codec": ["H.264", "H.265"],
      "bitRate": null,
      "colorSampling": "4:2:0",
      "bitDepth": "10-bit",
      "logProfile": "GP-Log",
      "hdr": true,
      "timelapseBuiltIn": true,
      "externalRecording": false,
      "hdmiOutput": null
    },
    "display": {
      "type": "LCD",
      "size": "2.27\" (traseira) / 1.4\" (frontal)",
      "resolution": null,
      "touchscreen": true,
      "articulating": false,
      "articulationType": "Fixed",
      "viewfinder": false,
      "viewfinderType": null,
      "viewfinderResolution": null,
      "viewfinderMagnification": null,
      "viewfinderCoverage": null
    },
    "burstMode": {
      "maxFps": 400,
      "bufferDepth": null,
      "electronicShutter": true,
      "mechanicalShutter": false,
      "shutterSpeed": "1/8000s",
      "bulbMode": false
    },
    "lens": {
      "mount": "HB-Series",
      "included": "Grande angular integrada",
      "interchangeable": true,
      "focalLength": "Equivalente a 12mm (com HyperView)",
      "aperture": "f/2.8",
      "opticalZoom": "1.4x",
      "digitalZoom": "2x"
    },
    "storage": {
      "slots": 1,
      "types": ["microSD", "microSDXC"],
      "dualSlotRecording": false,
      "uhs": "UHS-I/UHS-3 (V30 ou superior)"
    },
    "connectivity": {
      "wifi": true,
      "bluetooth": true,
      "nfc": false,
      "usb": "USB-C",
      "hdmi": false,
      "hdmiType": null,
      "microphone": true,
      "microphoneType": "3.5mm jack (via Media Mod)",
      "headphone": false,
      "remote": true,
      "ethernet": false,
      "timecode": true
    },
    "battery": {
      "type": "Enduro Li-Ion",
      "capacity": "1900 mAh",
      "shotsPerCharge": null,
      "videoRuntime": "até 2.5 horas (1080p30) / 1.5 horas (5.3K30/4K30)",
      "usbCharging": true,
      "batteryGrip": false
    },
    "build": {
      "weatherSealing": true,
      "material": "Plástico reforçado com dissipador de calor",
      "dimensions": "71.8 x 50.8 x 33.6 mm",
      "weight": "159g",
      "bodyOnly": "159g",
      "withLens": null,
      "tripodMount": true,
      "coldShoeMount": false,
      "hotShoeMount": false
    },
    "features": {
      "rawCapture": true,
      "rawFormat": "GoPro RAW",
      "jpeg": true,
      "heif": false,
      "bracketing": false,
      "hdr": true,
      "panorama": false,
      "multipleExposure": false,
      "intervalShooting": true,
      "bulbTimer": false,
      "gps": true,
      "waterproof": true,
      "waterproofDepth": "10m",
      "shockproof": true,
      "freezeproof": true,
      "dustproof": true,
      "builtInNdFilter": false,
      "ndFilterStops": "ND4, ND8, ND16, ND32 (vendido separadamente)",
      "voiceControl": true,
      "touchscreenGestures": true
    },
    "audio": {
      "builtInMicrophone": true,
      "microphoneType": "Stereo com Voice Audio mode",
      "externalMicSupport": true,
      "windNoiseReduction": true,
      "audioLevels": false,
      "headphoneMonitoring": false,
      "audioFormat": ["AAC"]
    },
    "ratings": {
      "costBenefit": 8.0,
      "imageQuality": 8.5,
      "videoQuality": 9.0,
      "autofocus": 7.5,
      "buildQuality": 9.5,
      "versatility": 9.0
    },
    "targetAudience": "Action Sports, Vlogging, Content Creators",
    "manufacturer": "GoPro",
    "versions": ["CHDHX-131-RW", "CHDHX-131-TH", "CHDHX-131-MY"]
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
"cameras": [
      {
        "name": "Hero12 Black",
        "brand": "GoPro",
        "detailedModel": "CHDHX-121-RW",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_730021-MLA99583122530_122025-F.webp"
      },
      {
        "name": "Hero13 Black",
        "brand": "GoPro",
        "detailedModel": "CHDRB-133-RW",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_812111-MLA99929366063_112025-F.webp"
      },
      {
        "name": "Max 360",
        "brand": "GoPro",
        "detailedModel": "CHDHZ-203-RW",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_979436-MLA100187145761_122025-F.webp"
      },
      {
        "name": "Hero13 Black",
        "brand": "GoPro",
        "detailedModel": "CHDHX-131-RW",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_857219-MLA99391123950_112025-F.webp"
      },
      {
        "name": "HERO 4K",
        "brand": "GoPro",
        "detailedModel": "CHDHF-131-AT",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_853997-MLA99870127093_112025-F.webp"
      },
      {
        "name": "A6700",
        "brand": "Sony",
        "detailedModel": "ILCE-6700",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_686030-MLA99367373890_112025-F.webp"
      },
      {
        "name": "A10 Body",
        "brand": "SJCAM",
        "detailedModel": "A10 Body",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_987173-MLA99581909802_122025-F.webp"
      },
      {
        "name": "ZV-E10 II",
        "brand": "Sony",
        "detailedModel": "ILCE-ZVE10M2K",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_659867-MLA100056280635_122025-F.webp"
      },
      {
        "name": "Rebel T7",
        "brand": "Canon",
        "detailedModel": "EOS 2000D / Rebel T7",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_607413-MLA99473380696_112025-F.webp"
      },
      {
        "name": "EOS R100",
        "brand": "Canon",
        "detailedModel": "EOS R100 with RF-S 18-45mm",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_682960-MLA99451136186_112025-F.webp"
      },
      {
        "name": "BA-CAM215",
        "brand": "Basike",
        "detailedModel": "BA-CAM215",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_670436-MLB92100918634_092025-F-cmera-digital-4k-ultra-hd-64mp-com-zoom-af-tela-dupla.webp"
      },
      {
        "name": "A7 IV",
        "brand": "Sony",
        "detailedModel": "ILCE-7M4/B",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_628243-MLA99979900099_112025-F.webp"
      },
      {
        "name": "ZV-E10",
        "brand": "Sony",
        "detailedModel": "ILCZVE10 / Lente 16-50mm",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_611746-MLA99455212054_112025-F.webp"
      },
      {
        "name": "PYXIS 6K",
        "brand": "Blackmagic Design",
        "detailedModel": "CINECAMCPYXD60LFEF (Canon EF)",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_772451-MLA100037955413_122025-F.webp"
      },
      {
        "name": "Osmo Nano",
        "brand": "DJI",
        "detailedModel": "Osmo Nano Standard 128GB",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_823735-MLA105332811482_012026-F-camera-de-aco-dji-osmo-nano-standard-128gb-preto.webp"
      },
      {
        "name": "Pocket Cinema 6K G2",
        "brand": "Blackmagic Design",
        "detailedModel": "CINECAMPOCHDEF6K2",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_781541-MLA99400032662_112025-F.webp"
      },
      {
        "name": "FX30",
        "brand": "Sony",
        "detailedModel": "ILME-FX30B",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_990522-MLA99970863605_112025-F.webp"
      }
    ]
```

- Se eu passar dados de um item já cadastrado antes, ou que você já mandou os dados, pare o processo e me pergunte se eu quero continuar mesmo assim.

- **IMPORTANTE**: Mantenha subcategory como 'gopro' e category 'cameras', não coloque outros valores
