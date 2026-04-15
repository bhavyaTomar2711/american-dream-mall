"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInquiry } from "@/providers/InquiryProvider";

/* ─────────────────────────────────────────────
   Minimal, premium top nav for /venues surface.
   Mirrors LeasingNav but labelled for Venues.
───────────────────────────────────────────── */

export default function VenuesNav() {
  const { open } = useInquiry();
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="fixed top-5 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none"
    >
      <nav
        className="flex items-center justify-between w-full max-w-[960px] px-7 py-3.5 rounded-full pointer-events-auto"
        style={{
          background: "rgba(10, 10, 14, 0.55)",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.10)",
          boxShadow:
            "0 14px 48px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            fontFamily: "var(--font-montserrat)",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.78)",
            textDecoration: "none",
          }}
        >
          <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path
              d="M8 2L4 6L8 10"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://res.cloudinary.com/dwo1snivu/image/upload/v1776278785/American_Dream__Symbol_ldufrd.svg"
            alt=""
            aria-hidden
            width={22}
            height={22}
            style={{
              width: "22px",
              height: "22px",
              filter: "invert(1) brightness(1.1)",
            }}
            draggable={false}
          />
          American Dream
        </Link>

        <div
          className="hidden md:flex items-center gap-2.5"
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: "9.5px",
            fontWeight: 500,
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.36)",
          }}
        >
          <span>Commercial</span>
          <span
            aria-hidden
            style={{
              width: "18px",
              height: "1px",
              background: "rgba(201,169,110,0.55)",
            }}
          />
          <span style={{ color: "rgba(201,169,110,0.80)" }}>Venues</span>
        </div>

        <motion.button
          whileHover={{ filter: "brightness(1.12)", scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => open("booking")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "9px 20px",
            borderRadius: "9999px",
            background: "#C9A96E",
            border: "none",
            fontFamily: "var(--font-montserrat)",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.20em",
            textTransform: "uppercase",
            color: "#0A0F1E",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(201,169,110,0.30)",
          }}
        >
          Book
          <motion.span
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ display: "inline-block" }}
          >
            →
          </motion.span>
        </motion.button>
      </nav>
    </motion.header>
  );
}
