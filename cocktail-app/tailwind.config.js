module.exports = {
  purge: [
    './pages/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/*.{js,ts,jsx,tsx}',
    './src/**/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: {
        '3/5': '67vh',
        '1/2': '45vh',
        '1/5': '40vh',
        '4/6': '70vh',
      },
      width: {
        '90': '22rem',
        '62': '15.5rem',
        '63': '15.7rem',
      },
      height: {
        '100': '30rem',
      },
      screens: {
        xs: { min: '390px' },
        md: '769px',
      },
      fontSize: {
        xxs: '0.2rem',
      },
      colors: {
        'light-gray': '#f4f4f4',
        'black/80': '#777777',
        'dark-gray': '#c9c9c9',
      },
      spacing: {
        '26': '6.5rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
