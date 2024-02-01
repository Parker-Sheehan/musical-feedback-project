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
          'background2': '#2B4331',
          'background3': '#0D3913',
          'prim': '#9be198',
          'sec': '#DC0937',
          'sec2': "#531D1F",
          'accent': '#24c304',
         },
       fontSize: {
        sm: '0.85rem',
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

