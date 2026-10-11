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

function isCameraDeSeguranca(product: Product): product is CameraDeSeguranca {
  return product.category === "cameras-de-seguranca";
}

export interface CameraDeSeguranca extends BaseProduct {
  category: "cameras-de-seguranca";
  specs: CameraDeSegurancaSpecs;
}

function getCameraDeSeguranca(p: Product): CameraDeSegurancaSpecs | null {
  return isCameraDeSeguranca(p) ? p.specs : null;
}

export interface CameraDeSegurancaSpecs {
  type: "Interna" | "Externa" | "Dome" | "Bullet" | "PTZ";
  resolution: string;
  videoQuality: {
    maxResolution: string;
    fps: number;
    hdr?: boolean;
    nightVision?: boolean;
    nightVisionRange?: string;
  };
  lens: {
    type?: string;
    focalLength?: string;
    aperture?: string;
    viewingAngle: string;
    zoom?: string;
  };
  sensor: {
    type?: string;
    size?: string;
    megapixels: number;
  };
  connectivity: {
    wifi?: boolean;
    wifiStandards?: string[];
    ethernet?: boolean;
    bluetooth?: boolean;
    cellular?: boolean;
  };
  storage: {
    internal?: string;
    sdCard?: boolean;
    maxSdCard?: string;
    cloud?: boolean;
    nvr?: boolean;
  };
  audio: {
    microphone?: boolean;
    speaker?: boolean;
    twoWayAudio?: boolean;
  };
  power: {
    type: string;
    poe?: boolean;
    battery?: boolean;
    batteryLife?: string;
    voltage?: string;
  };
  features: {
    motionDetection?: boolean;
    personDetection?: boolean;
    faceRecognition?: boolean;
    soundDetection?: boolean;
    alerts?: boolean;
    scheduling?: boolean;
    privacyMode?: boolean;
    pan?: boolean;
    tilt?: boolean;
    zoom?: boolean;
    autoTracking?: boolean;
  };
  environmental: {
    ipRating?: string;
    operatingTemp?: string;
    weatherResistant?: boolean;
  };
  app?: {
    name?: string;
    platforms?: string[];
    remoteAccess?: boolean;
  };
  dimensions?: {
    width?: string;
    height?: string;
    depth?: string;
    weight?: string;
  };
  ratings: {
    costBenefit: number | null;
    videoQuality: number;
    nightVision: number;
    easeOfUse: number;
    features: number;
  };
}

