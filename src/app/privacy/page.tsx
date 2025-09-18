// src/app/privacy/page.tsx
import type { Metadata } from 'next';
import PrivacyPolicyContent from './PrivacyPolicyContent'; // Import the Client Component

// ===== SEO METADATA =====
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
  ].join(', '),
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
        url: 'https://tingnect.com/Image/Logo/TingNect/TingNect-Logo.png',
        width: 1200,
        height: 630,
        alt: 'TingNect - Privacy',
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
    images: ['https://tingnect.com/Image/Logo/TingNect/TingNect-Logo.png'],
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

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}