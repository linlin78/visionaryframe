/**
 * AI Provider Model Mapping Configuration
 *
 * This file defines the mapping between internal model IDs and provider-specific model IDs,
 * along with parameter transformation rules.
 *
 * @version 1.0.0
 * @last-updated 2026-01-26
 */

// ============================================================================
// Type Definitions
// ============================================================================

export type ProviderType = "evolink" | "kie";

export interface ProviderModelConfig {
  /** Provider-specific model ID */
  providerModelId: string | ((params: Record<string, any>) => string);
  /** API endpoint (optional, if different from default) */
  apiEndpoint?: string;
  /** Parameter transformation function */
  transformParams?: (
    internalModelId: string,
    params: Record<string, any>
  ) => Record<string, any>;
  /** Response transformation function */
  transformResponse?: (response: any) => any;
  /** Whether this provider supports this model */
  supported: boolean;
}

export interface ModelMapping {
  /** Internal unified model ID */
  internalId: string;
  /** Display name */
  displayName: string;
  /** Provider-specific configurations */
  providers: {
    evolink?: ProviderModelConfig;
    kie?: ProviderModelConfig;
  };
}

// ============================================================================
// Parameter Transformers
// ============================================================================

/**
 * Transform aspect_ratio parameter for different providers
 */
function transformAspectRatio(
  value: string,
  provider: ProviderType
): string {
  if (provider === "evolink") {
    return value; // "16:9", "9:16", etc.
  }

  // KIE uses landscape/portrait for some models
  const kieMapping: Record<string, string> = {
    "16:9": "landscape",
    "9:16": "portrait",
  };

  return kieMapping[value] || value;
}

/**
 * Transform duration parameter (number vs string)
 */
function transformDuration(
  value: number,
  provider: ProviderType
): number | string {
  if (provider === "evolink") {
    return value; // number
  }
  return String(value); // KIE uses string
}

/**
 * Normalize quality across providers
 */
function normalizeQuality(
  value: string | undefined,
  provider: ProviderType,
  internalModelId: string
): string | undefined {
  if (!value) return undefined;
  const normalized = String(value).toLowerCase();

  if (provider === "evolink") {
    if (normalized === "standard") return "720p";
    if (normalized === "high") return "1080p";
    if (normalized === "480p") return "480p";
    if (normalized === "720p") return "720p";
    if (normalized === "1080p") return "1080p";
    return value;
  }

  // KIE special case: Sora uses size = standard/high
  if (internalModelId === "sora-2") {
    if (normalized === "high" || normalized === "1080p") return "high";
    if (normalized === "standard" || normalized === "720p" || normalized === "480p") {
      return "standard";
    }
    return value;
  }

  // KIE default: resolution string
  if (normalized === "standard") return "720p";
  if (normalized === "high") return "1080p";
  if (normalized === "480p") return "480p";
  if (normalized === "720p") return "720p";
  if (normalized === "1080p") return "1080p";
  return value;
}

/**
 * Evolink parameter transformer
 */
function evolinkParamsTransformer(
  internalModelId: string,
  params: Record<string, any>
): Record<string, any> {
  const quality = normalizeQuality(params.quality, "evolink", internalModelId);
  const imageUrls = Array.isArray(params.imageUrls)
    ? params.imageUrls
    : params.imageUrl
      ? [params.imageUrl]
      : undefined;
  const result: Record<string, any> = {
    ...params,
    aspect_ratio: params.aspectRatio || "16:9",
    duration: params.duration || 5,
    remove_watermark: params.removeWatermark ?? true,
    callback_url: params.callbackUrl,
    quality,
    image_urls: imageUrls,
  };

  // Remove internal field names
  delete result.aspectRatio;
  delete result.removeWatermark;
  delete result.callbackUrl;
  delete result.imageUrl;
  delete result.imageUrls;
  delete result.mode;
  delete result.outputNumber;
  delete result.generateAudio;

  // Model-specific adjustments
  if (internalModelId === "sora-2") {
    delete result.quality;
  }

  if (internalModelId === "seedance-2.0-mini" || internalModelId === "wan-2.5") {
    // Safety-test build uses the official text-to-video model IDs only.
    delete result.image_urls;
  }

  return result;
}

/**
 * KIE parameter transformer
 */
function kieParamsTransformer(
  internalModelId: string,
  params: Record<string, any>
): Record<string, any> {
  const baseInput: Record<string, any> = {
    prompt: params.prompt,
  };
  const imageUrls = Array.isArray(params.imageUrls)
    ? params.imageUrls
    : params.imageUrl
      ? [params.imageUrl]
      : undefined;

  // Transform common parameters
  if (params.aspectRatio) {
    if (internalModelId === "veo-3.1") {
      baseInput.aspect_ratio = params.aspectRatio;
    } else {
      baseInput.aspect_ratio = transformAspectRatio(params.aspectRatio, "kie");
    }
  }

  if (params.duration) {
    baseInput.duration = transformDuration(params.duration, "kie");
  }

  if (imageUrls && imageUrls.length > 0) {
    // Sora 2 uses image_urls
    if (internalModelId === "sora-2") {
      baseInput.image_urls = imageUrls;
    }
    // Wan 2.6 uses image_urls
    else if (internalModelId === "wan2.6") {
      baseInput.image_urls = imageUrls;
    }
    // Seedance uses input_urls
    else if (internalModelId === "seedance-1.5-pro") {
      baseInput.input_urls = imageUrls;
    }
    // Veo 3.1 uses imageUrls (camelCase)
    else if (internalModelId === "veo-3.1") {
      baseInput.imageUrls = imageUrls;
    }
  }

  baseInput.remove_watermark = params.removeWatermark ?? true;

  // Sora 2 specific parameters
  if (internalModelId === "sora-2") {
    // KIE's Sora 2 uses n_frames instead of duration
    if (params.duration) {
      baseInput.n_frames = String(params.duration);
      delete baseInput.duration;
    }
    const size = normalizeQuality(params.quality, "kie", internalModelId);
    if (size) {
      baseInput.size = size;
    }
  }

  // Wan 2.6 specific parameters
  if (internalModelId === "wan2.6") {
    baseInput.resolution =
      normalizeQuality(params.quality, "kie", internalModelId) || "1080p";
    baseInput.multi_shots = params.multiShots || false;
  }

  // Veo 3.1 specific parameters
  if (internalModelId === "veo-3.1") {
    baseInput.aspect_ratio = params.aspectRatio || "16:9";
    // Veo 3.1 doesn't use duration
    delete baseInput.duration;
  }

  // Seedance 1.5 Pro specific parameters
  if (internalModelId === "seedance-1.5-pro") {
    baseInput.resolution =
      normalizeQuality(params.quality, "kie", internalModelId) || "720p";
    baseInput.fixed_lens = params.fixedLens ?? true;
    baseInput.generate_audio = params.generateAudio ?? false;
  }

  return {
    input: baseInput,
  };
}

