"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

/* ─────────────────────────────────────────────
   TYPES & CONSTANTS
───────────────────────────────────────────── */

export type InquiryType = "leasing" | "sponsorship" | "booking" | "press";

type Status = "idle" | "submitting" | "success" | "error";

const EASE = [0.22, 1, 0.36, 1] as const;

const TABS: {
  id: InquiryType;
  label: string;
  eyebrow: string;
  title: string;
  sub: string;
  categoryLabel: string;
  categories: string[];
  messagePlaceholder: string;
}[] = [
  {
    id: "leasing",
    label: "Leasing",
    eyebrow: "Lease a Space",
    title: "Make your mark here.",
    sub: "Luxury flagships, retail, dining, and pop-ups — tell us what you're building and we'll route you to the right leasing lead.",
    categoryLabel: "Space Type",
    categories: ["Luxury Flagship", "Retail", "Dining & F&B", "Pop-up / Short-term", "Experiential"],
    messagePlaceholder:
      "Tell us about your brand, ideal footprint, and timing…",
  },
  {
    id: "sponsorship",
    label: "Sponsorship",
    eyebrow: "Partner With Us",
    title: "Activate inside the platform.",
    sub: "Title partnerships, category sponsorships, and integrated activations across forty million annual visitors.",
    categoryLabel: "Partnership Tier",
    categories: ["Title Partner", "Presenting Sponsor", "Category Sponsor", "Activation", "Media Partnership"],
    messagePlaceholder:
      "What are you looking to achieve — audience, KPIs, budget range…",
  },
  {
    id: "booking",
    label: "Book a Venue",
    eyebrow: "Event Booking",
    title: "Reserve the room.",
    sub: "Arena, performing arts, exposition halls, and private event spaces — turnkey production included.",
    categoryLabel: "Event Type",
    categories: ["Concert / Live", "Corporate Summit", "Product Launch", "Private Event", "Trade Show / Expo"],
    messagePlaceholder:
      "Preferred dates, expected attendance, production needs…",
  },
  {
    id: "press",
    label: "Press",
    eyebrow: "Media & Press",
    title: "Tell the story.",
    sub: "Press inquiries, editorial features, and creator collaborations.",
    categoryLabel: "Outlet Type",
    categories: ["Publication", "Broadcast / Film", "Agency", "Creator / Influencer", "Other"],
    messagePlaceholder: "Outlet, deadline, angle, what you're working on…",
  },
];

/* ─────────────────────────────────────────────
   MODAL
───────────────────────────────────────────── */

type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialType?: InquiryType;
};

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: EASE } },
};

const panelVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay: 0.05 },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 8,
    transition: { duration: 0.25, ease: EASE },
  },
};

