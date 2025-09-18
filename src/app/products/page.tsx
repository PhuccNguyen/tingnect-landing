import type { Metadata } from 'next';
import ProductsHero from '@/components/products/ProductsHero/ProductsHero';
import ProductsGrid from '@/components/products/ProductsGrid/ProductsGrid';
import TechStack from '@/components/products/TechStack/TechStack';

// ===== SEO METADATA =====
export const metadata: Metadata = {
  title: 'Products - TingNect',
  description:
    'Discover cutting-edge Web3 and AI products by TingNect: decentralized identity, high-performance chain, developer SDKs, and more.',
  keywords: [
    'TingNect products',
    'Web3 products',
    'AI products',
    'decentralized identity',
    'blockchain platform',
    'developer SDK',
    'Vietnam Web3',
  ].join(', '),
  alternates: { canonical: 'https://tingnect.com/products' },
  openGraph: {
    title: 'Products - TingNect',
    description:
      'Explore TingNect’s Web3 & AI product ecosystem: identity, chain, SDK, and tools for builders.',
    url: 'https://tingnect.com/products',
    siteName: 'TingNect',
    images: [
      {
        url: 'https://tingnect.com/Image/Logo/TingNect/TingNect-Logo.png',
        width: 1200,
        height: 630,
        alt: 'TingNect Products',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Products - TingNect',
    description:
      'Explore TingNect’s Web3 & AI product ecosystem: identity, chain, SDK, and tools for builders.',
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

const productsForSchema = [
  {
    name: 'Ting Identity',
    url: 'https://tingnect.com/products#ting-identity',
    description: 'Decentralized identity solution for secure Web3 authentication.',
    category: 'Web3 Identity',
    releaseStage: 'Coming Soon',
  },
  {
    name: 'Ting Chain',
    url: 'https://tingnect.com/products#ting-chain',
    description: 'High-performance blockchain for decentralized applications.',
    category: 'Blockchain',
    releaseStage: 'In Development',
  },
  {
    name: 'Ting AI',
    url: 'https://tingnect.com/products#ting-ai',
    description: 'AI-powered tools for smart contract development and security.',
    category: 'AI / DevTools',
    releaseStage: 'Research',
  },
  {
    name: 'Ting SDK',
    url: 'https://tingnect.com/products#ting-sdk',
    description: 'Developer toolkit for building on the Ting ecosystem.',
    category: 'Developer SDK',
    releaseStage: 'Planning',
  },
  {
    name: 'TingApp',
    url: 'https://tingnect.com/products#ting-app',
    description: 'Mobile app for seamless interaction with the Ting ecosystem.',
    category: 'Mobile',
    releaseStage: 'In Development',
  },
  {
    name: 'TingNect',
    url: 'https://tingnect.com/products#tingnect-community',
    description: 'Community platform for events, networking, and partnerships.',
    category: 'Community',
    releaseStage: 'Live',
  },
];

export default function ProductsPage() {
  // JSON-LD: CollectionPage + ItemList (+ Product nodes)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'TingNect Products',
    url: 'https://tingnect.com/products',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tingnect.com/' },
        { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://tingnect.com/products' },
      ],
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: productsForSchema.map((p, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: p.url,
        item: {
          '@type': 'Product',
          name: p.name,
          description: p.description,
          category: p.category,
          url: p.url,
          brand: { '@type': 'Brand', name: 'TingNect' },
          additionalProperty: [
            { '@type': 'PropertyValue', name: 'Release Stage', value: p.releaseStage },
          ],
        },
      })),
    },
    publisher: {
      '@type': 'Organization',
      name: 'TingNect',
      url: 'https://tingnect.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tingnect.com/Image/Logo/TingNect/TingNect-Logo.png',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <ProductsHero />
      <ProductsGrid />
      <TechStack />
    </>
  );
}
