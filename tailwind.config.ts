import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vor: {
          navy: "#0B1426",
          "navy-light": "#152238",
          gold: "#C4A052",
          "gold-light": "#D4B872",
          trust: "#1A6B4A",
          "trust-light": "#238B62",
          slate: "#64748B",
          cream: "#F8F6F1",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 4px 24px -4px rgba(11, 20, 38, 0.08)",
        elevated: "0 12px 40px -8px rgba(11, 20, 38, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
