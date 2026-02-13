"use client";

import { useEffect, useRef, useCallback } from "react";

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

/* ─── Cities ─── */
const CITIES = [
  { lon: -74, lat: 40.7 },   // New York
  { lon: -43, lat: -23 },    // São Paulo
  { lon: -0.1, lat: 51.5 },  // London
  { lon: 13, lat: 52.5 },    // Berlin
  { lon: 37.6, lat: 55.8 },  // Moscow
  { lon: 55.3, lat: 25.2 },  // Dubai
  { lon: 100.5, lat: 13.8 }, // Bangkok
  { lon: 121.5, lat: 31.2 }, // Shanghai
  { lon: 139.7, lat: 35.7 }, // Tokyo
  { lon: 151, lat: -33.9 },  // Sydney
  { lon: -118, lat: 34 },    // Los Angeles
  { lon: -99, lat: 19.4 },   // Mexico City
  { lon: 28, lat: -26 },     // Johannesburg
  { lon: 103.8, lat: 1.35 }, // Singapore
];

const ARCS: [number, number][] = [
  [0,2],[0,10],[10,8],[2,3],[3,4],[4,5],[5,6],[6,13],[7,8],[8,9],[11,0],[1,12],[2,12],[5,7],[0,1],[10,9],[3,5],[6,7],[13,9],[12,9],
];

const DEG = Math.PI / 180;

/* ── Convert lat/lon to 3D point on unit sphere ── */
function latLonTo3D(lon: number, lat: number) {
  const phi = lat * DEG;
  const theta = lon * DEG;
  return {
    x: Math.cos(phi) * Math.sin(theta),
    y: -Math.sin(phi),
    z: Math.cos(phi) * Math.cos(theta),
  };
}

/* ── Rotate around Y axis ── */
function rotateY(p: { x: number; y: number; z: number }, angle: number) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: p.x * cos + p.z * sin,
    y: p.y,
    z: -p.x * sin + p.z * cos,
  };
}

/* ── Slight tilt around X axis ── */
function rotateX(p: { x: number; y: number; z: number }, angle: number) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: p.x,
    y: p.y * cos - p.z * sin,
    z: p.y * sin + p.z * cos,
  };
}

/* ── Project 3D → 2D ── */
function project(
  p: { x: number; y: number; z: number },
  cx: number,
  cy: number,
  radius: number,
) {
  return {
    x: cx + p.x * radius,
    y: cy + p.y * radius,
    z: p.z,
  };
}

/* ── Precompute 3D coords ── */
const LAND_3D = LAND.map(([lo, la]) => latLonTo3D(lo, la));
const CITY_3D = CITIES.map((c) => latLonTo3D(c.lon, c.lat));

/* ── Grid ring latitudes for wireframe effect ── */
const GRID_LATS = [-60, -30, 0, 30, 60];
const GRID_LONS = [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150, 180];

