import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/common/Breadcrumb';
import styles from '../blog-post.module.css';

export const metadata: Metadata = {
  title: 'TingNect & TrustLabs Partnership - Powering Web3 Trust | TingNect',
  description: 'Explore the strategic partnership between TingNect and TrustLabs in advancing decentralized trust infrastructure.',
  keywords: 'TingNect TrustLabs, partnership, Web3 trust, blockchain security, collaboration',
  openGraph: {
    title: 'TingNect & TrustLabs Partnership - Powering Web3 Trust',
    description: 'Explore the strategic partnership between TingNect and TrustLabs.',
    url: 'https://tingnect.com/blog/tingnect-trustlabs',
    type: 'article',
    publishedTime: '2026-02-09',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'TingNect & TrustLabs Partnership - Powering Web3 Trust',
  description: 'Explore the strategic partnership between TingNect and TrustLabs in advancing decentralized trust infrastructure.',
  datePublished: '2026-02-09',
  author: {
    '@type': 'Organization',
    name: 'TingNect',
    logo: 'https://tingnect.com/Image/Logo/TingnectNew/logo-tingnect-white.png',
  },
};

export default function TingNectTrustLabsPost() {
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
          { label: 'TingNect & TrustLabs Partnership' },
        ]}
      />

      <article className={styles.container}>
        <div className={styles.header}>
          <div className={styles.category}>Partnerships</div>
          <h1>TingNect & TrustLabs Partnership - Powering Web3 Trust</h1>
          <p className={styles.excerpt}>
            Explore the strategic partnership between TingNect and TrustLabs in advancing decentralized trust infrastructure.
          </p>
          <div className={styles.meta}>
            <span>February 9, 2026</span>
            <span>6 min read</span>
          </div>
        </div>

        <div className={styles.content}>
          <h2>An Exciting Partnership</h2>
          <p>
            We're thrilled to announce our strategic partnership with TrustLabs, a leading provider of trust and security solutions for the blockchain ecosystem. Together, we're advancing decentralized identity verification and trust infrastructure.
          </p>

          <h2>What is TrustLabs?</h2>
          <p>
            TrustLabs is an innovative company specializing in decentralized verification, reputation systems, and blockchain security. Their expertise in trust infrastructure makes them the perfect partner for TingNect's mission to make Web3 accessible and secure.
          </p>

          <h2>Partnership Goals</h2>
          <h3>Enhanced Identity Verification</h3>
          <p>
            Combining TingNect Identity with TrustLabs' verification technology creates a more secure and trustworthy identity system. Users can verify their credentials with confidence.
          </p>

          <h3>Reputation Systems</h3>
          <p>
            Build transparent reputation systems that reflect a user's trustworthiness in the Web3 ecosystem. Your track record becomes verifiable and portable.
          </p>

          <h3>Security Standards</h3>
          <p>
            Together, we're establishing best practices and security standards for decentralized identity and verification in Web3.
          </p>

          <h3>Market Expansion</h3>
          <p>
            TrustLabs' global network combined with TingNect's Southeast Asia focus creates unique market opportunities.
          </p>

          <h2>Key Features of the Partnership</h2>
          <ul>
            <li>🔐 <strong>Advanced Verification:</strong> Multi-level identity verification using TrustLabs' proprietary algorithms</li>
            <li>⭐ <strong>Reputation Scores:</strong> Transparent reputation metrics that travel with you across Web3</li>
            <li>🛡️ <strong>Security Audits:</strong> Regular audits and security assessments by TrustLabs</li>
            <li>🌐 <strong>Global Integration:</strong> Interoperability with global identity systems</li>
            <li>📊 <strong>Analytics:</strong> Advanced analytics on trust and identity metrics</li>
          </ul>

          <h2>Benefits for TingNect Users</h2>
          <ul>
            <li>More secure identity verification process</li>
            <li>Portable reputation that travels across platforms</li>
            <li>Access to TrustLabs' global network of verified users</li>
            <li>Higher-level KYC/AML compliance options</li>
            <li>Reduced fraud and security risks</li>
          </ul>

          <h2>Technology Integration</h2>
          <p>
            The partnership leverages:
          </p>
          <ul>
            <li>TingNect's blockchain infrastructure (Ting Chain)</li>
            <li>TrustLabs' verification algorithms</li>
            <li>Combined cryptographic security protocols</li>
            <li>Open standards for interoperability</li>
          </ul>

          <h2>Timeline & Rollout</h2>
          <p>
            Phase 1 (Q1 2026): Enhanced identity verification for TingNect users
          </p>
          <p>
            Phase 2 (Q2 2026): Reputation system beta launch
          </p>
          <p>
            Phase 3 (Q3 2026): Full ecosystem integration
          </p>

          <h2>Industry Impact</h2>
          <p>
            This partnership demonstrates that Web3 can have the security and trust standards of traditional finance—without sacrificing decentralization or privacy.
          </p>
          <p>
            By combining identity, verification, and reputation, we&apos;re creating a comprehensive trust infrastructure for the emerging Web3 economy.
          </p>

          <h2>Join the Revolution</h2>
          <p>
            Whether you&apos;re a user, developer, or business, this partnership opens new possibilities. <Link href="/id">Create your TingNect Identity</Link> and experience the future of trust in Web3. For developers and businesses, <Link href="/contact">contact our partnerships team</Link>.
          </p>
        </div>

        <div className={styles.relatedPosts}>
          <h3>Related Articles</h3>
          <div className={styles.relatedGrid}>
            <Link href="/blog/tingnect-identity-explained" className={styles.relatedCard}>
              <h4>Ting Identity</h4>
              <p>Our identity solution</p>
            </Link>
            <Link href="/blog/tingnect-ecosystem-overview" className={styles.relatedCard}>
              <h4>Ecosystem</h4>
              <p>Our partnerships</p>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
