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
}

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  nameEn: string;
  icon: string;
  description: string;
  total?: number;
}

export interface SmartwatchSpecs {
  display: {
    size: string;
    resolution?: string;
    type: string;
    alwaysOn?: boolean;
  };
  processor?: string;
  ram: string;
  storage: string;
  os?: string;
  compatibility: string;
  batteryLife: string;
  waterResistance: string;
  waterResistanceDepth?: string;
  dimensions?: string;
  weight?: string;
  case: {
    size: string;
    material: string;
    color?: string;
  };
  bezel: {
    material: string;
    color?: string;
  };
  strap: {
    material: string;
    color?: string;
    type: string;
  };
  sensors: {
    heartRate: boolean;
    spo2: boolean;
    gps: boolean;
    altimeter?: boolean;
    compass?: boolean;
    accelerometer?: boolean;
    gyroscope?: boolean;
    ecg: boolean;
    temperature?: boolean;
    bloodPressure?: boolean;
  };
  features: {
    calls: boolean;
    music: boolean;
    nfc: boolean;
    voiceAssistant: boolean;
    sleepTracking: boolean;
    stressMonitoring?: boolean;
    cameraControl?: boolean;
    calculator?: boolean;
    calendar?: boolean;
    findDevice?: boolean;
    chatGPT?: boolean;
    dynamicIsland?: boolean;
    sportsMode?: boolean;
    calorieTracking?: boolean;
    textReplies?: boolean;
    audioReplies?: boolean;
  };
  connectivity: {
    bluetooth: string;
    wifi: boolean;
    cellular: boolean;
  };
  languages?: string[];
  accessories?: string[];
  isKids?: boolean;
  isSmartband?: boolean;
  version?: string;
  ratings: {
    costBenefit: number | null;
    display: number;
    healthFeatures: number;
    battery: number;
    fitness: number;
  };
}

