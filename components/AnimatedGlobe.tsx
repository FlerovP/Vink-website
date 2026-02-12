"use client";

import { useEffect, useRef, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/* ─── Simplified continent dots [lon, lat] ─── */
/* Each dot represents a land cell on a ~5° grid covering the major continents */
const LAND_DOTS: [number, number][] = [
  // North America
  [-130,55],[-125,55],[-120,55],[-115,55],[-110,55],[-105,55],[-100,55],[-95,55],[-90,55],[-85,55],[-80,55],[-75,55],[-70,55],[-65,55],
  [-135,50],[-130,50],[-125,50],[-120,50],[-115,50],[-110,50],[-105,50],[-100,50],[-95,50],[-90,50],[-85,50],[-80,50],[-75,50],[-70,50],[-65,50],[-60,50],
  [-130,45],[-125,45],[-120,45],[-115,45],[-110,45],[-105,45],[-100,45],[-95,45],[-90,45],[-85,45],[-80,45],[-75,45],[-70,45],[-65,45],
  [-125,40],[-120,40],[-115,40],[-110,40],[-105,40],[-100,40],[-95,40],[-90,40],[-85,40],[-80,40],[-75,40],
  [-120,35],[-115,35],[-110,35],[-105,35],[-100,35],[-95,35],[-90,35],[-85,35],[-80,35],
  [-115,30],[-110,30],[-105,30],[-100,30],[-95,30],[-90,30],[-85,30],[-80,30],
  [-110,25],[-105,25],[-100,25],[-95,25],[-90,25],[-85,25],
  [-105,20],[-100,20],[-95,20],[-90,20],
  [-100,15],[-95,15],[-90,15],[-85,15],
  // Central America
  [-90,15],[-85,15],[-85,10],[-80,10],[-75,10],
  // South America
  [-80,5],[-75,5],[-70,5],[-65,5],[-60,5],[-55,5],
  [-80,0],[-75,0],[-70,0],[-65,0],[-60,0],[-55,0],[-50,0],
  [-75,-5],[-70,-5],[-65,-5],[-60,-5],[-55,-5],[-50,-5],[-45,-5],[-40,-5],[-35,-5],
  [-70,-10],[-65,-10],[-60,-10],[-55,-10],[-50,-10],[-45,-10],[-40,-10],[-35,-10],
  [-70,-15],[-65,-15],[-60,-15],[-55,-15],[-50,-15],[-45,-15],[-40,-15],
  [-65,-20],[-60,-20],[-55,-20],[-50,-20],[-45,-20],
  [-60,-25],[-55,-25],[-50,-25],[-45,-25],
  [-55,-30],[-50,-30],[-45,-30],
  [-55,-35],[-50,-35],
  [-50,-40],
  // Europe
  [-10,60],[-5,60],[0,60],[5,60],[10,60],[15,60],[20,60],[25,60],[30,60],[35,60],[40,60],
  [-10,55],[-5,55],[0,55],[5,55],[10,55],[15,55],[20,55],[25,55],[30,55],[35,55],[40,55],[45,55],[50,55],
  [-10,50],[-5,50],[0,50],[5,50],[10,50],[15,50],[20,50],[25,50],[30,50],[35,50],[40,50],[45,50],[50,50],
  [-10,45],[-5,45],[0,45],[5,45],[10,45],[15,45],[20,45],[25,45],[30,45],[35,45],[40,45],
  [-10,40],[-5,40],[0,40],[5,40],[10,40],[15,40],[20,40],[25,40],[30,40],
  [-10,35],[-5,35],[0,35],[5,35],[10,35],[15,35],[20,35],[25,35],[30,35],[35,35],
  // Africa
  [-15,30],[-10,30],[-5,30],[0,30],[5,30],[10,30],[15,30],[20,30],[25,30],[30,30],[35,30],
  [-15,25],[-10,25],[-5,25],[0,25],[5,25],[10,25],[15,25],[20,25],[25,25],[30,25],[35,25],[40,25],
  [-15,20],[-10,20],[-5,20],[0,20],[5,20],[10,20],[15,20],[20,20],[25,20],[30,20],[35,20],[40,20],[45,20],
  [-15,15],[-10,15],[-5,15],[0,15],[5,15],[10,15],[15,15],[20,15],[25,15],[30,15],[35,15],[40,15],[45,15],[50,15],
  [-15,10],[-10,10],[-5,10],[0,10],[5,10],[10,10],[15,10],[20,10],[25,10],[30,10],[35,10],[40,10],[45,10],
  [5,5],[10,5],[15,5],[20,5],[25,5],[30,5],[35,5],[40,5],
  [10,0],[15,0],[20,0],[25,0],[30,0],[35,0],[40,0],
  [15,-5],[20,-5],[25,-5],[30,-5],[35,-5],[40,-5],
  [20,-10],[25,-10],[30,-10],[35,-10],[40,-10],
  [20,-15],[25,-15],[30,-15],[35,-15],
  [25,-20],[30,-20],[35,-20],
  [25,-25],[30,-25],[35,-25],
  [27,-30],[30,-30],
  // Middle East
  [35,35],[40,35],[45,35],[50,35],[55,35],
  [35,30],[40,30],[45,30],[50,30],[55,30],[60,30],
  [40,25],[45,25],[50,25],[55,25],[60,25],[65,25],
  [45,20],[50,20],[55,20],
  // Russia / Central & North Asia
  [55,60],[60,60],[65,60],[70,60],[75,60],[80,60],[85,60],[90,60],[95,60],[100,60],[105,60],[110,60],[115,60],[120,60],[125,60],[130,60],[135,60],[140,60],[145,60],[150,60],[155,60],[160,60],[165,60],[170,60],
  [55,55],[60,55],[65,55],[70,55],[75,55],[80,55],[85,55],[90,55],[95,55],[100,55],[105,55],[110,55],[115,55],[120,55],[125,55],[130,55],[135,55],[140,55],[145,55],[150,55],[155,55],[160,55],
  [55,50],[60,50],[65,50],[70,50],[75,50],[80,50],[85,50],[90,50],[95,50],[100,50],[105,50],[110,50],[115,50],[120,50],[125,50],[130,50],[135,50],[140,50],
  [60,45],[65,45],[70,45],[75,45],[80,45],[85,45],[90,45],[95,45],[100,45],[105,45],[110,45],[115,45],[120,45],[125,45],[130,45],[135,45],
  // South / Southeast Asia
  [65,30],[70,30],[75,30],[80,30],[85,30],[90,30],[95,30],
  [70,25],[75,25],[80,25],[85,25],[90,25],[95,25],[100,25],
  [70,20],[75,20],[80,20],[85,20],[90,20],[95,20],[100,20],[105,20],
  [75,15],[80,15],[85,15],[90,15],[95,15],[100,15],[105,15],[110,15],
  [80,10],[95,10],[100,10],[105,10],[110,10],
  [95,5],[100,5],[105,5],[110,5],[115,5],
  [100,0],[105,0],[110,0],[115,0],
  [105,-5],[110,-5],[115,-5],[120,-5],
  [110,-10],[115,-10],[120,-10],
  // East Asia (China, Korea, Japan)
  [100,40],[105,40],[110,40],[115,40],[120,40],[125,40],[130,40],
  [100,35],[105,35],[110,35],[115,35],[120,35],[125,35],[130,35],
  [105,30],[110,30],[115,30],[120,30],
  [110,25],[115,25],[120,25],
  // Japan
  [130,35],[135,35],[140,35],
  [130,40],[135,40],[140,40],[145,40],
  [140,45],[145,45],
  // Australia
  [115,-15],[120,-15],[125,-15],[130,-15],[135,-15],[140,-15],[145,-15],[150,-15],
  [115,-20],[120,-20],[125,-20],[130,-20],[135,-20],[140,-20],[145,-20],[150,-20],[155,-20],
  [115,-25],[120,-25],[125,-25],[130,-25],[135,-25],[140,-25],[145,-25],[150,-25],[155,-25],
  [120,-30],[125,-30],[130,-30],[135,-30],[140,-30],[145,-30],[150,-30],[155,-30],
  [130,-35],[135,-35],[140,-35],[145,-35],[150,-35],
  [145,-40],[150,-40],
  // Greenland
  [-55,65],[-50,65],[-45,65],[-40,65],[-35,65],
  [-55,70],[-50,70],[-45,70],[-40,70],[-35,70],[-30,70],
  [-50,75],[-45,75],[-40,75],[-35,75],
  // Iceland
  [-25,65],[-20,65],
  // UK / Ireland
  [-10,55],[-5,55],[0,55],
  [-10,50],[-5,50],
];

/* ─── City markers ─── */
const CITIES: { lon: number; lat: number; label: string }[] = [
  { lon: -0.12, lat: 51.5, label: "London" },
  { lon: 2.35, lat: 48.86, label: "Paris" },
  { lon: 55.27, lat: 25.2, label: "Dubai" },
  { lon: 72.88, lat: 19.07, label: "Mumbai" },
  { lon: 139.69, lat: 35.68, label: "Tokyo" },
  { lon: -74.0, lat: 40.71, label: "New York" },
  { lon: -43.17, lat: -22.91, label: "São Paulo" },
  { lon: 37.62, lat: 55.75, label: "Moscow" },
  { lon: 121.47, lat: 31.23, label: "Shanghai" },
  { lon: 28.98, lat: 41.01, label: "Istanbul" },
  { lon: 151.2, lat: -33.87, label: "Sydney" },
  { lon: 100.5, lat: 13.75, label: "Bangkok" },
];

const CONNECTIONS = [
  [0, 5], [0, 1], [1, 9], [9, 2], [2, 3],
  [3, 11], [11, 4], [4, 8], [5, 6],
  [7, 9], [8, 10], [7, 0],
];

/* ─── Sphere math ─── */
const CX = 200;
const CY = 200;
const RAD = 170;
const ROTATION = -15; // degrees — rotates the globe to show Atlantic

function project(lon: number, lat: number) {
  const lam = ((lon + ROTATION) * Math.PI) / 180;
  const phi = (lat * Math.PI) / 180;
  return {
    x: CX + RAD * Math.cos(phi) * Math.sin(lam),
    y: CY - RAD * Math.sin(phi),
    z: Math.cos(phi) * Math.cos(lam), // >0 = visible
  };
}

function arcPath(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const d = Math.hypot(b.x - a.x, b.y - a.y);
  const ang = Math.atan2(b.y - a.y, b.x - a.x) - Math.PI / 2;
  return `M${a.x},${a.y} Q${mx + Math.cos(ang) * d * 0.3},${my + Math.sin(ang) * d * 0.3} ${b.x},${b.y}`;
}

export default function AnimatedGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotX = useTransform(mouseY, [-400, 400], [4, -4]);
  const rotY = useTransform(mouseX, [-400, 400], [-4, 4]);

  useEffect(() => {
    if (prefersReduced) return;
    const onMove = (e: MouseEvent) => {
      const r = containerRef.current?.getBoundingClientRect();
      if (!r) return;
      mouseX.set(e.clientX - (r.left + r.width / 2));
      mouseY.set(e.clientY - (r.top + r.height / 2));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY, prefersReduced]);

  /* Project all land dots */
  const landProjected = useMemo(
    () => LAND_DOTS.map(([lon, lat]) => project(lon, lat)),
    []
  );

  /* Project city markers */
  const cityProjected = useMemo(
    () => CITIES.map((c) => ({ ...project(c.lon, c.lat), label: c.label })),
    []
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
    >
      {/* Atmosphere glow */}
      <div
        className="absolute rounded-full"
        style={{
          width: "105%",
          height: "105%",
          background:
            "radial-gradient(circle, rgba(40,117,255,0.14) 0%, rgba(0,89,249,0.06) 40%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      <motion.div
        style={
          prefersReduced ? {} : { rotateX: rotX, rotateY: rotY, transformPerspective: 1000 }
        }
        className="relative w-full max-w-[440px] aspect-square"
      >
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            {/* Planet shading — lit from top-left */}
            <radialGradient id="planetShade" cx="38%" cy="32%" r="65%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
              <stop offset="50%" stopColor="rgba(40,117,255,0.03)" />
              <stop offset="100%" stopColor="rgba(0,20,60,0.12)" />
            </radialGradient>
            {/* Atmosphere rim */}
            <radialGradient id="atmosphere" cx="50%" cy="50%" r="50%">
              <stop offset="80%" stopColor="transparent" />
              <stop offset="92%" stopColor="rgba(40,117,255,0.10)" />
              <stop offset="100%" stopColor="rgba(40,117,255,0.04)" />
            </radialGradient>
            {/* Ocean base */}
            <radialGradient id="ocean" cx="42%" cy="36%" r="60%">
              <stop offset="0%" stopColor="#f0f5ff" />
              <stop offset="100%" stopColor="#e8eef8" />
            </radialGradient>
            <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2875FF" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#2875FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0059F9" stopOpacity="0.15" />
            </linearGradient>
            <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Globe sphere */}
          <motion.circle
            cx={CX} cy={CY} r={RAD}
            fill="url(#ocean)"
            stroke="rgba(40,117,255,0.12)"
            strokeWidth="1"
            initial={prefersReduced ? {} : { scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Shading overlay */}
          <circle cx={CX} cy={CY} r={RAD} fill="url(#planetShade)" />

          {/* ── Land mass dots ── */}
          {landProjected.map((p, i) => {
            if (p.z < 0.05) return null;
            // Dots farther from center (edge of sphere) are fainter
            const brightness = 0.25 + p.z * 0.75;
            return (
              <motion.circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={1.6}
                fill={`rgba(40,117,255,${(brightness * 0.55).toFixed(2)})`}
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: prefersReduced ? 0 : 0.25,
                  delay: prefersReduced ? 0 : 0.3 + (i % 40) * 0.015,
                }}
              />
            );
          })}

          {/* Atmosphere rim highlight */}
          <circle cx={CX} cy={CY} r={RAD + 2} fill="none" stroke="rgba(40,117,255,0.08)" strokeWidth="4" />
          <circle cx={CX} cy={CY} r={RAD} fill="url(#atmosphere)" />

          {/* ── Connection arcs ── */}
          {CONNECTIONS.map(([fi, ti], i) => {
            const a = cityProjected[fi];
            const b = cityProjected[ti];
            if (a.z < 0 && b.z < 0) return null;
            return (
              <motion.path
                key={`arc-${i}`}
                d={arcPath(a, b)}
                stroke="url(#arcGrad)"
                strokeWidth="1.2"
                fill="none"
                strokeLinecap="round"
                initial={prefersReduced ? { pathLength: 1, opacity: 0.4 } : { pathLength: 0, opacity: 0 }}
                animate={prefersReduced ? {} : { pathLength: 1, opacity: 0.5 }}
                transition={{
                  pathLength: { duration: 1.6, delay: 1 + i * 0.12, ease: "easeInOut" },
                  opacity: { duration: 0.5, delay: 1 + i * 0.12 },
                }}
              />
            );
          })}

          {/* ── City dots ── */}
          {cityProjected.map((c, i) => {
            if (c.z < 0) return null;
            const op = 0.4 + c.z * 0.6;
            return (
              <g key={`city-${i}`}>
                {/* Pulse */}
                <motion.circle
                  cx={c.x} cy={c.y} r="7"
                  fill="none" stroke="#2875FF" strokeWidth="0.7"
                  initial={prefersReduced ? { opacity: 0.15 } : { scale: 0.5, opacity: 0 }}
                  animate={prefersReduced ? {} : { scale: [0.6, 2, 0.6], opacity: [0, 0.25 * op, 0] }}
                  transition={{ duration: 3.5, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Dot */}
                <motion.circle
                  cx={c.x} cy={c.y} r="3"
                  fill="#2875FF" filter="url(#glow)"
                  initial={prefersReduced ? { opacity: op } : { scale: 0, opacity: 0 }}
                  animate={prefersReduced ? {} : { scale: 1, opacity: op }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                />
                {/* Core */}
                <motion.circle
                  cx={c.x} cy={c.y} r="1.2"
                  fill="white"
                  initial={prefersReduced ? { opacity: op * 0.9 } : { scale: 0, opacity: 0 }}
                  animate={prefersReduced ? {} : { scale: 1, opacity: op * 0.9 }}
                  transition={{ duration: 0.4, delay: 0.9 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                />
              </g>
            );
          })}

          {/* ── Traveling data packets ── */}
          {!prefersReduced &&
            [0, 2, 4, 8].map((ci, i) => {
              const [fi, ti] = CONNECTIONS[ci];
              const a = cityProjected[fi];
              const b = cityProjected[ti];
              if (a.z < 0 && b.z < 0) return null;
              return (
                <circle key={`pkt-${i}`} r="1.8" fill="#2875FF" filter="url(#glow)" opacity="0">
                  <animate attributeName="opacity" values="0;0.9;0.9;0" dur="2.5s" begin={`${2.5 + i * 1.5}s`} repeatCount="indefinite" />
                  <animateMotion dur="2.5s" begin={`${2.5 + i * 1.5}s`} repeatCount="indefinite" path={arcPath(a, b)} />
                </circle>
              );
            })}
        </svg>
      </motion.div>
    </div>
  );
}
