/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          'moderate-blue': 'hsl(238, 40%, 52%)',
          'soft-red': 'hsl(358, 79%, 66%)',
          'light-grayish-blue': 'hsl(239, 57%, 85%)',
          'pale-red': 'hsl(357, 100%, 86%)'
        },
        neutral: {
          'dark-blue': 'hsl(212, 24%, 26%)',
          'grayish-blue': 'hsl(211, 10%, 45%)',
          'light-gray': 'hsl(220, 13%, 87%)',
          'very-light-gray': 'hsl(228, 33%, 97%)',
          'white': 'hsl(0, 0%, 100%)'
        }
      }
    },
    fontFamily: {
      rubik: ['Rubik', 'sans-serif'],
      jaldi: ['Jaldi', 'sans-serif']
    }
  },
  plugins: [],
}