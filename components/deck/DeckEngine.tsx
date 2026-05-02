"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useInquiry } from "@/providers/InquiryProvider";
import { useMenu } from "@/providers/MenuProvider";
import { usePresentation } from "@/providers/PresentationProvider";
import { useDeckAudio } from "@/providers/DeckAudioProvider";
import type { InquiryType } from "@/components/InquiryModal";
import Link from "next/link";
import { LEASING } from "@/lib/leasing";

// ─── constants ────────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const;

// Cold open — 60s cinematic, replaces the original splash hero video.
// NOTE: vc_h264 alone returns empty bodies on this account, but q_auto + f_auto
// works fine. q_auto:good balances visual quality and file size for fast LCP.
const HERO_VIDEO =
  "https://res.cloudinary.com/dwo1snivu/video/upload/q_auto:good,f_auto/v1777472942/InShot_20260428_122728870_qnvemd.mp4";
// Poster extracted from the same video at frame 0 — lets LCP fire from a
// small jpeg (~70 KB) rather than waiting for the heavy MP4 to buffer.
const HERO_POSTER =
  "https://res.cloudinary.com/dwo1snivu/video/upload/so_0,f_auto,q_auto:good,w_1920/v1777472942/InShot_20260428_122728870_qnvemd.jpg";
const AD_LOGO =
  "https://res.cloudinary.com/dwo1snivu/image/upload/v1776278785/American_Dream__Symbol_ldufrd.svg";

// Round 2 — section loop videos (muted, looping ambient backgrounds).
// Raw URLs only — see HERO_VIDEO note above.
const LOOP_VIDEOS = {
  audience:
    "https://res.cloudinary.com/dwo1snivu/video/upload/v1777472936/2_online-video-cutter.com_h2e6uq.mp4",
  luxury:
    "https://res.cloudinary.com/dwo1snivu/video/upload/v1777472935/3_online-video-cutter.com_nuuact.mp4",
  retail:
    "https://res.cloudinary.com/dwo1snivu/video/upload/v1777472936/processed_4_tsyni8.mp4",
  dining:
    "https://res.cloudinary.com/dwo1snivu/video/upload/v1777472935/processed_5_zcdsci.mp4",
  entertainment:
    "https://res.cloudinary.com/dwo1snivu/video/upload/v1777472936/processed_6_1_uqllj4.mp4",
} as const;

// Round 2 — Imagine Your Brand Here storefront templates + Ask CTA bg
const STOREFRONTS = {
  "luxury-gold":
    "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1777473262/Luxury_Gold_hexdme.jpg",
  "minimal-white":
    "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1777473262/Minimal_White_d0dl9e.jpg",
  "classic-black":
    "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1777473262/Classic_Black_igr6vn.jpg",
  "warm-bronze":
    "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1777473262/Warm_Bronze_aftixq.jpg",
  "modern-retail":
    "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1777473261/Modern_Retail_mymgrm.jpg",
} as const;
const ASK_BG =
  "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1777473151/The_Ask_Closing_Background_osu4r4.jpg";

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
  "The Hub",
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
  "Your Brand Here",
  "AI Sales Pitch",
  "Contact",
];

const TOTAL = NAV_LABELS.length; // 13 slides (0–12)

// Slug → slide index for menu jump navigation (?slide=audience etc.)
const SLIDE_SLUGS: Record<string, number> = {
  welcome: 0,
  hub: 1,
  audience: 2,
  luxury: 3,
  experience: 4,
  retail: 5,
  partners: 6,
  dining: 7,
  food: 8,
  events: 9,
  leasing: 10,
  venues: 11,
  brand: 12,
  pitch: 13,
  contact: 14,
};

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

// Same overlay stack as CinematicBg, but plays a muted looping video instead of a still image.
// Keeps every premium gradient/vignette intact so existing slide content reads identically.
function CinematicVideoBg({ src, poster }: { src: string; poster?: string }) {
  return (
    <>
      <video
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
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
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(12,10,6,0.72) 0%, rgba(12,10,6,0.15) 38%, rgba(12,10,6,0.15) 55%, rgba(12,10,6,0.80) 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg, rgba(12,10,6,0.80) 0%, rgba(12,10,6,0.35) 44%, transparent 68%)",
          pointerEvents: "none",
        }}
      />
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

// ─── Narration scripts (one per slide) ────────────────────────────────────────
const NARRATION_SCRIPTS: string[] = [
  // 0 — Welcome / Splash
  "Welcome... to American Dream. Not a mall... but a destination. Three million square feet of luxury... entertainment... and the extraordinary.",
  // 1 — Hub
  "Behold... American Dream. Every world... within reach. The luxury wing... the dining halls... the arena. One destination... one map... one click away.",
  // 2 — Audience
  "Sixty million visitors... every year. Eighteen million... from the New York metro. The most affluent... most aspirational shoppers in America... walk through these doors.",
  // 3 — Luxury Wing
  "The Luxury Wing. Hermès. Saint Laurent. Tiffany. The greatest concentration of luxury... in the tri-state area. Under one... extraordinary roof.",
  // 4 — Experience
  "More than retail. American Dream... is an experience. From the indoor water park... to the snow-capped mountain. Every visit... unforgettable.",
  // 5 — Retail & Brands
  "Over four hundred and fifty stores. From flagship destinations... to the brands defining tomorrow. Where culture... meets commerce.",
  // 6 — Our Partners
  "We partner with the world's most influential brands. Apple. Sephora. Nike. Each one chose American Dream... for the audience we deliver.",
  // 7 — Dining
  "Sixty restaurants. Michelin-starred chefs. Curated food halls. A destination... for taste.",
  // 8 — Food & Restaurants
  "From Italian fine dining... to American classics. Every craving satisfied. Every visit... a journey for the senses.",
  // 9 — Events
  "Concerts. Brand activations. Fashion shows. Eighteen thousand seats. World-class production. An audience... ready to be moved.",
  // 10 — Leasing Paths
  "Four paths. Luxury. Retail. Dining. Pop-up. Each one... designed to elevate your brand.",
  // 11 — Venues
  "The Arena. The Performing Arts Center. The Expo Hall. Private suites. Every scale... every format... every audience.",
  // 12 — Your Brand Here
  "Imagine your flagship... right here. Type your name. Watch it come to life... inside American Dream. This... is your future.",
  // 13 — AI Sales Pitch
  "Your custom proposal... in seconds. Type your brand. Our AI crafts... a strategic pitch. Audience match. Projected revenue. Recommended zone. Personalized... for you.",
  // 14 — Contact
  "The next move... is yours. Lease a space. Sponsor an event. Book a venue. Let us build... the future of retail... together.",
];

