"use client";

import { motion } from "framer-motion";
import type { LeasingCategory } from "@/lib/leasing";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function CategoryIntro({ cat }: { cat: LeasingCategory }) {
  return (
    <section
      style={{
        padding:
          "clamp(88px, 14vh, 160px) clamp(24px, 6vw, 96px) clamp(72px, 12vh, 140px)",
        background: "#050510",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          textAlign: "left",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "28px",
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
              color: "rgba(255,255,255,0.40)",
            }}
          >
            The Position
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.0, ease: EASE, delay: 0.15 }}
          style={{
            fontFamily: "var(--font-fraunces)",
            fontWeight: 300,
            fontSize: "clamp(1.5rem, 2.2vw, 2.35rem)",
            lineHeight: 1.38,
            letterSpacing: "-0.015em",
            color: "rgba(255,255,255,0.88)",
            margin: 0,
          }}
        >
          {cat.intro}
        </motion.p>
      </div>
    </section>
  );
}
