import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
    "./providers/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "var(--color-accent-primary)",
          hover: "var(--color-accent-hover)",
        },
        background: {
          DEFAULT: "var(--color-background-primary)",
          secondary: "var(--color-background-secondary)",
        },
        border: {
          DEFAULT: "var(--color-border-primary)",
          strong: "var(--color-border-strong)",
        },
        foreground: {
          DEFAULT: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
        },
        surface: {
          DEFAULT: "var(--color-surface-primary)",
          secondary: "var(--color-surface-secondary)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
        30: "7.5rem",
        40: "10rem",
        50: "12.5rem",
      },
      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        base: "var(--duration-base)",
        slow: "var(--duration-slow)",
      },
      transitionTimingFunction: {
        "architectural-out": "var(--ease-out)",
        "architectural-in-out": "var(--ease-in-out)",
      },
      zIndex: {
        base: "var(--z-base)",
        raised: "var(--z-raised)",
        header: "var(--z-header)",
        overlay: "var(--z-overlay)",
        modal: "var(--z-modal)",
      },
    },
  },
};

export default config;
