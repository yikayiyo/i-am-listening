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
            'transform': "translateX(10%)",
          },
          "100%": {
            'transform': "translateX(0%)",
          }
        }
      },
      animation: {
        'record-effect': 'record 30s linear infinite',
        'slidein': "slide 200ms linear"
      },
      perspective: {
        'none': 'none',
        '2': '200px',
        'sm': '500px',
        'md': '1000px',
        'lg': '2000px',
        'xl': '3000px',
      },
    },
  },
  plugins: [],
}
