"use client";

import { motion } from "framer-motion";
import { Zap, ImageIcon, Clock, Hd, Palette, Wallet } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "最新 AI 模型",
      description: "支持 Sora 2、Veo 3.1、Runway Gen-3 等业界最先进的视频生成模型",
    },
    {
      icon: ImageIcon,
      title: "多模态输入",
      description: "支持文本转视频、图片转视频，满足不同创作需求",
    },
    {
      icon: Clock,
      title: "快速生成",
      description: "3-5 分钟即可生成高质量视频，大幅提升创作效率",
    },
    {
      icon: Hd,
      title: "高清输出",
      description: "支持 1080p、4K 等多种分辨率，满足不同使用场景",
    },
    {
      icon: Palette,
      title: "多种风格",
      description: "电影感、动画、实景等多种风格，让创作更自由",
    },
    {
      icon: Wallet,
      title: "积分灵活",
      description: "按需购买积分，套餐灵活，性价比高",
    },
  ];

  return (
    <section className="relative min-h-[800px] flex items-center justify-center bg-[#0A0A0B] py-[80px]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              为什么选择 VideoFly
            </h2>
            <p className="text-lg text-[#ADADB0]">
              强大功能，让视频创作更简单
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-[#111113] rounded-2xl p-8 space-y-4 hover:bg-[#1A1A1C] transition-colors duration-300"
                >
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-[#A855F718] flex items-center justify-center">
                    <Icon className="w-7 h-7 text-[#A855F7]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base text-[#8B8B90] leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
