/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing:{
        '540': '540px'
      },
      height: {
        '85p': '85%'
      },
      boxShadow:{
        'form': '0 15px 35px 0 rgba(60,66,87,.08), 0 5px 15px 0 rgba(0,0,0,.12)',
        /*'inputfocus': '0 0 0 2px #F472B6'*/
      },
    },
  },
  plugins: [],
}

