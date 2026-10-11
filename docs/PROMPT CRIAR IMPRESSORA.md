# Contexto

- Site: <https://tudohardware.com>
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

function isImpressora(product: BaseProduct): product is Impressora {
  return product.category === "impressoras";
}

export interface Impressora extends BaseProduct {
  category: "impressoras";
  specs: ImpressoraSpecs;
}

function getImpressora(p: Product): ImpressoraSpecs | null {
  if (isImpressora(p)) {
    return p.specs;
  }
  return null;
}

export interface ImpressoraSpecs {
  manufacturer:
    | "HP"
    | "Epson"
    | "Canon"
    | "Brother"
    | "Samsung"
    | "Xerox"
    | "Lexmark"
    | "Ricoh"
    | "Kyocera"
    | "Outros";
  type: "Multifuncional" | "Impressora" | "Copiadora" | "Scanner";
  printingTechnology:
    | "Jato de tinta"
    | "Laser"
    | "Térmica"
    | "Matricial"
    | "Sublimação"
    | "Tanque de tinta";
  printType: "Cor" | "Monocromática" | "Preto e branco";
  functions: ("Impressão" | "Cópia" | "Digitalização" | "Fax")[];

  connectivity: {
    wifi?: boolean;
    bluetooth?: boolean;
    ethernet?: boolean;
    usb?: boolean;
    nfc?: boolean;
    mobileConnections?: string[]; // Wi-Fi Direct, AirPrint, Mopria
    usbType?: string; // USB 2.0, USB 3.0
    ethernetSpeed?: string; // 10/100 Mbps, Gigabit
  };

  printing: {
    maxResolutionBlackWhite?: string; // dpi
    maxResolutionColor?: string; // dpi
    maxSpeedBlackWhite?: number; // ppm (páginas por minuto)
    maxSpeedColor?: number; // ppm
    firstPageOut?: string; // tempo em segundos
    duplexPrinting?: "Automático" | "Manual" | "Não";
    monthlyCycle?: number; // páginas por mês
    recommendedVolume?: string; // páginas por mês
    languages?: string[]; // PCL, PostScript, PDF
  };

  paper: {
    types?: string[]; // A4, Carta, Legal, Fotográfico, Envelope
    sizes?: string[]; // A4, A5, A6, Carta, Ofício
    maxCapacity: number; // folhas
    trays: number;
    maxWeight?: number; // g/m²
    minWeight?: number; // g/m²
    customSizes?: boolean;
    borderlessPrinting?: boolean;
  };

  scanner?: {
    type?: "Flatbed" | "ADF" | "Duplex ADF" | "Flatbed + ADF";
    maxResolution?: string; // dpi
    scanSpeed?: string; // páginas por minuto
    adfCapacity?: number; // folhas
    scanArea?: string; // dimensões
    fileFormats?: string[]; // PDF, JPEG, TIFF, PNG
    colorDepth?: string; // bits
    duplexScanning?: boolean;
  };

  copier?: {
    maxCopies?: number;
    copySpeed?: string; // cpm (cópias por minuto)
    reduction?: string; // percentual
    enlargement?: string; // percentual
    idCopy?: boolean;
  };

  fax?: {
    speed?: string;
    memory?: string;
    resolution?: string;
    autoRedialing?: boolean;
    speedDial?: number;
  };

  ink: {
    cartridges: number;
    cartridgeType?: "Cartucho" | "Tanque de tinta" | "Toner";
    colors?: string[]; // Preto, Ciano, Magenta, Amarelo
    cartridgeYield?: {
      black?: string; // páginas
      color?: string; // páginas
    };
    tankSystem?: boolean;
    inkBottles?: string[];
  };

  display?: {
    hasDisplay: boolean;
    type?: "LCD" | "LED" | "Touchscreen" | "OLED";
    size?: string; // polegadas
    color?: boolean;
    touchscreen?: boolean;
    resolution?: string;
  };

  specifications: {
    portable?: boolean;
    processorSpeed?: string;
    memory?: string; // RAM
    storage?: string; // Memória interna
    energyEfficiency?: string; // A, B, C, etc.
    operatingSystem?: string;
    supportedOS?: string[]; // Windows, macOS, Linux, Android, iOS
  };

