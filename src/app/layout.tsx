import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import ChatWidget from "@/components/ui/ChatWidget/ChatWidget";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });

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
            logo: "https://tingnect.com/Image/Logo/TingNect/TingNect-Logo.png",
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

        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ChatWidget assistantId={process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID} />
      </body>
    </html>
  );
}
