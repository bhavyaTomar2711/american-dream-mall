"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useInquiry } from "@/providers/InquiryProvider";
import { useMenu } from "@/providers/MenuProvider";
import { usePresentation } from "@/providers/PresentationProvider";

const EASE = [0.22, 1, 0.36, 1] as const;

const AD_LOGO =
  "https://res.cloudinary.com/dwo1snivu/image/upload/v1776278785/American_Dream__Symbol_ldufrd.svg";

const HOME_THUMB =
  "https://res.cloudinary.com/dwo1snivu/video/upload/so_0,w_1200/v1775988777/InShot_20260412_152744988_ocz9ev.jpg";
const LEASING_THUMB =
  "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto,w_1200/v1776272292/Luxury_hero___202604152227_vta9sw.jpg";
const VENUES_THUMB =
  "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto,w_1200/v1776191272/pexels-jibarofoto-18482996_ivrrqm.jpg";
const INQUIRE_THUMB =
  "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto,w_1200/v1776186621/make_it_from_202604142239_k6k1bg.jpg";

type NavItem = {
  index: string;
  label: string;
  accent: string;
  href?: string;
  inquiry?: boolean;
  thumb: string;
  description: string;
};

const NAV_ITEMS: NavItem[] = [
  {
    index: "01",
    label: "Home",
    accent: "Opening",
    href: "/",
    thumb: HOME_THUMB,
    description: "The platform overture — video hero, key stats, and the narrative arc in fourteen slides.",
  },
  {
    index: "02",
    label: "Leasing",
    accent: "Paths",
    href: "/leasing",
    thumb: LEASING_THUMB,
    description: "Four commercial paths — luxury, retail, dining, and pop-up — each with its own story and CTA.",
  },
  {
    index: "03",
    label: "Venues",
    accent: "Spaces",
    href: "/venues",
    thumb: VENUES_THUMB,
    description: "Arena, theatre, expo hall, private entertaining — every scale, every format, every audience.",
  },
  {
    index: "04",
    label: "Inquire",
    accent: "Begin",
    inquiry: true,
    thumb: INQUIRE_THUMB,
    description: "Leasing, sponsorship, booking, or press — one form, routed to the right inbox.",
  },
];

