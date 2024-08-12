/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],  
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#ffffff',
        blue: {
          600: '#1d4ed8',
          700: '#1e40af'
        }
      },
      spacing: {
        '1/3': '33.333333%',
        'screen-90': '90vh'
      },
      boxShadow: {
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)'
      },
      transform: {
        scale: 'scale(1.1)',
      }
    },
  },
  plugins: [],
}

