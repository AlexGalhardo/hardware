# Contexto

- Site: <https://alexgalhardo.github.io/tudohardware>
- Os dados dos produtos são salvos em formato JSON

## Tipagem do objeto JSON que você vai criar

```ts
import { SpecSection } from "../spec-configs";
import { BaseProduct, Product } from "../types";

function isMonitor(product: Product): product is Monitor {
  return product.category === "monitores";
}

export interface Monitor extends BaseProduct {
  category: "monitores";
  specs: MonitorSpecs;
}

function getMonitor(p: Product): MonitorSpecs | null {
  return isMonitor(p) ? p.specs : null;
}

export interface MonitorSpecs {
  screen: {
    size: string; // Ex: "24\"", "27\"", "32\""
    resolution: string; // Ex: "1920x1080", "2560x1440", "3840x2160"
    resolutionType:
      | "HD"
      | "Full HD"
      | "QHD"
      | "WQHD"
      | "4K UHD"
      | "5K"
      | "8K"
      | "UWQHD"
      | "DQHD";
    pixelDensity?: string; // Ex: "92 PPI", "109 PPI"
    screenType:
      | "LCD"
      | "LED"
      | "OLED"
      | "QLED"
      | "Mini-LED"
      | "Micro-LED"
      | "VA"
      | "TN";
    panelType: "IPS" | "VA" | "TN" | "OLED" | "PLS" | "ADS" | "IGZO";
    aspectRatio: "16:9" | "16:10" | "21:9" | "32:9" | "4:3" | "5:4";
    isCurved: boolean;
    curvature?: string; // Ex: "1000R", "1500R", "1800R", "Flat"
    refreshRate: string; // Ex: "60 Hz", "144 Hz", "240 Hz"
    maxRefreshRate: string;
    responseTime: string; // Ex: "1ms", "5ms"
    responseTimeGTG?: string; // Gray to Gray
    responseTimeMPRT?: string; // Moving Picture Response Time
  };
  display: {
    brightness: string; // Ex: "250 cd/m²", "400 cd/m²"
    contrast: string; // Ex: "1000:1", "3000:1"
    dynamicContrast?: string; // Ex: "100000000:1"
    viewingAngleHorizontal: string; // Ex: "178°"
    viewingAngleVertical: string; // Ex: "178°"
    colorGamut?: {
      sRGB?: string; // Ex: "99%", "125%"
      adobeRGB?: string;
      dciP3?: string;
      ntsc?: string;
    };
    colorDepth?: string; // Ex: "8-bit", "10-bit", "12-bit"
    maxColors?: string; // Ex: "16.7 milhões", "1.07 bilhões"
    hdr?: boolean;
    hdrStandards?: string[]; // Ex: ["HDR10", "HDR400", "HDR600", "Dolby Vision"]
    peakBrightness?: string; // Para HDR
  };
  features: {
    touchScreen: boolean;
    builtInSpeakers: boolean;
    speakerPower?: string; // Ex: "2W x 2"
    webcam: boolean;
    webcamResolution?: string;
    microphone: boolean;
    usb?: {
      hasHub: boolean;
      usbPorts?: string; // Ex: "4x USB 3.0"
      usbCPort?: boolean;
      usbCPower?: string; // Ex: "65W", "90W"
    };
    antiGlare: boolean;
    blueLightReduction: boolean;
    flickerFree: boolean;
    is3D: boolean;
    pip: boolean; // Picture-in-Picture
    pbp: boolean; // Picture-by-Picture
    kvm?: boolean; // KVM Switch
    voiceControl: boolean;
    remoteControl: boolean;
  };
  adjustability: {
    heightAdjustable: boolean;
    heightRange?: string; // Ex: "0-130mm"
    tiltAdjustable: boolean;
    tiltRange?: string; // Ex: "-5° a +20°"
    swivelAdjustable: boolean;
    swivelRange?: string; // Ex: "-30° a +30°"
    pivotAdjustable: boolean;
    pivotRange?: string; // Ex: "90°"
    vesaMount: boolean;
    vesaPattern?: string; // Ex: "100x100", "75x75"
  };
  connectivity: {
    hdmi?: {
      count: number;
      version?: string; // Ex: "2.0", "2.1"
    };
    displayPort?: {
      count: number;
      version?: string; // Ex: "1.2", "1.4"
    };
    dvi?: {
      count: number;
      type?: string; // Ex: "DVI-D", "DVI-I"
    };
    vga?: number;
    usbC?: {
      count: number;
      displayAlt: boolean;
      powerDelivery?: string;
    };
    thunderbolt?: {
      count: number;
      version?: string;
    };
    audioOut?: boolean;
    headphoneJack?: boolean;
    ethernet?: boolean;
  };
  gaming: {
    isGamingMonitor: boolean;
    adaptiveSync?:
      | "G-SYNC"
      | "G-SYNC Compatible"
      | "FreeSync"
      | "FreeSync Premium"
      | "FreeSync Premium Pro"
      | "Adaptive-Sync";
    gsyncUltimate?: boolean;
    lowInputLag?: boolean;
    crosshair?: boolean;
    blackStabilizer?: boolean;
    motionBlur?: string; // Ex: "ULMB", "DyAc"
    gameMode?: boolean;
  };
  power: {
    consumption: string; // Ex: "25W"
    consumptionStandby?: string;
    consumptionMax?: string;
    powerSupply: "Interno" | "Externo";
    voltage?: string; // Ex: "100-240V"
    energyRating?: string; // Ex: "Energy Star 8.0"
  };
  dimensions: {
    withStand: {
      height: string;
      width: string;
      depth: string;
      weight: string;
    };
    withoutStand: {
      height: string;
      width: string;
      depth: string;
      weight: string;
    };
  };
  additional: {
    isPortable: boolean;
    batteryPowered?: boolean;
    batteryLife?: string;
    professionalUse?: string[]; // Ex: ["Design Gráfico", "Edição de Vídeo", "CAD"]
    certifications?: string[]; // Ex: ["TÜV Rheinland", "Eye Care", "Flicker-Free"]
    warranty?: string;
  };
  ratings: {
    costBenefit: number | null;
    imageQuality: number;
    gamingPerformance: number;
    professionalUse: number;
    buildQuality: number;
    features: number;
  };
}

export const monitorSpecs: SpecSection[] = [
  {
    id: "ratings",
    title: "Avaliações",
    specs: [
      {
        key: "costBenefit",
        label: "Custo-benefício",
        getValue: (p) => getMonitor(p)?.ratings.costBenefit ?? null,
        type: "rating",
      },
      {
        key: "imageQuality",
        label: "Qualidade de Imagem",
        getValue: (p) => getMonitor(p)?.ratings.imageQuality ?? null,
        type: "rating",
      },
      {
        key: "gamingPerformance",
        label: "Performance em Jogos",
        getValue: (p) => getMonitor(p)?.ratings.gamingPerformance ?? null,
        type: "rating",
      },
      {
        key: "professionalUse",
        label: "Uso Profissional",
        getValue: (p) => getMonitor(p)?.ratings.professionalUse ?? null,
        type: "rating",
      },
      {
        key: "buildQuality",
        label: "Qualidade de Construção",
        getValue: (p) => getMonitor(p)?.ratings.buildQuality ?? null,
        type: "rating",
      },
      {
        key: "features",
        label: "Recursos",
        getValue: (p) => getMonitor(p)?.ratings.features ?? null,
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
        key: "detailedModel",
        label: "Modelo Detalhado",
        getValue: (p) => p.detailedModel ?? "-",
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
    id: "screen",
    title: "Tela",
    specs: [
      {
        key: "screenSize",
        label: "Tamanho",
        getValue: (p) => getMonitor(p)?.screen.size ?? "-",
        type: "text",
      },
      {
        key: "resolution",
        label: "Resolução",
        getValue: (p) => getMonitor(p)?.screen.resolution ?? "-",
        type: "text",
      },
      {
        key: "resolutionType",
        label: "Tipo de Resolução",
        getValue: (p) => getMonitor(p)?.screen.resolutionType ?? "-",
        type: "text",
      },
      {
        key: "pixelDensity",
        label: "Densidade de Pixels",
        getValue: (p) => getMonitor(p)?.screen.pixelDensity ?? "-",
        type: "text",
      },
      {
        key: "screenType",
        label: "Tipo de Tela",
        getValue: (p) => getMonitor(p)?.screen.screenType ?? "-",
        type: "text",
      },
      {
        key: "panelType",
        label: "Tipo de Painel",
        getValue: (p) => getMonitor(p)?.screen.panelType ?? "-",
        type: "text",
      },
      {
        key: "aspectRatio",
        label: "Proporção",
        getValue: (p) => getMonitor(p)?.screen.aspectRatio ?? "-",
        type: "text",
      },
      {
        key: "isCurved",
        label: "É Curvo",
        getValue: (p) => getMonitor(p)?.screen.isCurved ?? false,
        type: "boolean",
      },
      {
        key: "curvature",
        label: "Curvatura",
        getValue: (p) => getMonitor(p)?.screen.curvature ?? "-",
        type: "text",
      },
      {
        key: "refreshRate",
        label: "Taxa de Atualização",
        getValue: (p) => getMonitor(p)?.screen.refreshRate ?? "-",
        type: "text",
      },
      {
        key: "maxRefreshRate",
        label: "Taxa Máxima de Atualização",
        getValue: (p) => getMonitor(p)?.screen.maxRefreshRate ?? "-",
        type: "text",
      },
      {
        key: "responseTime",
        label: "Tempo de Resposta",
        getValue: (p) => getMonitor(p)?.screen.responseTime ?? "-",
        type: "text",
      },
      {
        key: "responseTimeGTG",
        label: "Tempo de Resposta GTG",
        getValue: (p) => getMonitor(p)?.screen.responseTimeGTG ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "display",
    title: "Qualidade de Imagem",
    specs: [
      {
        key: "brightness",
        label: "Brilho",
        getValue: (p) => getMonitor(p)?.display.brightness ?? "-",
        type: "text",
      },
      {
        key: "contrast",
        label: "Contraste",
        getValue: (p) => getMonitor(p)?.display.contrast ?? "-",
        type: "text",
      },
      {
        key: "dynamicContrast",
        label: "Contraste Dinâmico",
        getValue: (p) => getMonitor(p)?.display.dynamicContrast ?? "-",
        type: "text",
      },
      {
        key: "viewingAngleH",
        label: "Ângulo de Visão Horizontal",
        getValue: (p) => getMonitor(p)?.display.viewingAngleHorizontal ?? "-",
        type: "text",
      },
      {
        key: "viewingAngleV",
        label: "Ângulo de Visão Vertical",
        getValue: (p) => getMonitor(p)?.display.viewingAngleVertical ?? "-",
        type: "text",
      },
      {
        key: "sRGB",
        label: "Cobertura sRGB",
        getValue: (p) => getMonitor(p)?.display.colorGamut?.sRGB ?? "-",
        type: "text",
      },
      {
        key: "dciP3",
        label: "Cobertura DCI-P3",
        getValue: (p) => getMonitor(p)?.display.colorGamut?.dciP3 ?? "-",
        type: "text",
      },
      {
        key: "colorDepth",
        label: "Profundidade de Cor",
        getValue: (p) => getMonitor(p)?.display.colorDepth ?? "-",
        type: "text",
      },
      {
        key: "hdr",
        label: "Suporte HDR",
        getValue: (p) => getMonitor(p)?.display.hdr ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "connectivity",
    title: "Conectividade",
    specs: [
      {
        key: "hdmiCount",
        label: "Portas HDMI",
        getValue: (p) =>
          getMonitor(p)?.connectivity.hdmi?.count.toString() ?? "-",
        type: "text",
      },
      {
        key: "hdmiVersion",
        label: "Versão HDMI",
        getValue: (p) => getMonitor(p)?.connectivity.hdmi?.version ?? "-",
        type: "text",
      },
      {
        key: "displayPortCount",
        label: "Portas DisplayPort",
        getValue: (p) =>
          getMonitor(p)?.connectivity.displayPort?.count.toString() ?? "-",
        type: "text",
      },
      {
        key: "displayPortVersion",
        label: "Versão DisplayPort",
        getValue: (p) =>
          getMonitor(p)?.connectivity.displayPort?.version ?? "-",
        type: "text",
      },
      {
        key: "usbCCount",
        label: "Portas USB-C",
        getValue: (p) =>
          getMonitor(p)?.connectivity.usbC?.count.toString() ?? "-",
        type: "text",
      },
      {
        key: "usbCPower",
        label: "USB-C Power Delivery",
        getValue: (p) => getMonitor(p)?.connectivity.usbC?.powerDelivery ?? "-",
        type: "text",
      },
      {
        key: "vgaCount",
        label: "Portas VGA",
        getValue: (p) => getMonitor(p)?.connectivity.vga?.toString() ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "features",
    title: "Recursos",
    specs: [
      {
        key: "touchScreen",
        label: "Tela Touch",
        getValue: (p) => getMonitor(p)?.features.touchScreen ?? false,
        type: "boolean",
      },
      {
        key: "builtInSpeakers",
        label: "Alto-falantes Embutidos",
        getValue: (p) => getMonitor(p)?.features.builtInSpeakers ?? false,
        type: "boolean",
      },
      {
        key: "webcam",
        label: "Webcam",
        getValue: (p) => getMonitor(p)?.features.webcam ?? false,
        type: "boolean",
      },
      {
        key: "usbHub",
        label: "Hub USB",
        getValue: (p) => getMonitor(p)?.features.usb?.hasHub ?? false,
        type: "boolean",
      },
      {
        key: "antiGlare",
        label: "Anti-reflexo",
        getValue: (p) => getMonitor(p)?.features.antiGlare ?? false,
        type: "boolean",
      },
      {
        key: "blueLightReduction",
        label: "Redução de Luz Azul",
        getValue: (p) => getMonitor(p)?.features.blueLightReduction ?? false,
        type: "boolean",
      },
      {
        key: "flickerFree",
        label: "Sem Flicker",
        getValue: (p) => getMonitor(p)?.features.flickerFree ?? false,
        type: "boolean",
      },
      {
        key: "pip",
        label: "PIP",
        getValue: (p) => getMonitor(p)?.features.pip ?? false,
        type: "boolean",
      },
      {
        key: "pbp",
        label: "PBP",
        getValue: (p) => getMonitor(p)?.features.pbp ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "adjustability",
    title: "Ajustes",
    specs: [
      {
        key: "heightAdjustable",
        label: "Altura Ajustável",
        getValue: (p) => getMonitor(p)?.adjustability.heightAdjustable ?? false,
        type: "boolean",
      },
      {
        key: "heightRange",
        label: "Faixa de Altura",
        getValue: (p) => getMonitor(p)?.adjustability.heightRange ?? "-",
        type: "text",
      },
      {
        key: "tiltAdjustable",
        label: "Inclinação Ajustável",
        getValue: (p) => getMonitor(p)?.adjustability.tiltAdjustable ?? false,
        type: "boolean",
      },
      {
        key: "swivelAdjustable",
        label: "Rotação Horizontal",
        getValue: (p) => getMonitor(p)?.adjustability.swivelAdjustable ?? false,
        type: "boolean",
      },
      {
        key: "pivotAdjustable",
        label: "Pivô (Rotação 90°)",
        getValue: (p) => getMonitor(p)?.adjustability.pivotAdjustable ?? false,
        type: "boolean",
      },
      {
        key: "vesaMount",
        label: "Suporte VESA",
        getValue: (p) => getMonitor(p)?.adjustability.vesaMount ?? false,
        type: "boolean",
      },
      {
        key: "vesaPattern",
        label: "Padrão VESA",
        getValue: (p) => getMonitor(p)?.adjustability.vesaPattern ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "gaming",
    title: "Gaming",
    specs: [
      {
        key: "isGamingMonitor",
        label: "Monitor Gamer",
        getValue: (p) => getMonitor(p)?.gaming.isGamingMonitor ?? false,
        type: "boolean",
      },
      {
        key: "adaptiveSync",
        label: "Sincronização Adaptativa",
        getValue: (p) => getMonitor(p)?.gaming.adaptiveSync ?? "-",
        type: "text",
      },
      {
        key: "gsyncUltimate",
        label: "G-SYNC Ultimate",
        getValue: (p) => getMonitor(p)?.gaming.gsyncUltimate ?? false,
        type: "boolean",
      },
      {
        key: "lowInputLag",
        label: "Baixa Latência",
        getValue: (p) => getMonitor(p)?.gaming.lowInputLag ?? false,
        type: "boolean",
      },
      {
        key: "gameMode",
        label: "Modo Game",
        getValue: (p) => getMonitor(p)?.gaming.gameMode ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "power",
    title: "Energia",
    specs: [
      {
        key: "consumption",
        label: "Consumo",
        getValue: (p) => getMonitor(p)?.power.consumption ?? "-",
        type: "text",
      },
      {
        key: "consumptionMax",
        label: "Consumo Máximo",
        getValue: (p) => getMonitor(p)?.power.consumptionMax ?? "-",
        type: "text",
      },
      {
        key: "powerSupply",
        label: "Fonte de Alimentação",
        getValue: (p) => getMonitor(p)?.power.powerSupply ?? "-",
        type: "text",
      },
      {
        key: "energyRating",
        label: "Certificação Energética",
        getValue: (p) => getMonitor(p)?.power.energyRating ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "dimensions",
    title: "Dimensões e Peso",
    specs: [
      {
        key: "heightWithStand",
        label: "Altura (com suporte)",
        getValue: (p) => getMonitor(p)?.dimensions.withStand.height ?? "-",
        type: "text",
      },
      {
        key: "widthWithStand",
        label: "Largura (com suporte)",
        getValue: (p) => getMonitor(p)?.dimensions.withStand.width ?? "-",
        type: "text",
      },
      {
        key: "depthWithStand",
        label: "Profundidade (com suporte)",
        getValue: (p) => getMonitor(p)?.dimensions.withStand.depth ?? "-",
        type: "text",
      },
      {
        key: "weightWithStand",
        label: "Peso (com suporte)",
        getValue: (p) => getMonitor(p)?.dimensions.withStand.weight ?? "-",
        type: "text",
      },
      {
        key: "heightWithoutStand",
        label: "Altura (sem suporte)",
        getValue: (p) => getMonitor(p)?.dimensions.withoutStand.height ?? "-",
        type: "text",
      },
      {
        key: "widthWithoutStand",
        label: "Largura (sem suporte)",
        getValue: (p) => getMonitor(p)?.dimensions.withoutStand.width ?? "-",
        type: "text",
      },
      {
        key: "depthWithoutStand",
        label: "Profundidade (sem suporte)",
        getValue: (p) => getMonitor(p)?.dimensions.withoutStand.depth ?? "-",
        type: "text",
      },
      {
        key: "weightWithoutStand",
        label: "Peso (sem suporte)",
        getValue: (p) => getMonitor(p)?.dimensions.withoutStand.weight ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "additional",
    title: "Informações Adicionais",
    specs: [
      {
        key: "isPortable",
        label: "É Portátil",
        getValue: (p) => getMonitor(p)?.additional.isPortable ?? false,
        type: "boolean",
      },
      {
        key: "batteryPowered",
        label: "Alimentado por Bateria",
        getValue: (p) => getMonitor(p)?.additional.batteryPowered ?? false,
        type: "boolean",
      },
      {
        key: "warranty",
        label: "Garantia",
        getValue: (p) => getMonitor(p)?.additional.warranty ?? "-",
        type: "text",
      },
    ],
  },
];
```

