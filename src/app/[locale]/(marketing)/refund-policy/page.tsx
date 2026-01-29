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

            {/* Refund Policy */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">{t("policy.title")}</h2>
              <div className="space-y-4 text-[#8B8B90]">
                <p>{t("policy.points.credits")}</p>
                <p>{t("policy.points.subscription")}</p>
                <p>{t("policy.points.technical")}</p>
                <p>{t("policy.points.violation")}</p>
              </div>
            </section>

            {/* Refund Process */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">{t("process.title")}</h2>
              <div className="space-y-4 text-[#8B8B90]">
                <p>{t("process.steps.request")}</p>
                <p>{t("process.steps.review")}</p>
                <p>{t("process.steps.approval")}</p>
                <p>{t("process.steps.timeframe")}</p>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">{t("contact.title")}</h2>
              <p className="text-[#8B8B90] mb-4">{t("contact.content")}</p>
              <a
                href="mailto:contact@visionaryframe.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                {t("contact.button")}
              </a>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
