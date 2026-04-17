"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useInquiry } from "@/providers/InquiryProvider";
import { useMenu } from "@/providers/MenuProvider";
import { usePresentation } from "@/providers/PresentationProvider";
import type { InquiryType } from "@/components/InquiryModal";
import Link from "next/link";
import { LEASING } from "@/lib/leasing";

// ─── constants ────────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const;

const HERO_VIDEO =
  "https://res.cloudinary.com/dwo1snivu/video/upload/v1775988777/InShot_20260412_152744988_ocz9ev.mp4";
const HERO_POSTER =
  "https://res.cloudinary.com/dwo1snivu/video/upload/so_0,w_1920/v1775988777/InShot_20260412_152744988_ocz9ev.jpg";
const AD_LOGO =
  "https://res.cloudinary.com/dwo1snivu/image/upload/v1776278785/American_Dream__Symbol_ldufrd.svg";

const IMG = {
  luxury:
    "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776186621/pexels-ansar-muhammad-380085065-27626759_xddsbd.jpg",
  atelier:
    "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776186621/dsign_a_ultra_202604142235_pkisyf.jpg",
  privateShop:
    "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776186621/make_it_from_202604142239_k6k1bg.jpg",
  elevated:
    "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776186777/make_this_imaeg_202604112355_tb0m53.jpg",
  exterior:
    "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776112403/can_i_make_202604140151_qst4fp.jpg",
  interior:
    "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776186621/pexels-valent-lau-1438552412-32102403_ncxgzs.jpg",
  arena:
    "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776112403/ultra_realistic_large_202604140202_pyoob9.jpg",
  concert:
    "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776191272/pexels-jibarofoto-18482996_ivrrqm.jpg",
  dining:
    "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776364532/make_similar_image_this_202604170005_zka2w4.jpg",
  retreat:
    "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776112403/can_u_make_202604140200_p44je8.jpg",
  brandLaunch:
    "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776191274/make_it_again_202604142348_ruouug.jpg",
};

const STORY_IMAGE =
  "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776103089/hey_i_want_202604132151-Photoroom_iyqmhr.png";

const COLLAGE_IMGS = [
  {
    src: "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776112403/can_i_make_202604140151_qst4fp.jpg",
    label: "The Destination",
    sub: "A city within a city.",
  },
  {
    src: "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776112403/can_u_make_202604140200_p44je8.jpg",
    label: "The Retreat",
    sub: "Hospitality & wellness.",
  },
  {
    src: "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776112403/ultra_realistic_large_202604140202_pyoob9.jpg",
    label: "The Arena",
    sub: "18,000-seat spectacle.",
  },
  {
    src: "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776112403/freepik_make-the-exact-smae-image_2777344525_tstorr.png",
    label: "Big SNOW",
    sub: "Indoor alpine resort.",
  },
  {
    src: "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776188306/this_is_dreamwork_202604142306_l6ecw3.jpg",
    label: "DreamWorks Water Park",
    sub: "North America's largest.",
  },
];

const NAV_LABELS = [
  "Welcome",
  "Retail & Revenue",
  "The Property",
  "The Audience",
  "Luxury Wing",
  "The Experience",
  "Retail & Brands",
  "Our Partners",
  "Dining",
  "Food & Restaurants",
  "Events",
  "Leasing Paths",
  "Venues",
  "Contact",
];

const TOTAL = NAV_LABELS.length; // 14 slides (0–13)

// ─── transition ───────────────────────────────────────────────────────────────

const slideVariants = {
  enter: { opacity: 0, scale: 1.05 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
};

const slideTx = { duration: 0.88, ease: EASE };

// ─── shared sub-components ────────────────────────────────────────────────────

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
      {/* Warm dark top-bottom gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(12,10,6,0.72) 0%, rgba(12,10,6,0.15) 38%, rgba(12,10,6,0.15) 55%, rgba(12,10,6,0.80) 100%)",
          pointerEvents: "none",
        }}
      />
      {/* Left readability panel */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg, rgba(12,10,6,0.80) 0%, rgba(12,10,6,0.35) 44%, transparent 68%)",
          pointerEvents: "none",
        }}
      />
      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 150px 60px rgba(12,10,6,0.50)",
          pointerEvents: "none",
        }}
      />
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
        padding:
          "clamp(22px, 3vh, 38px) clamp(36px, 5vw, 72px)",
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
        aria-label="Open menu"
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
          <img
            src={AD_LOGO}
            alt="American Dream"
            style={{ width: "20px", height: "20px" }}
          />
        </div>
        <span
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.75)",
          }}
        >
          Menu
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
      <div
        style={{
          width: "22px",
          height: "1px",
          background: "rgba(201,169,110,0.55)",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-montserrat)",
          fontSize: "9.5px",
          fontWeight: 500,
          letterSpacing: "0.46em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.38)",
        }}
      >
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
        fontSize: "clamp(2.6rem, 5.2vw, 5.8rem)",
        lineHeight: 0.92,
        letterSpacing: "-0.03em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.95)",
        margin: "0 0 22px",
        maxWidth: "660px",
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
        lineHeight: 1.80,
        color: "rgba(255,255,255,0.44)",
        maxWidth: "420px",
        margin: "0 0 32px",
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

function StatCard({
  value,
  label,
  delay = 0,
}: {
  value: string;
  label: string;
  delay?: number;
}) {
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
        padding: "clamp(16px, 2vh, 24px) clamp(14px, 1.6vw, 22px)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-montserrat)",
          fontWeight: 700,
          fontSize: "clamp(1.5rem, 2.3vw, 2.3rem)",
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
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.28)",
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

// ─── SLIDE 0 — SPLASH ─────────────────────────────────────────────────────────