// ============================================================================
// Model Mappings
// ============================================================================

export const MODEL_MAPPINGS: Record<string, ModelMapping> = {
  // -------------------------------------------------------------------------
  // Sora 2
  // -------------------------------------------------------------------------
  "sora-2": {
    internalId: "sora-2",
    displayName: "Sora 2",
    providers: {
      evolink: {
        providerModelId: "sora-2-preview",
        supported: true,
        transformParams: evolinkParamsTransformer,
      },
    },
  },

  // -------------------------------------------------------------------------
  // Seedance 2.0 Mini
  // -------------------------------------------------------------------------
  "seedance-2.0-mini": {
    internalId: "seedance-2.0-mini",
    displayName: "Seedance 2.0 Mini",
    providers: {
      evolink: {
        providerModelId: "seedance-2.0-mini-text-to-video",
        supported: true,
        transformParams: evolinkParamsTransformer,
      },
    },
  },

  // -------------------------------------------------------------------------
  // Wan 2.5
  // -------------------------------------------------------------------------
  "wan-2.5": {
    internalId: "wan-2.5",
    displayName: "Wan 2.5",
    providers: {
      evolink: {
        providerModelId: "wan2.5-text-to-video",
        supported: true,
        transformParams: evolinkParamsTransformer,
      },
    },
  },

  // -------------------------------------------------------------------------
  // Seedance 2.0
  // -------------------------------------------------------------------------
  "seedance-2.0": {
    internalId: "seedance-2.0",
    displayName: "Seedance 2.0",
    providers: {
      evolink: {
        providerModelId: "seedance-2.0-text-to-video",
        supported: false,
        transformParams: evolinkParamsTransformer,
      },
    },
  },

  // -------------------------------------------------------------------------
  // Kling 3.0
  // -------------------------------------------------------------------------
  "kling-3.0": {
    internalId: "kling-3.0",
    displayName: "Kling 3.0",
    providers: {
      evolink: {
        providerModelId: "kling-v3-text-to-video",
        supported: false,
        transformParams: evolinkParamsTransformer,
      },
    },
  },
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get provider model ID for internal model
 */
export function getProviderModelId(
  internalModelId: string,
  provider: ProviderType,
  params?: Record<string, any>
): string {
  const mapping = MODEL_MAPPINGS[internalModelId];
  if (!mapping) {
    throw new Error(`Unknown internal model ID: ${internalModelId}`);
  }

  const providerConfig = mapping.providers[provider];
  if (!providerConfig || !providerConfig.supported) {
    throw new Error(
      `Model ${internalModelId} is not supported by provider ${provider}`
    );
  }

  const providerModelId = providerConfig.providerModelId;

  // Handle dynamic model IDs (functions)
  if (typeof providerModelId === "function") {
    return providerModelId(params || {});
  }

  return providerModelId;
}

/**
 * Get provider config for internal model
 */
export function getProviderConfig(
  internalModelId: string,
  provider: ProviderType
): ProviderModelConfig | undefined {
  const mapping = MODEL_MAPPINGS[internalModelId];
  return mapping?.providers[provider];
}

/**
 * Check if a provider supports a specific model
 */
export function isModelSupported(
  internalModelId: string,
  provider: ProviderType
): boolean {
  const mapping = MODEL_MAPPINGS[internalModelId];
  if (!mapping) return false;

  const providerConfig = mapping.providers[provider];
  return providerConfig?.supported || false;
}

/**
 * Transform parameters for a specific provider
 */
export function transformParamsForProvider(
  internalModelId: string,
  provider: ProviderType,
  params: Record<string, any>
): Record<string, any> {
  const mapping = MODEL_MAPPINGS[internalModelId];
  if (!mapping) {
    throw new Error(`Unknown internal model ID: ${internalModelId}`);
  }

  const providerConfig = mapping.providers[provider];
  if (!providerConfig || !providerConfig.supported) {
    throw new Error(
      `Model ${internalModelId} is not supported by provider ${provider}`
    );
  }

  if (providerConfig.transformParams) {
    return providerConfig.transformParams(internalModelId, params);
  }

  return params;
}

/**
 * Get all supported models for a provider
 */
export function getSupportedModels(provider: ProviderType): string[] {
  return Object.values(MODEL_MAPPINGS)
    .filter((mapping) => mapping.providers[provider]?.supported)
    .map((mapping) => mapping.internalId);
}

/**
 * Get model display name
 */
export function getModelDisplayName(internalModelId: string): string {
  const mapping = MODEL_MAPPINGS[internalModelId];
  return mapping?.displayName || internalModelId;
}
