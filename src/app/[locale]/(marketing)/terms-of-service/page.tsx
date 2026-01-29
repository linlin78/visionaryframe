import { Metadata } from "next";
import type { Locale } from "@/config/i18n-config";

interface TermsOfServicePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata({
  params,
}: TermsOfServicePageProps): Promise<Metadata> {
  return {
    title: "Terms of Service",
    description: "VisionFrame Terms of Service - Rules and guidelines for using our platform",
  };
}

export default async function TermsOfServicePage({ params }: TermsOfServicePageProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0B] py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-[#141415] rounded-2xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-[#6B6B70] mb-8">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="space-y-8 text-[#8B8B90]">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By accessing and using VisionFrame ("Service"), you accept and agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
              <p className="leading-relaxed">
                VisionFrame is an AI-powered video generation platform that allows users to create videos from text prompts or uploaded images. We provide credit-based and subscription-based access to our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Account Registration and Security</h2>
              <div className="space-y-4">
                <p className="leading-relaxed"><strong className="text-white">3.1 Account Creation:</strong> You must provide accurate and complete information when creating an account.</p>
                <p className="leading-relaxed"><strong className="text-white">3.2 Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials.</p>
                <p className="leading-relaxed"><strong className="text-white">3.3 Age Requirement:</strong> You must be at least 13 years old to use this Service.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Payment Terms</h2>
              <div className="space-y-4">
                <p className="leading-relaxed"><strong className="text-white">4.1 Credit System:</strong> Credits are consumed when generating videos. Credits expire according to the terms in effect at the time of purchase.</p>
                <p className="leading-relaxed"><strong className="text-white">4.2 Subscriptions:</strong> Subscription plans automatically renew unless cancelled before the next billing period. You can cancel at any time through your account settings.</p>
                <p className="leading-relaxed"><strong className="text-white">4.3 Free Trial:</strong> New users receive 50 free credits. After using these credits, you must purchase additional credits or subscribe to continue using the Service. No automatic charges are made unless you explicitly subscribe.</p>
                <p className="leading-relaxed"><strong className="text-white">4.4 Refunds:</strong> Refunds are handled according to our Refund Policy.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Prohibited Uses and Content</h2>
              <div className="space-y-4">
                <p className="leading-relaxed"><strong className="text-white">You must NOT use the Service to:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Generate violent, gory, or disturbing content</li>
                  <li>Create pornographic, sexually explicit, or adult content</li>
                  <li>Produce hate speech, discriminatory, or offensive content targeting protected groups</li>
                  <li>Generate content promoting illegal activities, terrorism, or violence</li>
                  <li>Infringe on copyrights, trademarks, or intellectual property rights</li>
                  <li>Violate privacy rights or create deepfakes without consent</li>
                  <li>Harass, threaten, or harm others</li>
                  <li>Create misleading, fraudulent, or deceptive content</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  <strong className="text-red-400">Violation of these terms will result in immediate account termination and may be reported to authorities.</strong>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. User Responsibilities and Content Ownership</h2>
              <div className="space-y-4">
                <p className="leading-relaxed"><strong className="text-white">6.1 Your Content:</strong> You retain ownership of content you upload. However, you grant us a license to use, process, and store your content solely for providing the Service.</p>
                <p className="leading-relaxed"><strong className="text-white">6.2 Generated Content:</strong> You own the videos you generate, subject to these Terms and applicable laws. You are solely responsible for how you use generated content.</p>
                <p className="leading-relaxed"><strong className="text-white">6.3 Rights and Permissions:</strong> You must ensure you have the necessary rights and permissions for any materials you upload. You are responsible for obtaining all required consents and releases.</p>
                <p className="leading-relaxed"><strong className="text-white">6.4 Commercial Use:</strong> Commercial use rights vary by plan. Check your plan details for specific commercial use permissions.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Content Moderation</h2>
              <p className="leading-relaxed">
                We reserve the right to review, moderate, and remove any content that violates these Terms or applicable laws. We may also suspend or terminate accounts that repeatedly violate our policies. To report violations, contact us at contact@visionaryframe.com.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Service Availability and Modifications</h2>
              <div className="space-y-4">
                <p className="leading-relaxed"><strong className="text-white">8.1 Availability:</strong> We strive for 99.9% uptime but do not guarantee uninterrupted access. The Service may be temporarily unavailable for maintenance or updates.</p>
                <p className="leading-relaxed"><strong className="text-white">8.2 Modifications:</strong> We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time.</p>
                <p className="leading-relaxed"><strong className="text-white">8.3 Generation Time:</strong> Video generation times vary based on complexity, queue, and other factors. We do not guarantee specific generation times.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Disclaimer of Warranties</h2>
              <p className="leading-relaxed">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Limitation of Liability</h2>
              <p className="leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, VISIONFRAME SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE, ARISING OUT OF OR RELATED TO THESE TERMS OR THE SERVICE.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Indemnification</h2>
              <p className="leading-relaxed">
                You agree to indemnify and hold harmless VisionFrame, its affiliates, officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of the Service or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Intellectual Property</h2>
              <div className="space-y-4">
                <p className="leading-relaxed"><strong className="text-white">12.1 Our IP:</strong> The Service, including all technology, software, and designs, is owned by VisionFrame and protected by intellectual property laws.</p>
                <p className="leading-relaxed"><strong className="text-white">12.2 Your IP:</strong> You retain ownership of content you provide. You grant us a license to use it solely for providing the Service.</p>
                <p className="leading-relaxed"><strong className="text-white">12.3 Generated Content:</strong> You own videos you generate, subject to these Terms and your payment of applicable fees.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">13. Termination</h2>
              <div className="space-y-4">
                <p className="leading-relaxed"><strong className="text-white">13.1 By You:</strong> You may terminate your account at any time through your account settings or by contacting support.</p>
                <p className="leading-relaxed"><strong className="text-white">13.2 By Us:</strong> We may suspend or terminate your account immediately for violation of these Terms, fraudulent activity, or at our sole discretion with 30 days' notice.</p>
                <p className="leading-relaxed"><strong className="text-white">13.3 Effect of Termination:</strong> Upon termination, your right to use the Service ceases immediately. We will delete your data within 30 days per our Privacy Policy.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">14. Dispute Resolution</h2>
              <div className="space-y-4">
                <p className="leading-relaxed"><strong className="text-white">14.1 Governing Law:</strong> These Terms are governed by the laws of the jurisdiction in which VisionFrame is established.</p>
                <p className="leading-relaxed"><strong className="text-white">14.2 Arbitration:</strong> Any disputes arising from these Terms shall be resolved through binding arbitration, except where prohibited by law.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">15. General Provisions</h2>
              <div className="space-y-4">
                <p className="leading-relaxed"><strong className="text-white">15.1 Entire Agreement:</strong> These Terms constitute the entire agreement between you and VisionFrame.</p>
                <p className="leading-relaxed"><strong className="text-white">15.2 Waiver:</strong> Failure to enforce any provision does not constitute a waiver of such provision.</p>
                <p className="leading-relaxed"><strong className="text-white">15.3 Severability:</strong> If any provision is found invalid, the remaining provisions remain in full force.</p>
                <p className="leading-relaxed"><strong className="text-white">15.4 Changes:</strong> We may modify these Terms at any time. Continued use of the Service constitutes acceptance of updated Terms.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">16. Contact Information</h2>
              <p className="leading-relaxed mb-4">
                For questions about these Terms, to report violations, or for account assistance, please contact us:
              </p>
              <div className="space-y-2">
                <p>Email: <a href="mailto:contact@visionaryframe.com" className="text-[#A855F7] hover:underline">contact@visionaryframe.com</a></p>
                <p className="text-sm text-[#6B6B70]">We will respond to inquiries within 3 business days.</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
