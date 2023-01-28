const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
    "./slices/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "disc-spin": "spin 3s linear infinite",
      },
      colors: {
        "light-cyan": {
          50: "#FAFFFF",
          100: "#F6FEFF",
          200: "#EDFDFF",
          300: "#E3FCFF",
          400: "#DAFBFF",
          500: "#D1FAFF",
          600: "#A7C8CC",
          700: "#7D9699",
          800: "#546466",
          900: "#2A3233",
        },
        independence: "#4B4A67",
        rosewood: "#570000",
        "rich-black": "#023C40",
        maroon: "#8D4F64",
        "space-cadet": "#2B2D42",
        "imperial-red": "#EF233C",
        crimson: "#D80032",
        ...colors,
      },
    },
  },
  plugins: [],
};
