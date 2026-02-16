import { Inter, Space_Grotesk } from "next/font/google";
import { Metadata } from 'next';
import "./globals.css";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import ChatWidget from "@/components/ui/ChatWidget/ChatWidget";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL('https://tingnect.com'),
  title: 'TingNect - Build for Billions',
  description: 'Premier Web3 community platform for builders and innovators',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tingnect.com',
    siteName: 'TingNect',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="font-inter antialiased" suppressHydrationWarning>
        {/* GA4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || "GA_MEASUREMENT_ID"}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || "GA_MEASUREMENT_ID"}');
          `}
        </Script>

        {/* JSON-LD Organization */}
        <Script id="org-jsonld" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "TingNect",
            url: "https://tingnect.com",
            logo: "https://tingnect.com/Image/Logo/TingnectNew/logo-tingnect-white.png",
            sameAs: [
              "https://twitter.com/tingnect",
              "https://linkedin.com/company/tingnect",
              "https://github.com/tingnect",
            ],
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer service",
              email: "contact@tingnect.com",
              areaServed: "VN",
              availableLanguage: ["English", "Vietnamese"],
            },
            address: {
              "@type": "PostalAddress",
              addressLocality: "Ho Chi Minh City",
              addressCountry: "VN",
            },
          })}
        </Script>

        {/* LocalBusiness Schema for Local SEO */}
        <Script id="local-business-schema" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "TingNect",
            "image": "https://tingnect.com/Image/Logo/TingnectNew/TingNect icon white.png",
            "description": "Premier Web3 community platform connecting innovators, builders, and investors in Vietnam. Build for Billions.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Ho Chi Minh City",
              "addressCountry": "VN"
            },
            "telephone": "+84",
            "email": "contact@tingnect.com",
            "url": "https://tingnect.com",
            "sameAs": [
              "https://twitter.com/tingnect",
              "https://linkedin.com/company/tingnect",
              "https://github.com/tingnect"
            ],
            "priceRange": "Free",
            "areaServed": {
              "@type": "Country",
              "name": "VN"
            }
          })}
        </Script>

        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ChatWidget assistantId={process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID} />
      </body>
    </html>
  );
}
