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
          100: '#1ed760',
          200: '#1fbb5d',
          300: '#18a456',
        },
        charcoal: '#2a2829',
        offwhite: '#edf0f4',
      },
      fontFamily: {
        gingerbold: ['F37 Ginger', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwindcss/nesting'),
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
    require('tailwindcss/plugin')(function ({ addVariant }) {
      addVariant('slider-thumb', ['&::-webkit-slider-thumb', '&::slider-thumb']);
    }),
  ],
};

// input[type='range'] {
//   -webkit-appearance: none;
//   appearance: none;
//   background: transparent;
//   cursor: pointer;
//   width: auto;
// }

// input[type='range']:focus {
//   outline: none;
// }

// input[type='range']::-webkit-slider-runnable-track {
//   background-color: #053a5f;
//   border-radius: 0.5rem;
//   height: 0.5rem;
// }

// input[type='range']::-webkit-slider-thumb {
//   -webkit-appearance: none;
//   appearance: none;
//   margin-top: -12px;

//   /*custom styles*/
//   background-color: #5cd5eb;
//   height: 2rem;
//   width: 1rem;
// }

// input[type='range']:focus::-webkit-slider-thumb {
//   border: none;
//   outline: none;
// }

// input[type='range']::-moz-range-track {
//   background-color: #053a5f;
//   border-radius: 0.5rem;
//   height: 0.5rem;
// }

// input[type='range']::-moz-range-thumb {
//   border: none;

//   background-color: #5cd5eb;
//   height: 1rem;
//   width: 1rem;
// }

// input[type='range']:focus::-moz-range-thumb {
//   border: none;
//   outline: none;
// }
