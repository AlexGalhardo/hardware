# Contexto

- Site: <https://tudohardware.com>
- Os dados dos produtos são salvos em formato JSON

## Tipagem do objeto JSON que você vai criar

```ts
import { SpecSection } from "../spec-configs";
import { BaseProduct, Product } from "../types";

function isFechadura(product: BaseProduct): product is Fechadura {
  return product.category === "fechaduras";
}

export interface Fechadura extends BaseProduct {
  category: "fechaduras";
  specs: FechaduraSpecs;
}

function getFechadura(p: Product): FechaduraSpecs | null {
  if (isFechadura(p)) {
    return p.specs;
  }
  return null;
}

export interface FechaduraSpecs {
  manufacturer:
    | "Intelbras"
    | "Yale"
    | "Samsung"
    | "Xiaomi"
    | "Positivo"
    | "Garen"
    | "Linear"
    | "Aroeira"
    | "Papaiz"
    | "Outros";

  basicInfo: {
    color?: string;
    finish?: string; // Grafite, Cromado, Escovado
    direction: "Direita" | "Esquerda" | "Direita/Esquerda" | "Reversível";
    isDigital: boolean;
    installationType: "De sobrepor" | "De embutir" | "Externa" | "Interna";
    useEnvironment: ("Interno" | "Externo" | "Ambos")[];
  };

  security: {
    openingMechanisms: (
      | "Senha"
      | "Código"
      | "Biometria"
      | "Cartão RFID"
      | "Tag"
      | "Aplicativo"
      | "Chave mecânica"
      | "Controle remoto"
      | "Bluetooth"
    )[];
    proximityCardType?: "RFID" | "Mifare" | "NFC" | "Outros";
    numericCodesSupported?: number;
    biometricCapacity?: number; // quantidade de digitais
    cardCapacity?: number; // quantidade de cartões
    passwordCapacity?: number; // quantidade de senhas
    antiTheftAlarm?: boolean;
    shockProtection?: boolean;
    tamperAlert?: boolean;
    autoLock?: boolean;
    autoLockTime?: string; // tempo em segundos
    emergencyPower?: boolean; // bateria de emergência externa
    securityLevel?: string;
  };

  connectivity: {
    wifi?: boolean;
    bluetooth?: boolean;
    zigbee?: boolean;
    hasApp?: boolean;
    appName?: string;
    remoteControl?: boolean;
    smartHomeIntegration?: string[]; // Alexa, Google Home, etc.
  };

  access: {
    masterPassword?: boolean;
    guestPassword?: boolean;
    temporaryPassword?: boolean;
    oneTimePassword?: boolean;
    accessLog?: boolean;
    logCapacity?: number; // quantidade de registros
  };

  power: {
    powerType: "Pilha" | "Bateria" | "Energia elétrica" | "Híbrido";
    batteryType?: "AA" | "AAA" | "Bateria recarregável" | "9V";
    batteryQuantity?: number;
    batteriesIncluded?: boolean;
    batteryLife?: string; // em meses ou anos
    lowBatteryIndicator?: boolean;
    emergencyPowerPort?: boolean; // USB ou 9V externo
  };

  doorSpecifications: {
    minThickness?: number; // cm
    maxThickness?: number; // cm
    recommendedThickness?: string;
    doorTypes?: string[]; // Madeira, Metal, Vidro
    lockType?: "Trava" | "Trinco" | "Deadbolt" | "Eletroimã";
  };

  display?: {
    hasDisplay: boolean;
    type?: "LCD" | "LED" | "OLED" | "Touch Screen";
    touchScreen?: boolean;
    backlight?: boolean;
  };

  physical: {
    materials: string[]; // Alumínio, Plástico ABS, Zinco, Aço inoxidável
    weatherResistant?: boolean;
    waterproofRating?: string; // IP65, IP67, etc.
    includesHandle?: boolean;
    handleType?: string;
    finishType?: string;
  };

  dimensions?: {
    height: string;
    width: string;
    depth: string;
    weight?: string;
  };

  installation: {
    difficulty?: "Fácil" | "Média" | "Difícil" | "Profissional";
    includesInstallationKit?: boolean;
    reversible?: boolean; // pode inverter lado de abertura
    requiresWiring?: boolean;
  };

  features: {
    voiceGuide?: boolean;
    privacyMode?: boolean;
    silentMode?: boolean;
    freezeProtection?: boolean;
    fireProtection?: boolean;
    duplicateCardProtection?: boolean;
    wrongPasswordLock?: boolean;
    wrongPasswordAttempts?: number;
    lockoutTime?: string; // tempo de bloqueio após tentativas erradas
  };

  notifications: {
    doorOpenAlert?: boolean;
    intrusionAlert?: boolean;
    lowBatteryAlert?: boolean;
    soundAlerts?: boolean;
    visualAlerts?: boolean;
  };

  bundled?: {
    cards?: number;
    tags?: number;
    keys?: number;
    installationKit?: boolean;
    fixingBox?: boolean;
    shims?: number; // calços
    manual?: boolean;
    accessories?: string[];
  };

  warranty?: {
    period: string;
    type?: string;
    support?: string;
  };

  certifications?: {
    anatel?: boolean;
    inmetro?: boolean;
    ce?: boolean;
    fcc?: boolean;
    other?: string[];
  };

  ratings: {
    costBenefit: number | null;
    security: number;
    easeOfUse: number;
    durability: number;
    installation: number;
    features: number;
    connectivity: number;
  };
}

export const fechaduraSpecs: SpecSection[] = [
  {
    id: "ratings",
    title: "Notas",
    specs: [
      {
        key: "costBenefit",
        label: "Custo-benefício",
        getValue: (p) => getFechadura(p)?.ratings.costBenefit ?? null,
        type: "rating",
      },
      {
        key: "security",
        label: "Segurança",
        getValue: (p) => getFechadura(p)?.ratings.security ?? null,
        type: "rating",
      },
      {
        key: "easeOfUse",
        label: "Facilidade de Uso",
        getValue: (p) => getFechadura(p)?.ratings.easeOfUse ?? null,
        type: "rating",
      },
      {
        key: "durability",
        label: "Durabilidade",
        getValue: (p) => getFechadura(p)?.ratings.durability ?? null,
        type: "rating",
      },
      {
        key: "installation",
        label: "Instalação",
        getValue: (p) => getFechadura(p)?.ratings.installation ?? null,
        type: "rating",
      },
      {
        key: "features",
        label: "Recursos",
        getValue: (p) => getFechadura(p)?.ratings.features ?? null,
        type: "rating",
      },
      {
        key: "connectivity",
        label: "Conectividade",
        getValue: (p) => getFechadura(p)?.ratings.connectivity ?? null,
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
        getValue: (p) => getFechadura(p)?.manufacturer ?? "-",
        type: "text",
      },
      {
        key: "color",
        label: "Cor",
        getValue: (p) => getFechadura(p)?.basicInfo.color ?? "-",
        type: "text",
      },
      {
        key: "finish",
        label: "Acabamento",
        getValue: (p) => getFechadura(p)?.basicInfo.finish ?? "-",
        type: "text",
      },
      {
        key: "direction",
        label: "Direção da Fechadura",
        getValue: (p) => getFechadura(p)?.basicInfo.direction ?? "-",
        type: "text",
      },
      {
        key: "isDigital",
        label: "É Digital",
        getValue: (p) => getFechadura(p)?.basicInfo.isDigital ?? false,
        type: "boolean",
      },
      {
        key: "installationType",
        label: "Tipo de Instalação",
        getValue: (p) => getFechadura(p)?.basicInfo.installationType ?? "-",
        type: "text",
      },
      {
        key: "useEnvironment",
        label: "Ambientes de Uso",
        getValue: (p) =>
          getFechadura(p)?.basicInfo.useEnvironment?.join(", ") ?? "-",
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
    id: "security",
    title: "Segurança",
    specs: [
      {
        key: "openingMechanisms",
        label: "Mecanismos de Abertura",
        getValue: (p) =>
          getFechadura(p)?.security.openingMechanisms?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "proximityCardType",
        label: "Tipo de Cartão de Proximidade",
        getValue: (p) => getFechadura(p)?.security.proximityCardType ?? "-",
        type: "text",
      },
      {
        key: "numericCodesSupported",
        label: "Códigos Numéricos Suportados",
        getValue: (p) =>
          getFechadura(p)?.security.numericCodesSupported?.toString() ?? "-",
        type: "text",
      },
      {
        key: "biometricCapacity",
        label: "Capacidade de Digitais",
        getValue: (p) =>
          getFechadura(p)?.security.biometricCapacity?.toString() ?? "-",
        type: "text",
      },
      {
        key: "cardCapacity",
        label: "Capacidade de Cartões",
        getValue: (p) =>
          getFechadura(p)?.security.cardCapacity?.toString() ?? "-",
        type: "text",
      },
      {
        key: "passwordCapacity",
        label: "Capacidade de Senhas",
        getValue: (p) =>
          getFechadura(p)?.security.passwordCapacity?.toString() ?? "-",
        type: "text",
      },
      {
        key: "antiTheftAlarm",
        label: "Alarme Anti-furto",
        getValue: (p) => getFechadura(p)?.security.antiTheftAlarm ?? false,
        type: "boolean",
      },
      {
        key: "shockProtection",
        label: "Proteção de Choque",
        getValue: (p) => getFechadura(p)?.security.shockProtection ?? false,
        type: "boolean",
      },
      {
        key: "tamperAlert",
        label: "Alerta de Violação",
        getValue: (p) => getFechadura(p)?.security.tamperAlert ?? false,
        type: "boolean",
      },
      {
        key: "autoLock",
        label: "Travamento Automático",
        getValue: (p) => getFechadura(p)?.security.autoLock ?? false,
        type: "boolean",
      },
      {
        key: "autoLockTime",
        label: "Tempo de Travamento Automático",
        getValue: (p) => getFechadura(p)?.security.autoLockTime ?? "-",
        type: "text",
      },
      {
        key: "emergencyPower",
        label: "Alimentação de Emergência",
        getValue: (p) => getFechadura(p)?.security.emergencyPower ?? false,
        type: "boolean",
      },
      {
        key: "securityLevel",
        label: "Nível de Segurança",
        getValue: (p) => getFechadura(p)?.security.securityLevel ?? "-",
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
        getValue: (p) => getFechadura(p)?.connectivity.wifi ?? false,
        type: "boolean",
      },
      {
        key: "bluetooth",
        label: "Bluetooth",
        getValue: (p) => getFechadura(p)?.connectivity.bluetooth ?? false,
        type: "boolean",
      },
      {
        key: "zigbee",
        label: "Zigbee",
        getValue: (p) => getFechadura(p)?.connectivity.zigbee ?? false,
        type: "boolean",
      },
      {
        key: "hasApp",
        label: "Possui Aplicativo",
        getValue: (p) => getFechadura(p)?.connectivity.hasApp ?? false,
        type: "boolean",
      },
      {
        key: "appName",
        label: "Nome do Aplicativo",
        getValue: (p) => getFechadura(p)?.connectivity.appName ?? "-",
        type: "text",
      },
      {
        key: "remoteControl",
        label: "Controle Remoto",
        getValue: (p) => getFechadura(p)?.connectivity.remoteControl ?? false,
        type: "boolean",
      },
      {
        key: "smartHomeIntegration",
        label: "Integração Casa Inteligente",
        getValue: (p) =>
          getFechadura(p)?.connectivity.smartHomeIntegration?.join(", ") ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "access",
    title: "Controle de Acesso",
    specs: [
      {
        key: "masterPassword",
        label: "Senha Master",
        getValue: (p) => getFechadura(p)?.access.masterPassword ?? false,
        type: "boolean",
      },
      {
        key: "guestPassword",
        label: "Senha de Convidado",
        getValue: (p) => getFechadura(p)?.access.guestPassword ?? false,
        type: "boolean",
      },
      {
        key: "temporaryPassword",
        label: "Senha Temporária",
        getValue: (p) => getFechadura(p)?.access.temporaryPassword ?? false,
        type: "boolean",
      },
      {
        key: "oneTimePassword",
        label: "Senha de Uso Único",
        getValue: (p) => getFechadura(p)?.access.oneTimePassword ?? false,
        type: "boolean",
      },
      {
        key: "accessLog",
        label: "Registro de Acesso",
        getValue: (p) => getFechadura(p)?.access.accessLog ?? false,
        type: "boolean",
      },
      {
        key: "logCapacity",
        label: "Capacidade de Registros",
        getValue: (p) => getFechadura(p)?.access.logCapacity?.toString() ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "power",
    title: "Alimentação",
    specs: [
      {
        key: "powerType",
        label: "Tipo de Alimentação",
        getValue: (p) => getFechadura(p)?.power.powerType ?? "-",
        type: "text",
      },
      {
        key: "batteryType",
        label: "Tipo de Pilha/Bateria",
        getValue: (p) => getFechadura(p)?.power.batteryType ?? "-",
        type: "text",
      },
      {
        key: "batteryQuantity",
        label: "Quantidade de Pilhas",
        getValue: (p) =>
          getFechadura(p)?.power.batteryQuantity?.toString() ?? "-",
        type: "text",
      },
      {
        key: "batteriesIncluded",
        label: "Inclui Pilhas",
        getValue: (p) => getFechadura(p)?.power.batteriesIncluded ?? false,
        type: "boolean",
      },
      {
        key: "batteryLife",
        label: "Duração da Pilha",
        getValue: (p) => getFechadura(p)?.power.batteryLife ?? "-",
        type: "text",
      },
      {
        key: "lowBatteryIndicator",
        label: "Indicador de Bateria Fraca",
        getValue: (p) => getFechadura(p)?.power.lowBatteryIndicator ?? false,
        type: "boolean",
      },
      {
        key: "emergencyPowerPort",
        label: "Porta de Energia de Emergência",
        getValue: (p) => getFechadura(p)?.power.emergencyPowerPort ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "doorSpecifications",
    title: "Especificações da Porta",
    specs: [
      {
        key: "minThickness",
        label: "Espessura Mínima da Porta (cm)",
        getValue: (p) =>
          getFechadura(p)?.doorSpecifications.minThickness?.toString() ?? "-",
        type: "text",
      },
      {
        key: "maxThickness",
        label: "Espessura Máxima da Porta (cm)",
        getValue: (p) =>
          getFechadura(p)?.doorSpecifications.maxThickness?.toString() ?? "-",
        type: "text",
      },
      {
        key: "recommendedThickness",
        label: "Espessura Recomendada",
        getValue: (p) =>
          getFechadura(p)?.doorSpecifications.recommendedThickness ?? "-",
        type: "text",
      },
      {
        key: "doorTypes",
        label: "Tipos de Porta",
        getValue: (p) =>
          getFechadura(p)?.doorSpecifications.doorTypes?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "lockType",
        label: "Tipo de Trava",
        getValue: (p) => getFechadura(p)?.doorSpecifications.lockType ?? "-",
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
        getValue: (p) => getFechadura(p)?.display?.hasDisplay ?? false,
        type: "boolean",
      },
      {
        key: "displayType",
        label: "Tipo de Display",
        getValue: (p) => getFechadura(p)?.display?.type ?? "-",
        type: "text",
      },
      {
        key: "touchScreen",
        label: "Touch Screen",
        getValue: (p) => getFechadura(p)?.display?.touchScreen ?? false,
        type: "boolean",
      },
      {
        key: "backlight",
        label: "Retroiluminação",
        getValue: (p) => getFechadura(p)?.display?.backlight ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "physical",
    title: "Características Físicas",
    specs: [
      {
        key: "materials",
        label: "Materiais",
        getValue: (p) => getFechadura(p)?.physical.materials?.join(", ") ?? "-",
        type: "text",
      },
      {
        key: "weatherResistant",
        label: "Resistente a Intempéries",
        getValue: (p) => getFechadura(p)?.physical.weatherResistant ?? false,
        type: "boolean",
      },
      {
        key: "waterproofRating",
        label: "Classificação de Resistência à Água",
        getValue: (p) => getFechadura(p)?.physical.waterproofRating ?? "-",
        type: "text",
      },
      {
        key: "includesHandle",
        label: "Inclui Maçaneta",
        getValue: (p) => getFechadura(p)?.physical.includesHandle ?? false,
        type: "boolean",
      },
      {
        key: "handleType",
        label: "Tipo de Maçaneta",
        getValue: (p) => getFechadura(p)?.physical.handleType ?? "-",
        type: "text",
      },
      {
        key: "finishType",
        label: "Tipo de Acabamento",
        getValue: (p) => getFechadura(p)?.physical.finishType ?? "-",
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
        getValue: (p) => getFechadura(p)?.dimensions?.height ?? "-",
        type: "text",
      },
      {
        key: "width",
        label: "Largura",
        getValue: (p) => getFechadura(p)?.dimensions?.width ?? "-",
        type: "text",
      },
      {
        key: "depth",
        label: "Profundidade",
        getValue: (p) => getFechadura(p)?.dimensions?.depth ?? "-",
        type: "text",
      },
      {
        key: "weight",
        label: "Peso",
        getValue: (p) => getFechadura(p)?.dimensions?.weight ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "installation",
    title: "Instalação",
    specs: [
      {
        key: "difficulty",
        label: "Dificuldade",
        getValue: (p) => getFechadura(p)?.installation.difficulty ?? "-",
        type: "text",
      },
      {
        key: "includesInstallationKit",
        label: "Inclui Kit de Instalação",
        getValue: (p) =>
          getFechadura(p)?.installation.includesInstallationKit ?? false,
        type: "boolean",
      },
      {
        key: "reversible",
        label: "Reversível",
        getValue: (p) => getFechadura(p)?.installation.reversible ?? false,
        type: "boolean",
      },
      {
        key: "requiresWiring",
        label: "Requer Fiação",
        getValue: (p) => getFechadura(p)?.installation.requiresWiring ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "features",
    title: "Recursos",
    specs: [
      {
        key: "voiceGuide",
        label: "Guia por Voz",
        getValue: (p) => getFechadura(p)?.features.voiceGuide ?? false,
        type: "boolean",
      },
      {
        key: "privacyMode",
        label: "Modo Privacidade",
        getValue: (p) => getFechadura(p)?.features.privacyMode ?? false,
        type: "boolean",
      },
      {
        key: "silentMode",
        label: "Modo Silencioso",
        getValue: (p) => getFechadura(p)?.features.silentMode ?? false,
        type: "boolean",
      },
      {
        key: "freezeProtection",
        label: "Proteção Contra Congelamento",
        getValue: (p) => getFechadura(p)?.features.freezeProtection ?? false,
        type: "boolean",
      },
      {
        key: "fireProtection",
        label: "Proteção Contra Fogo",
        getValue: (p) => getFechadura(p)?.features.fireProtection ?? false,
        type: "boolean",
      },
      {
        key: "duplicateCardProtection",
        label: "Proteção Contra Cartão Duplicado",
        getValue: (p) =>
          getFechadura(p)?.features.duplicateCardProtection ?? false,
        type: "boolean",
      },
      {
        key: "wrongPasswordLock",
        label: "Bloqueio por Senha Errada",
        getValue: (p) => getFechadura(p)?.features.wrongPasswordLock ?? false,
        type: "boolean",
      },
      {
        key: "wrongPasswordAttempts",
        label: "Tentativas de Senha Permitidas",
        getValue: (p) =>
          getFechadura(p)?.features.wrongPasswordAttempts?.toString() ?? "-",
        type: "text",
      },
      {
        key: "lockoutTime",
        label: "Tempo de Bloqueio",
        getValue: (p) => getFechadura(p)?.features.lockoutTime ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "notifications",
    title: "Notificações e Alertas",
    specs: [
      {
        key: "doorOpenAlert",
        label: "Alerta de Porta Aberta",
        getValue: (p) => getFechadura(p)?.notifications.doorOpenAlert ?? false,
        type: "boolean",
      },
      {
        key: "intrusionAlert",
        label: "Alerta de Intrusão",
        getValue: (p) => getFechadura(p)?.notifications.intrusionAlert ?? false,
        type: "boolean",
      },
      {
        key: "lowBatteryAlert",
        label: "Alerta de Bateria Fraca",
        getValue: (p) =>
          getFechadura(p)?.notifications.lowBatteryAlert ?? false,
        type: "boolean",
      },
      {
        key: "soundAlerts",
        label: "Alertas Sonoros",
        getValue: (p) => getFechadura(p)?.notifications.soundAlerts ?? false,
        type: "boolean",
      },
      {
        key: "visualAlerts",
        label: "Alertas Visuais",
        getValue: (p) => getFechadura(p)?.notifications.visualAlerts ?? false,
        type: "boolean",
      },
    ],
  },
  {
    id: "bundled",
    title: "Itens Inclusos",
    specs: [
      {
        key: "cards",
        label: "Cartões",
        getValue: (p) => getFechadura(p)?.bundled?.cards?.toString() ?? "-",
        type: "text",
      },
      {
        key: "tags",
        label: "Tags",
        getValue: (p) => getFechadura(p)?.bundled?.tags?.toString() ?? "-",
        type: "text",
      },
      {
        key: "keys",
        label: "Chaves",
        getValue: (p) => getFechadura(p)?.bundled?.keys?.toString() ?? "-",
        type: "text",
      },
      {
        key: "installationKit",
        label: "Kit de Instalação",
        getValue: (p) => getFechadura(p)?.bundled?.installationKit ?? false,
        type: "boolean",
      },
      {
        key: "fixingBox",
        label: "Caixa de Fixação",
        getValue: (p) => getFechadura(p)?.bundled?.fixingBox ?? false,
        type: "boolean",
      },
      {
        key: "shims",
        label: "Calços",
        getValue: (p) => getFechadura(p)?.bundled?.shims?.toString() ?? "-",
        type: "text",
      },
      {
        key: "manual",
        label: "Manual",
        getValue: (p) => getFechadura(p)?.bundled?.manual ?? false,
        type: "boolean",
      },
      {
        key: "accessories",
        label: "Acessórios",
        getValue: (p) =>
          getFechadura(p)?.bundled?.accessories?.join(", ") ?? "-",
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
        getValue: (p) => getFechadura(p)?.warranty?.period ?? "-",
        type: "text",
      },
      {
        key: "warrantyType",
        label: "Tipo",
        getValue: (p) => getFechadura(p)?.warranty?.type ?? "-",
        type: "text",
      },
      {
        key: "support",
        label: "Suporte",
        getValue: (p) => getFechadura(p)?.warranty?.support ?? "-",
        type: "text",
      },
    ],
  },
  {
    id: "certifications",
    title: "Certificações",
    specs: [
      {
        key: "anatel",
        label: "Anatel",
        getValue: (p) => getFechadura(p)?.certifications?.anatel ?? false,
        type: "boolean",
      },
      {
        key: "inmetro",
        label: "Inmetro",
        getValue: (p) => getFechadura(p)?.certifications?.inmetro ?? false,
        type: "boolean",
      },
      {
        key: "ce",
        label: "CE",
        getValue: (p) => getFechadura(p)?.certifications?.ce ?? false,
        type: "boolean",
      },
      {
        key: "fcc",
        label: "FCC",
        getValue: (p) => getFechadura(p)?.certifications?.fcc ?? false,
        type: "boolean",
      },
      {
        key: "other",
        label: "Outras Certificações",
        getValue: (p) =>
          getFechadura(p)?.certifications?.other?.join(", ") ?? "-",
        type: "text",
      },
    ],
  },
];
```

