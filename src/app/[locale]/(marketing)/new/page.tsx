import { HeroSection } from "@/components/landing/new/hero-section";
import { HowItWorksSection } from "@/components/landing/new/how-it-works-section";
import { FeaturesSection } from "@/components/landing/new/features-section";
import { FAQSection } from "@/components/landing/new/faq-section";
import { CTASection } from "@/components/landing/new/cta-section";
import { Footer } from "@/components/landing/new/footer";

import type { Locale } from "@/config/i18n-config";

interface NewHomePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function NewHomePage({ params }: NewHomePageProps) {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </>
  );
}
