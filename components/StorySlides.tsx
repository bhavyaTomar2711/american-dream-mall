"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IMAGE =
  "https://res.cloudinary.com/dwo1snivu/image/upload/v1776103089/hey_i_want_202604132151-Photoroom_iyqmhr.png";

const EASE = [0.22, 1, 0.36, 1] as const;
const SLIDE_INTERVAL = 4000;

const SLIDES = [
  {
    headline: "Global brands.",
    headline2: "Real revenue.",
    sub: "Where the world's biggest names build presence — from luxury flagships to mid-tier anchors and pop-up activations.",
    stats: [
      { value: "450+", label: "Brand Partners" },
      { value: "3M ft²", label: "Leasable Space" },
    ],
  },
  {
    headline: "Flagship stores.",
    headline2: "Premium traffic.",
    sub: "Anchor tenants that draw millions — generating foot traffic no standalone location can match.",
    stats: [
      { value: "50+", label: "Flagship Stores" },
      { value: "40M+", label: "Annual Visitors" },
    ],
  },
  {
    headline: "Pop-ups that",
    headline2: "go viral.",
    sub: "Short-term activations with massive reach. Brands launch here because the audience is already waiting.",
    stats: [
      { value: "200+", label: "Activations / yr" },
      { value: "85%", label: "Sell-through Rate" },
    ],
  },
];

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        background: "rgba(0,0,0,0.03)",
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
        border: "1px solid rgba(0,0,0,0.06)",
        borderRadius: "16px",
        padding: "18px 24px",
        boxShadow:
          "0 4px 16px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.80)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-montserrat)",
          fontSize: "22px",
          fontWeight: 600,
          letterSpacing: "-0.025em",
          color: "#1D1D1F",
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: "var(--font-montserrat)",
          fontSize: "8.5px",
          letterSpacing: "0.26em",
          textTransform: "uppercase",
          color: "rgba(0,0,0,0.32)",
          lineHeight: 1,
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function StorySlides() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(next, SLIDE_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next, current]);

  const slide = SLIDES[current];

  return (
    <section
      id="explore"
      style={{
        width: "100%",
        background: "#F5F5F7",
        padding: "clamp(20px, 3vh, 40px) clamp(16px, 3vw, 48px)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* ── White rounded canvas ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1480px",
          minHeight: "min(82vh, 820px)",
          background: "#FFFFFF",
          borderRadius: "28px",
          boxShadow:
            "0 30px 80px -20px rgba(0,0,0,0.06), 0 8px 24px -8px rgba(0,0,0,0.04)",
          overflow: "hidden",
          padding: "clamp(40px, 6vh, 88px) clamp(32px, 5vw, 96px)",
          display: "flex",
          alignItems: "center",
          gap: "clamp(32px, 6vw, 120px)",
        }}
      >
        {/* ── Faint backdrop flourish ── */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-20%",
            left: "-10%",
            width: "60%",
            height: "140%",
            background:
              "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,169,110,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* ── LEFT: Image (static) ── */}
        <motion.div
          initial={{ opacity: 0, x: -40, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: EASE }}
          style={{
            position: "relative",
            flex: "1 1 58%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            minWidth: 0,
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: "-12%",
              background:
                "radial-gradient(ellipse 60% 60% at 50% 55%, rgba(30,60,140,0.12) 0%, transparent 70%)",
              filter: "blur(40px)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />
          <img
            src={IMAGE}
            alt="Luxury retail interior"
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: "780px",
              height: "auto",
              objectFit: "contain",
              filter:
                "drop-shadow(0 56px 80px rgba(20,30,60,0.20)) drop-shadow(0 14px 28px rgba(20,30,60,0.08))",
              userSelect: "none",
              WebkitUserSelect: "none",
            }}
            draggable={false}
          />
        </motion.div>

        {/* ── RIGHT: Auto-rotating text ── */}
        <div
          style={{
            flex: "0 1 460px",
            minWidth: 0,
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Label (static) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              marginBottom: "36px",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "1px",
                background: "#C9A96E",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.48em",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.38)",
              }}
            >
              Retail — Revenue
            </span>
          </motion.div>

          {/* Sliding content */}
          <div style={{ minHeight: "320px" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                {/* Headline */}
                <h2
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 700,
                    fontSize: "clamp(2.4rem, 4.4vw, 4.4rem)",
                    lineHeight: 1,
                    letterSpacing: "0.02em",
                    textTransform: "uppercase",
                    color: "#1D1D1F",
                    margin: 0,
                  }}
                >
                  {slide.headline}
                </h2>
                <h2
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 700,
                    fontSize: "clamp(2.4rem, 4.4vw, 4.4rem)",
                    lineHeight: 0.92,
                    letterSpacing: "0.02em",
                    textTransform: "uppercase",
                    color: "#1D1D1F",
                    margin: 0,
                  }}
                >
                  {slide.headline2}
                </h2>

                {/* Gold rule */}
                <div
                  style={{
                    width: "56px",
                    height: "1px",
                    background:
                      "linear-gradient(90deg, #C9A96E, rgba(201,169,110,0))",
                    margin: "40px 0 32px",
                  }}
                />

                {/* Subtext */}
                <p
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "16px",
                    lineHeight: 1.7,
                    color: "rgba(0,0,0,0.55)",
                    letterSpacing: "-0.005em",
                    maxWidth: "400px",
                    margin: 0,
                    fontWeight: 400,
                  }}
                >
                  {slide.sub}
                </p>

                {/* Stats */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    marginTop: "48px",
                  }}
                >
                  {slide.stats.map((s) => (
                    <Metric key={s.label} value={s.value} label={s.label} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress dots (static, below content) */}
          <div
            style={{
              display: "flex",
              gap: "6px",
              marginTop: "32px",
            }}
          >
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrent(i);
                  if (timerRef.current) clearInterval(timerRef.current);
                  timerRef.current = setInterval(next, SLIDE_INTERVAL);
                }}
                style={{
                  width: i === current ? "28px" : "8px",
                  height: "3px",
                  borderRadius: "2px",
                  background:
                    i === current
                      ? "#C9A96E"
                      : "rgba(0,0,0,0.10)",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  transition: "all 0.4s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