  power: {
    voltage?: string; // 110V, 220V, Bivolt
    powerConsumption?: string; // Watts
    standbyPower?: string; // Watts
    sleepMode?: boolean;
    autoShutoff?: boolean;
  };

  dimensions?: {
    height: string;
    width: string;
    depth: string;
    weight?: string;
  };

  environmental?: {
    energyStar?: boolean;
    ecoMode?: boolean;
    recyclable?: boolean;
    certifications?: string[]; // Energy Star, Blue Angel, EPEAT
  };

  security?: {
    passwordProtection?: boolean;
    encryption?: string[];
    secureErase?: boolean;
    pinPrinting?: boolean;
  };

  features: {
    cloudPrinting?: boolean;
    mobilePrinting?: boolean;
    automaticDocumentFeeder?: boolean;
    adfCapacity?: number;
    twoSidedId?: boolean;
    voiceActivated?: boolean;
    smartTasks?: boolean;
    colorDisplay?: boolean;
    quietMode?: boolean;
  };

  software?: {
    included?: string[];
    compatible?: string[];
    driverSupport?: string[];
    mobileApps?: string[];
  };

  bundled?: {
    cables?: string[];
    cartridges?: string[];
    software?: string[];
    accessories?: string[];
  };

  warranty?: {
    period: string;
    type?: string;
    support?: string;
  };

  ratings: {
    costBenefit: number | null;
    printQuality: number;
    speed: number;
    connectivity: number;
    reliability: number;
    features: number;
    costPerPage: number;
  };
}

