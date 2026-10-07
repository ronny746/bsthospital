import type { Metadata, Viewport } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dr. BST Hospital, Jagatpura Jaipur | 24/7 Emergency & Multi-Specialty Hospital',
  description: 'Dr. BST Hospital, Jagatpura Jaipur (Dr. B.S. Tomar Institute of Medical Sciences & Research) — 1000+ beds, 24/7 advanced emergency & trauma care, super-specialty doctors, and modern healthcare.',
  keywords: 'Dr. BST Hospital, Jagatpura Jaipur, BST Hospital Jaipur, Hospital in Jagatpura, Emergency Hospital Jaipur, ICU Hospital Jaipur',
  icons: {
    icon: '/bst-favicon.png',
    shortcut: '/bst-favicon.png',
    apple: '/bst-favicon.png',
  },
  openGraph: {
    title: 'Dr. BST Hospital, Jagatpura Jaipur',
    description: '24/7 Advanced Emergency & Multi-Specialty Healthcare in Jagatpura, Jaipur.',
    images: ['/bst-favicon.png'],
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
