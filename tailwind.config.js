const daisyui = require("daisyui");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.html",
    "./src/**/*.vue",
    "./src/**/*.jsx",
    "./src/**/*.js",
    "./src/**/*.ts",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
