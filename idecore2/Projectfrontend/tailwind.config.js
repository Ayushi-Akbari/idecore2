/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [    "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        'custom-brown': '#3D3028',
        'custom-beige': 'rgba(246,239,234,1)',
        'beige': 'rgba(246,239,234,1)',

      },
    },
  },
  plugins: [],
}

