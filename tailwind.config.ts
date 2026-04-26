import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Pump-inspired palette: deep navy canvas, emerald savings accent, lime energy pop
        ink: {
          50: "#F7F8FA",
          100: "#EEF0F5",
          200: "#D9DDE6",
          300: "#B5BCCB",
          400: "#7F89A1",
          500: "#4B546B",
          600: "#2E3648",
          700: "#1D2434",
          800: "#131828",
          900: "#0A0E1C",
        },
        mint: {
          // Retuned to match Pump's actual savings green — brighter, more saturated
          50: "#E8FBEF",
          100: "#C7F5D9",
          200: "#90EBB6",
          300: "#54DD8E",
          400: "#22C55E",
          500: "#16B257",
          600: "#0F924A",
          700: "#0B7339",
          800: "#08572B",
          900: "#053C1E",
        },
        electric: {
          // Lime accent — used sparingly (chart bar tops, hero glow)
          50: "#F2FFE0",
          100: "#E0FFB8",
          200: "#C7FA80",
          300: "#A8EE49",
          400: "#86D71B",
          500: "#6BB80B",
          600: "#508E07",
        },
        amber: {
          500: "#F7A700",
        },
        rose: {
          500: "#E5484D",
        },
      },
      fontFamily: {
        sans: [
          "Urbanist",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        display: [
          "Big Shoulders",
          "Urbanist",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "monospace",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgba(10, 14, 28, 0.04), 0 4px 16px rgba(10, 14, 28, 0.06)",
        pop: "0 4px 20px rgba(10, 14, 28, 0.08), 0 12px 48px rgba(10, 14, 28, 0.10)",
        glow: "0 0 0 4px rgba(94, 219, 160, 0.15)",
      },
      borderRadius: {
        xl: "14px",
        "2xl": "20px",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "cursor-blink": {
          "0%, 50%": { opacity: "1" },
          "50.01%, 100%": { opacity: "0" },
        },
      },
      animation: {
        "fade-in": "fade-in 250ms ease-out both",
        "slide-up": "slide-up 300ms ease-out both",
        "pulse-soft": "pulse-soft 1.6s ease-in-out infinite",
        shimmer: "shimmer 1.8s linear infinite",
        "cursor-blink": "cursor-blink 1s steps(2) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
