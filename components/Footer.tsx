"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const LINKS = {
  Explore: [
    { label: "Attractions", href: "#experience" },
    { label: "Dining", href: "#dining" },
    { label: "Luxury Wing", href: "#luxury" },
    { label: "Events", href: "#events" },
    { label: "Brand Partners", href: "#" },
  ],
  Business: [
    { label: "Leasing Inquiries", href: "#" },
    { label: "Sponsorship", href: "#" },
    { label: "Event Booking", href: "#" },
    { label: "Media & Press", href: "#" },
    { label: "Corporate Events", href: "#" },
  ],
  Property: [
    { label: "Why American Dream", href: "#why" },
    { label: "Location & Access", href: "#why" },
    { label: "Visitor Demographics", href: "#why" },
    { label: "Venue Specs", href: "#events" },
    { label: "Virtual Tour", href: "#" },
  ],
  Connect: [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        background: "#F5F5F7",
        paddingTop: "clamp(32px, 5vh, 64px)",
      }}
    >
      <div
        style={{
          width: "100%",
          background: "#0A0F1E",
          position: "relative",
          overflow: "hidden",
          borderTopLeftRadius: "28px",
          borderTopRightRadius: "28px",
        }}
      >
      {/* Ambient orbs */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-40%",
          left: "20%",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(ellipse at center, rgba(201,169,110,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(80px)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-30%",
          right: "10%",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(ellipse at center, rgba(201,169,110,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(60px)",
        }}
      />

      {/* Top gold line */}
      <div
        style={{
          width: "100%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(201,169,110,0.20), transparent)",
        }}
      />

      {/* ═══════════════════════════════════════════
          CTA BANNER
      ═══════════════════════════════════════════ */}
      <div
        style={{
          maxWidth: "1480px",
          margin: "0 auto",
          padding:
            "clamp(48px, 6vh, 72px) clamp(40px, 5vw, 80px) clamp(40px, 5vh, 56px)",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: "9px",
            letterSpacing: "0.48em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
            margin: "0 0 28px",
          }}
        >
          Ready to be part of something bigger?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
          style={{
            fontFamily: "var(--font-montserrat)",
            fontWeight: 800,
            fontSize: "clamp(2.4rem, 5.5vw, 5.5rem)",
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.93)",
            margin: "0 0 20px",
          }}
        >
          Let&rsquo;s build your
          <br />
          presence{" "}
          <span style={{ color: "#C9A96E" }}>here.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.16 }}
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: "clamp(14px, 1.2vw, 17px)",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.35)",
            maxWidth: "520px",
            margin: "0 auto 32px",
            letterSpacing: "0.005em",
          }}
        >
          Whether you&rsquo;re leasing a flagship, launching a brand, or
          booking a 18,000-seat arena — we&rsquo;re ready when you are.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.24 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <motion.button
            whileHover={{ filter: "brightness(1.1)", scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "16px 36px",
              borderRadius: "9999px",
              background: "#C9A96E",
              border: "none",
              fontFamily: "var(--font-montserrat)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#0A0F1E",
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(201,169,110,0.25)",
            }}
          >
            Start a Conversation
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: "inline-block" }}
            >
              →
            </motion.span>
          </motion.button>

          <motion.button
            whileHover={{
              background: "rgba(255,255,255,0.10)",
              borderColor: "rgba(255,255,255,0.22)",
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "16px 36px",
              borderRadius: "9999px",
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.10)",
              fontFamily: "var(--font-montserrat)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            Download Deck
          </motion.button>
        </motion.div>
      </div>

      {/* Divider */}
      <div
        style={{
          maxWidth: "1480px",
          margin: "0 auto",
          padding: "0 clamp(40px, 5vw, 80px)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)",
          }}
        />
      </div>

      {/* ═══════════════════════════════════════════
          LINKS GRID
      ═══════════════════════════════════════════ */}
      <div
        className="footer-links"
        style={{
          maxWidth: "1480px",
          margin: "0 auto",
          padding:
            "clamp(36px, 4vh, 52px) clamp(40px, 5vw, 80px)",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "clamp(24px, 4vw, 64px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {Object.entries(LINKS).map(([category, links], ci) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: ci * 0.08 }}
          >
            <p
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "9px",
                fontWeight: 600,
                letterSpacing: "0.30em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.30)",
                margin: "0 0 24px",
              }}
            >
              {category}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {links.map((link) => (
                <li key={link.label} style={{ marginBottom: "14px" }}>
                  <a
                    href={link.href}
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "13px",
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.40)",
                      textDecoration: "none",
                      letterSpacing: "0.01em",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "rgba(201,169,110,0.85)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(255,255,255,0.40)")
                    }
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <div
        style={{
          maxWidth: "1480px",
          margin: "0 auto",
          padding: "0 clamp(40px, 5vw, 80px)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
          }}
        />
      </div>

      {/* ═══════════════════════════════════════════
          BOTTOM BAR
      ═══════════════════════════════════════════ */}
      <div
        className="footer-bottom"
        style={{
          maxWidth: "1480px",
          margin: "0 auto",
          padding:
            "clamp(20px, 3vh, 32px) clamp(40px, 5vw, 80px) clamp(24px, 3vh, 36px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          flexWrap: "wrap",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "12px",
              fontWeight: 400,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.50)",
            }}
          >
            American Dream
          </span>
          <div
            style={{
              width: "1px",
              height: "14px",
              background: "rgba(255,255,255,0.10)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "9px",
              letterSpacing: "0.20em",
              textTransform: "uppercase",
              color: "rgba(201,169,110,0.45)",
            }}
          >
            The Platform
          </span>
        </div>

        {/* Legal */}
        <p
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: "10px",
            color: "rgba(255,255,255,0.18)",
            margin: 0,
            letterSpacing: "0.04em",
          }}
        >
          &copy; {new Date().getFullYear()} American Dream. All rights
          reserved. Meadowlands, NJ.
        </p>

        {/* Minimal social links */}
        <div style={{ display: "flex", gap: "16px" }}>
          {["IG", "LI", "YT"].map((s) => (
            <a
              key={s}
              href="#"
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "9px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                color: "rgba(255,255,255,0.22)",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(201,169,110,0.70)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.22)")
              }
            >
              {s}
            </a>
          ))}
        </div>
      </div>
      </div>
    </footer>
  );
}
