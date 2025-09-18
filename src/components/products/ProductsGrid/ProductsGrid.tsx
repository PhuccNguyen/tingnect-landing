'use client'

import { motion } from 'framer-motion'
import { Clock, Shield, Globe, Zap, Code, Smartphone, Network } from 'lucide-react'
import styles from './ProductsGrid.module.css'

const products = [
  {
    id: 1,
    title: 'Ting Identity',
    description: 'Decentralized identity solution for secure Web3 authentication',
    status: 'Coming Soon',
    icon: Shield,
    color: 'blue',
    features: ['Zero-Knowledge Proofs', 'Cross-Chain Identity', 'Privacy First'],
  },
  {
    id: 2,
    title: 'Ting Chain',
    description: 'High-performance blockchain for decentralized applications',
    status: 'In Development',
    icon: Globe,
    color: 'purple',
    features: ['10,000+ TPS', 'EVM Compatible', 'Green Consensus'],
  },
  {
    id: 3,
    title: 'Ting AI',
    description: 'AI-powered tools for smart contract development',
    status: 'Research Phase',
    icon: Zap,
    color: 'cyan',
    features: ['Code Generation', 'Security Analysis', 'Gas Optimization'],
  },
  {
    id: 4,
    title: 'Ting SDK',
    description: 'Developer toolkit for building on the Ting ecosystem',
    status: 'Planning',
    icon: Code,
    color: 'green',
    features: ['Multi-Language', 'Easy Integration', 'Rich Documentation'],
  },
  {
    id: 5,
    title: 'TingApp',
    description: 'Mobile app for seamless interaction with the Ting ecosystem',
    status: 'In Development',
    icon: Smartphone,
    color: 'yellow',
    features: ['Wallet Integration', 'Real-Time Notifications', 'User-Friendly UI'],
  },
  {
    id: 6,
    title: 'TingNect',
    description: 'Community platform for networking and collaboration',
    status: 'Live',
    icon: Network,
    color: 'teal',
    features: ['Event Management', 'Community Forums', 'Partner Connect'],
  },
]

const statusColors = {
  'Coming Soon': { bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.3)', text: '#60a5fa' },
  'In Development': { bg: 'rgba(139, 92, 246, 0.1)', border: 'rgba(139, 92, 246, 0.3)', text: '#a78bfa' },
  'Research Phase': { bg: 'rgba(6, 182, 212, 0.1)', border: 'rgba(6, 182, 212, 0.3)', text: '#67e8f9' },
  'Planning': { bg: 'rgba(34, 197, 94, 0.1)', border: 'rgba(34, 197, 94, 0.3)', text: '#4ade80' },
  'Live': { bg: 'rgba(20, 184, 166, 0.1)', border: 'rgba(20, 184, 166, 0.3)', text: '#2dd4bf' },
}

export default function ProductsGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Section Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.sectionTitle}>Our Product Ecosystem</h2>
          <p className={styles.sectionDescription}>
            Empowering the decentralized future with innovative solutions
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className={styles.grid}>
          {products.map((product, index) => {
            const IconComponent = product.icon
            const statusStyle = statusColors[product.status as keyof typeof statusColors]

            return (
              <motion.div
                key={product.id}
                className={styles.productCard}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
              >
                <div className={styles.cardContent}>
                  {/* Icon */}
                  <div className={`${styles.iconWrapper} ${styles[product.color]}`}>
                    <IconComponent className={styles.icon} />
                    <div className={styles.iconGlow} />
                  </div>

                  {/* Status Badge */}
                  <div
                    className={styles.statusBadge}
                    style={{
                      background: statusStyle.bg,
                      border: `1px solid ${statusStyle.border}`,
                      color: statusStyle.text,
                    }}
                  >
                    <Clock size={12} />
                    {product.status}
                  </div>

                  {/* Title & Description */}
                  <h3 className={styles.productTitle}>{product.title}</h3>
                  <p className={styles.productDescription}>{product.description}</p>

                  {/* Features */}
                  <div className={styles.features}>
                    {product.features.map((feature, idx) => (
                      <span key={idx} className={styles.feature}>
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Coming Soon Overlay */}
                  {product.status !== 'Live' && (
                    <div className={styles.comingSoonOverlay}>
                      <IconComponent className={styles.overlayIcon} />
                      <span>{product.status}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className={styles.ctaTitle}>Join the Ting Ecosystem</h3>
          <p className={styles.ctaDescription}>
            Stay updated on product launches and gain early access to our innovative solutions.
          </p>
          <motion.a
            href="https://t.me/tingnect"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Community
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}