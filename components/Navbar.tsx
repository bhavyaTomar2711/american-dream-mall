"use client";

import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Retail", href: "#explore" },
  { label: "Luxury", href: "#luxury" },
  { label: "Experience", href: "#experience" },
  { label: "Dining", href: "#dining" },
  { label: "Events", href: "#events" },
];

function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className="fixed top-5 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none"
    >
      <nav
        className="flex items-center justify-between w-full max-w-[900px] px-7 py-3.5 rounded-full pointer-events-auto"
        style={{
          background: "rgba(255, 255, 255, 0.11)",
          backdropFilter: "blur(24px) saturate(160%)",
          WebkitBackdropFilter: "blur(24px) saturate(160%)",
          border: "1px solid rgba(255, 255, 255, 0.16)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255,255,255,0.14)",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: "11px",
            fontWeight: 400,
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.70)",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          American Dream
        </button>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "10.5px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.80)",
                transition: "color 0.3s",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,1)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.80)")}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.03, filter: "brightness(1.15)" }}
          whileTap={{ scale: 0.97 }}
          onClick={() => scrollTo("#events")}
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: "10.5px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: "9999px",
            padding: "8px 18px",
            cursor: "pointer",
          }}
        >
          Start Journey
        </motion.button>
      </nav>
    </motion.header>
  );
}
