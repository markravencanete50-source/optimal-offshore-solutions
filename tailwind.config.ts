import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Official Optimal Offshore brand palette
        blue: {
          DEFAULT: "#2F80ED", // Corporate Blue — trust, reliability
          deep: "#1E5FB8",
        },
        gold: {
          DEFAULT: "#D4AF37", // Premium Gold — excellence, leadership
          bright: "#E6C04B",
          ink: "#94700F", // deep gold for accents on light
        },
        charcoal: "#111827", // Charcoal Black — authority, strength
        cool: "#6B7280", // Cool Gray
        mist: "#F8FAFC", // Light Gray — backgrounds
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        wrap: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;
