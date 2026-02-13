"use client";

import { useEffect, useState } from "react";

export default function LoadingSplash() {
  const [phase, setPhase] = useState<"visible" | "fading" | "gone">("visible");

  useEffect(() => {
    // Wait minimum 800ms so the animation is visible, then fade out
    const minTimer = setTimeout(() => {
      setPhase("fading");
    }, 800);

    return () => clearTimeout(minTimer);
  }, []);

  useEffect(() => {
    if (phase !== "fading") return;
    // After fade-out transition completes (500ms), unmount
    const hideTimer = setTimeout(() => {
      setPhase("gone");
    }, 500);
    return () => clearTimeout(hideTimer);
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center splash-overlay ${
        phase === "fading" ? "splash-fade-out" : ""
      }`}
      aria-hidden="true"
      style={{
        background: `
          radial-gradient(circle 500px at 15% 10%, rgba(40,117,255,0.12), transparent 70%),
          radial-gradient(circle 400px at 85% 75%, rgba(0,89,249,0.10), transparent 70%),
          radial-gradient(circle 350px at 50% 50%, rgba(40,117,255,0.08), transparent 60%),
          radial-gradient(ellipse 80% 60% at 20% 10%, rgba(40,117,255,0.06), transparent 60%),
          radial-gradient(ellipse 60% 50% at 80% 80%, rgba(0,89,249,0.05), transparent 60%),
          #ffffff
        `,
      }}
    >

      {/* Signal / connectivity animation */}
      <div className="relative flex flex-col items-center">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-6"
        >
          {/* Arc 1 (outermost) */}
          <path
            d="M 20 80 A 40 40 0 0 1 100 80"
            stroke="url(#splashGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            className="splash-arc splash-arc-1"
          />
          {/* Arc 2 (middle) */}
          <path
            d="M 35 80 A 25 25 0 0 1 85 80"
            stroke="url(#splashGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            className="splash-arc splash-arc-2"
          />
          {/* Arc 3 (innermost) */}
          <path
            d="M 48 80 A 12 12 0 0 1 72 80"
            stroke="url(#splashGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            className="splash-arc splash-arc-3"
          />
          {/* Beacon dot */}
          <circle
            cx="60"
            cy="82"
            r="5"
            fill="url(#splashGrad)"
            className="splash-beacon"
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="splashGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2875FF" />
              <stop offset="100%" stopColor="#0059F9" />
            </linearGradient>
          </defs>
        </svg>

        {/* Brand text */}
        <div className="splash-text-fade">
          <span className="text-2xl font-bold tracking-tight text-gray-900">
            VINK{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2875FF] to-[#0059F9]">
              SIM
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
