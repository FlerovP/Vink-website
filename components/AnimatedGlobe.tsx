"use client";

import { useRef, useMemo } from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

/* ─── Land dots [lon, lat] on ~6° grid ─── */
const LAND: [number, number][] = [
  // Greenland
  [-52,68],[-46,68],[-40,68],[-34,68],[-52,72],[-46,72],[-40,72],[-34,72],[-46,76],[-40,76],
  // Iceland
  [-22,64],[-18,64],
  // North America
  [-140,62],[-134,62],[-128,62],[-122,62],[-116,62],[-110,62],[-104,62],[-98,62],[-92,62],[-86,62],[-80,62],[-74,62],[-68,62],
  [-134,56],[-128,56],[-122,56],[-116,56],[-110,56],[-104,56],[-98,56],[-92,56],[-86,56],[-80,56],[-74,56],[-68,56],[-62,56],
  [-128,50],[-122,50],[-116,50],[-110,50],[-104,50],[-98,50],[-92,50],[-86,50],[-80,50],[-74,50],[-68,50],[-62,50],
  [-128,44],[-122,44],[-116,44],[-110,44],[-104,44],[-98,44],[-92,44],[-86,44],[-80,44],[-74,44],
  [-122,38],[-116,38],[-110,38],[-104,38],[-98,38],[-92,38],[-86,38],[-80,38],
  [-116,32],[-110,32],[-104,32],[-98,32],[-92,32],[-86,32],[-80,32],
  [-110,26],[-104,26],[-98,26],[-92,26],[-86,26],
  [-104,20],[-98,20],[-92,20],[-86,20],
  // Central America & Caribbean
  [-92,14],[-86,14],[-80,14],
  [-86,8],[-80,8],[-74,8],
  // South America
  [-80,2],[-74,2],[-68,2],[-62,2],[-56,2],[-50,2],
  [-74,-4],[-68,-4],[-62,-4],[-56,-4],[-50,-4],[-44,-4],[-38,-4],
  [-74,-10],[-68,-10],[-62,-10],[-56,-10],[-50,-10],[-44,-10],[-38,-10],
  [-68,-16],[-62,-16],[-56,-16],[-50,-16],[-44,-16],[-38,-16],
  [-62,-22],[-56,-22],[-50,-22],[-44,-22],
  [-56,-28],[-50,-28],[-44,-28],
  [-56,-34],[-50,-34],
  [-50,-40],[-74,-46],[-68,-46],[-74,-52],[-68,-52],
  // UK & Ireland
  [-8,56],[-2,56],[-8,50],[-2,50],
  // Europe
  [-8,44],[-2,44],[4,44],[10,44],[16,44],[22,44],[28,44],
  [-8,38],[-2,38],[4,38],[10,38],[16,38],[22,38],[28,38],[34,38],
  [-2,50],[4,50],[10,50],[16,50],[22,50],[28,50],[34,50],
  [4,56],[10,56],[16,56],[22,56],[28,56],[34,56],[40,56],
  // Scandinavia
  [4,62],[10,62],[16,62],[22,62],[28,62],
  // Africa
  [-16,32],[-10,32],[-4,32],[2,32],[8,32],[14,32],[20,32],[26,32],[32,32],
  [-16,26],[-10,26],[-4,26],[2,26],[8,26],[14,26],[20,26],[26,26],[32,26],[38,26],
  [-16,20],[-10,20],[-4,20],[2,20],[8,20],[14,20],[20,20],[26,20],[32,20],[38,20],[44,20],
  [-16,14],[-10,14],[-4,14],[2,14],[8,14],[14,14],[20,14],[26,14],[32,14],[38,14],[44,14],
  [-10,8],[-4,8],[2,8],[8,8],[14,8],[20,8],[26,8],[32,8],[38,8],[44,8],
  [8,2],[14,2],[20,2],[26,2],[32,2],[38,2],
  [14,-4],[20,-4],[26,-4],[32,-4],[38,-4],
  [20,-10],[26,-10],[32,-10],[38,-10],
  [26,-16],[32,-16],[38,-16],
  [26,-22],[32,-22],[38,-22],
  [26,-28],[32,-28],
  [28,-34],
  // Middle East
  [34,32],[40,32],[46,32],[52,32],[58,32],
  [40,26],[46,26],[52,26],[58,26],[64,26],
  [46,20],[52,20],
  // Russia
  [40,62],[46,62],[52,62],[58,62],[64,62],[70,62],[76,62],[82,62],[88,62],[94,62],[100,62],[106,62],[112,62],[118,62],[124,62],[130,62],[136,62],[142,62],[148,62],[154,62],[160,62],[166,62],[172,62],
  [40,56],[46,56],[52,56],[58,56],[64,56],[70,56],[76,56],[82,56],[88,56],[94,56],[100,56],[106,56],[112,56],[118,56],[124,56],[130,56],[136,56],[142,56],[148,56],[154,56],[160,56],
  [52,50],[58,50],[64,50],[70,50],[76,50],[82,50],[88,50],[94,50],[100,50],[106,50],[112,50],[118,50],[124,50],[130,50],[136,50],[142,50],
  // Central Asia
  [58,44],[64,44],[70,44],[76,44],[82,44],[88,44],
  // South Asia
  [64,32],[70,32],[76,32],[82,32],[88,32],
  [70,26],[76,26],[82,26],[88,26],[94,26],
  [70,20],[76,20],[82,20],[88,20],[94,20],[100,20],
  [76,14],[82,14],[88,14],[94,14],[100,14],[106,14],
  [76,8],[94,8],[100,8],[106,8],
  // East Asia
  [94,44],[100,44],[106,44],[112,44],[118,44],[124,44],[130,44],
  [100,38],[106,38],[112,38],[118,38],[124,38],[130,38],
  [106,32],[112,32],[118,32],[124,32],
  [112,26],[118,26],
  // Japan
  [130,38],[136,38],[142,38],
  [130,44],[136,44],[142,44],
  // Southeast Asia
  [100,2],[106,2],[112,2],[118,2],
  [100,-4],[106,-4],[112,-4],[118,-4],
  [112,-10],[118,-10],[124,-10],
  // Australia
  [118,-16],[124,-16],[130,-16],[136,-16],[142,-16],[148,-16],[154,-16],
  [118,-22],[124,-22],[130,-22],[136,-22],[142,-22],[148,-22],[154,-22],
  [118,-28],[124,-28],[130,-28],[136,-28],[142,-28],[148,-28],[154,-28],
  [124,-34],[130,-34],[136,-34],[142,-34],[148,-34],[154,-34],
  [136,-40],[142,-40],[148,-40],
  // New Zealand
  [172,-38],[172,-44],
];

