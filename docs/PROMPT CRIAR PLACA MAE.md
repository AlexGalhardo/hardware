# Contexto

- Site: <https://alexgalhardo.github.io/tudohardware>
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

function isPlacaMae(product: Product): product is PlacaMae {
  return product.category === "placa-mae";
}

export interface PlacaMae extends BaseProduct {
  category: "placa-mae";
  specs: PlacaMaeSpecs;
}

function getPlacaMae(p: Product): PlacaMaeSpecs | null {
  return isPlacaMae(p) ? p.specs : null;
}

export interface PlacaMaeSpecs {
  manufacturer:
    | "ASUS"
    | "MSI"
    | "Gigabyte"
    | "ASRock"
    | "EVGA"
    | "Biostar"
    | "Colorful"
    | "NZXT"
    | "Outros";
  chipset: string;
  socket: string;
  formFactor: "ATX" | "Micro-ATX" | "Mini-ITX" | "E-ATX" | "XL-ATX";
  cpuSupport: {
    brands: ("Intel" | "AMD")[];
    generations: string[];
    maxTdp?: string;
  };
  memory: {
    type: string; // DDR4, DDR5
    slots: number;
    maxCapacity: string;
    maxSpeed: string;
    channels: number; // Dual, Quad
    supportedSpeeds: string[];
    xmp?: boolean;
    expo?: boolean;
    ecc?: boolean;
  };
  storage: {
    m2Slots: number;
    m2Specs?: {
      slot: number;
      interface: string; // PCIe 4.0 x4, PCIe 5.0 x4
      formFactors: string[]; // 2280, 22110
    }[];
    sataConnectors: number;
    sataVersion?: string; // SATA III 6Gb/s
    raidSupport?: string[]; // RAID 0, 1, 5, 10
  };
  expansion: {
    pciSlots: {
      type: string; // PCIe 5.0 x16, PCIe 4.0 x16, PCIe 3.0 x1
      count: number;
      mode?: string; // x16, x8/x8, x8/x4/x4
    }[];
    totalSlots: number;
  };
  networking: {
    ethernet?: {
      controller: string;
      speed: string; // 2.5GbE, 1GbE
      ports: number;
    };
    wifi?: {
      standard: string; // Wi-Fi 6E, Wi-Fi 7
      version?: string;
      bluetooth?: string;
      antenna?: boolean;
    };
  };
  audio: {
    codec: string;
    channels: string; // 7.1, 5.1
    features?: string[];
  };
  usb: {
    usb32Gen2x2TypeC?: number; // 20Gbps
    usb32Gen2TypeC?: number; // 10Gbps
    usb32Gen2TypeA?: number; // 10Gbps
    usb32Gen1?: number; // 5Gbps
    usb20?: number;
    total: number;
    frontPanelConnectors?: {
      usb32Gen2x2TypeC?: number;
      usb32Gen2TypeC?: number;
      usb32Gen1?: number;
      usb20?: number;
    };
  };
  videoOutputs?: {
    hdmi?: number;
    displayPort?: number;
    vga?: number;
    dvi?: number;
    thunderbolt?: number;
    maxDisplays?: number;
    maxResolution?: string;
  };
  power: {
    mainConnector: string; // 24-pin
    cpuConnector: string; // 8-pin, 8+4 pin, 8+8 pin
    phases: number;
    designPower?: string;
    features?: string[]; // Digital VRM, Dr.MOS
  };
  bios: {
    type: string; // UEFI, BIOS
    size?: string;
    flashback?: boolean;
    dualBios?: boolean;
  };
  cooling: {
    heatsinks?: string[];
    fanHeaders: number;
    cpuFanHeaders?: number;
    systemFanHeaders?: number;
    pumpHeaders?: number;
    argbHeaders?: number;
    rgbHeaders?: number;
  };
  rgb: {
    hasRgb: boolean;
    zones?: number;
    software?: string;
    compatibleWith?: string[];
  };
  features: {
    gaming?: boolean;
    overclocking?: boolean;
    clearCmos?: boolean;
    debugLed?: boolean;
    postCode?: boolean;
    qFlash?: boolean;
    wifi?: boolean;
    bluetooth?: boolean;
    thunderbolt?: boolean;
    tpm?: string;
    securityFeatures?: string[];
  };
  backPanel: {
    ps2?: number;
    usb?: {
      usb32Gen2x2TypeC?: number;
      usb32Gen2TypeC?: number;
      usb32Gen2TypeA?: number;
      usb32Gen1?: number;
      usb20?: number;
    };
    audio?: string[];
    network?: string[];
    video?: string[];
    other?: string[];
  };
  dimensions?: {
    length: string;
    width: string;
    height?: string;
    weight?: string;
  };
  compatibility?: {
    cases?: string[];
    coolers?: string[];
    notes?: string[];
  };
  bundled?: {
    cables?: string[];
    software?: string[];
    accessories?: string[];
  };
  warranty?: {
    period: string;
    type?: string;
  };
  ratings: {
    costBenefit: number | null;
    buildQuality: number;
    vrm: number;
    connectivity: number;
    overclocking: number;
    features: number;
  };
}

