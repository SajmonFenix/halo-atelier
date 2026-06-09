/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        halo: {
          bg: '#FAF7F4',
          section: '#F5EFEA',
          text: '#4A403A',
          button: '#CFC3B8',
          hover: '#8E7F73',
          accent: '#D6C1A3',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Raleway', 'Helvetica', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        editorial: '0.35em',
      },
    },
  },
  plugins: [],
};
