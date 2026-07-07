// ============================================
// 类型定义
// ============================================

export type ProductType = "subscription" | "one-time";
export type ProviderType = "evolink" | "kie";

export interface CreditPackagePrice {
  priceId: string;           // Creem/Stripe 价格 ID
  amount: number;            // 价格（美分）
  currency: string;
}

export interface CreditPackageConfig {
  id: string;
  credits: number;           // 积分数量
  price: CreditPackagePrice;
  type: ProductType;
  billingPeriod?: "month" | "year";
  popular?: boolean;
  disabled?: boolean;
  expireDays?: number;       // 覆盖默认过期天数
  features?: string[];       // 功能列表（用于展示）
  /** 是否允许免费用户购买（仅积分包有效） */
  allowFreeUser?: boolean;
}

export interface ModelConfig {
  id: string;
  name: string;
  provider: ProviderType;
  description: string;
  supportImageToVideo: boolean;
  maxDuration: number;
  durations: number[];
  aspectRatios: string[];
  qualities?: string[];
  creditCost: {
    base: number;            // 基础积分�?0s�?
    perExtraSecond?: number; // 每额外秒积分
    highQualityMultiplier?: number; // 高质量乘�?
  };
}

// ============================================
// 用户配置导入
// ============================================
// 所有的价格和积分配置都�?pricing-user.ts �?
// 用户只需要修改那个文件即�?
import {
  NEW_USER_GIFT,
  CREDIT_EXPIRATION,
  SUBSCRIPTION_PRODUCTS,
  CREDIT_PACKAGES,
  VIDEO_MODEL_PRICING,
} from "./pricing-user";

// ============================================
// 转换函数：用户配�?-> 内部格式
// ============================================

/** 将美元转换为美分（内部使用） */
function usdToCents(usd: number): number {
  return Math.round(usd * 100);
}

// ============================================
// 统一积分配置（从 pricing-user.ts 生成�?
// ============================================

export const CREDITS_CONFIG = {
  // ========== 系统开�?==========
  enabled: true, // 积分系统始终启用

  // ========== 新用户赠�?==========
  registerGift: {
    enabled: NEW_USER_GIFT.enabled,
    amount: NEW_USER_GIFT.credits,
    expireDays: NEW_USER_GIFT.validDays,
  },

  // ========== 过期配置 ==========
  expiration: {
    subscriptionDays: CREDIT_EXPIRATION.subscriptionDays,
    purchaseDays: CREDIT_EXPIRATION.purchaseDays,
    warnBeforeDays: CREDIT_EXPIRATION.warnBeforeDays,
  },

  // ========== 订阅产品（从 pricing-user.ts 生成�?=========
  subscriptions: Object.fromEntries(
    SUBSCRIPTION_PRODUCTS.filter((p) => p.enabled).map((product) => {
      const isYearly = product.period === "year";
      const planType = product.id.includes("basic")
        ? "BASIC"
        : product.id.includes("pro")
          ? "PRO"
          : "TEAM";
      const envKey = isYearly ? "YEARLY" : "MONTHLY";

      return [
        product.id,
        {
          id: product.id,
          credits: product.credits,
          price: {
            priceId:
              process.env[`NEXT_PUBLIC_CREEM_PRICE_SUB_${planType}_${envKey}`] || "",
            amount: usdToCents(product.priceUsd),
            currency: "USD",
          },
          type: "subscription" as const,
          billingPeriod: product.period,
          popular: product.popular,
          expireDays: isYearly ? 365 : undefined,
          features: product.features || [],
        },
      ];
    })
  ) as Record<string, CreditPackageConfig>,

  // ========== 一次性购买产品（�?pricing-user.ts 生成�?=========
  packages: Object.fromEntries(
    CREDIT_PACKAGES.filter((p) => p.enabled).map((pkg) => [
      pkg.id,
      {
        id: pkg.id,
        credits: pkg.credits,
        price: {
          priceId:
            process.env[`NEXT_PUBLIC_CREEM_PRICE_PACK_${pkg.id.toUpperCase()}`] || "",
          amount: usdToCents(pkg.priceUsd),
          currency: "USD",
        },
        type: "one-time" as const,
        popular: pkg.popular,
        expireDays: CREDIT_EXPIRATION.purchaseDays,
        features: pkg.features || [],
        // allowFreeUser: 是否允许免费用户购买（前端使用）
        allowFreeUser: pkg.allowFreeUser ?? true, // 默认允许
      },
    ])
  ) as Record<string, CreditPackageConfig>,

  // ========== AI 模型配置（从 pricing-user.ts 生成�?=========
  models: Object.fromEntries(
    Object.entries(VIDEO_MODEL_PRICING)
      .filter(([_, pricing]) => pricing.enabled)
      .map(([modelId, pricing]) => {
        // 模型基础配置（从 defaults.ts 获取�?
        const baseConfigs: Record<string, Omit<ModelConfig, "creditCost">> = {
          "seedance-2.0-mini": {
            id: "seedance-2.0-mini",
            name: "Seedance 2.0 Mini",
            provider: "evolink" as const,
            description: "models.seedance20mini.description",
            supportImageToVideo: false,
            maxDuration: 8,
            durations: [5, 8],
            aspectRatios: ["16:9", "9:16", "1:1", "4:3", "3:4", "21:9"],
            qualities: ["480P", "720P"],
          },
          "wan-2.5": {
            id: "wan-2.5",
            name: "Wan 2.5",
            provider: "evolink" as const,
            description: "models.wan25.description",
            supportImageToVideo: false,
            maxDuration: 10,
            durations: [5, 10],
            aspectRatios: ["16:9", "9:16", "1:1", "4:3", "3:4"],
            qualities: ["480P", "720P"],
          },
          "seedance-2.0": {
            id: "seedance-2.0",
            name: "Seedance 2.0",
            provider: "evolink" as const,
            description: "models.seedance20.description",
            supportImageToVideo: true,
            maxDuration: 12,
            durations: [4, 8, 12],
            aspectRatios: ["16:9", "9:16", "1:1", "4:3", "3:4", "21:9"],
            qualities: ["720P"],
          },
          "kling-3.0": {
            id: "kling-3.0",
            name: "Kling 3.0",
            provider: "evolink" as const,
            description: "models.kling30.description",
            supportImageToVideo: true,
            maxDuration: 10,
            durations: [5, 10],
            aspectRatios: ["16:9", "9:16"],
            qualities: ["720P"],
          },
          "sora-2": {
            id: "sora-2",
            name: "Sora 2",
            provider: "evolink" as const,
            description: "models.sora2.description",
            supportImageToVideo: true,
            maxDuration: 12,
            durations: [4, 8, 12],
            aspectRatios: ["16:9", "9:16"],
            qualities: ["720P"],
          },
        };
        const baseConfig = baseConfigs[modelId];
        if (!baseConfig) return null;

        const creditCost: {
          base: number;
          perExtraSecond: number;
          highQualityMultiplier?: number;
        } = {
          base: pricing.baseCredits,
          perExtraSecond: pricing.perSecond,
        };

        if (pricing.qualityMultiplier !== undefined) {
          creditCost.highQualityMultiplier = pricing.qualityMultiplier;
        }

        return [
          modelId,
          {
            ...baseConfig,
            creditCost,
          },
        ];
      })
      .filter(Boolean) as Array<[string, ModelConfig]>
  ) as Record<string, ModelConfig>,
};

