// tailwind.config.js

module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik-Regular"],
        rubikBold: ["Rubik-Bold"],
        arco: ["ARCO"],
      },
      colors: {
        "deep-green": "#103B00",
        "custom-orange": "#FF8F00",
      },
    },
  },
  plugins: [],
};
