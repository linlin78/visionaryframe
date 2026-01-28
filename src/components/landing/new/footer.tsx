"use client";

import { Mail, Twitter, Github, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";

export function Footer() {
  const locale = useLocale();

  return (
    <footer className="relative bg-[#0A0A0B] py-[60px]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div className="space-y-4">
              {/* Logo */}
              <div className="flex items-center gap-2.5">
                <span className="text-lg font-bold text-white font-mono tracking-widest">
                  VisionFrame
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
              </div>

              {/* Tagline */}
              <p className="text-sm text-[#6B6B70]">
                AI 视频创作，简单专业
              </p>

              {/* Contact */}
              <div className="space-y-3 pt-2">
                <p className="text-sm font-semibold text-white">联系我们</p>
                <a
                  href="mailto:contact@visionaryframe.com"
                  className="flex items-center gap-2 text-sm text-[#8B8B90] hover:text-[#A855F7] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  contact@visionaryframe.com
                </a>
              </div>
            </div>

            {/* Product Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white">产品</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href={`/${locale}/#features`}
                    className="text-sm text-[#8B8B90] hover:text-[#A855F7] transition-colors"
                  >
                    功能
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/pricing`}
                    className="text-sm text-[#8B8B90] hover:text-[#A855F7] transition-colors"
                  >
                    定价
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/#cases`}
                    className="text-sm text-[#8B8B90] hover:text-[#A855F7] transition-colors"
                  >
                    案例
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white">公司</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href={`/${locale}/about`}
                    className="text-sm text-[#8B8B90] hover:text-[#A855F7] transition-colors"
                  >
                    关于我们
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/contact`}
                    className="text-sm text-[#8B8B90] hover:text-[#A855F7] transition-colors"
                  >
                    联系我们
                  </Link>
                </li>
              </ul>
            </div>

            {/* Policy Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white">政策</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href={`/${locale}/privacy-policy`}
                    className="text-sm text-[#8B8B90] hover:text-[#A855F7] transition-colors"
                  >
                    隐私政策
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/terms-of-service`}
                    className="text-sm text-[#8B8B90] hover:text-[#A855F7] transition-colors"
                  >
                    服务条款
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/refund-policy`}
                    className="text-sm text-[#8B8B90] hover:text-[#A855F7] transition-colors"
                  >
                    退款政策
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-[#1A1A1C]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Copyright */}
              <p className="text-sm text-[#6B6B70]">
                © 2025 VisionFrame. All rights reserved.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-6">
                <a
                  href="https://twitter.com/visionframe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8B8B90] hover:text-[#A855F7] transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/visionframe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8B8B90] hover:text-[#A855F7] transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://discord.gg/visionframe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8B8B90] hover:text-[#A855F7] transition-colors"
                  aria-label="Discord"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
