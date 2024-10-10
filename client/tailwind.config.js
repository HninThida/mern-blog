/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite/package.json";
import scrollbar from "tailwind-scrollbar";
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        ttuPattern:
          "url('https://cdn.pixabay.com/photo/2016/05/27/08/51/mobile-phone-1419275_1280.jpg')",
      },
    },
  },
  plugins: [flowbite, scrollbar],
};
