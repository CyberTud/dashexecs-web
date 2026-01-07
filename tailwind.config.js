/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB', // Blue-600
          dark: '#1E40AF', // Blue-800
          light: '#3B82F6', // Blue-500
          lighter: '#60A5FA', // Blue-400
        },
        secondary: {
          DEFAULT: '#1E3A8A', // Blue-900
          light: '#3B82F6', // Blue-500
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


