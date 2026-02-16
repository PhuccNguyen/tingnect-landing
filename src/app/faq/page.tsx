import { Metadata } from 'next';
import Breadcrumb from '@/components/common/Breadcrumb';
import styles from './faq.module.css';

export const metadata: Metadata = {
  title: 'FAQ - TingNect Web3 Community Platform',
  description: 'Frequently Asked Questions about TingNect, Web3, decentralized identity, blockchain, and how to get started with our platform.',
  keywords: 'TingNect FAQ, Web3 questions, blockchain help, decentralized identity, TingNect support',
  icons: {
    icon: '/Image/Logo/TingnectNew/TingNect icon white.png',
    shortcut: '/Image/Logo/TingnectNew/TingNect icon white.png',
    apple: '/Image/Logo/TingnectNew/TingNect icon white.png',
  },
  openGraph: {
    title: 'FAQ - TingNect Web3 Community Platform',
    description: 'Frequently Asked Questions about TingNect, Web3, and blockchain technology.',
    url: 'https://tingnect.com/faq',
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
};

const faqs = [
  {
    id: 1,
    question: 'What is TingNect?',
    answer:
      'TingNect is a Web3 community platform dedicated to building decentralized identity and ecosystem services for billions. We focus on creating accessible Web3 tools and fostering community engagement in Vietnam and beyond.',
  },
  {
    id: 2,
    question: 'What is TingNect Identity?',
    answer:
      'TingNect Identity is a decentralized, privacy-first digital identifier that gives users control over their own identity data. It\'s blockchain-based, verifiable, and designed to work across the entire Web3 ecosystem.',
  },
  {
    id: 3,
    question: 'Is TingNect available in Vietnam?',
    answer:
      'Yes! TingNect is actively building for the Vietnamese market. We\'re focused on making Web3 accessible to communities in Vietnam and Southeast Asia. Join our community to stay updated on our progress.',
  },
  {
    id: 4,
    question: 'How do I get started with TingNect?',
    answer:
      'You can start by visiting our website, registering on the member page, and joining our community. Check out our blog for educational guides and development tutorials on how to build with our platform.',
  },
  {
    id: 5,
    question: 'What is the TingNect ecosystem?',
    answer:
      'The TingNect ecosystem includes multiple components: TingNect Identity (decentralized ID), TingNect products (tools and services), TingNect Chain (blockchain infrastructure), and our community partnerships. It\'s designed as an integrated Web3 platform.',
  },
  {
    id: 6,
    question: 'What is a Web3 super app?',
    answer:
      'A Web3 super app combines multiple decentralized services into one integrated platform. TingNect is building this by combining identity, community tools, financial services, and blockchain infrastructure in one accessible interface.',
  },
  {
    id: 7,
    question: 'How is TingNect different from other platforms?',
    answer:
      'TingNect emphasizes community-first design, privacy through decentralized identity, and accessibility for emerging markets. We\'re committed to making Web3 understandable and usable for billions, not just crypto enthusiasts.',
  },
  {
    id: 8,
    question: 'What is TrustLabs?',
    answer:
      'TrustLabs is a strategic partner in the TingNect ecosystem. Together, we\'re advancing decentralized trust infrastructure and security standards for Web3 applications and identity verification.',
  },
  {
    id: 9,
    question: 'Can I develop on TingNect?',
    answer:
      'Yes! We provide developer resources and APIs. Check our "How to Build with TingNect" guide for detailed documentation, code examples, and integration instructions.',
  },
  {
    id: 10,
    question: 'Is TingNect secure?',
    answer:
      'Security is a core principle. TingNect Identity uses industry-standard cryptography and blockchain validation. Our platform is audited and follows best practices in Web3 security. Privacy-first architecture means you control your data.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        suppressHydrationWarning
      />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} />

      <section className={styles.container}>
        <div className={styles.header}>
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about TingNect and Web3</p>
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <div key={faq.id} className={styles.faqItem}>
              <input type="checkbox" id={`faq-${faq.id}`} className={styles.checkbox} />
              <label htmlFor={`faq-${faq.id}`} className={styles.question}>
                <span>{faq.question}</span>
                <span className={styles.icon}>+</span>
              </label>
              <div className={styles.answer}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <h2>Still have questions?</h2>
          <p>Can&apos;t find the answer you&apos;re looking for? Get in touch with our team.</p>
          <a href="/contact" className={styles.ctaButton}>
            Contact Us
          </a>
        </div>
      </section>
    </>
  );
}
