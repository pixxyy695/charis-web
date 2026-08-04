import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#1C1518",
        burgundy: { DEFAULT: "#3D0F21", dark: "#2B0A17", light: "#54172E" },
        wine: "#7A2340",
        gold: { DEFAULT: "#C9A257", soft: "#E3CD97" },
        cream: "#F6EFE4",
        warmwhite: "#FBF8F3",
        muted: "#8B8078",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        seal: "3px",
      },
      keyframes: {
        reveal: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        crack: {
          "0%": { opacity: "0", transform: "scale(0) rotate(-30deg)" },
          "55%": { opacity: "1", transform: "scale(1.15) rotate(6deg)" },
          "75%": { transform: "scale(.95) rotate(-3deg)" },
          "100%": { transform: "scale(1) rotate(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-18px)" },
        },
      },
      animation: {
        reveal: "reveal 1s cubic-bezier(.16,1,.3,1) forwards",
        crack: "crack 2.2s cubic-bezier(.34,1.56,.64,1) forwards",
        float: "float 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
