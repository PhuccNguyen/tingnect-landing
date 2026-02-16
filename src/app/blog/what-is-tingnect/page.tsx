import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/common/Breadcrumb';
import styles from '../blog-post.module.css';

export const metadata: Metadata = {
  title: 'What is TingNect? - The Web3 Community Platform | TingNect',
  description: 'Discover what TingNect is - a decentralized identity and Web3 community platform building for billions. Learn about our mission and vision.',
  keywords: 'TingNect, Web3 platform, decentralized identity, blockchain, community',
  openGraph: {
    title: 'What is TingNect? - The Web3 Community Platform',
    description: 'Discover what TingNect is - a decentralized identity and Web3 community platform building for billions.',
    url: 'https://tingnect.com/blog/what-is-tingnect',
    type: 'article',
    publishedTime: '2026-02-16',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'What is TingNect? - The Web3 Community Platform',
  description: 'Discover what TingNect is - a decentralized identity and Web3 community platform building for billions.',
  datePublished: '2026-02-16',
  author: {
    '@type': 'Organization',
    name: 'TingNect',
    logo: 'https://tingnect.com/Image/Logo/TingnectNew/logo-tingnect-white.png',
  },
};

export default function WhatIsTingNectPost() {
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
          { label: 'What is TingNect?' },
        ]}
      />

      <article className={styles.container}>
        <div className={styles.header}>
          <div className={styles.category}>Fundamentals</div>
          <h1>What is TingNect? - The Web3 Community Platform</h1>
          <p className={styles.excerpt}>
            Discover what TingNect is building: a decentralized identity and community ecosystem for billions.
          </p>
          <div className={styles.meta}>
            <span>February 16, 2026</span>
            <span>5 min read</span>
          </div>
        </div>

        <div className={styles.content}>
          <h2>Introduction</h2>
          <p>
            TingNect is a Web3 community platform dedicated to building decentralized identity and ecosystem services. Our mission is to make Web3 accessible to billions of people, starting in Vietnam and expanding globally.
          </p>

          <h2>What We&apos;re Building</h2>
          <p>
            At TingNect, we&apos;re creating the foundational infrastructure for a decentralized internet. Our platform consists of:
          </p>
          <ul>
            <li><strong>TingNect Identity:</strong> A privacy-first, blockchain-based identifier that puts users in control of their identity data.</li>
            <li><strong>TingNect Ecosystem:</strong> An integrated suite of tools and services built on decentralized principles.</li>
            <li><strong>Community Platform:</strong> A vibrant community of developers, businesses, and users collaborating on Web3 solutions.</li>
            <li><strong>Developer Tools:</strong> APIs and resources for building decentralized applications.</li>
          </ul>

          <h2>Our Vision</h2>
          <p>
            We believe the internet should be decentralized, user-controlled, and accessible to everyone. TingNect is working towards a future where:
          </p>
          <ul>
            <li>Users own their digital identity, not corporations</li>
            <li>Privacy is protected by design, not policy</li>
            <li>Communities are self-governed and transparent</li>
            <li>Technology serves humanity, not the other way around</li>
          </ul>

          <h2>Why TingNect Matters</h2>
          <p>
            In today&apos;s digital world, your identity data is scattered across dozens of platforms, each with their own vulnerabilities. TingNect consolidates this through a single, secure, decentralized identity that you control completely.
          </p>

          <h2>Get Started</h2>
          <p>
            Ready to join the TingNect community? <Link href="/id">Register on our platform</Link> or <Link href="/contact">contact us</Link> to learn more about how you can participate in building the future of Web3.
          </p>
        </div>

        <div className={styles.relatedPosts}>
          <h3>Related Articles</h3>
          <div className={styles.relatedGrid}>
            <Link href="/blog/tingnect-identity-explained" className={styles.relatedCard}>
              <h4>TingNect Identity Explained</h4>
              <p>Your Web3 passport explained</p>
            </Link>
            <Link href="/blog/web3-vietnam-beginners-guide" className={styles.relatedCard}>
              <h4>Web3 in Vietnam</h4>
              <p>Beginner&apos;s guide to Web3</p>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
