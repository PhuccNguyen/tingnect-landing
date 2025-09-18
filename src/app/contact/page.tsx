import ContactHero from '@/components/contact/ContactHero/ContactHero';
import ContactForm from '@/components/forms/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact TingNect - Connect with Web3 Innovation Leaders',
  description: 'Get in touch with TingNect team for partnerships, development, investments, and community collaboration. Join the premier Web3 ecosystem in Vietnam.',
  keywords: [
    'TingNect contact',
    'Web3 partnership',
    'blockchain development',
    'cryptocurrency investment',
    'developer community Vietnam',
    'tech innovation support',
    'decentralized applications',
    'startup collaboration',
    'blockchain consulting',
    'Web3 ecosystem Vietnam'
  ].join(', '),
  openGraph: {
    title: 'Contact TingNect - Connect with Web3 Innovation Leaders',
    description: 'Get in touch with TingNect team for partnerships, development, investments, and community collaboration. Join the premier Web3 ecosystem in Vietnam.',
    url: 'https://tingnect.com/contact',
    siteName: 'TingNect',
    images: [
      {
        url: '/Image/Logo/TingNect/TingNect-Logo.png',
        width: 1200,
        height: 630,
        alt: 'TingNect Contact - Web3 Innovation Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact TingNect - Connect with Web3 Innovation Leaders',
    description: 'Get in touch with TingNect team for partnerships, development, investments, and community collaboration.',
    images: ['/Image/Logo/TingNect/TingNect-Logo.png'],
    creator: '@tingnect',
    site: '@tingnect',
  },
  alternates: {
    canonical: 'https://tingnect.com/contact',
  },
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
};

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'TingNect Contact',
  description: 'Contact page for TingNect - Premier Web3 platform for developers, entrepreneurs, and innovators',
  url: 'https://tingnect.com/contact',
  mainEntity: {
    '@type': 'Organization',
    name: 'TingNect',
    url: 'https://tingnect.com',
    logo: 'https://tingnect.com//Image/Logo/TingNect/TingNect-Logo.png',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+84',
        contactType: 'customer service',
        email: 'contact@tingnect.com',
        availableLanguage: ['English', 'Vietnamese'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
          timeZone: 'Asia/Ho_Chi_Minh'
        }
      },
      {
        '@type': 'ContactPoint',
        contactType: 'technical support',
        email: 'support@tingnect.com',
        availableLanguage: ['English', 'Vietnamese']
      },
      {
        '@type': 'ContactPoint',
        'contactType': 'business partnerships',
        email: 'partnerships@tingnect.com',
        availableLanguage: ['English', 'Vietnamese']
      }
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ho Chi Minh City',
      addressCountry: 'VN'
    },
    sameAs: [
      'https://twitter.com/tingnect',
      'https://t.me/tingnect_official',
      'https://github.com/tingnect'
    ]
  }
};

export default function ContactPage() {
  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <ContactHero />
        <section className="py-16">
          <ContactForm />
        </section>
      </div>
    </>
  );
}
