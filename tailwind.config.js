/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './404.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0A1F44', 900: '#07152F', 800: '#0A1F44', 700: '#14305F', 600: '#22427A' },
        mist: { DEFAULT: '#D6E4F0', 50: '#F4F8FB', 100: '#EAF1F7', 200: '#D6E4F0', 300: '#B9CFE2' },
        gold: { DEFAULT: '#C9A24B', light: '#E2C98E', dark: '#84672A' },
      },
      fontFamily: {
        display: ['"League Spartan Variable"', 'system-ui', 'sans-serif'],
        sans: ['"Montserrat Variable"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(10,31,68,.04), 0 12px 32px -12px rgba(10,31,68,.18)',
        lift: '0 2px 4px rgba(10,31,68,.05), 0 24px 48px -16px rgba(10,31,68,.28)',
      },
      maxWidth: { container: '76rem' },
    },
  },
  plugins: [],
};
