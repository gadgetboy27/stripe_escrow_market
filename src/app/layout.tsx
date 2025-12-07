import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Secure Escrow Marketplace - Safe Transactions for Everyone',
  description: 'Buy and sell with confidence. Our escrow service protects both buyers and sellers with secure payment holding, delivery confirmation, and dispute resolution. Only 2% platform fee.',
  keywords: ['escrow', 'marketplace', 'secure payments', 'buyer protection', 'seller protection'],
  authors: [{ name: 'Secure Escrow Marketplace' }],
  openGraph: {
    title: 'Secure Escrow Marketplace - Safe Transactions for Everyone',
    description: 'Buy and sell with confidence. Our escrow service protects both buyers and sellers.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
