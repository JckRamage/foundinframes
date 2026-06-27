import type { Config } from "tailwindcss"
import typography from "@tailwindcss/typography"

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#ffecb4",
        paper: "#f8f7f0",
        ink: "#5a3d2b",
        maroon: "#5e110b",
        orange: "#e5771e",
        mint: "#75c8ae",
        gold: "#f4a127",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Poppins", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [typography],
}

export default config
