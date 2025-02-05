/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'beau': ['Beau Rivage', 'sans-serif'],
      },
    },
  },

  plugins: [],
};

