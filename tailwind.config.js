/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        marquee:          "marquee 40s linear infinite",
        marquee2:         "marquee2 40s linear infinite",
        "marquee-reverse":"marquee-reverse 40s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%":   { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "marquee-reverse": {
          "0%":   { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};