/* ─── City markers ─── */
const CITIES = [
  { lon: -74, lat: 40.7, label: "New York" },       // 0
  { lon: -43, lat: -23, label: "São Paulo" },        // 1
  { lon: -0.1, lat: 51.5, label: "London" },         // 2
  { lon: 2.4, lat: 48.9, label: "Paris" },           // 3
  { lon: 13, lat: 52.5, label: "Berlin" },           // 4
  { lon: 29, lat: 41, label: "Istanbul" },           // 5
  { lon: 37.6, lat: 55.8, label: "Moscow" },         // 6
  { lon: 55.3, lat: 25.2, label: "Dubai" },          // 7
  { lon: 73, lat: 19, label: "Mumbai" },             // 8
  { lon: 100.5, lat: 13.8, label: "Bangkok" },       // 9
  { lon: 121.5, lat: 31.2, label: "Shanghai" },      // 10
  { lon: 139.7, lat: 35.7, label: "Tokyo" },         // 11
  { lon: 151, lat: -33.9, label: "Sydney" },         // 12
  { lon: 76.9, lat: 43.2, label: "Almaty" },         // 13
  { lon: -118, lat: 34, label: "Los Angeles" },      // 14
  { lon: -80, lat: 25.8, label: "Miami" },           // 15
  { lon: -99, lat: 19.4, label: "Mexico City" },     // 16
  { lon: -3.7, lat: 40.4, label: "Madrid" },         // 17
  { lon: 12.5, lat: 41.9, label: "Rome" },           // 18
  { lon: 24, lat: 60.2, label: "Helsinki" },         // 19
  { lon: 32.9, lat: 39.9, label: "Ankara" },         // 20
  { lon: 46.7, lat: 24.7, label: "Riyadh" },        // 21
  { lon: 36.8, lat: -1.3, label: "Nairobi" },       // 22
  { lon: 3.4, lat: 6.5, label: "Lagos" },           // 23
  { lon: 28, lat: -26, label: "Johannesburg" },      // 24
  { lon: 90.4, lat: 23.8, label: "Dhaka" },         // 25
  { lon: 103.8, lat: 1.35, label: "Singapore" },     // 26
  { lon: 106.8, lat: -6.2, label: "Jakarta" },       // 27
  { lon: 114.2, lat: 22.3, label: "Hong Kong" },     // 28
  { lon: 127, lat: 37.6, label: "Seoul" },           // 29
];

const ARCS = [
  // Transatlantic
  [0,2],[0,15],[14,0],[14,11],[15,1],[0,1],[16,15],
  // Europe internal
  [2,3],[3,4],[3,17],[17,18],[4,19],[18,5],[4,6],[2,6],[19,6],
  // Europe → Middle East / Africa
  [5,7],[5,20],[20,7],[7,21],[21,22],[23,22],[23,24],[22,24],[2,23],
  // Middle East → Asia
  [7,8],[7,13],[13,6],[8,25],[25,9],[8,9],
  // Asia internal
  [9,26],[26,27],[9,28],[28,10],[10,11],[11,29],[29,10],[28,11],
  // Asia → Oceania
  [26,12],[27,12],[11,12],
  // Long-haul
  [0,11],[2,8],[14,10],[1,23],[6,10],
];