export interface Smartwatch extends BaseProduct {
  category: "smartwatches";
  specs: SmartwatchSpecs;
}
```

```ts
const smartwatchSpecs: SpecSection[] = [
  {
    id: "ratings",
    title: "Notas",
    specs: [
      {
        key: "costBenefit",
        label: "Custo-benefício",
        getValue: (p) => (isSmartwatch(p) ? p.specs.ratings.costBenefit : null),
        type: "rating",
      },
      {
        key: "display",
        label: "Tela",
        getValue: (p) => (isSmartwatch(p) ? p.specs.ratings.display : null),
        type: "rating",
      },
      {
        key: "healthFeatures",
        label: "Recursos de Saúde",
        getValue: (p) =>
          isSmartwatch(p) ? p.specs.ratings.healthFeatures : null,
        type: "rating",
      },
      {
        key: "battery",
        label: "Bateria",
        getValue: (p) => (isSmartwatch(p) ? p.specs.ratings.battery : null),
        type: "rating",
      },
      {
        key: "fitness",
        label: "Fitness",
        getValue: (p) => (isSmartwatch(p) ? p.specs.ratings.fitness : null),
        type: "rating",
      },
    ],
  },
  {
    id: "display",
    title: "Tela",
    specs: [
      {
        key: "displaySize",
        label: "Tamanho",
        getValue: (p) => (isSmartwatch(p) ? p.specs.display.size : "-"),
        type: "text",
      },
      {
        key: "displayType",
        label: "Tipo",
        getValue: (p) => (isSmartwatch(p) ? p.specs.display.type : "-"),
        type: "text",
      },
      {
        key: "displayResolution",
        label: "Resolução",
        getValue: (p) =>
          isSmartwatch(p) ? p.specs.display.resolution || "-" : "-",
        type: "text",
      },
      {
        key: "alwaysOn",
        label: "Always On",
        getValue: (p) =>
          isSmartwatch(p) ? p.specs.display.alwaysOn || false : false,
        type: "boolean",
      },
    ],
  },
  {
    id: "case",
    title: "Caixa",
    specs: [
      {
        key: "caseSize",
        label: "Tamanho",
        getValue: (p) => (isSmartwatch(p) ? p.specs.case.size : "-"),
        type: "text",
      },
      {
        key: "caseMaterial",
        label: "Material",
        getValue: (p) => (isSmartwatch(p) ? p.specs.case.material : "-"),
        type: "text",
      },
      {
        key: "caseColor",
        label: "Cor",
        getValue: (p) => (isSmartwatch(p) ? p.specs.case.color || "-" : "-"),
        type: "text",
      },
    ],
  },
  {
    id: "bezel",
    title: "Bisel",
    specs: [
      {
        key: "bezelMaterial",
        label: "Material",
        getValue: (p) => (isSmartwatch(p) ? p.specs.bezel.material : "-"),
        type: "text",
      },
      {
        key: "bezelColor",
        label: "Cor",
        getValue: (p) => (isSmartwatch(p) ? p.specs.bezel.color || "-" : "-"),
        type: "text",
      },
    ],
  },
  {
    id: "strap",
    title: "Pulseira",
    specs: [
      {
        key: "strapMaterial",
        label: "Material",
        getValue: (p) => (isSmartwatch(p) ? p.specs.strap.material : "-"),
        type: "text",
      },
      {
        key: "strapType",
        label: "Tipo",
        getValue: (p) => (isSmartwatch(p) ? p.specs.strap.type : "-"),
        type: "text",
      },
      {
        key: "strapColor",
        label: "Cor",
        getValue: (p) => (isSmartwatch(p) ? p.specs.strap.color || "-" : "-"),
        type: "text",
      },
    ],
  },
  {
    id: "sensors",
    title: "Sensores",
    specs: [
      {
        key: "heartRate",
        label: "Frequência Cardíaca",
        getValue: (p) => (isSmartwatch(p) ? p.specs.sensors.heartRate : false),
        type: "boolean",
      },
      {
        key: "spo2",
        label: "SpO2",
        getValue: (p) => (isSmartwatch(p) ? p.specs.sensors.spo2 : false),
        type: "boolean",
      },
      {
        key: "bloodPressure",
        label: "Pressão Arterial",
        getValue: (p) =>
          isSmartwatch(p) ? p.specs.sensors.bloodPressure || false : false,
        type: "boolean",
      },
      {
        key: "gps",
        label: "GPS",
        getValue: (p) => (isSmartwatch(p) ? p.specs.sensors.gps : false),
        type: "boolean",
      },
      {
        key: "ecg",
        label: "ECG",
        getValue: (p) => (isSmartwatch(p) ? p.specs.sensors.ecg : false),
        type: "boolean",
      },
      {
        key: "temperature",
        label: "Temperatura",
        getValue: (p) =>
          isSmartwatch(p) ? p.specs.sensors.temperature || false : false,
        type: "boolean",
      },
      {
        key: "compass",
        label: "Bússola",
        getValue: (p) =>
          isSmartwatch(p) ? p.specs.sensors.compass || false : false,
        type: "boolean",
      },
    ],
  },
  {
    id: "memory",
    title: "Memória",
    specs: [
      {
        key: "ram",
        label: "RAM",
        getValue: (p) => (isSmartwatch(p) ? p.specs.ram : "-"),
        type: "text",
      },
      {
        key: "storage",
        label: "Armazenamento",
        getValue: (p) => (isSmartwatch(p) ? p.specs.storage : "-"),
        type: "text",
      },
    ],
  },
  {
    id: "battery",
    title: "Bateria",
    specs: [
      {
        key: "batteryLife",
        label: "Duração",
        getValue: (p) => (isSmartwatch(p) ? p.specs.batteryLife : "-"),
        type: "text",
      },
    ],
  },
  {
    id: "waterResistance",
    title: "Resistência à Água",
    specs: [
      {
        key: "waterResistance",
        label: "Resistente à Água",
        getValue: (p) => (isSmartwatch(p) ? p.specs.waterResistance : "-"),
        type: "text",
      },
      {
        key: "waterResistanceDepth",
        label: "Profundidade Máxima",
        getValue: (p) =>
          isSmartwatch(p) ? p.specs.waterResistanceDepth || "-" : "-",
        type: "text",
      },
    ],
  },
  {
    id: "features",
    title: "Recursos",
    specs: [
      {
        key: "calls",
        label: "Chamadas",
        getValue: (p) => (isSmartwatch(p) ? p.specs.features.calls : false),
        type: "boolean",
      },
      {
        key: "music",
        label: "Música",
        getValue: (p) => (isSmartwatch(p) ? p.specs.features.music : false),
        type: "boolean",
      },
      {
        key: "nfc",
        label: "NFC",
        getValue: (p) => (isSmartwatch(p) ? p.specs.features.nfc : false),
        type: "boolean",
      },
      {
        key: "voiceAssistant",
        label: "Assistente de Voz",
        getValue: (p) =>
          isSmartwatch(p) ? p.specs.features.voiceAssistant : false,
        type: "boolean",
      },
      {
        key: "sleepTracking",
        label: "Monitoramento de Sono",
        getValue: (p) =>
          isSmartwatch(p) ? p.specs.features.sleepTracking : false,
        type: "boolean",
      },
      {
        key: "sportsMode",
        label: "Modo Esportivo",
        getValue: (p) =>
          isSmartwatch(p) ? p.specs.features.sportsMode || false : false,
        type: "boolean",
      },
      {
        key: "calorieTracking",
        label: "Monitoramento de Calorias",
        getValue: (p) =>
          isSmartwatch(p) ? p.specs.features.calorieTracking || false : false,
        type: "boolean",
      },
      {
        key: "audioReplies",
        label: "Respostas por Áudio",
        getValue: (p) =>
          isSmartwatch(p) ? p.specs.features.audioReplies || false : false,
        type: "boolean",
      },
      {
        key: "textReplies",
        label: "Respostas por Texto",
        getValue: (p) =>
          isSmartwatch(p) ? p.specs.features.textReplies || false : false,
        type: "boolean",
      },
      {
        key: "cameraControl",
        label: "Controle de Câmera",
        getValue: (p) =>
          isSmartwatch(p) ? p.specs.features.cameraControl || false : false,
        type: "boolean",
      },
      {
        key: "calculator",
        label: "Calculadora",
        getValue: (p) =>
          isSmartwatch(p) ? p.specs.features.calculator || false : false,
        type: "boolean",
      },
      {
        key: "calendar",
        label: "Calendário",
        getValue: (p) =>
          isSmartwatch(p) ? p.specs.features.calendar || false : false,
        type: "boolean",
      },
      {
        key: "findDevice",
        label: "Encontrar Dispositivo",
        getValue: (p) =>
          isSmartwatch(p) ? p.specs.features.findDevice || false : false,
        type: "boolean",
      },
      {
        key: "chatGPT",
        label: "ChatGPT",
        getValue: (p) =>
          isSmartwatch(p) ? p.specs.features.chatGPT || false : false,
        type: "boolean",
      },
      {
        key: "dynamicIsland",
        label: "Ilha Dinâmica",
        getValue: (p) =>
          isSmartwatch(p) ? p.specs.features.dynamicIsland || false : false,
        type: "boolean",
      },
    ],
  },
  {
    id: "connectivity",
    title: "Conectividade",
    specs: [
      {
        key: "bluetooth",
        label: "Bluetooth",
        getValue: (p) =>
          isSmartwatch(p) ? p.specs.connectivity.bluetooth : "-",
        type: "text",
      },
      {
        key: "wifi",
        label: "Wi-Fi",
        getValue: (p) => (isSmartwatch(p) ? p.specs.connectivity.wifi : false),
        type: "boolean",
      },
      {
        key: "cellular",
        label: "Rede Móvel",
        getValue: (p) =>
          isSmartwatch(p) ? p.specs.connectivity.cellular : false,
        type: "boolean",
      },
    ],
  },
  {
    id: "compatibility",
    title: "Compatibilidade",
    specs: [
      {
        key: "compatibility",
        label: "Sistemas Compatíveis",
        getValue: (p) => (isSmartwatch(p) ? p.specs.compatibility : "-"),
        type: "text",
      },
      {
        key: "os",
        label: "Sistema Operacional",
        getValue: (p) => (isSmartwatch(p) ? p.specs.os || "-" : "-"),
        type: "text",
      },
    ],
  },
  {
    id: "other",
    title: "Outros",
    specs: [
      {
        key: "version",
        label: "Versão",
        getValue: (p) => (isSmartwatch(p) ? p.specs.version || "-" : "-"),
        type: "text",
      },
      {
        key: "isKids",
        label: "Infantil",
        getValue: (p) => (isSmartwatch(p) ? p.specs.isKids || false : false),
        type: "boolean",
      },
      {
        key: "isSmartband",
        label: "Smartband",
        getValue: (p) =>
          isSmartwatch(p) ? p.specs.isSmartband || false : false,
        type: "boolean",
      },
      {
        key: "languages",
        label: "Idiomas",
        getValue: (p) =>
          isSmartwatch(p) && p.specs.languages
            ? p.specs.languages.join(", ")
            : "-",
        type: "text",
      },
      {
        key: "accessories",
        label: "Acessórios Incluídos",
        getValue: (p) =>
          isSmartwatch(p) && p.specs.accessories
            ? p.specs.accessories.join(", ")
            : "-",
        type: "text",
      },
    ],
  },
];
```

## Exemplo Produto Object JSON de Smartwatch que você deve fazer

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
"smartwatches": [
      {
        "name": "FB041",
        "brand": "Bettdow",
        "detailedModel": "FB041",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_809540-MLA100744664393_122025-F.webp"
      },
      {
        "name": "FB041 Branco",
        "brand": "Bettdow",
        "detailedModel": "FB041",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_935772-MLA100259540334_122025-F.webp"
      },
      {
        "name": "W38 Pro Max",
        "brand": "Bazik Prime",
        "detailedModel": "W38 PRO MAX",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_967957-MLA96081858217_102025-F.webp"
      },
      {
        "name": "W11 Mini Pro Série 11",
        "brand": "Microwear",
        "detailedModel": "W11 Mini Pro",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_942554-MLB90644968082_082025-F-relogio-smartwatch-w11-mini-pro-serie-11-amoled-lancamento.webp"
      },
      {
        "name": "Galaxy Fit3",
        "brand": "Samsung",
        "detailedModel": "SM-R390",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_873980-MLA99983291435_112025-F.webp"
      },
      {
        "name": "Watch GT 6 Pro",
        "brand": "Huawei",
        "detailedModel": "Atum-B29F",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_681278-MLA103632118572_012026-F.webp"
      },
      {
        "name": "FB050",
        "brand": "Bettdow",
        "detailedModel": "FB050",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_901887-MLB100826193785_122025-F-relogio-smartwatch-bettdow-fb050-amoled-esportivo-gps-143.webp"
      },
      {
        "name": "T-Rex 3",
        "brand": "Amazfit",
        "detailedModel": "A2323",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_847859-MLA99522543972_122025-F.webp"
      },
      {
        "name": "Band 10",
        "brand": "Huawei",
        "detailedModel": "Band 10",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_772291-MLA100008466405_122025-F.webp"
      },
      {
        "name": "Watch Series 11",
        "brand": "Apple",
        "detailedModel": "GPS 42mm",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_932535-MLA95405131986_102025-F.webp"
      },
      {
        "name": "Watch Series 10",
        "brand": "Apple",
        "detailedModel": "MWWR3AM/A",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_654997-MLA100007935361_122025-F.webp"
      },
      {
        "name": "Watch Ultra 2",
        "brand": "Apple",
        "detailedModel": "A2986",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_876023-MLA99470593296_112025-F.webp"
      },
      {
        "name": "Redmi Watch 5 Active",
        "brand": "Xiaomi",
        "detailedModel": "M2351W1",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_949046-MLA99507276886_112025-F.webp"
      },
      {
        "name": "Watch SE 2 40mm",
        "brand": "Apple",
        "detailedModel": "A2722",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_928374-MLB92696421383_092025-F.webp"
      },
      {
        "name": "Watch SE 2 44mm",
        "brand": "Apple",
        "detailedModel": "MXEJ3BE/A",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_639565-MLA99950758341_112025-F.webp"
      },
      {
        "name": "Watch Ultra 3",
        "brand": "Apple",
        "detailedModel": "GPS + Cellular",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_742347-MLA99449599322_112025-F.webp"
      },
      {
        "name": "Watch Series 10 GPS",
        "brand": "Apple",
        "detailedModel": "MWWR3AM/A",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_883127-MLA99931781729_112025-F.webp"
      },
      {
        "name": "Watch SE 2",
        "brand": "Apple",
        "detailedModel": "GPS 40mm",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_985490-MLA99882162843_112025-F.webp"
      },
      {
        "name": "Watch Series 11",
        "brand": "Apple",
        "detailedModel": "GPS 42mm",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_797507-MLA95397349140_102025-F.webp"
      }
    ]
```
Se eu passar dados de um item já cadastrado antes, ou que você já mandou os dados, pare o processo e me pergunte se eu quero continuar mesmo assim.