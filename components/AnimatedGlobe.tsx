"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";

// City positions on sphere surface (angle-based, converted to x,y in render)
// [longitude (-180 to 180), latitude (-90 to 90), label]
const cities: [number, number, string][] = [
  [-0.12, 51.5, "London"],
  [2.35, 48.86, "Paris"],
  [13.4, 52.52, "Berlin"],
  [55.27, 25.2, "Dubai"],
  [72.88, 19.07, "Mumbai"],
  [100.5, 13.75, "Bangkok"],
  [139.69, 35.68, "Tokyo"],
  [-74.0, 40.71, "New York"],
  [-80.19, 25.76, "Miami"],
  [-43.17, -22.91, "São Paulo"],
  [-3.7, 40.42, "Madrid"],
  [37.62, 55.75, "Moscow"],
  [151.2, -33.87, "Sydney"],
  [121.47, 31.23, "Shanghai"],
  [28.98, 41.01, "Istanbul"],
  [76.95, 43.24, "Almaty"],
];

const connections = [
  [0, 7],
  [0, 1],
  [1, 2],
  [2, 4],
  [3, 4],
  [4, 5],
  [5, 6],
  [7, 8],
  [8, 9],
  [0, 14],
  [14, 3],
  [13, 6],
  [5, 12],
  [11, 15],
  [15, 3],
  [2, 11],
];

const CX = 200;
const CY = 200;
const R = 160;

// Project longitude/latitude onto a sphere viewed from the front
function project(
  lon: number,
  lat: number,
  rotation: number
): { x: number; y: number; z: number } {
  const lambda = ((lon + rotation) * Math.PI) / 180;
  const phi = (lat * Math.PI) / 180;
  const x = CX + R * Math.cos(phi) * Math.sin(lambda);
  const y = CY - R * Math.sin(phi);
  const z = Math.cos(phi) * Math.cos(lambda);
  return { x, y, z };
}

// Generate globe grid paths (latitude and longitude lines as elliptical arcs)
function generateLatitudeLine(lat: number): string {
  const phi = (lat * Math.PI) / 180;
  const r = R * Math.cos(phi);
  const cy = CY - R * Math.sin(phi);
  // Draw as an ellipse: horizontal radius = r, vertical radius = r * 0.3 (perspective)
  return `M${CX - r},${cy} A${r},${r * 0.3} 0 1,1 ${CX + r},${cy} A${r},${r * 0.3} 0 1,1 ${CX - r},${cy}`;
}

