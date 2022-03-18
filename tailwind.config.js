const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // rose 500 #f43f5e
        // rose 600 #e11d48
        // ss #fe3c72
        rose: {
          500: '#fe3c72'
        },
      
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'),  require('@tailwindcss/aspect-ratio'),],
};
