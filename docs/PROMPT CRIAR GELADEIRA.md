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

export interface GeladeiraSpecs {
  specs: {
    totalCapacityL: number;
    fridgeCapacityL: number;
    freezerCapacityL: number;
    widthCm: number;
    depthCm: number;
    heightCm: number;
    weightKg: number;
    doors: number;
    defrostType: "frost-free" | "manual" | "cycle-defrost";
    energyRating: string;
    inverter: boolean;
    controlPanel: "mecânico" | "digital" | "táctil";
    temperatureLevels?: number;
    freezerLocation: "superior" | "inferior";
    freezerShelves?: number;
    iceMaker: boolean;
    fridgeShelves?: number;
    wifi: boolean;
    doorAlarm: boolean;
    waterDispenser: boolean;
    iceDispenser: boolean;
    fastFreeze: boolean;
    deodorizerFilter: boolean;
    reversibleDoors: boolean;
    internalLight: boolean;
    multiAirFlow?: boolean;
  };
  ratings: {
    costBenefit: number | null;
    efficiency: number;
    internalSpace: number;
    buildQuality: number;
    features: number;
  };
}
```

```ts
export const geladeiraSpecs: SpecSection[] = [
  {
    id: "ratings",
    title: "Notas",
    specs: [
      {
        key: "costBenefit",
        label: "Custo-benefício",
        getValue: (p) => (isGeladeira(p) ? p.specs.ratings.costBenefit : null),
        type: "rating",
      },
      {
        key: "efficiency",
        label: "Eficiência",
        getValue: (p) => (isGeladeira(p) ? p.specs.ratings.efficiency : null),
        type: "rating",
      },
      {
        key: "internalSpace",
        label: "Espaço Interno",
        getValue: (p) =>
          isGeladeira(p) ? p.specs.ratings.internalSpace : null,
        type: "rating",
      },
      {
        key: "buildQuality",
        label: "Construção",
        getValue: (p) => (isGeladeira(p) ? p.specs.ratings.buildQuality : null),
        type: "rating",
      },
      {
        key: "features",
        label: "Recursos",
        getValue: (p) => (isGeladeira(p) ? p.specs.ratings.features : null),
        type: "rating",
      },
    ],
  },
  {
    id: "capacity",
    title: "Capacidade",
    specs: [
      {
        key: "totalCapacityL",
        label: "Capacidade Total",
        getValue: (p) =>
          isGeladeira(p) ? `${p.specs.specs.totalCapacityL} L` : "-",
        type: "text",
      },
      {
        key: "fridgeCapacityL",
        label: "Geladeira",
        getValue: (p) =>
          isGeladeira(p) ? `${p.specs.specs.fridgeCapacityL} L` : "-",
        type: "text",
      },
      {
        key: "freezerCapacityL",
        label: "Freezer",
        getValue: (p) =>
          isGeladeira(p) ? `${p.specs.specs.freezerCapacityL} L` : "-",
        type: "text",
      },
    ],
  },
  {
    id: "dimensions",
    title: "Dimensões",
    specs: [
      {
        key: "size",
        label: "Tamanho (L × P × A)",
        getValue: (p) =>
          isGeladeira(p)
            ? `${p.specs.specs.widthCm} x ${p.specs.specs.depthCm} x ${p.specs.specs.heightCm} cm`
            : "-",
        type: "text",
      },
      {
        key: "weightKg",
        label: "Peso",
        getValue: (p) =>
          isGeladeira(p) ? `${p.specs.specs.weightKg} kg` : "-",
        type: "text",
      },
    ],
  },
  {
    id: "technology",
    title: "Tecnologia",
    specs: [
      {
        key: "defrostType",
        label: "Degelo",
        getValue: (p) => (isGeladeira(p) ? p.specs.specs.defrostType : "-"),
        type: "text",
      },
      {
        key: "inverter",
        label: "Inverter",
        getValue: (p) => (isGeladeira(p) ? p.specs.specs.inverter : false),
        type: "boolean",
      },
      {
        key: "energyRating",
        label: "Eficiência Energética",
        getValue: (p) => (isGeladeira(p) ? p.specs.specs.energyRating : "-"),
        type: "text",
      },
      {
        key: "wifi",
        label: "Wi-Fi",
        getValue: (p) => (isGeladeira(p) ? p.specs.specs.wifi : false),
        type: "boolean",
      },
    ],
  },
  {
    id: "features",
    title: "Recursos",
    specs: [
      {
        key: "doorAlarm",
        label: "Alarme porta aberta",
        getValue: (p) => (isGeladeira(p) ? p.specs.specs.doorAlarm : false),
        type: "boolean",
      },
      {
        key: "waterDispenser",
        label: "Dispensador de água",
        getValue: (p) =>
          isGeladeira(p) ? p.specs.specs.waterDispenser : false,
        type: "boolean",
      },
      {
        key: "iceMaker",
        label: "Fabricador de gelo",
        getValue: (p) => (isGeladeira(p) ? p.specs.specs.iceMaker : false),
        type: "boolean",
      },
      {
        key: "fastFreeze",
        label: "Congelação rápida",
        getValue: (p) => (isGeladeira(p) ? p.specs.specs.fastFreeze : false),
        type: "boolean",
      },
    ],
  },
];
```

## Exemplo Produto Object JSON de Smartwatch

```json
{
  "id": "bettdow-fb041",
  "name": "FB041",
  "brand": "Bettdow",
  "line": null,
  "model": "FB041",
  "detailedModel": "FB041",
  "color": "Preto",
  "image": "https://http2.mlstatic.com/D_NQ_NP_2X_809540-MLA100744664393_122025-F.webp",
  "price": 0,
  "releaseDate": "2024",
  "releaseMonth": null,
  "releaseYear": 2024,
  "origin": null,
  "category": "smartwatches",
  "anatelNumber": null,
  "mercadolivreUrl": "https://mercadolivre.com/sec/15ZHMfu",
  "specs": {
    "display": {
      "size": "1,83\"",
      "resolution": null,
      "type": "TFT LCD",
      "alwaysOn": true
    },
    "processor": null,
    "ram": "128 MB",
    "storage": "128 MB",
    "os": null,
    "compatibility": "Android 6.0+, iOS 12.0+",
    "batteryLife": "5-7 dias (uso normal), até 30 dias (standby)",
    "waterResistance": "3ATM",
    "waterResistanceDepth": "50 metros",
    "dimensions": null,
    "weight": null,
    "case": {
      "size": "3 mm",
      "material": "TFT",
      "color": "Preto"
    },
    "bezel": {
      "material": "TFT",
      "color": "Preto"
    },
    "strap": {
      "material": "PU",
      "color": "Preto",
      "type": "Esportiva"
    },
    "sensors": {
      "heartRate": true,
      "spo2": true,
      "gps": true,
      "altimeter": false,
      "compass": false,
      "accelerometer": true,
      "gyroscope": false,
      "ecg": false,
      "temperature": false,
      "bloodPressure": false
    },
    "features": {
      "calls": true,
      "music": true,
      "nfc": false,
      "voiceAssistant": true,
      "sleepTracking": true,
      "stressMonitoring": true,
      "cameraControl": false,
      "calculator": false,
      "calendar": false,
      "findDevice": true,
      "chatGPT": false,
      "dynamicIsland": false,
      "sportsMode": true,
      "calorieTracking": true,
      "textReplies": true,
      "audioReplies": true
    },
    "connectivity": {
      "bluetooth": "5.3",
      "wifi": false,
      "cellular": false
    },
    "languages": [
      "Inglês",
      "Espanhol",
      "Alemão",
      "Francês",
      "Italiano",
      "Japonês",
      "Português",
      "Russo"
    ],
    "accessories": ["Fio USB"],
    "isKids": false,
    "isSmartband": true,
    "version": null,
    "ratings": {
      "costBenefit": 8.5,
      "display": 7.0,
      "healthFeatures": 7.5,
      "battery": 7.0,
      "fitness": 7.0
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
"geladeiras": [
      {
        "name": "Frost Free Duplex 473L Inverter",
        "brand": "Midea",
        "detailedModel": "Frost Free Duplex 473L Inverter"
      },
      {
        "name": "MD-RT468MTA011",
        "brand": "Midea",
        "detailedModel": ""
      },
      {
        "name": "MD-RT650EVK013",
        "brand": "Midea",
        "detailedModel": ""
      },
      {
        "name": "DFX41",
        "brand": "Electrolux",
        "detailedModel": ""
      },
      {
        "name": "RE31",
        "brand": "Electrolux",
        "detailedModel": ""
      },
      {
        "name": "CRD37",
        "brand": "Consul",
        "detailedModel": "CRD37EBANA"
      },
      {
        "name": "BRM44H",
        "brand": "Brastemp",
        "detailedModel": "BRM44HKANA"
      },
      {
        "name": "MD-RT611EVKDX3",
        "brand": "Midea",
        "detailedModel": "MD-RT611EVKDX3"
      },
      {
        "name": "TF38S",
        "brand": "Electrolux",
        "detailedModel": "TF38S"
      },
      {
        "name": "DC35",
        "brand": "Electrolux",
        "detailedModel": "DC35A"
      }
    ],
```

- Se eu passar dados de um item já cadastrado antes, ou que você já mandou os dados, pare o processo e me pergunte se eu quero continuar mesmo assim.
