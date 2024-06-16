// tailwind.config.js

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./<custom directory>/**/*.{js,jsx,ts,tsx}",
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
        white: "#FFFFE5",
      },
    },
  },
  plugins: [],
};
