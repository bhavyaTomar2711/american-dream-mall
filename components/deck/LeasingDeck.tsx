"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInquiry } from "@/providers/InquiryProvider";
import { useMenu } from "@/providers/MenuProvider";
import { usePresentation } from "@/providers/PresentationProvider";
import Link from "next/link";
import { LEASING, LEASING_ORDER, type LeasingSlug } from "@/lib/leasing";

const EASE = [0.22, 1, 0.36, 1] as const;

const AD_LOGO =
  "https://res.cloudinary.com/dwo1snivu/image/upload/v1776278785/American_Dream__Symbol_ldufrd.svg";

// Insert a width constraint into a Cloudinary URL (e.g. w_1200) for smaller
// thumbnails. No-op on non-Cloudinary URLs.
function cldWidth(src: string, width: number): string {
  return src.replace(
    /\/image\/upload\/(f_auto,q_auto[^/]*)\//,
    `/image/upload/$1,w_${width},c_limit/`,
  );
}

const NAV_LABELS = [
  "Overview",
  "Luxury Flagships",
  "Retail & Flagships",
  "Dining & F&B",
  "Pop-up & Activations",
];
const TOTAL = NAV_LABELS.length; // 5 slides

const slideVariants = {
  enter: { opacity: 0, scale: 1.05 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
};
const slideTx = { duration: 0.85, ease: EASE };

// ─── shared helpers ───────────────────────────────────────────────────────────

function CinematicBg({ src }: { src: string }) {
  return (
    <>
      <img
        src={src}
        alt=""
        aria-hidden
        loading="eager"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,15,30,0.70) 0%, rgba(10,15,30,0.20) 40%, rgba(10,15,30,0.80) 100%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(10,15,30,0.80) 0%, rgba(10,15,30,0.35) 45%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 180px 70px rgba(10,15,30,0.55)", pointerEvents: "none" }} />
    </>
  );
}

function SlideTopBar({ index }: { index: number }) {
  const { open: openMenu } = useMenu();
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        padding: "clamp(22px, 3vh, 38px) clamp(36px, 5vw, 72px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <motion.button
        onClick={openMenu}
        whileHover={{
          borderColor: "rgba(201,169,110,0.35)",
          background: "rgba(255,255,255,0.08)",
        }}
        whileTap={{ scale: 0.96 }}
        aria-label="Open menu — Leasing"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(24px) saturate(160%)",
          WebkitBackdropFilter: "blur(24px) saturate(160%)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: "9999px",
          padding: "8px 20px 8px 8px",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.04)",
          transition: "border-color 0.3s ease, background 0.3s ease",
        }}
      >
        <div
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <img src={AD_LOGO} alt="American Dream" style={{ width: "20px", height: "20px" }} />
        </div>
        <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)" }}>
          Menu
        </span>
        <div style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.14)" }} />
        <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "9.5px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(201,169,110,0.85)" }}>
          Leasing
        </span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginLeft: "2px" }}>
          <path d="M1 3h8M1 5h8M1 7h8" stroke="rgba(201,169,110,0.70)" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </motion.button>
      <span
        style={{
          fontFamily: "var(--font-montserrat)",
          fontSize: "10px",
          fontWeight: 500,
          letterSpacing: "0.18em",
          color: "rgba(255,255,255,0.25)",
        }}
      >
        {String(index).padStart(2, "0")} / {String(TOTAL - 1).padStart(2, "0")}
      </span>
    </div>
  );
}

function Eyebrow({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
      style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "22px" }}
    >
      <div style={{ width: "22px", height: "1px", background: "rgba(201,169,110,0.55)" }} />
      <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "9.5px", fontWeight: 500, letterSpacing: "0.46em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)" }}>
        {text}
      </span>
    </motion.div>
  );
}

