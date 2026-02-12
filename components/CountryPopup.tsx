"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import type { CountryRate } from "@/lib/rates";

interface CountryPopupProps {
  rate: CountryRate | null;
  onClose: () => void;
}

export default function CountryPopup({ rate, onClose }: CountryPopupProps) {
  const t = useTranslations("popup");

  // Close on Escape
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!rate) return;
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [rate, handleKey]);

  return (
    <AnimatePresence>
      {rate && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-sm rounded-3xl glass p-6 sm:p-8 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={t("ctaText", { country: rate.country })}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label={t("close")}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Country info */}
            <div className="text-center mb-6">
              <span className="text-5xl leading-none" role="img" aria-label={rate.country}>
                {rate.flag}
              </span>
              <h3 className="text-xl font-bold text-gray-900 mt-3">
                {rate.country}
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                {t("from")}{" "}
                <span className="font-semibold text-gray-800">
                  ${rate.pricePerGB.toFixed(2)}
                </span>
                <span className="text-gray-400"> {t("perGb")}</span>
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200/80 mb-6" />

            {/* CTA text */}
            <p className="text-center text-sm text-gray-500 mb-5">
              {t("ctaText", { country: rate.country })}
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <a
                href={siteConfig.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-center py-3.5 text-base"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                {t("downloadApp")}
              </a>
              <a
                href={siteConfig.loginUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-center py-3.5 text-base"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                {t("continueInBrowser")}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
