'use client';

import { usePathname } from 'next/navigation';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import ChatWidget from '@/components/ui/ChatWidget/ChatWidget';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showFooter = ['/id', '/products', '/contact', '/privacy'].includes(pathname || '');

  // Dùng env để tạo canonical tuyệt đối
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tingnect.com';
  const canonical = `${SITE_URL}${pathname || ''}`;

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        {/* Basic */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonical} />

        {/* Favicon / Touch icons (đặt file không có khoảng trắng) */}
        {/* => Đảm bảo đã đổi tên file trong /public, ví dụ: TingNectIcon.svg, apple-touch-icon.png */}
        <link rel="icon" href="/Image/Logo/TingNect/TingNectIcon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Default SEO Meta */}
        <title>TingNect — Build for Billions</title>
        <meta
          name="description"
          content="TingNect is a premier Web3 platform uniting developers, founders, and tech enthusiasts to build for billions. Organized by Ting Foundation."
        />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <meta name="author" content="TingNect Team" />
        <meta name="creator" content="Ting Foundation" />
        <meta name="publisher" content="TingNect" />
        <meta name="theme-color" content="#3b82f6" />

        {/* Open Graph defaults */}
        <meta property="og:site_name" content="TingNect" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content="TingNect — Build for Billions" />
        <meta
          property="og:description"
          content="Premier Web3 platform connecting builders and innovators. Explore IDs, products and events."
        />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={`${SITE_URL}/Image/Logo/TingNect/og-default.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tingnect" />
        <meta name="twitter:creator" content="@tingnect" />
        <meta name="twitter:title" content="TingNect — Build for Billions" />
        <meta
          name="twitter:description"
          content="Premier Web3 platform connecting builders and innovators."
        />
        <meta name="twitter:image" content={`${SITE_URL}/Image/Logo/TingNect/og-default.jpg`} />

        {/* Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* JSON-LD Organization (giữ path không khoảng trắng) */}
        <script
          type="application/ld+json"
          // Tránh ký tự đặc biệt: thay < bằng \u003c nếu cần
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'TingNect',
              url: SITE_URL,
              logo: `${SITE_URL}/Image/Logo/TingNect/TingNectIcon.png`,
              description:
                'Premier Web3 platform uniting developers, entrepreneurs, and tech enthusiasts to shape a sustainable decentralized ecosystem.',
              sameAs: [
                'https://twitter.com/tingnect',
                'https://t.me/tingnect_official',
                'https://github.com/tingnect',
              ],
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Ho Chi Minh City',
                addressCountry: 'VN',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                email: 'contact@tingnect.com',
              },
              foundingDate: '2024',
              founder: { '@type': 'Organization', name: 'Ting Foundation' },
              keywords:
                'Web3, Blockchain, Decentralized, Identity, Developer Community, Vietnam, TingNect, Ting Foundation',
            }),
          }}
        />
      </head>

      <body className="font-inter antialiased" suppressHydrationWarning>
        {/* GA4 (đổi GA_MEASUREMENT_ID) */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'GA_MEASUREMENT_ID'}`} strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'GA_MEASUREMENT_ID'}');
          `}
        </Script>

        <Header />
        <main className="min-h-screen">{children}</main>
        {showFooter && <Footer />}

        {/* Chat Widget (Assistant) */}
        <ChatWidget assistantId={process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID} />
      </body>
    </html>
  );
}
