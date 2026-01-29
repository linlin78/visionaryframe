import { Metadata } from "next";
import type { Locale } from "@/config/i18n-config";

interface AIUsagePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata({
  params,
}: AIUsagePageProps): Promise<Metadata> {
  return {
    title: "AI Usage - Model Usage Information",
    description: "Learn about the third-party AI models used in VisionFrame and how your data is processed",
  };
}

export default async function AIUsagePage({ params }: AIUsagePageProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0B] py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-[#141415] rounded-2xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI Model Usage & Data Processing
          </h1>
          <p className="text-[#6B6B70] mb-8">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="space-y-8 text-[#8B8B90]">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Third-Party AI Models</h2>
              <p className="leading-relaxed mb-4">
                VisionFrame integrates with industry-leading AI video generation models to provide you with high-quality video creation capabilities.
              </p>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#1A1A1C] border border-[#2A2A2C]">
                  <h3 className="text-lg font-semibold text-white mb-2">1.1 Supported Models</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong className="text-white">Sora 2</strong> by OpenAI - Text-to-video and image-to-video generation</li>
                    <li><strong className="text-white">Veo 3.1 Fast</strong> by Google DeepMind - Short video clip generation</li>
                    <li><strong className="text-white">Wan 2.6</strong> by Alibaba Tongyi - Multi-aspect ratio video generation</li>
                    <li><strong className="text-white">Seedance 1.5 Pro</strong> by ByteDance - Audio-visual joint generation</li>
                  </ul>
                </div>
                <p className="leading-relaxed">
                  <strong className="text-white">1.2 Model Access:</strong> We access these models through their official APIs. Video generation requests are sent to the respective model providers' servers, and results are returned to our platform.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Data Processing & Privacy</h2>
              <div className="space-y-4">
                <p className="leading-relaxed"><strong className="text-white">2.1 Data Transmission:</strong> Your text prompts, images, and parameters are securely transmitted to AI model providers via encrypted API connections (HTTPS/TLS).</p>
                <p className="leading-relaxed"><strong className="text-white">2.2 Data Storage:</strong> All uploaded content (text, images) and generated videos are stored securely on our servers. We do not share your data with third parties except as necessary for AI model processing.</p>
                <p className="leading-relaxed"><strong className="text-white">2.3 Model Training:</strong> <span className="text-[#A855F7] font-semibold">We do NOT use your uploaded content or generated videos to train or fine-tune AI models.</span> Your data is used solely for generating your requested videos.</p>
                <p className="leading-relaxed"><strong className="text-white">2.4 Data Retention:</strong> Your content is stored for the duration of your account plus 30 days after deletion, except where required by law for transaction records.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Output Quality & Limitations</h2>
              <div className="space-y-4">
                <p className="leading-relaxed"><strong className="text-white">3.1 Quality Variations:</strong> AI-generated video quality may vary based on prompt complexity, reference image quality, model capabilities, and current system load.</p>
                <p className="leading-relaxed"><strong className="text-white">3.2 Generation Time:</strong> Video generation typically takes 3-5 minutes, but may vary based on video duration, resolution, queue position, and model provider response time.</p>
                <p className="leading-relaxed"><strong className="text-white">3.3 Imperfections:</strong> AI models may occasionally produce videos with minor visual artifacts, inconsistencies, or deviations from your prompt. We recommend reviewing and, if necessary, regenerating videos before commercial use.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Commercial Use & Responsibility</h2>
              <div className="space-y-4">
                <p className="leading-relaxed"><strong className="text-white">4.1 Content Ownership:</strong> You own the videos you generate, subject to these Terms and your payment of applicable fees. However, you are solely responsible for ensuring your use complies with applicable laws and regulations.</p>
                <p className="leading-relaxed"><strong className="text-white">4.2 Rights & Permissions:</strong> You must ensure you have the necessary rights and permissions for any materials you upload (images, text prompts). This includes obtaining proper consent for using likenesses, copyrighted material, or proprietary content.</p>
                <p className="leading-relaxed"><strong className="text-white">4.3 Commercial Use:</strong> Commercial use rights vary by subscription plan. Please check your plan details for specific commercial use permissions.</p>
                <p className="leading-relaxed"><strong className="text-white">4.4 Review Before Use:</strong> We strongly recommend reviewing all generated content for accuracy, quality, and compliance before using it for commercial or public purposes.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Model Provider Terms</h2>
              <p className="leading-relaxed mb-4">
                Each AI model provider has its own terms of service and acceptable use policy. By using VisionFrame, you agree to comply with these third-party terms:
              </p>
              <div className="space-y-2">
                <a href="https://openai.com/policies" target="_blank" rel="noopener noreferrer" className="block p-3 rounded-lg bg-[#1A1A1C] border border-[#2A2A2C] text-[#A855F7] hover:underline">
                  OpenAI (Sora 2) - Policies →
                </a>
                <a href="https://policies.google.com" target="_blank" rel="noopener noreferrer" className="block p-3 rounded-lg bg-[#1A1A1C] border border-[#2A2A2C] text-[#A855F7] hover:underline">
                  Google (Veo 3.1) - Policies →
                </a>
                <a href="https://www.alibabagroup.com/en/privacy" target="_blank" rel="noopener noreferrer" className="block p-3 rounded-lg bg-[#1A1A1C] border border-[#2A2A2C] text-[#A855F7] hover:underline">
                  Alibaba (Wan 2.6) - Privacy Policy →
                </a>
                <a href="https://www.bytedance.com/en/privacy-policy" target="_blank" rel="noopener noreferrer" className="block p-3 rounded-lg bg-[#1A1A1C] border border-[#2A2A2C] text-[#A855F7] hover:underline">
                  ByteDance (Seedance 1.5 Pro) - Privacy Policy →
                </a>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Technical Implementation</h2>
              <div className="space-y-4">
                <p className="leading-relaxed"><strong className="text-white">6.1 API Integration:</strong> We use RESTful APIs to communicate with AI model providers. All requests are authenticated and encrypted.</p>
                <p className="leading-relaxed"><strong className="text-white">6.2 Queue Management:</strong> Video generation requests are queued and processed based on availability. Higher-tier plans may receive priority queue positioning.</p>
                <p className="leading-relaxed"><strong className="text-white">6.3 Webhook Callbacks:</strong> AI providers notify us when video generation is complete via secure webhook callbacks. We then download and store your videos on our secure servers.</p>
                <p className="leading-relaxed"><strong className="text-white">6.4 Error Handling:</strong> If generation fails due to model provider issues, policy violations, or technical errors, we provide error messages and credit refunds where applicable.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Compliance & Safety</h2>
              <div className="space-y-4">
                <p className="leading-relaxed"><strong className="text-white">7.1 Content Moderation:</strong> We implement content filtering and moderation to prevent generation of prohibited content (violence, hate speech, adult content, etc.).</p>
                <p className="leading-relaxed"><strong className="text-white">7.2 Abuse Prevention:</strong> We monitor for abuse, fraud, and policy violations. Accounts violating terms may be suspended or terminated.</p>
                <p className="leading-relaxed"><strong className="text-white">7.3 Rate Limiting:</strong> To ensure fair usage and system stability, we implement rate limits on video generation requests.</p>
                <p className="leading-relaxed"><strong className="text-white">7.4 Audit Trail:</strong> We maintain logs of all API calls and video generation requests for security, fraud prevention, and compliance purposes.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Contact & Support</h2>
              <p className="leading-relaxed mb-4">
                If you have questions about our AI model usage, data processing practices, or technical implementation, please contact us:
              </p>
              <div className="space-y-4">
                <a
                  href="mailto:contact@visionaryframe.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Contact Technical Support
                </a>
                <p className="text-sm text-[#6B6B70] mt-4">
                  We respond to technical inquiries within 1-2 business days.
                </p>
              </div>
            </section>

            <section className="mt-12 p-6 rounded-xl bg-[#1A1A1C] border border-[#2A2A2C]">
              <h3 className="text-xl font-bold text-white mb-4">Key Takeaways</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>We use industry-leading AI models through official APIs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Your data is encrypted and NEVER used for model training</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>You own generated content but are responsible for compliance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Review outputs before commercial use - quality may vary</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Comply with both our Terms and AI providers' policies</span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
