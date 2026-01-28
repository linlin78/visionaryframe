"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";

export function HeroSection() {
  const locale = useLocale();

  return (
    <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden bg-[#0A0A0B]">
      {/* Purple gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#A855F722] to-[#0A0A0B]" />

      <div className="container mx-auto px-4 py-[100px] relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A855F718] backdrop-blur-sm"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
            <span className="text-sm font-medium text-[#A855F7]">
              支持 Sora 2、Veo 3.1 等最新模型
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white"
          >
            一键生成精彩视频
            <br />
            人人都是创作者
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-[#A855F7] tracking-widest font-normal"
            style={{ letterSpacing: "0.2em" }}
          >
            AI 视频创作平台
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-[#ADADB0] leading-relaxed max-w-2xl mx-auto"
          >
            不需要任何专业技能，只需输入文字或上传图片，
            <br />
            AI 帮你在 3 分钟内生成专业级视频。
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              href={`/${locale}/text-to-video`}
              className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-[#A855F7] to-[#C084FC] text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                免费开始创作
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              href={`/${locale}/demo`}
              className="px-8 py-4 rounded-xl border-2 border-[#A855F7] text-white font-medium hover:bg-[#A855F710] transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                查看示例
              </span>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 text-sm"
          >
            <div className="flex items-center gap-2 text-[#6B6B70]">
              <span>已为 10,000+ 创作者生成视频</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-[#6B6B70]" />
            <div className="flex items-center gap-1 text-[#FFD700]">
              <span>★★★★★</span>
              <span className="text-[#FFD700] font-medium">4.9/5</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
