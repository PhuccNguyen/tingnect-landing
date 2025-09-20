import IDHero from '@/components/id/IDHero/IDHero';
import SearchSection from '@/components/id/SearchSection/SearchSection';
import RegisterForm from '@/components/id/RegisterForm/RegisterForm';
import DemoWallets from '@/components/id/DemoWallets/DemoWallets';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TingNect ID - Web3 Identity Explorer',
  description:
    'Discover and verify Web3 identities in the TingNect ecosystem. Explore blockchain profiles, NFTs, wallets, and connect with verified builders, founders, and investors.',
  keywords: [
    'Web3 Identity',
    'Blockchain Profile',
    'On-chain Identity',
    'Crypto Wallet Explorer',
    'NFT Portfolio',
    'DeFi',
    'Cryptocurrency',
    'TingNect ID',
    'Vietnam Web3 Ecosystem',
    'Verified Web3 Profiles',
  ],
  openGraph: {
    title: 'TingNect ID - Web3 Identity Explorer',
    description:
      'Explore verified Web3 identities, blockchain profiles, and on-chain contributions in the TingNect ecosystem.',
    url: 'https://tingnect.com/id',
    siteName: 'TingNect',
    images: [
      {
        url: 'https://tingnect.com/Image/Logo/TingNect/TingNect-Logo-OG.jpg',
        width: 1200,
        height: 630,
        alt: 'TingNect ID - Web3 Identity Explorer',
        type: 'image/jpeg',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TingNect ID - Web3 Identity Explorer',
    description:
      'Discover verified Web3 identities, blockchain profiles, and NFTs in the TingNect ecosystem.',
    images: ['https://tingnect.com/Image/Logo/TingNect/TingNect-Logo-OG.jpg'],
    creator: '@tingnect',
    site: '@tingnect',
  },
  alternates: {
    canonical: 'https://tingnect.com/id',
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
const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'TingNect ID - Web3 Identity Explorer',
    description:
      'TingNect ID is the Web3 Identity Explorer, enabling discovery of blockchain profiles, NFTs, wallets, and verified contributors in the TingNect ecosystem.',
    url: 'https://tingnect.com/id',
    mainEntity: {
      '@type': 'SoftwareApplication',
      name: 'TingNect ID',
      applicationCategory: 'BlockchainApplication',
      operatingSystem: 'Web',
      image: 'https://tingnect.com/Image/Logo/TingNect/TingNect-Logo.png',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free access to explore and verify Web3 identities',
      },
      featureList: [
        'On-chain identity verification',
        'Wallet explorer',
        'NFT & transaction history',
        'Developer & founder profiles',
        'Community-driven verification',
      ],
    },
  },
  // Breadcrumb
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tingnect.com' },
      { '@type': 'ListItem', position: 2, name: 'TingNect ID', item: 'https://tingnect.com/id' },
    ],
  },
];

export default function IDPage() {
  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <div className="min-h-screen bg-slate-900">
        <IDHero />
        <SearchSection />
        <RegisterForm />
        <DemoWallets />
      </div>
    </>
  );
}
