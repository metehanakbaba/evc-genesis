import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/lib/providers/AppProviders';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EV Charging Admin Panel',
  description:
    'Professional EV charging station management platform with React 19',
  keywords: [
    'EV charging',
    'admin panel',
    'React 19',
    'Next.js 15',
    'electric vehicles',
  ],
  authors: [{ name: 'EV Charging Team' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#111827',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen bg-gradient-to-br from-gray-900 to-gray-800`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
