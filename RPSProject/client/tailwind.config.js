/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '850px',
      md: '900px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      lineHeight: {
        extra: '20rem',
      },
    },
  },
  plugins: [],
};
