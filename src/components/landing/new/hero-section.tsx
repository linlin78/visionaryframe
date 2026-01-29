"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export function HeroSection() {
  const locale = useLocale();
  const t = useTranslations("Hero");

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
              {t("badge")}
            </span>
          </motion.div>

          {/* Main Title - Auto split by comma */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white"
          >
            {t("title").split(/，|,/).map((part: string, index: number) => (
              <span key={index}>
                {index > 0 && <br />}
                {part}
              </span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-[#A855F7] tracking-widest font-normal"
            style={{ letterSpacing: "0.2em" }}
          >
            {t("subtitle")}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-[#ADADB0] leading-relaxed max-w-2xl mx-auto"
          >
            {t("description")}
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
                {t("startCreating")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              href={`/${locale}/demo`}
              className="px-8 py-4 rounded-xl border-2 border-[#A855F7] text-white font-medium hover:bg-[#A855F710] transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                {t("viewExamples")}
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
              <span>已为众多创作者生成视频，广受创作者好评</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