## Exemplo de Objeto Json cafeteira

```json
{
  "id": "tres-coracoes-luna-preta",
  "name": "Luna",
  "brand": "3 Corações",
  "line": "Espresso",
  "model": "Luna",
  "alphanumericModel": "20911391",
  "color": "Preto",
  "image": "https://http2.mlstatic.com/D_NQ_NP_2X_703405-MLA99854893367_112025-F.webp",
  "price": 0,
  "releaseDate": "2024",
  "releaseYear": 2024,
  "category": "cafeteiras",
  "mercadolivreUrl": "https://mercadolivre.com/sec/2Fwz8on",
  "manufacturer": "3 Corações",
  "specs": {
    "manufacturer": "3 Corações",
    "type": "Espresso",
    "technology": "Automática",
    "powerSource": "Corrente doméstica",
    "capacity": {
      "water": "600 mL",
      "cups": 1,
      "grains": null
    },
    "power": {
      "watts": 1200,
      "voltage": "Bivolt"
    },
    "pressure": {
      "bar": 15,
      "hasPressure": true
    },
    "filters": {
      "type": "Permanente",
      "washable": true,
      "replacement": null
    },
    "beverages": {
      "recommended": [
        "Espresso",
        "Cappuccino",
        "Café Filtrado",
        "Café com Leite",
        "Chocolate Quente",
        "Chás Naturais",
        "Bebidas Cremosas"
      ],
      "capsuleCompatible": true,
      "compatibleCapsules": ["TRES"]
    },
    "brewing": {
      "preparationTime": "30 segundos",
      "temperature": null,
      "cupCapacity": 1,
      "hasDoubleFaucet": false
    },
    "features": {
      "hasTimer": false,
      "hasSteamFunction": false,
      "hasAntiDrip": false,
      "hasCupWarmer": false,
      "hasWaterIndicator": true,
      "hasAutoClean": false,
      "hasTemperatureControl": false,
      "hasDigitalDisplay": true,
      "hasMilkFrother": false,
      "hasGrinder": false,
      "grinderType": null,
      "grinderLevels": null,
      "hasKeepWarm": false,
      "keepWarmTime": null,
      "hasProgrammableStart": false,
      "hasStrengthControl": true,
      "strengthLevels": 3,
      "hasAutoShutoff": true,
      "autoShutoffTime": "Após breve período de inatividade",
      "hasWaterFilter": false,
      "hasDescalingAlert": false
    },
    "design": {
      "materials": ["Plástico ABS", "Aço inoxidável"],
      "color": "Preto",
      "coffeeType": "Cápsulas monodose",
      "isPortable": true,
      "isBuiltIn": false,
      "hasRemovableDripTray": true,
      "hasRemovableWaterTank": true,
      "waterTankPosition": null
    },
    "dimensions": {
      "width": "12,8 cm",
      "depth": "28,3 cm",
      "height": "25,5 cm",
      "weight": "3 kg"
    },
    "accessories": {
      "included": [
        "Painéis intercambiáveis",
        "Bandeja coletora removível",
        "Cápsula de retrolavagem",
        "Certificado de garantia",
        "Guia rápido",
        "Manual"
      ],
      "interchangeablePanels": true,
      "hasRemovableDripTray": true,
      "hasMeasuringSpoon": false,
      "hasReusableFilter": false,
      "numberOfCups": null,
      "hasMilkContainer": false
    },
    "electrical": {
      "voltage": "Bivolt",
      "frequency": "60 Hz",
      "powerConsumption": "1200 W",
      "includesBatteries": false,
      "cableLength": null
    },
    "maintenance": {
      "cleaningFrequency": "Após cada uso (bandeja e reservatório de cápsulas)",
      "descalingFrequency": null,
      "filterReplacement": null,
      "hasRemovableParts": true,
      "dishwasherSafeParts": ["Bandeja coletora"]
    },
    "certifications": {
      "inmetro": true,
      "anatel": false,
      "other": ["Livre de BPA"]
    },
    "warranty": {
      "general": "5 anos",
      "parts": "5 anos",
      "conditions": [
        "Incluindo 90 dias do prazo legal",
        "Válida a partir da data de emissão da nota fiscal"
      ]
    },
    "compatibility": {
      "capsuleBrands": ["TRES"],
      "cupSizes": ["50 ml", "80 ml", "100 ml"],
      "coffeeTypes": ["Cápsulas TRES exclusivamente"]
    },
    "ratings": {
      "costBenefit": 8.5,
      "brewingQuality": 8,
      "easeOfUse": 9,
      "easeCleaning": 7.5,
      "durability": 8,
      "features": 7,
      "design": 8.5
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
"impressoras": []
```

- Se eu passar dados de um item já cadastrado antes, ou que você já mandou os dados, pare o processo e me pergunte se eu quero continuar mesmo assim.
