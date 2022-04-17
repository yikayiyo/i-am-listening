module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        record: {
          '0%': {
            transform: 'rotate(0deg)'
          },
          '100%': {
            transform: 'rotate(360deg)'
          },
        },
        slide: {
          "0%": {
            'transform': "translate(0%)",
          },
          "100%": {
            'transform': "translate(-50%)",
          }
        }
      },
      animation: {
        'record-effect': 'record 30s linear infinite',
        'slidein': "slide 30s linear infinite alternate"
      }
    },
  },
  plugins: [],
}
