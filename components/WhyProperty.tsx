"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTO_INTERVAL = 5000;

/* ─────────────────────────────────────────────
   SLIDE DATA — each slide has its own color orb
───────────────────────────────────────────── */

type Slide = {
  tag: string;
  headline: string;
  headlineAccent?: string;
  sub: string;
  stats: { value: string; label: string }[];
  /* Ambient gradient colors per slide */
  orbA: string;
  orbB: string;
};

const SLIDES: Slide[] = [
  {
    tag: "Location & Access",
    headline: "5 miles from",
    headlineAccent: "Manhattan.",
    sub: "At the crossroads of the world's most powerful consumer market — where 20 million people live within a 60-minute drive.",
    stats: [
      { value: "5 mi", label: "From Midtown" },
      { value: "3", label: "Major Airports" },
      { value: "20M+", label: "People in 1 hr" },
    ],
    orbA: "rgba(201,169,110,0.18)",
    orbB: "rgba(60,100,220,0.10)",
  },
  {
    tag: "Visitor Scale",
    headline: "40 million",
    headlineAccent: "visitors.",
    sub: "More annual foot traffic than most cities. A self-sustaining audience engine that no standalone retailer can replicate.",
    stats: [
      { value: "40M+", label: "Annual Visitors" },
      { value: "3M ft²", label: "Total Footprint" },
      { value: "450+", label: "Brand Partners" },
    ],
    orbA: "rgba(140,80,220,0.14)",
    orbB: "rgba(201,169,110,0.12)",
  },
  {
    tag: "Demographics",
    headline: "The audience you",
    headlineAccent: "want.",
    sub: "Affluent, young, international. The highest-value consumer profile in the western hemisphere — right at your door.",
    stats: [
      { value: "$128K", label: "Median HH Income" },
      { value: "35%", label: "International" },
      { value: "18–44", label: "Core Age Range" },
    ],
    orbA: "rgba(80,180,200,0.14)",
    orbB: "rgba(201,169,110,0.10)",
  },
  {
    tag: "Engagement",
    headline: "Hours, not",
    headlineAccent: "minutes.",
    sub: "Visitors don't pass through — they stay. Average dwell time is 3× the national mall average, turning every impression into impact.",
    stats: [
      { value: "4.2 hrs", label: "Avg. Dwell Time" },
      { value: "3×", label: "Industry Average" },
      { value: "60M+", label: "NYC Tourists / yr" },
    ],
    orbA: "rgba(201,169,110,0.16)",
    orbB: "rgba(180,60,120,0.10)",
  },
  {
    tag: "Revenue Opportunity",
    headline: "A $2 billion",
    headlineAccent: "platform.",
    sub: "From luxury flagships to pop-up activations — every square foot is engineered to generate measurable commercial returns.",
    stats: [
      { value: "$2B+", label: "Development Value" },
      { value: "$840K+", label: "Luxury Lease / mo" },
      { value: "98%", label: "Occupancy Rate" },
    ],
    orbA: "rgba(201,169,110,0.20)",
    orbB: "rgba(60,200,140,0.08)",
  },
];

/* ─────────────────────────────────────────────
   GLASSMORPHIC STAT CARD (dark variant)
───────────────────────────────────────────── */

function GlassStat({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      style={{
        flex: "1 1 0",
        minWidth: "140px",
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(32px) saturate(180%)",
        WebkitBackdropFilter: "blur(32px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: "18px",
        padding: "clamp(20px, 2.5vh, 30px) clamp(18px, 2vw, 26px)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-montserrat)",
          fontWeight: 700,
          fontSize: "clamp(1.5rem, 2.4vw, 2.2rem)",
          letterSpacing: "-0.03em",
          color: "rgba(255,255,255,0.92)",
          lineHeight: 1,
          marginBottom: "8px",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "var(--font-montserrat)",
          fontSize: "8.5px",
          fontWeight: 500,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.30)",
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   PROGRESS BAR (light on dark)
───────────────────────────────────────────── */

function ProgressBar({
  active,
  passed,
  onClick,
  label,
}: {
  active: boolean;
  passed: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      style={{
        flex: 1,
        height: "2px",
        borderRadius: "2px",
        background: "rgba(255,255,255,0.10)",
        border: "none",
        padding: 0,
        cursor: "pointer",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {active && (
        <motion.div
          key="active-fill"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: AUTO_INTERVAL / 1000, ease: "linear" }}
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, #C9A96E, rgba(201,169,110,0.60))",
            borderRadius: "2px",
            transformOrigin: "left center",
          }}
        />
      )}
      {passed && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(201,169,110,0.40)",
            borderRadius: "2px",
          }}
        />
      )}
    </button>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */

export default function WhyProperty() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  const goTo = useCallback(
    (i: number) => {
      setCurrent(i);
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(next, AUTO_INTERVAL);
    },
    [next],
  );

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, AUTO_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, next, current]);

  const slide = SLIDES[current];

  return (
    <section
      id="why"
      data-nav-theme="light"
      style={{
        width: "100%",
        background: "#F5F5F7",
        padding: "clamp(20px, 3vh, 40px) clamp(16px, 3vw, 48px)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1480px",
          background: "#0A0F1E",
          borderRadius: "28px",
          boxShadow:
            "0 40px 100px -30px rgba(0,0,0,0.50), 0 8px 24px -8px rgba(0,0,0,0.30)",
          overflow: "hidden",
          padding:
            "clamp(44px, 6vh, 80px) clamp(40px, 6vw, 96px) clamp(40px, 5vh, 64px)",
        }}
      >
        {/* ── Animated ambient orbs ── */}
        <motion.div
          key={`orbA-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          aria-hidden
          style={{
            position: "absolute",
            top: "-25%",
            right: "-8%",
            width: "650px",
            height: "650px",
            background: `radial-gradient(ellipse at center, ${slide.orbA} 0%, transparent 70%)`,
            pointerEvents: "none",
            filter: "blur(60px)",
          }}
        />
        <motion.div
          key={`orbB-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          aria-hidden
          style={{
            position: "absolute",
            bottom: "-30%",
            left: "-5%",
            width: "500px",
            height: "500px",
            background: `radial-gradient(ellipse at center, ${slide.orbB} 0%, transparent 70%)`,
            pointerEvents: "none",
            filter: "blur(50px)",
          }}
        />

        {/* Subtle grid texture overlay */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
            pointerEvents: "none",
          }}
        />

        {/* Top inner border glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(201,169,110,0.20), transparent)",
          }}
        />

        {/* ── Top bar: section label + progress + counter ── */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "clamp(36px, 5vh, 64px)",
            gap: "24px",
          }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "9px",
              letterSpacing: "0.44em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.30)",
              margin: 0,
              flexShrink: 0,
            }}
          >
            01 — Why This Property
          </motion.p>

          <div style={{ display: "flex", gap: "5px", flex: "0 1 260px" }}>
            {SLIDES.map((s, i) => (
              <ProgressBar
                key={i}
                active={i === current}
                passed={i < current}
                onClick={() => goTo(i)}
                label={`Go to slide ${i + 1}: ${s.tag}`}
              />
            ))}
          </div>

          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.10em",
              color: "rgba(255,255,255,0.20)",
              margin: 0,
              flexShrink: 0,
              minWidth: "40px",
              textAlign: "right",
            }}
          >
            {String(current + 1).padStart(2, "0")}/
            {String(SLIDES.length).padStart(2, "0")}
          </p>
        </div>

        {/* ── Slide content ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="why-slide-content"
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              alignItems: "flex-start",
              gap: "clamp(24px, 4vw, 96px)",
              minHeight: "clamp(280px, 34vh, 380px)",
              flexWrap: "wrap",
            }}
          >
            {/* LEFT — Text */}
            <div style={{ flex: "1 1 300px", minWidth: 0 }}>
              {/* Tag pill — glass on dark */}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.05 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "28px",
                  padding: "7px 18px",
                  borderRadius: "9999px",
                  background: "rgba(201,169,110,0.08)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(201,169,110,0.18)",
                }}
              >
                <div
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: "#C9A96E",
                    boxShadow: "0 0 8px rgba(201,169,110,0.50)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.20em",
                    textTransform: "uppercase",
                    color: "rgba(201,169,110,0.80)",
                  }}
                >
                  {slide.tag}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 800,
                  fontSize: "clamp(2.4rem, 5vw, 5rem)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.03em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.93)",
                  margin: "0 0 24px",
                }}
              >
                {slide.headline}
                {slide.headlineAccent && (
                  <>
                    <br />
                    <span style={{ color: "#C9A96E" }}>
                      {slide.headlineAccent}
                    </span>
                  </>
                )}
              </motion.h2>

              {/* Gold rule */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
                style={{
                  width: "48px",
                  height: "1px",
                  background:
                    "linear-gradient(90deg, rgba(201,169,110,0.70), transparent)",
                  marginBottom: "24px",
                  transformOrigin: "left center",
                }}
              />

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.22 }}
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "clamp(14px, 1.2vw, 16px)",
                  lineHeight: 1.75,
                  color: "rgba(255,255,255,0.42)",
                  maxWidth: "480px",
                  margin: 0,
                  letterSpacing: "0.01em",
                }}
              >
                {slide.sub}
              </motion.p>
            </div>

            {/* RIGHT — Glass stat cards */}
            <div
              style={{
                flex: "1 1 280px",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "clamp(8px, 1.2vw, 14px)",
                paddingTop: "0px",
              }}
            >
              {slide.stats.map((stat, i) => (
                <GlassStat
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  delay={0.12 + i * 0.09}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom: nav arrows ── */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "clamp(24px, 3vh, 40px)",
          }}
        >
          <motion.button
            whileHover={{
              background: "rgba(255,255,255,0.10)",
              borderColor: "rgba(255,255,255,0.18)",
            }}
            whileTap={{ scale: 0.94 }}
            onClick={() =>
              goTo((current - 1 + SLIDES.length) % SLIDES.length)
            }
            aria-label="Previous slide"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.3s ease, border-color 0.3s ease",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 3L5 8L10 13"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
          <motion.button
            whileHover={{
              background: "rgba(255,255,255,0.10)",
              borderColor: "rgba(255,255,255,0.18)",
            }}
            whileTap={{ scale: 0.94 }}
            onClick={() => goTo((current + 1) % SLIDES.length)}
            aria-label="Next slide"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.3s ease, border-color 0.3s ease",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 3L11 8L6 13"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
