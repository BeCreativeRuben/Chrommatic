/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#7f1d1d", // red-900
          secondary: "#991b1b", // red-800
          accent: "#ef4444", // red-500
        },
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["Impact", "Arial Black", "sans-serif"], // Rock/punk inspired
      },
      letterSpacing: {
        wider: "0.1em",
        widest: "0.15em",
      },
      animation: {
        "gradient-shift": "gradient-shift 3s ease infinite",
        "metallic-shine": "metallic-shine 0.6s ease-in-out",
      },
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
};
