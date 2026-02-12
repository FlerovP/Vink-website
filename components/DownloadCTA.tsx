"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";

export default function DownloadCTA() {
  const prefersReduced = useReducedMotion();
  const t = useTranslations("downloadCta");

  return (
    <section className="section-padding relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy" />

          {/* Decorative glow orbs */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-20 pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(40,117,255,0.4), transparent 70%)",
              filter: "blur(60px)",
              transform: "translate(30%, -30%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-60 h-60 rounded-full opacity-15 pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(40,117,255,0.5), transparent 70%)",
              filter: "blur(50px)",
              transform: "translate(-20%, 30%)",
            }}
          />

          {/* Content */}
          <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
            <motion.h2
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
            >
              {t("title")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-aqua glow-text">
                {t("titleHighlight")}
              </span>
              ?
            </motion.h2>

            <motion.p
              initial={prefersReduced ? {} : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-text text-lg max-w-xl mx-auto mb-10"
            >
              {t("description")}
            </motion.p>

            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href={siteConfig.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-navy font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                {t("downloadApp")}
              </a>
              <a
                href={siteConfig.loginUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent text-white font-semibold rounded-full border border-white/20 transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
              >
                {t("login")}
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
