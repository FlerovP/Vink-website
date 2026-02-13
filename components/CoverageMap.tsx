"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { CountryRate } from "@/lib/rates";

/* ─── 30 popular travel destinations with map positions ─── */
interface CountryPin {
  country: string; // must match rates API country name
  code: string;    // ISO 3166-1 alpha-2 lowercase
  x: number;       // % from left on the map
  y: number;       // % from top on the map
}

const POPULAR_COUNTRIES: CountryPin[] = [
  { country: "Turkey",              code: "tr", x: 55, y: 35 },
  { country: "Thailand",            code: "th", x: 73, y: 52 },
  { country: "United States",       code: "us", x: 18, y: 32 },
  { country: "United Kingdom",      code: "gb", x: 45, y: 22 },
  { country: "Spain",               code: "es", x: 43, y: 33 },
  { country: "France",              code: "fr", x: 46, y: 28 },
  { country: "Italy",               code: "it", x: 49, y: 31 },
  { country: "Germany",             code: "de", x: 49, y: 24 },
  { country: "United Arab Emirates",code: "ae", x: 60, y: 46 },
  { country: "Japan",               code: "jp", x: 82, y: 32 },
  { country: "South Korea",         code: "kr", x: 79, y: 32 },
  { country: "Indonesia",           code: "id", x: 76, y: 60 },
  { country: "India",               code: "in", x: 66, y: 46 },
  { country: "Brazil",              code: "br", x: 30, y: 62 },
  { country: "Mexico",              code: "mx", x: 16, y: 44 },
  { country: "Australia",           code: "au", x: 82, y: 72 },
  { country: "Canada",              code: "ca", x: 18, y: 20 },
  { country: "Greece",              code: "gr", x: 52, y: 33 },
  { country: "Portugal",            code: "pt", x: 41, y: 33 },
  { country: "Egypt",               code: "eg", x: 54, y: 44 },
  { country: "Malaysia",            code: "my", x: 74, y: 56 },
  { country: "Vietnam",             code: "vn", x: 75, y: 50 },
  { country: "Singapore",           code: "sg", x: 74, y: 58 },
  { country: "Israel",              code: "il", x: 56, y: 40 },
  { country: "Czech Republic",      code: "cz", x: 50, y: 25 },
  { country: "Netherlands",         code: "nl", x: 47, y: 23 },
  { country: "Switzerland",         code: "ch", x: 48, y: 27 },
  { country: "Poland",              code: "pl", x: 51, y: 23 },
  { country: "Croatia",             code: "hr", x: 50, y: 29 },
  { country: "Morocco",             code: "ma", x: 43, y: 40 },
];

/* ─── Simplified world map dot grid ─── */
const worldDots: [number, number][] = [
  // North America
  [15,12],[16,12],[17,12],[18,12],[19,12],[20,12],[13,13],[14,13],[15,13],[16,13],[17,13],[18,13],[19,13],[20,13],[21,13],
  [12,14],[13,14],[14,14],[15,14],[16,14],[17,14],[18,14],[19,14],[20,14],[21,14],
  [13,15],[14,15],[15,15],[16,15],[17,15],[18,15],[19,15],[20,15],
  [14,16],[15,16],[16,16],[17,16],[18,16],[19,16],[20,16],
  [15,17],[16,17],[17,17],[18,17],[19,17],
  [16,18],[17,18],[18,18],
  // Central America
  [17,19],[18,19],[17,20],[18,20],
  // South America
  [22,22],[23,22],[24,22],[25,22],
  [21,23],[22,23],[23,23],[24,23],[25,23],[26,23],
  [21,24],[22,24],[23,24],[24,24],[25,24],[26,24],
  [22,25],[23,25],[24,25],[25,25],[26,25],
  [22,26],[23,26],[24,26],[25,26],
  [23,27],[24,27],[25,27],
  [23,28],[24,28],[25,28],
  [24,29],[25,29],
  [24,30],[25,30],
  [25,31],
  // Europe
  [44,10],[45,10],[46,10],[47,10],[48,10],[49,10],
  [43,11],[44,11],[45,11],[46,11],[47,11],[48,11],[49,11],[50,11],
  [43,12],[44,12],[45,12],[46,12],[47,12],[48,12],[49,12],[50,12],[51,12],
  [44,13],[45,13],[46,13],[47,13],[48,13],[49,13],[50,13],
  [45,14],[46,14],[47,14],[48,14],[49,14],
  [46,15],[47,15],[48,15],
  // Africa
  [46,17],[47,17],[48,17],[49,17],
  [45,18],[46,18],[47,18],[48,18],[49,18],[50,18],
  [44,19],[45,19],[46,19],[47,19],[48,19],[49,19],[50,19],[51,19],
  [44,20],[45,20],[46,20],[47,20],[48,20],[49,20],[50,20],[51,20],
  [45,21],[46,21],[47,21],[48,21],[49,21],[50,21],
  [46,22],[47,22],[48,22],[49,22],[50,22],
  [46,23],[47,23],[48,23],[49,23],
  [47,24],[48,24],[49,24],
  [47,25],[48,25],
  [48,26],
  // Middle East / Central Asia
  [51,14],[52,14],[53,14],[54,14],[55,14],
  [51,15],[52,15],[53,15],[54,15],[55,15],[56,15],
  [52,16],[53,16],[54,16],[55,16],[56,16],[57,16],
  [53,17],[54,17],[55,17],[56,17],
  // Russia / North Asia
  [50,8],[51,8],[52,8],[53,8],[54,8],[55,8],[56,8],[57,8],[58,8],[59,8],[60,8],[61,8],[62,8],
  [50,9],[51,9],[52,9],[53,9],[54,9],[55,9],[56,9],[57,9],[58,9],[59,9],[60,9],[61,9],[62,9],[63,9],
  [51,10],[52,10],[53,10],[54,10],[55,10],[56,10],[57,10],[58,10],[59,10],[60,10],[61,10],[62,10],[63,10],
  [55,11],[56,11],[57,11],[58,11],[59,11],[60,11],[61,11],[62,11],
  // South Asia / India
  [57,17],[58,17],[59,17],[60,17],
  [57,18],[58,18],[59,18],[60,18],[61,18],
  [58,19],[59,19],[60,19],[61,19],
  [59,20],[60,20],[61,20],
  [59,21],[60,21],
  // Southeast Asia
  [62,18],[63,18],[64,18],
  [62,19],[63,19],[64,19],[65,19],
  [63,20],[64,20],[65,20],
  // East Asia
  [62,12],[63,12],[64,12],[65,12],[66,12],
  [61,13],[62,13],[63,13],[64,13],[65,13],[66,13],[67,13],
  [61,14],[62,14],[63,14],[64,14],[65,14],[66,14],[67,14],
  [62,15],[63,15],[64,15],[65,15],[66,15],
  [63,16],[64,16],[65,16],
  [69,13],[70,13],
  [69,14],[70,14],
  [69,15],
  // Australia
  [70,25],[71,25],[72,25],[73,25],[74,25],
  [69,26],[70,26],[71,26],[72,26],[73,26],[74,26],[75,26],
  [69,27],[70,27],[71,27],[72,27],[73,27],[74,27],[75,27],
  [70,28],[71,28],[72,28],[73,28],[74,28],[75,28],
  [71,29],[72,29],[73,29],[74,29],
  [72,30],[73,30],
];

