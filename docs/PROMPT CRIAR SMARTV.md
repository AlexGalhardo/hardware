# Contexto

- Site: <https://tudohardware.com>
- Os dados dos produtos são salvos em formato JSON

## Tipagem do objeto JSON que você vai criar

```ts
import { SpecSection } from "../spec-configs";
import { BaseProduct, Product } from "../types";

export interface Smartv extends BaseProduct {
  category: "smart-tvs";
  specs: SmartvSpecs;
}

export const SMARTV_CATEGORY = "smart-tvs" as const;

function isSmartv(product: Product): product is Smartv {
  return product.category === SMARTV_CATEGORY;
}

function getSmartv(p: Product): SmartvSpecs | null {
  return isSmartv(p) ? p.specs : null;
}

export interface SmartvSpecs {
  screen: {
    sizeInches: number;
    resolution: "HD" | "Full HD" | "4K" | "8K";
    panelType: "LED" | "QLED" | "OLED" | "Mini LED";
    hdr?: boolean;
    refreshRateHz?: number;
    brightnessNits?: number;
    contrastRatio?: number;
    responseTimeMs?: number;
    viewingAngleDegrees?: number;
    aspectRatio?: string;
  };

  system: {
    os: string;
    apps?: string[];
    voiceAssistant?: string;
    isSmart: true;
    storageGb?: number;
    processorCores?: number;
    screenShare?: boolean;
  };

  audio: {
    speakers?: number;
    powerWatts?: number;
    dolbyAudio?: boolean;
    surround?: boolean;
  };

  connectivity: {
    wifi: boolean;
    bluetooth?: boolean;
    ethernet?: boolean;
  };

  ports: {
    hdmi: number;
    usb?: number;
    spdif?: boolean;
    component?: boolean;
    composite?: boolean;
    rfAntenna?: boolean;
    vga?: boolean;
  };

  design?: {
    vesa?: boolean;
    widthCm?: number;
    heightCm?: number;
    depthCm?: number;
    weightKg?: number;
    cableManagement?: boolean;
  };

  energy?: {
    energyEfficiencyClass?: string;
    inmetroCertification?: string;
  };

  ratings: {
    costBenefit: number | null;
    imageQuality: number;
    soundQuality: number;
    systemSpeed: number;
    connectivity: number;
  };
}

export const smartvSpecs: SpecSection[] = [
  {
    id: "ratings",
    title: "Notas",
    specs: [
      {
        key: "costBenefit",
        label: "Custo-benefício",
        getValue: (p) => getSmartv(p)?.ratings.costBenefit ?? null,
        type: "rating",
      },
      {
        key: "imageQuality",
        label: "Qualidade de Imagem",
        getValue: (p) => getSmartv(p)?.ratings.imageQuality ?? null,
        type: "rating",
      },
      {
        key: "soundQuality",
        label: "Som",
        getValue: (p) => getSmartv(p)?.ratings.soundQuality ?? null,
        type: "rating",
      },
      {
        key: "systemSpeed",
        label: "Sistema/Fluidez",
        getValue: (p) => getSmartv(p)?.ratings.systemSpeed ?? null,
        type: "rating",
      },
      {
        key: "connectivity",
        label: "Conectividade",
        getValue: (p) => getSmartv(p)?.ratings.connectivity ?? null,
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
    ],
  },

  {
    id: "energy",
    title: "Energia & Certificação",
    specs: [
      {
        key: "energyEfficiencyClass",
        label: "Eficiência Energética",
        getValue: (p) => getSmartv(p)?.energy?.energyEfficiencyClass ?? "-",
        type: "text",
      },
      {
        key: "inmetroCertification",
        label: "Registro INMETRO",
        getValue: (p) => getSmartv(p)?.energy?.inmetroCertification ?? "-",
        type: "text",
      },
    ],
  },

  {
    id: "screen",
    title: "Tela",
    specs: [
      {
        key: "sizeInches",
        label: "Tamanho",
        getValue: (p) =>
          getSmartv(p) ? `${getSmartv(p)!.screen.sizeInches}"` : "-",
        type: "text",
      },
      {
        key: "resolution",
        label: "Resolução",
        getValue: (p) => getSmartv(p)?.screen.resolution ?? "-",
        type: "text",
      },
      {
        key: "panelType",
        label: "Painel",
        getValue: (p) => getSmartv(p)?.screen.panelType ?? "-",
        type: "text",
      },
      {
        key: "hdr",
        label: "HDR",
        getValue: (p) => getSmartv(p)?.screen.hdr ?? false,
        type: "boolean",
      },
      {
        key: "refreshRateHz",
        label: "Taxa",
        getValue: (p) =>
          getSmartv(p)?.screen.refreshRateHz != null
            ? `${getSmartv(p)!.screen.refreshRateHz} Hz`
            : "-",
        type: "text",
      },
    ],
  },

  {
    id: "audio",
    title: "Áudio",
    specs: [
      {
        key: "speakers",
        label: "Caixas",
        getValue: (p) => getSmartv(p)?.audio.speakers ?? "-",
        type: "text",
      },
      {
        key: "powerWatts",
        label: "Potência",
        getValue: (p) =>
          getSmartv(p)?.audio.powerWatts != null
            ? `${getSmartv(p)!.audio.powerWatts} W`
            : "-",
        type: "text",
      },
      {
        key: "dolbyAudio",
        label: "Dolby",
        getValue: (p) => getSmartv(p)?.audio.dolbyAudio ?? false,
        type: "boolean",
      },
      {
        key: "surround",
        label: "Surround",
        getValue: (p) => getSmartv(p)?.audio.surround ?? false,
        type: "boolean",
      },
    ],
  },

  {
    id: "ports",
    title: "Portas",
    specs: [
      {
        key: "hdmi",
        label: "HDMI",
        getValue: (p) => getSmartv(p)?.ports.hdmi ?? "-",
        type: "text",
      },
      {
        key: "usb",
        label: "USB",
        getValue: (p) => getSmartv(p)?.ports.usb ?? "-",
        type: "text",
      },
      {
        key: "component",
        label: "Componente",
        getValue: (p) => getSmartv(p)?.ports.component ?? false,
        type: "boolean",
      },
      {
        key: "composite",
        label: "Composto",
        getValue: (p) => getSmartv(p)?.ports.composite ?? false,
        type: "boolean",
      },
      {
        key: "rfAntenna",
        label: "Antena RF",
        getValue: (p) => getSmartv(p)?.ports.rfAntenna ?? false,
        type: "boolean",
      },
      {
        key: "vga",
        label: "VGA",
        getValue: (p) => getSmartv(p)?.ports.vga ?? false,
        type: "boolean",
      },
    ],
  },

  {
    id: "design",
    title: "Dimensões",
    specs: [
      {
        key: "widthCm",
        label: "Largura",
        getValue: (p) =>
          getSmartv(p)?.design?.widthCm != null
            ? `${getSmartv(p)!.design!.widthCm} cm`
            : "-",
        type: "text",
      },
      {
        key: "heightCm",
        label: "Altura",
        getValue: (p) =>
          getSmartv(p)?.design?.heightCm != null
            ? `${getSmartv(p)!.design!.heightCm} cm`
            : "-",
        type: "text",
      },
      {
        key: "depthCm",
        label: "Profundidade",
        getValue: (p) =>
          getSmartv(p)?.design?.depthCm != null
            ? `${getSmartv(p)!.design!.depthCm} cm`
            : "-",
        type: "text",
      },
      {
        key: "weightKg",
        label: "Peso",
        getValue: (p) =>
          getSmartv(p)?.design?.weightKg != null
            ? `${getSmartv(p)!.design!.weightKg} kg`
            : "-",
        type: "text",
      },
      {
        key: "vesa",
        label: "VESA",
        getValue: (p) => getSmartv(p)?.design?.vesa ?? false,
        type: "boolean",
      },
    ],
  },
];
```

## Exemplo Produto Object JSON de Smart TV que você deve criar

```json
{
  "id": "philco-p32vik-32",
  "name": "P32VIK",
  "brand": "Philco",
  "line": "Smart TV",
  "model": "P32VIK",
  "detailedModel": null,
  "color": "Preto",
  "image": "https://http2.mlstatic.com/D_NQ_NP_2X_691057-MLA100479527690_122025-F.webp",
  "price": 817.88,
  "releaseDate": "2025-11-15",
  "releaseMonth": 11,
  "releaseYear": 2025,
  "origin": "BR",
  "category": "smart-tvs",
  "anatelNumber": null,
  "mercadolivreUrl": "https://mercadolivre.com/sec/1L5Efi6",
  "amazonUrl": null,
  "shopeeUrl": null,
  "alphanumericModel": "P32VIK",
  "version": "Roku",
  "manufacturer": "Philco",
  "specs": {
    "screen": {
      "sizeInches": 32,
      "resolution": "HD",
      "panelType": "LED",
      "hdr": true,
      "refreshRateHz": 60,
      "brightnessNits": 250,
      "contrastRatio": 3000,
      "responseTimeMs": 8,
      "viewingAngleDegrees": 170,
      "aspectRatio": "16:9"
    },
    "system": {
      "os": "Roku TV",
      "apps": ["Netflix", "Prime Video", "YouTube", "Disney+", "GloboPlay"],
      "voiceAssistant": "Google Assistant / Alexa",
      "isSmart": true,
      "storageGb": 8,
      "processorCores": 4,
      "screenShare": true
    },
    "audio": {
      "speakers": 2,
      "powerWatts": 16,
      "dolbyAudio": true,
      "surround": false
    },
    "connectivity": {
      "wifi": true,
      "bluetooth": false,
      "ethernet": true,
      "spdif": true
    },
    "ports": {
      "hdmi": 2,
      "usb": 2,
      "component": false,
      "composite": false,
      "rfAntenna": true,
      "vga": false
    },
    "design": {
      "vesa": true,
      "widthCm": 72,
      "heightCm": 46.5,
      "depthCm": 18,
      "weightKg": 5.0,
      "cableManagement": false
    },
    "energy": {
      "energyEfficiencyClass": "A",
      "inmetroCertification": "000403/2018"
    },
    "ratings": {
      "costBenefit": 4.3,
      "imageQuality": 4.0,
      "soundQuality": 3.8,
      "systemSpeed": 4.2,
      "connectivity": 4.1
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
"smartvs": [
      {
        "name": "P58KGA",
        "brand": "Philco",
        "detailedModel": "P58KGA",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_922530-MLA99453302308_112025-F.webp"
      },
      {
        "name": "P32VIK",
        "brand": "Philco",
        "detailedModel": "P32VIK",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_691057-MLA100479527690_122025-F.webp"
      },
      {
        "name": "43LR671C-B",
        "brand": "LG",
        "detailedModel": "43LR671C0SA.AWZ",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_929244-MLA104540336039_012026-F.webp"
      },
      {
        "name": "32WDSNMX",
        "brand": "Weyon",
        "detailedModel": "32WDSNMX",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_824259-MLA99939289013_112025-F.webp"
      },
      {
        "name": "75C7K",
        "brand": "TCL",
        "detailedModel": "75C7K",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_782739-MLA103359617310_012026-F.webp"
      },
      {
        "name": "UN43F6000FGXZD",
        "brand": "Samsung",
        "detailedModel": "F6000F",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_668133-MLA99998133323_112025-F.webp"
      },
      {
        "name": "55NANO80ASA",
        "brand": "LG",
        "detailedModel": "55NANO80ASA",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_925791-MLA99949981259_112025-F.webp"
      },
      {
        "name": "QN55QN70FAGXZD",
        "brand": "Samsung",
        "detailedModel": "QN70F",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_962799-MLA94529301574_102025-F.webp"
      },
      {
        "name": "PTV50VA4REGB",
        "brand": "Philco",
        "detailedModel": "PTV50VA4REGB",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_764025-MLA99481366708_112025-F.webp"
      },
      {
        "name": "LH55BEFH4GGXZD",
        "brand": "Samsung",
        "detailedModel": "LH55BEFH4GGXZD",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_807592-MLA96970001108_112025-F.webp"
      },
      {
        "name": "LH65BEFH4GGXZD",
        "brand": "Samsung",
        "detailedModel": "LH65BEFH4GGXZD",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_712967-MLA96969981644_112025-F.webp"
      },
      {
        "name": "32WDSNMX",
        "brand": "Weyon",
        "detailedModel": "32WDSNMX",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_824259-MLA99939289013_112025-F.webp"
      },
      {
        "name": "40S5K",
        "brand": "TCL",
        "detailedModel": "40S5K",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_960083-MLA103757070263_012026-F.webp"
      },
      {
        "name": "AWS-TV-50-BL-02-A",
        "brand": "Aiwa",
        "detailedModel": "AWS-TV-50-BL-02-A",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_768600-MLA99887667399_112025-F.webp"
      },
      {
        "name": "UN43U8100FGXZD",
        "brand": "Samsung",
        "detailedModel": "U8100F",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_648933-MLA99498284868_112025-F.webp"
      },
      {
        "name": "32LR600BPSA",
        "brand": "LG",
        "detailedModel": "32LR600BPSA",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_934018-MLA99576753908_122025-F.webp"
      },
      {
        "name": "70PUG7019/78",
        "brand": "Philips",
        "detailedModel": "70PUG7019/78",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_974454-MLA99928210341_112025-F.webp"
      },
      {
        "name": "43AU801C0SA",
        "brand": "LG",
        "detailedModel": "43AU801C0SA",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_663736-MLA101387825184_122025-F.webp"
      },
      {
        "name": "50P7K",
        "brand": "TCL",
        "detailedModel": "50P7K",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_629030-MLA103240702876-012026-F.webp"
      },
      {
        "name": "LS43F6000FGXZD",
        "brand": "Samsung",
        "detailedModel": "LS43F6000FGXZD",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_850374-MLA103344560695_012026-F.webp"
      }
    ]
```
Se eu passar dados de um item já cadastrado antes, ou que você já mandou os dados, pare o processo e me pergunte se eu quero continuar mesmo assim.