function SplashSlide({ onEnter }: { onEnter: () => void }) {
  const [phase, setPhase] = useState(0); // 0 = "Not a mall", 1 = "American Dream"

  // Loop: 0 → 1 → 0 → 1 ...
  useEffect(() => {
    const durations = [3200, 4000]; // how long each phase shows
    const timer = setTimeout(
      () => setPhase((p) => (p + 1) % 2),
      durations[phase],
    );
    return () => clearTimeout(timer);
  }, [phase]);

  const SPLASH_STATS = [
    { value: "40M+", label: "Annual Visitors" },
    { value: "3M ft²", label: "Total Space" },
    { value: "450+", label: "Brand Partners" },
    { value: "$2B+", label: "Platform Value" },
  ];

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
      {/* Full-quality background video */}
      <video
        src={HERO_VIDEO}
        poster={HERO_POSTER}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Deep blue overlay stack — extra heavy */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(10,15,30,0.52)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,15,30,0.82) 0%, rgba(10,15,30,0.35) 28%, rgba(10,15,30,0.35) 55%, rgba(10,15,30,0.90) 100%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 260px 110px rgba(10,15,30,0.65)", pointerEvents: "none" }} />

      {/* Ambient gold orb */}
      <div aria-hidden style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: "600px", height: "600px", background: "radial-gradient(ellipse at center, rgba(201,169,110,0.06) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />

      {/* Dot grid texture */}
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none", zIndex: 1 }} />

      {/* ── Center content — looping text ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: 3,
          padding: "0 clamp(24px, 5vw, 80px)",
          paddingBottom: "clamp(80px, 12vh, 120px)",
        }}
      >
        {/* Gold decorative line — always visible */}
        <div
          style={{
            width: "60px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.50), transparent)",
            marginBottom: "28px",
          }}
        />

        <AnimatePresence mode="wait">
          {phase === 0 ? (
            <motion.div
              key="tagline"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.8, ease: EASE }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              {/* Line 1: "Not A Mall" */}
              <div style={{ overflow: "hidden" }}>
                <motion.h1
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 700,
                    fontSize: "clamp(3rem, 6.5vw, 7.2rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.95)",
                    margin: 0,
                  }}
                >
                  Not a mall
                </motion.h1>
              </div>
              {/* Line 2: "This is a Platform" */}
              <div style={{ overflow: "hidden" }}>
                <motion.h1
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 700,
                    fontSize: "clamp(3rem, 6.5vw, 7.2rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.95)",
                    margin: "4px 0 0",
                  }}
                >
                  This is a{" "}
                  <span
                    style={{
                      fontFamily: "var(--font-fraunces)",
                      fontWeight: 500,
                      fontStyle: "italic",
                      letterSpacing: "-0.02em",
                      color: "#C9A96E",
                      textShadow: "0 0 80px rgba(201,169,110,0.20)",
                    }}
                  >
                    Platform
                  </span>
                </motion.h1>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="brand"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.8, ease: EASE }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <div style={{ overflow: "hidden" }}>
                <motion.h1
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 600,
                    fontSize: "clamp(3rem, 6.5vw, 7.2rem)",
                    lineHeight: 1,
                    letterSpacing: "0.20em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.95)",
                    margin: 0,
                  }}
                >
                  American
                </motion.h1>
              </div>
              <div style={{ overflow: "hidden" }}>
                <motion.h1
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.22 }}
                  style={{
                    fontFamily: "var(--font-fraunces)",
                    fontWeight: 500,
                    fontStyle: "italic",
                    fontSize: "clamp(4.2rem, 8.5vw, 10rem)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.02em",
                    color: "#C9A96E",
                    margin: 0,
                    textShadow: "0 0 80px rgba(201,169,110,0.20)",
                  }}
                >
                  Dream
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "9px",
                  fontWeight: 400,
                  letterSpacing: "0.40em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.25)",
                  margin: "16px 0 0",
                }}
              >
                Meadowlands, New Jersey
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Slide-to-enter slider ── */}
        <SlideToEnter onComplete={onEnter} />
      </div>
    </div>
  );
}

// Premium slide-to-enter component
function SlideToEnter({ onComplete }: { onComplete: () => void }) {
  const TRACK_WIDTH = 320;
  const HANDLE_SIZE = 52;
  const MAX_DRAG = TRACK_WIDTH - HANDLE_SIZE - 8; // 8 = padding

  const x = useMotionValue(0);
  const handleOpacity = useTransform(x, [0, MAX_DRAG * 0.5, MAX_DRAG], [1, 0.6, 0]);
  const textOpacity = useTransform(x, [0, MAX_DRAG * 0.4], [1, 0]);
  const bgProgress = useTransform(x, [0, MAX_DRAG], [0, 1]);
  const [done, setDone] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay: 1.2 }}
      style={{
        position: "absolute",
        bottom: "clamp(44px, 7vh, 72px)",
      }}
    >
      <div
        ref={trackRef}
        style={{
          position: "relative",
          width: `${TRACK_WIDTH}px`,
          height: `${HANDLE_SIZE + 8}px`,
          borderRadius: "9999px",
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(32px) saturate(160%)",
          WebkitBackdropFilter: "blur(32px) saturate(160%)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow:
            "0 12px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
          padding: "4px",
          overflow: "hidden",
        }}
      >
        {/* Gold fill that follows the handle */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "100%",
            borderRadius: "9999px",
            background:
              "linear-gradient(90deg, rgba(201,169,110,0.15), rgba(201,169,110,0.08))",
            scaleX: bgProgress,
            transformOrigin: "left center",
          }}
        />

        {/* Center text */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: textOpacity,
            pointerEvents: "none",
          }}
        >
          {/* Shimmer animation */}
          <motion.span
            animate={{
              backgroundPosition: ["200% center", "-200% center"],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
              paddingLeft: `${HANDLE_SIZE}px`,
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.45) 0%, rgba(201,169,110,0.90) 50%, rgba(255,255,255,0.45) 100%)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Slide to explore
          </motion.span>
        </motion.div>

        {/* Draggable handle */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: MAX_DRAG }}
          dragElastic={0}
          dragMomentum={false}
          style={{
            x,
            position: "relative",
            zIndex: 2,
            width: `${HANDLE_SIZE}px`,
            height: `${HANDLE_SIZE}px`,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgba(201,169,110,0.90), rgba(201,169,110,0.65))",
            boxShadow:
              "0 4px 16px rgba(201,169,110,0.30), 0 2px 6px rgba(0,0,0,0.20)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "grab",
            touchAction: "none",
          }}
          whileTap={{ cursor: "grabbing", scale: 0.96 }}
          onDragEnd={(_, info) => {
            if (info.offset.x > MAX_DRAG * 0.65 && !done) {
              setDone(true);
              onComplete();
            }
          }}
        >
          {/* Arrow icon inside handle */}
          <motion.div
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12H19M19 12L13 6M19 12L13 18"
                stroke="rgba(10,15,30,0.85)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── SLIDE 1 — RETAIL & REVENUE (StorySlides) ────────────────────────────────

