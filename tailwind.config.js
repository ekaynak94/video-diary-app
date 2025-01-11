/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      colors: {
        purple: "#A06EFB",
        yellow: "#FEEA38",
        red: "#FF5372",
        grey: "#252525",
      },
    },
  },
  plugins: [],
};
