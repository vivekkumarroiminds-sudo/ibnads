import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        // Semantic tokens — driven by CSS variables in globals.css for theming.
        bg: "hsl(var(--bg) / <alpha-value>)",
        surface: "hsl(var(--surface) / <alpha-value>)",
        fg: "hsl(var(--fg) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        brand: {
          DEFAULT: "hsl(var(--brand) / <alpha-value>)",
          fg: "hsl(var(--brand-fg) / <alpha-value>)",
        },
        positive: "hsl(var(--positive) / <alpha-value>)",
        negative: "hsl(var(--negative) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        // System serif stack — zero network cost, used only if a component opts in.
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
      maxWidth: {
        prose: "680px",
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "hsl(var(--fg))",
            "--tw-prose-headings": "hsl(var(--fg))",
            "--tw-prose-links": "hsl(var(--brand))",
            "--tw-prose-bold": "hsl(var(--fg))",
            "--tw-prose-quotes": "hsl(var(--fg))",
            "--tw-prose-bullets": "hsl(var(--muted))",
            "--tw-prose-hr": "hsl(var(--border))",
            maxWidth: "680px",
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