const STORY_SLIDES = [
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

const STORY_INTERVAL = 4000;

function StoryDeckSlide() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % STORY_SLIDES.length);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(next, STORY_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next, current]);

  const slide = STORY_SLIDES[current];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "#0A0F1E",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(80px, 11vh, 110px) clamp(36px, 5vw, 88px) clamp(50px, 7vh, 80px)",
        overflow: "hidden",
      }}
    >
      {/* Ambient orbs */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-25%",
          left: "10%",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(ellipse at center, rgba(201,169,110,0.09) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "5%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(ellipse at center, rgba(60,100,220,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      {/* Dot grid */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }}
      />

      <SlideTopBar index={1} />

      {/* ── Glass container ── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "1480px",
          height: "100%",
          maxHeight: "860px",
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(32px) saturate(140%)",
          WebkitBackdropFilter: "blur(32px) saturate(140%)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "clamp(20px, 2.2vw, 32px)",
          boxShadow:
            "0 40px 100px -30px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.06)",
          padding: "clamp(36px, 5vh, 64px) clamp(32px, 5vw, 80px)",
          display: "flex",
          alignItems: "center",
          gap: "clamp(32px, 5vw, 100px)",
          overflow: "hidden",
        }}
      >
        {/* ── LEFT: Product image ── */}
        <motion.div
          initial={{ opacity: 0, x: -32, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, ease: EASE }}
          style={{
            position: "relative",
            flex: "1 1 55%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            minWidth: 0,
          }}
        >
          {/* Warm glow under image */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: "-10%",
              background:
                "radial-gradient(ellipse 55% 55% at 50% 55%, rgba(201,169,110,0.10) 0%, transparent 70%)",
              filter: "blur(50px)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />
          <img
            src={STORY_IMAGE}
            alt="Luxury retail storefront"
            loading="eager"
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: "720px",
              height: "auto",
              objectFit: "contain",
              filter:
                "drop-shadow(0 50px 80px rgba(0,0,0,0.40)) drop-shadow(0 14px 28px rgba(0,0,0,0.20))",
              userSelect: "none",
            }}
            draggable={false}
          />
        </motion.div>

        {/* ── RIGHT: Auto-rotating text ── */}
        <div
          style={{
            flex: "0 1 440px",
            minWidth: 0,
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Eyebrow text="01 — Retail & Revenue" />

          {/* Sliding content */}
          <div style={{ minHeight: "300px" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.42, ease: EASE }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 700,
                    fontSize: "clamp(2rem, 3.8vw, 4rem)",
                    lineHeight: 1,
                    letterSpacing: "0.015em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.93)",
                    margin: 0,
                  }}
                >
                  {slide.headline}
                </h2>
                <h2
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 700,
                    fontSize: "clamp(2rem, 3.8vw, 4rem)",
                    lineHeight: 0.94,
                    letterSpacing: "0.015em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.93)",
                    margin: 0,
                  }}
                >
                  {slide.headline2}
                </h2>

                <div
                  style={{
                    width: "48px",
                    height: "1px",
                    background:
                      "linear-gradient(90deg, rgba(201,169,110,0.70), transparent)",
                    margin: "36px 0 28px",
                  }}
                />

                <p
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "15px",
                    lineHeight: 1.72,
                    color: "rgba(255,255,255,0.42)",
                    letterSpacing: "-0.005em",
                    maxWidth: "380px",
                    margin: 0,
                    fontWeight: 400,
                  }}
                >
                  {slide.sub}
                </p>

                {/* Stats — glass on dark */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginTop: "40px",
                  }}
                >
                  {slide.stats.map((s) => (
                    <div
                      key={s.label}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                        background: "rgba(255,255,255,0.06)",
                        backdropFilter: "blur(24px) saturate(160%)",
                        WebkitBackdropFilter: "blur(24px) saturate(160%)",
                        border: "1px solid rgba(255,255,255,0.10)",
                        borderRadius: "14px",
                        padding: "16px 22px",
                        boxShadow:
                          "0 8px 28px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.06)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-montserrat)",
                          fontSize: "20px",
                          fontWeight: 600,
                          letterSpacing: "-0.02em",
                          color: "rgba(255,255,255,0.92)",
                          lineHeight: 1,
                        }}
                      >
                        {s.value}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-montserrat)",
                          fontSize: "8.5px",
                          fontWeight: 500,
                          letterSpacing: "0.24em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.30)",
                          lineHeight: 1,
                        }}
                      >
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress dots */}
          <div style={{ display: "flex", gap: "6px", marginTop: "28px" }}>
            {STORY_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrent(i);
                  if (timerRef.current) clearInterval(timerRef.current);
                  timerRef.current = setInterval(next, STORY_INTERVAL);
                }}
                aria-label={`Go to slide ${i + 1}: ${STORY_SLIDES[i].headline}`}
                style={{
                  width: i === current ? "28px" : "8px",
                  height: "3px",
                  borderRadius: "2px",
                  background:
                    i === current ? "#C9A96E" : "rgba(255,255,255,0.10)",
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
    </div>
  );
}

// ─── SLIDE 2 — THE PROPERTY ───────────────────────────────────────────────────

