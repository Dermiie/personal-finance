export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grey: {
          50: "#F5F5F6",
          100: "#E6E6E8",
          200: "#CFCFD4",
          300: "#B1B1B8",
          400: "#8F8F99",
          500: "#6F6F7A",
          600: "#555560",
          700: "#3F3F49",
          800: "#2C2B33",
          900: "#201F24",
          DEFAULT: "#201F24",
        },
        beige: {
          50: "#fdfbf9",
          100: "#f8f4f0", // 👈 your base
          200: "#eee6df",
          300: "#e2d6cc",
          400: "#d4c3b6",
          500: "#c2ab9a",
          600: "#a78f80",
          700: "#8a7466",
          800: "#6e5d52",
          900: "#544740",
          DEFAULT: "#F8F4F0",
        },
        green: {
          50: "#eef9f8",
          100: "#d6f0ee",
          200: "#aee1dd",
          300: "#7fd0ca",
          400: "#4fbdb6",
          500: "#277C78", // 👈 your base
          600: "#216b67",
          700: "#1b5855",
          800: "#154644",
          900: "#103735",
          DEFAULT: "#277C78",
        },
      },
    },
  },
};