// ─── Premium Voice Narrator ──────────────────────────────────────────────────
function NarratorButton({
  current,
  onStart,
  onEnd,
  hidden,
}: {
  current: number;
  onStart: () => void;
  onEnd: () => void;
  hidden?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // Pick a melodious, premium female voice
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;
      // Tier 1: Microsoft "Natural" online voices — by far the most realistic on Windows
      const tier1 = voices.find((v) =>
        /Microsoft Aria Online|Microsoft Jenny Online|Microsoft Sonia Online|Microsoft Libby Online|Microsoft Michelle Online|Microsoft Ava Online/i.test(v.name),
      );
      // Tier 2: Premium macOS/iOS female voices — naturally melodic
      const tier2 = voices.find((v) =>
        /Samantha|Victoria|Karen|Moira|Tessa|Allison|Ava|Susan|Serena/i.test(v.name),
      );
      // Tier 3: Google's neural female voices
      const tier3 = voices.find((v) =>
        /Google UK English Female|Google US English.*Female|Google.*en.*Female/i.test(v.name),
      );
      // Tier 4: Any voice explicitly labeled female + English
      const tier4 = voices.find(
        (v) => /female/i.test(v.name) && /en-GB|en-US|en-AU/i.test(v.lang),
      );
      // Tier 5: Common Microsoft female voices (older but workable)
      const tier5 = voices.find((v) =>
        /Microsoft Zira|Microsoft Eva|Microsoft Hazel|Microsoft Susan/i.test(v.name),
      );
      // Tier 6: UK English (often female-default on browsers)
      const tier6 = voices.find((v) => /en-GB/i.test(v.lang));
      // Tier 7: US English fallback
      const tier7 = voices.find((v) => /en-US/i.test(v.lang));
      voiceRef.current =
        tier1 || tier2 || tier3 || tier4 || tier5 || tier6 || tier7 || voices[0];
    };

    pickVoice();
    window.speechSynthesis.onvoiceschanged = pickVoice;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Stop narration when slide changes
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      onEnd();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const stop = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setPlaying(false);
    onEnd();
  }, [onEnd]);

  const start = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const text = NARRATION_SCRIPTS[current] || "";
    if (!text) return;

    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    if (voiceRef.current) u.voice = voiceRef.current;
    u.rate = 0.85;     // Gentle, unhurried, melodic
    u.pitch = 1.08;    // Slightly higher — soft, feminine, warm
    u.volume = 1.0;
    u.onend = () => {
      setPlaying(false);
      onEnd();
    };
    u.onerror = () => {
      setPlaying(false);
      onEnd();
    };
    utteranceRef.current = u;
    setPlaying(true);
    onStart();
    window.speechSynthesis.speak(u);
  }, [current, onStart, onEnd]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (hidden) return null;

  return (
    <motion.button
      onClick={playing ? stop : start}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
      whileHover={{
        background: "rgba(201,169,110,0.14)",
        borderColor: "rgba(201,169,110,0.45)",
      }}
      whileTap={{ scale: 0.94 }}
      style={{
        position: "fixed",
        bottom: "clamp(22px, 3vh, 36px)",
        left: "clamp(96px, 8vw, 130px)",
        zIndex: 100,
        height: "44px",
        padding: "0 18px 0 14px",
        borderRadius: "9999px",
        background: playing
          ? "rgba(201,169,110,0.18)"
          : "rgba(255,255,255,0.04)",
        backdropFilter: "blur(18px) saturate(160%)",
        WebkitBackdropFilter: "blur(18px) saturate(160%)",
        border: `1px solid ${
          playing ? "rgba(201,169,110,0.55)" : "rgba(255,255,255,0.10)"
        }`,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer",
        color: playing ? "#C9A96E" : "rgba(255,255,255,0.85)",
        fontFamily: "var(--font-montserrat)",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        boxShadow: playing
          ? "0 8px 28px rgba(201,169,110,0.35), inset 0 1px 0 rgba(255,255,255,0.12)"
          : "0 8px 24px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.05)",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
      aria-label={playing ? "Stop narration" : "Listen to narration"}
    >
      {/* Animated waveform when playing, play icon when paused */}
      {playing ? (
        <div style={{ display: "flex", alignItems: "center", gap: "3px", height: "16px" }}>
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{
                height: ["6px", "14px", "6px"],
              }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                delay: i * 0.12,
                ease: "easeInOut",
              }}
              style={{
                width: "2.5px",
                background: "#C9A96E",
                borderRadius: "2px",
              }}
            />
          ))}
        </div>
      ) : (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 2.5L13 8L3 13.5V2.5Z"
            fill="rgba(201,169,110,0.85)"
            stroke="rgba(201,169,110,0.95)"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <span>{playing ? "Listening" : "Listen"}</span>
    </motion.button>
  );
}

