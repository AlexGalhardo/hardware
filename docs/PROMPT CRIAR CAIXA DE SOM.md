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

function isCaixaDeSom(product: Product): product is CaixaDeSom {
  return product.category === "caixa-de-som";
}

export interface CaixaDeSom extends BaseProduct {
  category: "caixa-de-som";
  specs: CaixaDeSomSpecs;
}

function getCaixaDeSom(p: Product): CaixaDeSomSpecs | null {
  return isCaixaDeSom(p) ? p.specs : null;
}

export interface CaixaDeSomSpecs {
  type: "Portátil" | "Home" | "Soundbar" | "Torre" | "Bookshelf" | "Subwoofer";
  audio: {
    power: {
      rms: number;
      peak?: number;
      unit: "W";
    };
    drivers: {
      configuration?: string;
      woofer?: string;
      tweeter?: string;
      midrange?: string;
      subwoofer?: string;
      passive?: boolean;
    };
    frequency: {
      min: number;
      max: number;
      unit: "Hz" | "kHz";
    };
    impedance?: string;
    sensitivity?: string;
    snr?: string;
  };
  connectivity: {
    bluetooth?: {
      version?: string;
      range?: string;
      multipoint?: boolean;
      codec?: string[];
    };
    wifi?: {
      standards?: string[];
      multiroom?: boolean;
    };
    wired?: {
      aux?: boolean;
      optical?: boolean;
      usb?: boolean;
      hdmi?: boolean;
      rca?: boolean;
    };
    nfc?: boolean;
  };
  features: {
    waterproof?: string;
    dustproof?: string;
    portability?: boolean;
    stereo?: boolean;
    partyMode?: boolean;
    fones-de-ouvido?: boolean;
    voiceAssistant?: string[];
    eqSettings?: boolean;
    customEQ?: boolean;
    app?: boolean;
    ledLights?: boolean;
    micInput?: boolean;
    karaoke?: boolean;
  };
  battery?: {
    capacity?: string;
    playTime?: string;
    chargingTime?: string;
    quickCharge?: boolean;
    powerBank?: boolean;
  };
  power?: {
    type?: string;
    voltage?: string;
    acAdapter?: boolean;
  };
  build: {
    material?: string;
    dimensions: {
      width: string;
      height: string;
      depth: string;
      weight: string;
    };
    mounting?: string[];
  };
  controls: {
    type?: string;
    volume?: boolean;
    playback?: boolean;
    voiceControl?: boolean;
    touch?: boolean;
  };
  accessories?: string[];
  ratings: {
    costBenefit: number | null;
    soundQuality: number;
    bassResponse: number;
    portability: number;
    batteryLife: number;
  };
}

