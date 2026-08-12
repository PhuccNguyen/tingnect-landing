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
  title: `${SITE_CONFIG.name} | ${SITE_CONFIG.slogan}`,
  description: `${SITE_CONFIG.description} ${SITE_CONFIG.tagline}.`,
  keywords: [
    'Yaa Club',
    'sports community',
    'sports booking',
    'pickleball',
    'wellbeing',
    'run club',
    'yoga',
    'padel',
    'events',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.website,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.slogan}`,
    description: SITE_CONFIG.description,
    images: [{ url: '/brand/logo/icon-512.png', width: 506, height: 512, alt: `${SITE_CONFIG.name} logo` }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@YaaClubApp',
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.slogan}`,
    description: SITE_CONFIG.description,
  },
  icons: {
    icon: '/brand/logo/icon-512.png',
    apple: '/brand/logo/icon-512.png',
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
          JSON-LD Organization.
          Da BO schema LocalBusiness cu: no khai bao dia chi "Ho Chi Minh City"
          va so dien thoai "+84" — deu la du lieu bia. Structured data sai se
          bi Google phat. Chi khai bao lai khi co dia chi doanh nghiep that.
        */}
        <Script id="org-jsonld" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: SITE_CONFIG.name,
            url: SITE_CONFIG.website,
            logo: `${SITE_CONFIG.website}/brand/logo/icon-512.png`,
            description: SITE_CONFIG.description,
            sameAs: [
              SOCIAL_LINKS.twitter,
              SOCIAL_LINKS.facebook,
              SOCIAL_LINKS.youtube,
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
