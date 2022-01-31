// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'dark': '#000000',
        'blue': '#1fb6ff',
        'purple': '#7e5bef',
        'pink': '#ff49db',
        'orange': '#ff7849',
        'green': '#13ce66',
        'yellow': '#ffc82c',
        'gray-dark': '#0C0C0C',
        'gray-dark-light': '#191919',
        'gray': '#8492a6',
        'gray-light': '#d3dce6',
      },
    },
  },
  variants: {},
  plugins: [],

}