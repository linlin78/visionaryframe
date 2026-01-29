"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

export function FAQSection() {
  const t = useTranslations("LandingFAQ");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqKeys = [
    "whatIs",
    "models",
    "generationTime",
    "pricing",
    "quality",
    "experience",
    "prohibited",
    "responsibility",
    "privacy",
    "commercial",
  ] as const;

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
              {t("title")}
            </h2>
            <p className="text-lg text-[#ADADB0]">
              {t("subtitle")}
            </p>
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqKeys.map((key, index) => (
              <motion.div
                key={key}
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
                    {t(`${key}.question`)}
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
                      {t(`${key}.answer`)}
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
