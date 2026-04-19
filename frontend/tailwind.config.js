/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        nav: "1020px",
      },
      colors: {
        blinkit: {
          yellow: "#f8c200",
          green: "#0c831f",
          dark: "#1e2a38",
        },
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
