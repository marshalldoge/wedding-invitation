import type { Metadata, Viewport } from 'next';
import './globals.css';
import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';
import { notoSansJP } from '@/app/fonts';
import { Suspense } from 'react';

export const metadata: Metadata = {
  metadataBase: new URL('https://d5hob6znbt2um.cloudfront.net'),
  title: 'Boda Max y Carla',
  description: 'Boda Max y Carla 21-Sept-2024',
  openGraph: {
    title: 'Boda Max y Carla',
    description: 'Boda Max y Carla 21-Sept-2024',
    images: '/open-graph-image.png',
  }
};

export const viewport: Viewport = {
  themeColor: '#C7E0FF',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${notoSansJP.className}`}><Suspense>{children}</Suspense></body>
    </html>
  );
}
