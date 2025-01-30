/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "2lg": "1070px",
      },
      flex: {
        2: "0 0 91px",
        3: " 1 75%;",
      },
      padding: {
        ny: "0px 0px 100%",
      },
    },
  },
  plugins: [],
};
