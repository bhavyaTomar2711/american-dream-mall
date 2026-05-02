"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";

/* ─────────────────────────────────────────────
   Global Deck Audio Provider — persists across
   route changes so background music keeps playing
   when entering /leasing, /venues, etc.
───────────────────────────────────────────── */

type DeckAudioContextValue = {
  muted: boolean;
  toggleMute: () => void;
  duck: () => void;
  restore: () => void;
};

const DeckAudioContext = createContext<DeckAudioContextValue | null>(null);

export function DeckAudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);
  const baseVolumeRef = useRef(0.4);
  const duckedRef = useRef(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = new Audio(encodeURI("/audio/Golden Skyline Run.mp3"));
    audio.loop = true;
    audio.volume = 0;
    // metadata-only initial load saves ~4.6 MB on first paint;
    // full file streams in once play() is invoked on first user gesture.
    audio.preload = "metadata";
    audioRef.current = audio;

    let cancelled = false;

    const fadeIn = () => {
      const start = performance.now();
      const target = baseVolumeRef.current;
      const dur = 1800;
      const tick = (t: number) => {
        if (cancelled) return;
        const k = Math.min(1, (t - start) / dur);
        audio.volume = Math.max(0, Math.min(1, target * k));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const tryStart = () => {
      if (cancelled || startedRef.current) return;
      const p = audio.play();
      if (p && typeof p.then === "function") {
        p.then(() => {
          startedRef.current = true;
          fadeIn();
        }).catch(() => {});
      } else {
        startedRef.current = true;
        fadeIn();
      }
    };

    tryStart();

    const onGesture = () => {
      if (!startedRef.current) tryStart();
    };
    const events = ["pointerdown", "touchstart", "keydown", "click", "wheel"];
    events.forEach((ev) =>
      window.addEventListener(ev, onGesture, {
        passive: true,
      } as AddEventListenerOptions),
    );

    return () => {
      cancelled = true;
      audio.pause();
      events.forEach((ev) =>
        window.removeEventListener(ev, onGesture as EventListener),
      );
    };
  }, []);

  const toggleMute = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !a.muted;
    setMuted(a.muted);
  }, []);

  const fadeVolume = useCallback((target: number, duration: number) => {
    const a = audioRef.current;
    if (!a) return;
    const start = performance.now();
    const from = a.volume;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / duration);
      a.volume = Math.max(0, Math.min(1, from + (target - from) * k));
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  const duck = useCallback(() => {
    if (duckedRef.current) return;
    duckedRef.current = true;
    fadeVolume(0.18, 900);
  }, [fadeVolume]);

  const restore = useCallback(() => {
    if (!duckedRef.current) return;
    duckedRef.current = false;
    fadeVolume(baseVolumeRef.current, 800);
  }, [fadeVolume]);

  return (
    <DeckAudioContext.Provider value={{ muted, toggleMute, duck, restore }}>
      {children}
    </DeckAudioContext.Provider>
  );
}

export function useDeckAudio(): DeckAudioContextValue {
  const ctx = useContext(DeckAudioContext);
  if (!ctx) {
    throw new Error("useDeckAudio must be used within DeckAudioProvider");
  }
  return ctx;
}
