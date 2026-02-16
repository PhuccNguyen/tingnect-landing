import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/common/Breadcrumb';
import styles from '../blog-post.module.css';

export const metadata: Metadata = {
  title: 'TingNect Ecosystem Overview - Build with Us | TingNect',
  description: 'Learn about TingNect\'s comprehensive ecosystem including Ting Identity, Ting Chain, and community partners. Discover how our products work together.',
  keywords: 'TingNect ecosystem, Ting Chain, Ting Identity, Web3 platform, blockchain infrastructure',
  openGraph: {
    title: 'TingNect Ecosystem Overview - Build with Us',
    description: 'Learn about TingNect\'s comprehensive ecosystem and how to build on our platform.',
    url: 'https://tingnect.com/blog/tingnect-ecosystem-overview',
    type: 'article',
    publishedTime: '2026-02-11',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'TingNect Ecosystem Overview - Build with Us',
  description: 'Learn about TingNect\'s comprehensive ecosystem including Ting Identity, Ting Chain, and community partners.',
  datePublished: '2026-02-11',
  author: {
    '@type': 'Organization',
    name: 'TingNect',
    logo: 'https://tingnect.com/Image/Logo/TingnectNew/logo-tingnect-white.png',
  },
};

export default function TingNectEcosystemPost() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        suppressHydrationWarning
      />
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: 'TingNect Ecosystem Overview' },
        ]}
      />

      <article className={styles.container}>
        <div className={styles.header}>
          <div className={styles.category}>Ecosystem</div>
          <h1>TingNect Ecosystem - Building the Future Together</h1>
          <p className={styles.excerpt}>
            Learn about TingNect&apos;s comprehensive ecosystem including Ting Identity, Ting Chain, and community partners.
          </p>
          <div className={styles.meta}>
            <span>February 11, 2026</span>
            <span>10 min read</span>
          </div>
        </div>

        <div className={styles.content}>
          <h2>The TingNect Ecosystem</h2>
          <p>
            The TingNect ecosystem is a comprehensive suite of interconnected products and services designed to power the Web3 revolution. Each component works together to create a seamless, user-friendly experience.
          </p>

          <h2>Core Components</h2>
          <h3>1. Ting Identity</h3>
          <p>
            The foundation of TingNect. Ting Identity is a decentralized, blockchain-based identity system that gives users control over their personal data. It&apos;s the passport for the entire Web3 ecosystem.
          </p>

          <h3>2. Ting Chain</h3>
          <p>
            Our high-performance blockchain infrastructure optimized for the Southeast Asian market. Ting Chain provides fast, low-cost transactions with strong security and environmental sustainability.
          </p>

          <h3>3. TingNect Community Platform</h3>
          <p>
            A vibrant hub for developers, businesses, and users to collaborate. The community platform enables governance, resource sharing, and collective decision-making.
          </p>

          <h3>4. Developer Tools & APIs</h3>
          <p>
            Comprehensive SDKs and APIs for building on TingNect. We provide documentation, code examples, and support for Node.js, Python, JavaScript, and more.
          </p>

          <h3>5. Financial Services</h3>
          <p>
            DeFi tools including staking, lending, trading, and payment solutions built on TingNect infrastructure. Bring financial inclusion to billions.
          </p>

          <h2>How The Ecosystem Works</h2>
          <p>
            All TingNect products are designed to work together seamlessly:
          </p>
          <ol>
            <li>Users create a Ting Identity for authentication</li>
            <li>Transactions occur on Ting Chain for speed and affordability</li>
            <li>Community members govern and maintain the ecosystem</li>
            <li>Developers build applications using our APIs</li>
            <li>Financial services connect everything together</li>
          </ol>

          <h2>Why an Integrated Ecosystem?</h2>
          <p>
            Instead of fragmented tools, we believe in building an integrated system where:
          </p>
          <ul>
            <li><strong>Identity is portable:</strong> Use your Ting Identity everywhere in Web3</li>
            <li><strong>Transactions are fast:</strong> Ting Chain processes thousands per second</li>
            <li><strong>Costs are minimal:</strong> Fees are fraction of Ethereum or Bitcoin</li>
            <li><strong>Community is sovereign:</strong> Users have a say in governance</li>
            <li><strong>Developers are empowered:</strong> Easy-to-use tools and APIs</li>
          </ul>

          <h2>Partnerships</h2>
          <p>
            TingNect partners with leading organizations including TrustLabs to expand capabilities and reach. Our partnerships span technology, finance, and community sectors.
          </p>

          <h2>Get Involved</h2>
          <p>
            Whether you&apos;re a developer, investor, or user, there&apos;s a place for you in the TingNect ecosystem:
          </p>
          <ul>
            <li><strong>Developers:</strong> <Link href="/blog/how-to-build-with-tingnect">Learn how to build with TingNect</Link></li>
            <li><strong>Users:</strong> <Link href="/id">Create your Ting Identity</Link></li>
            <li><strong>Partners:</strong> <Link href="/contact">Get in touch with our team</Link></li>
            <li><strong>Investors:</strong> <Link href="/contact">Inquire about opportunities</Link></li>
          </ul>

          <h2>The Future</h2>
          <p>
            We&apos;re continually expanding the ecosystem with new products, partnerships, and features. Stay tuned for announcements about our Super App and advanced features in the coming months.
          </p>
        </div>

        <div className={styles.relatedPosts}>
          <h3>Related Articles</h3>
          <div className={styles.relatedGrid}>
            <Link href="/blog/tingnect-identity-explained" className={styles.relatedCard}>
              <h4>Ting Identity</h4>
              <p>Your Web3 passport</p>
            </Link>
            <Link href="/blog/tingnect-super-app" className={styles.relatedCard}>
              <h4>Super App</h4>
              <p>All-in-one platform</p>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
