"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const directionOffsets = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
}: ScrollRevealProps) {
  const prefersReduced = useReducedMotion();
  const offset = directionOffsets[direction];

  return (
    <motion.div
      initial={
        prefersReduced
          ? { opacity: 1 }
          : { opacity: 0, x: offset.x, y: offset.y }
      }
      whileInView={
        prefersReduced ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }
      }
      viewport={{ once, margin: "-60px" }}
      transition={{
        duration: prefersReduced ? 0 : duration,
        delay: prefersReduced ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
