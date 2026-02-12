"use client";

import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/site";
import AnimatedGlobe from "./AnimatedGlobe";

export default function Hero() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="product"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <motion.h1
              initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-gray-900"
            >
              {siteConfig.hero.headline.split("\n").map((line, i) => (
                <span key={i}>
                  {i === 0 ? (
                    <>
                      Mobile data in{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-aqua">
                        180+ countries
                      </span>
                      .
                    </>
                  ) : (
                    <>
                      <br />
                      {line}
                    </>
                  )}
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-gray-500 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              {siteConfig.hero.subheadline}
            </motion.p>

            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href={siteConfig.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base px-8 py-3.5"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                {siteConfig.hero.primaryCta}
              </a>
              <a
                href="#rates"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#rates")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-secondary text-base px-8 py-3.5"
              >
                {siteConfig.hero.secondaryCta}
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex items-center gap-6 justify-center lg:justify-start mt-4 text-sm text-gray-400"
            >
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-cyan" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                No contracts
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-cyan" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                eSIM only
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-cyan" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Per-MB billing
              </span>
            </motion.div>
          </div>

          {/* Animated Map — hidden on mobile */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block relative h-[440px] lg:-mr-8"
          >
            <AnimatedGlobe />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