/* ─── Map projection: Mercator-like into SVG coords ─── */
const VW = 800;
const VH = 440;
const PAD_X = 30;
const PAD_Y = 30;

function toSVG(lon: number, lat: number) {
  const x = PAD_X + ((lon + 180) / 360) * (VW - PAD_X * 2);
  // Clamp latitude for Mercator
  const latR = Math.max(-70, Math.min(75, lat));
  const y = PAD_Y + ((75 - latR) / 145) * (VH - PAD_Y * 2);
  return { x, y };
}

function makeArc(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const d = Math.hypot(b.x - a.x, b.y - a.y);
  const lift = Math.min(d * 0.25, 60);
  return `M${a.x},${a.y} Q${mx},${my - lift} ${b.x},${b.y}`;
}

export default function AnimatedGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const landDots = useMemo(() => LAND.map(([lo, la]) => toSVG(lo, la)), []);
  const cityDots = useMemo(() => CITIES.map((c) => ({ ...toSVG(c.lon, c.lat), label: c.label })), []);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
      {/* Glow behind map */}
      <div
        className="absolute w-[90%] h-[80%] rounded-full opacity-40 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(40,117,255,0.10), transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="relative w-full">
        <svg viewBox={`0 0 ${VW} ${VH}`} fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <defs>
            <linearGradient id="arcG" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2875FF" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#2875FF" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#0059F9" stopOpacity="0.1" />
            </linearGradient>
            <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="glowSm" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="1.5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* ── Land dots ── */}
          {landDots.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="2.2"
              fill="rgba(40,117,255,0.22)"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: prefersReduced ? 0 : 0.2,
                delay: prefersReduced ? 0 : 0.1 + (i % 50) * 0.012,
              }}
            />
          ))}

          {/* ── Connection arcs ── */}
          {ARCS.map(([fi, ti], i) => {
            const a = cityDots[fi];
            const b = cityDots[ti];
            const d = makeArc(a, b);
            return (
              <motion.path
                key={`arc-${i}`}
                d={d}
                stroke="url(#arcG)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                initial={prefersReduced ? { pathLength: 1, opacity: 0.4 } : { pathLength: 0, opacity: 0 }}
                animate={prefersReduced ? {} : { pathLength: 1, opacity: 0.5 }}
                transition={{
                  pathLength: { duration: 1.6, delay: 0.8 + i * 0.1, ease: "easeInOut" },
                  opacity: { duration: 0.4, delay: 0.8 + i * 0.1 },
                }}
              />
            );
          })}

          {/* ── City markers ── */}
          {cityDots.map((c, i) => (
            <g key={`city-${i}`}>
              {/* Pulse ring */}
              <motion.circle
                cx={c.x} cy={c.y} r="10"
                fill="none" stroke="#2875FF" strokeWidth="0.7"
                initial={prefersReduced ? { opacity: 0.15 } : { scale: 0.5, opacity: 0 }}
                animate={prefersReduced ? {} : { scale: [0.5, 2.2, 0.5], opacity: [0, 0.2, 0] }}
                transition={{ duration: 4, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Glow dot */}
              <motion.circle
                cx={c.x} cy={c.y} r="4"
                fill="#2875FF" filter="url(#glow)"
                initial={prefersReduced ? { opacity: 0.8 } : { scale: 0, opacity: 0 }}
                animate={prefersReduced ? {} : { scale: 1, opacity: 0.85 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* White core */}
              <motion.circle
                cx={c.x} cy={c.y} r="1.5"
                fill="white"
                initial={prefersReduced ? { opacity: 0.9 } : { scale: 0, opacity: 0 }}
                animate={prefersReduced ? {} : { scale: 1, opacity: 0.9 }}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              />
            </g>
          ))}

          {/* ── Data packets traveling along arcs ── */}
          {!prefersReduced &&
            [0, 7, 12, 18, 24, 30, 35, 38].map((ci, i) => {
              const [fi, ti] = ARCS[ci];
              const a = cityDots[fi];
              const b = cityDots[ti];
              const d = makeArc(a, b);
              return (
                <circle key={`pkt-${i}`} r="2.2" fill="#2875FF" filter="url(#glowSm)" opacity="0">
                  <animate attributeName="opacity" values="0;0.85;0.85;0" dur="2.5s" begin={`${2 + i * 1.3}s`} repeatCount="indefinite" />
                  <animateMotion dur="2.5s" begin={`${2 + i * 1.3}s`} repeatCount="indefinite" path={d} />
                </circle>
              );
            })}
        </svg>
      </div>
    </div>
  );
}
