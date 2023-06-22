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
      backgroundImage: {
        banner1:
          "url('https://cdn.shopify.com/s/files/1/0603/4895/6804/files/Homepage_8R_Static_DK_cb3a85f3-0d80-44fc-960d-8a46bf6eb772.jpg?v=1677780733&width=1600')",
        banner2:
          "url('https://shakit.co.kr/data/apms/background/Beershakit2_PC.jpg')",
        banner3:
          "url('https://shakit.co.kr/data/apms/background/Main_%EC%A4%80%EB%B2%85_PC.jpg')",
      },
      minHeight: {
        '3/5': '67vh',
        '1/2': '45vh',
        '1/5': '40vh',
        '4/6': '70vh',
      },
      width: {
        '90': '22rem',
        '62': '15.5rem',
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
