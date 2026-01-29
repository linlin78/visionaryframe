"use client";

import { Play, ArrowRight, Sparkles, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState, useCallback, useRef } from "react";

import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { LocaleLink } from "@/i18n/navigation";

/**
 * Showcase Section - 视频示例展示区域
 *
 * 使用本地视频展示 AI 生成的视频示例
 */

// 示例视频数据 - 使用本地视频
const showcaseVideos = [
  {
    id: "sora-2",
    title: "Sora 2 - 电影级场景",
    description: "OpenAI Sora 2 文生视频演示",
    videoSrc: "/demo-videos/sora-2-demo.mp4",
    gradient: "from-blue-500 to-purple-500",
    tag: "Text to Video",
    provider: "OpenAI",
  },
  {
    id: "wan-26",
    title: "Wan 2.6 - 创意动画",
    description: "阿里通义万相 AI 视频生成",
    videoSrc: "/demo-videos/wan-26-demo.mp4",
    gradient: "from-orange-500 to-red-500",
    tag: "AI Creative",
    provider: "阿里通义",
  },
  {
    id: "veo-31",
    title: "Veo 3.1 - 精准控制",
    description: "Google DeepMind 视频生成",
    videoSrc: "/demo-videos/veo-31-demo.mp4",
    gradient: "from-green-500 to-emerald-500",
    tag: "Image to Video",
    provider: "Google",
  },
  {
    id: "seedance-15",
    title: "Seedance 1.5 Pro - 流畅运动",
    description: "字节跳动音视频联合生成",
    videoSrc: "/demo-videos/seedance-15-demo.mp4",
    gradient: "from-purple-500 to-pink-500",
    tag: "AI Creative",
    provider: "ByteDance",
  },
];

export function ShowcaseSection() {
  const t = useTranslations("Showcase");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [mutedIds, setMutedIds] = useState<Set<string>>(new Set());
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});

  const togglePlay = useCallback((id: string) => {
    setPlayingId((prev) => {
      const newPlayingId = prev === id ? null : id;

      // Pause all videos
      Object.values(videoRefs.current).forEach((video) => {
        if (video) video.pause();
      });

      // Play selected video
      if (newPlayingId && videoRefs.current[newPlayingId]) {
        const video = videoRefs.current[newPlayingId];
        video.muted = mutedIds.has(newPlayingId);
        video.play().catch((err) => console.error("Error playing video:", err));
      }

      return newPlayingId;
    });
  }, [mutedIds]);

  const toggleMute = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMutedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
        if (videoRefs.current[id]) {
          videoRefs.current[id].muted = false;
        }
      } else {
        newSet.add(id);
        if (videoRefs.current[id]) {
          videoRefs.current[id].muted = true;
        }
      }
      return newSet;
    });
  }, []);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      </div>

      <div className="container mx-auto px-4">
        {/* 区域标题 */}
        <BlurFade inView>
          <div className="text-center max-w-3xl mx-auto mb-16">
            {/* 徽章 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6"
            >
              <Sparkles className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {t("badge")}
              </span>
            </motion.div>

            {/* 主标题 */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            >
              {t("title")}
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mt-2">
                {t("subtitle")}
              </span>
            </motion.h2>

            {/* 描述 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              {t("description")}
            </motion.p>
          </div>
        </BlurFade>

        {/* 视频展示网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {showcaseVideos.map((video, index) => {
            const isPlaying = playingId === video.id;
            const isMuted = mutedIds.has(video.id);

            return (
              <BlurFade key={video.id} delay={index * 0.05} inView>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group relative"
                >
                  {/* 视频卡片 */}
                  <div
                    className="relative rounded-2xl overflow-hidden border border-border bg-background shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                    onClick={() => togglePlay(video.id)}
                    suppressHydrationWarning
                  >
                    {/* 边框光效 - 仅第一个大卡片 */}
                    {index === 0 && (
                      <BorderBeam
                        size={300}
                        duration={15}
                        anchor={90}
                        borderWidth={2}
                        colorFrom="#3B82F6"
                        colorTo="#A855F7"
                      />
                    )}

                    {/* 视频播放区域 */}
                    <div className="relative aspect-video bg-black" suppressHydrationWarning>
                      <video
                        suppressHydrationWarning
                        ref={(el) => {
                          if (el) videoRefs.current[video.id] = el;
                        }}
                        src={video.videoSrc}
                        className="w-full h-full object-contain"
                        controls={false}
                        loop
                        playsInline
                      />

                      {/* 未播放时的遮罩和播放按钮 */}
                      {!isPlaying && (
                        <>
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            whileHover={{ scale: 1.1 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <div className="relative">
                              <motion.div
                                className={`w-16 h-16 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center shadow-xl transition-all duration-300 bg-gradient-to-br ${video.gradient}`}
                                whileHover={{ scale: 1.1 }}
                              >
                                <Play className="h-6 w-6 text-white ml-1" />
                              </motion.div>
                              {/* 波纹动画 */}
                              <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${video.gradient} animate-ping opacity-0 group-hover:opacity-30`} />
                            </div>
                          </motion.div>
                        </>
                      )}

                      {/* 静音按钮 */}
                      {isPlaying && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          onClick={(e) => toggleMute(video.id, e)}
                          className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors"
                        >
                          {isMuted ? (
                            <VolumeX className="w-5 h-5 text-white" />
                          ) : (
                            <Volume2 className="w-5 h-5 text-white" />
                          )}
                        </motion.button>
                      )}

                      {/* 标签 */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/20"
                      >
                        <span className="text-xs font-medium text-white">{video.tag}</span>
                      </motion.div>
                    </div>

                    {/* 视频信息 */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                        {video.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-1">{video.description}</p>
                      <p className="text-xs text-muted-foreground">{video.provider}</p>
                    </div>
                  </div>
                </motion.div>
              </BlurFade>
            );
          })}
        </div>

        {/* 底部 CTA */}
        <BlurFade delay={0.4} inView>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-muted-foreground mb-6">{t("ctaText")}</p>
            <LocaleLink href="/demo">
              <ShimmerButton
                shimmerColor="#ffffff"
                shimmerSize="0.05em"
                shimmerDuration="3s"
                borderRadius="100px"
                background="linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)"
                className="px-8 py-3 text-base font-medium shadow-lg shadow-blue-500/25"
              >
                {t("ctaButton")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </ShimmerButton>
            </LocaleLink>
          </motion.div>
        </BlurFade>
      </div>
    </section>
  );
}
