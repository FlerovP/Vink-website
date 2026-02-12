"use client";

import { siteConfig } from "@/config/site";

export default function Footer() {
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
            {siteConfig.footer.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-gray-400 hover:text-cyan transition-colors duration-200"
                {...(link.href.startsWith("mailto:")
                  ? {}
                  : { target: "_blank", rel: "noopener noreferrer" })}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-400">{siteConfig.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
