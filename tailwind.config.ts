import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        sora: ["var(--font-sora)", "sans-serif"],
        barlow: ["var(--font-barlow-condensed)", "sans-serif"],
        heading: ["var(--font-sora)", "sans-serif"],
        content: ["var(--font-barlow-condensed)", "sans-serif", "*.{js,ts,jsx,tsx,mdx}"],
        // Enhanced Sora variants
        "sora-light": ["var(--font-sora)", "sans-serif"],
        "sora-medium": ["var(--font-sora)", "sans-serif"],
        "sora-bold": ["var(--font-sora)", "sans-serif"],
        "sora-black": ["var(--font-sora)", "sans-serif"],
        // Brand-specific fonts
        brand: ["var(--font-sora)", "sans-serif"],
        title: ["var(--font-sora)", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#000000",
        foreground: "#FFFFFF",
        primary: {
          DEFAULT: "#8B5CF6",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#A855F7",
          foreground: "#000000",
        },
        success: {
          DEFAULT: "#8B5CF6",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#1F1B24",
          foreground: "#9CA3AF",
        },
        accent: {
          DEFAULT: "#2D1B3D",
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT: "#1F1B24",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "#1F1B24",
          foreground: "#FFFFFF",
        },
        // Custom black, purple, dark purple, white palette
        "pure-black": "#000000",
        "dark-purple": "#2D1B3D",
        "medium-purple": "#4C1D95",
        "bright-purple": "#8B5CF6",
        "light-purple": "#A855F7",
        "pure-white": "#FFFFFF",
        "gray-light": "#9CA3AF",
        "gray-dark": "#374151",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      perspective: {
        "1000": "1000px",
      },
      rotate: {
        "y-5": "5deg",
      },
      letterSpacing: {
        condensed: "0.025em",
        "condensed-wide": "0.05em",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
