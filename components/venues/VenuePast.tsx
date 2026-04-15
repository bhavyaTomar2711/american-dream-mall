"use client";

import { motion } from "framer-motion";
import type { Venue } from "@/lib/venues";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function VenuePast({ venue }: { venue: Venue }) {
  return (
    <section
      style={{
        padding:
          "clamp(72px, 12vh, 140px) clamp(24px, 6vw, 96px)",
        background: "#080812",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: "1480px",
          margin: "0 auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: "24px",
            flexWrap: "wrap",
            marginBottom: "clamp(40px, 6vh, 56px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
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
              Recent Here
            </span>
          </div>

          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "11.5px",
              color: "rgba(255,255,255,0.38)",
              margin: 0,
              letterSpacing: "0.02em",
              maxWidth: "360px",
            }}
          >
            A short list from the past two years — load-ins that ended in
            sold-out houses and press that kept writing.
          </p>
        </motion.div>

        {/* Editorial list */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {venue.past.map((e, i) => (
            <motion.div
              key={`${e.year}-${e.title}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
              className="past-row"
              style={{
                display: "grid",
                gridTemplateColumns:
                  "minmax(80px, 140px) minmax(220px, 2fr) minmax(160px, 1.2fr)",
                gap: "clamp(16px, 3vw, 36px)",
                alignItems: "baseline",
                padding: "clamp(22px, 2.8vh, 32px) clamp(4px, 1vw, 16px)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                transition: "background 0.3s ease",
              }}
            >
              {/* Year */}
              <span
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontWeight: 300,
                  fontSize: "clamp(1.3rem, 2vw, 1.8rem)",
                  letterSpacing: "-0.015em",
                  color: "rgba(201,169,110,0.85)",
                  lineHeight: 1,
                }}
              >
                {e.year}
              </span>

              {/* Title */}
              <h4
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontWeight: 400,
                  fontSize: "clamp(1.3rem, 2.2vw, 2rem)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                  color: "rgba(255,255,255,0.95)",
                  margin: 0,
                }}
              >
                {e.title}
              </h4>

              {/* Note */}
              <p
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "12.5px",
                  color: "rgba(255,255,255,0.50)",
                  margin: 0,
                  letterSpacing: "0.005em",
                  textAlign: "right",
                }}
              >
                {e.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .past-row:hover {
          background: rgba(255,255,255,0.02);
        }
        @media (max-width: 720px) {
          .past-row {
            grid-template-columns: 1fr !important;
            gap: 6px !important;
          }
          .past-row p {
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  );
}