export const cameraDeSegurancaSpecs: SpecSection[] = [
  {
    id: "ratings",
    title: "Notas",
    specs: [
      {
        key: "costBenefit",
        label: "Custo-benefício",
        getValue: (p) => getCameraDeSeguranca(p)?.ratings.costBenefit ?? null,
        type: "rating",
      },
      {
        key: "videoQuality",
        label: "Qualidade de Vídeo",
        getValue: (p) => getCameraDeSeguranca(p)?.ratings.videoQuality ?? null,
        type: "rating",
      },
      {
        key: "nightVision",
        label: "Visão Noturna",
        getValue: (p) => getCameraDeSeguranca(p)?.ratings.nightVision ?? null,
        type: "rating",
      },
      {
        key: "easeOfUse",
        label: "Facilidade de Uso",
        getValue: (p) => getCameraDeSeguranca(p)?.ratings.easeOfUse ?? null,
        type: "rating",
      },
      {
        key: "features",
        label: "Recursos",
        getValue: (p) => getCameraDeSeguranca(p)?.ratings.features ?? null,
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
        getValue: (p) => getCameraDeSeguranca(p)?.type ?? "-",
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
    id: "video",
    title: "Vídeo",
    specs: [
      {
        key: "resolution",
        label: "Resolução",
        getValue: (p) => getCameraDeSeguranca(p)?.resolution ?? "-",
        type: "text",
      },
      {
        key: "maxResolution",
        label: "Resolução Máxima",
        getValue: (p) =>
          getCameraDeSeguranca(p)?.videoQuality.maxResolution ?? "-",
        type: "text",
      },
      {
        key: "fps",
        label: "FPS",
        getValue: (p) =>
          getCameraDeSeguranca(p)?.videoQuality.fps.toString() ?? "-",
        type: "text",
      },
      {
        key: "hdr",
        label: "HDR",
        getValue: (p) => getCameraDeSeguranca(p)?.videoQuality.hdr ?? false,
        type: "boolean",
      },
      {
        key: "nightVision",
        label: "Visão Noturna",
        getValue: (p) =>
          getCameraDeSeguranca(p)?.videoQuality.nightVision ?? false,
        type: "boolean",
      },
      {
        key: "nightVisionRange",
        label: "Alcance Visão Noturna",
        getValue: (p) =>
          getCameraDeSeguranca(p)?.videoQuality.nightVisionRange ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "lens",
    title: "Lente",
    specs: [
      {
        key: "lensType",
        label: "Tipo",
        getValue: (p) => getCameraDeSeguranca(p)?.lens.type ?? "-",
        type: "text",
      },
      {
        key: "focalLength",
        label: "Distância Focal",
        getValue: (p) => getCameraDeSeguranca(p)?.lens.focalLength ?? "-",
        type: "text",
      },
      {
        key: "aperture",
        label: "Abertura",
        getValue: (p) => getCameraDeSeguranca(p)?.lens.aperture ?? "-",
        type: "text",
      },
      {
        key: "viewingAngle",
        label: "Ângulo de Visão",
        getValue: (p) => getCameraDeSeguranca(p)?.lens.viewingAngle ?? "-",
        type: "text",
      },
      {
        key: "zoom",
        label: "Zoom",
        getValue: (p) => getCameraDeSeguranca(p)?.lens.zoom ?? "-",
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
        getValue: (p) => getCameraDeSeguranca(p)?.sensor.type ?? "-",
        type: "text",
      },
      {
        key: "sensorSize",
        label: "Tamanho",
        getValue: (p) => getCameraDeSeguranca(p)?.sensor.size ?? "-",
        type: "text",
      },
      {
        key: "megapixels",
        label: "Megapixels",
        getValue: (p) =>
          getCameraDeSeguranca(p)?.sensor.megapixels.toString() ?? "-",
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
        getValue: (p) => getCameraDeSeguranca(p)?.connectivity.wifi ?? false,
        type: "boolean",
      },
      {
        key: "wifiStandards",
        label: "Padrões Wi-Fi",
        getValue: (p) =>
          getCameraDeSeguranca(p)?.connectivity.wifiStandards?.join(", ") ??
          "-",
        type: "text",
      },
      {
        key: "ethernet",
        label: "Ethernet",
        getValue: (p) =>
          getCameraDeSeguranca(p)?.connectivity.ethernet ?? false,
        type: "boolean",
      },
      {
        key: "bluetooth",
        label: "Bluetooth",
        getValue: (p) =>
          getCameraDeSeguranca(p)?.connectivity.bluetooth ?? false,
        type: "boolean",
      },
      {
        key: "cellular",
        label: "Celular",
        getValue: (p) =>
          getCameraDeSeguranca(p)?.connectivity.cellular ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "storage",
    title: "Armazenamento",
    specs: [
      {
        key: "internal",
        label: "Interno",
        getValue: (p) => getCameraDeSeguranca(p)?.storage.internal ?? "-",
        type: "text",
      },
      {
        key: "sdCard",
        label: "Cartão SD",
        getValue: (p) => getCameraDeSeguranca(p)?.storage.sdCard ?? false,
        type: "boolean",
      },
      {
        key: "maxSdCard",
        label: "SD Máximo",
        getValue: (p) => getCameraDeSeguranca(p)?.storage.maxSdCard ?? "-",
        type: "text",
      },
      {
        key: "cloud",
        label: "Nuvem",
        getValue: (p) => getCameraDeSeguranca(p)?.storage.cloud ?? false,
        type: "boolean",
      },
      {
        key: "nvr",
        label: "NVR",
        getValue: (p) => getCameraDeSeguranca(p)?.storage.nvr ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "audio",
    title: "Áudio",
    specs: [
      {
        key: "microphone",
        label: "Microfone",
        getValue: (p) => getCameraDeSeguranca(p)?.audio.microphone ?? false,
        type: "boolean",
      },
      {
        key: "speaker",
        label: "Alto-falante",
        getValue: (p) => getCameraDeSeguranca(p)?.audio.speaker ?? false,
        type: "boolean",
      },
      {
        key: "twoWayAudio",
        label: "Áudio Bidirecional",
        getValue: (p) => getCameraDeSeguranca(p)?.audio.twoWayAudio ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "power",
    title: "Energia",
    specs: [
      {
        key: "powerType",
        label: "Tipo",
        getValue: (p) => getCameraDeSeguranca(p)?.power.type ?? "-",
        type: "text",
      },
      {
        key: "poe",
        label: "PoE",
        getValue: (p) => getCameraDeSeguranca(p)?.power.poe ?? false,
        type: "boolean",
      },
      {
        key: "battery",
        label: "Bateria",
        getValue: (p) => getCameraDeSeguranca(p)?.power.battery ?? false,
        type: "boolean",
      },
      {
        key: "batteryLife",
        label: "Duração da Bateria",
        getValue: (p) => getCameraDeSeguranca(p)?.power.batteryLife ?? "-",
        type: "text",
      },
      {
        key: "voltage",
        label: "Voltagem",
        getValue: (p) => getCameraDeSeguranca(p)?.power.voltage ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "features",
    title: "Recursos",
    specs: [
      {
        key: "motionDetection",
        label: "Detecção de Movimento",
        getValue: (p) =>
          getCameraDeSeguranca(p)?.features.motionDetection ?? false,
        type: "boolean",
      },
      {
        key: "personDetection",
        label: "Detecção de Pessoa",
        getValue: (p) =>
          getCameraDeSeguranca(p)?.features.personDetection ?? false,
        type: "boolean",
      },
      {
        key: "faceRecognition",
        label: "Reconhecimento Facial",
        getValue: (p) =>
          getCameraDeSeguranca(p)?.features.faceRecognition ?? false,
        type: "boolean",
      },
      {
        key: "soundDetection",
        label: "Detecção de Som",
        getValue: (p) =>
          getCameraDeSeguranca(p)?.features.soundDetection ?? false,
        type: "boolean",
      },
      {
        key: "alerts",
        label: "Alertas",
        getValue: (p) => getCameraDeSeguranca(p)?.features.alerts ?? false,
        type: "boolean",
      },
      {
        key: "scheduling",
        label: "Agendamento",
        getValue: (p) => getCameraDeSeguranca(p)?.features.scheduling ?? false,
        type: "boolean",
      },
      {
        key: "privacyMode",
        label: "Modo Privacidade",
        getValue: (p) => getCameraDeSeguranca(p)?.features.privacyMode ?? false,
        type: "boolean",
      },
      {
        key: "pan",
        label: "Pan",
        getValue: (p) => getCameraDeSeguranca(p)?.features.pan ?? false,
        type: "boolean",
      },
      {
        key: "tilt",
        label: "Tilt",
        getValue: (p) => getCameraDeSeguranca(p)?.features.tilt ?? false,
        type: "boolean",
      },
      {
        key: "featureZoom",
        label: "Zoom",
        getValue: (p) => getCameraDeSeguranca(p)?.features.zoom ?? false,
        type: "boolean",
      },
      {
        key: "autoTracking",
        label: "Rastreamento Automático",
        getValue: (p) =>
          getCameraDeSeguranca(p)?.features.autoTracking ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "environmental",
    title: "Ambiental",
    specs: [
      {
        key: "ipRating",
        label: "Classificação IP",
        getValue: (p) => getCameraDeSeguranca(p)?.environmental.ipRating ?? "-",
        type: "text",
      },
      {
        key: "operatingTemp",
        label: "Temperatura de Operação",
        getValue: (p) =>
          getCameraDeSeguranca(p)?.environmental.operatingTemp ?? "-",
        type: "text",
      },
      {
        key: "weatherResistant",
        label: "Resistente ao Clima",
        getValue: (p) =>
          getCameraDeSeguranca(p)?.environmental.weatherResistant ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "app",
    title: "Aplicativo",
    specs: [
      {
        key: "appName",
        label: "Nome",
        getValue: (p) => getCameraDeSeguranca(p)?.app?.name ?? "-",
        type: "text",
      },
      {
        key: "platforms",
        label: "Plataformas",
        getValue: (p) =>
          getCameraDeSeguranca(p)?.app?.platforms?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "remoteAccess",
        label: "Acesso Remoto",
        getValue: (p) => getCameraDeSeguranca(p)?.app?.remoteAccess ?? false,
        type: "boolean",
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
        getValue: (p) => getCameraDeSeguranca(p)?.dimensions?.width ?? "-",
        type: "text",
      },
      {
        key: "height",
        label: "Altura",
        getValue: (p) => getCameraDeSeguranca(p)?.dimensions?.height ?? "-",
        type: "text",
      },
      {
        key: "depth",
        label: "Profundidade",
        getValue: (p) => getCameraDeSeguranca(p)?.dimensions?.depth ?? "-",
        type: "text",
      },
      {
        key: "weight",
        label: "Peso",
        getValue: (p) => getCameraDeSeguranca(p)?.dimensions?.weight ?? "-",
        type: "text",
      },
    ],
  },
];
```

## Exemplo de Objeto Json camera de segurança que você deve fazer

```json
{
  "id": "hw-speed-dome-a8",
  "name": "Speed Dome A8",
  "brand": "HW",
  "line": "Speed Dome",
  "model": "A8",
  "alphanumericModel": "A8",
  "color": "Branco",
  "image": "https://http2.mlstatic.com/D_NQ_NP_2X_901090-MLA99414404486_112025-F.webp",
  "price": 0,
  "releaseDate": "2024",
  "releaseYear": 2024,
  "category": "cameras-de-seguranca",
  "anatelNumber": "59452214273",
  "mercadolivreUrl": "https://mercadolivre.com/sec/1BXJGku",
  "manufacturer": "HW",
  "specs": {
   "type": "Dome",
   "resolution": "1080p",
   "videoQuality": {
    "maxResolution": "1920x1080",
    "fps": 20,
    "hdr": false,
    "nightVision": true,
    "nightVisionRange": "7,62 m"
   },
   "lens": {
    "focalLength": "3,6 mm",
    "viewingAngle": "120°",
    "zoom": "5x digital"
   },
   "sensor": {
    "type": "Infravermelho",
    "megapixels": 2
   },
   "connectivity": {
    "wifi": true,
    "wifiStandards": ["802.11b", "802.11g"],
    "ethernet": true,
    "bluetooth": false,
    "cellular": false
   },
   "storage": {
    "sdCard": true,
    "maxSdCard": "64 GB",
    "cloud": true,
    "nvr": false
   },
   "audio": {
    "microphone": true,
    "speaker": true,
    "twoWayAudio": true
   },
   "power": {
    "type": "Corrente elétrica",
    "poe": false,
    "battery": false,
    "voltage": "Bivolt"
   },
   "features": {
    "motionDetection": true,
    "personDetection": false,
    "faceRecognition": false,
    "soundDetection": false,
    "alerts": true,
    "scheduling": false,
    "privacyMode": false,
    "pan": true,
    "tilt": true,
    "zoom": true,
    "autoTracking": false
   },
   "environmental": {
    "ipRating": "IP66",
    "operatingTemp": "2°C a 45°C",
    "weatherResistant": true
   },
   "app": {
    "name": "ICSee",
    "platforms": ["Android", "iOS"],
    "remoteAccess": true
   },
   "dimensions": {
    "width": "15 cm",
    "height": "16,5 cm",
    "weight": "290 g"
   },
   "ratings": {
    "costBenefit": 8,
    "videoQuality": 7,
    "nightVision": 6,
    "easeOfUse": 8,
    "features": 7
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
"cameras-de-seguranca": [
      {
        "name": "Speed Dome A8",
        "brand": "HW",
        "detailedModel": "A8",
        "model": "A8"
      },
      {
        "name": "P11",
        "brand": "Haixia",
        "detailedModel": "P11",
        "model": "P11"
      },
      {
        "name": "P11",
        "brand": "Maxnova",
        "detailedModel": "CÂMERA",
        "model": "CÂMERA"
      },
      {
        "name": "A28-2",
        "brand": "Casenn",
        "detailedModel": "A28-2",
        "model": "A28-2"
      },
      {
        "name": "Tapo TC40",
        "brand": "TP-Link",
        "detailedModel": "TC40",
        "model": "TC40"
      },
      {
        "name": "DS-2CD1027G2H-LIU",
        "brand": "Hikvision",
        "detailedModel": "DS-2CD1027G2H-LIU",
        "model": "DS-2CD1027G2H-LIU"
      },
      {
        "name": "E27",
        "brand": "Smart",
        "detailedModel": "E27",
        "model": "E27"
      },
      {
        "name": "8176QJ",
        "brand": "Genérica",
        "detailedModel": "Wifi smart camara",
        "model": "Wifi smart camara"
      },
      {
        "name": "VIPW 1300 Mini SD 3MP FC",
        "brand": "Intelbras",
        "detailedModel": "VIPW 1300 Mini SD 3MP FC",
        "model": "VIPW 1300 Mini SD 3MP FC"
      },
      {
        "name": "A8",
        "brand": "iCSee",
        "detailedModel": "A8",
        "model": "A8"
      },
      {
        "name": "Tomada",
        "brand": "Nixzen",
        "detailedModel": "Câmera de Segurança Tomada",
        "model": "Câmera de Segurança Tomada"
      },
      {
        "name": "A28B Dupla Lente",
        "brand": "HW",
        "detailedModel": "A28B Dupla Lente",
        "model": "A28"
      },
      {
        "name": "IPSKY2",
        "brand": "JL Protec",
        "detailedModel": "IPSKY2",
        "model": "IPSKY2"
      },
      {
        "name": "VHD 3220 B Full Color",
        "brand": "Intelbras",
        "detailedModel": "VHD 3220 B Full Color",
        "model": "VHD 3220 B Full Color"
      },
      {
        "name": "iM5 SC",
        "brand": "Intelbras",
        "detailedModel": "iM5 SC",
        "model": "iM5 SC"
      },
      {
        "name": "A9",
        "brand": "Genérica",
        "detailedModel": "A9",
        "model": "A9"
      }
    ]
```

- Se eu passar dados de um item já cadastrado antes, ou que você já mandou os dados, pare o processo e me pergunte se eu quero continuar mesmo assim.