interface Props {
  rates: CountryRate[];
}

export default function CoverageMap({ rates }: Props) {
  const prefersReduced = useReducedMotion();
  const t = useTranslations("coverage");
  const [activeIndex, setActiveIndex] = useState(0);

  /* ── Match rates to popular countries ── */
  const countriesWithRates = POPULAR_COUNTRIES.map((pin) => {
    const rate = rates.find(
      (r) => r.country.toLowerCase() === pin.country.toLowerCase(),
    );
    return {
      ...pin,
      pricePerGB: rate?.pricePerGB ?? null,
      flag: rate?.flag ?? "",
    };
  }).filter((c) => c.pricePerGB !== null);

  /* ── Auto-advance carousel ── */
  useEffect(() => {
    if (prefersReduced || countriesWithRates.length === 0) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % countriesWithRates.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [prefersReduced, countriesWithRates.length]);

  const active = countriesWithRates[activeIndex] ?? countriesWithRates[0];

  return (
    <section id="coverage" className="section-padding relative z-10 overflow-hidden">
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
        </div>

        {/* Map Visualization */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl p-6 sm:p-10 glass overflow-hidden"
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,89,249,0.15), transparent 70%)",
            }}
          />

          {/* Dot grid map */}
          <div className="relative">
            <svg
              viewBox="0 0 88 40"
              className="w-full h-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              {worldDots.map(([x, y], i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="0.4"
                  fill="#2875FF"
                  opacity="0.25"
                />
              ))}
            </svg>

            {/* ── Flag carousel overlay ── */}
            {active && (
              <div className="absolute inset-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.code}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute flex flex-col items-center gap-1"
                    style={{
                      left: `${active.x}%`,
                      top: `${active.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {/* Pulse ring */}
                    <motion.div
                      className="absolute w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-cyan/30"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: [0.8, 1.8], opacity: [0.4, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />

                    {/* Flag circle */}
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-white shadow-lg shadow-cyan/20 overflow-hidden bg-gray-100 flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://flagcdn.com/w80/${active.code}.png`}
                        alt={active.country}
                        className="w-full h-full object-cover"
                        loading="eager"
                      />
                    </div>

                    {/* Country name + price pill */}
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-[9px] sm:text-[11px] font-semibold text-gray-700 whitespace-nowrap drop-shadow-sm">
                        {active.country}
                      </span>
                      <span className="text-[9px] sm:text-[11px] font-bold text-cyan whitespace-nowrap bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm">
                        ${active.pricePerGB!.toFixed(2)}/GB
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Country count badge */}
          <div className="flex justify-center mt-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 text-cyan text-sm font-semibold">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t("badge")}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
