import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./game/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFFDF7",
        ink: "#1A1A2E",
        brand: {
          orange: "#FF7A2E",
          "orange-dark": "#E55A0E",
          yellow: "#FFC233",
          "yellow-dark": "#F2A500",
          blue: "#2E8EFF",
          "blue-dark": "#1565D8",
          red: "#FF4757",
          "red-dark": "#D62839",
          green: "#3DCB6C",
          "green-dark": "#23A350",
          purple: "#9B5DE5",
          "purple-dark": "#7A3FC2",
          pink: "#FF5DA2",
          sky: "#7CD4FD",
        },
        board: {
          a: "#FFF3E0",
          b: "#E3F2FD",
          c: "#E8F5E9",
          d: "#FCE4EC",
          e: "#F3E5F5",
        },
      },
      fontFamily: {
        display: ["var(--font-baloo)", "ui-rounded", "sans-serif"],
        body: ["var(--font-nunito)", "ui-sans-serif", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      boxShadow: {
        chunky: "0 4px 0 0 rgba(0,0,0,0.15)",
        "chunky-sm": "0 3px 0 0 rgba(0,0,0,0.15)",
        "chunky-lg": "0 6px 0 0 rgba(0,0,0,0.15)",
        card: "0 8px 24px -4px rgba(26,26,46,0.08), 0 2px 6px -2px rgba(26,26,46,0.06)",
        "glow-yellow": "0 0 0 4px rgba(255,194,51,0.35)",
        "glow-orange": "0 0 0 4px rgba(255,122,46,0.3)",
      },
      keyframes: {
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "pop-in": {
          "0%": { transform: "scale(0.85)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.9)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        "dice-roll": {
          "0%": { transform: "rotate(0deg) scale(1)" },
          "25%": { transform: "rotate(120deg) scale(1.1)" },
          "50%": { transform: "rotate(240deg) scale(0.95)" },
          "75%": { transform: "rotate(320deg) scale(1.1)" },
          "100%": { transform: "rotate(360deg) scale(1)" },
        },
        "float-y": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "bounce-soft": "bounce-soft 2.4s ease-in-out infinite",
        "pop-in": "pop-in 0.25s cubic-bezier(0.34,1.56,0.64,1)",
        sparkle: "sparkle 1.8s ease-in-out infinite",
        wiggle: "wiggle 1.2s ease-in-out infinite",
        "dice-roll": "dice-roll 0.6s ease-in-out",
        "float-y": "float-y 3.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
