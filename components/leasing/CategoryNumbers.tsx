"use client";

import { motion } from "framer-motion";
import type { LeasingCategory } from "@/lib/leasing";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function CategoryNumbers({ cat }: { cat: LeasingCategory }) {
  return (
    <section
      style={{
        padding:
          "clamp(72px, 12vh, 140px) clamp(24px, 6vw, 96px)",
        background:
          "linear-gradient(180deg, #080812 0%, #0A0A16 50%, #080812 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient orb */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-30%",
          left: "-10%",
          width: "720px",
          height: "720px",
          background:
            "radial-gradient(ellipse at center, rgba(201,169,110,0.06) 0%, transparent 65%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1480px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "clamp(44px, 7vh, 72px)",
          }}
        >
          <div
            style={{
              width: "24px",
              height: "1px",
              background: "rgba(201,169,110,0.50)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "9.5px",
              fontWeight: 500,
              letterSpacing: "0.42em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.42)",
            }}
          >
            The Numbers
          </span>
        </motion.div>

        <div
          className="numbers-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "clamp(14px, 2vw, 28px)",
          }}
        >
          {cat.numbers.map((n, i) => (
            <motion.div
              key={n.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
              style={{
                position: "relative",
                padding: "clamp(28px, 3vw, 40px) clamp(22px, 2vw, 28px)",
                borderTop: "1px solid rgba(201,169,110,0.24)",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontWeight: 300,
                  fontSize: "clamp(2.4rem, 4.6vw, 4.4rem)",
                  lineHeight: 0.96,
                  letterSpacing: "-0.035em",
                  color: "rgba(255,255,255,0.96)",
                }}
              >
                {n.value}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "10.5px",
                  fontWeight: 600,
                  letterSpacing: "0.20em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.80)",
                  lineHeight: 1.4,
                }}
              >
                {n.label}
              </span>
              {n.foot && (
                <span
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.40)",
                    letterSpacing: "0.01em",
                    lineHeight: 1.5,
                  }}
                >
                  {n.foot}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .numbers-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 540px) {
          .numbers-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