export const caixaDeSomSpecs: SpecSection[] = [
  {
    id: "ratings",
    title: "Notas",
    specs: [
      {
        key: "costBenefit",
        label: "Custo-benefício",
        getValue: (p) => getCaixaDeSom(p)?.ratings.costBenefit ?? null,
        type: "rating",
      },
      {
        key: "soundQuality",
        label: "Qualidade de Som",
        getValue: (p) => getCaixaDeSom(p)?.ratings.soundQuality ?? null,
        type: "rating",
      },
      {
        key: "bassResponse",
        label: "Resposta de Graves",
        getValue: (p) => getCaixaDeSom(p)?.ratings.bassResponse ?? null,
        type: "rating",
      },
      {
        key: "portability",
        label: "Portabilidade",
        getValue: (p) => getCaixaDeSom(p)?.ratings.portability ?? null,
        type: "rating",
      },
      {
        key: "batteryLife",
        label: "Duração da Bateria",
        getValue: (p) => getCaixaDeSom(p)?.ratings.batteryLife ?? null,
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
        getValue: (p) => getCaixaDeSom(p)?.type ?? "-",
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
    id: "audio",
    title: "Áudio",
    specs: [
      {
        key: "rms",
        label: "Potência RMS",
        getValue: (p) => {
          const audio = getCaixaDeSom(p)?.audio;
          return audio ? `${audio.power.rms}${audio.power.unit}` : "-";
        },
        type: "text",
      },
      {
        key: "peak",
        label: "Potência Pico",
        getValue: (p) => {
          const audio = getCaixaDeSom(p)?.audio;
          return audio?.power.peak
            ? `${audio.power.peak}${audio.power.unit}`
            : "-";
        },
        type: "text",
      },
      {
        key: "configuration",
        label: "Configuração dos Drivers",
        getValue: (p) => getCaixaDeSom(p)?.audio.drivers.configuration ?? "-",
        type: "text",
      },
      {
        key: "woofer",
        label: "Woofer",
        getValue: (p) => getCaixaDeSom(p)?.audio.drivers.woofer ?? "-",
        type: "text",
      },
      {
        key: "tweeter",
        label: "Tweeter",
        getValue: (p) => getCaixaDeSom(p)?.audio.drivers.tweeter ?? "-",
        type: "text",
      },
      {
        key: "midrange",
        label: "Midrange",
        getValue: (p) => getCaixaDeSom(p)?.audio.drivers.midrange ?? "-",
        type: "text",
      },
      {
        key: "subwoofer",
        label: "Subwoofer",
        getValue: (p) => getCaixaDeSom(p)?.audio.drivers.subwoofer ?? "-",
        type: "text",
      },
      {
        key: "passive",
        label: "Radiador Passivo",
        getValue: (p) => getCaixaDeSom(p)?.audio.drivers.passive ?? false,
        type: "boolean",
      },
      {
        key: "frequencyRange",
        label: "Resposta de Frequência",
        getValue: (p) => {
          const audio = getCaixaDeSom(p)?.audio;
          return audio
            ? `${audio.frequency.min}-${audio.frequency.max}${audio.frequency.unit}`
            : "-";
        },
        type: "text",
      },
      {
        key: "impedance",
        label: "Impedância",
        getValue: (p) => getCaixaDeSom(p)?.audio.impedance ?? "-",
        type: "text",
      },
      {
        key: "sensitivity",
        label: "Sensibilidade",
        getValue: (p) => getCaixaDeSom(p)?.audio.sensitivity ?? "-",
        type: "text",
      },
      {
        key: "snr",
        label: "Relação Sinal/Ruído",
        getValue: (p) => getCaixaDeSom(p)?.audio.snr ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "connectivity",
    title: "Conectividade",
    specs: [
      {
        key: "bluetoothVersion",
        label: "Versão Bluetooth",
        getValue: (p) =>
          getCaixaDeSom(p)?.connectivity.bluetooth?.version ?? "-",
        type: "text",
      },
      {
        key: "bluetoothRange",
        label: "Alcance Bluetooth",
        getValue: (p) => getCaixaDeSom(p)?.connectivity.bluetooth?.range ?? "-",
        type: "text",
      },
      {
        key: "multipoint",
        label: "Multipoint",
        getValue: (p) =>
          getCaixaDeSom(p)?.connectivity.bluetooth?.multipoint ?? false,
        type: "boolean",
      },
      {
        key: "codec",
        label: "Codecs",
        getValue: (p) =>
          getCaixaDeSom(p)?.connectivity.bluetooth?.codec?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "wifiStandards",
        label: "Padrões Wi-Fi",
        getValue: (p) =>
          getCaixaDeSom(p)?.connectivity.wifi?.standards?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "multiroom",
        label: "Multiroom",
        getValue: (p) =>
          getCaixaDeSom(p)?.connectivity.wifi?.multiroom ?? false,
        type: "boolean",
      },
      {
        key: "aux",
        label: "Entrada AUX",
        getValue: (p) => getCaixaDeSom(p)?.connectivity.wired?.aux ?? false,
        type: "boolean",
      },
      {
        key: "optical",
        label: "Entrada Óptica",
        getValue: (p) => getCaixaDeSom(p)?.connectivity.wired?.optical ?? false,
        type: "boolean",
      },
      {
        key: "usb",
        label: "USB",
        getValue: (p) => getCaixaDeSom(p)?.connectivity.wired?.usb ?? false,
        type: "boolean",
      },
      {
        key: "hdmi",
        label: "HDMI",
        getValue: (p) => getCaixaDeSom(p)?.connectivity.wired?.hdmi ?? false,
        type: "boolean",
      },
      {
        key: "rca",
        label: "RCA",
        getValue: (p) => getCaixaDeSom(p)?.connectivity.wired?.rca ?? false,
        type: "boolean",
      },
      {
        key: "nfc",
        label: "NFC",
        getValue: (p) => getCaixaDeSom(p)?.connectivity.nfc ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "features",
    title: "Recursos",
    specs: [
      {
        key: "waterproof",
        label: "Resistência à Água",
        getValue: (p) => getCaixaDeSom(p)?.features.waterproof ?? "-",
        type: "text",
      },
      {
        key: "dustproof",
        label: "Resistência à Poeira",
        getValue: (p) => getCaixaDeSom(p)?.features.dustproof ?? "-",
        type: "text",
      },
      {
        key: "portability",
        label: "Portátil",
        getValue: (p) => getCaixaDeSom(p)?.features.portability ?? false,
        type: "boolean",
      },
      {
        key: "stereo",
        label: "Estéreo",
        getValue: (p) => getCaixaDeSom(p)?.features.stereo ?? false,
        type: "boolean",
      },
      {
        key: "partyMode",
        label: "Modo Festa",
        getValue: (p) => getCaixaDeSom(p)?.features.partyMode ?? false,
        type: "boolean",
      },
      {
        key: "fones-de-ouvido",
        label: "TWS (True Wireless Stereo)",
        getValue: (p) => getCaixaDeSom(p)?.features.fones-de-ouvido ?? false,
        type: "boolean",
      },
      {
        key: "voiceAssistant",
        label: "Assistente de Voz",
        getValue: (p) =>
          getCaixaDeSom(p)?.features.voiceAssistant?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "eqSettings",
        label: "Configurações de EQ",
        getValue: (p) => getCaixaDeSom(p)?.features.eqSettings ?? false,
        type: "boolean",
      },
      {
        key: "customEQ",
        label: "EQ Customizável",
        getValue: (p) => getCaixaDeSom(p)?.features.customEQ ?? false,
        type: "boolean",
      },
      {
        key: "app",
        label: "Aplicativo",
        getValue: (p) => getCaixaDeSom(p)?.features.app ?? false,
        type: "boolean",
      },
      {
        key: "ledLights",
        label: "Luzes LED",
        getValue: (p) => getCaixaDeSom(p)?.features.ledLights ?? false,
        type: "boolean",
      },
      {
        key: "micInput",
        label: "Entrada de Microfone",
        getValue: (p) => getCaixaDeSom(p)?.features.micInput ?? false,
        type: "boolean",
      },
      {
        key: "karaoke",
        label: "Modo Karaokê",
        getValue: (p) => getCaixaDeSom(p)?.features.karaoke ?? false,
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
        getValue: (p) => getCaixaDeSom(p)?.battery?.capacity ?? "-",
        type: "text",
      },
      {
        key: "playTime",
        label: "Tempo de Reprodução",
        getValue: (p) => getCaixaDeSom(p)?.battery?.playTime ?? "-",
        type: "text",
      },
      {
        key: "chargingTime",
        label: "Tempo de Carga",
        getValue: (p) => getCaixaDeSom(p)?.battery?.chargingTime ?? "-",
        type: "text",
      },
      {
        key: "quickCharge",
        label: "Carga Rápida",
        getValue: (p) => getCaixaDeSom(p)?.battery?.quickCharge ?? false,
        type: "boolean",
      },
      {
        key: "powerBank",
        label: "Função Power Bank",
        getValue: (p) => getCaixaDeSom(p)?.battery?.powerBank ?? false,
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
        getValue: (p) => getCaixaDeSom(p)?.power?.type ?? "-",
        type: "text",
      },
      {
        key: "voltage",
        label: "Voltagem",
        getValue: (p) => getCaixaDeSom(p)?.power?.voltage ?? "-",
        type: "text",
      },
      {
        key: "acAdapter",
        label: "Adaptador AC",
        getValue: (p) => getCaixaDeSom(p)?.power?.acAdapter ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "build",
    title: "Construção",
    specs: [
      {
        key: "material",
        label: "Material",
        getValue: (p) => getCaixaDeSom(p)?.build.material ?? "-",
        type: "text",
      },
      {
        key: "width",
        label: "Largura",
        getValue: (p) => getCaixaDeSom(p)?.build.dimensions.width ?? "-",
        type: "text",
      },
      {
        key: "height",
        label: "Altura",
        getValue: (p) => getCaixaDeSom(p)?.build.dimensions.height ?? "-",
        type: "text",
      },
      {
        key: "depth",
        label: "Profundidade",
        getValue: (p) => getCaixaDeSom(p)?.build.dimensions.depth ?? "-",
        type: "text",
      },
      {
        key: "weight",
        label: "Peso",
        getValue: (p) => getCaixaDeSom(p)?.build.dimensions.weight ?? "-",
        type: "text",
      },
      {
        key: "mounting",
        label: "Opções de Montagem",
        getValue: (p) => getCaixaDeSom(p)?.build.mounting?.join(", ") ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "controls",
    title: "Controles",
    specs: [
      {
        key: "controlType",
        label: "Tipo",
        getValue: (p) => getCaixaDeSom(p)?.controls.type ?? "-",
        type: "text",
      },
      {
        key: "volume",
        label: "Controle de Volume",
        getValue: (p) => getCaixaDeSom(p)?.controls.volume ?? false,
        type: "boolean",
      },
      {
        key: "playback",
        label: "Controle de Reprodução",
        getValue: (p) => getCaixaDeSom(p)?.controls.playback ?? false,
        type: "boolean",
      },
      {
        key: "voiceControl",
        label: "Controle por Voz",
        getValue: (p) => getCaixaDeSom(p)?.controls.voiceControl ?? false,
        type: "boolean",
      },
      {
        key: "touch",
        label: "Controle Touch",
        getValue: (p) => getCaixaDeSom(p)?.controls.touch ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "accessories",
    title: "Acessórios",
    specs: [
      {
        key: "accessories",
        label: "Inclusos",
        getValue: (p) => getCaixaDeSom(p)?.accessories?.join(", ") ?? "-",
        type: "text",
      },
    ],
  },
];
```

## Exemplo de Objeto Json caixa de som que você deve fazer

```json
{
  "id": "basike-ba-rad293",
  "name": "BA-RAD293",
  "brand": "Basike",
  "line": "Boombox",
  "model": "BA-RAD293",
  "detailedModel": "caixa de som Bluetooth",
  "color": "Preto",
  "image": "https://http2.mlstatic.com/D_NQ_NP_2X_977733-MLA99450899418_112025-F.webp",
  "price": null,
  "releaseDate": null,
  "releaseMonth": null,
  "releaseYear": null,
  "origin": null,
  "category": "caixa-de-som",
  "anatelNumber": "209382314103",
  "amazonUrl": null,
  "mercadolivreUrl": "https://mercadolivre.com/sec/1vMhCGp",
  "shopeeUrl": null,
  "alphanumericModel": "BA-RAD293",
  "version": null,
  "manufacturer": "Basike",
  "specs": {
    "type": "Portátil",
    "audio": {
      "power": {
        "rms": 100,
        "peak": null,
        "unit": "W"
      },
      "drivers": {
        "configuration": "3 alto-falantes",
        "woofer": null,
        "tweeter": null,
        "midrange": null,
        "subwoofer": "Sim",
        "passive": true
      },
      "frequency": {
        "min": 50,
        "max": 20,
        "unit": "kHz"
      },
      "impedance": null,
      "sensitivity": null,
      "snr": null
    },
    "connectivity": {
      "bluetooth": {
        "version": "5.3",
        "range": "10m",
        "multipoint": false,
        "codec": null
      },
      "wifi": null,
      "wired": {
        "aux": true,
        "optical": false,
        "usb": true,
        "hdmi": false,
        "rca": false
      },
      "nfc": false
    },
    "features": {
      "waterproof": "IPX5",
      "dustproof": "Sim",
      "portability": true,
      "stereo": true,
      "partyMode": true,
      "fones-de-ouvido": true,
      "voiceAssistant": ["Siri", "Google Assistant"],
      "eqSettings": true,
      "customEQ": true,
      "app": false,
      "ledLights": true,
      "micInput": true,
      "karaoke": true
    },
    "battery": {
      "capacity": "10000mAh",
      "playTime": "12h",
      "chargingTime": "3h",
      "quickCharge": false,
      "powerBank": true
    },
    "power": {
      "type": "Bateria recarregável",
      "voltage": "5V",
      "acAdapter": false
    },
    "build": {
      "material": "Plástico",
      "dimensions": {
        "width": "34.7cm",
        "height": "12.5cm",
        "depth": "12.8cm",
        "weight": "2.3kg"
      },
      "mounting": null
    },
    "controls": {
      "type": "Botões físicos",
      "volume": true,
      "playback": true,
      "voiceControl": true,
      "touch": false
    },
    "accessories": ["Cabo USB Tipo C", "Alça de transporte"],
    "ratings": {
      "costBenefit": 8.5,
      "soundQuality": 8.0,
      "bassResponse": 8.5,
      "portability": 8.0,
      "batteryLife": 9.0
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
"caixas-de-som": [
      {
        "name": "BA-RAD293",
        "brand": "Basike",
        "detailedModel": "caixa de som Bluetooth",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_977733-MLA99450899418_112025-F.webp"
      },
      {
        "name": "X39",
        "brand": "Imenso",
        "detailedModel": "IMS-X39",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_634877-MLA99475192414_112025-F.webp"
      },
      {
        "name": "Go 4",
        "brand": "JBL",
        "detailedModel": "JBL GO 4",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_845858-MLA99444150348_112025-F.webp"
      },
      {
        "name": "PCX4500",
        "brand": "Philco",
        "detailedModel": "PCX4500",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_991289-MLA99508513906_112025-F.webp"
      },
      {
        "name": "DR-909",
        "brand": "Sabala",
        "detailedModel": "DR-909",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_748535-MLA99925975241_112025-F.webp"
      },
      {
        "name": "AWS-T1W-02",
        "brand": "Aiwa",
        "detailedModel": "AWS-T1W-02",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_651042-MLA99944068411_112025-F.webp"
      },
      {
        "name": "ACA 600 Bagvox",
        "brand": "Amvox",
        "detailedModel": "ACA 600 BAGVOX BLACK",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_674803-MLA99505013180_112025-F.webp"
      },
      {
        "name": "ACA 221 Gigante II",
        "brand": "Amvox",
        "detailedModel": "ACA 221 Gigante II",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_705609-MLA100048298233_122025-F.webp"
      },
      {
        "name": "ACA 255 Hit",
        "brand": "Amvox",
        "detailedModel": "ACA 255 Hit",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_928496-MLA99872541579_112025-F.webp"
      },
      {
        "name": "PCX3800 Flash Lights",
        "brand": "Philco",
        "detailedModel": "PCX3800 Flash Lights",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_910339-MLA99504557104_112025-F.webp"
      },
      {
        "name": "Pulsebox 3",
        "brand": "Pulsesound",
        "detailedModel": "SP511",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_788363-MLA99472715530_112025-F.webp"
      },
      {
        "name": "Speaker Extreme",
        "brand": "Britânia",
        "detailedModel": "Speaker Extreme Flash Lights TWS",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_717966-MLA99987930081_112025-F.webp"
      },
      {
        "name": "KP-RO803",
        "brand": "Knup",
        "detailedModel": "Soundbar RGB Gamer",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_795909-MLA100092172023_122025-F.webp"
      },
      {
        "name": "ACA 150 Pop",
        "brand": "Amvox",
        "detailedModel": "ACA 150 Pop",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_724539-MLA99496731090_112025-F.webp"
      }
    ]
```

- Se eu passar dados de um item já cadastrado antes, ou que você já mandou os dados, pare o processo e me pergunte se eu quero continuar mesmo assim.
