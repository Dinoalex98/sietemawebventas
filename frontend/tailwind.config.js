/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#25d162",  // Verde claro
        dark: "#1d1d1d",     // Negro profundo
        graydark: "#2b2b2b", // Gris oscuro
        white: "#ffffff",    // Blanco puro
      },
      animation: {
        gradientBorder: 'gradientBorder 3s infinite', // Animación personalizada
      },
      keyframes: {
        gradientBorder: {
          '0%': { borderColor: 'rgb(255, 0, 0)' },
          '25%': { borderColor: 'rgb(0, 255, 0)' },
          '50%': { borderColor: 'rgb(0, 0, 255)' },
          '75%': { borderColor: 'rgb(255, 255, 0)' },
          '100%': { borderColor: 'rgb(255, 0, 0)' },
        },
      },
    },
  },
  plugins: [],
};
