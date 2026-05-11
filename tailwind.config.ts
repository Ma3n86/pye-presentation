import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pye: {
          // From PYE_GUIDEBOOK v.1 — July 2024
          ink: "#282829",
          paper: "#F2F2F2",
          fog: "#DDE5ED",
          forest: "#275D38", // primary dark green
          leaf: "#00B74F",   // bright green
          lime: "#7CAC2C",   // lime green
          mint: "#A0DAB3",   // mint
          pale: "#E2F6BD",   // pale yellow-green
          sky: "#4EC3E0",    // cyan accent
        },
      },
      fontFamily: {
        arabic: ["var(--font-arabic)", "Tajawal", "system-ui", "sans-serif"],
        display: ["var(--font-arabic)", "Tajawal", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
