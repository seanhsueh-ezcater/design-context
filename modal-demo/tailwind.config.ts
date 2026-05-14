import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          50: '#d7fcdc',
          100: '#b3ffb9',
          200: '#82fa9a',
          300: '#00e15d',
          400: '#00b34a',
          500: '#028a46',
          600: '#00592d',
          700: '#003d24',
          800: '#00251d',
        },
        peppercorn: {
          50: '#f4f4f4',
          100: '#e3e3e3',
          200: '#bebebe',
          300: '#999999',
          400: '#747474',
          500: '#606061',
          600: '#505050',
          700: '#2b2b2b',
          800: '#000000',
        },
        guava: {
          50: '#fff2f4',
          100: '#ffe8ea',
          200: '#ffc9ca',
          300: '#ff585d',
          400: '#d90026',
          500: '#b10213',
          600: '#8d0202',
          700: '#680900',
          800: '#460800',
        },
      },
      borderRadius: {
        modal: '16px',
      },
      fontFamily: {
        sans: ['Figtree', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
