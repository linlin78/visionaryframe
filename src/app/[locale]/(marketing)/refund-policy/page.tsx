import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Footer } from "@/components/landing/new/footer";
import type { Locale } from "@/config/i18n-config";

interface RefundPolicyPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata({
  params,
}: RefundPolicyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "RefundPolicy" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RefundPolicyPage({ params }: RefundPolicyPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "RefundPolicy" });

  return (
    <div className="min-h-screen bg-[#0A0A0B] py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-[#6B6B70]">{t("description")}</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <div className="bg-[#141415] rounded-2xl p-8 md:p-12 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">{t("intro.title")}</h2>
              <p className="text-[#8B8B90] leading-relaxed">{t("intro.content")}</p>
            </section>

            {/* Refund Conditions - Visual Cards */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">{t("conditions.title")}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Refundable */}
                <div className="bg-green-950/30 border border-green-800/50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">✓</span>
                    <h3 className="text-lg font-semibold text-green-400">{t("conditions.refundable.label")}</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-[#8B8B90]">
                    {t.raw("conditions.refundable.items").map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Non-Refundable */}
                <div className="bg-red-950/30 border border-red-800/50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">✗</span>
                    <h3 className="text-lg font-semibold text-red-400">{t("conditions.nonRefundable.label")}</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-[#8B8B90]">
                    {t.raw("conditions.nonRefundable.items").map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Conditional */}
                <div className="bg-yellow-950/30 border border-yellow-800/50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">⚠</span>
                    <h3 className="text-lg font-semibold text-yellow-400">{t("conditions.conditional.label")}</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-[#8B8B90]">
                    {t.raw("conditions.conditional.items").map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-yellow-400 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Refund Process Timeline */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">{t("process.title")}</h2>
              <div className="space-y-4">
                {t.raw("process.steps").map((step: any, idx: number) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-[#1A1A1C] rounded-lg border border-[#2A2A2D]">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                      {step.step}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-white mb-1">{step.action}</h3>
                      <p className="text-sm text-[#6B6B70]">{step.time}</p>
                    </div>
                  </div>
                ))}
                <div className="mt-6 p-4 bg-[#A855F7]/10 border border-[#A855F7]/30 rounded-lg text-center">
                  <p className="text-[#A855F7] font-semibold">{t("process.totalTime")}</p>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">{t("contact.title")}</h2>
              <div className="space-y-4">
                <div className="p-6 bg-[#1A1A1C] rounded-lg border border-[#2A2A2D]">
                  <p className="text-white mb-2 font-semibold">Primary Email</p>
                  <a
                    href={`mailto:${t("contact.primaryEmail")}`}
                    className="text-[#A855F7] hover:underline text-lg"
                  >
                    {t("contact.primaryEmail")}
                  </a>
                  <p className="text-sm text-[#6B6B70] mt-2">{t("contact.responseTime")}</p>
                </div>

                <div className="p-6 bg-[#1A1A1C] rounded-lg border border-[#2A2A2D]">
                  <p className="text-white mb-3 font-semibold">Required Information</p>
                  <ul className="space-y-2">
                    {t.raw("contact.requiredInfo").map((item: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-[#8B8B90]">
                        <span className="text-[#A855F7]">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-sm text-[#6B6B70] italic">{t("contact.alternativeContact")}</p>

                <a
                  href={`mailto:${t("contact.primaryEmail")}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  {t("contact.button")}
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
