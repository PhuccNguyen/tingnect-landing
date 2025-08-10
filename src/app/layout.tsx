'use client';

import { usePathname } from 'next/navigation';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Các trang hiển thị Footer
  const showFooter = ['/id', '/products'].includes(pathname);

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
            <head>
        {/* Favicon SVG */}
        <link
          rel="icon"
          href="/Image/Logo/TingNect/TingNecticon.svg"
          type="image/svg+xml"
        />
        {/* Fallback PNG (nếu cần) */}
        {/* <link rel="icon" href="/favicon-32.png" sizes="32x32" /> */}
      </head>
      <body className="font-inter antialiased" suppressHydrationWarning>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        {showFooter && <Footer />}
      </body>
    </html>
  );
}
