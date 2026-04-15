"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const SLIDE_INTERVAL = 4000;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const EVENTS = [
  {
    src: "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776191272/pexels-jibarofoto-18482996_ivrrqm.jpg",
    type: "Concerts & Live",
    title: "18,000 seats. One unforgettable night.",
    sub: "World-class acoustics, state-of-the-art production, and a built-in audience of millions. From arena tours to intimate sets — this is where artists want to perform.",
  },
  {
    src: "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776191274/make_an_image_202604142355_l7diea.jpg",
    type: "Celebrity Appearances",
    title: "Where culture shows up.",
    sub: "A-list meet-and-greets, influencer activations, and red-carpet moments that generate millions of impressions — all inside one destination.",
  },
  {
    src: "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776191273/pexels-prime-cinematics-1005175-2057274_qdqc1d.jpg",
    type: "Performing Arts",
    title: "A stage for the extraordinary.",
    sub: "Broadway-caliber productions, immersive theatre, and cultural programming that transforms retail into a world-class arts destination.",
  },
  {
    src: "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776266297/make_an_image_202604152047_nq20en.jpg",
    type: "Expo & Conventions",
    title: "The floor where deals get done.",
    sub: "Trade shows, corporate summits, product reveals, and keynotes — staged in flexible convention space with turnkey production and a built-in audience of forty million.",
  },
  {
    src: "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776191274/make_it_again_202604142348_ruouug.jpg",
    type: "Brand Launches",
    title: "Launch here. Launch everywhere.",
    sub: "Product drops, experiential pop-ups, and immersive brand activations — with 40 million visitors as your built-in audience.",
  },
];

const VENUE_STATS = [
  { value: "18K", label: "Arena Capacity" },
  { value: "30K ft²", label: "Event Space" },
  { value: "500+", label: "Events / Year" },
  { value: "100+", label: "Brand Activations" },
];

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */

export default function EventsSection() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Preload every slide image on mount so the auto-advance never blocks
  // on a cold fetch. Without this, the crossfade pauses on image download.
  useEffect(() => {
    EVENTS.forEach((e) => {
      const img = new Image();
      img.src = e.src;
    });
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % EVENTS.length);
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

  const event = EVENTS[current];

  return (
    <section
      id="events"
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
          background: "#080604",
          borderRadius: "28px",
          boxShadow:
            "0 40px 100px -30px rgba(0,0,0,0.55), 0 8px 24px -8px rgba(0,0,0,0.30)",
          overflow: "hidden",
        }}
      >
        {/* ═══════════════════════════════════════════
            FULL-BLEED IMAGE HERO — cycles through events
        ═══════════════════════════════════════════ */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "clamp(590px, 93vh, 1060px)",
          }}
        >
          {/* Background image */}
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={event.src}
              alt={event.type}
              initial={{ opacity: 0, scale: 1.06 }}
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

          {/* Warm dark overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(8,6,4,0.75) 0%, rgba(8,6,4,0.20) 35%, rgba(8,6,4,0.20) 50%, rgba(8,6,4,0.88) 100%)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* Left shadow for text readability */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(100deg, rgba(8,6,4,0.70) 0%, rgba(8,6,4,0.30) 35%, transparent 60%)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* Vignette */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              boxShadow: "inset 0 0 140px 50px rgba(8,6,4,0.45)",
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
              padding: "clamp(36px, 5vh, 64px) clamp(40px, 5vw, 80px) 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
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
                05 — Events & Platform
              </span>
            </motion.div>

            {/* Live indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "9999px",
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#C9A96E",
                  boxShadow: "0 0 10px rgba(201,169,110,0.60)",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "9px",
                  fontWeight: 500,
                  letterSpacing: "0.20em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                500+ Events / Year
              </span>
            </motion.div>
          </div>

          {/* ── Center-left: main content ── */}
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
            {/* Event type pill */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`pill-${current}`}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.4, ease: EASE }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "28px",
                  padding: "8px 20px",
                  borderRadius: "9999px",
                  background: "rgba(201,169,110,0.10)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(201,169,110,0.20)",
                  alignSelf: "flex-start",
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
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(201,169,110,0.85)",
                  }}
                >
                  {event.type}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Headline */}
            <AnimatePresence mode="wait">
              <motion.h2
                key={`h-${current}`}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.6, ease: EASE }}
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 800,
                  fontSize: "clamp(2.6rem, 5.5vw, 5.5rem)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.03em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.95)",
                  margin: "0 0 24px",
                  maxWidth: "680px",
                }}
              >
                {event.title}
              </motion.h2>
            </AnimatePresence>

            {/* Gold rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              style={{
                width: "56px",
                height: "1px",
                background:
                  "linear-gradient(90deg, rgba(201,169,110,0.70), transparent)",
                marginBottom: "24px",
                transformOrigin: "left center",
              }}
            />

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`p-${current}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "clamp(13px, 1.1vw, 16px)",
                  lineHeight: 1.75,
                  color: "rgba(255,255,255,0.45)",
                  maxWidth: "480px",
                  margin: 0,
                  letterSpacing: "0.01em",
                }}
              >
                {event.sub}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* ── Bottom overlay bar ── */}
          <div
            className="events-bottom"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 3,
              padding: "0 clamp(40px, 5vw, 80px) clamp(28px, 4vh, 48px)",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "24px",
            }}
          >
            {/* Venue stats — glass cards */}
            <div
              className="venue-stats"
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {VENUE_STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.06 }}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(24px) saturate(180%)",
                    WebkitBackdropFilter: "blur(24px) saturate(180%)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: "14px",
                    padding: "14px 20px",
                    boxShadow:
                      "0 4px 20px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontWeight: 700,
                      fontSize: "clamp(1rem, 1.6vw, 1.4rem)",
                      letterSpacing: "-0.02em",
                      color: "rgba(255,255,255,0.90)",
                      lineHeight: 1,
                      marginBottom: "4px",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "7.5px",
                      fontWeight: 500,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.28)",
                    }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: progress + nav + CTA */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              {/* Progress bars */}
              <div
                style={{
                  display: "flex",
                  gap: "4px",
                  width: "clamp(80px, 10vw, 140px)",
                }}
              >
                {EVENTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}: ${EVENTS[i].type}`}
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
                    goTo((current - 1 + EVENTS.length) % EVENTS.length)
                  }
                  aria-label="Previous event"
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
                  onClick={() => goTo((current + 1) % EVENTS.length)}
                  aria-label="Next event"
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

              {/* Book CTA → /venues hub (browse first, inquire second) */}
              <motion.button
                whileHover={{
                  background: "rgba(201,169,110,0.25)",
                  borderColor: "rgba(201,169,110,0.40)",
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push("/venues")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "11px 24px",
                  borderRadius: "9999px",
                  background: "rgba(201,169,110,0.12)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(201,169,110,0.25)",
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.20em",
                  textTransform: "uppercase",
                  color: "rgba(201,169,110,0.90)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                Book a Venue
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ display: "inline-block" }}
                >
                  →
                </motion.span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Pulse animation for the live dot */}
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
        `}</style>
      </div>
    </section>
  );
}
