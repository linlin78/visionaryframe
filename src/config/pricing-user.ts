/**
 * ============================================
 * 鐢ㄦ埛閰嶇疆鏂囦欢 - 浠锋牸鍜岀Н鍒?
 * ============================================
 *
 * 馃摉 浣跨敤鎸囧崡
 * -----------
 * 杩欎釜鏂囦欢鍖呭惈浜嗘墍鏈変笌浠锋牸銆佺Н鍒嗙浉鍏崇殑閰嶇疆銆?
 *
 * 馃幆 涓昏閰嶇疆椤癸細
 * 1. 鍩虹璁剧疆 - 鏂扮敤鎴疯禒閫併€佽繃鏈熻鍒?
 * 2. 璁㈤槄浜у搧 - 鏈堜粯/骞翠粯璁㈤槄浠锋牸鍜岀Н鍒?
 * 3. 绉垎鍖?- 涓€娆℃€ц喘涔扮Н鍒嗗寘
 * 4. 妯″瀷璁¤垂 - 鍚?AI 妯″瀷鐨勭Н鍒嗘秷鑰楄鍒?
 *
 * 馃摑 淇敼鏂规硶锛?
 * - 鐩存帴淇敼涓嬮潰鐨勬暟鍊煎嵆鍙紙浠锋牸鐢ㄧ編鍏冿紝涓嶆槸缇庡垎锛?
 * - 淇濆瓨鍚庤嚜鍔ㄧ敓鏁堬紝鏃犻渶閲嶅惎鏈嶅姟鍣?
 * - 瑕佺鐢ㄦ煇涓骇鍝侊紝灏?enabled 鏀逛负 false
 *
 * 鈿狅笍 娉ㄦ剰浜嬮」锛?
 * - 涓嶈淇敼 id 瀛楁锛堢敤浜庢暟鎹簱鍏宠仈锛?
 * - 浠锋牸浣跨敤缇庡厓鍗曚綅锛堝 9.9 琛ㄧず $9.90锛?
 * - 绉垎鏁伴噺鏄暣鏁?
 * - allowFreeUser: 鏄惁鍏佽鍏嶈垂鐢ㄦ埛璐拱锛堝彲閫夛紝榛樿 true锛?
 *
 * ============================================
 */

// ============================================
// 绫诲瀷瀹氫箟锛堝唴閮ㄤ娇鐢級
// ============================================

/** 瑙嗛妯″瀷绉垎閰嶇疆 */
export interface VideoModelPricing {
  baseCredits: number;
  perSecond: number;
  qualityMultiplier?: number;
  enabled: boolean;
}

/** 璁㈤槄浜у搧閰嶇疆 */
export interface SubscriptionProductConfig {
  id: string;
  name: string;
  priceUsd: number;
  credits: number;
  period: "month" | "year";
  popular?: boolean;
  enabled: boolean;
  features?: string[];
}

/** 绉垎鍖呴厤缃?*/
export interface CreditPackageConfig {
  id: string;
  name: string;
  priceUsd: number;
  credits: number;
  popular?: boolean;
  enabled: boolean;
  /** 鏄惁鍏佽鍏嶈垂鐢ㄦ埛璐拱锛堝彲閫夛紝榛樿 true锛?*/
  allowFreeUser?: boolean;
  features?: string[];
}

// ============================================
// 涓€銆佸熀纭€璁剧疆
// ============================================

/**
 * 鏂扮敤鎴锋敞鍐岃禒閫佺Н鍒?
 */
export const NEW_USER_GIFT = {
  /** 鏄惁鍚敤璧犻€?*/
  enabled: true,
  /** 璧犻€佺Н鍒嗘暟閲?*/
  credits: 50,
  /** 绉垎鏈夋晥鏈燂紙澶╋級*/
  validDays: 30,
};

/**
 * 绉垎杩囨湡璁剧疆
 */
export const CREDIT_EXPIRATION = {
  /** 璁㈤槄绉垎鏈夋晥鏈燂紙澶╋級- 鏈堜粯鐢ㄦ埛 */
  subscriptionDays: 30,
  /** 涓€娆℃€ц喘涔扮Н鍒嗘湁鏁堟湡锛堝ぉ锛? 鍗曠嫭璐拱绉垎鍖?*/
  purchaseDays: 365,
  /** 鎻愬墠澶氬皯澶╂彁閱掔Н鍒嗗嵆灏嗚繃鏈?*/
  warnBeforeDays: 7,
};

// ============================================
// 浜屻€佽闃呬骇鍝侀厤缃?
// ============================================

/**
 * 璁㈤槄浜у搧鍒楄〃
 *
 * 姣忎釜浜у搧鍖呭惈锛?
 * - id: 浜у搧鍞竴鏍囪瘑锛堜笉瑕佹敼锛?
 * - name: 鏄剧ず鍚嶇О
 * - priceUsd: 浠锋牸锛堢編鍏冿級
 * - credits: 姣忓懆鏈熻禒閫佺Н鍒?
 * - period: 浠樿垂鍛ㄦ湡 ("month" 鎴?"year")
 * - popular: 鏄惁鏍囪涓烘帹鑽愶紙鏈€澶氶€?-2涓級
 * - enabled: 鏄惁鍚敤璇ヤ骇鍝?
 */
