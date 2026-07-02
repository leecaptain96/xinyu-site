import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#f3f0e9",
        ink: "#20211e",
        moss: "#44584a",
        wine: "#744c4b",
        sand: "#cbbba6",
      },
      boxShadow: {
        soft: "0 24px 70px rgba(32, 33, 30, 0.09)",
      },
    },
  },
  plugins: [],
};

export default config;
