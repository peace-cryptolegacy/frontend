/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },

    // This is overridden by the chakra theme
    fontFamily: {
      sans: ["'Readex Pro'", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        black: '#000',
        white: '#fff',
        green: '#61F2E2',
        purple: {
          100: '#EBDEFF',
          300: '#F3ECFE',
          900: '#5F4DFF',
        },
        transparent: 'transparent',
        darkBlue: '#0f172a',
        blueGray: '#475569',
      },
    },
    backgroundImage: {
      mainVertical:
        'linear-gradient(172.89deg, #5DB5EA 4.39%, #5F4DFF 51.8%, #E31792 97.28%)',
      mainHorizontal:
        'linear-gradient(90.54deg, #17C0F1 0.42%, #5F4DFF 51.76%, #E21692 100%);',
    },
  },
  plugins: [
    require('tailwindcss-debug-screens'),
    require('prettier-plugin-tailwindcss'),
  ],
};