function Headline({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.72, ease: EASE, delay: 0.16 }}
      style={{
        fontFamily: "var(--font-montserrat)",
        fontWeight: 800,
        fontSize: "clamp(2.4rem, 4.8vw, 5.4rem)",
        lineHeight: 0.92,
        letterSpacing: "-0.03em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.95)",
        margin: "0 0 22px",
        maxWidth: "700px",
      }}
    >
      {children}
    </motion.h2>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.26 }}
      style={{
        fontFamily: "var(--font-montserrat)",
        fontSize: "clamp(13px, 1.05vw, 15.5px)",
        lineHeight: 1.78,
        color: "rgba(255,255,255,0.46)",
        maxWidth: "440px",
        margin: "0 0 22px",
        letterSpacing: "0.01em",
      }}
    >
      {children}
    </motion.p>
  );
}

function GoldRule({ delay = 0.22 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.65, ease: EASE, delay }}
      style={{
        width: "48px",
        height: "1px",
        background: "linear-gradient(90deg, rgba(201,169,110,0.80), transparent)",
        marginBottom: "18px",
        transformOrigin: "left center",
      }}
    />
  );
}

function StatCard({ value, label, foot, delay = 0 }: { value: string; label: string; foot?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      style={{
        background: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(24px) saturate(160%)",
        WebkitBackdropFilter: "blur(24px) saturate(160%)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: "16px",
        padding: "clamp(16px, 2vh, 22px) clamp(16px, 1.8vw, 24px)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-montserrat)",
          fontWeight: 700,
          fontSize: "clamp(1.5rem, 2.3vw, 2.2rem)",
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
          fontSize: "9px",
          fontWeight: 500,
          letterSpacing: "0.20em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.32)",
          marginBottom: foot ? "6px" : 0,
        }}
      >
        {label}
      </div>
      {foot && (
        <div
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: "9px",
            fontWeight: 400,
            color: "rgba(201,169,110,0.55)",
            letterSpacing: "0.02em",
          }}
        >
          {foot}
        </div>
      )}
    </motion.div>
  );
}

// ─── SLIDE 0 — HUB / OVERVIEW ─────────────────────────────────────────────────

function HubSlide({ onGoTo }: { onGoTo: (i: number) => void }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#0A0F1E",
      }}
    >
      {/* Ambient orbs */}
      <div aria-hidden style={{ position: "absolute", top: "-20%", right: "10%", width: "700px", height: "700px", background: "radial-gradient(ellipse at center, rgba(201,169,110,0.10) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
      <div aria-hidden style={{ position: "absolute", bottom: "-20%", left: "10%", width: "500px", height: "500px", background: "radial-gradient(ellipse at center, rgba(60,100,220,0.07) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />

      <SlideTopBar index={0} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          padding: "clamp(90px, 12vh, 130px) clamp(40px, 5vw, 80px) clamp(40px, 5vh, 64px)",
          zIndex: 2,
        }}
      >
        {/* Top: headline + intro */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "clamp(32px, 4vw, 80px)", marginBottom: "clamp(28px, 4vh, 48px)", flexWrap: "wrap" }}>
          <div>
            <Eyebrow text="Leasing Paths" />
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, ease: EASE, delay: 0.16 }}
              style={{
                fontFamily: "var(--font-montserrat)",
                fontWeight: 800,
                fontSize: "clamp(2.4rem, 5vw, 5.8rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.95)",
                margin: 0,
              }}
            >
              Four paths to<br />
              your <span style={{ color: "#C9A96E" }}>presence.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.28 }}
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "clamp(13px, 1.05vw, 15px)",
              lineHeight: 1.78,
              color: "rgba(255,255,255,0.42)",
              maxWidth: "380px",
              margin: 0,
              letterSpacing: "0.01em",
            }}
          >
            Each path is built for a different brand ambition — with its own
            spaces, audiences, and commercial logic. Pick the one that fits.
          </motion.p>
        </div>

        {/* 2×2 category grid */}
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "clamp(10px, 1vw, 16px)",
            minHeight: 0,
          }}
        >
          {LEASING_ORDER.map((slug, i) => {
            const cat = LEASING[slug];
            return (
              <motion.button
                key={slug}
                initial={{ opacity: 0, y: 22, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.65, ease: EASE, delay: 0.25 + i * 0.08 }}
                whileHover={{ scale: 1.015 }}
                onClick={() => onGoTo(i + 1)}
                style={{
                  position: "relative",
                  borderRadius: "clamp(14px, 1.6vw, 22px)",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.08)",
                  cursor: "pointer",
                  background: "#111",
                  padding: 0,
                  textAlign: "left",
                }}
              >
                <img
                  src={cldWidth(cat.hero.src, 1200)}
                  alt={cat.label}
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(140deg, rgba(10,15,30,0.82) 0%, rgba(10,15,30,0.35) 45%, rgba(10,15,30,0.55) 100%)", pointerEvents: "none" }} />

                {/* Index number */}
                <div
                  style={{
                    position: "absolute",
                    top: "clamp(20px, 3vh, 36px)",
                    left: "clamp(22px, 2.5vw, 36px)",
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.30em",
                    color: "rgba(201,169,110,0.85)",
                  }}
                >
                  {cat.index} / 04
                </div>

                {/* Label */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "clamp(22px, 3vh, 36px)",
                    left: "clamp(22px, 2.5vw, 36px)",
                    right: "clamp(22px, 2.5vw, 36px)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontWeight: 700,
                      fontSize: "clamp(1.4rem, 2.4vw, 2.4rem)",
                      letterSpacing: "-0.02em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.95)",
                      lineHeight: 1,
                      marginBottom: "8px",
                    }}
                  >
                    {cat.label}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "10px",
                      fontWeight: 500,
                      letterSpacing: "0.20em",
                      textTransform: "uppercase",
                      color: "rgba(201,169,110,0.80)",
                    }}
                  >
                    <span>Explore</span>
                    <span>→</span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── CATEGORY DETAIL SLIDE ────────────────────────────────────────────────────

