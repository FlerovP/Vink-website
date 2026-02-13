"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { CountryRate } from "@/lib/rates";

/* ─────────────────────────────────────────────────────────────────────────────
   Geo coordinates for ALL supported countries.
   x, y = percentage position on the Mercator-style dot-grid map.
   code = ISO 3166-1 alpha-2 lowercase (for flagcdn.com).
   ──────────────────────────────────────────────────────────────────────────── */

interface CountryGeo {
  code: string;
  x: number;
  y: number;
}

const COUNTRY_GEO: Record<string, CountryGeo> = {
  // ── North America ──
  "Canada":                       { code: "ca", x: 18, y: 20 },
  "United States":                { code: "us", x: 18, y: 32 },
  "Mexico":                       { code: "mx", x: 16, y: 44 },
  "Guatemala":                    { code: "gt", x: 17, y: 46 },
  "Honduras":                     { code: "hn", x: 18, y: 46 },
  "El Salvador":                  { code: "sv", x: 17, y: 48 },
  "Nicaragua":                    { code: "ni", x: 18, y: 48 },
  "Costa Rica":                   { code: "cr", x: 18, y: 50 },
  "Panama":                       { code: "pa", x: 20, y: 50 },
  "Belize":                       { code: "bz", x: 18, y: 44 },
  "Cuba":                         { code: "cu", x: 20, y: 42 },
  "Jamaica":                      { code: "jm", x: 21, y: 44 },
  "Dominican Republic":           { code: "do", x: 23, y: 44 },
  "Dominica":                     { code: "dm", x: 25, y: 46 },
  "Puerto Rico":                  { code: "pr", x: 24, y: 44 },
  "Bahamas":                      { code: "bs", x: 21, y: 42 },
  "Barbados":                     { code: "bb", x: 25, y: 48 },
  "Bermuda":                      { code: "bm", x: 24, y: 38 },
  "Grenada":                      { code: "gd", x: 25, y: 48 },
  "Anguilla":                     { code: "ai", x: 24, y: 44 },
  "Antigua and Barbuda":          { code: "ag", x: 25, y: 44 },
  "British Virgin Islands":       { code: "vg", x: 24, y: 44 },
  "Cayman Islands":               { code: "ky", x: 20, y: 44 },
  "Guam":                         { code: "gu", x: 85, y: 48 },
  "Montserrat":                   { code: "ms", x: 25, y: 46 },
  "Saint Kitts and Nevis":        { code: "kn", x: 25, y: 44 },
  "Saint Lucia":                  { code: "lc", x: 25, y: 46 },
  "Saint Vincent and Grenadines": { code: "vc", x: 25, y: 48 },
  "Trinidad and Tobago":          { code: "tt", x: 25, y: 50 },
  "Turks and Caicos Islands":     { code: "tc", x: 22, y: 42 },
  "Curacao":                      { code: "cw", x: 23, y: 48 },
  "Netherlands Antilles":         { code: "bq", x: 23, y: 48 },
  "Greenland":                    { code: "gl", x: 35, y: 10 },

  // ── South America ──
  "Colombia":                     { code: "co", x: 22, y: 54 },
  "Venezuela":                    { code: "ve", x: 24, y: 52 },
  "Ecuador":                      { code: "ec", x: 21, y: 58 },
  "Peru":                         { code: "pe", x: 22, y: 62 },
  "Brazil":                       { code: "br", x: 30, y: 62 },
  "Bolivia":                      { code: "bo", x: 25, y: 60 },
  "Chile":                        { code: "cl", x: 24, y: 70 },
  "Argentina":                    { code: "ar", x: 26, y: 72 },
  "Uruguay":                      { code: "uy", x: 27, y: 70 },
  "Paraguay":                     { code: "py", x: 26, y: 66 },
  "Guyana":                       { code: "gy", x: 26, y: 54 },
  "Suriname":                     { code: "sr", x: 27, y: 54 },
  "French Guiana":                { code: "gf", x: 28, y: 54 },

  // ── Europe ──
  "Iceland":                      { code: "is", x: 40, y: 14 },
  "Norway":                       { code: "no", x: 48, y: 16 },
  "Sweden":                       { code: "se", x: 50, y: 16 },
  "Finland":                      { code: "fi", x: 52, y: 16 },
  "Denmark":                      { code: "dk", x: 48, y: 20 },
  "United Kingdom":               { code: "gb", x: 45, y: 22 },
  "Ireland":                      { code: "ie", x: 43, y: 22 },
  "Netherlands":                  { code: "nl", x: 47, y: 23 },
  "Belgium":                      { code: "be", x: 47, y: 24 },
  "Luxembourg":                   { code: "lu", x: 47, y: 25 },
  "Germany":                      { code: "de", x: 49, y: 24 },
  "Poland":                       { code: "pl", x: 51, y: 23 },
  "Czech Republic":               { code: "cz", x: 50, y: 25 },
  "Slovakia":                     { code: "sk", x: 51, y: 26 },
  "Austria":                      { code: "at", x: 49, y: 27 },
  "Switzerland":                  { code: "ch", x: 48, y: 27 },
  "Liechtenstein":                { code: "li", x: 48, y: 27 },
  "France":                       { code: "fr", x: 46, y: 28 },
  "Monaco":                       { code: "mc", x: 47, y: 30 },
  "Andorra":                      { code: "ad", x: 45, y: 31 },
  "Spain":                        { code: "es", x: 43, y: 33 },
  "Portugal":                     { code: "pt", x: 41, y: 33 },
  "Gibraltar":                    { code: "gi", x: 43, y: 35 },
  "Italy":                        { code: "it", x: 49, y: 31 },
  "Malta":                        { code: "mt", x: 50, y: 35 },
  "Croatia":                      { code: "hr", x: 50, y: 29 },
  "Slovenia":                     { code: "si", x: 50, y: 28 },
  "Bosnia and Herzegovina":       { code: "ba", x: 50, y: 30 },
  "Serbia":                       { code: "rs", x: 51, y: 30 },
  "Montenegro":                   { code: "me", x: 51, y: 30 },
  "Kosovo":                       { code: "xk", x: 51, y: 31 },
  "Macedonia":                    { code: "mk", x: 52, y: 32 },
  "Albania":                      { code: "al", x: 51, y: 32 },
  "Greece":                       { code: "gr", x: 52, y: 33 },
  "Cyprus":                       { code: "cy", x: 55, y: 36 },
  "Hungary":                      { code: "hu", x: 51, y: 27 },
  "Romania":                      { code: "ro", x: 52, y: 28 },
  "Bulgaria":                     { code: "bg", x: 52, y: 30 },
  "Moldova":                      { code: "md", x: 53, y: 27 },
  "Ukraine":                      { code: "ua", x: 54, y: 25 },
  "Belarus":                      { code: "by", x: 53, y: 23 },
  "Lithuania":                    { code: "lt", x: 52, y: 22 },
  "Latvia":                       { code: "lv", x: 52, y: 21 },
  "Estonia":                      { code: "ee", x: 52, y: 20 },
  "Faroe Islands":                { code: "fo", x: 44, y: 16 },
  "Russian Federation":           { code: "ru", x: 60, y: 18 },

  // ── Middle East ──
  "Turkey":                       { code: "tr", x: 55, y: 35 },
  "Israel":                       { code: "il", x: 56, y: 40 },
  "Jordan":                       { code: "jo", x: 56, y: 40 },
  "Iraq":                         { code: "iq", x: 58, y: 38 },
  "Iran":                         { code: "ir", x: 60, y: 38 },
  "Kuwait":                       { code: "kw", x: 59, y: 42 },
  "Saudi Arabia":                 { code: "sa", x: 58, y: 44 },
  "Bahrain":                      { code: "bh", x: 59, y: 44 },
  "Qatar":                        { code: "qa", x: 60, y: 44 },
  "United Arab Emirates":         { code: "ae", x: 60, y: 46 },
  "Oman":                         { code: "om", x: 61, y: 44 },

  // ── Central Asia ──
  "Georgia":                      { code: "ge", x: 57, y: 33 },
  "Armenia":                      { code: "am", x: 57, y: 34 },
  "Azerbaijan":                   { code: "az", x: 58, y: 34 },
  "Kazakhstan":                   { code: "kz", x: 63, y: 28 },
  "Uzbekistan":                   { code: "uz", x: 63, y: 32 },
  "Kyrgyzstan":                   { code: "kg", x: 65, y: 32 },
  "Tajikistan":                   { code: "tj", x: 64, y: 34 },
  "Afghanistan":                  { code: "af", x: 63, y: 38 },

  // ── South Asia ──
  "Pakistan":                     { code: "pk", x: 63, y: 42 },
  "India":                        { code: "in", x: 66, y: 46 },
  "Nepal":                        { code: "np", x: 67, y: 44 },
  "Bhutan":                       { code: "bt", x: 69, y: 44 },
  "Bangladesh":                   { code: "bd", x: 68, y: 46 },
  "Sri Lanka":                    { code: "lk", x: 67, y: 52 },
  "Maldives":                     { code: "mv", x: 65, y: 56 },

  // ── East Asia ──
  "Mongolia":                     { code: "mn", x: 72, y: 28 },
  "China":                        { code: "cn", x: 73, y: 38 },
  "Hong Kong":                    { code: "hk", x: 76, y: 42 },
  "Macao China":                  { code: "mo", x: 76, y: 42 },
  "Taiwan":                       { code: "tw", x: 78, y: 42 },
  "South Korea":                  { code: "kr", x: 79, y: 32 },
  "Japan":                        { code: "jp", x: 82, y: 32 },

  // ── Southeast Asia ──
  "Thailand":                     { code: "th", x: 73, y: 52 },
  "Vietnam":                      { code: "vn", x: 75, y: 50 },
  "Cambodia":                     { code: "kh", x: 74, y: 52 },
  "Laos":                         { code: "la", x: 73, y: 48 },
  "Malaysia":                     { code: "my", x: 74, y: 56 },
  "Singapore":                    { code: "sg", x: 74, y: 58 },
  "Indonesia":                    { code: "id", x: 76, y: 60 },
  "Philippines":                  { code: "ph", x: 78, y: 48 },
  "Brunei":                       { code: "bn", x: 76, y: 56 },

  // ── Africa ──
  "Morocco":                      { code: "ma", x: 43, y: 40 },
  "Algeria":                      { code: "dz", x: 46, y: 40 },
  "Tunisia":                      { code: "tn", x: 48, y: 38 },
  "Egypt":                        { code: "eg", x: 54, y: 44 },
  "Mauritania":                   { code: "mr", x: 42, y: 48 },
  "Senegal":                      { code: "sn", x: 40, y: 50 },
  "Niger":                        { code: "ne", x: 48, y: 48 },
  "Chad":                         { code: "td", x: 51, y: 50 },
  "Sudan":                        { code: "sd", x: 54, y: 50 },
  "South Sudan":                  { code: "ss", x: 54, y: 54 },
  "Ethiopia":                     { code: "et", x: 56, y: 52 },
  "Nigeria":                      { code: "ng", x: 48, y: 52 },
  "Ghana":                        { code: "gh", x: 45, y: 52 },
  "Ivory Coast":                  { code: "ci", x: 44, y: 52 },
  "Cameroon":                     { code: "cm", x: 49, y: 54 },
  "Benin":                        { code: "bj", x: 47, y: 52 },
  "Liberia":                      { code: "lr", x: 43, y: 54 },
  "Cape Verde":                   { code: "cv", x: 38, y: 48 },
  "Gabon":                        { code: "ga", x: 49, y: 58 },
  "Congo Republic":               { code: "cg", x: 50, y: 58 },
  "Congo Dem. Rep":               { code: "cd", x: 52, y: 58 },
  "Uganda":                       { code: "ug", x: 55, y: 58 },
  "Rwanda":                       { code: "rw", x: 54, y: 58 },
  "Kenya":                        { code: "ke", x: 56, y: 58 },
  "Tanzania":                     { code: "tz", x: 56, y: 60 },
  "Angola":                       { code: "ao", x: 51, y: 62 },
  "Malawi":                       { code: "mw", x: 55, y: 64 },
  "Mozambique":                   { code: "mz", x: 56, y: 66 },
  "Madagascar":                   { code: "mg", x: 58, y: 64 },
  "Zambia":                       { code: "zm", x: 53, y: 64 },
  "Zimbabwe":                     { code: "zw", x: 54, y: 66 },
  "Eswatini":                     { code: "sz", x: 54, y: 70 },
  "Lesotho":                      { code: "ls", x: 53, y: 72 },
  "South Africa":                 { code: "za", x: 52, y: 72 },
  "Seychelles":                   { code: "sc", x: 60, y: 60 },
  "Mauritius":                    { code: "mu", x: 61, y: 66 },
  "Reunion":                      { code: "re", x: 60, y: 66 },

  // ── Oceania ──
  "Australia":                    { code: "au", x: 82, y: 72 },
  "New Zealand":                  { code: "nz", x: 88, y: 78 },
  "Papua New Guinea":             { code: "pg", x: 85, y: 60 },
  "Fiji":                         { code: "fj", x: 90, y: 60 },
  "Samoa":                        { code: "ws", x: 92, y: 56 },
  "Tonga":                        { code: "to", x: 92, y: 62 },
  "Vanuatu":                      { code: "vu", x: 88, y: 60 },
  "French Polynesia":             { code: "pf", x: 10, y: 60 },
};

