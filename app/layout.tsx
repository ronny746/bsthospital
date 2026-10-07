import type { Metadata, Viewport } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dr. B. S. Tomar Institute of Medical Sciences & Hospital | Jaipur',
  description: 'Premium healthcare, 24/7 Tatkaal ICU, and super-specialty medical care in Jaipur, Rajasthan.',
  icons: {
    icon: '/bstims-logo.png',
    shortcut: '/bstims-logo.png',
    apple: '/bstims-logo.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={openSans.className}>{children}</body>
    </html>
  );
}
