/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'], // Sets Poppins as default font
      primary: ['Poppins', 'sans-serif'],
      body: ['Poppins', 'sans-serif']
    },
    extend: {
      fontWeight: {
        medium: 500,
        semibold: 600,
        bold: 700
      },
      content: {
        about: 'url("/src/assets/img/outline-text/about.svg")',
      },
      colors: {
        background: '#eef4f6',
        primary: '#072C3B', // updated to match the provided red color
        primarylight: '#eef4f6', // lighter variant of primary
        secondary: '#eef4f6',
        card: '#FFFFFF',

        hint: "#605E5E",
        darkhint: "#B0B5BE",

        tertiary: '#131419',

        dark: '#22242F',
        light: '#ECF0F3',

        xdarkshadow: '#373C45',
        ydarkshadow: '#181920',

        xlightshadow: '#A3B1C6',
        ylightshadow: '#FFFFFF',

        accent: {
          DEFAULT: '#ac6b34',
          hover: '#925a2b',
        },
        paragraph: '#878e99',
      },
    },
  },
  plugins: [],
}

