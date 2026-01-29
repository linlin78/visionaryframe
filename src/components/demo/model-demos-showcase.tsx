/**
 * AI Models Demo Showcase
 *
 * 展示所有 AI 视频生成模型的官方演示视频
 */

"use client";

import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import { DEMO_VIDEOS, EmbeddedYouTubeVideo, EmbeddedBilibiliVideo } from "@/config/demo-videos";

export function ModelDemosShowcase() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* 标题 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI 模型演示视频
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            观看各个 AI 模型的官方演示视频，了解它们的强大功能
          </p>
        </div>

        {/* 视频网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {Object.values(DEMO_VIDEOS).map((video, index) => {
            const isYouTube = video.provider !== "Alibaba Tongyi";

            return (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl overflow-hidden border border-border shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* 视频嵌入 */}
                <div className="aspect-video bg-black">
                  {isYouTube ? (
                    <EmbeddedYouTubeVideo
                      youtubeId={video.youtubeId}
                      title={video.title}
                      className="w-full h-full"
                    />
                  ) : (
                    <EmbeddedBilibiliVideo
                      bvid={video.youtubeId}
                      title={video.title}
                      className="w-full h-full"
                    />
                  )}
                </div>

                {/* 视频信息 */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{video.name}</h3>
                      <p className="text-sm text-muted-foreground">{video.provider}</p>
                    </div>
                    <a
                      href={video.watchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      原视频
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground">{video.title}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 底部说明 */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            以上视频均为各 AI 模型官方发布的演示内容
          </p>
        </div>
      </div>
    </section>
  );
}
