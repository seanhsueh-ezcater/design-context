import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'ez-green': '#14532d',
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
