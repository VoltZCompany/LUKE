import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        luke: {
          50: '#e8f0fe',
          100: '#c5d9fc',
          200: '#9dbffa',
          300: '#74a5f8',
          400: '#5691f5',
          500: '#3b7df2',
          600: '#2e6be0',
          700: '#1e56c9',
          800: '#1544a8',
          900: '#0a2d78',
        },
      },
    },
  },
  plugins: [],
}

export default config
