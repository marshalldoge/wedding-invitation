import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      h1: '4rem',
      h2: '2.4rem',
      h3: '2rem',
      h4: '1.8rem',
      h5: '1.4rem',
      h6: '1.2rem',
      p: '1rem',
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
      fontFamily: {
        noto: ['var(--noto-serif)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
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
