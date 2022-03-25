// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  content: ['./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
  plugins: [
    require('tw-elements/dist/plugin')
  ],
  purge: ["./src/**/*.vue"],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      textColor: ['responsive', 'hover', 'focus', 'group-hover'],
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
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
        'status-green': '#00FF75',
        'status-red': '#FF002E',
        'input-dark': '#141417'
      },
    },
  },
  variants: {},
}