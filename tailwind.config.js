/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
        colors: {
          'text': '#def4dc',
          'background': '#0a2912',
          'primary': '#9be198',
          'secondary': '#dc0937',
          'accent': '#24c304',
         },
       fontSize: {
        sm: '0.750rem',
        base: '1rem',
        xl: '1.333rem',
        '2xl': '1.777rem',
        '3xl': '2.369rem',
        '4xl': '3.158rem',
        '5xl': '4.210rem',
      },
      fontFamily: {
        heading: 'Grotesque',
        body: 'Bricolage Grotesque',
      },
      fontWeight: {
        normal: '400',
        bold: '700',
      },
    }
  },
  plugins: [],
}