function PropertySlide() {
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
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-25%",
          right: "2%",
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(ellipse at center, rgba(201,169,110,0.11) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-25%",
          left: "5%",
          width: "520px",
          height: "520px",
          background:
            "radial-gradient(ellipse at center, rgba(60,100,200,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      {/* Dot grid texture */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.024) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }}
      />
      {/* Top gold line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "8%",
          right: "8%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(201,169,110,0.18), transparent)",
        }}
      />

      <SlideTopBar index={2} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          padding:
            "clamp(80px, 12vh, 120px) clamp(40px, 6vw, 96px) clamp(60px, 8vh, 100px)",
          gap: "clamp(36px, 5vw, 90px)",
          flexWrap: "wrap",
          zIndex: 2,
        }}
      >
        {/* Left: text */}
        <div style={{ flex: "1 1 340px", minWidth: 0 }}>
          <Eyebrow text="02 — Why This Property" />
          <Headline>
            The #1 destination
            <br />
            in the{" "}
            <span style={{ color: "#C9A96E" }}>West.</span>
          </Headline>
          <GoldRule />
          <Body>
            40 million annual visitors. 3 million square feet. Five miles from
            Manhattan. American Dream isn&rsquo;t a mall — it&rsquo;s the
            world&rsquo;s most powerful retail and entertainment platform.
          </Body>
        </div>

        {/* Right: stat grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
          style={{
            flex: "1 1 280px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
          }}
        >
          <StatCard value="40M+" label="Annual Visitors" delay={0.26} />
          <StatCard value="3M ft²" label="Total Footprint" delay={0.33} />
          <StatCard value="5 mi" label="From Midtown NYC" delay={0.40} />
          <StatCard value="450+" label="Brand Partners" delay={0.46} />
          <StatCard value="$2B+" label="Development Value" delay={0.52} />
          <StatCard value="98%" label="Occupancy Rate" delay={0.58} />
        </motion.div>
      </div>
    </div>
  );
}

// ─── SLIDE 2 — THE AUDIENCE ───────────────────────────────────────────────────

function AudienceSlide() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <CinematicBg src={IMG.atelier} />
      <SlideTopBar index={3} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          padding:
            "clamp(80px, 12vh, 120px) clamp(40px, 6vw, 96px) clamp(60px, 8vh, 100px)",
          gap: "clamp(36px, 5vw, 80px)",
          flexWrap: "wrap",
          zIndex: 3,
        }}
      >
        <div style={{ flex: "1 1 360px", minWidth: 0 }}>
          <Eyebrow text="03 — The Audience" />
          <Headline>
            The audience
            <br />
            you{" "}
            <span style={{ color: "#C9A96E" }}>want.</span>
          </Headline>
          <GoldRule />
          <Body>
            Affluent. Young. International. The highest-value consumer profile in
            the western hemisphere — spending 4× longer than the national average
            — right at your door.
          </Body>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
          style={{
            flex: "1 1 280px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
          }}
        >
          <StatCard value="$128K" label="Median HH Income" delay={0.26} />
          <StatCard value="35%" label="International" delay={0.33} />
          <StatCard value="18–44" label="Core Age Range" delay={0.40} />
          <StatCard value="4.2 hrs" label="Avg Dwell Time" delay={0.46} />
          <StatCard value="3×" label="National Dwell Avg" delay={0.52} />
          <StatCard value="60M+" label="NYC Tourists / yr" delay={0.58} />
        </motion.div>
      </div>
    </div>
  );
}

// ─── SLIDE 3 — LUXURY WING ────────────────────────────────────────────────────

function LuxurySlide() {
  const BRANDS = [
    "Chanel",
    "Hermès",
    "Gucci",
    "Dior",
    "Louis Vuitton",
    "Prada",
    "Cartier",
    "Tiffany & Co.",
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <CinematicBg src={IMG.luxury} />
      <SlideTopBar index={4} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          padding:
            "clamp(80px, 12vh, 120px) clamp(40px, 6vw, 96px) clamp(60px, 8vh, 100px)",
          gap: "clamp(36px, 5vw, 80px)",
          flexWrap: "wrap",
          zIndex: 3,
        }}
      >
        <div style={{ flex: "1 1 400px", minWidth: 0 }}>
          <Eyebrow text="04 — The Luxury Wing" />
          <Headline>
            Where luxury
            <br />
            feels{" "}
            <span style={{ color: "#C9A96E" }}>different.</span>
          </Headline>
          <GoldRule />
          <Body>
            An elevated wing designed for the world&rsquo;s most discerning
            brands — where every detail signals exclusivity and every visit feels
            private.
          </Body>

          {/* Brand tags */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.34 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}
          >
            {BRANDS.map((brand, i) => (
              <motion.span
                key={brand}
                initial={{ opacity: 0, scale: 0.90 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.38,
                  ease: EASE,
                  delay: 0.34 + i * 0.055,
                }}
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(201,169,110,0.72)",
                  background: "rgba(201,169,110,0.08)",
                  border: "1px solid rgba(201,169,110,0.16)",
                  borderRadius: "9999px",
                  padding: "6px 14px",
                }}
              >
                {brand}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
          style={{
            flex: "0 1 240px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <StatCard value="60+" label="Luxury Flagships" delay={0.30} />
          <StatCard value="$840K+" label="Luxury Lease / mo" delay={0.38} />
          <StatCard value="Private" label="Shopping Suites" delay={0.46} />
        </motion.div>
      </div>
    </div>
  );
}

// ─── SLIDE 5 — THE EXPERIENCE (collage) ───────────────────────────────────────

function ExperienceCollageSlide() {
  const GRID = [
    {
      src: COLLAGE_IMGS[0].src,
      label: "The Destination",
      span: "row1col1",
    },
    {
      src: COLLAGE_IMGS[1].src,
      label: "The Retreat",
      span: "row1col2",
    },
    {
      src: COLLAGE_IMGS[4].src,
      label: "DreamWorks Water Park",
      span: "row1col3",
    },
    {
      src: COLLAGE_IMGS[2].src,
      label: "The Arena",
      span: "row2col1",
    },
    {
      src: COLLAGE_IMGS[3].src,
      label: "Big SNOW",
      span: "row2col2",
    },
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "#0A0F1E",
        overflow: "hidden",
      }}
    >
      <SlideTopBar index={5} />

      {/* ── Main layout: text panel left + image grid right ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: "clamp(300px, 32vw, 420px) 1fr",
          zIndex: 2,
        }}
      >
        {/* LEFT: Text panel */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "clamp(80px, 10vh, 120px) clamp(28px, 3vw, 48px) clamp(40px, 5vh, 64px) clamp(36px, 4vw, 64px)",
            overflow: "hidden",
          }}
        >
          {/* Ambient gold glow behind headline */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "30%",
              left: "10%",
              width: "300px",
              height: "300px",
              background: "radial-gradient(ellipse at center, rgba(201,169,110,0.08) 0%, transparent 70%)",
              filter: "blur(60px)",
              pointerEvents: "none",
            }}
          />

          {/* Section number — large faded ornament */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.05 }}
            aria-hidden
            style={{
              position: "absolute",
              top: "clamp(60px, 8vh, 100px)",
              right: "clamp(16px, 2vw, 32px)",
              fontFamily: "var(--font-montserrat)",
              fontWeight: 800,
              fontSize: "clamp(100px, 14vw, 180px)",
              lineHeight: 1,
              color: "rgba(255,255,255,0.020)",
              letterSpacing: "-0.04em",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            05
          </motion.div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <Eyebrow text="05 — The Experience" />

            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, ease: EASE, delay: 0.16 }}
              style={{
                fontFamily: "var(--font-montserrat)",
                fontWeight: 800,
                fontSize: "clamp(2.2rem, 4vw, 4.2rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.95)",
                margin: "0 0 22px",
              }}
            >
              Endless<br />
              <span style={{ color: "#C9A96E" }}>thrills.</span>
            </motion.h2>

            <GoldRule />

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.26 }}
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "clamp(13px, 1.05vw, 15px)",
                lineHeight: 1.80,
                color: "rgba(255,255,255,0.44)",
                maxWidth: "340px",
                margin: "0 0 36px",
                letterSpacing: "0.01em",
              }}
            >
              Four anchors. One destination. Retail, culture, thrill
              and spectacle — all engineered to keep visitors for hours.
            </motion.p>

            {/* Vertical feature list */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.32 }}
              style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}
            >
              {["Indoor Water Park", "Indoor Ski Resort", "18K-Seat Arena", "Ferris Wheel & Rides"].map((feat, i) => (
                <motion.div
                  key={feat}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: EASE, delay: 0.34 + i * 0.06 }}
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(201,169,110,0.55)", flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.50)", letterSpacing: "0.04em" }}>
                    {feat}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.42 }}
              style={{ display: "flex", gap: "10px" }}
            >
              <StatCard value="12" label="Attractions" delay={0.44} />
              <StatCard value="4.2 hrs" label="Avg Dwell" delay={0.52} />
            </motion.div>
          </div>
        </div>

        {/* RIGHT: Full-height image grid — 3 cols, 2 rows */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "clamp(5px, 0.5vw, 8px)",
            padding: "clamp(5px, 0.5vw, 8px) clamp(5px, 0.5vw, 8px) clamp(5px, 0.5vw, 8px) 0",
          }}
        >
          {GRID.map((item, i) => {
            // Row 1: Destination | Retreat | Water Park (3 images)
            // Row 2: Arena | Big SNOW spans 2 cols
            const gridStyle: React.CSSProperties =
              i === 4 ? { gridColumn: "2 / 4" } : {};

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.65, ease: EASE, delay: 0.12 + i * 0.09 }}
                style={{
                  position: "relative",
                  borderRadius: "clamp(12px, 1.4vw, 20px)",
                  overflow: "hidden",
                  background: "#111",
                  ...gridStyle,
                }}
              >
                <img
                  src={item.src}
                  alt={item.label}
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
                {/* Cinematic overlay */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,6,2,0.62) 0%, rgba(8,6,2,0.05) 50%, rgba(8,6,2,0.18) 100%)", pointerEvents: "none" }} />
                {/* Inner border */}
                <div style={{ position: "absolute", inset: 0, borderRadius: "inherit", border: "1px solid rgba(255,255,255,0.07)", pointerEvents: "none" }} />
                {/* Label */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "clamp(10px, 1.4vh, 18px)",
                    left: "clamp(12px, 1vw, 20px)",
                    zIndex: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div style={{ width: "12px", height: "1px", background: "rgba(201,169,110,0.65)" }} />
                  <span
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "clamp(8px, 0.75vw, 11px)",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.90)",
                      textShadow: "0 2px 10px rgba(0,0,0,0.50)",
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── SLIDE 6 — RETAIL & BRANDS ────────────────────────────────────────────────

