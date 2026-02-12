"use client";

import { useReducedMotion } from "framer-motion";

export default function GlowOrbs() {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) return null;

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />
      <div className="glow-orb glow-orb-3" />
    </div>
  );
}
