import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "orange-1": "#F49135",
      "orange-2": "#FBAE57",
      "orange-3": "#FAD1A3",
      "light-blue": "#B4E7F2",
      pink: "#F63D8B",
      white: "#F3F9FA",
      black: "#201F1F",
      grey: "#707070",
    },
  },
  plugins: [],
};
export default config;