export default function InquiryModal({ isOpen, onClose, initialType = "leasing" }: Props) {
  const [activeTab, setActiveTab] = useState<InquiryType>(initialType);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    category: "",
    message: "",
  });

  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const formId = useId();

  // Sync initial tab when reopened with a different type
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialType);
    }
  }, [isOpen, initialType]);

  // Reset form state whenever the modal closes
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setStatus("idle");
        setErrorMsg(null);
        setFieldError(null);
        setForm({
          name: "",
          email: "",
          company: "",
          role: "",
          category: "",
          message: "",
        });
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // ESC to close + body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && status !== "submitting") onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    // Auto-focus first field
    const t = setTimeout(() => firstFieldRef.current?.focus(), 250);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [isOpen, onClose, status]);

  const tab = TABS.find((t) => t.id === activeTab) ?? TABS[0];

  const handleChange = useCallback(
    (key: keyof typeof form) =>
      (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm((f) => ({ ...f, [key]: e.target.value }));
        if (fieldError === key) setFieldError(null);
        if (errorMsg) setErrorMsg(null);
      },
    [fieldError, errorMsg],
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorMsg(null);
    setFieldError(null);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: activeTab, ...form }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        field?: string;
      };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        if (data.field) setFieldError(data.field);
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && status !== "submitting") {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="inquiry-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          onMouseDown={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${formId}-title`}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(12px, 3vw, 28px)",
            background: "rgba(3, 6, 18, 0.62)",
            backdropFilter: "blur(14px) saturate(120%)",
            WebkitBackdropFilter: "blur(14px) saturate(120%)",
            overflowY: "auto",
          }}
        >
          <motion.div
            ref={panelRef}
            variants={panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            onMouseDown={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "640px",
              background:
                "linear-gradient(180deg, rgba(20, 18, 24, 0.96) 0%, rgba(10, 15, 30, 0.94) 100%)",
              backdropFilter: "blur(40px) saturate(180%)",
              WebkitBackdropFilter: "blur(40px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "22px",
              overflow: "hidden",
              boxShadow:
                "0 40px 120px -24px rgba(0,0,0,0.70), 0 16px 48px -12px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.09)",
            }}
          >
            {/* Ambient gold orb */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: "-120px",
                right: "-80px",
                width: "360px",
                height: "360px",
                background:
                  "radial-gradient(ellipse at center, rgba(201,169,110,0.14) 0%, transparent 65%)",
                pointerEvents: "none",
                filter: "blur(40px)",
              }}
            />
            <div
              aria-hidden
              style={{
                position: "absolute",
                bottom: "-140px",
                left: "-80px",
                width: "340px",
                height: "340px",
                background:
                  "radial-gradient(ellipse at center, rgba(201,169,110,0.05) 0%, transparent 70%)",
                pointerEvents: "none",
                filter: "blur(50px)",
              }}
            />

            {/* Top gold hairline */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(201,169,110,0.35), transparent)",
              }}
            />

            {/* Close button */}
            <button
              type="button"
              aria-label="Close"
              onClick={() => status !== "submitting" && onClose()}
              disabled={status === "submitting"}
              style={{
                position: "absolute",
                top: "18px",
                right: "18px",
                zIndex: 2,
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: status === "submitting" ? "not-allowed" : "pointer",
                opacity: status === "submitting" ? 0.4 : 1,
                transition: "background 0.25s ease",
              }}
              onMouseEnter={(e) => {
                if (status !== "submitting")
                  e.currentTarget.style.background = "rgba(255,255,255,0.10)";
              }}
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.04)")
              }
            >
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 2L10 10M10 2L2 10"
                  stroke="rgba(255,255,255,0.55)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* ─── Content switcher: FORM vs SUCCESS ─── */}
            <AnimatePresence mode="wait">
              {status !== "success" ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  style={{ position: "relative", zIndex: 1 }}
                >
                  {/* Header */}
                  <div
                    style={{
                      padding:
                        "clamp(28px, 4vw, 38px) clamp(24px, 4vw, 40px) 0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "14px",
                      }}
                    >
                      <div
                        style={{
                          width: "22px",
                          height: "1px",
                          background: "rgba(201,169,110,0.55)",
                        }}
                      />
                      <motion.span
                        key={`eyebrow-${tab.id}`}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        style={{
                          fontFamily: "var(--font-montserrat)",
                          fontSize: "9px",
                          fontWeight: 500,
                          letterSpacing: "0.40em",
                          textTransform: "uppercase",
                          color: "rgba(201,169,110,0.80)",
                        }}
                      >
                        {tab.eyebrow}
                      </motion.span>
                    </div>

                    <motion.h2
                      id={`${formId}-title`}
                      key={`title-${tab.id}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        fontWeight: 700,
                        fontSize: "clamp(1.6rem, 2.6vw, 2.1rem)",
                        lineHeight: 1.05,
                        letterSpacing: "-0.025em",
                        color: "rgba(255,255,255,0.96)",
                        margin: "0 0 12px",
                      }}
                    >
                      {tab.title}
                    </motion.h2>

                    <motion.p
                      key={`sub-${tab.id}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, ease: EASE, delay: 0.05 }}
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "13px",
                        lineHeight: 1.65,
                        color: "rgba(255,255,255,0.48)",
                        margin: 0,
                        maxWidth: "480px",
                      }}
                    >
                      {tab.sub}
                    </motion.p>

                    {activeTab === "leasing" && (
                      <motion.div
                        key="leasing-xlink"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, ease: EASE, delay: 0.1 }}
                        style={{ marginTop: "14px" }}
                      >
                        <Link
                          href="/leasing"
                          onClick={onClose}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            fontFamily: "var(--font-montserrat)",
                            fontSize: "10.5px",
                            fontWeight: 500,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: "rgba(201,169,110,0.85)",
                            textDecoration: "none",
                            borderBottom:
                              "1px solid rgba(201,169,110,0.35)",
                            paddingBottom: "3px",
                          }}
                        >
                          Prefer to browse by category?
                          <span aria-hidden style={{ marginLeft: "4px" }}>→</span>
                        </Link>
                      </motion.div>
                    )}

                    {activeTab === "booking" && (
                      <motion.div
                        key="booking-xlink"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, ease: EASE, delay: 0.1 }}
                        style={{ marginTop: "14px" }}
                      >
                        <Link
                          href="/venues"
                          onClick={onClose}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            fontFamily: "var(--font-montserrat)",
                            fontSize: "10.5px",
                            fontWeight: 500,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: "rgba(201,169,110,0.85)",
                            textDecoration: "none",
                            borderBottom:
                              "1px solid rgba(201,169,110,0.35)",
                            paddingBottom: "3px",
                          }}
                        >
                          Prefer to browse venues?
                          <span aria-hidden style={{ marginLeft: "4px" }}>→</span>
                        </Link>
                      </motion.div>
                    )}
                  </div>

                  {/* Tabs */}
                  <div
                    role="tablist"
                    style={{
                      display: "flex",
                      gap: "6px",
                      padding: "24px clamp(24px, 4vw, 40px) 0",
                      flexWrap: "wrap",
                    }}
                  >
                    {TABS.map((t) => {
                      const active = t.id === activeTab;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => {
                            setActiveTab(t.id);
                            setForm((f) => ({ ...f, category: "" }));
                            setFieldError(null);
                          }}
                          disabled={status === "submitting"}
                          style={{
                            position: "relative",
                            padding: "8px 16px",
                            borderRadius: "9999px",
                            background: active
                              ? "rgba(201,169,110,0.12)"
                              : "rgba(255,255,255,0.03)",
                            border: `1px solid ${
                              active
                                ? "rgba(201,169,110,0.32)"
                                : "rgba(255,255,255,0.07)"
                            }`,
                            fontFamily: "var(--font-montserrat)",
                            fontSize: "10px",
                            fontWeight: 500,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: active
                              ? "rgba(201,169,110,0.95)"
                              : "rgba(255,255,255,0.48)",
                            cursor:
                              status === "submitting" ? "not-allowed" : "pointer",
                            transition: "all 0.25s ease",
                          }}
                        >
                          {t.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Form */}
                  <form
                    onSubmit={handleSubmit}
                    style={{
                      padding:
                        "24px clamp(24px, 4vw, 40px) clamp(24px, 4vw, 32px)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "14px",
                    }}
                  >
                    <div
                      className="inquiry-grid"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "12px",
                      }}
                    >
                      <Field
                        id={`${formId}-name`}
                        label="Full Name"
                        required
                        error={fieldError === "name"}
                      >
                        <input
                          ref={firstFieldRef}
                          id={`${formId}-name`}
                          type="text"
                          autoComplete="name"
                          required
                          value={form.name}
                          onChange={handleChange("name")}
                          placeholder="Alex Morgan"
                          style={inputStyle(fieldError === "name")}
                        />
                      </Field>

                      <Field
                        id={`${formId}-email`}
                        label="Email"
                        required
                        error={fieldError === "email"}
                      >
                        <input
                          id={`${formId}-email`}
                          type="email"
                          autoComplete="email"
                          required
                          value={form.email}
                          onChange={handleChange("email")}
                          placeholder="you@brand.com"
                          style={inputStyle(fieldError === "email")}
                        />
                      </Field>

                      <Field
                        id={`${formId}-company`}
                        label="Company"
                        required
                        error={fieldError === "company"}
                      >
                        <input
                          id={`${formId}-company`}
                          type="text"
                          autoComplete="organization"
                          required
                          value={form.company}
                          onChange={handleChange("company")}
                          placeholder="Your brand or org"
                          style={inputStyle(fieldError === "company")}
                        />
                      </Field>

                      <Field id={`${formId}-role`} label="Role">
                        <input
                          id={`${formId}-role`}
                          type="text"
                          autoComplete="organization-title"
                          value={form.role}
                          onChange={handleChange("role")}
                          placeholder="Optional"
                          style={inputStyle(false)}
                        />
                      </Field>
                    </div>

                    <Field id={`${formId}-category`} label={tab.categoryLabel}>
                      <GlassSelect
                        id={`${formId}-category`}
                        value={form.category}
                        options={tab.categories}
                        placeholder="Select one…"
                        onChange={(v) => {
                          setForm((f) => ({ ...f, category: v }));
                          if (errorMsg) setErrorMsg(null);
                        }}
                      />
                    </Field>

                    <Field
                      id={`${formId}-message`}
                      label="Message"
                      required
                      error={fieldError === "message"}
                    >
                      <textarea
                        id={`${formId}-message`}
                        required
                        rows={4}
                        value={form.message}
                        onChange={handleChange("message")}
                        placeholder={tab.messagePlaceholder}
                        style={{
                          ...inputStyle(fieldError === "message"),
                          minHeight: "104px",
                          resize: "vertical",
                          fontFamily: "var(--font-montserrat)",
                          lineHeight: 1.55,
                        }}
                      />
                    </Field>

                    {/* Inline error */}
                    <AnimatePresence>
                      {status === "error" && errorMsg && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          style={{
                            fontFamily: "var(--font-montserrat)",
                            fontSize: "11.5px",
                            color: "#F5B0A7",
                            letterSpacing: "0.02em",
                          }}
                        >
                          {errorMsg}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Footer actions */}
                    <div
                      className="inquiry-actions"
                      style={{
                        marginTop: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "16px",
                        flexWrap: "wrap",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--font-montserrat)",
                          fontSize: "10.5px",
                          color: "rgba(255,255,255,0.30)",
                          margin: 0,
                          letterSpacing: "0.02em",
                          maxWidth: "260px",
                          lineHeight: 1.5,
                        }}
                      >
                        We respond within one business day. Your details stay with the
                        commercial team — never third parties.
                      </p>

                      <motion.button
                        type="submit"
                        disabled={status === "submitting"}
                        whileHover={
                          status === "submitting"
                            ? {}
                            : { filter: "brightness(1.08)", scale: 1.02 }
                        }
                        whileTap={status === "submitting" ? {} : { scale: 0.97 }}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "14px 28px",
                          borderRadius: "9999px",
                          background: "#C9A96E",
                          border: "none",
                          fontFamily: "var(--font-montserrat)",
                          fontSize: "10.5px",
                          fontWeight: 600,
                          letterSpacing: "0.20em",
                          textTransform: "uppercase",
                          color: "#0A0F1E",
                          cursor:
                            status === "submitting" ? "progress" : "pointer",
                          boxShadow: "0 8px 32px rgba(201,169,110,0.28)",
                          opacity: status === "submitting" ? 0.85 : 1,
                          transition: "opacity 0.25s ease",
                        }}
                      >
                        {status === "submitting" ? (
                          <>
                            <Spinner />
                            Sending
                          </>
                        ) : (
                          <>
                            Send Inquiry
                            <motion.span
                              animate={{ x: [0, 3, 0] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              style={{ display: "inline-block" }}
                            >
                              →
                            </motion.span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  style={{
                    position: "relative",
                    zIndex: 1,
                    padding: "clamp(48px, 6vw, 64px) clamp(24px, 4vw, 40px)",
                    textAlign: "center",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      ease: EASE,
                      delay: 0.1,
                    }}
                    style={{
                      width: "64px",
                      height: "64px",
                      margin: "0 auto 28px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, rgba(201,169,110,0.20), rgba(201,169,110,0.08))",
                      border: "1px solid rgba(201,169,110,0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 8px 32px rgba(201,169,110,0.20)",
                    }}
                  >
                    <motion.svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <motion.path
                        d="M5 12.5L10 17.5L19 7.5"
                        stroke="#C9A96E"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, ease: EASE, delay: 0.35 }}
                      />
                    </motion.svg>
                  </motion.div>

                  <p
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "9px",
                      letterSpacing: "0.40em",
                      textTransform: "uppercase",
                      color: "rgba(201,169,110,0.70)",
                      margin: "0 0 14px",
                    }}
                  >
                    Inquiry Received
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontWeight: 700,
                      fontSize: "clamp(1.5rem, 2.4vw, 1.9rem)",
                      letterSpacing: "-0.02em",
                      color: "rgba(255,255,255,0.95)",
                      margin: "0 0 14px",
                    }}
                  >
                    Thanks, {form.name.split(" ")[0] || "friend"}.
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "13.5px",
                      lineHeight: 1.7,
                      color: "rgba(255,255,255,0.50)",
                      maxWidth: "380px",
                      margin: "0 auto 32px",
                    }}
                  >
                    Your inquiry is with the commercial team. You&rsquo;ll hear
                    back within one business day — usually faster.
                  </p>

                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    <motion.button
                      type="button"
                      onClick={onClose}
                      whileHover={{ filter: "brightness(1.08)", scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        padding: "13px 26px",
                        borderRadius: "9999px",
                        background: "#C9A96E",
                        border: "none",
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "10.5px",
                        fontWeight: 600,
                        letterSpacing: "0.20em",
                        textTransform: "uppercase",
                        color: "#0A0F1E",
                        cursor: "pointer",
                        boxShadow: "0 8px 32px rgba(201,169,110,0.25)",
                      }}
                    >
                      Back to the Deck
                    </motion.button>
                    <motion.a
                      href="mailto:leasing@americandream.example"
                      whileHover={{
                        background: "rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.85)",
                      }}
                      style={{
                        padding: "13px 24px",
                        borderRadius: "9999px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "10.5px",
                        fontWeight: 500,
                        letterSpacing: "0.20em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.55)",
                        textDecoration: "none",
                        transition: "all 0.25s ease",
                      }}
                    >
                      Email Us Directly
                    </motion.a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Responsive + focus + select option styling */}
          <style>{`
            @media (max-width: 560px) {
              .inquiry-grid {
                grid-template-columns: 1fr !important;
              }
              .inquiry-actions {
                justify-content: flex-end !important;
              }
            }
            [role="dialog"] input::placeholder,
            [role="dialog"] textarea::placeholder {
              color: rgba(255,255,255,0.26);
            }
            [role="dialog"] input:focus,
            [role="dialog"] textarea:focus,
            [role="dialog"] select:focus {
              border-color: rgba(201,169,110,0.45) !important;
              background: rgba(255,255,255,0.05) !important;
              box-shadow: 0 0 0 3px rgba(201,169,110,0.10) !important;
            }
            [role="dialog"] select option {
              color: #fff;
              background: #14121A;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   SUBCOMPONENTS
───────────────────────────────────────────── */

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label
        htmlFor={id}
        style={{
          fontFamily: "var(--font-montserrat)",
          fontSize: "9.5px",
          fontWeight: 500,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: error ? "rgba(245,176,167,0.80)" : "rgba(255,255,255,0.42)",
          transition: "color 0.25s ease",
        }}
      >
        {label}
        {required && (
          <span style={{ color: "rgba(201,169,110,0.60)", marginLeft: "4px" }}>
            *
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

function inputStyle(error: boolean): React.CSSProperties {
  return {
    width: "100%",
    padding: "13px 16px",
    borderRadius: "11px",
    background: "rgba(255,255,255,0.03)",
    border: `1px solid ${
      error ? "rgba(245,176,167,0.40)" : "rgba(255,255,255,0.08)"
    }`,
    fontFamily: "var(--font-montserrat)",
    fontSize: "13.5px",
    color: "rgba(255,255,255,0.92)",
    outline: "none",
    transition: "border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease",
    boxShadow: error
      ? "0 0 0 3px rgba(245,176,167,0.08)"
      : "inset 0 1px 0 rgba(255,255,255,0.03)",
  };
}

/* ─────────────────────────────────────────────
   GLASS SELECT — fully custom, keyboard accessible
───────────────────────────────────────────── */

function GlassSelect({
  id,
  value,
  options,
  placeholder,
  onChange,
}: {
  id: string;
  value: string;
  options: string[];
  placeholder: string;
  onChange: (v: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  // Close on outside click / ESC
  useEffect(() => {
    if (!isOpen) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        btnRef.current?.contains(t) ||
        listRef.current?.contains(t)
      )
        return;
      setIsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  // Initialize active index when opening
  useEffect(() => {
    if (isOpen) {
      const selectedIdx = options.indexOf(value);
      setActiveIndex(selectedIdx >= 0 ? selectedIdx : 0);
    }
  }, [isOpen, options, value]);

  const handleTriggerKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  const handleListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + options.length) % options.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (activeIndex >= 0) {
        onChange(options[activeIndex]);
        setIsOpen(false);
        btnRef.current?.focus();
      }
    } else if (e.key === "Tab") {
      setIsOpen(false);
    }
  };

  const display = value || placeholder;
  const isPlaceholder = !value;

  return (
    <div style={{ position: "relative" }}>
      <button
        ref={btnRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${id}-listbox`}
        onClick={() => setIsOpen((v) => !v)}
        onKeyDown={handleTriggerKey}
        style={{
          ...inputStyle(false),
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          textAlign: "left",
          cursor: "pointer",
          color: isPlaceholder
            ? "rgba(255,255,255,0.30)"
            : "rgba(255,255,255,0.92)",
        }}
      >
        <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" }}>
          {display}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          width="10"
          height="10"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden
          style={{ marginLeft: "12px", flexShrink: 0 }}
        >
          <path
            d="M2 4L6 8L10 4"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            ref={listRef}
            id={`${id}-listbox`}
            role="listbox"
            tabIndex={-1}
            onKeyDown={handleListKey}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              top: "calc(100% + 6px)",
              left: 0,
              right: 0,
              zIndex: 5,
              margin: 0,
              padding: "5px",
              listStyle: "none",
              maxHeight: "240px",
              overflowY: "auto",
              background:
                "linear-gradient(180deg, rgba(28, 26, 34, 0.96) 0%, rgba(18, 22, 38, 0.96) 100%)",
              backdropFilter: "blur(28px) saturate(180%)",
              WebkitBackdropFilter: "blur(28px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              boxShadow:
                "0 20px 60px -12px rgba(0,0,0,0.60), 0 8px 24px -8px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
              outline: "none",
            }}
          >
            {options.map((opt, i) => {
              const selected = opt === value;
              const active = i === activeIndex;
              return (
                <li
                  key={opt}
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                    btnRef.current?.focus();
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                    padding: "10px 13px",
                    borderRadius: "8px",
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "13px",
                    fontWeight: selected ? 500 : 400,
                    letterSpacing: "0.01em",
                    color: selected
                      ? "rgba(201,169,110,0.95)"
                      : active
                        ? "rgba(255,255,255,0.95)"
                        : "rgba(255,255,255,0.72)",
                    background: active
                      ? "rgba(255,255,255,0.06)"
                      : "transparent",
                    cursor: "pointer",
                    transition: "background 0.15s ease, color 0.15s ease",
                  }}
                >
                  <span>{opt}</span>
                  {selected && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden
                      style={{ flexShrink: 0 }}
                    >
                      <path
                        d="M2.5 7.5L6 11L11.5 3.5"
                        stroke="#C9A96E"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function Spinner() {
  return (
    <motion.span
      animate={{ rotate: 360 }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
      style={{
        display: "inline-block",
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        border: "1.6px solid rgba(10,15,30,0.25)",
        borderTopColor: "rgba(10,15,30,0.85)",
      }}
    />
  );
}
