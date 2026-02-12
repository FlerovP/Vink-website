"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#product"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-xl font-bold tracking-tight text-gray-900"
          >
            VINK<span className="text-cyan"> SIM</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {siteConfig.nav.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-sm font-medium text-gray-600 hover:text-cyan transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={siteConfig.loginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-600 hover:text-cyan transition-colors duration-200 px-4 py-2"
            >
              Log in
            </a>
            <a
              href={siteConfig.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm !py-2.5 !px-5"
            >
              Download
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <motion.span
              animate={
                mobileMenuOpen
                  ? { rotate: 45, y: 4, width: 20 }
                  : { rotate: 0, y: 0, width: 20 }
              }
              className="block h-0.5 bg-gray-700 rounded-full origin-center"
              style={{ width: 20 }}
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-0.5 bg-gray-700 rounded-full"
              style={{ width: 20 }}
            />
            <motion.span
              animate={
                mobileMenuOpen
                  ? { rotate: -45, y: -4, width: 20 }
                  : { rotate: 0, y: 0, width: 20 }
              }
              className="block h-0.5 bg-gray-700 rounded-full origin-center"
              style={{ width: 20 }}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6 pt-16">
              {siteConfig.nav.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  onClick={() => handleNavClick(item.href)}
                  className="text-lg font-medium text-gray-700 hover:text-cyan transition-colors"
                >
                  {item.label}
                </motion.button>
              ))}

              <div className="flex flex-col gap-3 mt-6 w-56">
                <a
                  href={siteConfig.loginUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </a>
                <a
                  href={siteConfig.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Download
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
