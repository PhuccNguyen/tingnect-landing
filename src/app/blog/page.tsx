import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/common/Breadcrumb';
import styles from './blog.module.css';

export const metadata: Metadata = {
  title: 'TingNect Blog - Web3 Guides & Community Insights',
  description: 'Explore in-depth guides on Web3, TingNect Identity, blockchain technology, and the decentralized future. Learn how to build with TingNect and join the Web3 revolution in Vietnam.',
  keywords: 'TingNect blog, Web3 guide, blockchain tutorial, decentralized identity, crypto in Vietnam',
  icons: {
    icon: '/Image/Logo/TingnectNew/TingNect icon white.png',
    shortcut: '/Image/Logo/TingnectNew/TingNect icon white.png',
    apple: '/Image/Logo/TingnectNew/TingNect icon white.png',
  },
  openGraph: {
    title: 'TingNect Blog - Web3 Guides & Community Insights',
    description: 'Explore in-depth guides on Web3, TingNect Identity, blockchain technology, and the decentralized future.',
    url: 'https://tingnect.com/blog',
    type: 'website',
    images: [
      {
        url: 'https://tingnect.com/Image/Logo/TingnectNew/logo-tingnect-white.png',
        width: 1200,
        height: 630,
        alt: 'TingNect - Web3 Community Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TingNect Blog - Web3 Guides & Community Insights',
    description: 'Explore in-depth guides on Web3, TingNect Identity, blockchain technology.',
    images: ['https://tingnect.com/Image/Logo/TingnectNew/logo-tingnect-white.png'],
  },
};

const blogPosts = [
  {
    slug: 'what-is-tingnect',
    title: 'What is TingNect? - The Web3 Community Platform',
    excerpt: 'Discover what TingNect is building: a decentralized identity and community ecosystem for billions.',
    date: 'February 16, 2026',
    readTime: '5 min read',
    category: 'Fundamentals',
  },
  {
    slug: 'web3-vietnam-beginners-guide',
    title: 'Web3 in Vietnam - Beginner\'s Complete Guide',
    excerpt: 'Your introduction to Web3 technology, blockchain, and crypto in Vietnam. Perfect for beginners.',
    date: 'February 15, 2026',
    readTime: '12 min read',
    category: 'Education',
  },
  {
    slug: 'how-to-build-with-tingnect',
    title: 'How to Build with TingNect - Developer Guide',
    excerpt: 'Learn how to integrate TingNect into your Web3 applications and build on our ecosystem.',
    date: 'February 14, 2026',
    readTime: '15 min read',
    category: 'Development',
  },
  {
    slug: 'tingnect-identity-explained',
    title: 'TingNect Identity Explained - Your Web3 Passport',
    excerpt: 'Understanding TingNect Identity: decentralized, verifiable, and privacy-first identifier for the Web3 era.',
    date: 'February 13, 2026',
    readTime: '8 min read',
    category: 'Products',
  },
  {
    slug: 'tingnect-luxury-premium',
    title: 'TingNect Luxury - Premium Access & Exclusive Benefits',
    excerpt: 'Explore TingNect\'s premium tier with exclusive features, early access, and VIP community benefits.',
    date: 'February 12, 2026',
    readTime: '7 min read',
    category: 'Features',
  },
  {
    slug: 'tingnect-ecosystem-overview',
    title: 'TingNect Ecosystem - Building the Future Together',
    excerpt: 'Learn about TingNect\'s comprehensive ecosystem including Ting Identity, Ting Chain, and community partners.',
    date: 'February 11, 2026',
    readTime: '10 min read',
    category: 'Ecosystem',
  },
  {
    slug: 'tingnect-super-app',
    title: 'TingNect Super App - All-in-One Web3 Platform',
    excerpt: 'Discover how TingNect is building a super app experience for decentralized services and community tools.',
    date: 'February 10, 2026',
    readTime: '9 min read',
    category: 'Products',
  },
  {
    slug: 'tingnect-vs-trustlabs',
    title: 'TingNect & TrustLabs Partnership - Powering Web3 Trust',
    excerpt: 'Explore the strategic partnership between TingNect and TrustLabs in advancing decentralized trust infrastructure.',
    date: 'February 9, 2026',
    readTime: '6 min read',
    category: 'Partnerships',
  },
];

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'TingNect Blog',
  description: 'TingNect Blog - Web3 Guides & Community Insights',
  url: 'https://tingnect.com/blog',
  mainEntity: {
    '@type': 'Blog',
    name: 'TingNect Blog',
    description: 'In-depth guides on Web3, blockchain, and the TingNect ecosystem',
  },
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
        suppressHydrationWarning
      />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />

      <section className={styles.container}>
        <div className={styles.header}>
          <h1>TingNect Blog</h1>
          <p>Web3 Guides, Development Tutorials & Community Insights</p>
        </div>

        <div className={styles.grid}>
          {blogPosts.map((post) => (
            <article key={post.slug} className={styles.card}>
              <div className={styles.category}>{post.category}</div>
              <h2>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className={styles.excerpt}>{post.excerpt}</p>
              <div className={styles.meta}>
                <span className={styles.date}>{post.date}</span>
                <span className={styles.readTime}>{post.readTime}</span>
              </div>
              <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                Read More →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
