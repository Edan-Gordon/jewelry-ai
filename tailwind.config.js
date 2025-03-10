/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'luxury-gold': '#D4AF37',
        'rose-gold': '#B76E79',
        'soft-black': '#1A1A1A',
        'cream-white': '#F5F5F0',
      },
    },
  },
  plugins: [],
} 