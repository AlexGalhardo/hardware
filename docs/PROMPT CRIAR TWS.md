# Contexto

- Site: <https://tudohardware.com>
- Os dados dos produtos são salvos em formato JSON

## Tipagem do objeto JSON que você vai criar

```ts
import { SpecSection } from "../spec-configs";
import { BaseProduct, Product } from "../types";

export interface FoneDeOuvido extends BaseProduct {
  category: "fones-de-ouvido";
  specs: FoneDeOuvidoSpecs;
}

function isFoneDeOuvido(product: Product): product is FoneDeOuvido {
  return product.category === "fones-de-ouvido";
}

function getFoneDeOuvido(p: Product): FoneDeOuvidoSpecs | null {
  return isFoneDeOuvido(p) ? p.specs : null;
}

export interface FoneDeOuvidoSpecs {
  driverSize?: string;
  frequencyResponse?: string;
  sensitivityDb?: number | null;
  bluetoothCodecs?: string;
  bluetoothVersion?: string;
  wirelessRangeMeters?: number | null;
  connectors?: string;
  twsTechnology?: boolean;
  anc?: boolean;
  transparency?: boolean;
  batteryEarbuds?: string;
  batteryCase?: string;
  totalBattery?: string;
  batteryCapacityEarbudsMah?: number | null;
  batteryCapacityCaseMah?: number | null;
  chargingTimeEarbuds?: string;
  chargingTimeCase?: string;
  fastCharging?: boolean;
  wirelessCharging?: boolean;
  includesChargingCase?: boolean;
  microphone?: boolean;
  microphonesCount?: number | null;
  handsFreeMode?: boolean;
  detachableMic?: boolean;
  flexibleMic?: boolean;
  micOrientation?: string;
  waterResistance?: boolean;
  waterproof?: boolean;
  dustResistance?: boolean;
  ipRating?: string;
  formFactor?: string;
  monaural?: boolean;
  weight?: string;
  touchControls?: boolean;
  ledLight?: boolean;
  proximitySensor?: boolean;
  voiceAssistant?: boolean;
  integratedAssistants?: string;
  multipoint?: boolean;
  appSupport?: boolean;
  mp3Player?: boolean;
  fmRadio?: boolean;
  recommendedUse?: string;
  compatibleConsoles?: string;
  cableLength?: string;
  kids?: boolean;
  accessoriesIncluded?: string;
  ratings: {
    costBenefit: number | null;
    soundQuality: number;
    anc: number;
    comfort: number;
    battery: number;
  };
}

export const fonesDeOuvidoSpecs: SpecSection[] = [
  {
    id: "ratings",
    title: "Notas",
    specs: [
      {
        key: "costBenefit",
        label: "Custo-benefício",
        getValue: (p) => getFoneDeOuvido(p)?.ratings.costBenefit ?? null,
        type: "rating",
      },
      {
        key: "soundQuality",
        label: "Som",
        getValue: (p) => getFoneDeOuvido(p)?.ratings.soundQuality ?? null,
        type: "rating",
      },
      {
        key: "ancRating",
        label: "ANC",
        getValue: (p) => getFoneDeOuvido(p)?.ratings.anc ?? null,
        type: "rating",
      },
      {
        key: "comfort",
        label: "Conforto",
        getValue: (p) => getFoneDeOuvido(p)?.ratings.comfort ?? null,
        type: "rating",
      },
      {
        key: "batteryRating",
        label: "Bateria",
        getValue: (p) => getFoneDeOuvido(p)?.ratings.battery ?? null,
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
        key: "model",
        label: "Modelo",
        getValue: (p) => p.model ?? "-",
        type: "text",
      },
      {
        key: "line",
        label: "Linha",
        getValue: (p) => p.line ?? "-",
        type: "text",
      },
      {
        key: "color",
        label: "Cor",
        getValue: (p) => p.color ?? "-",
        type: "text",
      },
      {
        key: "releaseYear",
        label: "Ano",
        getValue: (p) => p.releaseYear ?? "-",
        type: "text",
      },
      {
        key: "manufacturer",
        label: "Fabricante",
        getValue: (p) => p.manufacturer ?? "-",
        type: "text",
      },
      {
        key: "anatel",
        label: "ANATEL",
        getValue: (p) => p.anatelNumber ?? "-",
        type: "text",
      },
    ],
  },

  {
    id: "audio",
    title: "Áudio",
    specs: [
      {
        key: "driverSize",
        label: "Driver",
        getValue: (p) => getFoneDeOuvido(p)?.driverSize ?? "-",
        type: "text",
      },
      {
        key: "frequencyResponse",
        label: "Frequência",
        getValue: (p) => getFoneDeOuvido(p)?.frequencyResponse ?? "-",
        type: "text",
      },
      {
        key: "sensitivityDb",
        label: "Sensibilidade",
        getValue: (p) =>
          getFoneDeOuvido(p)?.sensitivityDb != null
            ? `${getFoneDeOuvido(p)!.sensitivityDb} dB`
            : "-",
        type: "text",
      },
      {
        key: "bluetoothCodecs",
        label: "Codecs",
        getValue: (p) => getFoneDeOuvido(p)?.bluetoothCodecs ?? "-",
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
        label: "Bluetooth",
        getValue: (p) => getFoneDeOuvido(p)?.bluetoothVersion ?? "-",
        type: "text",
      },
      {
        key: "wirelessRangeMeters",
        label: "Alcance",
        getValue: (p) =>
          getFoneDeOuvido(p)?.wirelessRangeMeters != null
            ? `${getFoneDeOuvido(p)!.wirelessRangeMeters} m`
            : "-",
        type: "text",
      },
      {
        key: "connectors",
        label: "Conector",
        getValue: (p) => getFoneDeOuvido(p)?.connectors ?? "-",
        type: "text",
      },
      {
        key: "multipoint",
        label: "Multipoint",
        getValue: (p) => getFoneDeOuvido(p)?.multipoint ?? false,
        type: "boolean",
      },
    ],
  },

  {
    id: "battery",
    title: "Bateria",
    specs: [
      {
        key: "batteryEarbuds",
        label: "Autonomia (Fones)",
        getValue: (p) => getFoneDeOuvido(p)?.batteryEarbuds ?? "-",
        type: "text",
      },
      {
        key: "batteryCase",
        label: "Autonomia (Case)",
        getValue: (p) => getFoneDeOuvido(p)?.batteryCase ?? "-",
        type: "text",
      },
      {
        key: "totalBattery",
        label: "Total",
        getValue: (p) => getFoneDeOuvido(p)?.totalBattery ?? "-",
        type: "text",
      },
      {
        key: "batteryCapacityEarbudsMah",
        label: "Cap. Fones",
        getValue: (p) =>
          getFoneDeOuvido(p)?.batteryCapacityEarbudsMah != null
            ? `${getFoneDeOuvido(p)!.batteryCapacityEarbudsMah} mAh`
            : "-",
        type: "text",
      },
      {
        key: "batteryCapacityCaseMah",
        label: "Cap. Case",
        getValue: (p) =>
          getFoneDeOuvido(p)?.batteryCapacityCaseMah != null
            ? `${getFoneDeOuvido(p)!.batteryCapacityCaseMah} mAh`
            : "-",
        type: "text",
      },
      {
        key: "fastCharging",
        label: "Carga Rápida",
        getValue: (p) => getFoneDeOuvido(p)?.fastCharging ?? false,
        type: "boolean",
      },
      {
        key: "wirelessCharging",
        label: "Wireless",
        getValue: (p) => getFoneDeOuvido(p)?.wirelessCharging ?? false,
        type: "boolean",
      },
    ],
  },

  {
    id: "features",
    title: "Recursos",
    specs: [
      {
        key: "anc",
        label: "ANC",
        getValue: (p) => getFoneDeOuvido(p)?.anc ?? false,
        type: "boolean",
      },
      {
        key: "transparency",
        label: "Transparência",
        getValue: (p) => getFoneDeOuvido(p)?.transparency ?? false,
        type: "boolean",
      },
      {
        key: "touchControls",
        label: "Touch",
        getValue: (p) => getFoneDeOuvido(p)?.touchControls ?? false,
        type: "boolean",
      },
      {
        key: "voiceAssistant",
        label: "Assistente",
        getValue: (p) => getFoneDeOuvido(p)?.voiceAssistant ?? false,
        type: "boolean",
      },
      {
        key: "ipRating",
        label: "Proteção IP",
        getValue: (p) => getFoneDeOuvido(p)?.ipRating ?? "-",
        type: "text",
      },
      {
        key: "weight",
        label: "Peso",
        getValue: (p) => getFoneDeOuvido(p)?.weight ?? "-",
        type: "text",
      },
      {
        key: "accessoriesIncluded",
        label: "Acessórios",
        getValue: (p) => getFoneDeOuvido(p)?.accessoriesIncluded ?? "-",
        type: "text",
      },
    ],
  },
];
```

