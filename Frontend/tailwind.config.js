const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      colors: {
        // Override Tailwind’s default with safe colors
        primary: "#6a0dad", // Example hex color
      },
    },
  },
  corePlugins: {
    preflight: true,
  },
};

module.exports = {
  experimental: {
    optimizeUniversalDefaults: true, // <--- Add this line
  },
};

