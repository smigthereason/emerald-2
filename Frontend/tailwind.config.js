// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        beau: ["Beau Rivage", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
}