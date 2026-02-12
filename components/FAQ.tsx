"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: prefersReduced ? 0 : index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="border-b border-gray-200 last:border-b-0"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 sm:py-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-lg font-medium text-gray-900 pr-4 group-hover:text-cyan transition-colors duration-200">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 group-hover:bg-cyan/10 flex items-center justify-center transition-colors duration-200"
        >
          <svg
            className={`w-4 h-4 transition-colors duration-200 ${isOpen ? "text-cyan" : "text-gray-400"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={prefersReduced ? { height: "auto" } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={prefersReduced ? { height: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 sm:pb-6 text-gray-500 leading-relaxed pr-12 max-w-2xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const FAQ_COUNT = 7;

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const prefersReduced = useReducedMotion();
  const t = useTranslations("faq");

  return (
    <section id="faq" className="section-padding relative z-10">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
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

        {/* FAQ Items */}
        <div className="glass rounded-2xl px-6 sm:px-8 divide-y-0">
          {Array.from({ length: FAQ_COUNT }, (_, i) => (
            <FAQItem
              key={i}
              question={t(`items.${i}.question`)}
              answer={t(`items.${i}.answer`)}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
