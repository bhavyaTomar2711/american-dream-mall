"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const ROW_1 = [
  { src: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776155642/Armani_Exchange_595_dorkyy.webp", alt: "Armani Exchange" },
  { src: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776155642/Uniqlo_Lifewear_595_xsmn3n.webp", alt: "Uniqlo" },
  { src: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776155642/venue-detail-bath-and-body-works_b1d1ay.webp", alt: "Bath & Body Works" },
  { src: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776155641/H_M_rbuajp.jpg", alt: "H&M" },
  { src: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776155642/Boss_-_595_x_433_px_jnm3yu.webp", alt: "Hugo Boss" },
];

const ROW_2 = [
  { src: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776155641/venue-detail-pink_rifgiu.webp", alt: "PINK" },
  { src: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776155641/venue-detail-aerie_jjn4xn.webp", alt: "Aerie" },
  { src: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776155641/venue-detail-pandora_vbwuki.webp", alt: "Pandora" },
  { src: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776155641/American_Eagle_Outfitters_vector_logo_svg_ai_free_download_-_Brandlogos_net_tff3rv.jpg", alt: "American Eagle" },
  { src: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776155641/venue-detail-victorias-secret_jlhzhs.webp", alt: "Victoria's Secret" },
];

const TICKER_1 = [...ROW_1, ...ROW_1, ...ROW_1];
const TICKER_2 = [...ROW_2, ...ROW_2, ...ROW_2];

const STATS = [
  { value: "450+", label: "Brand Partners" },
  { value: "85%", label: "Lease Renewal Rate" },
  { value: "50+", label: "Flagship Stores" },
  { value: "#1", label: "Retail Destination" },
];

function LogoCard({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        boxShadow:
          "0 20px 48px -12px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
      }}
      transition={{ duration: 0.4, ease: EASE }}
      style={{
        flexShrink: 0,
        width: "clamp(130px, 14vw, 170px)",
        height: "clamp(130px, 14vw, 170px)",
        borderRadius: "24px",
        background: "#FFFFFF",
        border: "1px solid rgba(0,0,0,0.05)",
        boxShadow:
          "0 4px 20px -4px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.03)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "default",
        transition: "box-shadow 0.4s ease",
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        draggable={false}
        style={{
          width: "62%",
          height: "62%",
          objectFit: "contain",
          userSelect: "none",
          WebkitUserSelect: "none",
          transition: "transform 0.4s ease",
        }}
      />
    </motion.div>
  );
}

export default function BrandMarquee() {
  return (
    <section
      style={{
        background: "#F5F5F7",
        padding: "clamp(72px, 10vh, 120px) 0 clamp(56px, 7vh, 88px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle top accent line */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: "15%",
          right: "15%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(0,0,0,0.06), transparent)",
        }}
      />

      {/* ── Header ── */}
      <div
        style={{
          maxWidth: "1480px",
          margin: "0 auto",
          padding: "0 clamp(24px, 5vw, 80px)",
          marginBottom: "clamp(48px, 6vh, 72px)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "clamp(32px, 4vw, 64px)",
          flexWrap: "wrap",
        }}
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "1px",
                background: "#C9A96E",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.48em",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.38)",
              }}
            >
              Our Partners
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 700,
              fontSize: "clamp(2.2rem, 4.8vw, 5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: "#1D1D1F",
              margin: 0,
            }}
          >
            A destination for the
            <br />
            world&rsquo;s leading{" "}
            <span style={{ color: "#C9A96E" }}>brands.</span>
          </motion.h2>
        </div>

        {/* Stats strip — right side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          style={{
            display: "flex",
            gap: "clamp(24px, 3vw, 48px)",
            flexWrap: "wrap",
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 700,
                  fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
                  letterSpacing: "-0.02em",
                  color: "#1D1D1F",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "8px",
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(0,0,0,0.30)",
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Row 1 — slides right ── */}
      <div style={{ position: "relative", marginBottom: "clamp(14px, 2vw, 22px)" }}>
        {/* Fade masks */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "clamp(80px, 14vw, 220px)",
            background: "linear-gradient(to right, #F5F5F7 0%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "clamp(80px, 14vw, 220px)",
            background: "linear-gradient(to left, #F5F5F7 0%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        <motion.div
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{ x: { duration: 35, repeat: Infinity, ease: "linear" } }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(14px, 2vw, 22px)",
            width: "max-content",
          }}
        >
          {TICKER_1.map((logo, i) => (
            <LogoCard key={`r1-${logo.alt}-${i}`} src={logo.src} alt={logo.alt} />
          ))}
        </motion.div>
      </div>

      {/* ── Row 2 — slides left (opposite) ── */}
      <div style={{ position: "relative" }}>
        {/* Fade masks */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "clamp(80px, 14vw, 220px)",
            background: "linear-gradient(to right, #F5F5F7 0%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "clamp(80px, 14vw, 220px)",
            background: "linear-gradient(to left, #F5F5F7 0%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        <motion.div
          animate={{ x: ["-33.333%", "0%"] }}
          transition={{ x: { duration: 30, repeat: Infinity, ease: "linear" } }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(14px, 2vw, 22px)",
            width: "max-content",
          }}
        >
          {TICKER_2.map((logo, i) => (
            <LogoCard key={`r2-${logo.alt}-${i}`} src={logo.src} alt={logo.alt} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
