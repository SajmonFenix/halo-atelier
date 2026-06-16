/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        halo: {
          bg: '#F5F0EB',
          dark: '#1A1A1A',
          muted: '#5C5550',
          section: '#EEE8E1',
          promise: '#EDE4DC',
          text: '#4A403A',
          button: '#CFC3B8',
          hover: '#8E7F73',
          accent: '#D6C1A3',
        },
      },
      fontFamily: {
        serif: ['GFS Didot', 'Georgia', 'serif'],
        sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        editorial: '0.35em',
      },
    },
  },
  plugins: [],
};
