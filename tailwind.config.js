/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          1: 'rgb(var(--color-accent1) / <alpha-value>)' ,
          2: 'rgb(var(--color-accent2) / <alpha-value>)' ,
          3: 'rgb(var(--color-accent3) / <alpha-value>)' ,
        },
        bkg: 'rgb(var(--color-bkg) / <alpha-value>)',
        content: 'rgb(var(--color-content) / <alpha-value>)',
      },
      animation: {
        "spin-slower": "spin 35s ease infinite",
        "spin-slow": "spin 25s ease-in-out infinite reverse",
      },
    },
  },
  plugins: [
    require('daisyui')
  ],
}

