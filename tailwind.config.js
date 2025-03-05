/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["Space Mono", "ui-monospace", "monospace"],
      },
      colors: {
        // Enhanced color palette
        "space-black": "#070b19",
        "space-blue": {
          900: "#0b1023",
          800: "#0e1b38",
          700: "#152a52",
          600: "#1c3a6e",
        },
        "cosmic-purple": {
          900: "#2e1065",
          800: "#4c1d95",
          700: "#6d28d9",
          600: "#7c3aed",
          500: "#8b5cf6",
          400: "#a78bfa",
        },
        "nebula-pink": {
          900: "#831843",
          800: "#9d174d",
          700: "#be185d",
          600: "#db2777",
          500: "#ec4899",
          400: "#f472b6",
        },
      },
      boxShadow: {
        "glow-sm": "0 0 6px rgba(139, 92, 246, 0.3)",
        "glow-md": "0 0 12px rgba(139, 92, 246, 0.4)",
        "glow-lg": "0 0 20px rgba(139, 92, 246, 0.5)",
        "pink-glow-sm": "0 0 6px rgba(236, 72, 153, 0.3)",
        "pink-glow-md": "0 0 12px rgba(236, 72, 153, 0.4)",
        "pink-glow-lg": "0 0 20px rgba(236, 72, 153, 0.5)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 3s infinite",
        glow: "glow 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 8px rgba(139, 92, 246, 0.6)" },
          "50%": { boxShadow: "0 0 16px rgba(139, 92, 246, 0.8)" },
        },
        shine: {
          from: { backgroundPosition: "-100% 0" },
          to: { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-cosmic":
          "linear-gradient(to right, #6454f0, #a35df9, #f776f1, #f2a5ec, #da7df3, #6454f0)",
        "gradient-space":
          "linear-gradient(to bottom, #070b19, #0e1b38 40%, #1a2b4a 80%, #2c3359 100%)",
      },
      transitionProperty: {
        height: "height",
        width: "width",
        spacing: "margin, padding",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
