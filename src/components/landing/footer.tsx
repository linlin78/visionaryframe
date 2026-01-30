"use client";

import { Github, Twitter, Heart, Mail } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

import { cn } from "@/components/ui";
import { LocaleLink } from "@/i18n/navigation";

export function LandingFooter() {
  const t = useTranslations('Footer');
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: t('product'),
      links: [
        { title: "Image to Video", href: "/image-to-video" },
        { title: "Text to Video", href: "/text-to-video" },
        { title: "Reference to Video", href: "/reference-to-video" },
        { title: "Pricing", href: "/pricing" },
      ],
    },
    {
      title: t('legal'),
      links: [
        { title: "Privacy Policy", href: "/privacy-policy" },
        { title: "Terms of Service", href: "/terms-of-service" },
        { title: "Refund Policy", href: "/refund-policy" },
      ],
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/visionframe/videofly",
      icon: Github,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/visionframe",
      icon: Twitter,
    },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <LocaleLink
              href="/"
              className="flex items-center gap-2 text-xl font-semibold mb-4"
            >
              🎬 VisionFrame
            </LocaleLink>
            <p className="text-sm text-muted-foreground mb-4">
              Transform your ideas into stunning videos with AI.
            </p>

            {/* Contact */}
            <div className="space-y-2 mb-3">
              <a
                href="mailto:contact@visionaryframe.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                contact@visionaryframe.com
              </a>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Currently only accepting questions via email. More official channels coming soon.
              </p>
            </div>

            {/* Social Links - Hidden temporarily */}
            {/* <div className="flex items-center gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-9 w-9 flex items-center justify-center rounded-full border border-border hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div> */}
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.title}>
                    <LocaleLink
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.title}
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            {t('copyright', { year: currentYear })}
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with
            <Heart className="h-4 w-4 fill-pink-500 text-pink-500" />
            by VisionFrame Team
          </p>
        </div>
      </div>
    </footer>
  );
}
