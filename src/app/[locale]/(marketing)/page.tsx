import { HeroSection } from "@/components/landing/new/hero-section";
import { HowItWorksSection } from "@/components/landing/new/how-it-works-section";
import { FeaturesSection } from "@/components/landing/new/features-section";
import { AIModelsVideoShowcase } from "@/components/landing/ai-models-video-showcase";
import { FAQSection } from "@/components/landing/new/faq-section";
import { CTASection } from "@/components/landing/new/cta-section";
import { Footer } from "@/components/landing/new/footer";

import type { Locale } from "@/config/i18n-config";

interface HomePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function HomePage({ params }: HomePageProps) {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <AIModelsVideoShowcase />
      <FAQSection />
      <CTASection />
      <Footer />
    </>
  );
}
