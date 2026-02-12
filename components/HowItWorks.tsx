"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useTranslations } from "next-intl";

const stepIcons = [
  // Download icon
  <svg key="dl" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
  </svg>,
  // Top-up / wallet icon
  <svg key="tu" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 110-6h.008c.983 0 1.865.397 2.508 1.04M21 12a2.25 2.25 0 01-2.25 2.25H15a3 3 0 100 6h.008c.983 0 1.865-.397 2.508-1.04M21 12V9M3 12a2.25 2.25 0 012.25-2.25H9a3 3 0 100-6H8.992c-.983 0-1.865.397-2.508 1.04M3 12a2.25 2.25 0 002.25 2.25H9a3 3 0 110 6H8.992c-.983 0-1.865-.397-2.508-1.04M3 12v3m9-9v18" />
  </svg>,
  // Travel / airplane icon
  <svg key="tr" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>,
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const t = useTranslations("steps");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.5"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how-it-works" className="section-padding relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-semibold text-cyan uppercase tracking-wider mb-3"
          >
            {t("label")}
          </motion.span>
          <motion.h2
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900"
          >
            {t("title")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-aqua">
              {t("titleHighlight")}
            </span>
          </motion.h2>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Background line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gray-200" />

          {/* Animated progress line */}
          {!prefersReduced && (
            <motion.div
              className="absolute left-6 sm:left-8 top-0 w-px bg-gradient-to-b from-cyan to-aqua origin-top"
              style={{ height: lineHeight }}
            />
          )}

          {/* Steps */}
          <div className="space-y-12 sm:space-y-16">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={prefersReduced ? {} : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: prefersReduced ? 0 : i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative flex gap-6 sm:gap-8 items-start pl-0"
              >
                {/* Step number circle */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center shadow-sm group">
                  <motion.div
                    initial={prefersReduced ? {} : { scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: prefersReduced ? 0 : 0.2 + i * 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="w-full h-full rounded-full bg-gradient-to-br from-cyan to-aqua flex items-center justify-center text-white"
                  >
                    {stepIcons[i]}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="pt-1 sm:pt-3">
                  <span className="text-xs font-semibold text-cyan uppercase tracking-wider">
                    {t("stepLabel", { number: i + 1 })}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                    {t(`items.${i}.title`)}
                  </h3>
                  <p className="text-gray-500 mt-2 max-w-md leading-relaxed">
                    {t(`items.${i}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
