// src/app/privacy/page.tsx
import type { Metadata } from 'next';
import PrivacyPolicyContent from './PrivacyPolicyContent';

export const metadata: Metadata = {
  title: 'Privacy Policy - TingNect | Data Protection & Security',
  description:
    'TingNect Privacy Policy: Learn how we protect your data, ensure security, and maintain transparency in our Web3 platform. GDPR-compliant practices.',
  keywords: [
    'TingNect privacy policy',
    'data protection',
    'GDPR',
    'Web3 privacy',
    'blockchain security',
    'user rights',
    'data security',
  ],
  alternates: {
    canonical: 'https://tingnect.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy - TingNect | Data Protection & Security',
    description:
      'How TingNect protects your data and privacy across our Web3 platform.',
    url: 'https://tingnect.com/privacy',
    siteName: 'TingNect',
    images: [
      {
        url: 'https://tingnect.com/Image/Logo/TingNect/TingNect-Logo-OG.jpg',
        width: 1200,
        height: 630,
        alt: 'TingNect - Privacy Policy',
        type: 'image/jpeg',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - TingNect | Data Protection & Security',
    description:
      'How TingNect protects your data and privacy across our Web3 platform.',
    images: ['https://tingnect.com/Image/Logo/TingNect/TingNect-Logo-OG.jpg'],
    site: '@tingnect',
    creator: '@tingnect',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

// JSON-LD structured data
const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy - TingNect',
    url: 'https://tingnect.com/privacy',
    description:
      'TingNect Privacy Policy: How we protect user data, ensure transparency, and comply with GDPR standards.',
    isPartOf: { '@type': 'WebSite', name: 'TingNect', url: 'https://tingnect.com' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tingnect.com' },
      { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: 'https://tingnect.com/privacy' },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <PrivacyPolicyContent />
    </>
  );
}
