"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { LeasingCategory } from "@/lib/leasing";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function CategoryHero({ cat }: { cat: LeasingCategory }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.9, 0.4]);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "640px",
        overflow: "hidden",
      }}
    >
      {/* Parallax image */}
      <motion.img
        src={cat.hero.src}
        alt=""
        aria-hidden
        fetchPriority="high"
        decoding="async"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          y,
          scale,
          userSelect: "none",
        }}
        draggable={false}
      />

      {/* Base dim — gives every image a consistent foundation */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(5,5,16,0.32)",
          pointerEvents: "none",
        }}
      />

      {/* Cinematic vertical gradient */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(5,5,16,0.82) 0%, rgba(5,5,16,0.42) 28%, rgba(5,5,16,0.38) 55%, rgba(5,5,16,0.92) 100%)",
          opacity,
        }}
      />

      {/* Left readability gradient — strengthened and extended */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(100deg, rgba(5,5,16,0.88) 0%, rgba(5,5,16,0.62) 32%, rgba(5,5,16,0.28) 60%, transparent 82%)",
          pointerEvents: "none",
        }}
      />

      {/* Vignette */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 200px 70px rgba(5,5,16,0.55)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding:
            "clamp(100px, 14vh, 150px) clamp(24px, 5vw, 96px) clamp(48px, 8vh, 96px)",
          maxWidth: "1680px",
          margin: "0 auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "28px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-fraunces)",
              fontWeight: 300,
              fontSize: "clamp(28px, 2.6vw, 36px)",
              letterSpacing: "-0.02em",
              color: "rgba(201,169,110,0.85)",
              lineHeight: 1,
            }}
          >
            {cat.index}
          </span>
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
              letterSpacing: "0.42em",
              textTransform: "uppercase",
              color: "rgba(201,169,110,0.82)",
            }}
          >
            {cat.eyebrow}
          </span>
        </motion.div>

        {/* Masked headline reveal */}
        <div style={{ overflow: "hidden" }}>
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.5 }}
            style={{
              fontFamily: "var(--font-fraunces)",
              fontWeight: 400,
              fontSize: "clamp(2.8rem, 6.8vw, 7.5rem)",
              lineHeight: 0.96,
              letterSpacing: "-0.035em",
              color: "rgba(255,255,255,0.98)",
              margin: 0,
              maxWidth: "1100px",
            }}
          >
            {cat.hero.headline}
          </motion.h1>
        </div>
        {cat.hero.headlineAccent && (
          <div style={{ overflow: "hidden", marginTop: "4px" }}>
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.65 }}
              style={{
                display: "block",
                fontFamily: "var(--font-fraunces)",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "clamp(2.8rem, 6.8vw, 7.5rem)",
                lineHeight: 0.96,
                letterSpacing: "-0.035em",
                color: "#C9A96E",
              }}
            >
              {cat.hero.headlineAccent}
            </motion.span>
          </div>
        )}

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.0 }}
          style={{
            width: "64px",
            height: "1px",
            background:
              "linear-gradient(90deg, rgba(201,169,110,0.80), transparent)",
            marginTop: "40px",
            marginBottom: "28px",
            transformOrigin: "left center",
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.1 }}
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: "clamp(14px, 1.2vw, 17px)",
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.70)",
            maxWidth: "560px",
            margin: 0,
            letterSpacing: "0.005em",
          }}
        >
          {cat.hero.subhead}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 1.6 }}
        style={{
          position: "absolute",
          bottom: "36px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: "8px",
            fontWeight: 500,
            letterSpacing: "0.44em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.30)",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            position: "relative",
            width: "1px",
            height: "36px",
            background: "rgba(255,255,255,0.10)",
            overflow: "hidden",
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, transparent, rgba(201,169,110,0.80), transparent)",
            }}
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