/* ─── 30 popular countries for the idle carousel ─── */
const POPULAR_KEYS = [
  "Turkey", "Thailand", "United States", "United Kingdom", "Spain",
  "France", "Italy", "Germany", "United Arab Emirates", "Japan",
  "South Korea", "Indonesia", "India", "Brazil", "Mexico",
  "Australia", "Canada", "Greece", "Portugal", "Egypt",
  "Malaysia", "Vietnam", "Singapore", "Israel", "Czech Republic",
  "Netherlands", "Switzerland", "Poland", "Croatia", "Morocco",
];

/* ─── Simplified world map dot grid ─── */
const worldDots: [number, number][] = [
  [15,12],[16,12],[17,12],[18,12],[19,12],[20,12],[13,13],[14,13],[15,13],[16,13],[17,13],[18,13],[19,13],[20,13],[21,13],
  [12,14],[13,14],[14,14],[15,14],[16,14],[17,14],[18,14],[19,14],[20,14],[21,14],
  [13,15],[14,15],[15,15],[16,15],[17,15],[18,15],[19,15],[20,15],
  [14,16],[15,16],[16,16],[17,16],[18,16],[19,16],[20,16],
  [15,17],[16,17],[17,17],[18,17],[19,17],
  [16,18],[17,18],[18,18],
  [17,19],[18,19],[17,20],[18,20],
  [22,22],[23,22],[24,22],[25,22],
  [21,23],[22,23],[23,23],[24,23],[25,23],[26,23],
  [21,24],[22,24],[23,24],[24,24],[25,24],[26,24],
  [22,25],[23,25],[24,25],[25,25],[26,25],
  [22,26],[23,26],[24,26],[25,26],
  [23,27],[24,27],[25,27],
  [23,28],[24,28],[25,28],
  [24,29],[25,29],[24,30],[25,30],[25,31],
  [44,10],[45,10],[46,10],[47,10],[48,10],[49,10],
  [43,11],[44,11],[45,11],[46,11],[47,11],[48,11],[49,11],[50,11],
  [43,12],[44,12],[45,12],[46,12],[47,12],[48,12],[49,12],[50,12],[51,12],
  [44,13],[45,13],[46,13],[47,13],[48,13],[49,13],[50,13],
  [45,14],[46,14],[47,14],[48,14],[49,14],
  [46,15],[47,15],[48,15],
  [46,17],[47,17],[48,17],[49,17],
  [45,18],[46,18],[47,18],[48,18],[49,18],[50,18],
  [44,19],[45,19],[46,19],[47,19],[48,19],[49,19],[50,19],[51,19],
  [44,20],[45,20],[46,20],[47,20],[48,20],[49,20],[50,20],[51,20],
  [45,21],[46,21],[47,21],[48,21],[49,21],[50,21],
  [46,22],[47,22],[48,22],[49,22],[50,22],
  [46,23],[47,23],[48,23],[49,23],
  [47,24],[48,24],[49,24],[47,25],[48,25],[48,26],
  [51,14],[52,14],[53,14],[54,14],[55,14],
  [51,15],[52,15],[53,15],[54,15],[55,15],[56,15],
  [52,16],[53,16],[54,16],[55,16],[56,16],[57,16],
  [53,17],[54,17],[55,17],[56,17],
  [50,8],[51,8],[52,8],[53,8],[54,8],[55,8],[56,8],[57,8],[58,8],[59,8],[60,8],[61,8],[62,8],
  [50,9],[51,9],[52,9],[53,9],[54,9],[55,9],[56,9],[57,9],[58,9],[59,9],[60,9],[61,9],[62,9],[63,9],
  [51,10],[52,10],[53,10],[54,10],[55,10],[56,10],[57,10],[58,10],[59,10],[60,10],[61,10],[62,10],[63,10],
  [55,11],[56,11],[57,11],[58,11],[59,11],[60,11],[61,11],[62,11],
  [57,17],[58,17],[59,17],[60,17],
  [57,18],[58,18],[59,18],[60,18],[61,18],
  [58,19],[59,19],[60,19],[61,19],
  [59,20],[60,20],[61,20],[59,21],[60,21],
  [62,18],[63,18],[64,18],
  [62,19],[63,19],[64,19],[65,19],
  [63,20],[64,20],[65,20],
  [62,12],[63,12],[64,12],[65,12],[66,12],
  [61,13],[62,13],[63,13],[64,13],[65,13],[66,13],[67,13],
  [61,14],[62,14],[63,14],[64,14],[65,14],[66,14],[67,14],
  [62,15],[63,15],[64,15],[65,15],[66,15],
  [63,16],[64,16],[65,16],
  [69,13],[70,13],[69,14],[70,14],[69,15],
  [70,25],[71,25],[72,25],[73,25],[74,25],
  [69,26],[70,26],[71,26],[72,26],[73,26],[74,26],[75,26],
  [69,27],[70,27],[71,27],[72,27],[73,27],[74,27],[75,27],
  [70,28],[71,28],[72,28],[73,28],[74,28],[75,28],
  [71,29],[72,29],[73,29],[74,29],[72,30],[73,30],
];

