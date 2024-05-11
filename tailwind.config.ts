import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      h1: '40px',
      h2: '32px',
      h3: '1.17rem',
      h4: '1rem',
      h5: '0.83rem',
      h6: '0.67rem',
      p: '16px',
      small: '14px',
      tiny: '10px',
    },
    fontWeight: {
      h1: '500',
      h2: '600',
      p: '400',
      semibold: '600',
    },
    lineHeight: {
      h1: '44px',
      h2: '40px',
      h3: '36px',
      h4: '32px',
      h5: '28px',
      h6: '24px',
      p: '22px',
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        neutral: {
          100: '#fdfdfd',
          300: '#f8f8f8',
          500: '#d4d4d4',
          900: '#7a7a7a',
        },
        pink: {
          100: '#fee3e8',
        },
        purple: {
          100: '#552d38'
        }
      },
    },
  },
  plugins: [],
};
export default config;
