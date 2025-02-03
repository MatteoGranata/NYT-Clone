/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "2lg": "1070px",
        "2md":"740px",
        xs: "600px",
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
  plugins: [
    plugin(function ({ addVariant, e }) {
      // Variante per :not(:empty)
      addVariant("not-empty", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`not-empty${separator}${className}`)}:not(:empty)`;
        });
      });

      // Variante per :not(:first-child)
      addVariant("not-first-child", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(
            `not-first-child${separator}${className}`
          )}:not(:first-child)`;
        });
      });

      // Variante combinata :not(:empty):not(:first-child)
      addVariant(
        "not-empty-not-first-child",
        ({ modifySelectors, separator }) => {
          modifySelectors(({ className }) => {
            return `.${e(
              `not-empty-not-first-child${separator}${className}`
            )}:not(:empty):not(:first-child)`;
          });
        }
      );
    }),
  ],
};
