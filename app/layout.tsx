import type { Metadata } from 'next';
import React from 'react';
import { Inter, Cairo } from 'next/font/google';
import { SWRProvider } from './swr-provider';
import { Toaster } from 'react-hot-toast';

import './globals.css';

const inter = Cairo({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Almaher',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>
        <SWRProvider>{children}</SWRProvider>
        <Toaster />
      </body>
    </html>
  );
}
