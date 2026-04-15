"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const SLIDE_INTERVAL = 3000;

const SLIDES = [
  {
    src: "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776186621/pexels-valent-lau-1438552412-32102403_ncxgzs.jpg",
    caption: "Curated Collections",
  },
  {
    src: "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776186621/dsign_a_ultra_202604142235_pkisyf.jpg",
    caption: "The Atelier Experience",
  },
  {
    src: "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776186621/pexels-th-nh-nguy-n-719702942-19456977_rsslga.jpg",
    caption: "World-Class Flagships",
  },
  {
    src: "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776186621/make_it_from_202604142239_k6k1bg.jpg",
    caption: "Private Shopping Suites",
  },
  {
    src: "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776186777/make_this_imaeg_202604112355_tb0m53.jpg",
    caption: "Elevated Interiors",
  },
  {
    src: "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776186621/pexels-ansar-muhammad-380085065-27626759_xddsbd.jpg",
    caption: "A Destination Within",
  },
];

export default function LuxurySection() {
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
      timerRef.current = setInterval(next, SLIDE_INTERVAL);
    },
    [next],
  );

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, SLIDE_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, next, current]);

  const slide = SLIDES[current];

  return (
    <section
      id="luxury"
      data-nav-theme="light"
      style={{
        width: "100%",
        background: "#F5F5F7",
        padding: "clamp(20px, 3vh, 40px) clamp(6px, 0.6vw, 12px)",
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
          maxWidth: "1820px",
          background: "#0C0A06",
          borderRadius: "28px",
          boxShadow:
            "0 40px 100px -30px rgba(0,0,0,0.50), 0 8px 24px -8px rgba(0,0,0,0.30)",
          overflow: "hidden",
        }}
      >
        {/* ── Full-bleed image slider ── */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "clamp(560px, 88vh, 1000px)",
          }}
        >
          {/* Images */}
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={slide.src}
              alt={slide.caption}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: EASE }}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                userSelect: "none",
              }}
              draggable={false}
            />
          </AnimatePresence>

          {/* Warm dark overlay — rich black/brown, not blue */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(12,10,6,0.70) 0%, rgba(12,10,6,0.15) 40%, rgba(12,10,6,0.15) 55%, rgba(12,10,6,0.80) 100%)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* Left content shadow */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(100deg, rgba(12,10,6,0.65) 0%, rgba(12,10,6,0.20) 40%, transparent 65%)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* Vignette */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              boxShadow: "inset 0 0 120px 40px rgba(12,10,6,0.40)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* ── Top: section label ── */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 3,
              padding:
                "clamp(36px, 5vh, 64px) clamp(40px, 5vw, 80px) 0",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "1px",
                  background: "rgba(201,169,110,0.50)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.48em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.40)",
                }}
              >
                02 — The Luxury Wing
              </span>
            </motion.div>
          </div>

          {/* ── Center: headline ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 clamp(40px, 5vw, 80px)",
            }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE, delay: 0.1 }}
              style={{
                fontFamily: "var(--font-montserrat)",
                fontWeight: 800,
                fontSize: "clamp(2.8rem, 6vw, 6.5rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.95)",
                margin: "0 0 28px",
                maxWidth: "700px",
              }}
            >
              Where luxury
              <br />
              feels{" "}
              <span style={{ color: "#C9A96E" }}>different.</span>
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
              style={{
                width: "56px",
                height: "1px",
                background:
                  "linear-gradient(90deg, rgba(201,169,110,0.70), transparent)",
                marginBottom: "24px",
                transformOrigin: "left center",
              }}
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "clamp(13px, 1.1vw, 16px)",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.45)",
                maxWidth: "420px",
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              An elevated wing designed for the world&rsquo;s most
              discerning brands — where every detail signals exclusivity
              and every visit feels private.
            </motion.p>
          </div>

          {/* ── Bottom: caption + progress ── */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 3,
              padding:
                "0 clamp(40px, 5vw, 80px) clamp(28px, 4vh, 48px)",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "24px",
            }}
          >
            {/* Caption */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    borderRadius: "14px",
                    padding: "14px 22px",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.04em",
                      color: "rgba(255,255,255,0.85)",
                    }}
                  >
                    {slide.caption}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.25)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {String(current + 1).padStart(2, "0")}/
                    {String(SLIDES.length).padStart(2, "0")}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress + arrows */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              {/* Progress bars */}
              <div
                style={{
                  display: "flex",
                  gap: "4px",
                  width: "clamp(100px, 12vw, 180px)",
                }}
              >
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}: ${SLIDES[i].caption}`}
                    style={{
                      flex: 1,
                      height: "2px",
                      borderRadius: "2px",
                      background: "rgba(255,255,255,0.12)",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    {i === current && (
                      <motion.div
                        key={`fill-${current}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: SLIDE_INTERVAL / 1000,
                          ease: "linear",
                        }}
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(90deg, #C9A96E, rgba(201,169,110,0.50))",
                          borderRadius: "2px",
                          transformOrigin: "left center",
                        }}
                      />
                    )}
                    {i < current && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(201,169,110,0.35)",
                          borderRadius: "2px",
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Nav arrows */}
              <div style={{ display: "flex", gap: "6px" }}>
                <motion.button
                  whileHover={{ background: "rgba(255,255,255,0.12)" }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() =>
                    goTo((current - 1 + SLIDES.length) % SLIDES.length)
                  }
                  aria-label="Previous slide"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "background 0.3s ease",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M10 3L5 8L10 13"
                      stroke="rgba(255,255,255,0.50)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ background: "rgba(255,255,255,0.12)" }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => goTo((current + 1) % SLIDES.length)}
                  aria-label="Next slide"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "background 0.3s ease",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 3L11 8L6 13"
                      stroke="rgba(255,255,255,0.50)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