export default function AnimatedGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const angleRef = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.42;
    const rot = angleRef.current;
    const tilt = -0.18; // slight tilt

    /* ── Atmosphere glow ── */
    const atmosGrad = ctx.createRadialGradient(cx, cy, radius * 0.85, cx, cy, radius * 1.25);
    atmosGrad.addColorStop(0, "rgba(40,117,255,0)");
    atmosGrad.addColorStop(0.5, "rgba(40,117,255,0.06)");
    atmosGrad.addColorStop(1, "rgba(40,117,255,0)");
    ctx.fillStyle = atmosGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.25, 0, Math.PI * 2);
    ctx.fill();

    /* ── Globe base circle ── */
    const baseGrad = ctx.createRadialGradient(cx - radius * 0.2, cy - radius * 0.2, 0, cx, cy, radius);
    baseGrad.addColorStop(0, "rgba(40,117,255,0.04)");
    baseGrad.addColorStop(0.7, "rgba(40,117,255,0.02)");
    baseGrad.addColorStop(1, "rgba(40,117,255,0.06)");
    ctx.fillStyle = baseGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();

    /* ── Globe outline ── */
    ctx.strokeStyle = "rgba(40,117,255,0.12)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();

    /* ── Grid lines (subtle) ── */
    ctx.strokeStyle = "rgba(40,117,255,0.05)";
    ctx.lineWidth = 0.5;

    // Latitude rings
    for (const lat of GRID_LATS) {
      ctx.beginPath();
      let started = false;
      for (let lon = -180; lon <= 180; lon += 3) {
        const p3 = latLonTo3D(lon, lat);
        const pr = rotateX(rotateY(p3, rot), tilt);
        const pp = project(pr, cx, cy, radius);
        if (pr.z > -0.1) {
          const alpha = Math.max(0, pr.z) * 0.8;
          if (!started) {
            ctx.moveTo(pp.x, pp.y);
            started = true;
          } else {
            ctx.globalAlpha = alpha;
            ctx.lineTo(pp.x, pp.y);
          }
        } else {
          started = false;
        }
      }
      ctx.globalAlpha = 1;
      ctx.stroke();
    }

    // Longitude meridians
    for (const lon of GRID_LONS) {
      ctx.beginPath();
      let started = false;
      for (let lat = -90; lat <= 90; lat += 3) {
        const p3 = latLonTo3D(lon, lat);
        const pr = rotateX(rotateY(p3, rot), tilt);
        const pp = project(pr, cx, cy, radius);
        if (pr.z > -0.1) {
          const alpha = Math.max(0, pr.z) * 0.8;
          if (!started) {
            ctx.moveTo(pp.x, pp.y);
            started = true;
          } else {
            ctx.globalAlpha = alpha;
            ctx.lineTo(pp.x, pp.y);
          }
        } else {
          started = false;
        }
      }
      ctx.globalAlpha = 1;
      ctx.stroke();
    }

    /* ── Land dots ── */
    for (const p3 of LAND_3D) {
      const pr = rotateX(rotateY(p3, rot), tilt);
      if (pr.z < 0) continue; // back side hidden
      const pp = project(pr, cx, cy, radius);
      const alpha = pr.z * 0.6 + 0.15;
      const dotR = 1.2 + pr.z * 0.8;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = "#2875FF";
      ctx.beginPath();
      ctx.arc(pp.x, pp.y, dotR, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    /* ── Connection arcs ── */
    for (const [ai, bi] of ARCS) {
      const a3 = CITY_3D[ai];
      const b3 = CITY_3D[bi];
      const ar = rotateX(rotateY(a3, rot), tilt);
      const br = rotateX(rotateY(b3, rot), tilt);
      // Only draw if at least one endpoint visible
      if (ar.z < 0.1 && br.z < 0.1) continue;
      const ap = project(ar, cx, cy, radius);
      const bp = project(br, cx, cy, radius);
      // Midpoint lifted outward for arc effect
      const mid3 = {
        x: (a3.x + b3.x) / 2,
        y: (a3.y + b3.y) / 2,
        z: (a3.z + b3.z) / 2,
      };
      const midLen = Math.sqrt(mid3.x ** 2 + mid3.y ** 2 + mid3.z ** 2);
      const lift = 1.15 + Math.hypot(ap.x - bp.x, ap.y - bp.y) / radius * 0.15;
      const midLifted = {
        x: (mid3.x / midLen) * lift,
        y: (mid3.y / midLen) * lift,
        z: (mid3.z / midLen) * lift,
      };
      const mr = rotateX(rotateY(midLifted, rot), tilt);
      const mp = project(mr, cx, cy, radius);

      const arcAlpha = Math.min(ar.z, br.z) * 0.5 + 0.1;
      ctx.globalAlpha = Math.max(0, arcAlpha);
      ctx.strokeStyle = "#2875FF";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(ap.x, ap.y);
      ctx.quadraticCurveTo(mp.x, mp.y, bp.x, bp.y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    /* ── City markers ── */
    for (const c3 of CITY_3D) {
      const cr = rotateX(rotateY(c3, rot), tilt);
      if (cr.z < 0.05) continue;
      const cp = project(cr, cx, cy, radius);
      const alpha = cr.z;

      // Outer glow
      ctx.globalAlpha = alpha * 0.3;
      const glow = ctx.createRadialGradient(cp.x, cp.y, 0, cp.x, cp.y, 8);
      glow.addColorStop(0, "rgba(40,117,255,0.6)");
      glow.addColorStop(1, "rgba(40,117,255,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cp.x, cp.y, 8, 0, Math.PI * 2);
      ctx.fill();

      // Blue dot
      ctx.globalAlpha = alpha * 0.9;
      ctx.fillStyle = "#2875FF";
      ctx.beginPath();
      ctx.arc(cp.x, cp.y, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // White core
      ctx.globalAlpha = alpha * 0.95;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(cp.x, cp.y, 1, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    /* ── Animated pulse rings on cities ── */
    const time = Date.now() * 0.001;
    for (let i = 0; i < CITY_3D.length; i++) {
      const c3 = CITY_3D[i];
      const cr = rotateX(rotateY(c3, rot), tilt);
      if (cr.z < 0.1) continue;
      const cp = project(cr, cx, cy, radius);
      const pulse = ((time + i * 1.7) % 3) / 3; // 0..1 over 3 seconds
      const pulseR = 3 + pulse * 14;
      const pulseAlpha = (1 - pulse) * 0.25 * cr.z;
      ctx.globalAlpha = pulseAlpha;
      ctx.strokeStyle = "#2875FF";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cp.x, cp.y, pulseR, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Advance rotation
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced) {
      angleRef.current += 0.003;
    }

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Soft glow behind globe */}
      <div
        className="absolute w-[80%] h-[80%] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(40,117,255,0.08), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <canvas
        ref={canvasRef}
        className="relative w-full h-full"
        style={{ aspectRatio: "1 / 1" }}
      />
    </div>
  );
}
