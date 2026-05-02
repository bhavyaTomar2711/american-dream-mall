"use client";

import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from "react";
import dynamic from "next/dynamic";

// Drawer only renders when the user opens the menu — defer the bundle.
const MenuDrawer = dynamic(() => import("@/components/deck/MenuDrawer"), {
  ssr: false,
  loading: () => null,
});

type MenuContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const MenuContext = createContext<MenuContextValue>({
  isOpen: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
});

export default function MenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const value = useMemo(
    () => ({ isOpen, open, close, toggle }),
    [isOpen, open, close, toggle],
  );

  return (
    <MenuContext.Provider value={value}>
      {children}
      <MenuDrawer />
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}
