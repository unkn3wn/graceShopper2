/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        background:
          "url('/src/assets/ronan-furuta-ZJ8M0bfiu8U-unsplash (3).jpg')",
      },
      colors: {
        customyellow: "#fff700",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
