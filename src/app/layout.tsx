import type { Metadata } from 'next';
import './globals.css';
import notoSansJP from '@/app/fonts';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Boda Max y Carla',
  description: 'Boda Max y Carla 21-Sept-2024',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={notoSansJP.className}><Suspense>{children}</Suspense></body>
    </html>
  );
}
