/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        default: ["Rubik", "sans-serif"]
      }
    }
  },
  plugins: []
};
