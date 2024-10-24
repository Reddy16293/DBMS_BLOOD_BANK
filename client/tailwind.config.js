/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bgdeveloper': "url('./src/assets/bgdeveloper2.jpg')",
      },
    },
  },
  plugins: [],
}