function generateLongitudeLine(lon: number): string {
  const points: string[] = [];
  for (let lat = -90; lat <= 90; lat += 5) {
    const { x, y, z } = project(lon, lat, 0);
    if (z > -0.1) {
      points.push(`${lat === -90 || (points.length === 0) ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
    } else if (points.length > 0) {
      break;
    }
  }
  return points.join(" ");
}

export default function AnimatedGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-400, 400], [5, -5]);
  const rotateY = useTransform(mouseX, [-400, 400], [-5, 5]);

  useEffect(() => {
    if (prefersReduced) return;
    const handleMouse = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(e.clientX - (rect.left + rect.width / 2));
      mouseY.set(e.clientY - (rect.top + rect.height / 2));
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY, prefersReduced]);

  // Pre-calculate city positions on globe
  const cityPositions = cities.map(([lon, lat]) => project(lon, lat, -20));

  // Generate arc paths between cities
  function arcPath(
    from: { x: number; y: number },
    to: { x: number; y: number }
  ) {
    const mx = (from.x + to.x) / 2;
    const my = (from.y + to.y) / 2;
    const dist = Math.hypot(to.x - from.x, to.y - from.y);
    const lift = dist * 0.35;
    const angle = Math.atan2(to.y - from.y, to.x - from.x) - Math.PI / 2;
    const cx = mx + Math.cos(angle) * lift;
    const cy = my + Math.sin(angle) * lift;
    return `M${from.x},${from.y} Q${cx},${cy} ${to.x},${to.y}`;
  }

  // Latitude lines
  const latLines = [-60, -30, 0, 30, 60].map((lat) =>
    generateLatitudeLine(lat)
  );
  // Longitude lines (front-facing only)
  const lonLines = [-60, -30, 0, 30, 60, 90].map((lon) =>
    generateLongitudeLine(lon)
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
    >
      {/* Multi-layer glow behind globe */}
      <div
        className="absolute rounded-full"
        style={{
          width: "110%",
          height: "110%",
          background:
            "radial-gradient(circle, rgba(40,117,255,0.18) 0%, rgba(0,89,249,0.08) 35%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "80%",
          height: "80%",
          background:
            "radial-gradient(circle, rgba(40,117,255,0.12) 0%, transparent 60%)",
          filter: "blur(30px)",
        }}
      />

      <motion.div
        style={
          prefersReduced
            ? {}
            : { rotateX, rotateY, transformPerspective: 1000 }
        }
        className="relative w-full max-w-[420px] aspect-square"
      >
        <svg
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            {/* Globe fill gradient */}
            <radialGradient id="globeFill" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="rgba(40,117,255,0.06)" />
              <stop offset="100%" stopColor="rgba(0,89,249,0.02)" />
            </radialGradient>
            {/* Globe rim gradient */}
            <radialGradient id="globeRim" cx="50%" cy="50%" r="50%">
              <stop offset="85%" stopColor="transparent" />
              <stop offset="100%" stopColor="rgba(40,117,255,0.15)" />
            </radialGradient>
            {/* Arc gradient */}
            <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2875FF" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#2875FF" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0059F9" stopOpacity="0.2" />
            </linearGradient>
            {/* Dot glow filter */}
            <filter id="dotGlow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Orbit glow */}
            <filter id="orbitGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" />
            </filter>
          </defs>

          {/* Outer orbit rings */}
          {[195, 215, 240].map((r, i) => (
            <motion.ellipse
              key={`orbit-${i}`}
              cx={CX}
              cy={CY}
              rx={r}
              ry={r * 0.38}
              stroke="rgba(40,117,255,0.08)"
              strokeWidth="0.8"
              fill="none"
              strokeDasharray="4 6"
              initial={prefersReduced ? { opacity: 0.5 } : { opacity: 0 }}
              animate={{ opacity: prefersReduced ? 0.5 : [0, 0.5, 0.3] }}
              transition={{
                duration: 3,
                delay: 0.8 + i * 0.3,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Globe sphere outline */}
          <motion.circle
            cx={CX}
            cy={CY}
            r={R}
            fill="url(#globeFill)"
            stroke="rgba(40,117,255,0.2)"
            strokeWidth="1.5"
            initial={prefersReduced ? {} : { scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Rim light */}
          <circle cx={CX} cy={CY} r={R} fill="url(#globeRim)" />

          {/* Latitude lines */}
          {latLines.map((d, i) => (
            <motion.path
              key={`lat-${i}`}
              d={d}
              stroke="rgba(40,117,255,0.08)"
              strokeWidth="0.6"
              fill="none"
              initial={prefersReduced ? { opacity: 0.4 } : { opacity: 0 }}
              animate={{ opacity: prefersReduced ? 0.4 : 0.4 }}
              transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
            />
          ))}

          {/* Longitude lines */}
          {lonLines.map((d, i) => (
            <motion.path
              key={`lon-${i}`}
              d={d}
              stroke="rgba(40,117,255,0.08)"
              strokeWidth="0.6"
              fill="none"
              initial={prefersReduced ? { opacity: 0.4 } : { opacity: 0 }}
              animate={{ opacity: prefersReduced ? 0.4 : 0.4 }}
              transition={{ duration: 1, delay: 0.4 + i * 0.1 }}
            />
          ))}

          {/* Connection arcs */}
          {connections.map(([fi, ti], i) => {
            const from = cityPositions[fi];
            const to = cityPositions[ti];
            // Only draw if both points are on the visible side
            if (from.z < 0 && to.z < 0) return null;
            return (
              <motion.path
                key={`arc-${i}`}
                d={arcPath(from, to)}
                stroke="url(#arcGrad)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                initial={
                  prefersReduced
                    ? { pathLength: 1, opacity: 0.4 }
                    : { pathLength: 0, opacity: 0 }
                }
                animate={
                  prefersReduced ? {} : { pathLength: 1, opacity: 0.6 }
                }
                transition={{
                  pathLength: {
                    duration: 1.8,
                    delay: 0.6 + i * 0.12,
                    ease: "easeInOut",
                  },
                  opacity: {
                    duration: 0.6,
                    delay: 0.6 + i * 0.12,
                  },
                }}
              />
            );
          })}

          {/* City dots */}
          {cityPositions.map((pos, i) => {
            // Only render dots on the visible hemisphere
            if (pos.z < -0.05) return null;
            const opacity = 0.3 + pos.z * 0.7; // fade dots near edges
            return (
              <g key={`city-${i}`}>
                {/* Outer pulse ring */}
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r="8"
                  fill="none"
                  stroke="#2875FF"
                  strokeWidth="0.8"
                  initial={
                    prefersReduced
                      ? { opacity: 0.2 }
                      : { scale: 0.5, opacity: 0 }
                  }
                  animate={
                    prefersReduced
                      ? {}
                      : {
                          scale: [0.6, 2, 0.6],
                          opacity: [0, 0.3 * opacity, 0],
                        }
                  }
                  transition={{
                    duration: 3.5,
                    delay: i * 0.25,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {/* Glow dot */}
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r="4"
                  fill="#2875FF"
                  filter="url(#dotGlow)"
                  initial={
                    prefersReduced
                      ? { opacity: opacity * 0.8 }
                      : { scale: 0, opacity: 0 }
                  }
                  animate={
                    prefersReduced
                      ? {}
                      : { scale: 1, opacity: opacity * 0.9 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
                {/* Inner bright core */}
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r="1.5"
                  fill="white"
                  initial={
                    prefersReduced
                      ? { opacity: opacity * 0.9 }
                      : { scale: 0, opacity: 0 }
                  }
                  animate={
                    prefersReduced
                      ? {}
                      : { scale: 1, opacity: opacity * 0.95 }
                  }
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </g>
            );
          })}

          {/* Small "data packet" dots traveling along some arcs */}
          {[0, 3, 7, 10, 14].map((connIdx, i) => {
            const [fi, ti] = connections[connIdx];
            const from = cityPositions[fi];
            const to = cityPositions[ti];
            if (from.z < 0 && to.z < 0) return null;
            const pathD = arcPath(from, to);
            return (
              <motion.circle
                key={`packet-${i}`}
                r="2"
                fill="#2875FF"
                filter="url(#dotGlow)"
                initial={prefersReduced ? { opacity: 0 } : { opacity: 0 }}
                animate={
                  prefersReduced
                    ? {}
                    : { opacity: [0, 0.9, 0.9, 0] }
                }
                transition={{
                  duration: 2.5,
                  delay: 2 + i * 1.2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "linear",
                }}
              >
                <animateMotion
                  dur="2.5s"
                  begin={`${2 + i * 1.2}s`}
                  repeatCount="indefinite"
                  path={pathD}
                />
              </motion.circle>
            );
          })}
        </svg>
      </motion.div>
    </div>
  );
}