export const placaMaeSpecs: SpecSection[] = [
  {
    id: "ratings",
    title: "Notas",
    specs: [
      {
        key: "costBenefit",
        label: "Custo-benefício",
        getValue: (p) => getPlacaMae(p)?.ratings.costBenefit ?? null,
        type: "rating",
      },
      {
        key: "buildQuality",
        label: "Qualidade de Construção",
        getValue: (p) => getPlacaMae(p)?.ratings.buildQuality ?? null,
        type: "rating",
      },
      {
        key: "vrm",
        label: "VRM / Entrega de Energia",
        getValue: (p) => getPlacaMae(p)?.ratings.vrm ?? null,
        type: "rating",
      },
      {
        key: "connectivity",
        label: "Conectividade",
        getValue: (p) => getPlacaMae(p)?.ratings.connectivity ?? null,
        type: "rating",
      },
      {
        key: "overclocking",
        label: "Overclocking",
        getValue: (p) => getPlacaMae(p)?.ratings.overclocking ?? null,
        type: "rating",
      },
      {
        key: "features",
        label: "Recursos",
        getValue: (p) => getPlacaMae(p)?.ratings.features ?? null,
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
        getValue: (p) => getPlacaMae(p)?.manufacturer ?? "-",
        type: "text",
      },
      {
        key: "chipset",
        label: "Chipset",
        getValue: (p) => getPlacaMae(p)?.chipset ?? "-",
        type: "text",
      },
      {
        key: "socket",
        label: "Soquete",
        getValue: (p) => getPlacaMae(p)?.socket ?? "-",
        type: "text",
      },
      {
        key: "formFactor",
        label: "Formato",
        getValue: (p) => getPlacaMae(p)?.formFactor ?? "-",
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
    id: "cpu-support",
    title: "Suporte de CPU",
    specs: [
      {
        key: "cpuBrands",
        label: "Marcas Suportadas",
        getValue: (p) => getPlacaMae(p)?.cpuSupport.brands.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "cpuGenerations",
        label: "Gerações Suportadas",
        getValue: (p) =>
          getPlacaMae(p)?.cpuSupport.generations.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "maxTdp",
        label: "TDP Máximo",
        getValue: (p) => getPlacaMae(p)?.cpuSupport.maxTdp ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "memory",
    title: "Memória RAM",
    specs: [
      {
        key: "memoryType",
        label: "Tipo",
        getValue: (p) => getPlacaMae(p)?.memory.type ?? "-",
        type: "text",
      },
      {
        key: "memorySlots",
        label: "Slots",
        getValue: (p) => getPlacaMae(p)?.memory.slots.toString() ?? "-",
        type: "text",
      },
      {
        key: "maxMemory",
        label: "Capacidade Máxima",
        getValue: (p) => getPlacaMae(p)?.memory.maxCapacity ?? "-",
        type: "text",
      },
      {
        key: "maxMemorySpeed",
        label: "Velocidade Máxima",
        getValue: (p) => getPlacaMae(p)?.memory.maxSpeed ?? "-",
        type: "text",
      },
      {
        key: "memoryChannels",
        label: "Canais",
        getValue: (p) => getPlacaMae(p)?.memory.channels.toString() ?? "-",
        type: "text",
      },
      {
        key: "supportedSpeeds",
        label: "Velocidades Suportadas",
        getValue: (p) =>
          getPlacaMae(p)?.memory.supportedSpeeds.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "xmp",
        label: "Intel XMP",
        getValue: (p) => getPlacaMae(p)?.memory.xmp ?? false,
        type: "boolean",
      },
      {
        key: "expo",
        label: "AMD EXPO",
        getValue: (p) => getPlacaMae(p)?.memory.expo ?? false,
        type: "boolean",
      },
      {
        key: "ecc",
        label: "Suporte ECC",
        getValue: (p) => getPlacaMae(p)?.memory.ecc ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "storage",
    title: "Armazenamento",
    specs: [
      {
        key: "m2Slots",
        label: "Slots M.2",
        getValue: (p) => getPlacaMae(p)?.storage.m2Slots.toString() ?? "-",
        type: "text",
      },
      {
        key: "m2Interface",
        label: "Especificações M.2",
        getValue: (p) => {
          const specs = getPlacaMae(p)?.storage.m2Specs;
          return specs
            ? specs
                .map(
                  (s) =>
                    `Slot ${s.slot}: ${s.interface} (${s.formFactors.join(", ")})`,
                )
                .join(" | ")
            : "-";
        },
        type: "text",
      },
      {
        key: "sataConnectors",
        label: "Conectores SATA",
        getValue: (p) =>
          getPlacaMae(p)?.storage.sataConnectors.toString() ?? "-",
        type: "text",
      },
      {
        key: "sataVersion",
        label: "Versão SATA",
        getValue: (p) => getPlacaMae(p)?.storage.sataVersion ?? "-",
        type: "text",
      },
      {
        key: "raidSupport",
        label: "Suporte RAID",
        getValue: (p) => getPlacaMae(p)?.storage.raidSupport?.join(", ") ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "expansion",
    title: "Slots de Expansão",
    specs: [
      {
        key: "pciSlots",
        label: "Slots PCI Express",
        getValue: (p) => {
          const slots = getPlacaMae(p)?.expansion.pciSlots;
          return slots
            ? slots
                .map(
                  (s) => `${s.count}x ${s.type}${s.mode ? ` (${s.mode})` : ""}`,
                )
                .join(" | ")
            : "-";
        },
        type: "text",
      },
      {
        key: "totalSlots",
        label: "Total de Slots",
        getValue: (p) => getPlacaMae(p)?.expansion.totalSlots.toString() ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "networking",
    title: "Rede",
    specs: [
      {
        key: "ethernetController",
        label: "Controladora Ethernet",
        getValue: (p) => getPlacaMae(p)?.networking.ethernet?.controller ?? "-",
        type: "text",
      },
      {
        key: "ethernetSpeed",
        label: "Velocidade Ethernet",
        getValue: (p) => getPlacaMae(p)?.networking.ethernet?.speed ?? "-",
        type: "text",
      },
      {
        key: "ethernetPorts",
        label: "Portas Ethernet",
        getValue: (p) =>
          getPlacaMae(p)?.networking.ethernet?.ports.toString() ?? "-",
        type: "text",
      },
      {
        key: "wifiStandard",
        label: "Padrão Wi-Fi",
        getValue: (p) => getPlacaMae(p)?.networking.wifi?.standard ?? "-",
        type: "text",
      },
      {
        key: "bluetooth",
        label: "Bluetooth",
        getValue: (p) => getPlacaMae(p)?.networking.wifi?.bluetooth ?? "-",
        type: "text",
      },
      {
        key: "wifiAntenna",
        label: "Antena Wi-Fi Inclusa",
        getValue: (p) => getPlacaMae(p)?.networking.wifi?.antenna ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "audio",
    title: "Áudio",
    specs: [
      {
        key: "audioCodec",
        label: "Codec de Áudio",
        getValue: (p) => getPlacaMae(p)?.audio.codec ?? "-",
        type: "text",
      },
      {
        key: "audioChannels",
        label: "Canais",
        getValue: (p) => getPlacaMae(p)?.audio.channels ?? "-",
        type: "text",
      },
      {
        key: "audioFeatures",
        label: "Recursos de Áudio",
        getValue: (p) => getPlacaMae(p)?.audio.features?.join(", ") ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "usb",
    title: "USB",
    specs: [
      {
        key: "usb32Gen2x2TypeC",
        label: "USB 3.2 Gen 2x2 Type-C (20Gbps)",
        getValue: (p) =>
          getPlacaMae(p)?.usb.usb32Gen2x2TypeC?.toString() ?? "0",
        type: "text",
      },
      {
        key: "usb32Gen2TypeC",
        label: "USB 3.2 Gen 2 Type-C (10Gbps)",
        getValue: (p) => getPlacaMae(p)?.usb.usb32Gen2TypeC?.toString() ?? "0",
        type: "text",
      },
      {
        key: "usb32Gen2TypeA",
        label: "USB 3.2 Gen 2 Type-A (10Gbps)",
        getValue: (p) => getPlacaMae(p)?.usb.usb32Gen2TypeA?.toString() ?? "0",
        type: "text",
      },
      {
        key: "usb32Gen1",
        label: "USB 3.2 Gen 1 (5Gbps)",
        getValue: (p) => getPlacaMae(p)?.usb.usb32Gen1?.toString() ?? "0",
        type: "text",
      },
      {
        key: "usb20",
        label: "USB 2.0",
        getValue: (p) => getPlacaMae(p)?.usb.usb20?.toString() ?? "0",
        type: "text",
      },
      {
        key: "totalUsb",
        label: "Total de Portas USB",
        getValue: (p) => getPlacaMae(p)?.usb.total.toString() ?? "-",
        type: "text",
      },
      {
        key: "frontPanelUsb",
        label: "Conectores Painel Frontal",
        getValue: (p) => {
          const front = getPlacaMae(p)?.usb.frontPanelConnectors;
          if (!front) return "-";
          const parts = [];
          if (front.usb32Gen2x2TypeC)
            parts.push(`${front.usb32Gen2x2TypeC}x USB 3.2 Gen 2x2 Type-C`);
          if (front.usb32Gen2TypeC)
            parts.push(`${front.usb32Gen2TypeC}x USB 3.2 Gen 2 Type-C`);
          if (front.usb32Gen1) parts.push(`${front.usb32Gen1}x USB 3.2 Gen 1`);
          if (front.usb20) parts.push(`${front.usb20}x USB 2.0`);
          return parts.join(", ") || "-";
        },
        type: "text",
      },
    ],
  },
  {
    id: "video-outputs",
    title: "Saídas de Vídeo",
    specs: [
      {
        key: "hdmiPorts",
        label: "HDMI",
        getValue: (p) => getPlacaMae(p)?.videoOutputs?.hdmi?.toString() ?? "0",
        type: "text",
      },
      {
        key: "displayPort",
        label: "DisplayPort",
        getValue: (p) =>
          getPlacaMae(p)?.videoOutputs?.displayPort?.toString() ?? "0",
        type: "text",
      },
      {
        key: "vgaPorts",
        label: "VGA",
        getValue: (p) => getPlacaMae(p)?.videoOutputs?.vga?.toString() ?? "0",
        type: "text",
      },
      {
        key: "dviPorts",
        label: "DVI",
        getValue: (p) => getPlacaMae(p)?.videoOutputs?.dvi?.toString() ?? "0",
        type: "text",
      },
      {
        key: "thunderbolt",
        label: "Thunderbolt",
        getValue: (p) =>
          getPlacaMae(p)?.videoOutputs?.thunderbolt?.toString() ?? "0",
        type: "text",
      },
      {
        key: "maxDisplays",
        label: "Máximo de Monitores",
        getValue: (p) =>
          getPlacaMae(p)?.videoOutputs?.maxDisplays?.toString() ?? "-",
        type: "text",
      },
      {
        key: "maxResolution",
        label: "Resolução Máxima",
        getValue: (p) => getPlacaMae(p)?.videoOutputs?.maxResolution ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "power",
    title: "Energia",
    specs: [
      {
        key: "mainConnector",
        label: "Conector Principal",
        getValue: (p) => getPlacaMae(p)?.power.mainConnector ?? "-",
        type: "text",
      },
      {
        key: "cpuConnector",
        label: "Conector CPU",
        getValue: (p) => getPlacaMae(p)?.power.cpuConnector ?? "-",
        type: "text",
      },
      {
        key: "phases",
        label: "Fases de Energia",
        getValue: (p) => getPlacaMae(p)?.power.phases.toString() ?? "-",
        type: "text",
      },
      {
        key: "designPower",
        label: "Potência de Design",
        getValue: (p) => getPlacaMae(p)?.power.designPower ?? "-",
        type: "text",
      },
      {
        key: "powerFeatures",
        label: "Recursos de Energia",
        getValue: (p) => getPlacaMae(p)?.power.features?.join(", ") ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "bios",
    title: "BIOS",
    specs: [
      {
        key: "biosType",
        label: "Tipo",
        getValue: (p) => getPlacaMae(p)?.bios.type ?? "-",
        type: "text",
      },
      {
        key: "biosSize",
        label: "Tamanho",
        getValue: (p) => getPlacaMae(p)?.bios.size ?? "-",
        type: "text",
      },
      {
        key: "flashback",
        label: "BIOS Flashback",
        getValue: (p) => getPlacaMae(p)?.bios.flashback ?? false,
        type: "boolean",
      },
      {
        key: "dualBios",
        label: "Dual BIOS",
        getValue: (p) => getPlacaMae(p)?.bios.dualBios ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "cooling",
    title: "Refrigeração",
    specs: [
      {
        key: "heatsinks",
        label: "Dissipadores",
        getValue: (p) => getPlacaMae(p)?.cooling.heatsinks?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "fanHeaders",
        label: "Total de Headers",
        getValue: (p) => getPlacaMae(p)?.cooling.fanHeaders.toString() ?? "-",
        type: "text",
      },
      {
        key: "cpuFanHeaders",
        label: "Headers CPU",
        getValue: (p) =>
          getPlacaMae(p)?.cooling.cpuFanHeaders?.toString() ?? "-",
        type: "text",
      },
      {
        key: "systemFanHeaders",
        label: "Headers Sistema",
        getValue: (p) =>
          getPlacaMae(p)?.cooling.systemFanHeaders?.toString() ?? "-",
        type: "text",
      },
      {
        key: "pumpHeaders",
        label: "Headers Bomba",
        getValue: (p) => getPlacaMae(p)?.cooling.pumpHeaders?.toString() ?? "-",
        type: "text",
      },
      {
        key: "argbHeaders",
        label: "Headers ARGB",
        getValue: (p) => getPlacaMae(p)?.cooling.argbHeaders?.toString() ?? "-",
        type: "text",
      },
      {
        key: "rgbHeaders",
        label: "Headers RGB",
        getValue: (p) => getPlacaMae(p)?.cooling.rgbHeaders?.toString() ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "rgb",
    title: "Iluminação RGB",
    specs: [
      {
        key: "hasRgb",
        label: "RGB",
        getValue: (p) => getPlacaMae(p)?.rgb.hasRgb ?? false,
        type: "boolean",
      },
      {
        key: "rgbZones",
        label: "Zonas RGB",
        getValue: (p) => getPlacaMae(p)?.rgb.zones?.toString() ?? "-",
        type: "text",
      },
      {
        key: "rgbSoftware",
        label: "Software RGB",
        getValue: (p) => getPlacaMae(p)?.rgb.software ?? "-",
        type: "text",
      },
      {
        key: "rgbCompatibility",
        label: "Compatibilidade RGB",
        getValue: (p) => getPlacaMae(p)?.rgb.compatibleWith?.join(", ") ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "features",
    title: "Recursos",
    specs: [
      {
        key: "gaming",
        label: "Gaming",
        getValue: (p) => getPlacaMae(p)?.features.gaming ?? false,
        type: "boolean",
      },
      {
        key: "overclocking",
        label: "Overclocking",
        getValue: (p) => getPlacaMae(p)?.features.overclocking ?? false,
        type: "boolean",
      },
      {
        key: "clearCmos",
        label: "Clear CMOS",
        getValue: (p) => getPlacaMae(p)?.features.clearCmos ?? false,
        type: "boolean",
      },
      {
        key: "debugLed",
        label: "Debug LED",
        getValue: (p) => getPlacaMae(p)?.features.debugLed ?? false,
        type: "boolean",
      },
      {
        key: "postCode",
        label: "POST Code",
        getValue: (p) => getPlacaMae(p)?.features.postCode ?? false,
        type: "boolean",
      },
      {
        key: "qFlash",
        label: "Q-Flash",
        getValue: (p) => getPlacaMae(p)?.features.qFlash ?? false,
        type: "boolean",
      },
      {
        key: "wifiFeature",
        label: "Wi-Fi",
        getValue: (p) => getPlacaMae(p)?.features.wifi ?? false,
        type: "boolean",
      },
      {
        key: "bluetoothFeature",
        label: "Bluetooth",
        getValue: (p) => getPlacaMae(p)?.features.bluetooth ?? false,
        type: "boolean",
      },
      {
        key: "thunderboltFeature",
        label: "Thunderbolt",
        getValue: (p) => getPlacaMae(p)?.features.thunderbolt ?? false,
        type: "boolean",
      },
      {
        key: "tpm",
        label: "TPM",
        getValue: (p) => getPlacaMae(p)?.features.tpm ?? "-",
        type: "text",
      },
      {
        key: "securityFeatures",
        label: "Recursos de Segurança",
        getValue: (p) =>
          getPlacaMae(p)?.features.securityFeatures?.join(", ") ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "dimensions",
    title: "Dimensões",
    specs: [
      {
        key: "length",
        label: "Comprimento",
        getValue: (p) => getPlacaMae(p)?.dimensions?.length ?? "-",
        type: "text",
      },
      {
        key: "width",
        label: "Largura",
        getValue: (p) => getPlacaMae(p)?.dimensions?.width ?? "-",
        type: "text",
      },
      {
        key: "height",
        label: "Altura",
        getValue: (p) => getPlacaMae(p)?.dimensions?.height ?? "-",
        type: "text",
      },
      {
        key: "weight",
        label: "Peso",
        getValue: (p) => getPlacaMae(p)?.dimensions?.weight ?? "-",
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
        getValue: (p) => getPlacaMae(p)?.warranty?.period ?? "-",
        type: "text",
      },
      {
        key: "warrantyType",
        label: "Tipo",
        getValue: (p) => getPlacaMae(p)?.warranty?.type ?? "-",
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
        getValue: (p) => getPlacaMae(p)?.bundled?.cables?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "software",
        label: "Software",
        getValue: (p) => getPlacaMae(p)?.bundled?.software?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "accessories",
        label: "Acessórios",
        getValue: (p) =>
          getPlacaMae(p)?.bundled?.accessories?.join(", ") ?? "-",
        type: "text",
      },
    ],
  },
];
```

## Exemplo Produto Object JSON de Placa mãe que você deve fazer

```json
{
  "id": "asus-prime-a520m-k",
  "name": "Prime A520M-K",
  "brand": "ASUS",
  "line": "Prime",
  "model": "Prime A520M-K",
  "detailedModel": "Prime A520M-K",
  "color": "Preto",
  "image": "https://http2.mlstatic.com/D_NQ_NP_2X_725895-MLA99492459638_112025-F.webp",
  "price": 0,
  "releaseDate": "2020",
  "releaseMonth": null,
  "releaseYear": 2020,
  "origin": null,
  "category": "placa-mae",
  "anatelNumber": null,
  "amazonUrl": null,
  "mercadolivreUrl": "https://mercadolivre.com/sec/1sGRe3h",
  "shopeeUrl": null,
  "alphanumericModel": "90MB1500-M0EAY0",
  "version": "AM4",
  "manufacturer": "ASUS",
  "specs": {
    "manufacturer": "ASUS",
    "chipset": "AMD A520",
    "socket": "AM4",
    "formFactor": "Micro-ATX",
    "cpuSupport": {
      "brands": ["AMD"],
      "generations": [
        "Ryzen 5000 Series",
        "Ryzen 4000 G-Series",
        "Ryzen 3000 Series"
      ],
      "maxTdp": null
    },
    "memory": {
      "type": "DDR4",
      "slots": 2,
      "maxCapacity": "64 GB",
      "maxSpeed": "4600 MHz (OC)",
      "channels": 2,
      "supportedSpeeds": [
        "DDR4-2133",
        "DDR4-2400",
        "DDR4-2666",
        "DDR4-2800",
        "DDR4-3000",
        "DDR4-3200",
        "DDR4-3333",
        "DDR4-3466",
        "DDR4-3600",
        "DDR4-3733",
        "DDR4-3866",
        "DDR4-4000",
        "DDR4-4400",
        "DDR4-4600"
      ],
      "xmp": false,
      "expo": false,
      "ecc": true
    },
    "storage": {
      "m2Slots": 1,
      "m2Specs": [
        {
          "slot": 1,
          "interface": "PCIe 3.0 x4",
          "formFactors": ["2242", "2260", "2280"]
        }
      ],
      "sataConnectors": 4,
      "sataVersion": "SATA III 6Gb/s",
      "raidSupport": ["RAID 0", "RAID 1", "RAID 10"]
    },
    "expansion": {
      "pciSlots": [
        {
          "type": "PCIe 3.0 x16",
          "count": 1,
          "mode": "x16"
        },
        {
          "type": "PCIe 3.0 x1",
          "count": 2,
          "mode": null
        }
      ],
      "totalSlots": 3
    },
    "networking": {
      "ethernet": {
        "controller": "Realtek RTL8111H",
        "speed": "1 GbE",
        "ports": 1
      },
      "wifi": null
    },
    "audio": {
      "codec": "Realtek ALC887",
      "channels": "7.1",
      "features": [
        "Audio Shielding",
        "Dedicated audio PCB layers",
        "Jack-detection",
        "Multi-streaming",
        "Front Panel Jack-retasking"
      ]
    },
    "usb": {
      "usb32Gen2x2TypeC": null,
      "usb32Gen2TypeC": null,
      "usb32Gen2TypeA": null,
      "usb32Gen1": 4,
      "usb20": 4,
      "total": 8,
      "frontPanelConnectors": {
        "usb32Gen2x2TypeC": null,
        "usb32Gen2TypeC": null,
        "usb32Gen1": 2,
        "usb20": 4
      }
    },
    "videoOutputs": {
      "hdmi": 1,
      "displayPort": null,
      "vga": 1,
      "dvi": null,
      "thunderbolt": null,
      "maxDisplays": 2,
      "maxResolution": "4K@60Hz"
    },
    "power": {
      "mainConnector": "24-pin",
      "cpuConnector": "8-pin",
      "phases": null,
      "designPower": null,
      "features": ["Digi+ VRM", "EPU"]
    },
    "bios": {
      "type": "UEFI",
      "size": null,
      "flashback": false,
      "dualBios": false
    },
    "cooling": {
      "heatsinks": ["PCH heatsink"],
      "fanHeaders": 2,
      "cpuFanHeaders": 1,
      "systemFanHeaders": 1,
      "pumpHeaders": null,
      "argbHeaders": null,
      "rgbHeaders": null
    },
    "rgb": {
      "hasRgb": false,
      "zones": null,
      "software": null,
      "compatibleWith": null
    },
    "features": {
      "gaming": false,
      "overclocking": true,
      "clearCmos": true,
      "debugLed": false,
      "postCode": false,
      "qFlash": false,
      "wifi": false,
      "bluetooth": false,
      "thunderbolt": false,
      "tpm": "2.0",
      "securityFeatures": [
        "5X Protection III",
        "SafeSlot Core",
        "Overvoltage protection",
        "Overcurrent protection"
      ]
    },
    "backPanel": {
      "ps2": 1,
      "usb": {
        "usb32Gen2x2TypeC": null,
        "usb32Gen2TypeC": null,
        "usb32Gen2TypeA": null,
        "usb32Gen1": 4,
        "usb20": 2
      },
      "audio": ["3 x Audio jacks (Line in, Line out, Mic)"],
      "network": ["1 x RJ45 LAN"],
      "video": ["1 x HDMI", "1 x D-Sub"],
      "other": ["1 x PS/2"]
    },
    "dimensions": {
      "length": "22 cm",
      "width": "15 cm",
      "height": null,
      "weight": "1 kg"
    },
    "compatibility": {
      "cases": ["Micro-ATX", "ATX"],
      "coolers": null,
      "notes": ["Compatível com coolers AM4"]
    },
    "bundled": {
      "cables": ["2 x SATA 6Gb/s"],
      "software": ["AI Suite 3", "Fan Xpert", "ASUS CPU-Z"],
      "accessories": [
        "Manual do usuário",
        "I/O Shield",
        "1 x M.2 SSD screw package"
      ]
    },
    "warranty": {
      "period": "3 anos",
      "type": "Garantia do fabricante"
    },
    "ratings": {
      "costBenefit": 8.5,
      "buildQuality": 6.5,
      "vrm": 5.5,
      "connectivity": 5.0,
      "overclocking": 4.0,
      "features": 5.5
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
"placas-mae": [
      {
        "name": "Prime A520M-K",
        "brand": "ASUS",
        "detailedModel": "Prime A520M-K",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_725895-MLA99492459638_112025-F.webp"
      },
      {
        "name": "A520M-A PRO",
        "brand": "MSI",
        "detailedModel": "A520M-A PRO",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_644232-MLA99455670876_112025-F.webp"
      },
      {
        "name": "B550M AORUS ELITE",
        "brand": "Gigabyte",
        "detailedModel": "B550M AORUS ELITE",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_846714-MLA99464080574_112025-F.webp"
      },
      {
        "name": "A520M K V2",
        "brand": "Gigabyte",
        "detailedModel": "A520M K V2",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_642824-MLA99375931234_112025-F.webp"
      },
      {
        "name": "G-H81/M",
        "brand": "Revenger",
        "detailedModel": "G-H81/M",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_799253-MLA99849372099_112025-F.webp"
      },
      {
        "name": "TUF GAMING B550M-PLUS",
        "brand": "ASUS",
        "detailedModel": "TUF GAMING B550M-PLUS",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_666926-MLA99989580013_112025-F.webp"
      },
      {
        "name": "BMBB75-G3HGU-M2 REV 2.0",
        "brand": "Bluecase",
        "detailedModel": "BMBB75-G3HGU-M2 REV 2.0",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_777364-MLA95948463718_102025-F.webp"
      },
      {
        "name": "G-H310M",
        "brand": "Revenger",
        "detailedModel": "G-H310M",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_863351-MLA99371781378_112025-F.webp"
      },
      {
        "name": "PCYB75-3G16",
        "brand": "PCyes",
        "detailedModel": "PCYB75-3G16",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_826431-MLA99923154549_112025-F.webp"
      },
      {
        "name": "A520M-HVS",
        "brand": "ASRock",
        "detailedModel": "A520M-HVS",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_600626-MLA100029063065_122025-F.webp"
      },
      {
        "name": "PRIME H610M-CS D4",
        "brand": "ASUS",
        "detailedModel": "PRIME H610M-CS D4",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_980365-MLA99979674343_112025-F.webp"
      },
      {
        "name": "B840M GAMING WIFI6E",
        "brand": "MSI",
        "detailedModel": "B840M GAMING WIFI6E",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_662912-MLA99945608233_112025-F.webp"
      },
      {
        "name": "G-H81/M",
        "brand": "Revenger",
        "detailedModel": "G-H81/M",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_799253-MLA99849372099_112025-F.webp"
      },
      {
        "name": "B450M-HDV R4.0",
        "brand": "ASRock",
        "detailedModel": "B450M-HDV R4.0",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_807217-MLA99527550222_122025-F.webp"
      },
      {
        "name": "Prime A520M-K",
        "brand": "ASUS",
        "detailedModel": "Prime A520M-K",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_725895-MLA99492459638_112025-F.webp"
      },
      {
        "name": "Inspiron 3511 LA-L241P 05PD08",
        "brand": "Dell",
        "detailedModel": "LA-L241P (GDM50) com Core i3-1115G4",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_720573-MLB101916614601_122025-F.webp"
      },
      {
        "name": "H61 M2K",
        "brand": "Delta",
        "detailedModel": "H61 M2K Preto",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_607154-MLA104217268306_012026-F.webp"
      },
      {
        "name": "A520M-HVS",
        "brand": "ASRock",
        "detailedModel": "A520M-HVS",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_600626-MLA100029063065_122025-F.webp"
      },
      {
        "name": "G-A320",
        "brand": "Revenger",
        "detailedModel": "G-A320",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_797275-MLA99586891118_122025-F.webp"
      },
      {
        "name": "Prime A520M-K",
        "brand": "ASUS",
        "detailedModel": "Prime A520M-K",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_725895-MLA99492459638_112025-F.webp"
      },
      {
        "name": "Ender-3 V3 Plus Motherboard",
        "brand": "Creality",
        "detailedModel": "Ender-3 V3 Plus Motherboard Kit",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_991610-MLB89673208513_082025-F-placa-me-impressora-3d-creality-k1-ender-3-v3-plus-original.webp"
      },
      {
        "name": "KP-H61",
        "brand": "Knup",
        "detailedModel": "KP-H61",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_904324-MLA99480162034_112025-F.webp"
      },
      {
        "name": "MPG B550 GAMING PLUS",
        "brand": "MSI",
        "detailedModel": "MPG B550 GAMING PLUS",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_896276-MLA99986168285_112025-F.webp"
      },
      {
        "name": "B550M K",
        "brand": "Gigabyte",
        "detailedModel": "B550M K",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_768362-MLA99985597141_112025-F.webp"
      },
      {
        "name": "B75 Gamer Black",
        "brand": "Coretech",
        "detailedModel": "B75 Gamer Black LGA1155",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_656719-MLB97528164116_112025-F.webp"
      }
    ]
```

Se eu passar dados de um item já cadastrado antes, ou que você já mandou os dados, pare o processo e me pergunte se eu quero continuar mesmo assim.