function RetailSlide() {
  const CATEGORIES = [
    { label: "Luxury Flagships", count: "60+" },
    { label: "Premium Retail", count: "180+" },
    { label: "Dining & F&B", count: "100+" },
    { label: "Entertainment Anchors", count: "12" },
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <CinematicBg src={IMG.interior} />
      {/* Extra right-side darken for card readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(260deg, rgba(12,10,6,0.82) 0%, rgba(12,10,6,0.40) 45%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
      <SlideTopBar index={6} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          padding:
            "clamp(80px, 12vh, 120px) clamp(40px, 6vw, 96px) clamp(60px, 8vh, 100px)",
          gap: "clamp(36px, 5vw, 80px)",
          flexWrap: "wrap",
          zIndex: 3,
        }}
      >
        <div style={{ flex: "1 1 360px", minWidth: 0 }}>
          <Eyebrow text="06 — Retail & Brands" />
          <Headline>
            450+ brands.
            <br />
            One{" "}
            <span style={{ color: "#C9A96E" }}>address.</span>
          </Headline>
          <GoldRule />
          <Body>
            From global luxury maisons to high-frequency premium retail — every
            category, every price point, every lifestyle segment. All under one
            roof.
          </Body>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
          style={{
            flex: "0 1 380px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.45,
                ease: EASE,
                delay: 0.28 + i * 0.08,
              }}
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: "16px",
                padding: "20px 28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "14px",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                {cat.label}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "17px",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#C9A96E",
                }}
              >
                {cat.count}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ─── SLIDE 7 — OUR PARTNERS (brand marquee) ───────────────────────────────────

const BRAND_HERO =
  "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776272372/Retail_hero___202604152229_khq7rm.jpg";

function toBrand(t: { name: string; logo?: string }) {
  return t.logo ? { src: t.logo, alt: t.name } : null;
}

function getBrandLogos() {
  const all = [
    ...LEASING.luxury.tenants.map(toBrand),
    ...LEASING.dining.tenants.map(toBrand),
    ...LEASING.retail.tenants.map(toBrand),
    ...LEASING.popup.tenants.map(toBrand),
  ].filter((b): b is { src: string; alt: string } => b !== null);
  return all;
}

function BrandLogoCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: "clamp(160px, 15vw, 210px)",
        height: "clamp(110px, 11vw, 150px)",
        borderRadius: "18px",
        background: "#FFFFFF",
        border: "1px solid rgba(0,0,0,0.04)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(10px, 1vw, 16px)",
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        draggable={false}
        style={{
          maxWidth: "80%",
          maxHeight: "72%",
          width: "auto",
          height: "auto",
          objectFit: "contain",
          userSelect: "none",
        }}
      />
    </div>
  );
}

function BrandPartnersSlide() {
  const logos = getBrandLogos();
  const half = Math.ceil(logos.length / 2);
  const ROW1 = [...logos.slice(0, half), ...logos.slice(0, half), ...logos.slice(0, half)];
  const ROW2 = [...logos.slice(half), ...logos.slice(half), ...logos.slice(half)];

  const PARTNER_STATS = [
    { value: "450+", label: "Brand Partners" },
    { value: "85%", label: "Renewal Rate" },
    { value: "50+", label: "Flagships" },
    { value: "#1", label: "Destination" },
  ];

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
      {/* Background image — very dark overlay */}
      <img
        src={BRAND_HERO}
        alt=""
        aria-hidden
        loading="eager"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(10,15,30,0.88)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,15,30,0.60) 0%, rgba(10,15,30,0.30) 40%, rgba(10,15,30,0.50) 100%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 200px 80px rgba(10,15,30,0.50)", pointerEvents: "none" }} />

      <SlideTopBar index={7} />

      {/* ── Layout: 40% top (text + stats) / 60% bottom (marquee rows) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          zIndex: 2,
        }}
      >
        {/* TOP 40%: Text + stats centered */}
        <div
          style={{
            flex: "0 0 40%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "clamp(70px, 9vh, 100px) clamp(32px, 5vw, 80px) 0",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
            style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}
          >
            <div style={{ width: "22px", height: "1px", background: "rgba(201,169,110,0.55)" }} />
            <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "9.5px", fontWeight: 500, letterSpacing: "0.46em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)" }}>
              07 — Our Partners
            </span>
            <div style={{ width: "22px", height: "1px", background: "rgba(201,169,110,0.55)" }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, ease: EASE, delay: 0.16 }}
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 800,
              fontSize: "clamp(2.2rem, 4.8vw, 5.4rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.95)",
              margin: "0 0 24px",
            }}
          >
            A destination for the<br />
            world&rsquo;s leading{" "}
            <span style={{ color: "#C9A96E" }}>brands.</span>
          </motion.h2>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.28 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "14px",
              overflow: "hidden",
            }}
          >
            {PARTNER_STATS.map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  padding: "clamp(12px, 1.5vh, 18px) clamp(18px, 2vw, 32px)",
                  textAlign: "center",
                  borderRight: i < PARTNER_STATS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              >
                <div style={{ fontFamily: "var(--font-montserrat)", fontWeight: 700, fontSize: "clamp(1rem, 1.6vw, 1.4rem)", letterSpacing: "-0.02em", color: "rgba(255,255,255,0.88)", lineHeight: 1, marginBottom: "4px" }}>
                  {stat.value}
                </div>
                <div style={{ fontFamily: "var(--font-montserrat)", fontSize: "7.5px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* BOTTOM 60%: Dual marquee rows of brand logos */}
        <div
          style={{
            flex: "0 0 60%",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "clamp(10px, 1.2vw, 18px)",
          }}
        >
          {/* Fade masks left + right */}
          <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "clamp(60px, 8vw, 120px)", background: "linear-gradient(to right, rgba(10,15,30,0.98), transparent)", zIndex: 3, pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "clamp(60px, 8vw, 120px)", background: "linear-gradient(to left, rgba(10,15,30,0.98), transparent)", zIndex: 3, pointerEvents: "none" }} />

          {/* Row 1 — scrolls LEFT */}
          <div style={{ overflow: "hidden" }}>
            <motion.div
              animate={{ x: ["0%", "-33.333%"] }}
              transition={{ x: { duration: 40, repeat: Infinity, ease: "linear" } }}
              style={{ display: "flex", gap: "clamp(10px, 1.2vw, 18px)", width: "max-content" }}
            >
              {ROW1.map((logo, i) => (
                <BrandLogoCard key={`r1-${logo.alt}-${i}`} src={logo.src} alt={logo.alt} />
              ))}
            </motion.div>
          </div>

          {/* Row 2 — scrolls RIGHT */}
          <div style={{ overflow: "hidden" }}>
            <motion.div
              animate={{ x: ["-33.333%", "0%"] }}
              transition={{ x: { duration: 45, repeat: Infinity, ease: "linear" } }}
              style={{ display: "flex", gap: "clamp(10px, 1.2vw, 18px)", width: "max-content" }}
            >
              {ROW2.map((logo, i) => (
                <BrandLogoCard key={`r2-${logo.alt}-${i}`} src={logo.src} alt={logo.alt} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SLIDE 8 — DINING ─────────────────────────────────────────────────────────

function DiningSlide() {
  const RESTAURANTS = [
    "Carpaccio",
    "Mr. Beast Burger",
    "Little Sheep Hot Pot",
    "Mozzarella Bar",
    "Marcus Live",
    "American Dream Seafood",
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <CinematicBg src={IMG.dining} />
      {/* Extra overlay for dining */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(10,15,30,0.18)", pointerEvents: "none" }} />
      <SlideTopBar index={8} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          padding:
            "clamp(80px, 12vh, 120px) clamp(40px, 6vw, 96px) clamp(60px, 8vh, 100px)",
          gap: "clamp(36px, 5vw, 80px)",
          flexWrap: "wrap",
          zIndex: 3,
        }}
      >
        <div style={{ flex: "1 1 380px", minWidth: 0 }}>
          <Eyebrow text="08 — Dining & Lifestyle" />
          <Headline>
            Great eats
            <br />
            for{" "}
            <span style={{ color: "#C9A96E" }}>all.</span>
          </Headline>
          <GoldRule />
          <Body>
            100+ dining concepts — from Michelin-worthy tasting menus to quick
            bites between shopping. Taste buds delighted. Every occasion covered.
          </Body>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
            style={{ display: "flex", flexDirection: "column", gap: "7px" }}
          >
            {RESTAURANTS.map((r, i) => (
              <motion.div
                key={r}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.38, ease: EASE, delay: 0.3 + i * 0.06 }}
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "rgba(201,169,110,0.60)",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.48)",
                    letterSpacing: "0.01em",
                  }}
                >
                  {r}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
          style={{
            flex: "0 1 240px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <StatCard value="100+" label="Dining Concepts" delay={0.30} />
          <StatCard value="10+" label="Celebrity Chefs" delay={0.38} />
          <StatCard value="All-Day" label="F&B Coverage" delay={0.46} />
        </motion.div>
      </div>
    </div>
  );
}

// ─── SLIDE 8 — FOOD & RESTAURANTS (marquee cards) ─────────────────────────────

const FOOD_CARDS = [
  { name: "Carpaccio", tag: "Italian Fine Dining", src: "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776164039/Tagelli_Pasta__La_Mejor_Receta_F%C3%A1cil_y_R%C3%A1pida_pkgngh.jpg" },
  { name: "Mr. Beast Burger", tag: "Smash Burgers & Shakes", src: "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776164039/download_3_idzhl9.jpg" },
  { name: "American Dream Seafood", tag: "Fresh Catch Daily", src: "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776164039/Fresh_Seafood_Dish_royalty_free_stock_images_qlbzeb.jpg" },
  { name: "Little Sheep Hot Pot", tag: "Mongolian Hot Pot", src: "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776164039/Beef_and_Vegetable_Kabobs_with_Lemon_Herb_Marinade_fz0iqd.jpg" },
  { name: "Mozzarella Bar", tag: "Artisan Pizza & Pasta", src: "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776164039/usa_vkbqxv.jpg" },
  { name: "Marcus Live", tag: "Modern American Grill", src: "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776164039/FoodPhotography_FoodieGram_InstaFood_FoodStyling_FoodPics_FoodLover_Foodstagram_Yummy_Delicious_FoodPorn_HomeMadeFood_FoodArt_FoodBlogger_Tasty_FoodGasm_CulinaryPhotography_PlatingGoals_EatGoodFee_eb8kka.jpg" },
];

function FoodCard({ card }: { card: (typeof FOOD_CARDS)[number] }) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: "100%",
        borderRadius: "18px",
        overflow: "hidden",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 8px 28px rgba(0,0,0,0.18)",
      }}
    >
      <div style={{ position: "relative", aspectRatio: "3 / 4" }}>
        <img
          src={card.src}
          alt={card.name}
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
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "55%",
            background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "14px",
            left: "14px",
            right: "14px",
            zIndex: 2,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 600,
              fontSize: "14px",
              color: "rgba(255,255,255,0.92)",
              letterSpacing: "-0.005em",
              lineHeight: 1.2,
              marginBottom: "3px",
            }}
          >
            {card.name}
          </div>
          <div
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "10px",
              fontWeight: 400,
              color: "rgba(201,169,110,0.70)",
              letterSpacing: "0.04em",
            }}
          >
            {card.tag}
          </div>
        </div>
      </div>
    </div>
  );
}

