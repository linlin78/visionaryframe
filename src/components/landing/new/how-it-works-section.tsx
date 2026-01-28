"use client";

import { motion } from "framer-motion";

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "描述想法",
      description: "用文字描述你想要的视频内容，或上传参考图片",
    },
    {
      number: "02",
      title: "AI 生成",
      description: "Sora 2、Veo 3.1 等最新模型为你生成视频",
    },
    {
      number: "03",
      title: "下载分享",
      description: "3-5 分钟后即可下载高质量视频",
    },
  ];

  return (
    <section className="relative min-h-[600px] flex items-center justify-center bg-[#0A0A0B] py-[80px]">
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
              3 步生成视频
            </h2>
            <p className="text-lg text-[#ADADB0]">
              无需专业技能，3 步即可完成专业级视频创作
            </p>
          </motion.div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#111113] rounded-2xl p-8 space-y-5 hover:bg-[#1A1A1C] transition-colors duration-300"
              >
                {/* Number */}
                <div className="text-5xl font-bold text-[#A855F733] font-mono">
                  {step.number}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-base text-[#8B8B90] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