export default function MenuDrawer() {
  const { isOpen, close } = useMenu();
  const { open: openInquiry } = useInquiry();
  const { start: startPresentation } = usePresentation();
  const pathname = usePathname();
  const [hovered, setHovered] = useState<number | null>(null);

  // Auto-close on route change (skip initial mount)
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      close();
    }
  }, [pathname, close]);

  // ESC to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (isOpen) {
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [isOpen, close]);

  // Prevent the drawer's keydown from triggering deck navigation
  const stopKeys = (e: React.KeyboardEvent) => {
    if (
      e.key === "ArrowRight" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === " "
    ) {
      e.stopPropagation();
    }
  };

  const previewItem = NAV_ITEMS[hovered ?? 0];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          onKeyDown={stopKeys}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(6,10,20,0.82)",
            backdropFilter: "blur(32px) saturate(160%)",
            WebkitBackdropFilter: "blur(32px) saturate(160%)",
            overflow: "hidden",
          }}
        >
          {/* Background preview image — blurred, very faded */}
          <AnimatePresence mode="wait">
            <motion.div
              key={previewItem.thumb}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.18 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${previewItem.thumb})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(30px) saturate(1.4)",
                transform: "scale(1.1)",
                pointerEvents: "none",
              }}
            />
          </AnimatePresence>

          {/* Dark overlay for readability */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(105deg, rgba(6,10,20,0.88) 0%, rgba(6,10,20,0.50) 55%, rgba(6,10,20,0.40) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Ambient orbs */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "-15%",
              left: "-5%",
              width: "600px",
              height: "600px",
              background:
                "radial-gradient(ellipse at center, rgba(201,169,110,0.08) 0%, transparent 70%)",
              filter: "blur(80px)",
              pointerEvents: "none",
            }}
          />

          {/* Dot grid */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.020) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              pointerEvents: "none",
            }}
          />

          {/* ── Top bar: logo + close ── */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            style={{
              position: "absolute",
              top: "clamp(22px, 3vh, 38px)",
              left: "clamp(36px, 5vw, 72px)",
              right: "clamp(36px, 5vw, 72px)",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <img
                src={AD_LOGO}
                alt="American Dream"
                style={{ width: "30px", height: "30px" }}
              />
              <div
                style={{
                  width: "1px",
                  height: "18px",
                  background: "rgba(255,255,255,0.14)",
                }}
              />
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "10.5px",
                    fontWeight: 600,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.82)",
                    lineHeight: 1.2,
                  }}
                >
                  American Dream
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "8.5px",
                    fontWeight: 500,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(201,169,110,0.75)",
                    lineHeight: 1.2,
                  }}
                >
                  The Platform
                </div>
              </div>
            </div>

            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.08, borderColor: "rgba(201,169,110,0.50)" }}
              whileTap={{ scale: 0.94 }}
              onClick={close}
              aria-label="Close menu"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "border-color 0.4s ease",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 4L12 12M12 4L4 12"
                  stroke="rgba(255,255,255,0.75)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </motion.button>
          </motion.div>

          {/* ── Content: nav links + preview ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              padding:
                "clamp(100px, 14vh, 160px) clamp(36px, 5vw, 72px) clamp(70px, 10vh, 120px)",
              gap: "clamp(32px, 5vw, 80px)",
              zIndex: 5,
            }}
          >
            {/* LEFT: nav links */}
            <div
              style={{
                flex: "1 1 auto",
                minWidth: 0,
                maxWidth: "780px",
                display: "flex",
                flexDirection: "column",
                gap: "clamp(4px, 0.5vh, 8px)",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "clamp(20px, 3vh, 36px)",
                }}
              >
                <div
                  style={{
                    width: "22px",
                    height: "1px",
                    background: "rgba(201,169,110,0.55)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "9.5px",
                    fontWeight: 500,
                    letterSpacing: "0.48em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.40)",
                  }}
                >
                  Navigate
                </span>
              </motion.div>

              {NAV_ITEMS.map((item, i) => {
                const isActive = item.href === pathname;
                const content = (
                  <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.22 + i * 0.08 }}
                    onMouseEnter={() => setHovered(i)}
                    onFocus={() => setHovered(i)}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "44px 1fr",
                      gap: "clamp(14px, 2vw, 28px)",
                      alignItems: "center",
                      padding: "clamp(12px, 1.5vh, 20px) 0",
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                      cursor: "pointer",
                      position: "relative",
                    }}
                  >
                    {/* Index */}
                    <div
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "11px",
                        fontWeight: 500,
                        letterSpacing: "0.24em",
                        color:
                          hovered === i
                            ? "rgba(201,169,110,0.95)"
                            : "rgba(255,255,255,0.30)",
                        transition: "color 0.4s ease",
                      }}
                    >
                      {item.index}
                    </div>

                    {/* Label + accent inline */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "clamp(14px, 1.8vw, 24px)",
                        flexWrap: "wrap",
                      }}
                    >
                      <motion.div
                        animate={{
                          x: hovered === i ? 12 : 0,
                          color:
                            hovered === i
                              ? "rgba(255,255,255,1)"
                              : "rgba(255,255,255,0.88)",
                        }}
                        transition={{ duration: 0.4, ease: EASE }}
                        style={{
                          fontFamily: "var(--font-montserrat)",
                          fontWeight: 700,
                          fontSize: "clamp(2.4rem, 5.5vw, 5.8rem)",
                          lineHeight: 0.95,
                          letterSpacing: "-0.02em",
                          textTransform: "uppercase",
                        }}
                      >
                        {item.label}
                      </motion.div>
                      <motion.div
                        animate={{
                          opacity: hovered === i ? 1 : 0.55,
                          x: hovered === i ? 12 : 0,
                        }}
                        transition={{ duration: 0.4, ease: EASE }}
                        style={{
                          fontFamily: "var(--font-fraunces)",
                          fontStyle: "italic",
                          fontWeight: 500,
                          fontSize: "clamp(1.5rem, 3.2vw, 3.4rem)",
                          lineHeight: 1,
                          letterSpacing: "-0.01em",
                          color: "#C9A96E",
                          textShadow: "0 0 40px rgba(201,169,110,0.20)",
                        }}
                      >
                        {item.accent}
                      </motion.div>
                    </div>

                    {/* Active dot */}
                    {isActive && (
                      <div
                        style={{
                          position: "absolute",
                          right: "-14px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: "7px",
                          height: "7px",
                          borderRadius: "50%",
                          background: "#C9A96E",
                          boxShadow: "0 0 12px rgba(201,169,110,0.60)",
                        }}
                      />
                    )}
                  </motion.div>
                );

                if (item.inquiry) {
                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        close();
                        openInquiry("leasing");
                      }}
                      style={{
                        all: "unset",
                        display: "block",
                      }}
                    >
                      {content}
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href!}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {content}
                  </Link>
                );
              })}

              {/* Bottom border under last link */}
              <div
                style={{
                  height: "1px",
                  background: "rgba(255,255,255,0.06)",
                }}
              />

              {/* ── Begin Presentation CTA ── */}
              <motion.button
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
                whileHover={{ scale: 1.02, filter: "brightness(1.10)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  close();
                  startPresentation();
                }}
                style={{
                  marginTop: "clamp(20px, 3vh, 32px)",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "18px 28px",
                  borderRadius: "16px",
                  background:
                    "linear-gradient(135deg, rgba(201,169,110,0.14) 0%, rgba(201,169,110,0.05) 100%)",
                  border: "1px solid rgba(201,169,110,0.35)",
                  cursor: "pointer",
                  textAlign: "left",
                  boxShadow:
                    "0 12px 40px rgba(201,169,110,0.12), inset 0 1px 0 rgba(255,255,255,0.05)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Play icon in a circle */}
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "#C9A96E",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 0 30px rgba(201,169,110,0.40)",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 2L12 7L3 12V2Z"
                      fill="#0A0A06"
                    />
                  </svg>
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.26em",
                      textTransform: "uppercase",
                      color: "rgba(201,169,110,0.95)",
                      lineHeight: 1.2,
                      marginBottom: "4px",
                    }}
                  >
                    Begin Presentation
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "11px",
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.50)",
                      letterSpacing: "0.01em",
                      lineHeight: 1.4,
                    }}
                  >
                    Auto-play the full deck · ~2 minutes
                  </div>
                </div>

                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "18px",
                    color: "rgba(201,169,110,0.95)",
                    display: "inline-block",
                  }}
                >
                  →
                </motion.span>
              </motion.button>
            </div>

            {/* RIGHT: preview panel */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
              className="menu-preview"
              style={{
                flex: "0 0 clamp(320px, 32vw, 460px)",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "4 / 5",
                  borderRadius: "clamp(14px, 1.6vw, 22px)",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 30px 70px rgba(0,0,0,0.40)",
                  background: "#111",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={previewItem.thumb}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    src={previewItem.thumb}
                    alt={previewItem.label}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </AnimatePresence>

                {/* Caption overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(6,10,20,0.82) 0%, transparent 45%)",
                    pointerEvents: "none",
                  }}
                />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`cap-${previewItem.label}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    style={{
                      position: "absolute",
                      bottom: "clamp(18px, 2.5vh, 28px)",
                      left: "clamp(18px, 2vw, 28px)",
                      right: "clamp(18px, 2vw, 28px)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "9.5px",
                        fontWeight: 600,
                        letterSpacing: "0.30em",
                        textTransform: "uppercase",
                        color: "rgba(201,169,110,0.80)",
                        marginBottom: "6px",
                      }}
                    >
                      {previewItem.index} · {previewItem.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "12.5px",
                        lineHeight: 1.55,
                        color: "rgba(255,255,255,0.78)",
                        letterSpacing: "0.005em",
                      }}
                    >
                      {previewItem.description}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* ── Footer ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.55 }}
            style={{
              position: "absolute",
              bottom: "clamp(22px, 3vh, 38px)",
              left: "clamp(36px, 5vw, 72px)",
              right: "clamp(36px, 5vw, 72px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
              zIndex: 10,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "9.5px",
                fontWeight: 500,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
              }}
            >
              Meadowlands, New Jersey
            </span>
            <span
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "9.5px",
                fontWeight: 500,
                letterSpacing: "0.20em",
                color: "rgba(255,255,255,0.22)",
              }}
            >
              © {new Date().getFullYear()} American Dream
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
