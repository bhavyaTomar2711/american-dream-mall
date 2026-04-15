"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { LEASING, LEASING_ORDER } from "@/lib/leasing";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function LeasingHub() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <main
      style={{
        minHeight: "100vh",
        paddingTop: "clamp(88px, 14vh, 140px)",
        paddingBottom: "clamp(48px, 8vh, 96px)",
        position: "relative",
        overflow: "hidden",
        background: "#050510",
      }}
    >
      {/* Ambient gold orbs */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-15%",
          left: "-10%",
          width: "820px",
          height: "820px",
          background:
            "radial-gradient(ellipse at center, rgba(201,169,110,0.11) 0%, transparent 65%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-25%",
          right: "-10%",
          width: "720px",
          height: "720px",
          background:
            "radial-gradient(ellipse at center, rgba(60,80,180,0.08) 0%, transparent 65%)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      {/* ─── Header ─── */}
      <section
        style={{
          maxWidth: "1480px",
          margin: "0 auto",
          padding: "0 clamp(24px, 5vw, 80px)",
          position: "relative",
          zIndex: 2,
          marginBottom: "clamp(48px, 8vh, 84px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "28px",
              height: "1px",
              background: "rgba(201,169,110,0.55)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.44em",
              textTransform: "uppercase",
              color: "rgba(201,169,110,0.80)",
            }}
          >
            Leasing Paths
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: EASE, delay: 0.3 }}
          style={{
            fontFamily: "var(--font-fraunces)",
            fontWeight: 400,
            fontSize: "clamp(3rem, 7vw, 7.5rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.035em",
            color: "rgba(255,255,255,0.96)",
            margin: "0 0 24px",
            maxWidth: "1200px",
          }}
        >
          Choose the path that <span style={{ fontStyle: "italic", color: "#C9A96E" }}>matches your brand.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: "clamp(14px, 1.2vw, 17px)",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.55)",
            maxWidth: "600px",
            margin: 0,
            letterSpacing: "0.005em",
          }}
        >
          Four commercial paths, one destination. Pick the one your audience lives
          inside — we&rsquo;ll route you to a leasing lead within the hour.
        </motion.p>
      </section>

      {/* ─── Concertina tiles ─── */}
      <section
        style={{
          maxWidth: "1680px",
          margin: "0 auto",
          padding: "0 clamp(20px, 3vw, 48px)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          className="leasing-tiles"
          style={{
            display: "grid",
            gridTemplateColumns: LEASING_ORDER.map((_, i) =>
              hovered === null ? "1fr" : i === hovered ? "2.2fr" : "0.93fr",
            ).join(" "),
            gap: "10px",
            height: "clamp(460px, 74vh, 720px)",
            transition:
              "grid-template-columns 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {LEASING_ORDER.map((slug, i) => {
            const cat = LEASING[slug];
            const isHovered = hovered === i;
            return (
              <motion.div
                key={slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.5 + i * 0.1 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{ minWidth: 0 }}
              >
                <Link
                  href={`/leasing/${slug}`}
                  style={{
                    position: "relative",
                    display: "block",
                    width: "100%",
                    height: "100%",
                    borderRadius: "20px",
                    overflow: "hidden",
                    textDecoration: "none",
                    color: "inherit",
                    isolation: "isolate",
                    border: "1px solid rgba(255,255,255,0.06)",
                    boxShadow: isHovered
                      ? "0 30px 80px -18px rgba(0,0,0,0.65), 0 0 0 1px rgba(201,169,110,0.30)"
                      : "0 14px 36px -14px rgba(0,0,0,0.50)",
                    transition: "box-shadow 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  {/* Image */}
                  <motion.img
                    src={cat.hero.src}
                    alt={cat.label}
                    animate={{ scale: isHovered ? 1.06 : 1.02 }}
                    transition={{ duration: 1.2, ease: EASE }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      userSelect: "none",
                    }}
                    draggable={false}
                    loading={i < 2 ? "eager" : "lazy"}
                    decoding="async"
                  />

                  {/* Dark overlay */}
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: isHovered
                        ? "linear-gradient(to bottom, rgba(5,5,16,0.30) 0%, rgba(5,5,16,0.55) 60%, rgba(5,5,16,0.92) 100%)"
                        : "linear-gradient(to bottom, rgba(5,5,16,0.50) 0%, rgba(5,5,16,0.70) 60%, rgba(5,5,16,0.96) 100%)",
                      transition: "background 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  />

                  {/* Top: Index ornament */}
                  <div
                    style={{
                      position: "absolute",
                      top: "clamp(20px, 3vh, 32px)",
                      left: "clamp(20px, 2.2vw, 28px)",
                      right: "clamp(20px, 2.2vw, 28px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      zIndex: 2,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-fraunces)",
                        fontWeight: 300,
                        fontSize: "clamp(28px, 3.2vw, 40px)",
                        letterSpacing: "-0.02em",
                        color: "rgba(201,169,110,0.85)",
                        lineHeight: 1,
                      }}
                    >
                      {cat.index}
                    </span>
                    <motion.div
                      animate={{
                        rotate: isHovered ? -45 : 0,
                        scale: isHovered ? 1 : 0.9,
                      }}
                      transition={{ duration: 0.5, ease: EASE }}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        border: `1px solid ${isHovered ? "rgba(201,169,110,0.55)" : "rgba(255,255,255,0.20)"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition:
                          "border-color 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M3 9L9 3M9 3H4M9 3V8"
                          stroke={
                            isHovered
                              ? "rgba(201,169,110,0.95)"
                              : "rgba(255,255,255,0.65)"
                          }
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Bottom: label + sub */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding:
                        "clamp(20px, 3vh, 36px) clamp(20px, 2.2vw, 32px)",
                      zIndex: 2,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "9px",
                        fontWeight: 500,
                        letterSpacing: "0.42em",
                        textTransform: "uppercase",
                        color: "rgba(201,169,110,0.80)",
                        margin: "0 0 14px",
                      }}
                    >
                      {cat.eyebrow}
                    </p>
                    <motion.h2
                      animate={{ y: isHovered ? 0 : 4 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      style={{
                        fontFamily: "var(--font-fraunces)",
                        fontWeight: 400,
                        fontSize: "clamp(1.6rem, 2.4vw, 2.6rem)",
                        lineHeight: 1.02,
                        letterSpacing: "-0.02em",
                        color: "rgba(255,255,255,0.96)",
                        margin: "0 0 14px",
                      }}
                    >
                      {cat.label}
                    </motion.h2>
                    <motion.p
                      animate={{
                        opacity: isHovered ? 1 : 0.55,
                        height: isHovered ? "auto" : "auto",
                      }}
                      transition={{ duration: 0.5, ease: EASE }}
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "12.5px",
                        lineHeight: 1.65,
                        color: "rgba(255,255,255,0.60)",
                        margin: "0 0 18px",
                        maxWidth: "340px",
                        letterSpacing: "0.005em",
                      }}
                    >
                      {cat.hero.subhead}
                    </motion.p>

                    {/* Animated gold rule */}
                    <motion.div
                      animate={{ scaleX: isHovered ? 1 : 0.3 }}
                      transition={{ duration: 0.7, ease: EASE }}
                      style={{
                        width: "48px",
                        height: "1px",
                        background: "#C9A96E",
                        transformOrigin: "left center",
                      }}
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─── Footnote ─── */}
      <section
        style={{
          maxWidth: "1480px",
          margin: "clamp(48px, 8vh, 88px) auto 0",
          padding: "0 clamp(24px, 5vw, 80px)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.0 }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "24px",
            flexWrap: "wrap",
            paddingTop: "clamp(24px, 4vh, 40px)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "11.5px",
              color: "rgba(255,255,255,0.38)",
              margin: 0,
              letterSpacing: "0.01em",
              lineHeight: 1.65,
              maxWidth: "560px",
            }}
          >
            Not sure which path fits? Our leasing team routes every inquiry
            within the hour, regardless of category.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "11px 22px",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              fontFamily: "var(--font-montserrat)",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.65)",
              textDecoration: "none",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path
                d="M8 2L4 6L8 10"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Overview
          </Link>
        </motion.div>
      </section>

      {/* Mobile fallback: stack vertically */}
      <style>{`
        @media (max-width: 900px) {
          .leasing-tiles {
            grid-template-columns: 1fr !important;
            height: auto !important;
            gap: 14px !important;
          }
          .leasing-tiles > div {
            height: 70vh;
            min-height: 420px;
          }
        }
      `}</style>
    </main>
  );
}
