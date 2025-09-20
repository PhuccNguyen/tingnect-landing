import Hero from '@/components/home/Hero/Hero';
import { Metadata } from 'next';
import { socialLinks, contactEmail, eventSiteUrl, eventRegistrationUrl } from '@/data/social-links';

export const metadata: Metadata = {
  metadataBase: new URL('https://tingnect.com'),
  title: {
    default: 'TingNect - Official Web3 Community Platform | Build for Billions',
    template: '%s | TingNect',
  },
  description:
    'Official TingNect platform - Premier Web3 community connecting founders, builders, and innovators. Join exclusive events, networking sessions, and shape the future of decentralized technology in Vietnam and globally.',
  keywords: [
    'TingNect',
    'Web3 Vietnam',
    'Blockchain events Ho Chi Minh City',
    'Web3 community platform',
    'Build for Billions',
    'Web3 founders Vietnam',
    'Blockchain networking events',
    'TingNect official website',
    'Web3 ecosystem Vietnam',
    'Decentralized technology events',
    'Cryptocurrency meetup Vietnam',
    'Blockchain developers community',
  ],
  authors: [{ name: 'TingNect Team', url: 'https://tingnect.com' }],
  creator: 'TingNect',
  publisher: 'TingNect',
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
  icons: {
    icon: [
      { url: '/Image/Logo/TingNect/TingNectIcon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'vi_VN',
    url: 'https://tingnect.com',
    siteName: 'TingNect',
    title: 'TingNect - Official Web3 Community Platform | Build for Billions',
    description:
      'Join TingNect official platform - Premier Web3 community in Vietnam. Connect with founders, builders, and innovators shaping the decentralized future.',
    images: [
      {
        url: '/Image/Logo/TingNect/TingNect-Logo-OG.jpg',
        width: 1200,
        height: 630,
        alt: 'TingNect - Web3 Community Platform',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@tingnect',
    creator: '@tingnect',
    title: 'TingNect - Official Web3 Community Platform',
    description:
      'Premier Web3 community connecting founders and builders. Join exclusive events in Vietnam.',
    images: ['/Image/Logo/TingNect/TingNect-Logo-OG.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  category: 'Technology',
  classification: 'Business',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://tingnect.com',
    languages: {
      'en-US': 'https://tingnect.com',
      'vi-VN': 'https://tingnect.com/vi',
    },
  },
};

// =====================
// JSON-LD DATA
// =====================
const structuredData = [
  // Organization
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TingNect',
    url: 'https://tingnect.com',
    logo: 'https://tingnect.com/Image/Logo/TingNect/TingNect-Logo.png',
    description:
      'Official Web3 community platform connecting founders, builders, and innovators',
    foundingDate: '2024',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: contactEmail,
      areaServed: 'VN',
      availableLanguage: ['English', 'Vietnamese'],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ho Chi Minh City',
      addressCountry: 'Vietnam',
    },
    sameAs: socialLinks.map((link) => link.url),
  },

  // Event
  {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'TingNect Main Event 2025',
    url: eventSiteUrl,
    description:
      'Premier Web3 ecosystem event bringing together visionary founders and builders',
    startDate: '2025-08-16T14:00:00+07:00',
    endDate: '2025-08-16T17:00:00+07:00',
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: 'Ho Chi Minh City',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ho Chi Minh City',
        addressCountry: 'Vietnam',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'TingNect',
      url: 'https://tingnect.com',
    },
    offers: {
      '@type': 'Offer',
      url: eventRegistrationUrl,
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  },

  // Breadcrumb
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://tingnect.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: 'https://tingnect.com/products',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Contact',
        item: 'https://tingnect.com/contact',
      },
    ],
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />
    </>
  );
}
