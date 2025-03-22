/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#f0f5fa',
          100: '#e1eaf6',
          200: '#c3d5ed',
          300: '#a5c0e4',
          400: '#87aadb',
          500: '#6995d2',
          600: '#4b80c9',
          700: '#366bc0',
          800: '#2156b7',
          900: '#0d41ae',
        },
      },
    },
  },
  plugins: [],
};