## Exemplo Produto Object JSON de Fone de ouvido que você deve criar

```json
{
  "id": "maxnova-g9s",
  "name": "G9S",
  "brand": "Maxnova",
  "line": "TWS",
  "model": "G9S",
  "detailedModel": "G9S",
  "color": "Preto",
  "image": "https://http2.mlstatic.com/D_NQ_NP_2X_851772-MLA99999876042_122025-F.webp",
  "price": null,
  "releaseDate": null,
  "releaseMonth": null,
  "releaseYear": null,
  "origin": null,
  "category": "fones-de-ouvido",
  "anatelNumber": null,
  "amazonUrl": null,
  "mercadolivreUrl": "https://mercadolivre.com/sec/2gZTHDv",
  "shopeeUrl": null,
  "alphanumericModel": "G9S",
  "version": null,
  "manufacturer": "M Maxnova",
  "specs": {
    "driverSize": "12 mm",
    "frequencyResponse": null,
    "sensitivityDb": null,
    "bluetoothCodecs": null,
    "bluetoothVersion": "5.1",
    "wirelessRangeMeters": null,
    "connectors": "USB Type-C",
    "twsTechnology": true,
    "anc": false,
    "transparency": false,
    "batteryEarbuds": "≈5 h",
    "batteryCase": null,
    "totalBattery": "≈5 h",
    "batteryCapacityEarbudsMah": null,
    "batteryCapacityCaseMah": 300,
    "chargingTimeEarbuds": null,
    "chargingTimeCase": "25 h",
    "fastCharging": false,
    "wirelessCharging": true,
    "includesChargingCase": true,
    "microphone": true,
    "microphonesCount": null,
    "handsFreeMode": true,
    "detachableMic": false,
    "flexibleMic": false,
    "micOrientation": null,
    "waterResistance": false,
    "waterproof": false,
    "dustResistance": false,
    "ipRating": null,
    "formFactor": "in-ear",
    "monaural": true,
    "weight": null,
    "touchControls": null,
    "ledLight": true,
    "proximitySensor": true,
    "voiceAssistant": true,
    "integratedAssistants": null,
    "multipoint": false,
    "appSupport": false,
    "mp3Player": false,
    "fmRadio": false,
    "recommendedUse": "entretenimento",
    "compatibleConsoles": null,
    "cableLength": null,
    "kids": true,
    "accessoriesIncluded": "cabo USB-C, guia de início",
    "ratings": {
      "costBenefit": 8.5,
      "soundQuality": 6,
      "anc": 0,
      "comfort": 6,
      "battery": 5
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
"fones-de-ouvido": [
      {
        "name": "P20i A39490F2",
        "brand": "Soundcore",
        "detailedModel": "A39490F2",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_730568-MLA99983575997_112025-F.webp"
      },
      {
        "name": "G9S",
        "brand": "Maxnova",
        "detailedModel": "G9S",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_851772-MLA99999876042_122025-F.webp"
      },
      {
        "name": "Redmi Buds 6 Play",
        "brand": "Xiaomi Mi",
        "detailedModel": "M2420E1",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_702193-MLB95043437621_102025-F.webp"
      },
      {
        "name": "Galaxy Buds Core",
        "brand": "Samsung",
        "detailedModel": "SM-R410",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_650858-MLA97317826023_112025-F.webp"
      },
      {
        "name": "C-FBT-02",
        "brand": "Casenn",
        "detailedModel": "Bluetooth",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_730569-MLA99899809817_112025-F.webp"
      },
      {
        "name": "Sport X20",
        "brand": "Soundcore",
        "detailedModel": "A3968Z11",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_775307-MLA96869951449_102025-F.webp"
      },
      {
        "name": "TAT1209BK",
        "brand": "Philips",
        "detailedModel": "TAT1209BK",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_891812-MLA100014334277_122025-F.webp"
      },
      {
        "name": "H3",
        "brand": "QCY",
        "detailedModel": "BH23H3A",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_772553-MLA99501142436_112025-F.webp"
      },
      {
        "name": "LE-2410",
        "brand": "KATELUO",
        "detailedModel": "Bluetooth",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_733350-MLA104669490705_012026-F.webp"
      },
      {
        "name": "S20",
        "brand": "Genérica",
        "detailedModel": "TWS",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_643677-MLB89830004223_082025-F-fones-de-ouvido-bluetooth-sem-fio-c-espelho-impermeavel-s20.webp"
      },
      {
        "name": "Wave Buds 2",
        "brand": "JBL",
        "detailedModel": "JBLWBUDS2BLU",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_811984-MLA99445406304_112025-F.webp"
      },
      {
        "name": "Ba-FON142",
        "brand": "Basike",
        "detailedModel": "fones de ouvido Bluetooth sem fio",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_957835-MLB89683359344_082025-F-fone-de-ouvido-bluetooth-corrida-gancho-prova-dagua-com-gan.webp"
      },
      {
        "name": "FN-BT03",
        "brand": "B Basto",
        "detailedModel": "FN-BT3 BRANCO",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_832603-MLA99441277068_112025-F.webp"
      },
      {
        "name": "Pro 3",
        "brand": "Lumi ple",
        "detailedModel": "irpod Fone sem fio",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_762356-MLA99933079261_112025-F.webp"
      },
      {
        "name": "J-60w",
        "brand": "Geral",
        "detailedModel": "J-60w",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_810059-MLB103937899945_012026-F.webp"
      },
      {
        "name": "P20i A3949032",
        "brand": "Soundcore",
        "detailedModel": "A3949032",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_709113-MLA99494499900_112025-F.webp"
      },
      {
        "name": "T13",
        "brand": "QCY",
        "detailedModel": "T13",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_928856-MLA99938836845_112025-F.webp"
      },
      {
        "name": "F9-5",
        "brand": "Pares",
        "detailedModel": "01",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_950255-MLA99604896412_122025-F.webp"
      }
    ]
```

Se eu passar dados de um item já cadastrado antes, ou que você já mandou os dados, pare o processo e me pergunte se eu quero continuar mesmo assim.
