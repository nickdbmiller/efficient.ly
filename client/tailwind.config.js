module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        lime: {
          1000: '#0B1005',
        }
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],      
    },
  },
  plugins: [],
}
