"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInquiry } from "@/providers/InquiryProvider";

type NavLink = {
  label: string;
  href: string;
  kind: "anchor" | "route";
};

const NAV_LINKS: NavLink[] = [
  { label: "Retail", href: "#explore", kind: "anchor" },
  { label: "Luxury", href: "#luxury", kind: "anchor" },
  { label: "Experience", href: "#experience", kind: "anchor" },
  { label: "Dining", href: "#dining", kind: "anchor" },
  { label: "Events", href: "#events", kind: "anchor" },
  { label: "Venues", href: "/venues", kind: "route" },
  { label: "Leasing", href: "/leasing", kind: "route" },
];

type Theme = "dark" | "light";

/* ─────────────────────────────────────────────
   Theme palettes
   "dark"  → navbar is over a dark background → use light text
   "light" → navbar is over a light background → use dark text
───────────────────────────────────────────── */
const PALETTE: Record<
  Theme,
  {
    bg: string;
    border: string;
    shadow: string;
    logo: string;
    linkIdle: string;
    linkHover: string;
    ctaBg: string;
    ctaBorder: string;
    ctaColor: string;
    weight: number;
  }
> = {
  dark: {
    bg: "rgba(255, 255, 255, 0.11)",
    border: "1px solid rgba(255, 255, 255, 0.16)",
    shadow:
      "0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255,255,255,0.14)",
    logo: "rgba(255,255,255,0.70)",
    linkIdle: "rgba(255,255,255,0.80)",
    linkHover: "rgba(255,255,255,1)",
    ctaBg: "rgba(255,255,255,0.06)",
    ctaBorder: "1px solid rgba(255,255,255,0.09)",
    ctaColor: "rgba(255,255,255,0.65)",
    weight: 400,
  },
  light: {
    bg: "rgba(255, 255, 255, 0.78)",
    border: "1px solid rgba(10, 15, 30, 0.09)",
    shadow:
      "0 8px 32px rgba(10, 15, 30, 0.08), inset 0 1px 0 rgba(255,255,255,0.80)",
    logo: "rgba(10,15,30,0.92)",
    linkIdle: "rgba(10,15,30,0.85)",
    linkHover: "rgba(10,15,30,1)",
    ctaBg: "rgba(10,15,30,0.06)",
    ctaBorder: "1px solid rgba(10,15,30,0.12)",
    ctaColor: "rgba(10,15,30,0.85)",
    weight: 600,
  },
};

function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const { open } = useInquiry();
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const getSections = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-nav-theme]"));

    // Probe point — center of the navbar pill vertically (~y=40).
    const PROBE_Y = 44;

    const check = () => {
      const sections = getSections();
      if (!sections.length) return;

      const y = window.scrollY + PROBE_Y;
      let current: Theme = "dark";
      for (const s of sections) {
        if (s.offsetTop <= y) {
          const t = s.getAttribute("data-nav-theme");
          if (t === "dark" || t === "light") current = t;
        } else {
          break;
        }
      }
      setTheme((prev) => (prev === current ? prev : current));
    };

    check();
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(check);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const p = PALETTE[theme];

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className="fixed top-5 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none"
    >
      <nav
        className="flex items-center justify-between w-full max-w-[1060px] px-7 py-3.5 rounded-full pointer-events-auto"
        style={{
          background: p.bg,
          backdropFilter: "blur(24px) saturate(160%)",
          WebkitBackdropFilter: "blur(24px) saturate(160%)",
          border: p.border,
          boxShadow: p.shadow,
          transition:
            "background 0.45s ease, border-color 0.45s ease, box-shadow 0.45s ease",
        }}
      >
        {/* Logo: square symbol mark + wordmark text */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            fontFamily: "var(--font-montserrat)",
            fontSize: "11px",
            fontWeight: p.weight,
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: p.logo,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            transition: "color 0.45s ease, font-weight 0.45s ease",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://res.cloudinary.com/dwo1snivu/image/upload/v1776278785/American_Dream__Symbol_ldufrd.svg"
            alt=""
            aria-hidden
            width={24}
            height={24}
            style={{
              width: "24px",
              height: "24px",
              /* Dark theme: invert the black mark to white so it reads on
                 the translucent glass over the hero video. Light theme:
                 render native black on the white-frost glass. */
              filter: theme === "dark" ? "invert(1) brightness(1.1)" : "none",
              transition: "filter 0.45s ease",
            }}
            draggable={false}
          />
          <span>American Dream</span>
        </button>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const linkStyle: React.CSSProperties = {
              fontFamily: "var(--font-montserrat)",
              fontSize: "10.5px",
              fontWeight: p.weight,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: p.linkIdle,
              transition: "color 0.45s ease",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            };
            const onEnter = (e: React.MouseEvent<HTMLElement>) =>
              (e.currentTarget.style.color = p.linkHover);
            const onLeave = (e: React.MouseEvent<HTMLElement>) =>
              (e.currentTarget.style.color = p.linkIdle);

            if (link.kind === "route") {
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  style={linkStyle}
                  onMouseEnter={onEnter}
                  onMouseLeave={onLeave}
                >
                  {link.label}
                  {/* Small gold dot: signals this is a dedicated page, not an anchor */}
                  <span
                    aria-hidden
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "#C9A96E",
                      boxShadow: "0 0 6px rgba(201,169,110,0.60)",
                    }}
                  />
                </Link>
              );
            }

            return (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                style={linkStyle}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.03, filter: "brightness(1.15)" }}
          whileTap={{ scale: 0.97 }}
          onClick={() => open("leasing")}
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: "10.5px",
            fontWeight: p.weight,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: p.ctaColor,
            background: p.ctaBg,
            border: p.ctaBorder,
            borderRadius: "9999px",
            padding: "8px 18px",
            cursor: "pointer",
            transition:
              "color 0.45s ease, background 0.45s ease, border-color 0.45s ease",
          }}
        >
          Start Journey
        </motion.button>
      </nav>
    </motion.header>
  );
}
