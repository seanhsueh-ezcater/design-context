import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        peppercorn: {
          50:  'var(--peppercorn-50)',
          100: 'var(--peppercorn-100)',
          200: 'var(--peppercorn-200)',
          300: 'var(--peppercorn-300)',
          400: 'var(--peppercorn-400)',
          500: 'var(--peppercorn-500)',
          600: 'var(--peppercorn-600)',
          700: 'var(--peppercorn-700)',
          800: 'var(--peppercorn-800)',
        },
        'ez-green': {
          50:  'var(--green-50)',
          100: 'var(--green-100)',
          200: 'var(--green-200)',
          300: 'var(--green-300)',
          400: 'var(--green-400)',
          500: 'var(--green-500)',
          600: 'var(--green-600)',
          700: 'var(--green-700)',
          800: 'var(--green-800)',
        },
        'ez-blue': {
          100: 'var(--blue-100)',
          400: 'var(--blue-400)',
          500: 'var(--blue-500)',
        },
        guava: {
          100: 'var(--guava-100)',
          400: 'var(--guava-400)',
          500: 'var(--guava-500)',
        },
      },
      fontFamily: {
        sans: ['Figtree', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
      },
    },
  },
  plugins: [],
} satisfies Config;