// ============================================
// 辅助函数
// ============================================

/** 获取所有订阅产�?*/
export function getSubscriptionProducts(): CreditPackageConfig[] {
  return Object.values(CREDITS_CONFIG.subscriptions).filter(
    (p) => !(p as CreditPackageConfig).disabled
  );
}

/** 获取所有一次性购买产�?*/
export function getOnetimeProducts(): CreditPackageConfig[] {
  return Object.values(CREDITS_CONFIG.packages).filter(
    (p) => !(p as CreditPackageConfig).disabled
  );
}

/** 根据产品 ID 获取配置 */
export function getProductById(productId: string): CreditPackageConfig | null {
  const all = {
    ...CREDITS_CONFIG.subscriptions,
    ...CREDITS_CONFIG.packages,
  };
  return Object.values(all).find(p => p.id === productId) || null;
}

/** 获取产品过期天数 */
export function getProductExpiryDays(product: CreditPackageConfig): number {
  if (product.expireDays !== undefined) {
    return product.expireDays;
  }
  return product.type === "subscription"
    ? CREDITS_CONFIG.expiration.subscriptionDays
    : CREDITS_CONFIG.expiration.purchaseDays;
}

/** 获取所有可用模�?*/
export function getAvailableModels(): ModelConfig[] {
  return Object.values(CREDITS_CONFIG.models);
}

/** 根据模型 ID 获取配置 */
export function getModelConfig(modelId: string): ModelConfig | null {
  return CREDITS_CONFIG.models[modelId as keyof typeof CREDITS_CONFIG.models] || null;
}

/** 计算模型积分消耗（基于 Evolink 1:1 成本�?*/
export function calculateModelCredits(
  modelId: string,
  params: { duration: number; quality?: string }
): number {
  const config = getModelConfig(modelId);
  if (!config) return 0;

  const { base, perExtraSecond = 0, highQualityMultiplier = 1 } = config.creditCost;
  const isHighQuality = params.quality?.toLowerCase() === "high" || params.quality?.includes("1080");

  let credits = 0;

  // 根据模型使用不同的计算逻辑
  switch (modelId) {
    case "seedance-2.0-mini": {
      credits = params.duration * 7;
      break;
    }

    case "wan-2.5": {
      credits = params.duration * 2;
      break;
    }

    case "seedance-2.0": {
      credits = params.duration * (isHighQuality ? 8 : 4);
      break;
    }

    case "kling-3.0": {
      credits = params.duration * (isHighQuality ? 9 : 6);
      break;
    }

    case "sora-2": {
      credits = params.duration * 6.5;
      break;
    }

    default: {
      const extraSeconds = Math.max(0, params.duration - 10);
      credits = base + extraSeconds * perExtraSecond;

      if (isHighQuality && highQualityMultiplier > 1) {
        credits = credits * highQualityMultiplier;
      }
      break;
    }
  }
  // 向上取整
  return Math.ceil(credits);
}
