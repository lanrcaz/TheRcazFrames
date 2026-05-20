/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
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
        'tsf-bg': {
          primary: '#0A0A0A',
          secondary: '#111111',
          tertiary: '#1A1A1A',
        },
        'tsf-text': {
          primary: '#F5F0EB',
          secondary: '#9A9590',
          tertiary: '#6B6560',
        },
        'tsf-gold': {
          DEFAULT: '#C9A96E',
          hover: '#D4B87A',
        },
        'tsf-copper': '#B87333',
        'tsf-rose': '#A67B7B',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      spacing: {
        'page-x': 'clamp(1.5rem, 5vw, 5rem)',
        'section-y': 'clamp(6rem, 12vh, 12rem)',
        'component': 'clamp(1rem, 2vw, 2rem)',
        'element': '0.75rem',
      },
      maxWidth: {
        'content': '1400px',
        'narrow': '720px',
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
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
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "grain": {
          "0%, 100%": { backgroundPosition: "0% 0%" },
          "10%": { backgroundPosition: "-5% -10%" },
          "20%": { backgroundPosition: "-15% 5%" },
          "30%": { backgroundPosition: "7% -25%" },
          "40%": { backgroundPosition: "20% 25%" },
          "50%": { backgroundPosition: "-25% 10%" },
          "60%": { backgroundPosition: "15% 5%" },
          "70%": { backgroundPosition: "0% 15%" },
          "80%": { backgroundPosition: "25% 35%" },
          "90%": { backgroundPosition: "-10% 10%" },
        },
        "scroll-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        "marquee-left": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "grain": "grain 8s steps(10) infinite",
        "scroll-bounce": "scroll-bounce 2s ease-in-out infinite",
        "marquee-left": "marquee-left 30s linear infinite",
        "marquee-right": "marquee-right 30s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