function MuteButton({ muted, onToggle, hidden }: { muted: boolean; onToggle: () => void; hidden?: boolean }) {
  if (hidden) return null;
  return (
    <motion.button
      onClick={onToggle}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
      whileHover={{
        background: "rgba(201,169,110,0.10)",
        borderColor: "rgba(201,169,110,0.35)",
      }}
      whileTap={{ scale: 0.94 }}
      aria-label={muted ? "Unmute background music" : "Mute background music"}
      style={{
        // Bottom-left — well clear of the deck-nav prev/next/counter cluster
        // on the bottom-right and the menu pill on the top-left.
        position: "fixed",
        left: "clamp(20px, 2.4vw, 32px)",
        bottom: "clamp(20px, 2.6vh, 32px)",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(24px) saturate(160%)",
        WebkitBackdropFilter: "blur(24px) saturate(160%)",
        border: "1px solid rgba(255,255,255,0.10)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 130,
        color: muted ? "rgba(201,169,110,0.45)" : "#C9A96E",
        boxShadow:
          "0 4px 20px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.04)",
        transition: "border-color 0.3s ease, background 0.3s ease",
      }}
    >
      {muted ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="22" y1="9" x2="16" y2="15" />
          <line x1="16" y1="9" x2="22" y2="15" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
    </motion.button>
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
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Loop: 0 → 1 → 0 → 1 ...
  useEffect(() => {
    const durations = [3200, 4000]; // how long each phase shows
    const timer = setTimeout(
      () => setPhase((p) => (p + 1) % 2),
      durations[phase],
    );
    return () => clearTimeout(timer);
  }, [phase]);

  // Force-start the cold open video — autoplay attr alone isn't enough
  // when React mounts because Chrome checks muted state at the moment
  // play() is called, and the muted prop sometimes lands a tick late.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;

    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          // Will recover on first user gesture (already muted, so it's allowed).
        });
      }
    };
    tryPlay();
    // Retry once data is available — covers slow CDN starts
    v.addEventListener("loadeddata", tryPlay, { once: true });
    v.addEventListener("canplay", tryPlay, { once: true });

    const onGesture = () => tryPlay();
    window.addEventListener("pointerdown", onGesture, { once: true });
    window.addEventListener("touchstart", onGesture, { once: true });
    window.addEventListener("keydown", onGesture, { once: true });

    return () => {
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("touchstart", onGesture);
      window.removeEventListener("keydown", onGesture);
    };
  }, []);

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
      {/* Cold open — 60s cinematic background video */}
      <video
        ref={videoRef}
        src={HERO_VIDEO}
        poster={HERO_POSTER}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Lighter overlay stack — lets the cinematic breathe while keeping text legible */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(10,15,30,0.22)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,15,30,0.55) 0%, rgba(10,15,30,0.10) 30%, rgba(10,15,30,0.15) 60%, rgba(10,15,30,0.70) 100%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 200px 80px rgba(10,15,30,0.40)", pointerEvents: "none" }} />

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

// ─── SLIDE 1 — THE HUB (Interactive Aerial Map) ───────────────────────────────

