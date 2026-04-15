"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { VENUES, VENUE_ORDER } from "@/lib/venues";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function VenuesHub() {
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
      {/* Ambient orbs */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-15%",
          right: "-10%",
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
          left: "-10%",
          width: "720px",
          height: "720px",
          background:
            "radial-gradient(ellipse at center, rgba(120,80,220,0.06) 0%, transparent 65%)",
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
            The Venues
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
          Four rooms.{" "}
          <span style={{ fontStyle: "italic", color: "#C9A96E" }}>
            One audience.
          </span>
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
            maxWidth: "640px",
            margin: 0,
            letterSpacing: "0.005em",
          }}
        >
          An 18,000-seat arena, a Broadway-caliber playhouse, a column-free expo
          floor, and a private pavilion — all inside a property that delivers
          forty million visitors a year. Pick the room. We bring the audience.
        </motion.p>
      </section>

      {/* ─── 2×2 cinematic grid (different pattern than Leasing concertina) ─── */}
      <section
        style={{
          maxWidth: "1600px",
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 64px)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          className="venues-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "clamp(14px, 1.6vw, 22px)",
          }}
        >
          {VENUE_ORDER.map((slug, i) => {
            const v = VENUES[slug];
            return (
              <motion.div
                key={slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.55 + i * 0.1 }}
                className="venue-tile"
                style={{ minWidth: 0 }}
              >
                <Link
                  href={`/venues/${slug}`}
                  style={{
                    position: "relative",
                    display: "block",
                    width: "100%",
                    aspectRatio: "16 / 10",
                    borderRadius: "22px",
                    overflow: "hidden",
                    textDecoration: "none",
                    color: "inherit",
                    isolation: "isolate",
                    border: "1px solid rgba(255,255,255,0.06)",
                    boxShadow: "0 18px 48px -16px rgba(0,0,0,0.55)",
                    transition:
                      "box-shadow 0.6s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.5s ease",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={v.hero.src}
                    alt={v.label}
                    loading={i < 2 ? "eager" : "lazy"}
                    decoding="async"
                    className="venue-img"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 1.1s cubic-bezier(0.22, 1, 0.36, 1)",
                      userSelect: "none",
                    }}
                    draggable={false}
                  />

                  {/* Overlay */}
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to bottom, rgba(5,5,16,0.35) 0%, rgba(5,5,16,0.18) 35%, rgba(5,5,16,0.70) 75%, rgba(5,5,16,0.95) 100%)",
                    }}
                  />
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(100deg, rgba(5,5,16,0.55) 0%, rgba(5,5,16,0.20) 40%, transparent 60%)",
                    }}
                  />

                  {/* Top: index */}
                  <div
                    style={{
                      position: "absolute",
                      top: "clamp(22px, 2.5vw, 32px)",
                      left: "clamp(22px, 2.2vw, 32px)",
                      right: "clamp(22px, 2.2vw, 32px)",
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
                        fontSize: "clamp(28px, 3vw, 40px)",
                        letterSpacing: "-0.02em",
                        color: "rgba(201,169,110,0.85)",
                        lineHeight: 1,
                      }}
                    >
                      {v.index}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "9.5px",
                        fontWeight: 500,
                        letterSpacing: "0.42em",
                        textTransform: "uppercase",
                        color: "rgba(201,169,110,0.80)",
                      }}
                    >
                      {v.eyebrow}
                    </span>
                  </div>

                  {/* Bottom: label + headline + key spec chips + arrow */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding:
                        "clamp(22px, 2.6vw, 36px) clamp(22px, 2.4vw, 34px)",
                      zIndex: 2,
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      gap: "24px",
                    }}
                  >
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <h2
                        style={{
                          fontFamily: "var(--font-fraunces)",
                          fontWeight: 400,
                          fontSize: "clamp(1.7rem, 2.8vw, 2.9rem)",
                          lineHeight: 1.02,
                          letterSpacing: "-0.025em",
                          color: "rgba(255,255,255,0.97)",
                          margin: "0 0 16px",
                        }}
                      >
                        {v.label}
                      </h2>

                      {/* Key spec chips (top 2) */}
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "8px",
                        }}
                      >
                        {v.specs.slice(0, 2).map((s) => (
                          <span
                            key={s.label}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "8px",
                              padding: "6px 12px",
                              borderRadius: "9999px",
                              background: "rgba(255,255,255,0.06)",
                              backdropFilter: "blur(14px)",
                              WebkitBackdropFilter: "blur(14px)",
                              border: "1px solid rgba(255,255,255,0.10)",
                              fontFamily: "var(--font-montserrat)",
                              fontSize: "10.5px",
                              fontWeight: 500,
                              letterSpacing: "0.02em",
                              color: "rgba(255,255,255,0.78)",
                            }}
                          >
                            <span style={{ color: "rgba(201,169,110,0.95)" }}>
                              {s.value}
                            </span>
                            <span
                              style={{
                                width: "3px",
                                height: "3px",
                                borderRadius: "50%",
                                background: "rgba(255,255,255,0.30)",
                              }}
                            />
                            <span
                              style={{
                                fontSize: "9.5px",
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                color: "rgba(255,255,255,0.55)",
                              }}
                            >
                              {s.label}
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <motion.div
                      className="venue-arrow"
                      style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "50%",
                        border: "1px solid rgba(201,169,110,0.40)",
                        background: "rgba(201,169,110,0.08)",
                        backdropFilter: "blur(14px)",
                        WebkitBackdropFilter: "blur(14px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition:
                          "background 0.5s ease, border-color 0.5s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                          stroke="rgba(201,169,110,0.95)"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
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
              maxWidth: "620px",
            }}
          >
            Every venue ships with a dedicated event lead from contract to
            post-show. 500+ events a year — the infrastructure is practiced.
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

      <style>{`
        .venue-tile a:hover .venue-img {
          transform: scale(1.06);
        }
        .venue-tile a:hover {
          border-color: rgba(201,169,110,0.30) !important;
          box-shadow:
            0 26px 68px -18px rgba(0,0,0,0.65),
            0 0 0 1px rgba(201,169,110,0.20) !important;
        }
        .venue-tile a:hover .venue-arrow {
          background: rgba(201,169,110,0.22) !important;
          border-color: rgba(201,169,110,0.60) !important;
          transform: rotate(-8deg) scale(1.06);
        }
        @media (max-width: 900px) {
          .venues-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: none !important;
          }
        }
      `}</style>
    </main>
  );
}
