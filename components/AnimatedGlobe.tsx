"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";

// Major city coordinates mapped to SVG viewBox (simplified Mercator-ish)
const connectionPoints = [
  { x: 180, y: 120, label: "London" },
  { x: 200, y: 115, label: "Paris" },
  { x: 215, y: 110, label: "Berlin" },
  { x: 280, y: 130, label: "Dubai" },
  { x: 320, y: 155, label: "Mumbai" },
  { x: 360, y: 150, label: "Bangkok" },
  { x: 380, y: 135, label: "Tokyo" },
  { x: 100, y: 130, label: "New York" },
  { x: 75, y: 140, label: "Miami" },
  { x: 55, y: 175, label: "São Paulo" },
  { x: 160, y: 130, label: "Madrid" },
  { x: 250, y: 105, label: "Moscow" },
  { x: 390, y: 165, label: "Sydney" },
  { x: 350, y: 120, label: "Shanghai" },
  { x: 260, y: 125, label: "Istanbul" },
  { x: 275, y: 105, label: "Almaty" },
];

// Generate connection arcs between some city pairs
const connections = [
  [0, 7], [0, 1], [1, 2], [2, 4], [3, 4], [4, 5],
  [5, 6], [7, 8], [8, 9], [0, 14], [14, 3], [13, 6],
  [5, 12], [11, 15], [15, 3], [2, 11],
];

function generateArcPath(from: { x: number; y: number }, to: { x: number; y: number }) {
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  const dist = Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2);
  const curvature = dist * 0.3;
  const angle = Math.atan2(to.y - from.y, to.x - from.x) - Math.PI / 2;
  const cpX = midX + Math.cos(angle) * curvature;
  const cpY = midY + Math.sin(angle) * curvature;
  return `M${from.x},${from.y} Q${cpX},${cpY} ${to.x},${to.y}`;
}

export default function AnimatedGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [3, -3]);
  const rotateY = useTransform(mouseX, [-300, 300], [-3, 3]);

  useEffect(() => {
    if (prefersReduced) return;
    const handleMouse = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY, prefersReduced]);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
      {/* Glow behind globe */}
      <div
        className="absolute w-[80%] h-[80%] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(91,154,255,0.25) 0%, rgba(40,117,255,0.1) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <motion.div
        style={
          prefersReduced
            ? {}
            : { rotateX, rotateY, transformPerspective: 800 }
        }
        className="relative w-full max-w-[450px] aspect-square"
      >
        <svg
          viewBox="0 0 440 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Grid lines (latitude/longitude hints) */}
          {[80, 120, 160, 200, 240].map((y) => (
            <line
              key={`lat-${y}`}
              x1="20"
              y1={y}
              x2="420"
              y2={y}
              stroke="rgba(40,117,255,0.07)"
              strokeWidth="0.5"
            />
          ))}
          {[80, 140, 200, 260, 320, 380].map((x) => (
            <line
              key={`lon-${x}`}
              x1={x}
              y1="40"
              x2={x}
              y2="270"
              stroke="rgba(40,117,255,0.07)"
              strokeWidth="0.5"
            />
          ))}

          {/* Connection arcs */}
          {connections.map(([fromIdx, toIdx], i) => {
            const from = connectionPoints[fromIdx];
            const to = connectionPoints[toIdx];
            const path = generateArcPath(from, to);
            return (
              <motion.path
                key={`arc-${i}`}
                d={path}
                stroke="url(#arcGradient)"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
                initial={prefersReduced ? { pathLength: 1, opacity: 0.3 } : { pathLength: 0, opacity: 0 }}
                animate={prefersReduced ? {} : { pathLength: 1, opacity: 0.4 }}
                transition={{
                  pathLength: {
                    duration: 2,
                    delay: 0.5 + i * 0.15,
                    ease: "easeInOut",
                  },
                  opacity: {
                    duration: 0.5,
                    delay: 0.5 + i * 0.15,
                  },
                }}
              />
            );
          })}

          {/* City dots */}
          {connectionPoints.map((point, i) => (
            <g key={`point-${i}`}>
              {/* Pulse ring */}
              <motion.circle
                cx={point.x}
                cy={point.y}
                r="6"
                fill="none"
                stroke="rgba(91,154,255,0.3)"
                strokeWidth="1"
                initial={prefersReduced ? { scale: 1, opacity: 0.3 } : { scale: 0.5, opacity: 0 }}
                animate={
                  prefersReduced
                    ? {}
                    : {
                        scale: [0.5, 1.8, 0.5],
                        opacity: [0, 0.4, 0],
                      }
                }
                transition={{
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Dot */}
              <motion.circle
                cx={point.x}
                cy={point.y}
                r="2.5"
                fill="#2875FF"
                initial={prefersReduced ? { opacity: 0.8 } : { scale: 0, opacity: 0 }}
                animate={prefersReduced ? {} : { scale: 1, opacity: 0.9 }}
                transition={{
                  duration: 0.4,
                  delay: 0.3 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </g>
          ))}

          {/* Gradient defs */}
          <defs>
            <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2875FF" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#5B9AFF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2875FF" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}