export const impressoraSpecs: SpecSection[] = [
  {
    id: "ratings",
    title: "Notas",
    specs: [
      {
        key: "costBenefit",
        label: "Custo-benefício",
        getValue: (p) => getImpressora(p)?.ratings.costBenefit ?? null,
        type: "rating",
      },
      {
        key: "printQuality",
        label: "Qualidade de Impressão",
        getValue: (p) => getImpressora(p)?.ratings.printQuality ?? null,
        type: "rating",
      },
      {
        key: "speed",
        label: "Velocidade",
        getValue: (p) => getImpressora(p)?.ratings.speed ?? null,
        type: "rating",
      },
      {
        key: "connectivity",
        label: "Conectividade",
        getValue: (p) => getImpressora(p)?.ratings.connectivity ?? null,
        type: "rating",
      },
      {
        key: "reliability",
        label: "Confiabilidade",
        getValue: (p) => getImpressora(p)?.ratings.reliability ?? null,
        type: "rating",
      },
      {
        key: "features",
        label: "Recursos",
        getValue: (p) => getImpressora(p)?.ratings.features ?? null,
        type: "rating",
      },
      {
        key: "costPerPage",
        label: "Custo por Página",
        getValue: (p) => getImpressora(p)?.ratings.costPerPage ?? null,
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
        getValue: (p) => getImpressora(p)?.manufacturer ?? "-",
        type: "text",
      },
      {
        key: "type",
        label: "Tipo de Impressora",
        getValue: (p) => getImpressora(p)?.type ?? "-",
        type: "text",
      },
      {
        key: "printingTechnology",
        label: "Tecnologia de Impressão",
        getValue: (p) => getImpressora(p)?.printingTechnology ?? "-",
        type: "text",
      },
      {
        key: "printType",
        label: "Tipo de Impressão",
        getValue: (p) => getImpressora(p)?.printType ?? "-",
        type: "text",
      },
      {
        key: "functions",
        label: "Funções",
        getValue: (p) => getImpressora(p)?.functions?.join(", ") ?? "-",
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
    id: "connectivity",
    title: "Conectividade",
    specs: [
      {
        key: "wifi",
        label: "Wi-Fi",
        getValue: (p) => getImpressora(p)?.connectivity.wifi ?? false,
        type: "boolean",
      },
      {
        key: "bluetooth",
        label: "Bluetooth",
        getValue: (p) => getImpressora(p)?.connectivity.bluetooth ?? false,
        type: "boolean",
      },
      {
        key: "ethernet",
        label: "Ethernet",
        getValue: (p) => getImpressora(p)?.connectivity.ethernet ?? false,
        type: "boolean",
      },
      {
        key: "usb",
        label: "USB",
        getValue: (p) => getImpressora(p)?.connectivity.usb ?? false,
        type: "boolean",
      },
      {
        key: "nfc",
        label: "NFC",
        getValue: (p) => getImpressora(p)?.connectivity.nfc ?? false,
        type: "boolean",
      },
      {
        key: "mobileConnections",
        label: "Conexões Móveis",
        getValue: (p) =>
          getImpressora(p)?.connectivity.mobileConnections?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "usbType",
        label: "Tipo USB",
        getValue: (p) => getImpressora(p)?.connectivity.usbType ?? "-",
        type: "text",
      },
      {
        key: "ethernetSpeed",
        label: "Velocidade Ethernet",
        getValue: (p) => getImpressora(p)?.connectivity.ethernetSpeed ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "printing",
    title: "Impressão",
    specs: [
      {
        key: "maxResolutionBlackWhite",
        label: "Resolução Máxima P&B",
        getValue: (p) =>
          getImpressora(p)?.printing.maxResolutionBlackWhite ?? "-",
        type: "text",
      },
      {
        key: "maxResolutionColor",
        label: "Resolução Máxima Colorida",
        getValue: (p) => getImpressora(p)?.printing.maxResolutionColor ?? "-",
        type: "text",
      },
      {
        key: "maxSpeedBlackWhite",
        label: "Velocidade Máxima P&B (ppm)",
        getValue: (p) =>
          getImpressora(p)?.printing.maxSpeedBlackWhite?.toString() ?? "-",
        type: "text",
      },
      {
        key: "maxSpeedColor",
        label: "Velocidade Máxima Cor (ppm)",
        getValue: (p) =>
          getImpressora(p)?.printing.maxSpeedColor?.toString() ?? "-",
        type: "text",
      },
      {
        key: "firstPageOut",
        label: "Primeira Página",
        getValue: (p) => getImpressora(p)?.printing.firstPageOut ?? "-",
        type: "text",
      },
      {
        key: "duplexPrinting",
        label: "Impressão Duplex",
        getValue: (p) => getImpressora(p)?.printing.duplexPrinting ?? "-",
        type: "text",
      },
      {
        key: "monthlyCycle",
        label: "Ciclo Mensal (páginas)",
        getValue: (p) =>
          getImpressora(p)?.printing.monthlyCycle?.toString() ?? "-",
        type: "text",
      },
      {
        key: "recommendedVolume",
        label: "Volume Recomendado",
        getValue: (p) => getImpressora(p)?.printing.recommendedVolume ?? "-",
        type: "text",
      },
      {
        key: "languages",
        label: "Linguagens de Impressão",
        getValue: (p) =>
          getImpressora(p)?.printing.languages?.join(", ") ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "paper",
    title: "Papel",
    specs: [
      {
        key: "paperTypes",
        label: "Tipos de Papel",
        getValue: (p) => getImpressora(p)?.paper.types?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "paperSizes",
        label: "Tamanhos de Papel",
        getValue: (p) => getImpressora(p)?.paper.sizes?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "maxCapacity",
        label: "Capacidade Máxima (folhas)",
        getValue: (p) => getImpressora(p)?.paper.maxCapacity?.toString() ?? "-",
        type: "text",
      },
      {
        key: "trays",
        label: "Quantidade de Bandejas",
        getValue: (p) => getImpressora(p)?.paper.trays?.toString() ?? "-",
        type: "text",
      },
      {
        key: "maxWeight",
        label: "Gramatura Máxima (g/m²)",
        getValue: (p) => getImpressora(p)?.paper.maxWeight?.toString() ?? "-",
        type: "text",
      },
      {
        key: "minWeight",
        label: "Gramatura Mínima (g/m²)",
        getValue: (p) => getImpressora(p)?.paper.minWeight?.toString() ?? "-",
        type: "text",
      },
      {
        key: "customSizes",
        label: "Tamanhos Personalizados",
        getValue: (p) => getImpressora(p)?.paper.customSizes ?? false,
        type: "boolean",
      },
      {
        key: "borderlessPrinting",
        label: "Impressão sem Bordas",
        getValue: (p) => getImpressora(p)?.paper.borderlessPrinting ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "scanner",
    title: "Scanner",
    specs: [
      {
        key: "scannerType",
        label: "Tipo de Scanner",
        getValue: (p) => getImpressora(p)?.scanner?.type ?? "-",
        type: "text",
      },
      {
        key: "scannerResolution",
        label: "Resolução Máxima",
        getValue: (p) => getImpressora(p)?.scanner?.maxResolution ?? "-",
        type: "text",
      },
      {
        key: "scanSpeed",
        label: "Velocidade de Digitalização",
        getValue: (p) => getImpressora(p)?.scanner?.scanSpeed ?? "-",
        type: "text",
      },
      {
        key: "adfCapacity",
        label: "Capacidade ADF (folhas)",
        getValue: (p) =>
          getImpressora(p)?.scanner?.adfCapacity?.toString() ?? "-",
        type: "text",
      },
      {
        key: "scanArea",
        label: "Área de Digitalização",
        getValue: (p) => getImpressora(p)?.scanner?.scanArea ?? "-",
        type: "text",
      },
      {
        key: "fileFormats",
        label: "Formatos de Arquivo",
        getValue: (p) =>
          getImpressora(p)?.scanner?.fileFormats?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "colorDepth",
        label: "Profundidade de Cor",
        getValue: (p) => getImpressora(p)?.scanner?.colorDepth ?? "-",
        type: "text",
      },
      {
        key: "duplexScanning",
        label: "Digitalização Duplex",
        getValue: (p) => getImpressora(p)?.scanner?.duplexScanning ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "copier",
    title: "Copiadora",
    specs: [
      {
        key: "maxCopies",
        label: "Número Máximo de Cópias",
        getValue: (p) => getImpressora(p)?.copier?.maxCopies?.toString() ?? "-",
        type: "text",
      },
      {
        key: "copySpeed",
        label: "Velocidade de Cópia",
        getValue: (p) => getImpressora(p)?.copier?.copySpeed ?? "-",
        type: "text",
      },
      {
        key: "reduction",
        label: "Redução",
        getValue: (p) => getImpressora(p)?.copier?.reduction ?? "-",
        type: "text",
      },
      {
        key: "enlargement",
        label: "Ampliação",
        getValue: (p) => getImpressora(p)?.copier?.enlargement ?? "-",
        type: "text",
      },
      {
        key: "idCopy",
        label: "Cópia de ID",
        getValue: (p) => getImpressora(p)?.copier?.idCopy ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "fax",
    title: "Fax",
    specs: [
      {
        key: "faxSpeed",
        label: "Velocidade",
        getValue: (p) => getImpressora(p)?.fax?.speed ?? "-",
        type: "text",
      },
      {
        key: "faxMemory",
        label: "Memória",
        getValue: (p) => getImpressora(p)?.fax?.memory ?? "-",
        type: "text",
      },
      {
        key: "faxResolution",
        label: "Resolução",
        getValue: (p) => getImpressora(p)?.fax?.resolution ?? "-",
        type: "text",
      },
      {
        key: "autoRedialing",
        label: "Rediscagem Automática",
        getValue: (p) => getImpressora(p)?.fax?.autoRedialing ?? false,
        type: "boolean",
      },
      {
        key: "speedDial",
        label: "Discagem Rápida",
        getValue: (p) => getImpressora(p)?.fax?.speedDial?.toString() ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "ink",
    title: "Tinta/Toner",
    specs: [
      {
        key: "cartridges",
        label: "Quantidade de Cartuchos",
        getValue: (p) => getImpressora(p)?.ink.cartridges?.toString() ?? "-",
        type: "text",
      },
      {
        key: "cartridgeType",
        label: "Tipo de Cartucho",
        getValue: (p) => getImpressora(p)?.ink.cartridgeType ?? "-",
        type: "text",
      },
      {
        key: "colors",
        label: "Cores",
        getValue: (p) => getImpressora(p)?.ink.colors?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "cartridgeYieldBlack",
        label: "Rendimento Preto",
        getValue: (p) => getImpressora(p)?.ink.cartridgeYield?.black ?? "-",
        type: "text",
      },
      {
        key: "cartridgeYieldColor",
        label: "Rendimento Colorido",
        getValue: (p) => getImpressora(p)?.ink.cartridgeYield?.color ?? "-",
        type: "text",
      },
      {
        key: "tankSystem",
        label: "Sistema de Tanque",
        getValue: (p) => getImpressora(p)?.ink.tankSystem ?? false,
        type: "boolean",
      },
      {
        key: "inkBottles",
        label: "Frascos de Tinta",
        getValue: (p) => getImpressora(p)?.ink.inkBottles?.join(", ") ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "display",
    title: "Display",
    specs: [
      {
        key: "hasDisplay",
        label: "Possui Display",
        getValue: (p) => getImpressora(p)?.display?.hasDisplay ?? false,
        type: "boolean",
      },
      {
        key: "displayType",
        label: "Tipo de Tela",
        getValue: (p) => getImpressora(p)?.display?.type ?? "-",
        type: "text",
      },
      {
        key: "displaySize",
        label: "Tamanho da Tela",
        getValue: (p) => getImpressora(p)?.display?.size ?? "-",
        type: "text",
      },
      {
        key: "colorDisplay",
        label: "Tela Colorida",
        getValue: (p) => getImpressora(p)?.display?.color ?? false,
        type: "boolean",
      },
      {
        key: "touchscreen",
        label: "Touchscreen",
        getValue: (p) => getImpressora(p)?.display?.touchscreen ?? false,
        type: "boolean",
      },
      {
        key: "displayResolution",
        label: "Resolução da Tela",
        getValue: (p) => getImpressora(p)?.display?.resolution ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "specifications",
    title: "Especificações Técnicas",
    specs: [
      {
        key: "portable",
        label: "Portátil",
        getValue: (p) => getImpressora(p)?.specifications.portable ?? false,
        type: "boolean",
      },
      {
        key: "processorSpeed",
        label: "Velocidade do Processador",
        getValue: (p) => getImpressora(p)?.specifications.processorSpeed ?? "-",
        type: "text",
      },
      {
        key: "memory",
        label: "Memória RAM",
        getValue: (p) => getImpressora(p)?.specifications.memory ?? "-",
        type: "text",
      },
      {
        key: "storage",
        label: "Armazenamento",
        getValue: (p) => getImpressora(p)?.specifications.storage ?? "-",
        type: "text",
      },
      {
        key: "energyEfficiency",
        label: "Eficiência Energética",
        getValue: (p) =>
          getImpressora(p)?.specifications.energyEfficiency ?? "-",
        type: "text",
      },
      {
        key: "operatingSystem",
        label: "Sistema Operacional",
        getValue: (p) =>
          getImpressora(p)?.specifications.operatingSystem ?? "-",
        type: "text",
      },
      {
        key: "supportedOS",
        label: "Sistemas Compatíveis",
        getValue: (p) =>
          getImpressora(p)?.specifications.supportedOS?.join(", ") ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "power",
    title: "Energia",
    specs: [
      {
        key: "voltage",
        label: "Voltagem",
        getValue: (p) => getImpressora(p)?.power.voltage ?? "-",
        type: "text",
      },
      {
        key: "powerConsumption",
        label: "Consumo de Energia",
        getValue: (p) => getImpressora(p)?.power.powerConsumption ?? "-",
        type: "text",
      },
      {
        key: "standbyPower",
        label: "Consumo em Standby",
        getValue: (p) => getImpressora(p)?.power.standbyPower ?? "-",
        type: "text",
      },
      {
        key: "sleepMode",
        label: "Modo Sleep",
        getValue: (p) => getImpressora(p)?.power.sleepMode ?? false,
        type: "boolean",
      },
      {
        key: "autoShutoff",
        label: "Desligamento Automático",
        getValue: (p) => getImpressora(p)?.power.autoShutoff ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "features",
    title: "Recursos",
    specs: [
      {
        key: "cloudPrinting",
        label: "Impressão na Nuvem",
        getValue: (p) => getImpressora(p)?.features.cloudPrinting ?? false,
        type: "boolean",
      },
      {
        key: "mobilePrinting",
        label: "Impressão Móvel",
        getValue: (p) => getImpressora(p)?.features.mobilePrinting ?? false,
        type: "boolean",
      },
      {
        key: "automaticDocumentFeeder",
        label: "Alimentador Automático",
        getValue: (p) =>
          getImpressora(p)?.features.automaticDocumentFeeder ?? false,
        type: "boolean",
      },
      {
        key: "adfCapacityFeature",
        label: "Capacidade do ADF",
        getValue: (p) =>
          getImpressora(p)?.features.adfCapacity?.toString() ?? "-",
        type: "text",
      },
      {
        key: "twoSidedId",
        label: "Cópia de ID em 2 Lados",
        getValue: (p) => getImpressora(p)?.features.twoSidedId ?? false,
        type: "boolean",
      },
      {
        key: "voiceActivated",
        label: "Ativação por Voz",
        getValue: (p) => getImpressora(p)?.features.voiceActivated ?? false,
        type: "boolean",
      },
      {
        key: "smartTasks",
        label: "Tarefas Inteligentes",
        getValue: (p) => getImpressora(p)?.features.smartTasks ?? false,
        type: "boolean",
      },
      {
        key: "quietMode",
        label: "Modo Silencioso",
        getValue: (p) => getImpressora(p)?.features.quietMode ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "environmental",
    title: "Sustentabilidade",
    specs: [
      {
        key: "energyStar",
        label: "Energy Star",
        getValue: (p) => getImpressora(p)?.environmental?.energyStar ?? false,
        type: "boolean",
      },
      {
        key: "ecoMode",
        label: "Modo Econômico",
        getValue: (p) => getImpressora(p)?.environmental?.ecoMode ?? false,
        type: "boolean",
      },
      {
        key: "recyclable",
        label: "Reciclável",
        getValue: (p) => getImpressora(p)?.environmental?.recyclable ?? false,
        type: "boolean",
      },
      {
        key: "certifications",
        label: "Certificações",
        getValue: (p) =>
          getImpressora(p)?.environmental?.certifications?.join(", ") ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "security",
    title: "Segurança",
    specs: [
      {
        key: "passwordProtection",
        label: "Proteção por Senha",
        getValue: (p) =>
          getImpressora(p)?.security?.passwordProtection ?? false,
        type: "boolean",
      },
      {
        key: "encryption",
        label: "Criptografia",
        getValue: (p) =>
          getImpressora(p)?.security?.encryption?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "secureErase",
        label: "Apagamento Seguro",
        getValue: (p) => getImpressora(p)?.security?.secureErase ?? false,
        type: "boolean",
      },
      {
        key: "pinPrinting",
        label: "Impressão com PIN",
        getValue: (p) => getImpressora(p)?.security?.pinPrinting ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "software",
    title: "Software",
    specs: [
      {
        key: "softwareIncluded",
        label: "Software Incluído",
        getValue: (p) =>
          getImpressora(p)?.software?.included?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "softwareCompatible",
        label: "Software Compatível",
        getValue: (p) =>
          getImpressora(p)?.software?.compatible?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "driverSupport",
        label: "Suporte de Drivers",
        getValue: (p) =>
          getImpressora(p)?.software?.driverSupport?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "mobileApps",
        label: "Aplicativos Móveis",
        getValue: (p) =>
          getImpressora(p)?.software?.mobileApps?.join(", ") ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "dimensions",
    title: "Dimensões",
    specs: [
      {
        key: "height",
        label: "Altura",
        getValue: (p) => getImpressora(p)?.dimensions?.height ?? "-",
        type: "text",
      },
      {
        key: "width",
        label: "Largura",
        getValue: (p) => getImpressora(p)?.dimensions?.width ?? "-",
        type: "text",
      },
      {
        key: "depth",
        label: "Profundidade",
        getValue: (p) => getImpressora(p)?.dimensions?.depth ?? "-",
        type: "text",
      },
      {
        key: "weight",
        label: "Peso",
        getValue: (p) => getImpressora(p)?.dimensions?.weight ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "warranty",
    title: "Garantia",
    specs: [
      {
        key: "warrantyPeriod",
        label: "Período",
        getValue: (p) => getImpressora(p)?.warranty?.period ?? "-",
        type: "text",
      },
      {
        key: "warrantyType",
        label: "Tipo",
        getValue: (p) => getImpressora(p)?.warranty?.type ?? "-",
        type: "text",
      },
      {
        key: "support",
        label: "Suporte",
        getValue: (p) => getImpressora(p)?.warranty?.support ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "bundled",
    title: "Itens Inclusos",
    specs: [
      {
        key: "cables",
        label: "Cabos",
        getValue: (p) => getImpressora(p)?.bundled?.cables?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "cartridges",
        label: "Cartuchos",
        getValue: (p) =>
          getImpressora(p)?.bundled?.cartridges?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "software",
        label: "Software",
        getValue: (p) => getImpressora(p)?.bundled?.software?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "accessories",
        label: "Acessórios",
        getValue: (p) =>
          getImpressora(p)?.bundled?.accessories?.join(", ") ?? "-",
        type: "text",
      },
    ],
  },
];
```

## Exemplo de Objeto Json cafeteira

```json
{
  "id": "epson-l6490",
  "name": "L6490",
  "brand": "Epson",
  "line": "EcoTank",
  "model": "L6490",
  "alphanumericModel": "C11CJ88303",
  "color": "Cinza",
  "image": "https://http2.mlstatic.com/D_NQ_NP_2X_859376-MLA99450654260_112025-F.webp",
  "price": 0,
  "releaseDate": "2024",
  "releaseYear": 2024,
  "category": "impressoras",
  "mercadolivreUrl": "https://mercadolivre.com/sec/21bKpid",
  "manufacturer": "Epson",
  "specs": {
    "manufacturer": "Epson",
    "type": "Multifuncional",
    "printingTechnology": "Jato de tinta",
    "printType": "Cor",
    "functions": ["Impressão", "Cópia", "Digitalização", "Fax"],
    "connectivity": {
      "wifi": true,
      "bluetooth": false,
      "ethernet": true,
      "usb": true,
      "nfc": false,
      "mobileConnections": [
        "Wi-Fi Direct",
        "Epson Connect",
        "Epson Smart Panel"
      ],
      "usbType": "USB 3.0",
      "ethernetSpeed": "10/100 Mbps"
    },
    "printing": {
      "maxResolutionBlackWhite": "4800 x 1200 dpi",
      "maxResolutionColor": "4800 x 1200 dpi",
      "maxSpeedBlackWhite": 37,
      "maxSpeedColor": 23,
      "firstPageOut": "7 segundos",
      "duplexPrinting": "Automático",
      "monthlyCycle": 20000,
      "recommendedVolume": "1500 páginas por mês",
      "languages": ["PCL", "ESC/P-R"]
    },
    "paper": {
      "types": ["A4", "Carta", "Legal", "Envelope", "Fotográfico"],
      "sizes": ["A4", "Carta", "Legal", "A5", "A6", "Envelope"],
      "maxCapacity": 250,
      "trays": 1,
      "maxWeight": 300,
      "minWeight": 64,
      "customSizes": true,
      "borderlessPrinting": true
    },
    "scanner": {
      "type": "Flatbed + ADF",
      "maxResolution": "1200 x 2400 dpi",
      "scanSpeed": null,
      "adfCapacity": 35,
      "scanArea": "216 x 297 mm",
      "fileFormats": ["PDF", "JPEG", "TIFF", "PNG"],
      "colorDepth": "48 bits",
      "duplexScanning": false
    },
    "copier": {
      "maxCopies": 99,
      "copySpeed": "12 ipm preto / 6 ipm cor",
      "reduction": "25%",
      "enlargement": "400%",
      "idCopy": true
    },
    "fax": {
      "speed": null,
      "memory": "180 páginas",
      "resolution": null,
      "autoRedialing": true,
      "speedDial": 100
    },
    "ink": {
      "cartridges": 4,
      "cartridgeType": "Tanque de tinta",
      "colors": ["Preto", "Ciano", "Magenta", "Amarelo"],
      "cartridgeYield": {
        "black": "7500 páginas ISO",
        "color": "6000 páginas ISO"
      },
      "tankSystem": true,
      "inkBottles": [
        "T524120-AL (Preto)",
        "T524220-AL (Ciano)",
        "T524320-AL (Magenta)",
        "T524420-AL (Amarelo)"
      ]
    },
    "display": {
      "hasDisplay": true,
      "type": "Touchscreen",
      "size": "2,4 polegadas",
      "color": true,
      "touchscreen": true,
      "resolution": null
    },
    "specifications": {
      "portable": false,
      "processorSpeed": null,
      "memory": null,
      "storage": null,
      "energyEfficiency": "A",
      "operatingSystem": null,
      "supportedOS": ["Windows", "macOS", "Linux", "Android", "iOS"]
    },
    "power": {
      "voltage": "Bivolt (110V-240V automático)",
      "powerConsumption": "12 W",
      "standbyPower": null,
      "sleepMode": true,
      "autoShutoff": true
    },
    "dimensions": {
      "height": "34,6 cm",
      "width": "37,5 cm",
      "depth": "34,7 cm",
      "weight": "7,3 kg"
    },
    "environmental": {
      "energyStar": true,
      "ecoMode": true,
      "recyclable": true,
      "certifications": ["RoHS"]
    },
    "security": {
      "passwordProtection": true,
      "encryption": null,
      "secureErase": false,
      "pinPrinting": false
    },
    "features": {
      "cloudPrinting": true,
      "mobilePrinting": true,
      "automaticDocumentFeeder": true,
      "adfCapacity": 35,
      "twoSidedId": true,
      "voiceActivated": false,
      "smartTasks": true,
      "colorDisplay": true,
      "quietMode": false
    },
    "software": {
      "included": ["Epson Smart Panel", "Epson Connect"],
      "compatible": ["Windows", "macOS", "Linux"],
      "driverSupport": ["PCL", "ESC/P-R"],
      "mobileApps": ["Epson Smart Panel", "Epson iPrint"]
    },
    "bundled": {
      "cables": ["Cabo USB", "Cabo de energia"],
      "cartridges": ["Kit completo de garrafas de tinta (4 cores)"],
      "software": ["Epson Smart Panel"],
      "accessories": ["Manual de instruções", "Guia de instalação"]
    },
    "warranty": {
      "period": "1 ano",
      "type": "Garantia do fabricante",
      "support": "Suporte técnico Epson"
    },
    "ratings": {
      "costBenefit": 9,
      "printQuality": 9,
      "speed": 8,
      "connectivity": 9,
      "reliability": 8.5,
      "features": 9,
      "costPerPage": 9.5
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
"impressoras": [
      {
        "name": "L6490",
        "brand": "Epson",
        "detailedModel": "L6490",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_859376-MLA99450654260_112025-F.webp"
      },
      {
        "name": "DeskJet Ink Advantage 2874",
        "brand": "HP",
        "detailedModel": "2874",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_997367-MLA99927857041_112025-F.webp"
      },
      {
        "name": "Smart Tank 584",
        "brand": "HP",
        "detailedModel": "584",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_961034-MLA99958290111_112025-F.webp"
      },
      {
        "name": "EcoTank L3250",
        "brand": "Epson",
        "detailedModel": "C11CJ67301",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_867179-MLA99966959445_112025-F.webp"
      }
    ]
```

- Se eu passar dados de um item já cadastrado antes, ou que você já mandou os dados, pare o processo e me pergunte se eu quero continuar mesmo assim.