function CategorySlide({
  slug,
  index,
  openInquiry,
}: {
  slug: LeasingSlug;
  index: number;
  openInquiry: () => void;
}) {
  const cat = LEASING[slug];
  const topTenants = cat.tenants.slice(0, 5);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <CinematicBg src={cat.hero.src} />
      <SlideTopBar index={index} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "clamp(76px, 10vh, 110px) clamp(40px, 5vw, 80px) clamp(70px, 9vh, 110px)",
          gap: "clamp(24px, 3vw, 40px)",
          flexWrap: "wrap",
          zIndex: 3,
        }}
      >
        {/* LEFT: text + tenants */}
        <div style={{ flex: "0 1 660px", minWidth: 0, maxWidth: "700px" }}>
          <Eyebrow text={`${cat.index} — ${cat.eyebrow}`} />
          <Headline>
            {cat.hero.headline}
            {cat.hero.headlineAccent && (
              <>
                <br />
                <span style={{ color: "#C9A96E" }}>{cat.hero.headlineAccent}</span>
              </>
            )}
          </Headline>
          <GoldRule />
          <Body>{cat.hero.subhead}</Body>

          {/* Tenant logo row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
            style={{
              display: "flex",
              flexWrap: "nowrap",
              gap: "6px",
              marginBottom: "18px",
            }}
          >
            {topTenants.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.38 + i * 0.05 }}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  width: "clamp(110px, 11vw, 134px)",
                  height: "clamp(62px, 6vw, 76px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.20)",
                }}
              >
                {t.logo ? (
                  <img
                    src={t.logo}
                    alt={t.name}
                    loading="eager"
                    style={{
                      maxWidth: "80%",
                      maxHeight: "70%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <span
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "10px",
                      fontWeight: 600,
                      color: "#0A0F1E",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {t.name}
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
            whileHover={{ scale: 1.03, filter: "brightness(1.1)" }}
            whileTap={{ scale: 0.97 }}
            onClick={openInquiry}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "14px 32px",
              borderRadius: "9999px",
              background: "#C9A96E",
              border: "none",
              fontFamily: "var(--font-montserrat)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#0A0A06",
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(201,169,110,0.25)",
            }}
          >
            Inquire About {cat.eyebrow}
            <span>→</span>
          </motion.button>
        </div>

        {/* RIGHT: stats + spaces */}
        <div
          style={{
            flex: "0 1 420px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.22 }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            {cat.numbers.map((n, i) => (
              <StatCard
                key={n.label}
                value={n.value}
                label={n.label}
                foot={n.foot}
                delay={0.28 + i * 0.08}
              />
            ))}
          </motion.div>

          {/* Featured testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
            style={{
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              padding: "clamp(18px, 2.5vh, 26px) clamp(20px, 2vw, 28px)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-fraunces)",
                fontStyle: "italic",
                fontSize: "clamp(13px, 1vw, 15px)",
                lineHeight: 1.60,
                color: "rgba(255,255,255,0.70)",
                marginBottom: "14px",
              }}
            >
              &ldquo;{cat.testimonial.quote}&rdquo;
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "20px", height: "1px", background: "rgba(201,169,110,0.60)" }} />
              <div>
                <div style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", fontWeight: 600, color: "rgba(255,255,255,0.70)", letterSpacing: "0.04em" }}>
                  {cat.testimonial.author}
                </div>
                <div style={{ fontFamily: "var(--font-montserrat)", fontSize: "9px", color: "rgba(201,169,110,0.65)", letterSpacing: "0.10em", textTransform: "uppercase", marginTop: "3px" }}>
                  {cat.testimonial.role}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── DECK NAV ─────────────────────────────────────────────────────────────────

function DeckNav({
  current,
  total,
  onGoTo,
  onPrev,
  onNext,
}: {
  current: number;
  total: number;
  onGoTo: (i: number) => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      {/* Right-side dot nav */}
      <div
        style={{
          position: "fixed",
          right: "clamp(18px, 2.2vw, 32px)",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 30,
          display: "flex",
          flexDirection: "column",
          gap: "9px",
          alignItems: "center",
        }}
      >
        {NAV_LABELS.map((label, idx) => {
          const isActive = current === idx;
          const isPassed = current > idx;
          return (
            <div key={label} style={{ position: "relative" }}>
              <AnimatePresence>
                {hovered === idx && (
                  <motion.div
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.18 }}
                    style={{
                      position: "absolute",
                      right: "calc(100% + 11px)",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "rgba(18,22,40,0.92)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      borderRadius: "8px",
                      padding: "5px 11px",
                      whiteSpace: "nowrap",
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "10px",
                      fontWeight: 500,
                      letterSpacing: "0.07em",
                      color: "rgba(255,255,255,0.65)",
                      pointerEvents: "none",
                    }}
                  >
                    {label}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => onGoTo(idx)}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                aria-label={`Go to slide: ${label}`}
                style={{
                  width: "24px",
                  height: "24px",
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <motion.div
                  animate={{
                    width: isActive ? 10 : 6,
                    height: isActive ? 10 : 6,
                    background: isActive ? "#C9A96E" : isPassed ? "rgba(201,169,110,0.36)" : "rgba(255,255,255,0.22)",
                    boxShadow: isActive ? "0 0 14px rgba(201,169,110,0.65)" : "none",
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ borderRadius: "50%" }}
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom right: counter + arrows */}
      <div
        style={{
          position: "fixed",
          bottom: "clamp(22px, 3vh, 36px)",
          right: "clamp(36px, 5vw, 72px)",
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.14em",
            color: "rgba(255,255,255,0.22)",
            marginRight: "6px",
          }}
        >
          {String(current).padStart(2, "0")} / {String(total - 1).padStart(2, "0")}
        </span>

        <motion.button
          whileHover={{ background: "rgba(255,255,255,0.12)" }}
          whileTap={{ scale: 0.93 }}
          onClick={onPrev}
          aria-label="Previous slide"
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.10)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            opacity: current <= 0 ? 0.28 : 1,
            pointerEvents: current <= 0 ? "none" : "auto",
            transition: "opacity 0.3s ease",
          }}
        >
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>

        <motion.button
          whileHover={{ background: current < total - 1 ? "rgba(201,169,110,0.22)" : "rgba(255,255,255,0.12)" }}
          whileTap={{ scale: 0.93 }}
          onClick={onNext}
          aria-label="Next slide"
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: current < total - 1 ? "rgba(201,169,110,0.12)" : "rgba(255,255,255,0.06)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: `1px solid ${current < total - 1 ? "rgba(201,169,110,0.26)" : "rgba(255,255,255,0.10)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: current >= total - 1 ? "default" : "pointer",
            opacity: current >= total - 1 ? 0.28 : 1,
            pointerEvents: current >= total - 1 ? "none" : "auto",
            transition: "all 0.3s ease",
          }}
        >
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke={current < total - 1 ? "rgba(201,169,110,0.85)" : "rgba(255,255,255,0.55)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      </div>

      {/* Bottom progress bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "rgba(255,255,255,0.05)",
          zIndex: 30,
        }}
      >
        <motion.div
          animate={{ scaleX: (current + 1) / total }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, #C9A96E, rgba(201,169,110,0.50))",
            transformOrigin: "left center",
          }}
        />
      </div>
    </>
  );
}

// ─── MAIN ENGINE ──────────────────────────────────────────────────────────────

export default function LeasingDeck() {
  const [current, setCurrent] = useState(0);
  const { open } = useInquiry();
  const presentation = usePresentation();
  const wheelLock = useRef(false);
  const touchStart = useRef<number | null>(null);
  const currentRef = useRef(0);
  currentRef.current = current;

  // Sync with presentation mode
  useEffect(() => {
    if (presentation.state.isPresenting && presentation.state.currentDeck === "leasing") {
      setCurrent(presentation.state.slideIndex);
    }
  }, [presentation.state]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const goNext = useCallback(() => setCurrent((c) => Math.min(TOTAL - 1, c + 1)), []);
  const goPrev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), []);
  const goTo = useCallback((i: number) => setCurrent(i), []);

  // Keyboard
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isNext = e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " " || e.key === "Enter";
      const isPrev = e.key === "ArrowLeft" || e.key === "ArrowUp";
      if (!isNext && !isPrev) return;
      e.preventDefault();
      e.stopPropagation();
      if (isNext) setCurrent((c) => Math.min(TOTAL - 1, c + 1));
      else setCurrent((c) => Math.max(0, c - 1));
    }
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, []);

  // Wheel
  useEffect(() => {
    function onWheel(e: WheelEvent) {
      e.preventDefault();
      if (wheelLock.current) return;
      wheelLock.current = true;
      setTimeout(() => { wheelLock.current = false; }, 920);
      if (e.deltaY > 0) setCurrent((c) => Math.min(TOTAL - 1, c + 1));
      else setCurrent((c) => Math.max(0, c - 1));
    }
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  // Touch
  useEffect(() => {
    function onTouchStart(e: TouchEvent) {
      touchStart.current = e.touches[0].clientY;
    }
    function onTouchEnd(e: TouchEvent) {
      if (touchStart.current === null) return;
      const delta = touchStart.current - e.changedTouches[0].clientY;
      touchStart.current = null;
      if (Math.abs(delta) < 50) return;
      if (delta > 0) setCurrent((c) => Math.min(TOTAL - 1, c + 1));
      else setCurrent((c) => Math.max(0, c - 1));
    }
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const openForCategory = useCallback(
    (slug: LeasingSlug) => {
      open(LEASING[slug].inquiryType);
    },
    [open],
  );

  const slides = [
    <HubSlide key="hub" onGoTo={goTo} />,
    <CategorySlide key="luxury" slug="luxury" index={1} openInquiry={() => openForCategory("luxury")} />,
    <CategorySlide key="retail" slug="retail" index={2} openInquiry={() => openForCategory("retail")} />,
    <CategorySlide key="dining" slug="dining" index={3} openInquiry={() => openForCategory("dining")} />,
    <CategorySlide key="popup" slug="popup" index={4} openInquiry={() => openForCategory("popup")} />,
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        background: "#000",
        zIndex: 1,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={slideTx}
          style={{ position: "absolute", inset: 0 }}
        >
          {slides[current]}
        </motion.div>
      </AnimatePresence>

      <DeckNav
        current={current}
        total={TOTAL}
        onGoTo={goTo}
        onPrev={goPrev}
        onNext={goNext}
      />
    </div>
  );
}
