// tailwind.config.js
module.exports = {
  
  purge: ['./imports/ui/**/*.{js,jsx,ts,tsx}', './public/*.html'],
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
        'gray': '#8492a6',
        'gray-light': '#d3dce6',
      },
    },
  },
  variants: {},
  plugins: [],

}