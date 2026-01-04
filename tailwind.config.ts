import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Cores do template Geex
        primary: {
          DEFAULT: "#AB54DB",
          light: "#AB54DB26",
        },
        secondary: "#B7DBF9",
        dark: {
          DEFAULT: "#17161E",
          body: "#464255",
          desc: "#3B3741",
        },
        gray: {
          sec: "#A3A3A3",
          100: "#ECEAF3",
          200: "#D0D6DE",
          300: "#B9BBBD",
          section: "#F3F2F7",
          sectionTwo: "#F5F4F9",
          sectionThree: "#fcfcfc",
        },
        success: {
          DEFAULT: "#00A389",
          light: "#2ED6A326",
        },
        warning: {
          DEFAULT: "#FFBB54",
          light: "#FFBB5426",
        },
        danger: {
          DEFAULT: "#FF5B5B",
          light: "#FF5B5B26",
        },
        info: {
          DEFAULT: "#58CDFF",
          light: "#58CDFF26",
        },
        pink: "#ff68b5",
        tertiary: "#EF9A91",
        quaternary: "#F1E6B9",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        card: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        sidebar: "0px 0px 20px rgba(0, 0, 0, 0.05)",
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
    },
  },
  plugins: [],
};

export default config;
