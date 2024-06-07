import { Noto_Sans, Dancing_Script, Lora } from 'next/font/google';

export const notoSansJP = Noto_Sans({
  style: ['normal', 'italic'],
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--noto-serif',
  display: 'swap'
});

export const dancingScript = Dancing_Script({
  style: ['normal'],
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--dancing-script',
  display: 'swap'
});

export const lora = Lora({
  style: ['normal'],
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--lora',
  display: 'swap'
});
