import { Noto_Sans } from 'next/font/google';

const notoSansJP = Noto_Sans({
  style: ['normal', 'italic'],
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--noto-serif',
  display: 'swap'
});

export default notoSansJP;
