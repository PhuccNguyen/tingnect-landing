import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/common/Breadcrumb';
import styles from '../blog-post.module.css';

export const metadata: Metadata = {
  title: 'TingNect Super App - All-in-One Web3 Platform | TingNect',
  description: 'Discover how TingNect is building a super app experience for decentralized services and community tools.',
  keywords: 'TingNect super app, all-in-one platform, Web3 services, DeFi, community tools',
  openGraph: {
    title: 'TingNect Super App - All-in-One Web3 Platform',
    description: 'Discover how TingNect is building a super app experience combining identity, finance, and community.',
    url: 'https://tingnect.com/blog/tingnect-super-app',
    type: 'article',
    publishedTime: '2026-02-10',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'TingNect Super App - All-in-One Web3 Platform',
  description: 'Discover how TingNect is building a super app experience for decentralized services.',
  datePublished: '2026-02-10',
  author: {
    '@type': 'Organization',
    name: 'TingNect',
    logo: 'https://tingnect.com/Image/Logo/TingnectNew/logo-tingnect-white.png',
  },
};

export default function TingNectSuperAppPost() {
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
          { label: 'TingNect Super App' },
        ]}
      />

      <article className={styles.container}>
        <div className={styles.header}>
          <div className={styles.category}>Products</div>
          <h1>TingNect Super App - All-in-One Web3 Platform</h1>
          <p className={styles.excerpt}>
            Discover how TingNect is building a super app experience for decentralized services and community tools.
          </p>
          <div className={styles.meta}>
            <span>February 10, 2026</span>
            <span>9 min read</span>
          </div>
        </div>

        <div className={styles.content}>
          <h2>What is a Super App?</h2>
          <p>
            A super app is a comprehensive platform that combines multiple services and features into a single, seamless experience. Instead of switching between 10 different apps, you have one app that does it all.
          </p>
          <p>
            Think WeChat in China or Grab in Southeast Asia—but for Web3.
          </p>

          <h2>The TingNect Super App Vision</h2>
          <p>
            TingNect is building a Web3 super app that integrates:
          </p>
          <ul>
            <li><strong>Identity:</strong> Your Ting Identity is the foundation</li>
            <li><strong>Wallet:</strong> Send, receive, and manage digital assets</li>
            <li><strong>Finance:</strong> DeFi services including lending, staking, trading</li>
            <li><strong>Payments:</strong> Fast, low-cost peer-to-peer and merchant payments</li>
            <li><strong>Community:</strong> Governance, forums, and collaboration tools</li>
            <li><strong>Services:</strong> Marketplace for Web3 services and products</li>
            <li><strong>Education:</strong> Learning resources and certification programs</li>
          </ul>

          <h2>Why a Super App?</h2>
          <h3>User Experience</h3>
          <p>
            Users don&apos;t want 15 apps. They want one app that works. The TingNect Super App provides everything you need for Web3 in one place.
          </p>

          <h3>Lower Friction</h3>
          <p>
            Reduce friction between different services. Move seamlessly from identity verification to making payments to participating in governance.
          </p>

          <h3>Emerging Market Focus</h3>
          <p>
            In countries like Vietnam, most people use smartphones. A super app optimized for mobile is perfect for emerging markets.
          </p>

          <h3>Network Effects</h3>
          <p>
            The more services integrated, the more valuable the platform becomes. This creates powerful network effects.
          </p>

          <h2>Current Features</h2>
          <h3>Identity & Authentication</h3>
          <p>
            Create and manage your Ting Identity with biometric and multi-factor authentication.
          </p>

          <h3>Digital Wallet</h3>
          <p>
            Securely store and manage digital assets with built-in backup and recovery.
          </p>

          <h3>Community & Social</h3>
          <p>
            Connect with other Web3 enthusiasts, share knowledge, and participate in governance.
          </p>

          <h2>Upcoming Features</h2>
          <p>
            We&apos;re actively developing:
          </p>
          <ul>
            <li>Advanced DeFi features (auto-farming, yield optimization)</li>
            <li>Merchant payment integration</li>
            <li>NFT marketplace</li>
            <li>DAO governance tools</li>
            <li>Advanced analytics dashboard</li>
            <li>Insurance and security products</li>
          </ul>

          <h2>Technical Architecture</h2>
          <p>
            The TingNect Super App is built on:
          </p>
          <ul>
            <li>Ting Chain for fast, low-cost transactions</li>
            <li>Ting Identity for secure authentication</li>
            <li>APIs connecting to leading platforms and services</li>
            <li>Mobile-first design for Southeast Asia</li>
            <li>Open source components where possible</li>
          </ul>

          <h2>Get Started</h2>
          <p>
            Download the TingNect Super App today and experience Web3 like never before. <Link href="/id">Create your Ting Identity</Link> to get started.
          </p>
        </div>

        <div className={styles.relatedPosts}>
          <h3>Related Articles</h3>
          <div className={styles.relatedGrid}>
            <Link href="/blog/tingnect-ecosystem-overview" className={styles.relatedCard}>
              <h4>Ecosystem Overview</h4>
              <p>All our products</p>
            </Link>
            <Link href="/blog/tingnect-identity-explained" className={styles.relatedCard}>
              <h4>Ting Identity</h4>
              <p>Your Web3 passport</p>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
