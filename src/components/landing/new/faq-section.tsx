"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "什么是 VisionFrame？",
      answer: "VisionFrame 是一个 AI 视频生成平台，让你只需输入文字描述或上传图片，就能在 3-5 分钟内生成专业级视频。无需任何视频制作经验。",
    },
    {
      question: "支持哪些 AI 模型？",
      answer: "我们支持业界最先进的 AI 视频生成模型，包括 Sora 2、Veo 3.1、Runway Gen-3 等，并会持续更新最新模型。",
    },
    {
      question: "生成一个视频需要多久？",
      answer: "通常 3-5 分钟即可完成视频生成。具体时间取决于视频时长和复杂度。",
    },
    {
      question: "如何收费？",
      answer: "我们采用积分制，新用户注册即送 50 积分。你可以根据需要购买不同套餐，积分灵活无有效期。",
    },
    {
      question: "视频质量如何？",
      answer: "支持 1080p、4K 等多种分辨率输出，视频质量专业，可直接用于社交媒体、营销推广等场景。",
    },
    {
      question: "需要专业的视频制作经验吗？",
      answer: "完全不需要！只需简单描述你想要的视频内容，AI 会自动完成所有制作工作。小白也能轻松上手。",
    },
  ];

  return (
    <section className="relative min-h-[800px] flex items-center justify-center bg-[#0A0A0B] py-[80px]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              常见问题
            </h2>
            <p className="text-lg text-[#ADADB0]">
              快速了解 VisionFrame 的常见问题
            </p>
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-[#111113] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-[#1A1A1C] transition-colors duration-300"
                >
                  <span className="text-lg font-semibold text-white pr-8">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8B8B90] transition-transform duration-300 flex-shrink-0 ${
                      openIndex === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-base text-[#8B8B90] leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