export const SUBSCRIPTION_PRODUCTS = [
  // ===== 鏈堜粯璁㈤槄 =====
  {
    id: "basic_monthly",
    name: "Basic Plan",
    priceUsd: 9.9,
    credits: 100,
    period: "month" as const,
    popular: false,
    enabled: true,
    features: ["hd_videos", "fast_generation"],
  },
  {
    id: "pro_monthly",
    name: "Pro Plan",
    priceUsd: 29.9,
    credits: 500,
    period: "month" as const,
    popular: true, // 鎺ㄨ崘
    enabled: true,
    features: ["hd_videos", "fast_generation", "no_watermark", "commercial_use"],
  },
  {
    id: "team_monthly",
    name: "Team Plan",
    priceUsd: 99.9,
    credits: 2000,
    period: "month" as const,
    popular: false,
    enabled: true,
    features: ["hd_videos", "fast_generation", "no_watermark", "commercial_use", "priority_support", "api_access"],
  },

  // ===== 骞翠粯璁㈤槄 =====
  {
    id: "basic_yearly",
    name: "Basic Plan (Yearly)",
    priceUsd: 99,
    credits: 1200, // 100 脳 12 鏈?
    period: "year" as const,
    popular: false,
    enabled: true,
    features: ["hd_videos", "fast_generation"],
  },
  {
    id: "pro_yearly",
    name: "Pro Plan (Yearly)",
    priceUsd: 299,
    credits: 6000, // 500 脳 12 鏈?
    period: "year" as const,
    popular: true,
    enabled: true,
    features: ["hd_videos", "fast_generation", "no_watermark", "commercial_use"],
  },
  {
    id: "team_yearly",
    name: "Team Plan (Yearly)",
    priceUsd: 999,
    credits: 24000, // 2000 脳 12 鏈?
    period: "year" as const,
    popular: false,
    enabled: true,
    features: ["hd_videos", "fast_generation", "no_watermark", "commercial_use", "priority_support", "api_access"],
  },
];

// ============================================
// 涓夈€佷竴娆℃€ц喘涔扮Н鍒嗗寘
// ============================================

/**
 * 绉垎鍖呬骇鍝佸垪琛?
 *
 * 鐢ㄦ埛鍙互鍗曠嫭璐拱绉垎鍖咃紙涓嶈闃咃級
 *
 * allowFreeUser 璇存槑锛?
 * - true:  鎵€鏈夌敤鎴烽兘鍙互璐拱姝ょН鍒嗗寘
 * - false: 鍙湁璁㈤槄鐢ㄦ埛鎵嶈兘璐拱姝ょН鍒嗗寘
 * - 涓嶅～: 榛樿涓?true锛堟墍鏈夌敤鎴峰彲璐拱锛?
 */
export const CREDIT_PACKAGES: CreditPackageConfig[] = [
  {
    id: "starter",
    name: "Starter Pack",
    priceUsd: 9.9,
    credits: 100,
    popular: false,
    enabled: true,
    allowFreeUser: true, // 鍏嶈垂鐢ㄦ埛鍙喘涔?
    features: ["hd_videos", "fast_generation"],
  },
  {
    id: "standard",
    name: "Standard Pack",
    priceUsd: 19.9,
    credits: 250,
    popular: true, // 鎺ㄨ崘
    enabled: true,
    allowFreeUser: true,
    features: ["hd_videos", "fast_generation", "no_watermark"],
  },
  {
    id: "large",
    name: "Large Pack",
    priceUsd: 49.9,
    credits: 700,
    popular: false,
    enabled: true,
    allowFreeUser: true,
    features: ["hd_videos", "fast_generation", "no_watermark", "commercial_use"],
  },
];

// ============================================
// 鍥涖€丄I 妯″瀷绉垎璁¤垂
// ============================================

/**
 * Video generation model pricing.
 * Current core EvoLink model set:
 * - Seedance 2.0 Mini: low-cost testing model
 * - Wan 2.5: low-cost short video model
 * - Seedance 2.0: main paid generation model
 * - Kling 3.0: high-quality short video model
 * - Sora 2: premium model, priced above EvoLink cost
 */
export const VIDEO_MODEL_PRICING: Record<string, VideoModelPricing> = {
  /** Seedance 2.0 Mini - low-cost testing / fast mode */
  "seedance-2.0-mini": {
    baseCredits: 35,      // 5s * 7 credits/sec
    perSecond: 7,
    enabled: true,
  },

  /** Wan 2.5 - low-cost short video / fast mode */
  "wan-2.5": {
    baseCredits: 10,      // 5s * 2 credits/sec
    perSecond: 2,
    enabled: true,
  },

  /** Seedance 2.0 - main paid generation / quality mode */
  "seedance-2.0": {
    baseCredits: 16,      // 4s * 4 credits/sec
    perSecond: 4,
    qualityMultiplier: 2,
    enabled: false,
  },

  /** Kling 3.0 - high-quality short video / quality mode */
  "kling-3.0": {
    baseCredits: 30,      // 5s * 6 credits/sec
    perSecond: 6,
    qualityMultiplier: 1.5,
    enabled: false,
  },

  /** Sora 2 - premium. 4s=26, 8s=52, 12s=78 */
  "sora-2": {
    baseCredits: 26,      // 4s * 6.5 credits/sec
    perSecond: 6.5,
    enabled: true,
  },
};

// ============================================
// 五、支付配置（环境变量）
// ============================================

/**
 * 鏀粯鎻愪緵鍟嗛厤缃?
 *
 * 杩欎簺閰嶇疆閫氬父鍦?.env.local 鏂囦欢涓缃?
 * 杩欓噷鍙槸璇存槑锛屼笉闇€瑕佷慨鏀?
 */
export const PAYMENT_CONFIG = {
  /** 浣跨敤 Creem 鏀粯 */
  provider: "creem",
  /** 鏀粯鎴愬姛鍚庣殑鍥炶皟鍦板潃锛堣嚜鍔ㄧ敓鎴愶級*/
  webhookUrl: process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/credit/callback`
    : "",
};
