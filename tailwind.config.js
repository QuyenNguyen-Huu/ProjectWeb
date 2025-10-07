/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        custom_orange: '#F47435',
        custom_deepPurple: '#673AB7',
        custom_gray: '#333',
        custom_white: '#FFFFFF',
        custom_black: '#000000',
        custom_lightgray: '#adadad',

      },

      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}