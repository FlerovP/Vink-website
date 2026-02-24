"use client";

import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";

const FOOTER_LINK_KEYS = ["privacyPolicy", "termsOfService", "publicOffer", "refundPolicy"] as const;

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="relative z-10 border-t border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="text-xl font-bold tracking-tight text-gray-900">
              VINK<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-aqua"> SIM</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              {t("tagline")}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
              {t("legal")}
            </h3>
            <nav className="flex flex-col gap-2.5">
              {FOOTER_LINK_KEYS.map((key, i) => {
                const href = siteConfig.footerLinks[i].href;

                if (href.startsWith("mailto:")) {
                  return (
                    <a
                      key={key}
                      href={href}
                      className="text-sm text-gray-400 hover:text-cyan transition-colors duration-200 w-fit"
                    >
                      {t(key)}
                    </a>
                  );
                }

                return (
                  <Link
                    key={key}
                    href={href}
                    className="text-sm text-gray-400 hover:text-cyan transition-colors duration-200 w-fit"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t(key)}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
              {t("contact")}
            </h3>
            <div className="flex flex-col gap-2.5">
              <a
                href="mailto:info@vinksim.com"
                className="text-sm text-gray-400 hover:text-cyan transition-colors duration-200 w-fit"
              >
                info@vinksim.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <p className="text-xs text-gray-400">
            vinksim.com
          </p>
        </div>
      </div>
    </footer>
  );
}
