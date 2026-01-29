"use client";

import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { LocaleLink } from "@/i18n/navigation";
import { AI_MODELS_OFFICIAL } from "@/config/ai-models-official";

/**
 * AI Models Official Showcase Section - AI 模型官网展示区域
 *
 * 展示所有支持的 AI 视频生成模型的官网链接，不使用第三方视频嵌入
 */
export function AIModelsOfficialShowcase() {
  const t = useTranslations("Showcase");

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

        {/* AI 模型官网展示网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {Object.values(AI_MODELS_OFFICIAL).map((model, index) => {
            return (
              <BlurFade key={model.id} delay={index * 0.05} inView>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group relative"
                >
                  {/* 模型卡片 */}
                  <div className="relative rounded-2xl overflow-hidden border border-border bg-background shadow-lg hover:shadow-2xl transition-all duration-300">
                    {/* 边框光效 - 仅第一个卡片 */}
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

                    {/* 模型封面图片 */}
                    <div className="relative aspect-video bg-gradient-to-br from-blue-500/10 to-purple-500/10 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-8">
                          {/* 模型图标/名称首字母 */}
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg"
                          >
                            {model.name.charAt(0)}
                          </motion.div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {model.name}
                          </h3>
                          <p className="text-sm text-gray-300">{model.provider}</p>
                        </div>
                      </div>

                      {/* 渐变遮罩 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                    </div>

                    {/* 模型信息 */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          {/* 模型名称和提供商 */}
                          <h3 className="text-xl font-bold mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                            {model.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{model.provider}</p>
                        </div>
                      </div>

                      {/* 标语 */}
                      <p className="text-sm text-muted-foreground mb-4">
                        {model.tagline}
                      </p>

                      {/* 官网链接按钮组 */}
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={model.officialWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          官方网站
                        </a>

                        {/* 额外的探索链接（如果有的话） */}
                        {"explorePage" in model && (
                          <a
                            href={model.explorePage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
                          >
                            <Sparkles className="w-4 h-4" />
                            探索案例
                          </a>
                        )}
                        {"galleryPage" in model && (
                          <a
                            href={model.galleryPage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
                          >
                            <Sparkles className="w-4 h-4" />
                            案例画廊
                          </a>
                        )}
                        {"communityGallery" in model && (
                          <a
                            href={model.communityGallery}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
                          >
                            <Sparkles className="w-4 h-4" />
                            社区案例
                          </a>
                        )}
                      </div>
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
