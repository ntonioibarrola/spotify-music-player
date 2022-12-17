/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow-running': 'spin 7s linear infinite running',
        'spin-slow-paused': 'spin 7s linear infinite paused',
      },
      colors: {
        spotify: {
          100: '#5e82ad',
          200: '#82a3c2',
          300: '#333b4d',
        },
        charcoal: '#2a2829',
        offwhite: '#edf0f4',
        error: '#ff4242',
        warning: '#ffc021',
        info: '#2f86eb',
      },
      fontFamily: {
        gingerbold: ['F37 Ginger', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwindcss/nesting'),
    require('@tailwindcss/line-clamp'),
    require('@headlessui/tailwindcss')({ prefix: 'ui' }),
    require('tailwindcss-fluid-type')({
      settings: {
        fontSizeMin: 0.75,
        fontSizeMax: 1.25,
        ratioMin: 1.125,
        ratioMax: 1.2,
        screenMin: 20,
        screenMax: 96,
        unit: 'rem',
        prefix: 'fluid-',
        extendValues: true,
      },
      values: {
        xs: [-2, 1.6],
        sm: [-1, 1.6],
        base: [0, 1.6],
        lg: [1, 1.6],
        xl: [2, 1.2],
        '2xl': [3, 1.2],
        '3xl': [4, 1.2],
        '4xl': [5, 1.1],
        '5xl': [6, 1.1],
        '6xl': [7, 1.1],
        '7xl': [8, 1],
        '8xl': [9, 1],
        '9xl': [10, 1],
      },
    }),
  ],
};
