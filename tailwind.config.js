/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'], 
      },
    },
  },
  plugins: [],
  corePlugins: { preflight: false },
  prefix: "tw-",
}

