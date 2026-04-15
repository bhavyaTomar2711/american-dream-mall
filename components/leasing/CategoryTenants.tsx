"use client";

import { motion } from "framer-motion";
import type { LeasingCategory } from "@/lib/leasing";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────
   Logos render natively on the white brand-wall
   card. No Cloudinary transform is needed: any
   embedded white background in the SVG blends
   invisibly into the white card, while colored
   paths stay pristine.

   (Previously we ran e_make_transparent to strip
   white on dark cards — it was too aggressive for
   logos with near-white elements like Uniqlo's
   reversed text and Lululemon's fine strokes,
   so we removed it when the card went white.)
───────────────────────────────────────────── */
function normalizeLogoUrl(url: string): string {
  return url;
}

export default function CategoryTenants({ cat }: { cat: LeasingCategory }) {
  return (
    <section
      style={{
        padding:
          "clamp(72px, 12vh, 140px) clamp(24px, 6vw, 96px)",
        background: "#050510",
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
            marginBottom: "clamp(40px, 6vh, 64px)",
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
              Who&rsquo;s Here
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
            A working preview — every tenant here is either signed, in lease,
            or in advanced conversation.
          </p>
        </motion.div>

        <div
          className="tenants-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "clamp(10px, 1.2vw, 14px)",
          }}
        >
          {cat.tenants.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.04 }}
              whileHover={{ y: -3 }}
              className="tenant-card"
              style={{
                position: "relative",
                aspectRatio: "4 / 2.6",
                padding: "clamp(14px, 1.6vw, 20px)",
                borderRadius: "14px",
                /* White "brand wall" card — high contrast on the dark section */
                background: "#FFFFFF",
                border: "1px solid rgba(10,15,30,0.04)",
                boxShadow:
                  "0 10px 32px -12px rgba(0,0,0,0.35), 0 2px 8px -2px rgba(0,0,0,0.12)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition:
                  "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s ease, border-color 0.4s ease",
                overflow: "hidden",
              }}
            >
              {t.tag && (
                <span
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "8px",
                    fontWeight: 600,
                    letterSpacing: "0.34em",
                    textTransform: "uppercase",
                    color: "rgba(10,15,30,0.45)",
                    flexShrink: 0,
                  }}
                >
                  {t.tag}
                </span>
              )}

              {t.logo ? (
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "clamp(2px, 0.4vw, 6px)",
                    minHeight: 0,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={normalizeLogoUrl(t.logo)}
                    alt={t.name}
                    loading="lazy"
                    decoding="async"
                    style={{
                      maxWidth: "94%",
                      maxHeight: "100%",
                      width: "auto",
                      height: "auto",
                      objectFit: "contain",
                      /* Native brand colors on white card — no filter needed.
                         The invertLogo flag is now ignored since white cards
                         give every logo sufficient contrast out of the box. */
                      opacity: 0.94,
                      transition: "opacity 0.4s ease",
                    }}
                    draggable={false}
                  />
                </div>
              ) : (
                <div
                  style={{
                    fontFamily: "var(--font-fraunces)",
                    fontWeight: 400,
                    fontSize: "clamp(1rem, 1.4vw, 1.25rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.015em",
                    color: "rgba(10,15,30,0.80)",
                    marginTop: "auto",
                  }}
                >
                  {t.name}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .tenant-card:hover {
          border-color: rgba(201,169,110,0.55) !important;
          box-shadow:
            0 18px 42px -10px rgba(0,0,0,0.40),
            0 0 0 1px rgba(201,169,110,0.25),
            0 4px 12px -2px rgba(0,0,0,0.14) !important;
        }
        .tenant-card:hover img {
          opacity: 1 !important;
        }
        @media (max-width: 960px) {
          .tenants-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .tenants-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