function FoodRestaurantsSlide() {
  // Two columns: col1 scrolls down, col2 scrolls up — both infinite
  const COL1 = [...FOOD_CARDS, ...FOOD_CARDS, ...FOOD_CARDS];
  const COL2 = [...FOOD_CARDS.slice(3), ...FOOD_CARDS.slice(0, 3), ...FOOD_CARDS.slice(3), ...FOOD_CARDS.slice(0, 3), ...FOOD_CARDS.slice(3), ...FOOD_CARDS.slice(0, 3)];

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
      <div aria-hidden style={{ position: "absolute", top: "-20%", left: "15%", width: "600px", height: "600px", background: "radial-gradient(ellipse at center, rgba(201,169,110,0.07) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
      <div aria-hidden style={{ position: "absolute", bottom: "-15%", right: "10%", width: "500px", height: "500px", background: "radial-gradient(ellipse at center, rgba(60,100,220,0.06) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.018) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />

      <SlideTopBar index={9} />

      {/* Glass container — full slide */}
      <div
        style={{
          position: "absolute",
          inset: "clamp(68px, 9vh, 96px) clamp(20px, 2.5vw, 40px) clamp(20px, 2.5vh, 36px)",
          background: "rgba(255,255,255,0.035)",
          backdropFilter: "blur(32px) saturate(140%)",
          WebkitBackdropFilter: "blur(32px) saturate(140%)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "clamp(18px, 2vw, 28px)",
          boxShadow: "0 40px 100px -30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
          overflow: "hidden",
          display: "flex",
          zIndex: 2,
        }}
      >
        {/* LEFT 50%: Text + stats — packed */}
        <div
          style={{
            flex: "0 0 50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "clamp(28px, 4vh, 52px) clamp(32px, 3.5vw, 56px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Large faded number ornament */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: EASE }}
            aria-hidden
            style={{
              position: "absolute",
              top: "clamp(20px, 3vh, 40px)",
              right: "clamp(16px, 2vw, 32px)",
              fontFamily: "var(--font-montserrat)",
              fontWeight: 800,
              fontSize: "clamp(100px, 14vw, 200px)",
              lineHeight: 1,
              color: "rgba(255,255,255,0.018)",
              letterSpacing: "-0.04em",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            08
          </motion.div>

          {/* Gold ambient glow */}
          <div aria-hidden style={{ position: "absolute", bottom: "10%", left: "20%", width: "300px", height: "300px", background: "radial-gradient(ellipse at center, rgba(201,169,110,0.06) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <Eyebrow text="09 — Food & Restaurants" />
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.16 }}
              style={{
                fontFamily: "var(--font-montserrat)",
                fontWeight: 800,
                fontSize: "clamp(2.2rem, 4.2vw, 4.8rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.95)",
                margin: "0 0 22px",
              }}
            >
              Where every<br />
              bite is{" "}
              <span style={{ color: "#C9A96E" }}>an event.</span>
            </motion.h2>
            <GoldRule />
            <Body>
              From Michelin-worthy fine dining to the world&rsquo;s most viral
              fast-casual brands — 100+ concepts, every cuisine, every craving.
            </Body>

            {/* Feature list */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
              style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "28px" }}
            >
              {["Celebrity Chef Restaurants", "Global Street Food", "Fine Dining & Tasting Menus", "Quick-Serve & Viral Brands", "Full-Service Bars & Lounges"].map((feat, i) => (
                <motion.div
                  key={feat}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: EASE, delay: 0.32 + i * 0.05 }}
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(201,169,110,0.55)", flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.48)", letterSpacing: "0.03em" }}>
                    {feat}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.42 }}
              style={{ display: "flex", gap: "10px" }}
            >
              <StatCard value="100+" label="Restaurants" delay={0.44} />
              <StatCard value="10+" label="Celebrity Chefs" delay={0.52} />
              <StatCard value="24/7" label="F&B Coverage" delay={0.60} />
            </motion.div>
          </div>
        </div>

        {/* RIGHT 50%: Dual scrolling columns — edge to edge */}
        <div
          style={{
            flex: "0 0 50%",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            gap: "clamp(8px, 0.7vw, 12px)",
            padding: "0 clamp(8px, 1vw, 16px) 0 0",
          }}
        >
          {/* Fade masks */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "60px", background: "linear-gradient(to bottom, rgba(10,15,30,0.98), transparent)", zIndex: 3, pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60px", background: "linear-gradient(to top, rgba(10,15,30,0.98), transparent)", zIndex: 3, pointerEvents: "none" }} />

          {/* Column 1 — scrolls DOWN */}
          <div style={{ flex: 1, overflow: "hidden" }}>
            <motion.div
              animate={{ y: ["0%", "-33.333%"] }}
              transition={{ y: { duration: 28, repeat: Infinity, ease: "linear" } }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(8px, 0.7vw, 12px)",
              }}
            >
              {COL1.map((card, i) => (
                <FoodCard key={`c1-${card.name}-${i}`} card={card} />
              ))}
            </motion.div>
          </div>

          {/* Column 2 — scrolls UP */}
          <div style={{ flex: 1, overflow: "hidden" }}>
            <motion.div
              animate={{ y: ["-33.333%", "0%"] }}
              transition={{ y: { duration: 32, repeat: Infinity, ease: "linear" } }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(8px, 0.7vw, 12px)",
              }}
            >
              {COL2.map((card, i) => (
                <FoodCard key={`c2-${card.name}-${i}`} card={card} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SLIDE 9 — EVENTS ─────────────────────────────────────────────────────────

function EventsSlide() {
  const EVENT_TYPES = [
    "Arena Concerts & Touring Shows",
    "Celebrity Appearances",
    "Performing Arts & Theatre",
    "Expos & Trade Conventions",
    "Brand Launches & Activations",
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <CinematicBg src={IMG.concert} />
      <SlideTopBar index={10} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          padding:
            "clamp(80px, 12vh, 120px) clamp(40px, 6vw, 96px) clamp(60px, 8vh, 100px)",
          gap: "clamp(36px, 5vw, 80px)",
          flexWrap: "wrap",
          zIndex: 3,
        }}
      >
        <div style={{ flex: "1 1 360px", minWidth: 0 }}>
          <Eyebrow text="10 — Events & Venues" />
          <Headline>
            18,000 seats.
            <br />
            One{" "}
            <span style={{ color: "#C9A96E" }}>night.</span>
          </Headline>
          <GoldRule />
          <Body>
            From sold-out arena tours to intimate brand activations — a flexible
            venue ecosystem that handles 500+ events a year without missing a
            beat.
          </Body>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
            style={{ display: "flex", flexDirection: "column", gap: "7px" }}
          >
            {EVENT_TYPES.map((e, i) => (
              <motion.div
                key={e}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.38, ease: EASE, delay: 0.3 + i * 0.07 }}
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "rgba(201,169,110,0.60)",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.48)",
                    letterSpacing: "0.01em",
                  }}
                >
                  {e}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
          style={{
            flex: "0 1 240px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <StatCard value="18K" label="Arena Capacity" delay={0.30} />
          <StatCard value="500+" label="Events per Year" delay={0.38} />
          <StatCard value="30K ft²" label="Flex Event Space" delay={0.46} />
          <StatCard value="100+" label="Brand Activations" delay={0.54} />
        </motion.div>
      </div>
    </div>
  );
}

// ─── SLIDE 7 — LEASING PATHS ──────────────────────────────────────────────────

function LeasingSlide({
  openInquiry,
}: {
  openInquiry: (t?: InquiryType) => void;
}) {
  const PATHS = [
    { label: "Luxury Flagship", tag: "Premium wing · white-glove service" },
    { label: "Premium Retail", tag: "High-traffic zones · full fit-out support" },
    { label: "Dining Concepts", tag: "F&B destinations · all categories" },
    { label: "Pop-up & Activation", tag: "Short-term · maximum impact" },
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <CinematicBg src={IMG.elevated} />
      {/* Right-side darken for card readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(260deg, rgba(12,10,6,0.82) 0%, rgba(12,10,6,0.40) 45%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
      <SlideTopBar index={11} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          padding:
            "clamp(80px, 12vh, 120px) clamp(40px, 6vw, 96px) clamp(60px, 8vh, 100px)",
          gap: "clamp(36px, 5vw, 80px)",
          flexWrap: "wrap",
          zIndex: 3,
        }}
      >
        <div style={{ flex: "1 1 360px", minWidth: 0 }}>
          <Eyebrow text="11 — Leasing Paths" />
          <Headline>
            Your space.
            <br />
            <span style={{ color: "#C9A96E" }}>Elevated.</span>
          </Headline>
          <GoldRule />
          <Body>
            Four distinct leasing paths — each designed for a different brand
            ambition. Whether you&rsquo;re opening a flagship or testing a
            market, we have the right space.
          </Body>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.42 }}
            style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
          >
            <Link
              href="/leasing"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 30px",
                borderRadius: "9999px",
                background: "#C9A96E",
                fontFamily: "var(--font-montserrat)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.20em",
                textTransform: "uppercase",
                color: "#0A0A06",
                textDecoration: "none",
                boxShadow: "0 8px 32px rgba(201,169,110,0.22)",
              }}
            >
              Explore Leasing →
            </Link>
            <button
              onClick={() => openInquiry("leasing")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 30px",
                borderRadius: "9999px",
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.15)",
                fontFamily: "var(--font-montserrat)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.20em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.72)",
                cursor: "pointer",
              }}
            >
              Inquire Now
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
          style={{
            flex: "0 1 390px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {PATHS.map((path, i) => (
            <motion.div
              key={path.label}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.44, ease: EASE, delay: 0.28 + i * 0.08 }}
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: "16px",
                padding: "18px 24px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.80)",
                  letterSpacing: "0.01em",
                  marginBottom: "4px",
                }}
              >
                {path.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "10px",
                  fontWeight: 400,
                  color: "rgba(201,169,110,0.55)",
                  letterSpacing: "0.06em",
                }}
              >
                {path.tag}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ─── SLIDE 8 — VENUES ─────────────────────────────────────────────────────────

function VenuesSlide() {
  const VENUES = [
    { name: "The Arena", cap: "18,000", tag: "Concerts & spectacle" },
    {
      name: "Performing Arts Center",
      cap: "1,000",
      tag: "Theatre & culture",
    },
    { name: "Expo Hall", cap: "30K ft²", tag: "Trade shows & summits" },
    {
      name: "Private Event Suites",
      cap: "Up to 500",
      tag: "Exclusive experiences",
    },
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <CinematicBg src={IMG.arena} />
      <SlideTopBar index={12} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          padding:
            "clamp(80px, 12vh, 120px) clamp(40px, 6vw, 96px) clamp(60px, 8vh, 100px)",
          gap: "clamp(36px, 5vw, 80px)",
          flexWrap: "wrap",
          zIndex: 3,
        }}
      >
        <div style={{ flex: "1 1 360px", minWidth: 0 }}>
          <Eyebrow text="12 — Venues" />
          <Headline>
            Four world-class
            <br />
            <span style={{ color: "#C9A96E" }}>venues.</span>
          </Headline>
          <GoldRule />
          <Body>
            Every scale, every format, every audience. From sold-out arena nights
            to executive summits — a venue ecosystem built to deliver
            unforgettable experiences.
          </Body>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.42 }}
          >
            <Link
              href="/venues"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 30px",
                borderRadius: "9999px",
                background: "#C9A96E",
                fontFamily: "var(--font-montserrat)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.20em",
                textTransform: "uppercase",
                color: "#0A0A06",
                textDecoration: "none",
                boxShadow: "0 8px 32px rgba(201,169,110,0.22)",
              }}
            >
              Explore Venues →
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
          style={{
            flex: "0 1 400px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {VENUES.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.44, ease: EASE, delay: 0.28 + i * 0.08 }}
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: "16px",
                padding: "18px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.78)",
                    letterSpacing: "0.01em",
                    marginBottom: "3px",
                  }}
                >
                  {v.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "10px",
                    color: "rgba(255,255,255,0.32)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {v.tag}
                </div>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#C9A96E",
                  letterSpacing: "-0.01em",
                  flexShrink: 0,
                  marginLeft: "12px",
                }}
              >
                {v.cap}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ─── SLIDE 9 — CLOSING CTA ────────────────────────────────────────────────────

function CtaSlide({ openInquiry }: { openInquiry: (t?: InquiryType) => void }) {
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
      <CinematicBg src={IMG.privateShop} />
      {/* Extra overlay for CTA */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(10,15,30,0.35)", pointerEvents: "none" }} />
      <SlideTopBar index={13} />

      {/* Subtle ambient orb */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "800px",
          background:
            "radial-gradient(ellipse at center, rgba(201,169,110,0.07) 0%, transparent 65%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding:
            "clamp(80px, 12vh, 120px) clamp(40px, 5vw, 80px) clamp(60px, 8vh, 100px)",
          zIndex: 3,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "22px",
          }}
        >
          <div
            style={{
              width: "28px",
              height: "1px",
              background: "rgba(201,169,110,0.42)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "9.5px",
              fontWeight: 500,
              letterSpacing: "0.46em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.28)",
            }}
          >
            Ready to begin?
          </span>
          <div
            style={{
              width: "28px",
              height: "1px",
              background: "rgba(201,169,110,0.42)",
            }}
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.92, ease: EASE, delay: 0.16 }}
          style={{
            fontFamily: "var(--font-montserrat)",
            fontWeight: 800,
            fontSize: "clamp(3rem, 7vw, 8rem)",
            lineHeight: 0.87,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.95)",
            margin: "0 0 6px",
          }}
        >
          Let&rsquo;s build your
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.92, ease: EASE, delay: 0.24 }}
          style={{
            fontFamily: "var(--font-montserrat)",
            fontWeight: 800,
            fontSize: "clamp(3rem, 7vw, 8rem)",
            lineHeight: 0.87,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            color: "#C9A96E",
            margin: "0 0 40px",
          }}
        >
          presence here.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.32 }}
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: "clamp(13px, 1.1vw, 16px)",
            lineHeight: 1.78,
            color: "rgba(255,255,255,0.36)",
            maxWidth: "500px",
            margin: "0 0 44px",
            letterSpacing: "0.005em",
          }}
        >
          Whether you&rsquo;re leasing a flagship, launching a brand, or
          booking an 18,000-seat arena — we&rsquo;re ready when you are.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.40 }}
          whileHover={{ scale: 1.04, filter: "brightness(1.10)" }}
          whileTap={{ scale: 0.97 }}
          onClick={() => openInquiry("leasing")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            padding: "18px 52px",
            borderRadius: "9999px",
            background: "#C9A96E",
            border: "none",
            fontFamily: "var(--font-montserrat)",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "#0A0A06",
            cursor: "pointer",
            boxShadow:
              "0 0 80px rgba(201,169,110,0.28), 0 8px 40px rgba(201,169,110,0.20)",
          }}
        >
          Start a Conversation
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ display: "inline-block" }}
          >
            →
          </motion.span>
        </motion.button>
      </div>
    </div>
  );
}