/* ─── Types ─── */
interface CountryWithGeo {
  country: string;
  code: string;
  x: number;
  y: number;
  pricePerGB: number;
}

interface Props {
  rates: CountryRate[];
}

/* ═══════════════════════════════════════════════════════════════════════════ */

export default function CoverageMap({ rates }: Props) {
  const prefersReduced = useReducedMotion();
  const t = useTranslations("coverage");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredCountry, setHoveredCountry] = useState<CountryWithGeo | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const hoveredNameRef = useRef<string | null>(null);

  /* ── Build full list: merge ALL rates with geo data ── */
  const allCountries = useMemo(() => {
    const result: CountryWithGeo[] = [];
    for (const rate of rates) {
      const geo = COUNTRY_GEO[rate.country];
      if (geo) {
        result.push({
          country: rate.country,
          code: geo.code,
          x: geo.x,
          y: geo.y,
          pricePerGB: rate.pricePerGB,
        });
      }
    }
    return result;
  }, [rates]);

  /* ── Popular countries subset for carousel ── */
  const carouselCountries = useMemo(
    () => allCountries.filter((c) => POPULAR_KEYS.includes(c.country)),
    [allCountries],
  );

  /* ── Auto-advance carousel (paused while hovering) ── */
  useEffect(() => {
    if (prefersReduced || carouselCountries.length === 0 || isHovering) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % carouselCountries.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [prefersReduced, carouselCountries.length, isHovering]);

  const activeCarousel = carouselCountries[activeIndex] ?? carouselCountries[0];

  /* ── Mouse handlers ── */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = mapRef.current?.getBoundingClientRect();
      if (!rect) return;

      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const xPct = (px / rect.width) * 100;
      const yPct = (py / rect.height) * 100;

      // Position tooltip via DOM ref (no re-render for smooth tracking)
      if (tooltipRef.current) {
        // Flip tooltip to left side if near right edge
        const flipX = px > rect.width - 180;
        const offsetX = flipX ? -16 : 16;
        tooltipRef.current.style.transform = `translate(${px + offsetX}px, ${py - 24}px)`;
        if (flipX) {
          tooltipRef.current.style.transformOrigin = "right center";
        } else {
          tooltipRef.current.style.transformOrigin = "left center";
        }
      }

      // Find nearest country
      let nearest: CountryWithGeo | null = null;
      let minDist = Infinity;
      for (const c of allCountries) {
        const dx = c.x - xPct;
        const dy = c.y - yPct;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist) {
          minDist = dist;
          nearest = c;
        }
      }

      // Only show if within a reasonable distance (10% of map)
      const found = nearest && minDist < 10 ? nearest : null;
      const foundName = found?.country ?? null;

      // Only update React state when hovered country changes
      if (foundName !== hoveredNameRef.current) {
        hoveredNameRef.current = foundName;
        setHoveredCountry(found);
      }
    },
    [allCountries],
  );

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setHoveredCountry(null);
    hoveredNameRef.current = null;
  }, []);

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

          {/* Interactive map area */}
          <div
            ref={mapRef}
            className="relative"
            style={{ cursor: isHovering && hoveredCountry ? "pointer" : "default" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            {/* Dot grid */}
            <svg
              viewBox="0 0 88 40"
              className="w-full h-auto pointer-events-none"
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

            {/* ── Idle carousel (visible when NOT hovering) ── */}
            {!isHovering && activeCarousel && (
              <div className="absolute inset-0 pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCarousel.code}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute flex flex-col items-center gap-1"
                    style={{
                      left: `${activeCarousel.x}%`,
                      top: `${activeCarousel.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {/* Pulse ring */}
                    <motion.div
                      className="absolute w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-cyan/30"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: [0.8, 1.8], opacity: [0.4, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    />
                    {/* Flag */}
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-white shadow-lg shadow-cyan/20 overflow-hidden bg-gray-100 flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://flagcdn.com/w80/${activeCarousel.code}.png`}
                        alt={activeCarousel.country}
                        className="w-full h-full object-cover"
                        loading="eager"
                      />
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-[9px] sm:text-[11px] font-semibold text-gray-700 whitespace-nowrap drop-shadow-sm">
                        {activeCarousel.country}
                      </span>
                      <span className="text-[9px] sm:text-[11px] font-bold text-cyan whitespace-nowrap bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm">
                        ${activeCarousel.pricePerGB.toFixed(2)}/GB
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

            {/* ── Hover tooltip (follows cursor, shows nearest country) ── */}
            <div
              ref={tooltipRef}
              className="absolute top-0 left-0 pointer-events-none z-20"
              style={{ willChange: "transform" }}
            >
              <AnimatePresence mode="wait">
                {isHovering && hoveredCountry && (
                  <motion.div
                    key={hoveredCountry.country}
                    initial={{ opacity: 0, scale: 0.85, y: 4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: 4 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="flex items-center gap-2.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl shadow-black/10 border border-gray-100 px-3 py-2"
                  >
                    {/* Flag */}
                    <div className="w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden bg-gray-100 flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://flagcdn.com/w80/${hoveredCountry.code}.png`}
                        alt={hoveredCountry.country}
                        className="w-full h-full object-cover"
                        loading="eager"
                      />
                    </div>
                    {/* Info */}
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                        {hoveredCountry.country}
                      </span>
                      <span className="text-sm font-bold text-cyan whitespace-nowrap">
                        ${hoveredCountry.pricePerGB.toFixed(2)}/GB
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
