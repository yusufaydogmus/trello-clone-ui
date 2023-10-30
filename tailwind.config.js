/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'trello-bacground-image':"url('/src/assets/trello.jpg')"
      },
      maxListHeight:{
        '128':'30rem',
      }
    },
  },
  plugins: [],
}

