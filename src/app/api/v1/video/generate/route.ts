import { NextRequest } from "next/server";
import { videoService } from "@/services/video";
import { requireAuth } from "@/lib/api/auth";
import { apiSuccess, handleApiError } from "@/lib/api/response";
import { z } from "zod";

const generateSchema = z.object({
  prompt: z.string().min(1).max(5000),
  model: z.enum(["sora-2", "wan-2.6", "veo-3.1", "seedance-1.5-pro"]),
  mode: z.string().optional(),
  duration: z.union([z.literal(5), z.literal(10), z.literal(15)]),
  aspectRatio: z.enum(["16:9", "9:16"]).optional(),
  quality: z.enum(["standard", "high"]).optional(),
  imageUrl: z.string().url().optional(),
  outputNumber: z.number().optional(),
  generateAudio: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    const body = await request.json();
    const data = generateSchema.parse(body);

    // 验证模型和时长的兼容性
    const { getModelConfig } = await import("@/config/credits");
    const modelConfig = getModelConfig(data.model);

    if (!modelConfig) {
      throw new Error(`Unsupported model: ${data.model}`);
    }

    if (!modelConfig.durations.includes(data.duration)) {
      throw new Error(
        `Model ${data.model} does not support duration ${data.duration}s. Supported durations: ${modelConfig.durations.join(", ")}s`
      );
    }

    const result = await videoService.generate({
      userId: user.id,
      prompt: data.prompt,
      model: data.model,
      duration: data.duration,
      aspectRatio: data.aspectRatio,
      quality: data.quality,
      imageUrl: data.imageUrl,
    });

    return apiSuccess(result);
  } catch (error) {
    return handleApiError(error);
  }
}
