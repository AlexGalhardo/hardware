# Contexto

- Site: <https://tudohardware.com>
- Os dados dos produtos são salvos em formato JSON

## Tipagem do objeto JSON que você vai criar

```ts
import { SpecSection } from "../spec-configs";
import { BaseProduct, Product } from "../types";

function isDrone(product: Product): product is Drone {
  return product.category === "drones";
}

export interface Drone extends BaseProduct {
  category: "drones";
  specs: DroneSpecs;
}

function getDrone(p: Product): DroneSpecs | null {
  return isDrone(p) ? p.specs : null;
}

export interface DroneSpecs {
  type: "Aéreo" | "Aquático" | "Terrestre" | "Híbrido";
  isMini: boolean;
  isFoldable?: boolean;
  camera: {
    hasCamera: boolean;
    resolution?:
      | "720p"
      | "HD"
      | "Full HD"
      | "2K"
      | "2.7K"
      | "4K"
      | "5.4K"
      | "6K"
      | "8K";
    sensor?: string;
    megapixels?: number;
    fov?: string;
    aperture?: string;
    iso?: string;
    shutterSpeed?: string;
    fps?: string;
    hasDualCamera?: boolean;
    hasNightVision?: boolean;
    hasThermalCamera?: boolean;
    photoFormats?: string[];
    videoFormats?: string[];
    hasRawSupport?: boolean;
    bitrate?: string;
  };
  gimbal?: {
    hasGimbal: boolean;
    type?: "Mecânico" | "Eletrônico" | "Híbrido";
    axes?: "1-Axis" | "2-Axis" | "3-Axis" | "4-Axis";
    tiltRange?: string;
    panRange?: string;
    rollRange?: string;
    stabilization?: string[];
  };
  flight: {
    maxFlightTime: string;
    maxSpeed?: string;
    maxDistance?: string;
    maxAltitude?: string;
    windResistance?: string;
    motors: number;
    propellerSize?: string;
  };
  battery: {
    capacity?: string;
    voltage?: string;
    type?: string;
    quantity: number;
    chargingTime?: string;
    intelligentBattery?: boolean;
    fastCharging?: boolean;
  };
  transmission: {
    range?: string;
    frequency?: string;
    technology?: string;
    maxResolution?: string;
    latency?: string;
    liveView?: boolean;
  };
  controller: {
    hasController: boolean;
    type?:
      | "Controle padrão"
      | "Smart Controller"
      | "RC Pro"
      | "FPV Goggles"
      | "Smartphone";
    screenSize?: string;
    hasBuiltInScreen?: boolean;
    batteryLife?: string;
    controlledBySmartphone?: boolean;
    hasTouch?: boolean;
  };
  obstacleAvoidance?: {
    hasObstacleAvoidance: boolean;
    type?:
      | "Visual"
      | "Infrared"
      | "ToF"
      | "LiDAR"
      | "Ultrasonic"
      | "Radar"
      | "Multi-sensor";
    directions?: string[];
    detectionRange?: string;
    omniDirectional?: boolean;
    apas?: string;
  };
  positioning: {
    hasGPS: boolean;
    gpsType?: string[];
    hasVisionPositioning?: boolean;
    hasInfraredPositioning?: boolean;
    rtkPositioning?: boolean;
  };
  intelligentFeatures: {
    autoReturn?: boolean;
    followMe?: boolean;
    activeTrack?: boolean;
    pointOfInterest?: boolean;
    waypoint?: boolean;
    tapFly?: boolean;
    gesture?: boolean;
    quickShots?: string[];
    panorama?: boolean;
    hyperlapse?: boolean;
    masterShots?: boolean;
    spin360?: boolean;
    altitudeHold?: boolean;
    headlessMode?: boolean;
    aiTracking?: boolean;
    voiceControl?: boolean;
  };
  connectivity: {
    hasWiFi: boolean;
    wiFiFrequency?: string;
    hasBluetooth?: boolean;
    hasUSB?: boolean;
    ports?: string[];
  };
  storage?: {
    internal?: string;
    externalSupport?: string;
    maxCardSize?: string;
  };
  temperature?: {
    min?: string;
    max?: string;
  };
  dimensions: {
    folded?: string;
    unfolded?: string;
    weight: string;
  };
  accessories?: {
    hasProtectors: boolean;
    includedItems?: string[];
    carryingCase?: boolean;
  };
  certifications?: {
    anatelNumber?: string;
    fccId?: string;
    ceMarking?: boolean;
  };
  other?: {
    isFPV?: boolean;
    isRacing?: boolean;
    waterResistance?: string;
    recommendedUses?: string[];
    minAge?: number;
    noiseLevel?: string;
    ledLights?: boolean;
    warranty?: string;
  };
  ratings: {
    costBenefit: number | null;
    cameraQuality: number;
    flightPerformance: number;
    features: number;
    portability: number;
  };
}

export const droneSpecs: SpecSection[] = [
  {
    id: "ratings",
    title: "Notas",
    specs: [
      {
        key: "costBenefit",
        label: "Custo-benefício",
        getValue: (p) => getDrone(p)?.ratings.costBenefit ?? null,
        type: "rating",
      },
      {
        key: "cameraQuality",
        label: "Qualidade da Câmera",
        getValue: (p) => getDrone(p)?.ratings.cameraQuality ?? null,
        type: "rating",
      },
      {
        key: "flightPerformance",
        label: "Performance de Voo",
        getValue: (p) => getDrone(p)?.ratings.flightPerformance ?? null,
        type: "rating",
      },
      {
        key: "features",
        label: "Recursos",
        getValue: (p) => getDrone(p)?.ratings.features ?? null,
        type: "rating",
      },
      {
        key: "portability",
        label: "Portabilidade",
        getValue: (p) => getDrone(p)?.ratings.portability ?? null,
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
        key: "version",
        label: "Versão",
        getValue: (p) => p.version ?? "-",
        type: "text",
      },
      {
        key: "color",
        label: "Cor",
        getValue: (p) => p.color ?? "-",
        type: "text",
      },
      {
        key: "manufacturer",
        label: "Fabricante",
        getValue: (p) => p.manufacturer ?? "-",
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
    id: "specifications",
    title: "Especificações",
    specs: [
      {
        key: "type",
        label: "Tipo",
        getValue: (p) => getDrone(p)?.type ?? "-",
        type: "text",
      },
      {
        key: "isMini",
        label: "Mini Drone",
        getValue: (p) => getDrone(p)?.isMini ?? false,
        type: "boolean",
      },
      {
        key: "isFoldable",
        label: "Dobrável",
        getValue: (p) => getDrone(p)?.isFoldable ?? false,
        type: "boolean",
      },
      {
        key: "anatelNumber",
        label: "Homologação Anatel",
        getValue: (p) =>
          getDrone(p)?.certifications?.anatelNumber ?? p.anatelNumber ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "camera",
    title: "Câmera",
    specs: [
      {
        key: "hasCamera",
        label: "Possui Câmera",
        getValue: (p) => getDrone(p)?.camera.hasCamera ?? false,
        type: "boolean",
      },
      {
        key: "resolution",
        label: "Resolução",
        getValue: (p) => getDrone(p)?.camera.resolution ?? "-",
        type: "text",
      },
      {
        key: "sensor",
        label: "Sensor",
        getValue: (p) => getDrone(p)?.camera.sensor ?? "-",
        type: "text",
      },
      {
        key: "megapixels",
        label: "Megapixels",
        getValue: (p) => getDrone(p)?.camera.megapixels?.toString() ?? "-",
        type: "text",
      },
      {
        key: "fov",
        label: "Campo de Visão",
        getValue: (p) => getDrone(p)?.camera.fov ?? "-",
        type: "text",
      },
      {
        key: "aperture",
        label: "Abertura",
        getValue: (p) => getDrone(p)?.camera.aperture ?? "-",
        type: "text",
      },
      {
        key: "fps",
        label: "FPS",
        getValue: (p) => getDrone(p)?.camera.fps ?? "-",
        type: "text",
      },
      {
        key: "hasDualCamera",
        label: "Câmera Dual",
        getValue: (p) => getDrone(p)?.camera.hasDualCamera ?? false,
        type: "boolean",
      },
      {
        key: "hasNightVision",
        label: "Visão Noturna",
        getValue: (p) => getDrone(p)?.camera.hasNightVision ?? false,
        type: "boolean",
      },
      {
        key: "hasThermalCamera",
        label: "Câmera Térmica",
        getValue: (p) => getDrone(p)?.camera.hasThermalCamera ?? false,
        type: "boolean",
      },
      {
        key: "hasRawSupport",
        label: "Suporte RAW",
        getValue: (p) => getDrone(p)?.camera.hasRawSupport ?? false,
        type: "boolean",
      },
      {
        key: "bitrate",
        label: "Bitrate",
        getValue: (p) => getDrone(p)?.camera.bitrate ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "gimbal",
    title: "Gimbal",
    specs: [
      {
        key: "hasGimbal",
        label: "Possui Gimbal",
        getValue: (p) => getDrone(p)?.gimbal?.hasGimbal ?? false,
        type: "boolean",
      },
      {
        key: "gimbalType",
        label: "Tipo",
        getValue: (p) => getDrone(p)?.gimbal?.type ?? "-",
        type: "text",
      },
      {
        key: "axes",
        label: "Eixos",
        getValue: (p) => getDrone(p)?.gimbal?.axes ?? "-",
        type: "text",
      },
      {
        key: "tiltRange",
        label: "Range de Inclinação",
        getValue: (p) => getDrone(p)?.gimbal?.tiltRange ?? "-",
        type: "text",
      },
      {
        key: "panRange",
        label: "Range de Pan",
        getValue: (p) => getDrone(p)?.gimbal?.panRange ?? "-",
        type: "text",
      },
      {
        key: "stabilization",
        label: "Estabilização",
        getValue: (p) => getDrone(p)?.gimbal?.stabilization?.join(", ") ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "flight",
    title: "Voo",
    specs: [
      {
        key: "maxFlightTime",
        label: "Tempo Máximo de Voo",
        getValue: (p) => getDrone(p)?.flight.maxFlightTime ?? "-",
        type: "text",
      },
      {
        key: "maxSpeed",
        label: "Velocidade Máxima",
        getValue: (p) => getDrone(p)?.flight.maxSpeed ?? "-",
        type: "text",
      },
      {
        key: "maxDistance",
        label: "Distância Máxima",
        getValue: (p) => getDrone(p)?.flight.maxDistance ?? "-",
        type: "text",
      },
      {
        key: "maxAltitude",
        label: "Altitude Máxima",
        getValue: (p) => getDrone(p)?.flight.maxAltitude ?? "-",
        type: "text",
      },
      {
        key: "windResistance",
        label: "Resistência ao Vento",
        getValue: (p) => getDrone(p)?.flight.windResistance ?? "-",
        type: "text",
      },
      {
        key: "motors",
        label: "Motores",
        getValue: (p) => getDrone(p)?.flight.motors?.toString() ?? "-",
        type: "text",
      },
      {
        key: "propellerSize",
        label: "Tamanho da Hélice",
        getValue: (p) => getDrone(p)?.flight.propellerSize ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "battery",
    title: "Bateria",
    specs: [
      {
        key: "batteryCapacity",
        label: "Capacidade",
        getValue: (p) => getDrone(p)?.battery.capacity ?? "-",
        type: "text",
      },
      {
        key: "batteryVoltage",
        label: "Voltagem",
        getValue: (p) => getDrone(p)?.battery.voltage ?? "-",
        type: "text",
      },
      {
        key: "batteryType",
        label: "Tipo",
        getValue: (p) => getDrone(p)?.battery.type ?? "-",
        type: "text",
      },
      {
        key: "batteryQuantity",
        label: "Quantidade Incluída",
        getValue: (p) => getDrone(p)?.battery.quantity?.toString() ?? "-",
        type: "text",
      },
      {
        key: "chargingTime",
        label: "Tempo de Carga",
        getValue: (p) => getDrone(p)?.battery.chargingTime ?? "-",
        type: "text",
      },
      {
        key: "intelligentBattery",
        label: "Bateria Inteligente",
        getValue: (p) => getDrone(p)?.battery.intelligentBattery ?? false,
        type: "boolean",
      },
      {
        key: "fastCharging",
        label: "Carga Rápida",
        getValue: (p) => getDrone(p)?.battery.fastCharging ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "transmission",
    title: "Transmissão",
    specs: [
      {
        key: "transmissionRange",
        label: "Alcance",
        getValue: (p) => getDrone(p)?.transmission.range ?? "-",
        type: "text",
      },
      {
        key: "frequency",
        label: "Frequência",
        getValue: (p) => getDrone(p)?.transmission.frequency ?? "-",
        type: "text",
      },
      {
        key: "technology",
        label: "Tecnologia",
        getValue: (p) => getDrone(p)?.transmission.technology ?? "-",
        type: "text",
      },
      {
        key: "maxResolution",
        label: "Resolução Máxima",
        getValue: (p) => getDrone(p)?.transmission.maxResolution ?? "-",
        type: "text",
      },
      {
        key: "latency",
        label: "Latência",
        getValue: (p) => getDrone(p)?.transmission.latency ?? "-",
        type: "text",
      },
      {
        key: "liveView",
        label: "Visualização ao Vivo",
        getValue: (p) => getDrone(p)?.transmission.liveView ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "controller",
    title: "Controle Remoto",
    specs: [
      {
        key: "hasController",
        label: "Possui Controle",
        getValue: (p) => getDrone(p)?.controller.hasController ?? false,
        type: "boolean",
      },
      {
        key: "controllerType",
        label: "Tipo",
        getValue: (p) => getDrone(p)?.controller.type ?? "-",
        type: "text",
      },
      {
        key: "screenSize",
        label: "Tamanho da Tela",
        getValue: (p) => getDrone(p)?.controller.screenSize ?? "-",
        type: "text",
      },
      {
        key: "hasBuiltInScreen",
        label: "Tela Embutida",
        getValue: (p) => getDrone(p)?.controller.hasBuiltInScreen ?? false,
        type: "boolean",
      },
      {
        key: "controllerBattery",
        label: "Bateria do Controle",
        getValue: (p) => getDrone(p)?.controller.batteryLife ?? "-",
        type: "text",
      },
      {
        key: "controlledBySmartphone",
        label: "Controle por Smartphone",
        getValue: (p) =>
          getDrone(p)?.controller.controlledBySmartphone ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "obstacleAvoidance",
    title: "Desvio de Obstáculos",
    specs: [
      {
        key: "hasObstacleAvoidance",
        label: "Possui Desvio de Obstáculos",
        getValue: (p) =>
          getDrone(p)?.obstacleAvoidance?.hasObstacleAvoidance ?? false,
        type: "boolean",
      },
      {
        key: "avoidanceType",
        label: "Tipo",
        getValue: (p) => getDrone(p)?.obstacleAvoidance?.type ?? "-",
        type: "text",
      },
      {
        key: "directions",
        label: "Direções",
        getValue: (p) =>
          getDrone(p)?.obstacleAvoidance?.directions?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "detectionRange",
        label: "Alcance de Detecção",
        getValue: (p) => getDrone(p)?.obstacleAvoidance?.detectionRange ?? "-",
        type: "text",
      },
      {
        key: "omniDirectional",
        label: "Omnidirecional",
        getValue: (p) =>
          getDrone(p)?.obstacleAvoidance?.omniDirectional ?? false,
        type: "boolean",
      },
      {
        key: "apas",
        label: "APAS",
        getValue: (p) => getDrone(p)?.obstacleAvoidance?.apas ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "positioning",
    title: "Posicionamento",
    specs: [
      {
        key: "hasGPS",
        label: "GPS",
        getValue: (p) => getDrone(p)?.positioning.hasGPS ?? false,
        type: "boolean",
      },
      {
        key: "gpsType",
        label: "Tipo de GPS",
        getValue: (p) => getDrone(p)?.positioning.gpsType?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "hasVisionPositioning",
        label: "Posicionamento Visual",
        getValue: (p) => getDrone(p)?.positioning.hasVisionPositioning ?? false,
        type: "boolean",
      },
      {
        key: "hasInfraredPositioning",
        label: "Posicionamento Infravermelho",
        getValue: (p) =>
          getDrone(p)?.positioning.hasInfraredPositioning ?? false,
        type: "boolean",
      },
      {
        key: "rtkPositioning",
        label: "RTK",
        getValue: (p) => getDrone(p)?.positioning.rtkPositioning ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "intelligentFeatures",
    title: "Recursos Inteligentes",
    specs: [
      {
        key: "autoReturn",
        label: "Retorno Automático",
        getValue: (p) => getDrone(p)?.intelligentFeatures.autoReturn ?? false,
        type: "boolean",
      },
      {
        key: "followMe",
        label: "Follow Me",
        getValue: (p) => getDrone(p)?.intelligentFeatures.followMe ?? false,
        type: "boolean",
      },
      {
        key: "activeTrack",
        label: "ActiveTrack",
        getValue: (p) => getDrone(p)?.intelligentFeatures.activeTrack ?? false,
        type: "boolean",
      },
      {
        key: "pointOfInterest",
        label: "Point of Interest",
        getValue: (p) =>
          getDrone(p)?.intelligentFeatures.pointOfInterest ?? false,
        type: "boolean",
      },
      {
        key: "waypoint",
        label: "Waypoint",
        getValue: (p) => getDrone(p)?.intelligentFeatures.waypoint ?? false,
        type: "boolean",
      },
      {
        key: "tapFly",
        label: "TapFly",
        getValue: (p) => getDrone(p)?.intelligentFeatures.tapFly ?? false,
        type: "boolean",
      },
      {
        key: "gesture",
        label: "Controle por Gestos",
        getValue: (p) => getDrone(p)?.intelligentFeatures.gesture ?? false,
        type: "boolean",
      },
      {
        key: "quickShots",
        label: "QuickShots",
        getValue: (p) =>
          getDrone(p)?.intelligentFeatures.quickShots?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "panorama",
        label: "Panorama",
        getValue: (p) => getDrone(p)?.intelligentFeatures.panorama ?? false,
        type: "boolean",
      },
      {
        key: "hyperlapse",
        label: "Hyperlapse",
        getValue: (p) => getDrone(p)?.intelligentFeatures.hyperlapse ?? false,
        type: "boolean",
      },
      {
        key: "masterShots",
        label: "MasterShots",
        getValue: (p) => getDrone(p)?.intelligentFeatures.masterShots ?? false,
        type: "boolean",
      },
      {
        key: "spin360",
        label: "Giro 360°",
        getValue: (p) => getDrone(p)?.intelligentFeatures.spin360 ?? false,
        type: "boolean",
      },
      {
        key: "altitudeHold",
        label: "Retenção de Altitude",
        getValue: (p) => getDrone(p)?.intelligentFeatures.altitudeHold ?? false,
        type: "boolean",
      },
      {
        key: "headlessMode",
        label: "Modo Sem Cabeça",
        getValue: (p) => getDrone(p)?.intelligentFeatures.headlessMode ?? false,
        type: "boolean",
      },
      {
        key: "aiTracking",
        label: "Rastreamento IA",
        getValue: (p) => getDrone(p)?.intelligentFeatures.aiTracking ?? false,
        type: "boolean",
      },
      {
        key: "voiceControl",
        label: "Controle por Voz",
        getValue: (p) => getDrone(p)?.intelligentFeatures.voiceControl ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "connectivity",
    title: "Conectividade",
    specs: [
      {
        key: "hasWiFi",
        label: "Wi-Fi",
        getValue: (p) => getDrone(p)?.connectivity.hasWiFi ?? false,
        type: "boolean",
      },
      {
        key: "wiFiFrequency",
        label: "Frequência Wi-Fi",
        getValue: (p) => getDrone(p)?.connectivity.wiFiFrequency ?? "-",
        type: "text",
      },
      {
        key: "hasBluetooth",
        label: "Bluetooth",
        getValue: (p) => getDrone(p)?.connectivity.hasBluetooth ?? false,
        type: "boolean",
      },
      {
        key: "hasUSB",
        label: "USB",
        getValue: (p) => getDrone(p)?.connectivity.hasUSB ?? false,
        type: "boolean",
      },
      {
        key: "ports",
        label: "Portas",
        getValue: (p) => getDrone(p)?.connectivity.ports?.join(", ") ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "storage",
    title: "Armazenamento",
    specs: [
      {
        key: "internalStorage",
        label: "Armazenamento Interno",
        getValue: (p) => getDrone(p)?.storage?.internal ?? "-",
        type: "text",
      },
      {
        key: "externalSupport",
        label: "Suporte Externo",
        getValue: (p) => getDrone(p)?.storage?.externalSupport ?? "-",
        type: "text",
      },
      {
        key: "maxCardSize",
        label: "Tamanho Máximo do Cartão",
        getValue: (p) => getDrone(p)?.storage?.maxCardSize ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "dimensions",
    title: "Dimensões",
    specs: [
      {
        key: "folded",
        label: "Dobrado",
        getValue: (p) => getDrone(p)?.dimensions.folded ?? "-",
        type: "text",
      },
      {
        key: "unfolded",
        label: "Desdobrado",
        getValue: (p) => getDrone(p)?.dimensions.unfolded ?? "-",
        type: "text",
      },
      {
        key: "weight",
        label: "Peso",
        getValue: (p) => getDrone(p)?.dimensions.weight ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "temperature",
    title: "Temperatura",
    specs: [
      {
        key: "minTemp",
        label: "Temperatura Mínima",
        getValue: (p) => getDrone(p)?.temperature?.min ?? "-",
        type: "text",
      },
      {
        key: "maxTemp",
        label: "Temperatura Máxima",
        getValue: (p) => getDrone(p)?.temperature?.max ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "accessories",
    title: "Acessórios",
    specs: [
      {
        key: "hasProtectors",
        label: "Protetor de Hélices",
        getValue: (p) => getDrone(p)?.accessories?.hasProtectors ?? false,
        type: "boolean",
      },
      {
        key: "carryingCase",
        label: "Maleta",
        getValue: (p) => getDrone(p)?.accessories?.carryingCase ?? false,
        type: "boolean",
      },
      {
        key: "includedItems",
        label: "Itens Inclusos",
        getValue: (p) =>
          getDrone(p)?.accessories?.includedItems?.join(", ") ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "other",
    title: "Outros",
    specs: [
      {
        key: "isFPV",
        label: "FPV",
        getValue: (p) => getDrone(p)?.other?.isFPV ?? false,
        type: "boolean",
      },
      {
        key: "isRacing",
        label: "Racing",
        getValue: (p) => getDrone(p)?.other?.isRacing ?? false,
        type: "boolean",
      },
      {
        key: "waterResistance",
        label: "Resistência à Água",
        getValue: (p) => getDrone(p)?.other?.waterResistance ?? "-",
        type: "text",
      },
      {
        key: "recommendedUses",
        label: "Usos Recomendados",
        getValue: (p) => getDrone(p)?.other?.recommendedUses?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "minAge",
        label: "Idade Mínima",
        getValue: (p) => getDrone(p)?.other?.minAge?.toString() ?? "-",
        type: "text",
      },
      {
        key: "noiseLevel",
        label: "Nível de Ruído",
        getValue: (p) => getDrone(p)?.other?.noiseLevel ?? "-",
        type: "text",
      },
      {
        key: "ledLights",
        label: "Luzes LED",
        getValue: (p) => getDrone(p)?.other?.ledLights ?? false,
        type: "boolean",
      },
      {
        key: "warranty",
        label: "Garantia",
        getValue: (p) => getDrone(p)?.other?.warranty ?? "-",
        type: "text",
      },
    ],
  },
];
```

