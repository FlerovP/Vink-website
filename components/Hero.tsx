"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import AnimatedGlobe from "./AnimatedGlobe";

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const t = useTranslations("hero");

  return (
    <section
      id="product"
      className="relative min-h-screen flex items-start lg:items-center overflow-hidden pt-20 lg:pt-20"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="flex flex-col gap-6 text-center lg:text-left">
            {/* Globe — mobile only, above the headline */}
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="block lg:hidden relative h-[240px] sm:h-[336px] mx-auto w-full max-w-[384px] -mb-4"
            >
              <AnimatedGlobe />
            </motion.div>

            <motion.h1
              initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-gray-900"
            >
              {t("headlinePart1")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-aqua">
                {t("headlineHighlight")}
              </span>
              .
              <br />
              {t("headlinePart2")}
            </motion.h1>

            <motion.p
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-gray-500 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              {t("subheadline")}
            </motion.p>

            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <a
                href={siteConfig.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm sm:text-base px-5 sm:px-8 py-3 sm:py-3.5"
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
                {t("primaryCta")}
              </a>
              <a
                href="#rates"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#rates")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-secondary text-sm sm:text-base px-5 sm:px-8 py-3 sm:py-3.5"
              >
                {t("secondaryCta")}
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex items-center gap-6 justify-center lg:justify-start mt-4 text-sm text-gray-400"
            >
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-cyan" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {t("badgeNoContracts")}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-cyan" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {t("badgeEsim")}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-cyan" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {t("badgePerMb")}
              </span>
            </motion.div>
          </div>

          {/* Rotating Globe — hidden on mobile */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block relative h-[480px] lg:-mr-4"
          >
            <AnimatedGlobe />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
