"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const METRICS = [
  {
    raw: 40,
    suffix: "M+",
    prefix: "",
    label: "Annual Visitors",
    context: "Across retail, dining, entertainment & live events",
    duration: 2.0,
  },
  {
    raw: 3,
    suffix: "M ft²",
    prefix: "",
    label: "Total Footprint",
    context: "Leasable retail, events & hospitality space",
    duration: 1.6,
  },
  {
    raw: 450,
    suffix: "+",
    prefix: "",
    label: "Brand Partners",
    context: "Luxury, mid-tier, F&B and experiential tenants",
    duration: 2.2,
  },
  {
    raw: 2,
    suffix: "B+",
    prefix: "$",
    label: "Revenue Potential",
    context: "Combined annual commercial opportunity",
    duration: 1.4,
  },
] as const;

const SIMULATOR_OPTIONS = [
  { label: "Luxury Flagship", range: "$840K – $1.4M / mo" },
  { label: "Mid-tier Retail", range: "$320K – $680K / mo" },
  { label: "F&B Concept", range: "$180K – $420K / mo" },
  { label: "Pop-up / Event", range: "$60K – $200K / event" },
];

/* ── Count-up hook ── */
function useCountUp(end: number, duration: number, inView: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, end, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.floor(v)),
    });
    return ctrl.stop;
  }, [inView, end, duration]);
  return value;
}

/* ── Individual metric block ── */
function MetricBlock({
  metric,
  inView,
  index,
}: {
  metric: (typeof METRICS)[number];
  inView: boolean;
  index: number;
}) {
  const count = useCountUp(metric.raw, metric.duration, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: EASE, delay: 0.1 + index * 0.12 }}
      whileHover={{ backgroundColor: "rgba(201,169,110,0.05)" }}
      style={{
        flex: "1 1 0",
        padding: "clamp(28px, 4vh, 52px) clamp(24px, 3vw, 52px)",
        display: "flex",
        flexDirection: "column",
        cursor: "default",
        borderRadius: "4px",
        transition: "background-color 0.4s ease",
      }}
    >
      {/* Gold top rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, ease: EASE, delay: 0.2 + index * 0.12 }}
        style={{
          width: "28px",
          height: "1px",
          background: "#C9A96E",
          marginBottom: "28px",
          transformOrigin: "left center",
        }}
      />

      {/* Number */}
      <div
        style={{
          fontFamily: "var(--font-montserrat)",
          fontWeight: 800,
          fontSize: "clamp(3.2rem, 6vw, 6.4rem)",
          lineHeight: 0.9,
          letterSpacing: "-0.035em",
          color: "#1D1D1F",
        }}
      >
        {metric.prefix}
        {count}
        {metric.suffix}
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily: "var(--font-geist-sans)",
          fontSize: "10px",
          fontWeight: 500,
          letterSpacing: "0.30em",
          textTransform: "uppercase",
          color: "rgba(0,0,0,0.38)",
          marginTop: "16px",
        }}
      >
        {metric.label}
      </div>

      {/* Context */}
      <p
        style={{
          fontFamily: "var(--font-geist-sans)",
          fontSize: "12px",
          lineHeight: 1.65,
          color: "rgba(0,0,0,0.32)",
          marginTop: "12px",
          maxWidth: "220px",
          fontWeight: 400,
        }}
      >
        {metric.context}
      </p>
    </motion.div>
  );
}

/* ── Revenue simulator ── */
function RevenueSimulator() {
  const [selected, setSelected] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
      style={{
        marginTop: "clamp(40px, 6vh, 72px)",
        borderTop: "1px solid rgba(0,0,0,0.07)",
        paddingTop: "clamp(36px, 5vh, 60px)",
        display: "flex",
        alignItems: "center",
        gap: "clamp(24px, 6vw, 96px)",
        flexWrap: "wrap",
      }}
    >
      {/* Left: label */}
      <div style={{ flex: "0 0 auto" }}>
        <p
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "9px",
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            color: "rgba(0,0,0,0.35)",
            margin: "0 0 10px",
          }}
        >
          Revenue Simulator
        </p>
        <p
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "13px",
            color: "rgba(0,0,0,0.50)",
            margin: 0,
            maxWidth: "220px",
            lineHeight: 1.6,
          }}
        >
          Estimate your monthly
          <br />
          revenue opportunity.
        </p>
      </div>

      {/* Center: selector tabs */}
      <div
        style={{
          flex: "1 1 auto",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          flexWrap: "wrap",
        }}
      >
        {SIMULATOR_OPTIONS.map((opt, i) => (
          <button
            key={opt.label}
            onClick={() => setSelected(i)}
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.04em",
              padding: "9px 18px",
              borderRadius: "9999px",
              border: "1px solid",
              borderColor:
                selected === i ? "rgba(0,0,0,0.22)" : "rgba(0,0,0,0.09)",
              background:
                selected === i ? "#1D1D1F" : "transparent",
              color: selected === i ? "#FFFFFF" : "rgba(0,0,0,0.50)",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Right: result */}
      <motion.div
        key={selected}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        style={{ flex: "0 0 auto", textAlign: "right" }}
      >
        <div
          style={{
            fontFamily: "var(--font-montserrat)",
            fontWeight: 700,
            fontSize: "clamp(1.4rem, 2.4vw, 2rem)",
            letterSpacing: "-0.03em",
            color: "#1D1D1F",
            lineHeight: 1,
          }}
        >
          {SIMULATOR_OPTIONS[selected].range}
        </div>
        <p
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "9px",
            letterSpacing: "0.30em",
            textTransform: "uppercase",
            color: "rgba(0,0,0,0.30)",
            marginTop: "8px",
          }}
        >
          Est. Revenue Share
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ── Main section ── */
export default function NumbersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      id="numbers"
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
          padding: "clamp(48px, 7vh, 96px) clamp(32px, 5vw, 96px)",
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "32px",
            flexWrap: "wrap",
            marginBottom: "clamp(48px, 8vh, 96px)",
          }}
        >
          {/* Left: headline */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "9px",
                letterSpacing: "0.44em",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.35)",
                margin: "0 0 24px",
              }}
            >
              03 — Property Scale
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
                lineHeight: 0.92,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                color: "#1D1D1F",
                margin: 0,
              }}
            >
              Built for scale.
              <br />
              Proven by numbers.
            </motion.h2>
          </div>

          {/* Right: descriptor */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.18 }}
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "14px",
              lineHeight: 1.75,
              color: "rgba(0,0,0,0.45)",
              maxWidth: "340px",
              margin: 0,
            }}
          >
            Every metric tells the same story. American Dream isn&rsquo;t
            a mall — it&rsquo;s a market. A platform. The most commercially
            powerful retail destination in the western hemisphere.
          </motion.p>
        </div>

        {/* ── Metrics grid ── */}
        <div ref={ref}>
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              borderTop: "1px solid rgba(0,0,0,0.07)",
            }}
          >
            {METRICS.map((metric, i) => (
              <div
                key={metric.label}
                style={{ display: "flex", flex: "1 1 0", minWidth: 0 }}
              >
                {i !== 0 && (
                  <div
                    style={{
                      width: "1px",
                      alignSelf: "stretch",
                      background:
                        "linear-gradient(to bottom, transparent, rgba(0,0,0,0.08), transparent)",
                      flexShrink: 0,
                    }}
                  />
                )}
                <MetricBlock metric={metric} inView={inView} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Revenue simulator ── */}
        <RevenueSimulator />
      </div>
    </section>
  );
}