## Exemplo Produto Object JSON de Drone que você deve fazer

```json
{
  "id": "mini-drone-e998-pro",
  "name": "Mini Drone E998 Pro",
  "category": "drones",
  "brand": "Genérica",
  "line": null,
  "model": "E998 Pro",
  "version": null,
  "color": "Cinza-escuro",
  "manufacturer": null,
  "releaseDate": null,
  "releaseYear": null,
  "anatelNumber": null,
  "mercadolivreUrl": "https://mercadolivre.com/sec/2p693ep",
  "image": "https://http2.mlstatic.com/D_NQ_NP_2X_792056-MLA91557630696_092025-F.webp",
  "specs": {
    "type": "Aéreo",
    "isMini": true,
    "isFoldable": true,
    "camera": {
      "hasCamera": true,
      "resolution": "HD",
      "sensor": null,
      "megapixels": null,
      "fov": null,
      "aperture": null,
      "iso": null,
      "shutterSpeed": null,
      "fps": null,
      "hasDualCamera": true,
      "hasNightVision": false,
      "hasThermalCamera": false,
      "photoFormats": null,
      "videoFormats": null,
      "hasRawSupport": false,
      "bitrate": null
    },
    "gimbal": {
      "hasGimbal": false,
      "type": null,
      "axes": null,
      "tiltRange": null,
      "panRange": null,
      "rollRange": null,
      "stabilization": null
    },
    "flight": {
      "maxFlightTime": "9 min",
      "maxSpeed": null,
      "maxDistance": "100m",
      "maxAltitude": null,
      "windResistance": null,
      "motors": 4,
      "propellerSize": null
    },
    "battery": {
      "capacity": "1800mAh",
      "voltage": "3.7V",
      "type": "Li-Po",
      "quantity": 1,
      "chargingTime": "60-90 min",
      "intelligentBattery": false,
      "fastCharging": false
    },
    "transmission": {
      "range": "100m",
      "frequency": "2.4GHz",
      "technology": "WiFi FPV",
      "maxResolution": "HD",
      "latency": null,
      "liveView": true
    },
    "controller": {
      "hasController": true,
      "type": "Controle padrão",
      "screenSize": null,
      "hasBuiltInScreen": false,
      "batteryLife": null,
      "controlledBySmartphone": true,
      "hasTouch": false
    },
    "obstacleAvoidance": {
      "hasObstacleAvoidance": false,
      "type": null,
      "directions": null,
      "detectionRange": null,
      "omniDirectional": false,
      "apas": null
    },
    "positioning": {
      "hasGPS": false,
      "gpsType": null,
      "hasVisionPositioning": false,
      "hasInfraredPositioning": false,
      "rtkPositioning": false
    },
    "intelligentFeatures": {
      "autoReturn": false,
      "followMe": false,
      "activeTrack": false,
      "pointOfInterest": false,
      "waypoint": false,
      "tapFly": false,
      "gesture": false,
      "quickShots": null,
      "panorama": false,
      "hyperlapse": false,
      "masterShots": false,
      "spin360": true,
      "altitudeHold": true,
      "headlessMode": true,
      "aiTracking": false,
      "voiceControl": false
    },
    "connectivity": {
      "hasWiFi": true,
      "wiFiFrequency": "2.4GHz",
      "hasBluetooth": false,
      "hasUSB": true,
      "ports": ["USB"]
    },
    "storage": {
      "internal": null,
      "externalSupport": null,
      "maxCardSize": null
    },
    "temperature": {
      "min": null,
      "max": null
    },
    "dimensions": {
      "folded": "13 x 10 x 5.5 cm",
      "unfolded": "25 x 20 x 5.5 cm",
      "weight": "200g"
    },
    "accessories": {
      "hasProtectors": true,
      "includedItems": [
        "Cabo de alimentação",
        "Controle remoto",
        "Chave de fenda",
        "Hélices sobressalentes",
        "Manual",
        "Protetores de hélices"
      ],
      "carryingCase": false
    },
    "certifications": {
      "anatelNumber": null,
      "fccId": null,
      "ceMarking": null
    },
    "other": {
      "isFPV": true,
      "isRacing": false,
      "waterResistance": null,
      "recommendedUses": ["Fotografia aérea", "Hobby", "Iniciantes"],
      "minAge": 14,
      "noiseLevel": null,
      "ledLights": true,
      "warranty": null
    },
    "ratings": {
      "costBenefit": 3.5,
      "cameraQuality": 2.5,
      "flightPerformance": 2.0,
      "features": 2.5,
      "portability": 4.5
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
"drones": [
      {
        "name": "Mini Drone E998 Pro",
        "brand": "Genérica",
        "detailedModel": "E998 Pro",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_792056-MLA91557630696_092025-F.webp"
      },
      {
        "name": "Drone Dji Neo 2 Fly More",
        "brand": "DJI",
        "detailedModel": "Neo 2",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_683752-MLA99988796100_122025-F.webp"
      },
      {
        "name": "Mini 5 Pro Fly More",
        "brand": "DJI",
        "detailedModel": "Mini 5 Pro",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_788272-MLA99507690048_112025-F.webp"
      },
      {
        "name": " Neo Dji051",
        "brand": "DJI",
        "detailedModel": "Neo",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_643112-MLA99937779871_112025-F.webp"
      },
      {
        "name": "Drone Mini Pro GPS 2",
        "brand": "Mostaz",
        "detailedModel": "Mini Drone Pro GPS",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_974939-MLA99533870508_122025-F.webp"
      },
      {
        "name": " Air 3S",
        "brand": "DJI",
        "detailedModel": "Air 3S",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_840803-MLA99495348730_112025-F.webp"
      },
      {
        "name": " Mini 4K Standard",
        "brand": "DJI",
        "detailedModel": "Mini 4K",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_987308-MLA99478889674_112025-F.webp"
      },
      {
        "name": "SJRC F22S Pro 2",
        "brand": "SJRC",
        "detailedModel": "F22S Pro",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_999206-MLA99945643049_112025-F.webp"
      },
      {
        "name": " Mini 3 Standard",
        "brand": "DJI",
        "detailedModel": "Mini 3",
        "image": "https://http2.mlstatic.com/D_NQ_NP_2X_868898-MLA100002976127_112025-F.webp"
      }
    ]
```

- Se eu passar dados de um item já cadastrado antes, ou que você já mandou os dados, pare o processo e me pergunte se eu quero continuar mesmo assim.
