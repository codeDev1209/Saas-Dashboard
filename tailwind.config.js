/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4f46e5',
          dark: '#4338ca',
          light: '#818cf8',
        },
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        dark: {
          DEFAULT: '#1e293b',
          darker: '#0f172a',
        },
        light: '#f8fafc',
        border: '#e2e8f0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
