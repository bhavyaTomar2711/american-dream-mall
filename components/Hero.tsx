"use client";

import { useRouter } from "next/navigation";
import { motion, type Variants } from "framer-motion";

function scrollToId(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const VIDEO_URL =
  "https://res.cloudinary.com/dwo1snivu/video/upload/q_auto,f_auto/v1775988777/InShot_20260412_152744988_ocz9ev.mp4";
// Lightweight first-frame still (Cloudinary generates from the video) — used as the LCP element
// so the page doesn't wait on the MP4 to paint. w_1280 + q_auto:good trims mobile bytes hard.
const VIDEO_POSTER =
  "https://res.cloudinary.com/dwo1snivu/video/upload/so_0,f_auto,q_auto:good,w_1280/v1775988777/InShot_20260412_152744988_ocz9ev.jpg";

const STATS = [
  { value: "40M+", label: "Annual Visitors" },
  { value: "3M ft²", label: "Total Footprint" },
  { value: "450+", label: "Brand Partners" },
  { value: "$2B+", label: "Development Value" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};

const fade: Variants = {
  hidden: { opacity: 0 },
  show: (d: number = 0) => ({
    opacity: 1,
    transition: { duration: 1.4, ease: "easeOut", delay: d },
  }),
};

export default function Hero() {
  const router = useRouter();
  return (
    <section data-nav-theme="dark" className="relative w-full h-screen overflow-hidden">

      {/* ── LCP: poster paints immediately (high priority, responsive) ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={VIDEO_POSTER}
        alt=""
        aria-hidden
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* ── Video fades in once decoded, layered on top of the poster ── */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* ── Base dark overlay ── */}
      <div className="absolute inset-0 z-[1]" style={{ background: "rgba(3,7,22,0.52)" }} />

      {/* ── Cinematic gradient ── */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(3,7,22,0.98) 0%,
            rgba(3,7,22,0.80) 12%,
            rgba(3,7,22,0.18) 35%,
            rgba(3,7,22,0.18) 65%,
            rgba(3,7,22,0.80) 88%,
            rgba(3,7,22,0.98) 100%
          )`,
        }}
      />

      {/* ── Left content shadow for readability ── */}
      <div
        className="absolute inset-0 z-[3]"
        style={{
          background:
            "linear-gradient(100deg, rgba(3,7,22,0.72) 0%, rgba(3,7,22,0.28) 45%, transparent 70%)",
        }}
      />

      {/* ── All content ── */}
      <div className="relative z-10 h-full flex flex-col">

        {/* Navbar spacer */}
        <div className="h-24 shrink-0" />

        {/* ── Main body: left content + right accent ── */}
        <div className="flex-1 flex px-5 md:px-16 lg:px-24 overflow-x-hidden">

          {/* ── LEFT: Content stack ── */}
          <div className="flex flex-col justify-center flex-1 min-w-0 overflow-hidden">

            {/* Pre-header */}
            <motion.div
              custom={0.5}
              variants={fade}
              initial="hidden"
              animate="show"
              style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}
            >
              <div style={{ width: "32px", height: "1px", background: "rgba(201,169,110,0.50)" }} />
              <span
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "9px",
                  letterSpacing: "0.40em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                Ranked #1 Retail Destination · USA
              </span>
            </motion.div>

            {/* ── Headline ── */}
            <div style={{ overflow: "hidden" }}>
              <motion.h1
                custom={0.68}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="hero-headline md:whitespace-nowrap whitespace-normal"
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 600,
                  fontSize: "clamp(3rem, 5.4vw, 6.2rem)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.02em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.95)",
                  display: "block",
                }}
              >
                Not A Mall
              </motion.h1>
            </div>

            <div style={{ overflow: "hidden", marginTop: "6px" }}>
              <motion.p
                custom={0.84}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="hero-headline md:whitespace-nowrap whitespace-normal"
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 600,
                  fontSize: "clamp(3rem, 5.4vw, 6.2rem)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.02em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.95)",
                  display: "block",
                  margin: 0,
                }}
              >
                This Is A{" "}
                <span style={{ color: "#C9A96E" }}>Platform</span>
              </motion.p>
            </div>

            {/* Thin gold rule */}
            <motion.div
              custom={0.96}
              variants={fade}
              initial="hidden"
              animate="show"
              style={{
                width: "48px",
                height: "1px",
                background: "linear-gradient(90deg, rgba(201,169,110,0.60), transparent)",
                marginTop: "32px",
                marginBottom: "24px",
              }}
            />

            {/* Subtext */}
            <motion.p
              custom={1.05}
              variants={fade}
              initial="hidden"
              animate="show"
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "13px",
                lineHeight: 1.9,
                color: "rgba(255,255,255,0.55)",
                maxWidth: "400px",
                letterSpacing: "0.02em",
              }}
            >
              The western hemisphere's most immersive retail and entertainment
              destination — built for global brands.
            </motion.p>

            {/* ── CTAs ── */}
            <motion.div
              custom={1.20}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              style={{ marginTop: "40px" }}
            >
              <div
                className="hero-cta-wrapper"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  borderRadius: "9999px",
                  background: "rgba(255,255,255,0.09)",
                  backdropFilter: "blur(24px) saturate(160%)",
                  WebkitBackdropFilter: "blur(24px) saturate(160%)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.12)",
                  padding: "5px",
                  gap: "4px",
                }}
              >
                {/* Primary CTA */}
                <motion.button
                  whileHover={{ filter: "brightness(1.08)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={() => scrollToId("#why")}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 28px",
                    borderRadius: "9999px",
                    background: "rgba(255,255,255,0.92)",
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "11px",
                    letterSpacing: "0.20em",
                    textTransform: "uppercase",
                    color: "rgba(3,7,22,0.88)",
                    fontWeight: 500,
                    cursor: "pointer",
                    border: "none",
                  }}
                >
                  Explore the Property
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ display: "inline-block" }}
                  >
                    →
                  </motion.span>
                </motion.button>

                {/* Secondary CTA */}
                <motion.button
                  whileHover={{ color: "rgba(255,255,255,0.95)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={() => router.push("/leasing")}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 24px",
                    borderRadius: "9999px",
                    background: "transparent",
                    border: "none",
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "11px",
                    letterSpacing: "0.20em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.60)",
                    cursor: "pointer",
                  }}
                >
                  Explore Leasing
                  <span
                    aria-hidden
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "#C9A96E",
                      boxShadow: "0 0 6px rgba(201,169,110,0.70)",
                    }}
                  />
                </motion.button>
              </div>
            </motion.div>

            {/* ── Stats under CTA ── */}
            <motion.div
              custom={1.45}
              variants={fade}
              initial="hidden"
              animate="show"
              style={{ marginTop: "60px" }}
            >
              <div
                className="hero-stats"
                style={{
                  display: "flex",
                  alignItems: "stretch",
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(20px) saturate(160%)",
                  WebkitBackdropFilter: "blur(20px) saturate(160%)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.08)",
                  width: "68vw",
                  maxWidth: "800px",
                }}
              >
                {STATS.map((stat, i) => (
                  <div key={stat.value} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                    <div
                      style={{
                        flex: 1,
                        padding: "26px 28px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-montserrat)",
                          fontWeight: 300,
                          fontSize: "22px",
                          lineHeight: 1,
                          letterSpacing: "-0.03em",
                          color: "rgba(255,255,255,0.90)",
                        }}
                      >
                        {stat.value}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-montserrat)",
                          fontSize: "7.5px",
                          letterSpacing: "0.20em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.28)",
                          lineHeight: 1,
                        }}
                      >
                        {stat.label}
                      </span>
                    </div>
                    {i < STATS.length - 1 && (
                      <div
                        style={{
                          width: "1px",
                          alignSelf: "stretch",
                          background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.10), transparent)",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Vertical accent text ── */}
          <div className="hidden lg:flex items-center justify-end pb-8" style={{ width: "48px", flexShrink: 0 }}>
            <motion.div
              custom={1.6}
              variants={fade}
              initial="hidden"
              animate="show"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                transform: "rotate(180deg)",
                fontFamily: "var(--font-montserrat)",
                fontSize: "8px",
                letterSpacing: "0.36em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.18)",
                whiteSpace: "nowrap",
              }}
            >
              American Dream · Meadowlands · Est. 2019
            </motion.div>
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <motion.div
          custom={2.0}
          variants={fade}
          initial="hidden"
          animate="show"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            paddingBottom: "32px",
            alignSelf: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "7.5px",
              letterSpacing: "0.44em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.14)",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              position: "relative",
              width: "1px",
              height: "36px",
              background: "rgba(255,255,255,0.06)",
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "linear-gradient(to bottom, transparent, rgba(201,169,110,0.60), transparent)",
              }}
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: 2.5 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
