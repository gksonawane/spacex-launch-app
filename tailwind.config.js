/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
     fontFamily : {
      'my-font' : ['Merriweather','serif'],
      'title' : ['Bree Serif'],
     }
    },
  },
  plugins: [],
}

