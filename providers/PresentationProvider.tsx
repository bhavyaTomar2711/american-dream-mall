"use client";

import { createContext, useContext, useState, useCallback, useEffect, useMemo, useRef, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useInquiry } from "@/providers/InquiryProvider";

// ─── Deck registry ────────────────────────────────────────────────────────────
export type DeckId = "home" | "leasing" | "venues";

export const DECK_ROUTES: Record<DeckId, string> = {
  home: "/",
  leasing: "/leasing",
  venues: "/venues",
};

export const DECK_ORDER: DeckId[] = ["home", "leasing", "venues"];

// Hardcoded totals — must match each deck's TOTAL const
export const DECK_TOTALS: Record<DeckId, number> = {
  home: 14,     // matches DeckEngine NAV_LABELS.length
  leasing: 5,   // matches LeasingDeck NAV_LABELS.length
  venues: 5,    // matches VenuesDeck NAV_LABELS.length
};

// Per-slide duration
export const SLIDE_DURATION_MS = 5000;

// ─── State shape ──────────────────────────────────────────────────────────────

type PresentationState = {
  isPresenting: boolean;
  currentDeck: DeckId | null;
  slideIndex: number;
};

type PresentationContextValue = {
  state: PresentationState;
  start: () => void;
  stop: () => void;
  totalSlides: number;
  globalIndex: number;
};

const PATH_TO_DECK: Record<string, DeckId> = {
  "/": "home",
  "/leasing": "leasing",
  "/venues": "venues",
};

const DECK_TO_PATH = DECK_ROUTES;

// ─── Context ──────────────────────────────────────────────────────────────────

const PresentationContext = createContext<PresentationContextValue>({
  state: { isPresenting: false, currentDeck: null, slideIndex: 0 },
  start: () => {},
  stop: () => {},
  totalSlides: 0,
  globalIndex: 0,
});

export default function PresentationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PresentationState>({
    isPresenting: false,
    currentDeck: null,
    slideIndex: 0,
  });
  const router = useRouter();
  const pathname = usePathname();
  const { open: openInquiry } = useInquiry();
  const stateRef = useRef(state);
  stateRef.current = state;

  const start = useCallback(() => {
    setState({ isPresenting: true, currentDeck: "home", slideIndex: 1 });
    if (pathname !== "/") router.push("/");
  }, [router, pathname]);

  const stop = useCallback(() => {
    setState({ isPresenting: false, currentDeck: null, slideIndex: 0 });
  }, []);

  // Auto-advance timer
  useEffect(() => {
    if (!state.isPresenting || state.currentDeck === null) return;

    // Wait for route to catch up — if the path doesn't match the active deck,
    // skip this tick. The next render (after navigation) will schedule again.
    const expectedPath = DECK_TO_PATH[state.currentDeck];
    if (pathname !== expectedPath) return;

    const timer = setTimeout(() => {
      const s = stateRef.current;
      if (!s.isPresenting || s.currentDeck === null) return;

      const total = DECK_TOTALS[s.currentDeck];
      const nextIdx = s.slideIndex + 1;

      if (nextIdx < total) {
        setState({ ...s, slideIndex: nextIdx });
        return;
      }

      // End of current deck — advance to next
      const curPos = DECK_ORDER.indexOf(s.currentDeck);
      const nextDeck = DECK_ORDER[curPos + 1];

      if (nextDeck) {
        setState({ isPresenting: true, currentDeck: nextDeck, slideIndex: 0 });
        router.push(DECK_TO_PATH[nextDeck]);
      } else {
        // End of all decks — close presentation and open inquiry
        setState({ isPresenting: false, currentDeck: null, slideIndex: 0 });
        setTimeout(() => openInquiry("leasing"), 400);
      }
    }, SLIDE_DURATION_MS);

    return () => clearTimeout(timer);
  }, [state, pathname, router, openInquiry]);

  // Global progress calculations
  const totalSlides = useMemo(
    () => DECK_ORDER.reduce((sum, id) => sum + DECK_TOTALS[id], 0),
    [],
  );

  const globalIndex = useMemo(() => {
    if (!state.currentDeck) return 0;
    let before = 0;
    for (const id of DECK_ORDER) {
      if (id === state.currentDeck) break;
      before += DECK_TOTALS[id];
    }
    return before + state.slideIndex + 1;
  }, [state]);

  // ESC stops presentation
  useEffect(() => {
    if (!state.isPresenting) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") stop();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state.isPresenting, stop]);

  // Stop-on-manual-navigation removed — it fired during the brief window
  // where the provider had advanced state to the next deck but the URL was
  // still mid-transition, killing the presentation between decks.
  // Users can cancel via ESC or the stop button in the HUD.

  const value = useMemo(
    () => ({ state, start, stop, totalSlides, globalIndex }),
    [state, start, stop, totalSlides, globalIndex],
  );

  return (
    <PresentationContext.Provider value={value}>
      {children}
      <PresentationHUD />
    </PresentationContext.Provider>
  );
}

export function usePresentation() {
  return useContext(PresentationContext);
}

// ─── HUD — shows during presentation ──────────────────────────────────────────
import { motion, AnimatePresence } from "framer-motion";

function PresentationHUD() {
  const { state, stop, totalSlides, globalIndex } = usePresentation();

  return (
    <AnimatePresence>
      {state.isPresenting && (
        <>
          {/* Top progress bar — thinner, gold, overall */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: "rgba(255,255,255,0.05)",
              zIndex: 120,
            }}
          >
            <motion.div
              animate={{ scaleX: globalIndex / totalSlides }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, #C9A96E 0%, rgba(201,169,110,0.55) 100%)",
                transformOrigin: "left center",
              }}
            />
          </div>

          {/* "Presenting" pill bottom-left */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "fixed",
              bottom: "clamp(22px, 3vh, 36px)",
              left: "clamp(36px, 5vw, 72px)",
              zIndex: 120,
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(24px) saturate(160%)",
              WebkitBackdropFilter: "blur(24px) saturate(160%)",
              border: "1px solid rgba(201,169,110,0.22)",
              borderRadius: "9999px",
              padding: "8px 14px 8px 12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.20)",
            }}
          >
            {/* Pulsing dot */}
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.05, 0.9] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#C9A96E",
                boxShadow: "0 0 8px rgba(201,169,110,0.70)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "9.5px",
                fontWeight: 600,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.80)",
              }}
            >
              Presenting
            </span>
            <span
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "9px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                color: "rgba(255,255,255,0.32)",
                marginLeft: "2px",
              }}
            >
              {String(globalIndex).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
            </span>
            <button
              onClick={stop}
              aria-label="Stop presentation"
              style={{
                marginLeft: "8px",
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1" fill="rgba(255,255,255,0.70)" />
              </svg>
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
