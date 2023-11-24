/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
     "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-1': '#000000',
        'custom-2': '#1693a5',
        'custom-3': '#d8d8c0',
        'custom-4': '#f0f0d8',
        'custom-5': '#ffffff',
      },
      borderWidth: {
        '12': '12px',
      },
    },
  },
  plugins: [],
}