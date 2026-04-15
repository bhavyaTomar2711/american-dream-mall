"use client";

import { motion } from "framer-motion";
import { useInquiry } from "@/providers/InquiryProvider";
import type { LeasingCategory } from "@/lib/leasing";

const EASE = [0.22, 1, 0.36, 1] as const;

const STATUS_COLOR: Record<string, string> = {
  "Available Now": "#9FD89F",
  "Last Remaining": "#F0B16A",
  "Coming Soon": "#A7B8F5",
  Reserved: "rgba(255,255,255,0.40)",
};

export default function CategorySpaces({ cat }: { cat: LeasingCategory }) {
  const { open } = useInquiry();

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
            alignItems: "center",
            gap: "14px",
            marginBottom: "clamp(40px, 6vh, 56px)",
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
            Available Spaces
          </span>
        </motion.div>

        {/* List */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {cat.spaces.map((s, i) => (
            <motion.button
              key={s.name}
              type="button"
              onClick={() => open(cat.inquiryType)}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
              className="space-row"
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(180px, 1.8fr) 1fr 1.2fr 1fr auto",
                gap: "clamp(14px, 2vw, 28px)",
                alignItems: "center",
                padding: "clamp(22px, 2.8vh, 32px) clamp(4px, 1vw, 16px)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                background: "transparent",
                border: "none",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                cursor: "pointer",
                textAlign: "left",
                color: "inherit",
                width: "100%",
                transition: "background 0.3s ease",
              }}
            >
              {/* Name */}
              <div>
                <h4
                  style={{
                    fontFamily: "var(--font-fraunces)",
                    fontWeight: 400,
                    fontSize: "clamp(1.2rem, 1.7vw, 1.55rem)",
                    letterSpacing: "-0.015em",
                    color: "rgba(255,255,255,0.94)",
                    margin: "0 0 6px",
                  }}
                >
                  {s.name}
                </h4>
                <p
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "11.5px",
                    color: "rgba(255,255,255,0.42)",
                    margin: 0,
                    letterSpacing: "0.005em",
                  }}
                >
                  {s.adjacency}
                </p>
              </div>

              {/* Sqft */}
              <div className="space-cell">
                <Label>Footprint</Label>
                <Value>{s.sqft}</Value>
              </div>

              {/* Floor */}
              <div className="space-cell">
                <Label>Floor</Label>
                <Value>{s.floor}</Value>
              </div>

              {/* Status + avail */}
              <div className="space-cell">
                <Label>Status</Label>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    aria-hidden
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: STATUS_COLOR[s.status] ?? "#fff",
                      boxShadow: `0 0 8px ${STATUS_COLOR[s.status] ?? "#fff"}`,
                    }}
                  />
                  <Value style={{ color: STATUS_COLOR[s.status] }}>
                    {s.status}
                  </Value>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "10.5px",
                    color: "rgba(255,255,255,0.38)",
                    letterSpacing: "0.01em",
                    marginTop: "2px",
                  }}
                >
                  {s.availability}
                </span>
              </div>

              {/* Arrow */}
              <motion.div
                whileHover={{ x: 4 }}
                className="space-arrow"
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  border: "1px solid rgba(201,169,110,0.30)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(201,169,110,0.08)",
                  flexShrink: 0,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path
                    d="M3 9L9 3M9 3H4M9 3V8"
                    stroke="rgba(201,169,110,0.95)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </motion.button>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .space-row {
            grid-template-columns: 1fr auto !important;
            gap: 12px !important;
          }
          .space-row .space-cell:not(:last-child) {
            grid-column: 1 / -1;
            display: flex !important;
            flex-direction: row !important;
            justify-content: space-between;
            border-top: 1px dashed rgba(255,255,255,0.06);
            padding-top: 10px;
          }
          .space-row .space-arrow {
            align-self: flex-start;
          }
        }
      `}</style>
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "block",
        fontFamily: "var(--font-montserrat)",
        fontSize: "8.5px",
        fontWeight: 500,
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.32)",
        marginBottom: "6px",
      }}
    >
      {children}
    </span>
  );
}

function Value({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <span
      style={{
        fontFamily: "var(--font-montserrat)",
        fontSize: "13.5px",
        fontWeight: 500,
        color: "rgba(255,255,255,0.85)",
        letterSpacing: "0.005em",
        ...style,
      }}
    >
      {children}
    </span>
  );
}
