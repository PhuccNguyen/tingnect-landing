import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/common/Breadcrumb';
import styles from '../blog-post.module.css';

export const metadata: Metadata = {
  title: 'TingNect Identity Explained - Your Web3 Passport | TingNect',
  description: 'Understand TingNect Identity: a decentralized, privacy-first digital identifier for the Web3 era. Learn how it works and why it matters.',
  keywords: 'TingNect Identity, decentralized identity, Web3 passport, digital identity, blockchain',
  openGraph: {
    title: 'TingNect Identity Explained - Your Web3 Passport',
    description: 'Understand TingNect Identity: a decentralized, privacy-first digital identifier for Web3.',
    url: 'https://tingnect.com/blog/tingnect-identity-explained',
    type: 'article',
    publishedTime: '2026-02-13',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'TingNect Identity Explained - Your Web3 Passport',
  description: 'Understand TingNect Identity: a decentralized, privacy-first digital identifier for the Web3 era.',
  datePublished: '2026-02-13',
  author: {
    '@type': 'Organization',
    name: 'TingNect',
    logo: 'https://tingnect.com/Image/Logo/TingnectNew/logo-tingnect-white.png',
  },
};

export default function TingNectIdentityExplainedPost() {
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
          { label: 'TingNect Identity Explained' },
        ]}
      />

      <article className={styles.container}>
        <div className={styles.header}>
          <div className={styles.category}>Products</div>
          <h1>TingNect Identity Explained - Your Web3 Passport</h1>
          <p className={styles.excerpt}>
            Understanding TingNect Identity: decentralized, verifiable, and privacy-first identifier for the Web3 era.
          </p>
          <div className={styles.meta}>
            <span>February 13, 2026</span>
            <span>8 min read</span>
          </div>
        </div>

        <div className={styles.content}>
          <h2>What is TingNect Identity?</h2>
          <p>
            TingNect Identity is a blockchain-based digital identity system that puts users in complete control of their personal data. Unlike traditional identity systems where governments or corporations store your information, TingNect Identity is decentralized—you own your identity.
          </p>

          <h2>How It Works</h2>
          <p>
            TingNect Identity uses a combination of blockchain technology and cryptography to create a secure, verifiable identity that can be used across the entire Web3 ecosystem.
          </p>
          <ol>
            <li><strong>Creation:</strong> You create your identity by providing basic information</li>
            <li><strong>Verification:</strong> Your identity is verified through our secure process</li>
            <li><strong>Storage:</strong> Your identity data is stored encrypted on blockchain</li>
            <li><strong>Use:</strong> You can present your credentials anywhere in Web3 without revealing unnecessary information</li>
          </ol>

          <h2>Key Features</h2>
          <h3>Privacy First</h3>
          <p>
            TingNect Identity doesn&apos;t require you to share all your data to prove who you are. You can selectively reveal only what&apos;s necessary.
          </p>

          <h3>Decentralized</h3>
          <p>
            No single company controls your identity. You maintain 100% ownership and control.
          </p>

          <h3>Interoperable</h3>
          <p>
            Your TingNect Identity works across all platforms and applications in the Web3 ecosystem.
          </p>

          <h3>Verifiable</h3>
          <p>
            Credentials are cryptographically signed and can be instantly verified by anyone.
          </p>

          <h2>Use Cases</h2>
          <ul>
            <li><strong>Banking:</strong> Open a crypto account with identity verification</li>
            <li><strong>Governance:</strong> Vote in DAOs and decentralized organizations</li>
            <li><strong>Loans:</strong> Access DeFi lending without traditional credit checks</li>
            <li><strong>Trading:</strong> Verify identity for compliant exchanges</li>
            <li><strong>Employment:</strong> Create portable professional credentials</li>
            <li><strong>Social:</strong> Build reputation systems in Web3 communities</li>
          </ul>

          <h2>Why TingNect Identity Matters</h2>
          <p>
            In the current internet, your identity is fragmented across dozens of platforms. Each platform is a vulnerability. With TingNect Identity, you have one secure, portable identity you control.
          </p>
          <p>
            For emerging markets like Vietnam, TingNect Identity can:
          </p>
          <ul>
            <li>Provide banking services to the unbanked</li>
            <li>Enable secure cross-border payments</li>
            <li>Eliminate identity fraud</li>
            <li>Create new economic opportunities</li>
          </ul>

          <h2>Security</h2>
          <p>
            TingNect Identity uses industry-standard cryptography and has been security audited. Your data is encrypted both in transit and at rest.
          </p>

          <h2>Getting Started with TingNect Identity</h2>
          <p>
            Ready to create your Web3 passport? <Link href="/id">Register now</Link> to get started with TingNect Identity and join the future of decentralized authentication.
          </p>
        </div>

        <div className={styles.relatedPosts}>
          <h3>Related Articles</h3>
          <div className={styles.relatedGrid}>
            <Link href="/blog/what-is-tingnect" className={styles.relatedCard}>
              <h4>What is TingNect?</h4>
              <p>Platform overview</p>
            </Link>
            <Link href="/blog/how-to-build-with-tingnect" className={styles.relatedCard}>
              <h4>How to Build</h4>
              <p>Developer guide</p>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
