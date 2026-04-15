"use client";

import { motion } from "framer-motion";
import type { Venue } from "@/lib/venues";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function VenueProduction({ venue }: { venue: Venue }) {
  return (
    <section
      style={{
        padding:
          "clamp(72px, 12vh, 140px) clamp(24px, 6vw, 96px)",
        background: "#050510",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: "640px",
          height: "640px",
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
            What&rsquo;s Included
          </span>
        </motion.div>

        <div
          className="production-grid"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${venue.production.length}, 1fr)`,
            gap: "clamp(16px, 2vw, 24px)",
          }}
        >
          {venue.production.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              style={{
                position: "relative",
                padding: "clamp(24px, 3vw, 36px) clamp(22px, 2.5vw, 32px)",
                borderRadius: "18px",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow:
                  "0 10px 36px -10px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
                overflow: "hidden",
                transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                minHeight: "260px",
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(201,169,110,0.30), transparent)",
                }}
              />

              <span
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontWeight: 300,
                  fontSize: "20px",
                  letterSpacing: "-0.02em",
                  color: "rgba(201,169,110,0.85)",
                  lineHeight: 1,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontWeight: 400,
                  fontSize: "clamp(1.15rem, 1.6vw, 1.45rem)",
                  lineHeight: 1.22,
                  letterSpacing: "-0.018em",
                  color: "rgba(255,255,255,0.94)",
                  margin: 0,
                }}
              >
                {p.title}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "13px",
                  lineHeight: 1.72,
                  color: "rgba(255,255,255,0.56)",
                  margin: 0,
                  letterSpacing: "0.005em",
                }}
              >
                {p.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .production-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
