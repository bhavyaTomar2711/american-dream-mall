"use client";

import { motion } from "framer-motion";
import type { LeasingCategory } from "@/lib/leasing";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function CategoryTestimonial({ cat }: { cat: LeasingCategory }) {
  return (
    <section
      style={{
        position: "relative",
        padding:
          "clamp(96px, 15vh, 180px) clamp(24px, 6vw, 96px)",
        background:
          "linear-gradient(180deg, #080812 0%, #0B0B18 100%)",
        overflow: "hidden",
      }}
    >
      {/* Ambient orb */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "1100px",
          height: "1100px",
          background:
            "radial-gradient(ellipse at center, rgba(201,169,110,0.09) 0%, transparent 60%)",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          textAlign: "left",
        }}
      >
        {/* Giant quote glyph */}
        <motion.span
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 0.20, scale: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.2, ease: EASE }}
          aria-hidden
          style={{
            display: "block",
            fontFamily: "var(--font-fraunces)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(120px, 16vw, 220px)",
            lineHeight: 0.7,
            color: "#C9A96E",
            marginBottom: "clamp(-20px, -2vw, -40px)",
            marginLeft: "-8px",
            letterSpacing: "-0.05em",
          }}
        >
          &ldquo;
        </motion.span>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.0, ease: EASE, delay: 0.15 }}
          style={{
            fontFamily: "var(--font-fraunces)",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "clamp(1.7rem, 3.5vw, 3rem)",
            lineHeight: 1.32,
            letterSpacing: "-0.02em",
            color: "rgba(255,255,255,0.94)",
            margin: "0 0 48px",
          }}
        >
          {cat.testimonial.quote}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "1px",
              background: "rgba(201,169,110,0.60)",
            }}
          />
          <div>
            <div
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "12.5px",
                fontWeight: 600,
                letterSpacing: "0.01em",
                color: "rgba(255,255,255,0.88)",
              }}
            >
              {cat.testimonial.author}
            </div>
            <div
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "10.5px",
                color: "rgba(255,255,255,0.45)",
                letterSpacing: "0.02em",
                marginTop: "3px",
              }}
            >
              {cat.testimonial.role}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
