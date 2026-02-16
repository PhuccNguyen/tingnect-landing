import Hero from '@/components/home/Hero/Hero';
import { Metadata } from 'next';
import { socialLinks, contactEmail, eventSiteUrl, eventRegistrationUrl } from '@/data/social-links';

export const metadata: Metadata = {
  metadataBase: new URL('https://tingnect.com'),
  title: {
    default: 'TingNect - Build for Billions',
    template: '%s | TingNect - Build for Billions',
  },
  
  description: 
    'TingNect - The premier Web3 community platform in Vietnam. Connect with founders, builders & innovators. Join exclusive blockchain events, hackathons & networking sessions. Build for Billions.',
  
  keywords: [
    // Primary brand keywords
    'TingNect',
    'TingNect Build for Billions',
    'TingNect Vietnam',
    'TingNect Web3',
    'TingNect platform',
    'TingNect community',
    
    // Core mission
    'Build for Billions',
    'Web3 Vietnam',
    'Web3 community platform',
    'Blockchain Vietnam',
    'Vietnam Web3 ecosystem',
    
    // Community & Events
    'Web3 events Vietnam',
    'Blockchain events HCMC',
    'Web3 builders Vietnam',
    'Crypto community Vietnam',
    'Web3 networking Vietnam',
    'Blockchain meetup Vietnam',
    
    // Geographic & Market
    'Vietnam blockchain community',
    'Web3 ecosystem Asia',
    'HCMC Web3',
    'Southeast Asia Web3',
    'Vietnam crypto',
    
    // Technology & Innovation
    'Web3 adoption Vietnam',
    'Blockchain innovation hub',
    'Web3 development Vietnam',
    'Decentralized applications Vietnam',
  ],

  authors: [
    { 
      name: 'TingNect Team', 
      url: 'https://tingnect.com' 
    }
  ],
  
  creator: 'TingNect',
  publisher: 'TingNect',
  
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: [
      { url: '/Image/Logo/TingnectNew/TingNect icon white.png', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' }
    ],
    shortcut: '/favicon.ico',
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'vi_VN',
    url: 'https://tingnect.com',
    siteName: 'TingNect - Build for Billions',
    title: 'TingNect - Build for Billions',
    description: 
      'Join the premier Web3 community platform in Vietnam. Connect with innovators, attend exclusive events & shape the future of blockchain. Build for Billions with TingNect.',
    images: [
      {
        url: '/Image/Logo/TingnectNew/TingNect icon white.png',
        width: 512,
        height: 512,
        alt: 'TingNect - Build for Billions',
        type: 'image/png',
        secureUrl: 'https://tingnect.com/Image/Logo/TingnectNew/TingNect icon white.png',
      }
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@tingnect',
    creator: '@tingnect',
    title: 'TingNect - Build for Billions',
    description: 
      'Leading Web3 community platform in Vietnam. Join us in building the future of blockchain technology. #BuildForBillions',
    images: [{
      url: '/Image/Logo/TingnectNew/TingNect icon white.png',
      alt: 'TingNect - Build for Billions'
    }],
  },

  verification: {
    google: 'tingnect-build-for-billions-google-verification',
    yandex: 'tingnect-yandex-verification',
    other: {
      'baidu-site-verification': 'tingnect-baidu-verification',
      'norton-safeweb-site-verification': 'tingnect-norton-verification',
      'msvalidate.01': 'tingnect-bing-verification'
    }
  },

  alternates: {
    canonical: 'https://tingnect.com',
    languages: {
      'en-US': 'https://tingnect.com',
      'vi-VN': 'https://tingnect.com/vi',
    },
    types: {
      'application/rss+xml': 'https://tingnect.com/feed.xml',
    }
  },

  other: {
    'theme-color': '#ffffff',
    'msapplication-TileColor': '#2b5797',
    'msapplication-config': '/browserconfig.xml',
  }
};

// =====================
// JSON-LD DATA
// =====================
const structuredData = [
  // Organization
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://tingnect.com/#organization',
    name: 'TingNect',
    slogan: 'Build for Billions',
    url: 'https://tingnect.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://tingnect.com/Image/Logo/TingNect/TingNect-Logo.png',
      width: '512',
      height: '512'
    },
    description: 'Leading Web3 community platform connecting innovators and builders across Vietnam',
    foundingDate: '2024',
    founders: [{
      '@type': 'Person',
      name: 'TingNect Founder'
    }],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: contactEmail,
      areaServed: ['VN', 'APAC'],
      availableLanguage: ['English', 'Vietnamese'],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ho Chi Minh City',
      addressCountry: 'Vietnam',
    },
    sameAs: socialLinks.map((link) => link.url),
  },

  // Website
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://tingnect.com/#website',
    url: 'https://tingnect.com',
    name: 'TingNect - Build for Billions',
    description: 'Leading Web3 Community Platform in Vietnam',
    publisher: {
      '@id': 'https://tingnect.com/#organization'
    },
    inLanguage: 'en-US',
  },

  // WebPage
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://tingnect.com/#webpage',
    url: 'https://tingnect.com',
    name: 'TingNect - Build for Billions',
    isPartOf: {
      '@id': 'https://tingnect.com/#website'
    },
    about: {
      '@id': 'https://tingnect.com/#organization'
    },
    description: 'Join the premier Web3 community platform in Vietnam. Connect with innovators, attend exclusive events & shape the future of blockchain.',
    inLanguage: 'en-US',
    potentialAction: [{
      '@type': 'ReadAction',
      target: ['https://tingnect.com']
    }]
  },

  // Event
  {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'TingNect Main Event 2025',
    description: 'Premier Web3 ecosystem event bringing together visionary founders and builders',
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
      }
    },
    organizer: {
      '@type': 'Organization',
      name: 'TingNect',
      url: 'https://tingnect.com'
    },
    offers: {
      '@type': 'Offer',
      url: eventRegistrationUrl,
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: '2025-01-01T00:00:00+07:00'
    },
    performer: {
      '@type': 'Organization',
      name: 'TingNect Team'
    }
  }
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
