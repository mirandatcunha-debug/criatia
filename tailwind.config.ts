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
        primary: {
          DEFAULT: "#8B5CF6",
          light: "#A78BFA",
          dark: "#7C3AED",
        },
        secondary: {
          DEFAULT: "#EC4899",
          light: "#F472B6",
          dark: "#DB2777",
        },
        accent: {
          DEFAULT: "#F59E0B",
          light: "#FBBF24",
          dark: "#D97706",
        },
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
        dark: "#1F2937",
        "gray-sec": "#6B7280",
        "gray-section": "#F3F4F6",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
        "gradient-secondary": "linear-gradient(135deg, #EC4899 0%, #F59E0B 100%)",
        "gradient-accent": "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)",
        "gradient-dark": "linear-gradient(135deg, #1F2937 0%, #374151 100%)",
        "gradient-card": "linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)",
      },
      boxShadow: {
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 12px 28px -4px rgba(139, 92, 246, 0.25)",
        glow: "0 0 20px rgba(139, 92, 246, 0.4)",
        "glow-pink": "0 0 20px rgba(236, 72, 153, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
