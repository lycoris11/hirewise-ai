/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      spacing:{
        '540': '540px'
      },
      height: {
        '85p': '85%',
        '75vh': '75vh'
      },
      boxShadow:{
        'form': '0 15px 35px 0 rgba(60,66,87,.08), 0 5px 15px 0 rgba(0,0,0,.12)',
        /*'inputfocus': '0 0 0 2px #F472B6'*/
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

