/**
 * Video Credit Calculator
 *
 * 缁熶竴鐨勮棰戠敓鎴愮Н鍒嗚绠楅€昏緫
 * 鍓嶇鍜屽悗绔娇鐢ㄧ浉鍚岀殑璁＄畻瑙勫垯锛岀‘淇濅竴鑷存€?
 */

import type { VideoModel } from "@/components/video-generator";

// ============================================================================
// Types
// ============================================================================

export interface CreditCalculationParams {
  model: VideoModel;
  duration?: string; // "5s", "10s", etc.
  resolution?: string; // "480P", "720P", "1080P"
  quality?: string; // "standard", "high"
  outputNumber: number;
  generateAudio?: boolean;
}

// ============================================================================
// Parser Functions
// ============================================================================

/** 瑙ｆ瀽鏃堕暱瀛楃涓?"5s" -> 5 */
export function parseDuration(duration?: string): number {
  if (!duration) return 0;
  const match = duration.match(/^(\d+)s?$/);
  return match ? Number.parseInt(match[1], 10) : 0;
}

/** 瑙ｆ瀽鍒嗚鲸鐜?"720P" -> 720 */
export function parseResolution(resolution?: string): number {
  if (!resolution) return 720;
  const match = resolution.match(/^(\d+)P?$/i);
  return match ? Number.parseInt(match[1], 10) : 720;
}

/** 鍒ゆ柇鏄惁涓洪珮璐ㄩ噺 */
export function isHighQuality(resolution?: string, quality?: string): boolean {
  const res = parseResolution(resolution);
  return res >= 1080 || quality === "high";
}

// ============================================================================
// Model-specific Calculators
// ============================================================================

// Model-specific pricing for the current EvoLink core model set.
function calculateSeedance20MiniCredits(params: CreditCalculationParams): number {
  const duration = parseDuration(params.duration) || 5;
  return Math.ceil(duration * 7) * params.outputNumber;
}

function calculateWan25Credits(params: CreditCalculationParams): number {
  const duration = parseDuration(params.duration) || 5;
  return Math.ceil(duration * 2) * params.outputNumber;
}

function calculateSeedance20Credits(params: CreditCalculationParams): number {
  const duration = parseDuration(params.duration) || 4;
  const perSecond = isHighQuality(params.resolution, params.quality) ? 8 : 4;
  return Math.ceil(duration * perSecond) * params.outputNumber;
}

function calculateKling30Credits(params: CreditCalculationParams): number {
  const duration = parseDuration(params.duration) || 5;
  const perSecond = isHighQuality(params.resolution, params.quality) ? 9 : 6;
  return Math.ceil(duration * perSecond) * params.outputNumber;
}

function calculateSora2Credits(params: CreditCalculationParams): number {
  const duration = parseDuration(params.duration) || 4;
  return Math.ceil(duration * 6.5) * params.outputNumber;
}

// ============================================================================
// Main Calculator
// ============================================================================

/**
 * 璁＄畻瑙嗛鐢熸垚鎵€闇€绉垎
 *
 * @example
 * ```ts
 * const credits = calculateVideoCredits({
 *   model: sora2Model,
 *   duration: "12s",
 *   resolution: "720P",
 *   outputNumber: 1,
 * });
 * // returns 78
 * ```
 */
export function calculateVideoCredits(params: CreditCalculationParams): number {
  const { model } = params;

  // 鏍规嵁妯″瀷 ID 浣跨敤涓嶅悓鐨勮绠楅€昏緫
  switch (model.id) {
    case "seedance-2.0-mini":
      return calculateSeedance20MiniCredits(params);

    case "wan-2.5":
      return calculateWan25Credits(params);

    case "seedance-2.0":
      return calculateSeedance20Credits(params);

    case "kling-3.0":
      return calculateKling30Credits(params);

    case "sora-2":
      return calculateSora2Credits(params);

    default:
      return model.creditCost * params.outputNumber;
  }
}

// ============================================================================
// React Hook
// ============================================================================

/**
 * 鐢ㄤ簬 React 缁勪欢鐨勭Н鍒嗚绠?Hook
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const credits = useCreditCalculator({
 *     model: selectedModel,
 *     duration: selectedDuration,
 *     resolution: selectedResolution,
 *     outputNumber: selectedOutputNumber,
 *   });
 *
 *   return <div>{credits} 绉垎</div>;
 * }
 * ```
 */
export function useCreditCalculator(params: Omit<CreditCalculationParams, "model"> & { model: VideoModel | null }): number {
  const { model, ...rest } = params;

  if (!model) return 0;

  return calculateVideoCredits({
    model,
    ...rest,
    outputNumber: rest.outputNumber ?? 1,
  });
}

// ============================================================================
// Display Helpers
// ============================================================================

/**
 * 鏍煎紡鍖栫Н鍒嗘樉绀?
 * @example
 * formatCredits(100) // "100 绉垎"
 * formatCredits(100, { compact: true }) // "100"
 */
export function formatCredits(
  credits: number,
  options?: { compact?: boolean; suffix?: string }
): string {
  const { compact = false, suffix = "绉垎" } = options || {};
  return compact ? String(credits) : `${credits} ${suffix}`;
}

/**
 * 鑾峰彇绉垎鑼冨洿鏄剧ず锛堢敤浜庢ā鍨嬪崱鐗囷級
 * @example
 * getCreditRangeText(model) // "10-24 绉垎"
 */
export function getCreditRangeText(model: VideoModel): string {
  const minCredits = calculateVideoCredits({
    model,
    outputNumber: 1,
  });

  // 璁＄畻鏈€澶хН鍒嗭紙鍋囪鏈€澶ф椂闀?杈撳嚭鏁伴噺锛?
  let maxCredits = minCredits;

  if (model.id === "seedance-2.0-mini") {
    maxCredits = calculateVideoCredits({
      model,
      duration: "8s",
      resolution: "720P",
      outputNumber: 1,
    });
  } else if (model.id === "wan-2.5") {
    maxCredits = calculateVideoCredits({
      model,
      duration: "10s",
      resolution: "720P",
      outputNumber: 1,
    });
  } else if (model.id === "seedance-2.0") {
    maxCredits = calculateVideoCredits({
      model,
      duration: "12s",
      resolution: "1080P",
      outputNumber: 1,
    });
  } else if (model.id === "kling-3.0") {
    maxCredits = calculateVideoCredits({
      model,
      duration: "10s",
      resolution: "1080P",
      outputNumber: 1,
    });
  } else if (model.id === "sora-2") {
    maxCredits = calculateVideoCredits({
      model,
      duration: "12s",
      outputNumber: 1,
    });
  }

  if (minCredits === maxCredits) {
    return formatCredits(minCredits);
  }

  return `${minCredits}-${maxCredits} ${model.creditDisplay || "绉垎"}`;
}
