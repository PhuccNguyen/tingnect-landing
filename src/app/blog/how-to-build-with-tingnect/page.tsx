import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/common/Breadcrumb';
import styles from '../blog-post.module.css';

export const metadata: Metadata = {
  title: 'How to Build with TingNect - Developer Guide | TingNect',
  description: 'Learn how to integrate TingNect into your Web3 applications. Complete developer guide with APIs, code examples, and integration instructions.',
  keywords: 'TingNect API, developer guide, how to build, Web3 development, blockchain integration',
  openGraph: {
    title: 'How to Build with TingNect - Developer Guide',
    description: 'Learn how to integrate TingNect into your Web3 applications. Complete developer guide with APIs and code examples.',
    url: 'https://tingnect.com/blog/how-to-build-with-tingnect',
    type: 'article',
    publishedTime: '2026-02-14',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'How to Build with TingNect - Developer Guide',
  description: 'Learn how to integrate TingNect into your Web3 applications.',
  datePublished: '2026-02-14',
  author: {
    '@type': 'Organization',
    name: 'TingNect',
    logo: 'https://tingnect.com/Image/Logo/TingnectNew/logo-tingnect-white.png',
  },
};

export default function HowToBuildWithTingNectPost() {
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
          { label: 'How to Build with TingNect' },
        ]}
      />

      <article className={styles.container}>
        <div className={styles.header}>
          <div className={styles.category}>Development</div>
          <h1>How to Build with TingNect - Developer Guide</h1>
          <p className={styles.excerpt}>
            Learn how to integrate TingNect into your Web3 applications and build on our ecosystem.
          </p>
          <div className={styles.meta}>
            <span>February 14, 2026</span>
            <span>15 min read</span>
          </div>
        </div>

        <div className={styles.content}>
          <h2>Getting Started</h2>
          <p>
            Building with TingNect is straightforward. We provide comprehensive APIs and SDKs to integrate decentralized identity and Web3 services into your applications.
          </p>

          <h2>Prerequisites</h2>
          <ul>
            <li>Node.js 16+ or Python 3.8+</li>
            <li>Basic understanding of blockchain concepts</li>
            <li>Familiarity with REST APIs</li>
            <li>A TingNect developer account (free)</li>
          </ul>

          <h2>Installation</h2>
          <p>
            Install the TingNect SDK for your platform:
          </p>
          <pre><code>npm install @tingnect/sdk
# or
pip install tingnect-sdk</code></pre>

          <h2>Core Features You Can Build</h2>
          <h3>1. Decentralized Identity Integration</h3>
          <p>
            Allow users to create and verify their TingNect Identity within your app. This enables secure, privacy-first authentication.
          </p>

          <h3>2. Blockchain Transactions</h3>
          <p>
            Facilitate Web3 transactions, smart contract interactions, and token transfers through TingNect&apos;s ecosystem.
          </p>

          <h3>3. User Verification</h3>
          <p>
            Verify user credentials and KYC requirements in a decentralized manner without storing sensitive data.
          </p>

          <h3>4. Community Tools</h3>
          <p>
            Build community features, governance systems, and DAO tools on top of the TingNect platform.
          </p>

          <h2>Basic Integration Example</h2>
          <p>
            Here&apos;s a simple example of integrating TingNect Identity into your React application:
          </p>
          <pre><code>{`import TingNect from '@tingnect/sdk';

const tingnect = new TingNect(YOUR_API_KEY);

// Create a new identity
const identity = await tingnect.identity.create({
  email: 'user@example.com',
  name: 'User Name',
});

// Verify identity
const verified = await tingnect.identity.verify(identity.id);`}</code></pre>

          <h2>Best Practices</h2>
          <ul>
            <li><strong>Never expose API keys:</strong> Use environment variables</li>
            <li><strong>Implement error handling:</strong> API calls can fail</li>
            <li><strong>Use webhooks:</strong> For real-time updates on transactions</li>
            <li><strong>Test on testnet first:</strong> Before deploying to mainnet</li>
            <li><strong>Monitor rate limits:</strong> TingNect API has rate limits</li>
          </ul>

          <h2>Documentation & Support</h2>
          <p>
            For complete API documentation, code examples, and tutorials, visit our developer portal at docs.tingnect.com. Join our <Link href="/contact">community</Link> for support and collaboration.
          </p>

          <h2>What&apos;s Next?</h2>
          <p>
            Start building today! Create your first Web3 application with TingNect and become part of the emerging ecosystem. Need help? <Link href="/contact">Contact our developer relations team</Link>.
          </p>
        </div>

        <div className={styles.relatedPosts}>
          <h3>Related Articles</h3>
          <div className={styles.relatedGrid}>
            <Link href="/blog/tingnect-identity-explained" className={styles.relatedCard}>
              <h4>TingNect Identity</h4>
              <p>Technical overview</p>
            </Link>
            <Link href="/blog/what-is-tingnect" className={styles.relatedCard}>
              <h4>What is TingNect?</h4>
              <p>Platform overview</p>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
