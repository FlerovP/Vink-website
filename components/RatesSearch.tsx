"use client";

import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { CountryRate } from "@/lib/rates";
import CountryPopup from "@/components/CountryPopup";
import { useCurrency } from "@/components/CurrencyProvider";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.02,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const cardVariantsReduced = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

interface RatesSearchProps {
  rates: CountryRate[];
}

export default function RatesSearch({ rates }: RatesSearchProps) {
  const [query, setQuery] = useState("");
  const [selectedRate, setSelectedRate] = useState<CountryRate | null>(null);
  const prefersReduced = useReducedMotion();
  const t = useTranslations("ratesPage");
  const { format } = useCurrency();

  const filtered = useMemo(() => {
    if (!query.trim()) return rates;
    const q = query.toLowerCase().trim();
    return rates.filter((r) => r.country.toLowerCase().includes(q));
  }, [rates, query]);

  return (
    <>
      {/* Search bar */}
      <div className="relative max-w-md mx-auto mb-10">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl glass text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan/30 transition-shadow text-base"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={t("clearSearch")}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-center text-sm text-gray-400 mb-8">
        {t("countriesFound", { count: filtered.length })}
      </p>

      {/* Rates Grid */}
      {filtered.length > 0 ? (
        <motion.div
          key={query} // re-animate on search change
          variants={prefersReduced ? undefined : containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {filtered.map((rate, i) => (
            <motion.div
              key={rate.country}
              variants={prefersReduced ? cardVariantsReduced : cardVariants}
              onClick={() => setSelectedRate(rate)}
              className="group relative rounded-2xl p-4 sm:p-5 glass glow-cyan-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex flex-col items-center text-center gap-2 sm:flex-row sm:text-left sm:gap-3">
                {/* Flag */}
                <span className="text-2xl sm:text-3xl leading-none" role="img" aria-label={rate.country}>
                  {rate.flag}
                </span>

                {/* Country + Price */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs sm:text-sm font-medium text-gray-700 truncate">
                    {rate.country}
                  </h3>
                  <p className="text-lg sm:text-xl font-bold text-gray-900 mt-0.5">
                    {format(rate.pricePerGB)}
                    <span className="text-[10px] sm:text-xs font-normal text-gray-400 ml-1">/GB</span>
                  </p>
                </div>
              </div>

              {/* Operator count */}
              {rate.operatorCount > 1 && (
                <p className="text-[10px] text-gray-400 mt-2 text-center sm:text-left">
                  {t("operatorsAvailable", { count: rate.operatorCount })}
                </p>
              )}

              {/* Cheap badge */}
              {i === 0 && !query && (
                <span className="absolute top-2 right-2 sm:top-3 sm:right-3 text-[9px] sm:text-[10px] font-semibold text-cyan bg-cyan/10 px-2 py-0.5 rounded-full">
                  {t("cheapest")}
                </span>
              )}

              {/* Subtle hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-cyan/[0.03] to-aqua/[0.03]" />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg">{t("noResults", { query })}</p>
          <button
            onClick={() => setQuery("")}
            className="mt-4 text-cyan hover:text-aqua transition-colors text-sm font-medium"
          >
            {t("clearSearch")}
          </button>
        </div>
      )}

      {/* Country popup */}
      <CountryPopup rate={selectedRate} onClose={() => setSelectedRate(null)} />
    </>
  );
}
