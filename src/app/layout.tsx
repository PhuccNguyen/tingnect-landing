import { Inter, Archivo } from "next/font/google";
import { Metadata } from 'next';
import "./globals.css";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import ChatWidget from "@/components/ui/ChatWidget/ChatWidget";
import FloatingDownloadCTA from "@/components/home/FloatingDownloadCTA/FloatingDownloadCTA";
import Script from "next/script";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

/*
 * Display face = Archivo, nap kem truc bien thien `wdth` (62-125).
 * Nho co truc do moi ep hep chu bang font-stretch duoc — day la thu hep
 * THAT SU trong thiet ke chu. Cach thay the la transform: scaleX() thi chi
 * la keo meo anh: net doc bi mong di trong khi net ngang giu nguyen.
 * Inter Tight (dung truoc day) khong co truc wdth nen khong lam duoc.
 */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["wdth"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.website),

  /* ── Core ─────────────────────────────────────────────── */
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.slogan}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: `${SITE_CONFIG.description} ${SITE_CONFIG.tagline}. Discover clubs, book courts, join run clubs, yoga sessions, pickleball leagues and more.`,
  keywords: [
    'Yaa Club', 'yaaclub', 'sports community', 'sports booking app',
    'pickleball', 'padel', 'run club', 'yoga', 'football',
    'wellbeing', 'community sports', 'book sports activities',
    'sports events', 'club discovery', 'event management',
    'fitness community', 'sports social network',
  ],
  applicationName: SITE_CONFIG.name,
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  category: 'Sports & Fitness',

  /* ── Canonical & Alternates ──────────────────────────── */
  alternates: {
    canonical: '/',
  },

  /* ── Open Graph (Facebook, Discord, Slack, iMessage…) ── */
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.website,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.slogan}`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: '/brand/og-image.png',
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} — ${SITE_CONFIG.slogan}. Play. Connect. Grow.`,
        type: 'image/png',
      },
    ],
  },

  /* ── Twitter / X ─────────────────────────────────────── */
  twitter: {
    card: 'summary_large_image',
    site: '@YaaClubApp',
    creator: '@YaaClubApp',
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.slogan}`,
    description: `${SITE_CONFIG.description} More than a game, it's a community.`,
    images: ['/brand/og-image.png'],
  },

  /* ── Icons & Theme ───────────────────────────────────── */
  icons: {
    icon: [
      { url: '/brand/logo/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/brand/logo/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  },

  /* ── Misc SEO signals ────────────────────────────────── */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'theme-color': '#0a0a0a',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': SITE_CONFIG.name,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable}`} suppressHydrationWarning>
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

        {/*
          JSON-LD Structured Data — Organization + WebSite + SoftwareApplication.
          Combined for rich search results: knowledge panel, sitelinks, app info.
        */}
        <Script id="org-jsonld" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": `${SITE_CONFIG.website}/#organization`,
                name: SITE_CONFIG.name,
                url: SITE_CONFIG.website,
                logo: {
                  "@type": "ImageObject",
                  url: `${SITE_CONFIG.website}/brand/logo/icon-512.png`,
                  width: 512,
                  height: 512,
                },
                image: `${SITE_CONFIG.website}/brand/og-image.png`,
                description: SITE_CONFIG.description,
                sameAs: [
                  SOCIAL_LINKS.twitter,
                  SOCIAL_LINKS.facebook,
                  SOCIAL_LINKS.youtube,
                ],
              },
              {
                "@type": "WebSite",
                "@id": `${SITE_CONFIG.website}/#website`,
                url: SITE_CONFIG.website,
                name: SITE_CONFIG.name,
                description: SITE_CONFIG.description,
                publisher: { "@id": `${SITE_CONFIG.website}/#organization` },
                inLanguage: "en-US",
              },
              {
                "@type": "SoftwareApplication",
                name: SITE_CONFIG.name,
                operatingSystem: "iOS, Android",
                applicationCategory: "SportsApplication",
                description: SITE_CONFIG.description,
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
              },
            ],
          })}
        </Script>

        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ChatWidget assistantId={process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID} />
        <FloatingDownloadCTA />
      </body>
    </html>
  );
}
