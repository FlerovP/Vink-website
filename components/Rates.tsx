"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { CountryRate } from "@/lib/rates";
import CountryPopup from "@/components/CountryPopup";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const cardVariantsReduced = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

interface RatesProps {
  rates: CountryRate[];
}

export default function Rates({ rates }: RatesProps) {
  const prefersReduced = useReducedMotion();
  const [selectedRate, setSelectedRate] = useState<CountryRate | null>(null);
  const t = useTranslations("rates");

  return (
    <section id="rates" className="section-padding relative z-10">
      <div className="max-w-7xl mx-auto">
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
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            {t("title")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-aqua">
              {t("titleHighlight")}
            </span>
          </motion.h2>
          <motion.p
            initial={prefersReduced ? {} : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto"
          >
            {t("description")}
          </motion.p>

          {/* Price badge */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-cyan/10 text-cyan text-sm font-semibold"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t("priceBadge")}
          </motion.div>
        </div>

        {/* Rates Grid */}
        <motion.div
          variants={prefersReduced ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {rates.map((rate, i) => (
            <motion.div
              key={rate.country}
              variants={prefersReduced ? cardVariantsReduced : cardVariants}
              onClick={() => setSelectedRate(rate)}
              className="group relative rounded-2xl p-5 glass glow-cyan-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                {/* Flag */}
                <span className="text-3xl leading-none" role="img" aria-label={rate.country}>
                  {rate.flag}
                </span>

                {/* Country + Price */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-700 truncate">
                    {rate.country}
                  </h3>
                  <p className="text-xl font-bold text-gray-900 mt-0.5">
                    <span className="text-sm font-normal text-gray-400 mr-0.5">$</span>
                    {rate.pricePerGB.toFixed(2)}
                    <span className="text-xs font-normal text-gray-400 ml-1">{t("perGb")}</span>
                  </p>
                </div>

                {/* Cheap badge for lowest rate */}
                {i === 0 && (
                  <span className="absolute top-3 right-3 text-[10px] font-semibold text-cyan bg-cyan/10 px-2 py-0.5 rounded-full">
                    {t("cheapest")}
                  </span>
                )}
              </div>

              {/* Subtle hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-cyan/[0.03] to-aqua/[0.03]" />
            </motion.div>
          ))}
        </motion.div>

        {/* View all rates button */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-10"
        >
          <Link
            href="/rates"
            className="btn-secondary text-sm sm:text-base px-8 py-3"
          >
            {t("viewAll")}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={prefersReduced ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-xs text-gray-400 mt-6"
        >
          {t("disclaimer")}
        </motion.p>
      </div>

      {/* Country popup */}
      <CountryPopup rate={selectedRate} onClose={() => setSelectedRate(null)} />
    </section>
  );
}
