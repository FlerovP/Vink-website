"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { initAnalytics } from "@/lib/analytics";

const CONSENT_KEY = "vink_cookie_consent";

export default function CookieBanner() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent === null) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
    if (consent === "accepted") {
      initAnalytics();
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    document.cookie = `${CONSENT_KEY}=accepted;path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
    setVisible(false);
    initAnalytics();
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "declined");
    document.cookie = `${CONSENT_KEY}=declined;path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-[9990]"
        >
          <div className="rounded-2xl border border-gray-200 shadow-xl shadow-black/10 p-5" style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
            <p className="text-sm text-gray-700 leading-relaxed mb-1">
              {t("message")}{" "}
              <Link
                href="/privacy"
                className="text-cyan hover:text-aqua transition-colors underline underline-offset-2"
              >
                {t("learnMore")}
              </Link>
            </p>

            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={accept}
                className="flex-1 px-4 py-2 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-cyan to-aqua hover:shadow-lg hover:shadow-cyan/20 transition-shadow"
              >
                {t("accept")}
              </button>
              <button
                onClick={decline}
                className="flex-1 px-4 py-2 text-sm font-semibold text-gray-500 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                {t("decline")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
