import { NextRequest } from "next/server";
import { videoService } from "@/services/video";
import { requireAuth } from "@/lib/api/auth";
import { apiSuccess, handleApiError } from "@/lib/api/response";
import { z } from "zod";
// Import proxy configuration for fetch requests
import "@/lib/proxy-config";

const generateSchema = z.object({
  prompt: z.string().min(1).max(5000),
  model: z.string().min(1),
  mode: z.string().optional(),
  duration: z.number().optional(),
  aspectRatio: z.string().optional(),
  quality: z.string().optional(),
  imageUrl: z.string().url().optional(),
  imageUrls: z.array(z.string().url()).optional(),
  outputNumber: z.number().int().min(1).optional().default(1),
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
      imageUrls: data.imageUrls,
      mode: data.mode,
      outputNumber: data.outputNumber,
      generateAudio: data.generateAudio,
    });

    return apiSuccess(result);
  } catch (error) {
    return handleApiError(error);
  }
}