## Exemplo de Objeto Json Monitor que você deve fazer

```json
{
  "id": "philips-221v8lb",
  "name": "221V8LB",
  "brand": "Philips",
  "line": "V Line",
  "model": "221V8LB",
  "detailedModel": "221V8LB",
  "alphanumericModel": "221V8LB",
  "color": "Preto",
  "image": "https://http2.mlstatic.com/D_NQ_NP_2X_725058-MLA99936607109_112025-F.webp",
  "price": 0,
  "releaseDate": "2022",
  "releaseYear": 2022,
  "category": "monitores",
  "mercadolivreUrl": "https://mercadolivre.com/sec/2Nd6gAs",
  "manufacturer": "Philips",
  "specs": {
    "screen": {
      "size": "21.5\"",
      "resolution": "1920x1080",
      "resolutionType": "Full HD",
      "pixelDensity": "102.46 PPI",
      "screenType": "LED",
      "panelType": "VA",
      "aspectRatio": "16:9",
      "isCurved": false,
      "curvature": "Flat",
      "refreshRate": "100 Hz",
      "maxRefreshRate": "100 Hz",
      "responseTime": "4ms",
      "responseTimeGTG": "4ms",
      "responseTimeMPRT": "1ms"
    },
    "display": {
      "brightness": "250 cd/m²",
      "contrast": "3000:1",
      "dynamicContrast": "Mega Infinity DCR",
      "viewingAngleHorizontal": "178°",
      "viewingAngleVertical": "178°",
      "colorGamut": {
        "sRGB": "100%",
        "adobeRGB": null,
        "dciP3": null,
        "ntsc": null
      },
      "colorDepth": "8-bit",
      "maxColors": "16.7 milhões",
      "hdr": false,
      "hdrStandards": null,
      "peakBrightness": null
    },
    "features": {
      "touchScreen": false,
      "builtInSpeakers": false,
      "speakerPower": null,
      "webcam": false,
      "webcamResolution": null,
      "microphone": false,
      "usb": {
        "hasHub": false,
        "usbPorts": null,
        "usbCPort": false,
        "usbCPower": null
      },
      "antiGlare": true,
      "blueLightReduction": true,
      "flickerFree": true,
      "is3D": false,
      "pip": false,
      "pbp": false,
      "kvm": false,
      "voiceControl": false,
      "remoteControl": false
    },
    "adjustability": {
      "heightAdjustable": false,
      "heightRange": null,
      "tiltAdjustable": true,
      "tiltRange": "-5° a +20°",
      "swivelAdjustable": false,
      "swivelRange": null,
      "pivotAdjustable": false,
      "pivotRange": null,
      "vesaMount": true,
      "vesaPattern": "100x100"
    },
    "connectivity": {
      "hdmi": {
        "count": 1,
        "version": "1.4"
      },
      "displayPort": null,
      "dvi": null,
      "vga": 1,
      "usbC": null,
      "thunderbolt": null,
      "audioOut": false,
      "headphoneJack": true,
      "ethernet": false
    },
    "gaming": {
      "isGamingMonitor": false,
      "adaptiveSync": "Adaptive-Sync",
      "gsyncUltimate": false,
      "lowInputLag": false,
      "crosshair": false,
      "blackStabilizer": false,
      "motionBlur": null,
      "gameMode": false
    },
    "power": {
      "consumption": "18W",
      "consumptionStandby": "0.3W",
      "consumptionMax": "25W",
      "powerSupply": "Interno",
      "voltage": "100-240V",
      "energyRating": null
    },
    "dimensions": {
      "withStand": {
        "height": "369 mm",
        "width": "493 mm",
        "depth": "220 mm",
        "weight": "2.63 kg"
      },
      "withoutStand": {
        "height": "286 mm",
        "width": "493 mm",
        "depth": "44 mm",
        "weight": "2.23 kg"
      }
    },
    "additional": {
      "isPortable": false,
      "batteryPowered": false,
      "batteryLife": null,
      "professionalUse": ["Escritório", "Trabalho Remoto", "Produtividade"],
      "certifications": null,
      "warranty": "4 anos"
    },
    "ratings": {
      "costBenefit": 9,
      "imageQuality": 7,
      "gamingPerformance": 6,
      "professionalUse": 8,
      "buildQuality": 7,
      "features": 6
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
"monitores": [
      {
        "name": "S3",
        "brand": "Samsung",
        "detailedModel": "LS24D300GALMZD",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_931100-MLA99973037971_112025-F.webp"
      },
      {
        "name": "AC1025",
        "brand": "Bettdow",
        "detailedModel": "AC1025",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_767275-MLA99470531186_112025-F.webp"
      },
      {
        "name": "221V8LB",
        "brand": "Philips",
        "detailedModel": "221V8LB",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_725058-MLA99936607109_112025-F.webp"
      },
      {
        "name": "ULT200",
        "brand": "Ultra",
        "detailedModel": "ULT200",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_922453-MLA91982845791_092025-F.webp"
      },
      {
        "name": "24GS60F-B",
        "brand": "LG",
        "detailedModel": "24GS60F-B",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_672627-MLA104455014957_012026-F.webp"
      },
      {
        "name": "BM19K4HVW",
        "brand": "Bluecase",
        "detailedModel": "BM19K4HVW",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_780207-MLA100070978565_122025-F.webp"
      },
      {
        "name": "MW21V",
        "brand": "Fmaxx",
        "detailedModel": "MW21V",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_738952-MLA99558122010_122025-F.webp"
      },
      {
        "name": "MQ19V",
        "brand": "Fmaxx",
        "detailedModel": "MQ19V",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_631062-MLA99414535008_112025-F.webp"
      },
      {
        "name": "VX190X",
        "brand": "VXpro",
        "detailedModel": "VX190X",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_828320-MLA99948248207_112025-F.webp"
      },
      {
        "name": "27G4/P",
        "brand": "AOC",
        "detailedModel": "27G4/P",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_652244-MLA99448900052_112025-F.webp"
      },
      {
        "name": "MK241Y",
        "brand": "Acer",
        "detailedModel": "MK241Y FLT",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_739717-MLA97428488825_112025-F.webp"
      },
      {
        "name": "P2425H",
        "brand": "Dell",
        "detailedModel": "P2425H",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_966189-MLA99465976046_112025-F.webp"
      },
      {
        "name": "CQ32G4E",
        "brand": "AOC",
        "detailedModel": "CQ32G4E",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_847859-MLA94128239876_102025-F.webp"
      },
      {
        "name": "25G64",
        "brand": "TCL",
        "detailedModel": "25G64",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_723939-MLA103720530496_012026-F.webp"
      },
      {
        "name": "Odyssey G30",
        "brand": "Samsung",
        "detailedModel": "LS24BG300ELMZD",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_680360-MLA99954411375_112025-F.webp"
      },
      {
        "name": "22MP410-B",
        "brand": "LG",
        "detailedModel": "22MP410-B",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_890876-MLA99938471091_112025-F.webp"
      },
      {
        "name": "MWV23",
        "brand": "ViewPro",
        "detailedModel": "MWV23",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_605657-MLA102448595697_122025-F.webp"
      },
      {
        "name": "KG241Y P3BIP",
        "brand": "Acer",
        "detailedModel": "KG241Y P3BIP",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_993160-MLA100033539815_122025-F.webp"
      },
      {
        "name": "29WQ500-B",
        "brand": "LG",
        "detailedModel": "29WQ500-B",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_863773-MLA96861169915_102025-F.webp"
      }
    ]
```

- Se eu passar dados de um item já cadastrado antes, ou que você já mandou os dados, pare o processo e me pergunte se eu quero continuar mesmo assim.