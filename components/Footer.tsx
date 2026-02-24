"use client";

import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";

const FOOTER_LINK_KEYS = ["privacyPolicy", "termsOfService", "publicOffer", "refundPolicy", "support"] as const;

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="relative z-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="text-lg font-bold tracking-tight text-gray-900">
            VINK<span className="text-cyan"> SIM</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 sm:gap-8">
            {FOOTER_LINK_KEYS.map((key, i) => {
              const href = siteConfig.footerLinks[i].href;

              if (href.startsWith("mailto:")) {
                return (
                  <a
                    key={key}
                    href={href}
                    className="text-sm text-gray-400 hover:text-cyan transition-colors duration-200"
                  >
                    {t(key)}
                  </a>
                );
              }

              return (
                <Link
                  key={key}
                  href={href}
                  className="text-sm text-gray-400 hover:text-cyan transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(key)}
                </Link>
              );
            })}
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-400">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
