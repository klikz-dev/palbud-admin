const defaultTheme = require('tailwindcss/defaultTheme')
const withMT = require('@material-tailwind/react/utils/withMT')
const colors = require('tailwindcss/colors')

module.exports = withMT({
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media',
  theme: {
    colors: {
      blue: { default: '#4F46A2' },
    },
    extend: {
      fontFamily: {
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        zinc: colors.zinc,
        sky: colors.sky,
      },
    },
  },
})
