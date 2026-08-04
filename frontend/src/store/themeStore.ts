import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";
interface ThemeState { theme: Theme; toggle: () => void; apply: () => void }

export const useThemeStore = create<ThemeState>()(persist((set, get) => ({
  theme: "dark",
  toggle: () => set((state) => {
    const theme = state.theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", theme === "dark");
    return { theme };
  }),
  apply: () => document.documentElement.classList.toggle("dark", get().theme === "dark"),
}), { name: "charis-theme" }));