function HubSlide() {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const jumpTo = useCallback((index: number) => {
    window.dispatchEvent(
      new CustomEvent("deck:goto", { detail: { index } })
    );
  }, []);

  const zones = [
    { id: "luxury", label: "Luxury", x: "25%", y: "30%", index: 3 },
    { id: "retail", label: "Retail", x: "65%", y: "40%", index: 5 },
    { id: "dining", label: "Dining", x: "35%", y: "65%", index: 7 },
    { id: "entertainment", label: "Entertainment", x: "70%", y: "70%", index: 9 },
    { id: "events", label: "Events", x: "50%", y: "25%", index: 11 },
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
      {/* Aerial Map Background */}
      <img
        src="https://res.cloudinary.com/dwo1snivu/image/upload/v1777473153/ariel_map_i1khax.jpg"
        alt="American Dream Aerial Map"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(10,15,30,0.42) 0%, rgba(10,15,30,0.58) 100%)",
          pointerEvents: "none",
        }}
      />
      {/* Center vignette to focus text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(10,15,30,0.30) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <SlideTopBar index={1} />

      {/* Hotspots Container */}
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        {zones.map((zone) => (
          <motion.div
            key={zone.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              position: "absolute",
              left: zone.x,
              top: zone.y,
              transform: "translate(-50%, -50%)",
              zIndex: 3,
            }}
            onMouseEnter={() => setActiveZone(zone.id)}
            onMouseLeave={() => setActiveZone(null)}
          >
            {/* Pulsing Ring */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(201,169,110,0.7)",
                  "0 0 0 20px rgba(201,169,110,0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                position: "absolute",
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                border: "2px solid rgba(201,169,110,0.6)",
                inset: 0,
                cursor: "pointer",
              }}
            />

            {/* Center Circle */}
            <motion.button
              onClick={() => jumpTo(zone.index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                position: "absolute",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: activeZone === zone.id
                  ? "linear-gradient(135deg, #C9A96E 0%, #D4B896 100%)"
                  : "rgba(201,169,110,0.4)",
                border: "2px solid rgba(201,169,110,0.8)",
                color: "#0A0F1E",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.3s ease",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ▼
            </motion.button>

            {/* Label */}
            {activeZone === zone.id && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: -50 }}
                exit={{ opacity: 0, y: -10 }}
                style={{
                  position: "absolute",
                  top: "-50px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  whiteSpace: "nowrap",
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#C9A96E",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {zone.label}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Center Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <div style={{ color: "white" }}>
          <h1
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 600,
              marginBottom: "12px",
              color: "#ffffff",
            }}
          >
            American Dream
          </h1>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "14px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            Click any zone to explore
          </p>
        </div>
      </motion.div>
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
      <CinematicVideoBg src={LOOP_VIDEOS.audience} />
      <SlideTopBar index={1} />

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
      <CinematicVideoBg src={LOOP_VIDEOS.luxury} />
      <SlideTopBar index={2} />

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

// ─── SLIDE 3 — THE EXPERIENCE (collage) ───────────────────────────────────────

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
      <SlideTopBar index={3} />

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
      <CinematicVideoBg src={LOOP_VIDEOS.retail} />
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

      <SlideTopBar index={5} />

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
      <CinematicVideoBg src={LOOP_VIDEOS.dining} />
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

      <SlideTopBar index={7} />

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
      {/* Arena/concert image — matches the "18,000 seats" headline.
          The Big SNOW loop video is reserved for an Entertainment slide if added later. */}
      <CinematicBg src={IMG.concert} />
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
      <SlideTopBar index={9} />

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

// ─── SLIDE 10 — IMAGINE YOUR BRAND HERE (★ killer feature) ───────────────────

const BRAND_TEMPLATE_MAP: Record<string, keyof typeof STOREFRONTS> = {
  // Luxury Gold — for the highest-end heritage maisons
  gucci: "luxury-gold",
  "louis vuitton": "luxury-gold",
  louisvuitton: "luxury-gold",
  lv: "luxury-gold",
  hermes: "luxury-gold",
  "hermès": "luxury-gold",
  cartier: "luxury-gold",
  tiffany: "luxury-gold",
  "tiffany & co": "luxury-gold",
  dior: "luxury-gold",
  versace: "luxury-gold",
  fendi: "luxury-gold",
  valentino: "luxury-gold",
  // Minimal White — for tech-forward minimalist brands
  apple: "minimal-white",
  tesla: "minimal-white",
  "saint laurent": "minimal-white",
  ysl: "minimal-white",
  zara: "minimal-white",
  uniqlo: "minimal-white",
  cos: "minimal-white",
  // Classic Black — for high-fashion houses
  chanel: "classic-black",
  prada: "classic-black",
  "bottega veneta": "classic-black",
  bottega: "classic-black",
  balenciaga: "classic-black",
  celine: "classic-black",
  givenchy: "classic-black",
  // Warm Bronze — heritage watches & jewelry
  rolex: "warm-bronze",
  bulgari: "warm-bronze",
  bvlgari: "warm-bronze",
  omega: "warm-bronze",
  patek: "warm-bronze",
  "patek philippe": "warm-bronze",
  "ralph lauren": "warm-bronze",
  burberry: "warm-bronze",
  // Modern Retail — sport & lifestyle
  nike: "modern-retail",
  sephora: "modern-retail",
  adidas: "modern-retail",
  lululemon: "modern-retail",
  "h&m": "modern-retail",
  hm: "modern-retail",
  gap: "modern-retail",
  "alo yoga": "modern-retail",
  alo: "modern-retail",
  "on running": "modern-retail",
  on: "modern-retail",
};

const BRAND_DOMAIN_MAP: Record<string, string> = {
  gucci: "gucci.com",
  "louis vuitton": "louisvuitton.com",
  louisvuitton: "louisvuitton.com",
  lv: "louisvuitton.com",
  hermes: "hermes.com",
  "hermès": "hermes.com",
  cartier: "cartier.com",
  tiffany: "tiffany.com",
  "tiffany & co": "tiffany.com",
  dior: "dior.com",
  versace: "versace.com",
  fendi: "fendi.com",
  valentino: "valentino.com",
  chanel: "chanel.com",
  prada: "prada.com",
  "bottega veneta": "bottegaveneta.com",
  bottega: "bottegaveneta.com",
  balenciaga: "balenciaga.com",
  celine: "celine.com",
  givenchy: "givenchy.com",
  rolex: "rolex.com",
  bulgari: "bulgari.com",
  bvlgari: "bulgari.com",
  omega: "omegawatches.com",
  patek: "patek.com",
  "patek philippe": "patek.com",
  "ralph lauren": "ralphlauren.com",
  burberry: "burberry.com",
  apple: "apple.com",
  tesla: "tesla.com",
  "saint laurent": "ysl.com",
  ysl: "ysl.com",
  zara: "zara.com",
  uniqlo: "uniqlo.com",
  cos: "cos.com",
  nike: "nike.com",
  sephora: "sephora.com",
  adidas: "adidas.com",
  lululemon: "lululemon.com",
  "h&m": "hm.com",
  hm: "hm.com",
  gap: "gap.com",
  "alo yoga": "aloyoga.com",
  alo: "aloyoga.com",
  "on running": "on.com",
  on: "on.com",
};

function brandTemplate(name: string): keyof typeof STOREFRONTS {
  const k = name.trim().toLowerCase();
  return BRAND_TEMPLATE_MAP[k] || "luxury-gold";
}

function brandDomain(name: string): string {
  const k = name.trim().toLowerCase();
  if (BRAND_DOMAIN_MAP[k]) return BRAND_DOMAIN_MAP[k];
  return k.replace(/\s+/g, "").replace(/[^a-z0-9]/g, "") + ".com";
}

function brandTitleCase(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

type PitchData = {
  headline: string;
  audienceMatch: number;
  projectedRevenue: string;
  annualVisitors: string;
  pitch: string;
  recommendedZone: string;
  zoneNote: string;
};

function CountUp({ to, suffix = "", duration = 1.4 }: { to: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / (duration * 1000));
      // Ease-out
      const eased = 1 - Math.pow(1 - k, 3);
      setVal(Math.round(to * eased));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return (
    <span>
      {val}
      {suffix}
    </span>
  );
}

function PitchStatCard({
  value,
  label,
  delay,
  isPercent,
}: {
  value: string | number;
  label: string;
  delay: number;
  isPercent?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      style={{
        padding: "16px 22px",
        background:
          "linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        backdropFilter: "blur(28px) saturate(170%)",
        WebkitBackdropFilter: "blur(28px) saturate(170%)",
        border: "1px solid rgba(201,169,110,0.22)",
        borderRadius: "14px",
        boxShadow:
          "0 14px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-fraunces)",
          fontWeight: 500,
          fontSize: "clamp(24px, 2.7vw, 32px)",
          color: "#C9A96E",
          lineHeight: 1,
          letterSpacing: "-0.01em",
          textShadow: "0 6px 22px rgba(201,169,110,0.30)",
        }}
      >
        {isPercent && typeof value === "number" ? (
          <CountUp to={value} suffix="%" />
        ) : (
          value
        )}
      </div>
      <div
        style={{
          marginTop: "6px",
          fontFamily: "var(--font-montserrat)",
          fontSize: "9px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.55)",
          fontWeight: 600,
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

function PitchResult({
  brandName,
  pitch,
  onReset,
}: {
  brandName: string;
  pitch: PitchData;
  onReset: () => void;
}) {
  const [listening, setListening] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const captureRef = useRef<HTMLDivElement | null>(null);
  const words = pitch.pitch.split(" ");

  const downloadPitch = useCallback(async () => {
    if (!captureRef.current || downloading) return;
    setDownloading(true);
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(captureRef.current, {
        backgroundColor: "#0A0F1E",
        pixelRatio: 2,
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.download = `American-Dream-Pitch-${brandName.replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("[PitchResult] Download failed:", err);
    } finally {
      setDownloading(false);
    }
  }, [brandName, downloading]);

  const speak = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    if (listening) {
      window.speechSynthesis.cancel();
      setListening(false);
      return;
    }
    const fullText = `${pitch.headline}. ${pitch.pitch} Recommended zone: ${pitch.recommendedZone}. ${pitch.zoneNote}`;
    const u = new SpeechSynthesisUtterance(fullText);
    const voices = window.speechSynthesis.getVoices();
    const preferred =
      voices.find((v) =>
        /Microsoft Aria Online|Microsoft Jenny Online|Microsoft Sonia Online|Samantha|Victoria|Karen|Google UK English Female/i.test(
          v.name,
        ),
      ) ||
      voices.find((v) => /female/i.test(v.name) && /en/i.test(v.lang)) ||
      voices.find((v) => /en-GB|en-US/i.test(v.lang));
    if (preferred) u.voice = preferred;
    u.rate = 0.85;
    u.pitch = 1.08;
    u.onend = () => setListening(false);
    u.onerror = () => setListening(false);
    setListening(true);
    window.speechSynthesis.speak(u);
  }, [pitch, listening]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <motion.div
      key="pitch-result"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      style={{
        width: "100%",
        maxWidth: "1500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        ref={captureRef}
        data-pitch-capture
        style={{
          width: "100%",
          padding: "20px 16px",
          background: "transparent",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        style={{
          fontFamily: "var(--font-montserrat)",
          fontSize: "10px",
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "#C9A96E",
          fontWeight: 600,
          marginBottom: "12px",
          textShadow: "0 6px 24px rgba(0,0,0,0.50)",
          textAlign: "center",
        }}
      >
        Personalized Proposal · For {brandName}
      </motion.div>

      {/* Editorial headline (more presence) */}
      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
        style={{
          fontFamily: "var(--font-fraunces)",
          fontStyle: "italic",
          fontWeight: 500,
          fontSize: "clamp(26px, 3.6vw, 42px)",
          lineHeight: 1.08,
          color: "#ffffff",
          letterSpacing: "-0.01em",
          margin: 0,
          maxWidth: "1000px",
          textAlign: "center",
          textShadow: "0 12px 40px rgba(0,0,0,0.70), 0 4px 12px rgba(0,0,0,0.50)",
        }}
      >
        {pitch.headline}
      </motion.h1>

      {/* Gold rule */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "48px", opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
        style={{
          height: "1px",
          background: "#C9A96E",
          margin: "16px 0 18px",
          boxShadow: "0 0 12px rgba(201,169,110,0.55)",
        }}
      />

      {/* Two-column layout: pitch text | stats stack */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.55fr) minmax(240px, 1fr)",
          gap: "20px",
          width: "100%",
          marginBottom: "18px",
        }}
      >
        {/* LEFT: Pitch paragraph */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{
            padding: "20px 26px",
            background: "rgba(0,0,0,0.32)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "9.5px",
              letterSpacing: "0.30em",
              textTransform: "uppercase",
              color: "rgba(201,169,110,0.90)",
              fontWeight: 600,
              marginBottom: "10px",
            }}
          >
            The Pitch
          </div>
          <p
            style={{
              fontFamily: "var(--font-fraunces)",
              fontWeight: 400,
              fontSize: "clamp(13px, 1.15vw, 15.5px)",
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.94)",
              margin: 0,
              letterSpacing: "0.005em",
            }}
          >
            {words.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.22, delay: 0.7 + i * 0.018 }}
                style={{ display: "inline-block", marginRight: "0.28em" }}
              >
                {w}
              </motion.span>
            ))}
          </p>
        </motion.div>

        {/* RIGHT: Three stat cards stacked vertically */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <PitchStatCard
            value={pitch.audienceMatch}
            label="Audience Match"
            delay={0.55}
            isPercent
          />
          <PitchStatCard value={pitch.projectedRevenue} label="Projected Revenue" delay={0.65} />
          <PitchStatCard value={pitch.annualVisitors} label="Annual Visitors" delay={0.75} />
        </div>
      </div>

      {/* Recommended Zone — compact horizontal */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.95 + words.length * 0.018 }}
        style={{
          width: "100%",
          padding: "12px 22px",
          background:
            "linear-gradient(135deg, rgba(201,169,110,0.12) 0%, rgba(201,169,110,0.03) 100%)",
          border: "1px solid rgba(201,169,110,0.32)",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#C9A96E",
            boxShadow: "0 0 14px rgba(201,169,110,0.85)",
            flexShrink: 0,
          }}
        />
        <div
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: "9px",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(201,169,110,0.90)",
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          Recommended Zone
        </div>
        <div
          style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: "clamp(14px, 1.2vw, 17px)",
            fontWeight: 500,
            color: "#ffffff",
            flexShrink: 0,
          }}
        >
          {pitch.recommendedZone}
        </div>
        <div
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: "11px",
            color: "rgba(255,255,255,0.62)",
            lineHeight: 1.4,
            flex: 1,
            textAlign: "right",
          }}
        >
          {pitch.zoneNote}
        </div>
      </motion.div>
      </div>

      {/* Action buttons (NOT included in download capture) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 1.05 + words.length * 0.018 }}
        style={{
          marginTop: "18px",
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <motion.button
          onClick={speak}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          style={{
            padding: "12px 26px",
            background: listening
              ? "rgba(201,169,110,0.20)"
              : "rgba(255,255,255,0.06)",
            border: `1px solid ${
              listening ? "rgba(201,169,110,0.60)" : "rgba(201,169,110,0.30)"
            }`,
            borderRadius: "9999px",
            color: listening ? "#C9A96E" : "rgba(255,255,255,0.92)",
            fontFamily: "var(--font-montserrat)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            transition: "all 0.3s ease",
          }}
        >
          {listening ? (
            <div style={{ display: "flex", alignItems: "center", gap: "3px", height: "12px" }}>
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={{ height: ["5px", "12px", "5px"] }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    delay: i * 0.12,
                    ease: "easeInOut",
                  }}
                  style={{ width: "2.5px", background: "#C9A96E", borderRadius: "2px" }}
                />
              ))}
            </div>
          ) : (
            <span style={{ fontSize: "10px" }}>▶</span>
          )}
          {listening ? "Listening" : "Listen"}
        </motion.button>

        <motion.button
          onClick={downloadPitch}
          disabled={downloading}
          whileHover={{ scale: downloading ? 1 : 1.03 }}
          whileTap={{ scale: downloading ? 1 : 0.96 }}
          style={{
            padding: "12px 32px",
            background: "linear-gradient(135deg, #C9A96E 0%, #B59458 100%)",
            border: "none",
            borderRadius: "9999px",
            color: "#0A0F1E",
            fontFamily: "var(--font-montserrat)",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            cursor: downloading ? "wait" : "pointer",
            opacity: downloading ? 0.75 : 1,
            boxShadow:
              "0 12px 32px rgba(201,169,110,0.36), inset 0 1px 0 rgba(255,255,255,0.22)",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {downloading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                style={{
                  width: "12px",
                  height: "12px",
                  border: "2px solid rgba(10,15,30,0.30)",
                  borderTopColor: "#0A0F1E",
                  borderRadius: "50%",
                }}
              />
              Preparing…
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 2V11M8 11L4.5 7.5M8 11L11.5 7.5M2.5 13.5H13.5"
                  stroke="#0A0F1E"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Download Pitch
            </>
          )}
        </motion.button>

        <motion.button
          onClick={onReset}
          whileHover={{ background: "rgba(255,255,255,0.08)" }}
          whileTap={{ scale: 0.96 }}
          style={{
            padding: "12px 24px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: "9999px",
            color: "rgba(255,255,255,0.65)",
            fontFamily: "var(--font-montserrat)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            cursor: "pointer",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
          }}
        >
          Try Another
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// Update PitchStatCard to be more compact (smaller)
function PitchSlide({ openInquiry }: { openInquiry: (t?: InquiryType) => void }) {
  const [brand, setBrand] = useState("");
  const [phase, setPhase] = useState<"input" | "loading" | "result">("input");
  const [submitted, setSubmitted] = useState("");
  const [pitchData, setPitchData] = useState<PitchData | null>(null);

  const onGenerate = useCallback(async () => {
    const v = brand.trim();
    if (!v) return;
    setSubmitted(v);
    setPhase("loading");
    try {
      const res = await fetch("/api/generate-pitch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brandName: v }),
      });
      const data = (await res.json()) as { ok: boolean; pitch?: PitchData; error?: string };
      if (data.ok && data.pitch) {
        setPitchData(data.pitch);
        window.setTimeout(() => setPhase("result"), 400);
      } else {
        console.error("[PitchSlide] Failed:", data.error);
        setPhase("input");
      }
    } catch (error) {
      console.error("[PitchSlide] Error:", error);
      setPhase("input");
    }
  }, [brand]);

  const onReset = useCallback(() => {
    setPhase("input");
    setBrand("");
    setSubmitted("");
    setPitchData(null);
  }, []);

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
      <CinematicVideoBg src="https://res.cloudinary.com/dwo1snivu/video/upload/v1777472936/1_online-video-cutter.com_wzzhoe.mp4" />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(10,15,30,0.20) 0%, rgba(10,15,30,0.35) 60%, rgba(10,15,30,0.55) 100%)",
          pointerEvents: "none",
        }}
      />

      <SlideTopBar index={13} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(70px, 10vh, 100px) clamp(28px, 4vw, 64px) clamp(50px, 7vh, 80px)",
          zIndex: 3,
          overflowY: "auto",
        }}
      >
        <AnimatePresence mode="wait">
          {phase === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: EASE }}
              style={{
                width: "100%",
                maxWidth: "720px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Eyebrow text="13 — AI Sales Pitch ★" />
              <Headline>
                Get your custom{" "}
                <span
                  style={{
                    fontFamily: "var(--font-fraunces)",
                    fontStyle: "italic",
                    fontWeight: 500,
                    color: "#C9A96E",
                  }}
                >
                  proposal.
                </span>
              </Headline>
              <GoldRule delay={0.18} />
              <Body>
                Type your brand. Receive a strategic, AI-generated proposal in
                seconds — written specifically for you. Audience match,
                projected revenue, recommended zone, and a personalized
                editorial pitch.
              </Body>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
                style={{
                  marginTop: "44px",
                  display: "flex",
                  gap: "12px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    if (e.key === " ") e.preventDefault();
                    if (e.key === "Enter") {
                      e.preventDefault();
                      onGenerate();
                    }
                  }}
                  placeholder="Gucci, Apple, Rolex, Nike…"
                  autoFocus
                  style={{
                    flex: "1 1 280px",
                    minWidth: "240px",
                    maxWidth: "420px",
                    padding: "16px 22px",
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(24px) saturate(160%)",
                    WebkitBackdropFilter: "blur(24px) saturate(160%)",
                    border: "1px solid rgba(201,169,110,0.22)",
                    borderRadius: "9999px",
                    color: "white",
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "15px",
                    fontWeight: 400,
                    letterSpacing: "0.02em",
                    outline: "none",
                  }}
                />
                <motion.button
                  onClick={onGenerate}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: "16px 32px",
                    background:
                      "linear-gradient(135deg, #C9A96E 0%, #B59458 100%)",
                    border: "none",
                    borderRadius: "9999px",
                    color: "#0A0F1E",
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.20em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    boxShadow:
                      "0 8px 30px rgba(201,169,110,0.30), inset 0 1px 0 rgba(255,255,255,0.20)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span style={{ fontSize: "13px" }}>✦</span>
                  Generate Pitch →
                </motion.button>
              </motion.div>

            </motion.div>
          )}

          {phase === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{ textAlign: "center" }}
            >
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4], scale: [0.96, 1, 0.96] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(22px, 3vw, 32px)",
                  color: "#C9A96E",
                  letterSpacing: "0.01em",
                }}
              >
                Crafting your proposal…
              </motion.div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "240px" }}
                transition={{ duration: 1.6, ease: EASE }}
                style={{
                  height: "1px",
                  background:
                    "linear-gradient(to right, transparent, #C9A96E, transparent)",
                  margin: "32px auto 0",
                }}
              />
              <p
                style={{
                  marginTop: "20px",
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                AI · Personalized for {brandTitleCase(submitted)}
              </p>
            </motion.div>
          )}

          {phase === "result" && pitchData && (
            <PitchResult
              brandName={brandTitleCase(submitted)}
              pitch={pitchData}
              onReset={onReset}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function BrandSlide({ openInquiry }: { openInquiry: (t?: InquiryType) => void }) {
  const [brand, setBrand] = useState("");
  const [phase, setPhase] = useState<"input" | "loading" | "result">("input");
  const [logoOk, setLogoOk] = useState(true);
  const [submitted, setSubmitted] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string>("");

  const template = submitted ? brandTemplate(submitted) : "luxury-gold";
  const domain = submitted ? brandDomain(submitted) : "";
  const display = submitted ? brandTitleCase(submitted) : "";
  const logoUrl = domain ? `https://logo.clearbit.com/${domain}` : "";

  const onGenerate = useCallback(async () => {
    const v = brand.trim();
    if (!v) return;
    setSubmitted(v);
    setLogoOk(true);
    setPhase("loading");
    console.log(`[BrandSlide] Calling API for ${v}`);

    try {
      const res = await fetch("/api/generate-storefront", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brandName: v }),
      });

      const data = await res.json() as Record<string, any>;
      console.log(`[BrandSlide] API response:`, data);

      if (data.ok && data.imageUrl) {
        console.log(`[BrandSlide] Setting generated image: ${data.imageUrl}`);
        setGeneratedImage(data.imageUrl);
        window.setTimeout(() => setPhase("result"), 1200);
      } else {
        console.warn(`[BrandSlide] API returned error: ${data.error}`);
        window.setTimeout(() => setPhase("result"), 1200);
      }
    } catch (error) {
      console.error(`[BrandSlide] API call failed:`, error);
      window.setTimeout(() => setPhase("result"), 1200);
    }
  }, [brand]);

  const onReset = useCallback(() => {
    setPhase("input");
    setBrand("");
    setSubmitted("");
    setLogoOk(true);
    setGeneratedImage("");
  }, []);

  useEffect(() => {
    console.log(`[BrandSlide] generatedImage state:`, generatedImage);
  }, [generatedImage]);

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
      {/* Cinematic backdrop — fades to the storefront on result */}
      <AnimatePresence mode="wait">
        {phase !== "result" ? (
          <motion.div
            key="atmosphere"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{ position: "absolute", inset: 0 }}
          >
            <CinematicVideoBg src={LOOP_VIDEOS.luxury} />
          </motion.div>
        ) : (
          <motion.div
            key="storefront"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: EASE }}
            style={{ position: "absolute", inset: 0 }}
          >
            <img
              src={generatedImage || STOREFRONTS[template]}
              alt={`${display} flagship rendering`}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            {/* Soft gradients to keep text legible */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(10,15,30,0.55) 0%, rgba(10,15,30,0.05) 30%, rgba(10,15,30,0.10) 60%, rgba(10,15,30,0.85) 100%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                boxShadow: "inset 0 0 200px 90px rgba(10,15,30,0.55)",
                pointerEvents: "none",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <SlideTopBar index={11} />

      {/* ── Center stage ────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(40px, 8vh, 80px) clamp(24px, 5vw, 80px)",
          zIndex: 3,
        }}
      >
        <AnimatePresence mode="wait">
          {phase === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: EASE }}
              style={{
                width: "100%",
                maxWidth: "720px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Eyebrow text="10 — See Your Brand Here" />
              <Headline>
                Imagine your brand{" "}
                <span
                  style={{
                    fontFamily: "var(--font-fraunces)",
                    fontStyle: "italic",
                    fontWeight: 500,
                    color: "#C9A96E",
                  }}
                >
                  here.
                </span>
              </Headline>
              <GoldRule delay={0.18} />
              <Body>
                Type a brand name. We&apos;ll render it inside American Dream
                in seconds — flagship facade, real logo, your moment.
              </Body>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
                style={{
                  marginTop: "44px",
                  display: "flex",
                  gap: "12px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    if (e.key === " ") e.preventDefault();
                    if (e.key === "Enter") {
                      e.preventDefault();
                      onGenerate();
                    }
                  }}
                  placeholder="Gucci, Apple, Rolex, Nike…"
                  autoFocus
                  style={{
                    flex: "1 1 280px",
                    minWidth: "240px",
                    maxWidth: "420px",
                    padding: "16px 22px",
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(24px) saturate(160%)",
                    WebkitBackdropFilter: "blur(24px) saturate(160%)",
                    border: "1px solid rgba(201,169,110,0.22)",
                    borderRadius: "9999px",
                    color: "white",
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "15px",
                    fontWeight: 400,
                    letterSpacing: "0.02em",
                    outline: "none",
                    transition: "border-color 0.3s ease, background 0.3s ease",
                  }}
                  onFocus={(e) => {
                    (e.target as HTMLInputElement).style.borderColor =
                      "rgba(201,169,110,0.5)";
                    (e.target as HTMLInputElement).style.background =
                      "rgba(255,255,255,0.06)";
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLInputElement).style.borderColor =
                      "rgba(201,169,110,0.22)";
                    (e.target as HTMLInputElement).style.background =
                      "rgba(255,255,255,0.04)";
                  }}
                />
                <motion.button
                  onClick={onGenerate}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: "16px 30px",
                    background:
                      "linear-gradient(135deg, #C9A96E 0%, #B59458 100%)",
                    border: "none",
                    borderRadius: "9999px",
                    color: "#0A0F1E",
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.20em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    boxShadow:
                      "0 8px 30px rgba(201,169,110,0.30), inset 0 1px 0 rgba(255,255,255,0.20)",
                  }}
                >
                  Render It →
                </motion.button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
                style={{
                  marginTop: "24px",
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "10px",
                  letterSpacing: "0.20em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.30)",
                }}
              >
                Try a luxury house · sportswear · tech retail
              </motion.p>
            </motion.div>
          )}

          {phase === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{ textAlign: "center" }}
            >
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4], scale: [0.96, 1, 0.96] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(22px, 3vw, 32px)",
                  color: "#C9A96E",
                  letterSpacing: "0.01em",
                }}
              >
                Placing {brandTitleCase(brand)} inside American Dream…
              </motion.div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "240px" }}
                transition={{ duration: 1.3, ease: EASE }}
                style={{
                  height: "1px",
                  margin: "28px auto 0",
                  background:
                    "linear-gradient(90deg, transparent, rgba(201,169,110,0.7), transparent)",
                }}
              />
            </motion.div>
          )}

          {phase === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
              style={{
                width: "100%",
                maxWidth: "920px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.8 }}
                style={{
                  textShadow: "0 8px 32px rgba(0,0,0,0.60), 0 2px 8px rgba(0,0,0,0.40)",
                }}
              >
                <Eyebrow text="Your Flagship Experience" />
                <Headline>
                  <span
                    style={{
                      fontFamily: "var(--font-fraunces)",
                      fontStyle: "italic",
                      fontWeight: 500,
                      color: "#C9A96E",
                      textShadow: "0 12px 40px rgba(0,0,0,0.70), 0 4px 12px rgba(0,0,0,0.50)",
                    }}
                  >
                    AI-rendered
                  </span>{" "}
                  at American Dream.
                </Headline>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 1.3 }}
                style={{
                  marginTop: "48px",
                  display: "flex",
                  gap: "16px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <motion.button
                  onClick={() => openInquiry("leasing")}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    padding: "15px 36px",
                    background:
                      "linear-gradient(135deg, #C9A96E 0%, #B59458 100%)",
                    border: "none",
                    borderRadius: "9999px",
                    color: "#0A0F1E",
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    boxShadow:
                      "0 12px 40px rgba(201,169,110,0.40), inset 0 1px 0 rgba(255,255,255,0.25)",
                    transition: "all 0.3s ease",
                  }}
                >
                  Start the Conversation →
                </motion.button>
                <motion.button
                  onClick={onReset}
                  whileHover={{
                    background: "rgba(255,255,255,0.09)",
                    borderColor: "rgba(201,169,110,0.45)",
                  }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    padding: "15px 36px",
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(32px) saturate(180%)",
                    WebkitBackdropFilter: "blur(32px) saturate(180%)",
                    border: "1px solid rgba(201,169,110,0.18)",
                    borderRadius: "9999px",
                    color: "rgba(255,255,255,0.90)",
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  Try another brand
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── SLIDE 11 — CLOSING CTA ───────────────────────────────────────────────────

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
      <CinematicBg src={ASK_BG} />
      {/* Extra overlay for CTA */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(10,15,30,0.35)", pointerEvents: "none" }} />
      <SlideTopBar index={12} />

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
  const audio = useDeckAudio();

  // Sync with presentation mode
  useEffect(() => {
    if (presentation.state.isPresenting && presentation.state.currentDeck === "home") {
      setCurrent(presentation.state.slideIndex);
    }
  }, [presentation.state]);

  // Menu jump nav — read ?slide=<slug> on mount + on history nav.
  // Lets the MenuDrawer link directly to any section.
  useEffect(() => {
    const applyFromUrl = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const slug = params.get("slide");
        if (!slug) return;
        const idx = SLIDE_SLUGS[slug];
        if (typeof idx === "number") setCurrent(idx);
      } catch {}
    };
    applyFromUrl();
    const onPop = () => applyFromUrl();
    window.addEventListener("popstate", onPop);
    // Custom event fired by MenuDrawer for in-app jumps without router push
    const onJump = (e: Event) => {
      const detail = (e as CustomEvent<{ slide?: string; index?: number }>).detail;
      if (!detail) return;
      if (typeof detail.index === "number") setCurrent(detail.index);
      else if (detail.slide && typeof SLIDE_SLUGS[detail.slide] === "number") {
        setCurrent(SLIDE_SLUGS[detail.slide]);
      }
    };
    window.addEventListener("deck:goto", onJump as EventListener);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("deck:goto", onJump as EventListener);
    };
  }, []);

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

  // Round 2 — 13 slides. Removed: StoryDeck, Property "#1 destination".
  // Added: BrandSlide (Imagine Your Brand Here ★).
  const slides = [
    <SplashSlide key="splash" onEnter={handleEnter} />,
    <HubSlide key="hub" />,
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
    <BrandSlide key="brand" openInquiry={open} />,
    <PitchSlide key="pitch" openInquiry={open} />,
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

      {/* Background music control — bottom-left. Hidden during presentation
          so the Presenting pill (also bottom-left) owns that corner. */}
      <MuteButton
        muted={audio.muted}
        onToggle={audio.toggleMute}
        hidden={presentation.state.isPresenting}
      />

      {/* AI Voice Narrator — sits next to mute button, hidden on splash slide */}
      <NarratorButton
        current={current}
        onStart={audio.duck}
        onEnd={audio.restore}
        hidden={presentation.state.isPresenting || current === 0}
      />
    </div>
  );
}
