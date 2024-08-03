/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: { 
      screens:{
        'f':'1052px',
        's':'970px',
        'sl':'610px',
        'ss':'520px'
      }
    },
  },

}