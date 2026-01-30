import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/config/i18n-config";

interface PrivacyPolicyPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata({
  params,
}: PrivacyPolicyPageProps): Promise<Metadata> {
  return {
    title: "Privacy Policy",
    description: "VisionFrame Privacy Policy - Learn how we protect your data",
  };
}

export default async function PrivacyPolicyPage({ params }: PrivacyPolicyPageProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0B] py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-[#141415] rounded-2xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-[#6B6B70] mb-8">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="space-y-8 text-[#8B8B90]">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p className="leading-relaxed">
                Welcome to VisionFrame ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our AI video generation platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Data We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">2.1 Account Information</h3>
                  <p className="leading-relaxed">When you create an account, we collect your name, email address, and authentication credentials.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">2.2 Content Data</h3>
                  <p className="leading-relaxed">We collect text prompts, images, and videos you upload for video generation. This data is stored securely and used solely for generating your requested content.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">2.3 Transaction Data</h3>
                  <p className="leading-relaxed">We collect payment information, credit purchases, and subscription details to process transactions.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">2.4 Usage Data</h3>
                  <p className="leading-relaxed">We collect information about how you use our services, including video generation history and preferences.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Data</h2>
              <p className="leading-relaxed mb-4">We use your data to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide and maintain our AI video generation services</li>
                <li>Process transactions and send billing information</li>
                <li>Improve our services and develop new features</li>
                <li>Communicate with you about updates and support</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Data Storage and Security</h2>
              <div className="space-y-4">
                <p className="leading-relaxed"><strong className="text-white">4.1 Storage Duration:</strong> Your content is stored for the duration of your account plus 30 days after deletion. Transaction records are retained as required by law.</p>
                <p className="leading-relaxed"><strong className="text-white">4.2 Data Security:</strong> We implement industry-standard encryption and security measures to protect your data. All data is encrypted in transit and at rest.</p>
                <p className="leading-relaxed"><strong className="text-white">4.3 Access Control:</strong> Only authorized personnel have access to your data, and solely for legitimate business purposes.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Data Not Used for Training</h2>
              <p className="leading-relaxed">
                <strong className="text-[#A855F7]">We do NOT use your uploaded images, videos, or text prompts to train or improve our AI models.</strong> Your content is used solely for generating your requested videos and is not shared with third parties for model training purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights and Choices</h2>
              <p className="leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access, download, or delete your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request a copy of your personal data</li>
                <li>Object to or restrict data processing</li>
                <li>Close your account at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Data Deletion</h2>
              <p className="leading-relaxed">
                When you delete your account, we initiate permanent deletion of your personal data within 30 days. Content may be retained longer if required by law or for legitimate business purposes (e.g., fraud prevention).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Acceptable Use Policy</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">8.1 Acceptable Uses</h3>
                  <p className="leading-relaxed">You may use our services for personal projects, commercial use (according to your plan), educational purposes, and creative experimentation.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">8.2 Prohibited Activities</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Illegal acts or content</li>
                    <li>Harassment or harmful behavior</li>
                    <li>Copyright or trademark infringement</li>
                    <li>Deepfakes without consent</li>
                    <li>Misinformation or fraudulent content</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">8.3 Consequences</h3>
                  <p className="leading-relaxed">Violations may result in account suspension, content removal, permanent ban, or legal action.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">8.4 Reporting</h3>
                  <p className="leading-relaxed">Report violations to <a href="mailto:contact@visionaryframe.com" className="text-[#A855F7] hover:underline">contact@visionaryframe.com</a>.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. User-Generated Content (UGC)</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">9.1 Definition</h3>
                  <p className="leading-relaxed">UGC includes text prompts, images, and videos uploaded by users for video generation.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">9.2 Purpose</h3>
                  <p className="leading-relaxed">We use your content to process video generation requests, improve services, and ensure compliance with policies.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">9.3 Retention Period</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Active accounts:</strong> Retained for service duration</li>
                    <li><strong>Deleted accounts:</strong> 30 days after deletion</li>
                    <li><strong>Failed generations:</strong> 7 days</li>
                    <li><strong>Transaction records:</strong> As required by law (minimum 7 years)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">9.4 Data Sharing</h3>
                  <p className="leading-relaxed mb-2">We share your content ONLY in these circumstances:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong className="text-green-400">✓</strong> AI providers for video generation only</li>
                    <li><strong className="text-green-400">✓</strong> As required by law</li>
                    <li><strong className="text-green-400">✓</strong> To protect our rights or property</li>
                    <li><strong className="text-green-400">✓</strong> In connection with business transfer</li>
                    <li><strong className="text-red-400">✗</strong> NOT for third-party marketing</li>
                    <li><strong className="text-red-400">✗</strong> NEVER sold to third parties</li>
                    <li><strong className="text-red-400">✗</strong> AI providers prohibited from training</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">9.5 Ownership</h3>
                  <p className="leading-relaxed">You retain ownership of all content you upload.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">9.6 Deletion Rights</h3>
                  <p className="leading-relaxed">You can delete your content at any time through the "My Creations" page in your account.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">9.7 Content Moderation</h3>
                  <p className="leading-relaxed">We review content for compliance with our Acceptable Use Policy and applicable laws.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Third-Party Services</h2>
              <p className="leading-relaxed">
                We use third-party services for payment processing (Creem, Stripe), authentication (Google), and data storage (R2/S3). These services have their own privacy policies, and we are not responsible for their practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Children's Privacy</h2>
              <p className="leading-relaxed">
                Our services are not intended for children under 13. We do not knowingly collect data from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. International Data Transfers</h2>
              <p className="leading-relaxed">
                Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">13. Changes to This Policy</h2>
              <p className="leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of significant changes via email or prominent notice on our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">14. Third-Party Disclaimer</h2>
              <p className="leading-relaxed">
                VisionFrame integrates with third-party AI models (Sora 2 by OpenAI, Veo 3.1 by Google DeepMind, Seedance 1.5 Pro by ByteDance, Wan 2.6 by Alibaba) and services (Creem, Stripe, Google OAuth). All third-party names, logos, and trademarks are the property of their respective owners. VisionFrame has no affiliation with, endorsement by, or connection to these third parties unless explicitly stated. We are not responsible for the content, policies, or practices of third-party websites or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">15. Contact Us</h2>
              <p className="leading-relaxed">
                If you have questions about this policy or your data, please contact us at:
              </p>
              <a
                href="mailto:contact@visionaryframe.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all mt-4"
              >
                contact@visionaryframe.com
              </a>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
