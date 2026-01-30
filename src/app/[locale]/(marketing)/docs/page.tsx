import { getTranslations } from "next-intl/server";

import { LocaleLink } from "@/i18n/navigation";

export const metadata = {
  title: "Documentation",
};

export default async function DocsPage() {
  const t = await getTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-2">Documentation</h1>
          <p className="text-muted-foreground">
            Complete guide to using VisionFrame AI video generation platform
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Getting Started */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              🚀 Getting Started
            </h2>
            <div className="space-y-4">
              <LocaleLink
                href="/text-to-video"
                className="block p-6 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">Text to Video</h3>
                <p className="text-muted-foreground">
                  Learn how to generate videos from text descriptions using our AI models.
                </p>
              </LocaleLink>

              <LocaleLink
                href="/image-to-video"
                className="block p-6 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">Image to Video</h3>
                <p className="text-muted-foreground">
                  Transform your images into dynamic videos with AI animation.
                </p>
              </LocaleLink>

              <LocaleLink
                href="/reference-to-video"
                className="block p-6 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">Reference Video</h3>
                <p className="text-muted-foreground">
                  Use existing videos as references to generate new AI videos with similar style.
                </p>
              </LocaleLink>
            </div>
          </section>

          {/* AI Models */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              🤖 AI Models
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <LocaleLink
                href="/sora-2"
                className="block p-6 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">Sora 2</h3>
                <p className="text-sm text-muted-foreground mb-2">by OpenAI</p>
                <p className="text-muted-foreground">
                  Industry-leading text-to-video generation with stunning quality.
                </p>
              </LocaleLink>

              <LocaleLink
                href="/veo-3-1"
                className="block p-6 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">Veo 3.1</h3>
                <p className="text-sm text-muted-foreground mb-2">by Google DeepMind</p>
                <p className="text-muted-foreground">
                  High-quality video generation with cinematic effects.
                </p>
              </LocaleLink>

              <LocaleLink
                href="/seedance-1-5"
                className="block p-6 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">Seedance 1.5 Pro</h3>
                <p className="text-sm text-muted-foreground mb-2">by ByteDance</p>
                <p className="text-muted-foreground">
                  Multi-shot video generation with fluid motion.
                </p>
              </LocaleLink>

              <LocaleLink
                href="/wan-2-6"
                className="block p-6 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">Wan 2.6</h3>
                <p className="text-sm text-muted-foreground mb-2">by Alibaba</p>
                <p className="text-muted-foreground">
                  Advanced image-to-video with multiple aspect ratios.
                </p>
              </LocaleLink>
            </div>
          </section>

          {/* Pricing & Credits */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              💳 Pricing & Credits
            </h2>
            <div className="space-y-4">
              <LocaleLink
                href="/pricing"
                className="block p-6 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">Pricing Plans</h3>
                <p className="text-muted-foreground">
                  Compare our subscription plans and credit packages.
                </p>
              </LocaleLink>

              <LocaleLink
                href="/credits"
                className="block p-6 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">Credit System</h3>
                <p className="text-muted-foreground">
                  Understand how credits work and how to manage your balance.
                </p>
              </LocaleLink>
            </div>
          </section>

          {/* Account & Settings */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              ⚙️ Account & Settings
            </h2>
            <div className="space-y-4">
              <LocaleLink
                href="/my-creations"
                className="block p-6 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">My Creations</h3>
                <p className="text-muted-foreground">
                  View and manage all your generated videos.
                </p>
              </LocaleLink>

              <LocaleLink
                href="/settings"
                className="block p-6 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">Account Settings</h3>
                <p className="text-muted-foreground">
                  Update your profile, password, and preferences.
                </p>
              </LocaleLink>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              ❓ Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="text-lg font-semibold mb-2">How do I get started?</h3>
                <p className="text-muted-foreground">
                  Simply navigate to Text to Video, Image to Video, or Reference Video, enter your prompt or upload your image, and click generate. Make sure you have enough credits in your account.
                </p>
              </div>

              <div className="p-6 rounded-lg border bg-card">
                <h3 className="text-lg font-semibold mb-2">How long does video generation take?</h3>
                <p className="text-muted-foreground">
                  Video generation typically takes 1-5 minutes depending on the model, duration, and complexity of your request.
                </p>
              </div>

              <div className="p-6 rounded-lg border bg-card">
                <h3 className="text-lg font-semibold mb-2">What video formats are supported?</h3>
                <p className="text-muted-foreground">
                  All videos are generated in MP4 format with various resolutions (480p, 720p, 1080p) depending on the model and settings.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
