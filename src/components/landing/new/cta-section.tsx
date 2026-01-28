"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";

export function CTASection() {
  const locale = useLocale();

  return (
    <section className="relative min-h-[400px] flex items-center justify-center py-[100px]">
      {/* Purple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#A855F7] to-[#7C3AED]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            开始你的 AI 视频创作之旅
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-white/80 leading-relaxed"
          >
            新用户注册即送 50 积分，无需信用卡，3 分钟即可开始
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href={`/${locale}/text-to-video`}
              className="inline-flex items-center gap-2 px-12 py-5 rounded-xl bg-white text-[#7C3AED] font-medium hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              免费开始创作
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base text-white/80 pt-4"
          >
            ✓ 无需信用卡  ✓ 50 积分免费试用  ✓ 随时取消
          </motion.p>
        </div>
      </div>
    </section>
  );
}
