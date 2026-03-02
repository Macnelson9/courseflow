import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        divider: "var(--color-divider)",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        muted: "var(--color-muted)",
        "muted-2": "var(--color-muted-2)",
        inverse: {
          bg: "var(--color-inverse-bg)",
          fg: "var(--color-inverse-fg)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        display: ["4rem", { lineHeight: "0.95", letterSpacing: "-0.125rem", fontWeight: "800" }],
        h1: ["3rem", { lineHeight: "1", letterSpacing: "-0.125rem", fontWeight: "800" }],
        h2: ["2rem", { lineHeight: "1", fontWeight: "700" }],
        h3: ["1.5rem", { lineHeight: "1.2", fontWeight: "600" }],
        body: ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        label: ["0.75rem", { lineHeight: "1", letterSpacing: "0.125rem", fontWeight: "500" }],
        caption: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.0625rem", fontWeight: "500" }],
      },
      spacing: {
        18: "4.5rem",
        14: "3.5rem",
      },
      borderRadius: {
        none: "0px",
        button: "0px",
        card: "0px",
        input: "0px",
        badge: "9999px",
      },
      boxShadow: {
        card: "0 0 0 1px var(--color-border)",
        modal: "0 12px 24px -12px rgba(0, 0, 0, 0.35)",
      },
      transitionDuration: {
        DEFAULT: "150ms",
      },
      transitionTimingFunction: {
        DEFAULT: "ease-out",
      },
    },
  },
};

export default config;
