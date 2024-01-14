import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        one: "#483C32",
        two: "#445E36",
        three: "#FFFFF0",
        four: "#B3CBA6",
        fail: "#F7576B",
        success: "#97D359",
      },
      fontFamily: {
        one: ["var(--font-josenfin-sans)"],
        two: ["var(--font-quicksand)"],
      },
    },
  },

  plugins: [],
};
export default config;
