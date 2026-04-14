"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const NODES = [
  {
    label: "ATTRACTIONS",
    title: "Immersive experiences",
    text: "Indoor ski, water park, and live events",
  },
  {
    label: "VISITORS",
    title: "40M+ annually",
    text: "A self-sustaining audience engine",
  },
  {
    label: "ENGAGEMENT",
    title: "Hours, not minutes",
    text: "Average dwell time 3× the industry norm",
  },
  {
    label: "BRANDS",
    title: "450+ partners",
    text: "Luxury, mid-tier, F&B, and experiential",
  },
  {
    label: "REVENUE",
    title: "$2B+ opportunity",
    text: "Commercial returns that compound yearly",
  },
];

function ConnectorLine({
  inView,
  delay,
}: {
  inView: boolean;
  delay: number;
}) {
  return (
    <div
      style={{
        flex: "0 0 auto",
        display: "flex",
        alignItems: "center",
        width: "clamp(32px, 4vw, 64px)",
        position: "relative",
      }}
    >
      {/* Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, ease: EASE, delay }}
        style={{
          width: "100%",
          height: "1px",
          background: "rgba(0,0,0,0.12)",
          transformOrigin: "left center",
        }}
      />
      {/* Arrow dot at end */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.3, ease: EASE, delay: delay + 0.3 }}
        style={{
          position: "absolute",
          right: "-3px",
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "rgba(0,0,0,0.10)",
        }}
      />
    </div>
  );
}

export default function GrowthEcosystem() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="growth"
      style={{
        width: "100%",
        background: "#F5F5F7",
        padding: "clamp(20px, 3vh, 40px) clamp(16px, 3vw, 48px)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1480px",
          background: "#FFFFFF",
          borderRadius: "28px",
          boxShadow:
            "0 30px 80px -20px rgba(0,0,0,0.06), 0 8px 24px -8px rgba(0,0,0,0.04)",
          padding:
            "clamp(56px, 8vh, 112px) clamp(32px, 5vw, 96px)",
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            textAlign: "center",
            maxWidth: "680px",
            margin: "0 auto",
            marginBottom: "clamp(56px, 8vh, 96px)",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "9px",
              letterSpacing: "0.44em",
              textTransform: "uppercase",
              color: "rgba(0,0,0,0.35)",
              margin: "0 0 24px",
            }}
          >
            06 — The Ecosystem
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 800,
              fontSize: "clamp(2.2rem, 4vw, 4rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              color: "#1D1D1F",
              margin: "0 0 24px",
            }}
          >
            A system built
            <br />
            for growth.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.16 }}
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "14px",
              lineHeight: 1.75,
              color: "rgba(0,0,0,0.45)",
              margin: 0,
              letterSpacing: "0.005em",
            }}
          >
            Every experience is designed to attract visitors, increase
            engagement, and convert attention into measurable revenue for
            brands.
          </motion.p>
        </div>

        {/* ── Flow system ── */}
        <div
          ref={ref}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            padding: "24px 0",
          }}
        >
          {NODES.map((node, i) => {
            const isLast = i === NODES.length - 1;
            const staggerDelay = 0.15 + i * 0.18;

            return (
              <div
                key={node.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                {/* Node */}
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.95 }}
                  animate={
                    inView
                      ? { opacity: 1, y: 0, scale: 1 }
                      : {}
                  }
                  transition={{
                    duration: 0.7,
                    ease: EASE,
                    delay: staggerDelay,
                  }}
                  style={{
                    position: "relative",
                    background: isLast ? "#FAFAFA" : "#FAFAFA",
                    border: isLast
                      ? "1px solid rgba(201,169,110,0.25)"
                      : "1px solid rgba(0,0,0,0.06)",
                    borderRadius: "20px",
                    padding: "clamp(20px, 2.5vh, 32px) clamp(20px, 2vw, 32px)",
                    minWidth: "clamp(160px, 14vw, 200px)",
                    boxShadow: isLast
                      ? "0 8px 32px -8px rgba(201,169,110,0.15), 0 2px 8px rgba(0,0,0,0.03)"
                      : "0 4px 16px -4px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.02)",
                    cursor: "default",
                    textAlign: "left",
                  }}
                >
                  {/* Glow for Revenue node */}
                  {isLast && (
                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        inset: "-8px",
                        borderRadius: "28px",
                        background:
                          "radial-gradient(ellipse at center, rgba(201,169,110,0.08) 0%, transparent 70%)",
                        pointerEvents: "none",
                        zIndex: 0,
                      }}
                    />
                  )}

                  {/* Label */}
                  <p
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "8px",
                      fontWeight: 500,
                      letterSpacing: "0.32em",
                      textTransform: "uppercase",
                      color: isLast
                        ? "rgba(201,169,110,0.70)"
                        : "rgba(0,0,0,0.28)",
                      margin: "0 0 10px",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {node.label}
                  </p>

                  {/* Title */}
                  <p
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "clamp(14px, 1.2vw, 16px)",
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                      color: isLast ? "#1D1D1F" : "#1D1D1F",
                      margin: "0 0 6px",
                      lineHeight: 1.3,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {node.title}
                  </p>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "11px",
                      fontWeight: 400,
                      lineHeight: 1.5,
                      color: "rgba(0,0,0,0.38)",
                      margin: 0,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {node.text}
                  </p>
                </motion.div>

                {/* Connector (not after last node) */}
                {!isLast && (
                  <ConnectorLine
                    inView={inView}
                    delay={staggerDelay + 0.25}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* ── Bottom accent line ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.6 }}
          style={{
            width: "100%",
            maxWidth: "200px",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(201,169,110,0.30), transparent)",
            margin: "clamp(40px, 5vh, 64px) auto 0",
            transformOrigin: "center",
          }}
        />
      </div>
    </section>
  );
}