// ─── DECK NAVIGATION ──────────────────────────────────────────────────────────

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
      {/* Right side vertical dot nav */}
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
        {NAV_LABELS.slice(1).map((label, i) => {
          const idx = i + 1;
          const isActive = current === idx;
          const isPassed = current > idx;
          return (
            <div key={label} style={{ position: "relative" }}>
              {/* Tooltip */}
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
                      background: "rgba(18,14,8,0.92)",
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
                    background: isActive
                      ? "#C9A96E"
                      : isPassed
                      ? "rgba(201,169,110,0.36)"
                      : "rgba(255,255,255,0.22)",
                    boxShadow: isActive
                      ? "0 0 14px rgba(201,169,110,0.65)"
                      : "none",
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ borderRadius: "50%" }}
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom right: counter + prev/next */}
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
            opacity: current <= 1 ? 0.28 : 1,
            pointerEvents: current <= 1 ? "none" : "auto",
            transition: "opacity 0.3s ease",
          }}
        >
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 3L5 8L10 13"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>

        <motion.button
          whileHover={{
            background:
              current < total - 1
                ? "rgba(201,169,110,0.22)"
                : "rgba(255,255,255,0.12)",
          }}
          whileTap={{ scale: 0.93 }}
          onClick={onNext}
          aria-label="Next slide"
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background:
              current < total - 1
                ? "rgba(201,169,110,0.12)"
                : "rgba(255,255,255,0.06)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: `1px solid ${
              current < total - 1
                ? "rgba(201,169,110,0.26)"
                : "rgba(255,255,255,0.10)"
            }`,
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
            <path
              d="M6 3L11 8L6 13"
              stroke={
                current < total - 1
                  ? "rgba(201,169,110,0.85)"
                  : "rgba(255,255,255,0.55)"
              }
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
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
          animate={{ scaleX: current / (total - 1) }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, #C9A96E, rgba(201,169,110,0.50))",
            transformOrigin: "left center",
          }}
        />
      </div>
    </>
  );
}

// ─── DECK ENGINE (main export) ────────────────────────────────────────────────

export default function DeckEngine() {
  const [current, setCurrent] = useState(0);
  const { open } = useInquiry();
  const presentation = usePresentation();
  const wheelLock = useRef(false);
  const touchStart = useRef<number | null>(null);

  // Sync with presentation mode
  useEffect(() => {
    if (presentation.state.isPresenting && presentation.state.currentDeck === "home") {
      setCurrent(presentation.state.slideIndex);
    }
  }, [presentation.state]);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const goNext = useCallback(
    () => setCurrent((c) => Math.min(TOTAL - 1, c === 0 ? 1 : c + 1)),
    [],
  );
  const goPrev = useCallback(() => setCurrent((c) => Math.max(1, c - 1)), []);
  const goTo = useCallback((i: number) => setCurrent(i), []);
  const handleEnter = useCallback(() => setCurrent(1), []);

  // Keyboard — blocked on splash (slide 0), button-only entry
  const currentRef = useRef(0);
  currentRef.current = current;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (currentRef.current === 0) return;
      const isNext = e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " " || e.key === "Enter";
      const isPrev = e.key === "ArrowLeft" || e.key === "ArrowUp";
      if (!isNext && !isPrev) return;
      e.preventDefault();
      e.stopPropagation();
      if (isNext) setCurrent((c) => Math.min(TOTAL - 1, c + 1));
      else setCurrent((c) => Math.max(1, c - 1));
    }
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, []);

  // Wheel — blocked on splash
  useEffect(() => {
    function onWheel(e: WheelEvent) {
      e.preventDefault();
      if (wheelLock.current) return;
      setCurrent((c) => {
        if (c === 0) return c; // splash locked
        wheelLock.current = true;
        setTimeout(() => {
          wheelLock.current = false;
        }, 920);
        if (e.deltaY > 0) return Math.min(TOTAL - 1, c + 1);
        return Math.max(1, c - 1);
      });
    }
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  // Touch — blocked on splash
  useEffect(() => {
    function onTouchStart(e: TouchEvent) {
      touchStart.current = e.touches[0].clientY;
    }
    function onTouchEnd(e: TouchEvent) {
      if (touchStart.current === null) return;
      const delta = touchStart.current - e.changedTouches[0].clientY;
      touchStart.current = null;
      if (Math.abs(delta) < 50) return;
      setCurrent((c) => {
        if (c === 0) return c; // splash locked
        if (delta > 0) return Math.min(TOTAL - 1, c + 1);
        return Math.max(1, c - 1);
      });
    }
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const slides = [
    <SplashSlide key="splash" onEnter={handleEnter} />,
    <StoryDeckSlide key="story" />,
    <PropertySlide key="property" />,
    <AudienceSlide key="audience" />,
    <LuxurySlide key="luxury" />,
    <ExperienceCollageSlide key="experience" />,
    <RetailSlide key="retail" />,
    <BrandPartnersSlide key="brands" />,
    <DiningSlide key="dining" />,
    <FoodRestaurantsSlide key="food" />,
    <EventsSlide key="events" />,
    <LeasingSlide key="leasing" openInquiry={open} />,
    <VenuesSlide key="venues" />,
    <CtaSlide key="cta" openInquiry={open} />,
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

      {current > 0 && (
        <DeckNav
          current={current}
          total={TOTAL}
          onGoTo={goTo}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </div>
  );
}
