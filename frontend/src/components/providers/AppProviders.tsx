"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useThemeStore } from "@/store/themeStore";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const hydrate = useAuthStore((state) => state.hydrate);
  const applyTheme = useThemeStore((state) => state.apply);
  useEffect(() => { applyTheme(); hydrate(); }, [applyTheme, hydrate]);
  return children;
}
