"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInquiry } from "@/providers/InquiryProvider";
import { LEASING, LEASING_ORDER, type LeasingCategory } from "@/lib/leasing";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function CategoryCTA({ cat }: { cat: LeasingCategory }) {
  const { open } = useInquiry();

  // 3 "other paths" (everything except this one)
  const others = LEASING_ORDER.filter((s) => s !== cat.slug).map(
    (s) => LEASING[s],
  );

  return (
    <section
      style={{
        padding:
          "clamp(96px, 14vh, 160px) clamp(24px, 6vw, 96px) clamp(64px, 10vh, 120px)",
        background: "#050510",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gold gradient line */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(201,169,110,0.40), transparent)",
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
        {/* Big CTA */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.0, ease: EASE }}
          style={{
            textAlign: "center",
            marginBottom: "clamp(72px, 10vh, 120px)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "9.5px",
              fontWeight: 500,
              letterSpacing: "0.44em",
              textTransform: "uppercase",
              color: "rgba(201,169,110,0.80)",
              margin: "0 0 28px",
            }}
          >
            Ready for {cat.eyebrow}?
          </p>
          <h2
            style={{
              fontFamily: "var(--font-fraunces)",
              fontWeight: 400,
              fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.035em",
              color: "rgba(255,255,255,0.96)",
              margin: "0 auto 28px",
              maxWidth: "880px",
            }}
          >
            Let&rsquo;s build your{" "}
            <span style={{ fontStyle: "italic", color: "#C9A96E" }}>
              presence here.
            </span>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "clamp(13px, 1.1vw, 15.5px)",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.50)",
              margin: "0 auto 44px",
              maxWidth: "520px",
            }}
          >
            Our leasing team responds within one business day, usually faster.
            Bring a deck, a question, or just a vibe — we&rsquo;ll meet you
            where you are.
          </p>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <motion.button
              type="button"
              onClick={() => open(cat.inquiryType)}
              whileHover={{ filter: "brightness(1.10)", scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "17px 36px",
                borderRadius: "9999px",
                background: "#C9A96E",
                border: "none",
                fontFamily: "var(--font-montserrat)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#0A0F1E",
                cursor: "pointer",
                boxShadow: "0 12px 40px rgba(201,169,110,0.30)",
              }}
            >
              Inquire About {cat.eyebrow}
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ display: "inline-block" }}
              >
                →
              </motion.span>
            </motion.button>
            <Link
              href="/leasing"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "17px 30px",
                borderRadius: "9999px",
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                fontFamily: "var(--font-montserrat)",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.65)",
                textDecoration: "none",
              }}
            >
              All Leasing Paths
            </Link>
          </div>
        </motion.div>

        {/* Other paths */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-5%" }}
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
              color: "rgba(255,255,255,0.42)",
            }}
          >
            Other Paths
          </span>
        </motion.div>

        <div
          className="other-paths"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(12px, 1.5vw, 20px)",
          }}
        >
          {others.map((o, i) => (
            <motion.div
              key={o.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
            >
              <Link
                href={`/leasing/${o.slug}`}
                style={{
                  position: "relative",
                  display: "block",
                  height: "clamp(220px, 28vh, 280px)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  textDecoration: "none",
                  color: "inherit",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={o.hero.src}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  decoding="async"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                  className="other-img"
                />
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to bottom, rgba(5,5,16,0.35) 0%, rgba(5,5,16,0.85) 100%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "clamp(18px, 2.2vw, 26px)",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "9px",
                        fontWeight: 500,
                        letterSpacing: "0.40em",
                        textTransform: "uppercase",
                        color: "rgba(201,169,110,0.80)",
                        margin: "0 0 10px",
                      }}
                    >
                      {o.eyebrow}
                    </p>
                    <h3
                      style={{
                        fontFamily: "var(--font-fraunces)",
                        fontWeight: 400,
                        fontSize: "clamp(1.2rem, 1.7vw, 1.5rem)",
                        letterSpacing: "-0.02em",
                        color: "rgba(255,255,255,0.95)",
                        margin: 0,
                      }}
                    >
                      {o.label}
                    </h3>
                  </div>
                  <div
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      border: "1px solid rgba(201,169,110,0.40)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(201,169,110,0.10)",
                      flexShrink: 0,
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
                        stroke="rgba(201,169,110,0.95)"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .other-paths a:hover .other-img {
          transform: scale(1.05);
        }
        @media (max-width: 900px) {
          .other-paths {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
