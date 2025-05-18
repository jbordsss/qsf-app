import type { Config } from "tailwindcss"

const config = {
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
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#03a0fa",
          foreground: "hsl(var(--primary-foreground))",
          50: "rgba(3, 160, 250, 0.05)",
          100: "rgba(3, 160, 250, 0.1)",
          200: "rgba(3, 160, 250, 0.2)",
          300: "rgba(3, 160, 250, 0.3)",
          400: "rgba(3, 160, 250, 0.4)",
          500: "#03a0fa",
          600: "#0390e0",
          700: "#0380c7",
          800: "#0270ae",
          900: "#025a91",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Tier-specific colors
        tier: {
          1: {
            DEFAULT: "#6b7280",
            light: "rgba(107, 114, 128, 0.2)",
            border: "rgba(107, 114, 128, 0.3)",
          },
          2: {
            DEFAULT: "#03a0fa",
            light: "rgba(3, 160, 250, 0.2)",
            border: "rgba(3, 160, 250, 0.3)",
          },
          3: {
            DEFAULT: "#10b981",
            light: "rgba(16, 185, 129, 0.2)",
            border: "rgba(16, 185, 129, 0.3)",
          },
          4: {
            DEFAULT: "#8b5cf6",
            light: "rgba(139, 92, 246, 0.2)",
            border: "rgba(139, 92, 246, 0.3)",
          },
          5: {
            DEFAULT: "#f59e0b",
            light: "rgba(245, 158, 11, 0.2)",
            border: "rgba(245, 158, 11, 0.3)",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        orbitron: ["var(--font-orbitron)"],
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
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-100% 0" },
          "100%": { backgroundPosition: "100% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.5s ease-in-out",
        shimmer: "shimmer 1.5s infinite",
      },
      spacing: {
        "safe-top": "env(safe-area-inset-top, 0px)",
        "safe-bottom": "env(safe-area-inset-bottom, 0px)",
        "safe-left": "env(safe-area-inset-left, 0px)",
        "safe-right": "env(safe-area-inset-right, 0px)",
      },
      height: {
        screen: ["100vh", "100dvh"],
      },
      minHeight: {
        screen: ["100vh", "100dvh"],
      },
      maxHeight: {
        screen: ["100vh", "100dvh"],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    ({ addUtilities }) => {
      const newUtilities = {
        ".touch-manipulation": {
          "touch-action": "manipulation",
        },
        ".momentum-scroll": {
          "-webkit-overflow-scrolling": "touch",
          "overflow-y": "scroll",
        },
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      }
      addUtilities(newUtilities)
    },
  ],
} satisfies Config

export default config
