"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import { type InquiryType } from "@/components/InquiryModal";

// Modal only renders when the user clicks an inquiry CTA — defer the bundle.
const InquiryModal = dynamic(() => import("@/components/InquiryModal"), {
  ssr: false,
  loading: () => null,
});

type InquiryContextValue = {
  open: (type?: InquiryType) => void;
  close: () => void;
  isOpen: boolean;
  type: InquiryType;
};

const InquiryContext = createContext<InquiryContextValue | null>(null);

export function useInquiry() {
  const ctx = useContext(InquiryContext);
  if (!ctx) {
    throw new Error("useInquiry must be used inside <InquiryProvider />");
  }
  return ctx;
}

export default function InquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<InquiryType>("leasing");

  const open = useCallback((t?: InquiryType) => {
    if (t) setType(t);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<InquiryContextValue>(
    () => ({ open, close, isOpen, type }),
    [open, close, isOpen, type],
  );

  return (
    <InquiryContext.Provider value={value}>
      {children}
      <InquiryModal
        isOpen={isOpen}
        onClose={close}
        initialType={type}
      />
    </InquiryContext.Provider>
  );
}
