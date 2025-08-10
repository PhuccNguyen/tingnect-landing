'use client';

import { motion } from 'framer-motion';
import { Search, Shield, Users, Wallet, Globe, Zap } from 'lucide-react';
import styles from './IDHero.module.css';

export default function IDHero() {
  const features = [
    { icon: Shield, title: 'Verified', desc: 'Authenticated identities' },
    { icon: Wallet, title: 'On-chain', desc: 'Blockchain verified' },
    { icon: Users, title: 'Community', desc: '100+ builders' },
    { icon: Globe, title: 'Global', desc: 'Worldwide network' },
  ];

  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <div className={styles.gridPattern} />
        <div className={styles.gradientOverlay} />
      </div>

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Zap size={16} />
            <span>Web3 Identity Explorer</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Discover <span className={styles.highlight}>Web3 Identities</span>
            <br />in TingNect Ecosystem
          </motion.h1>

          {/* Description */}
          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore verified Web3 profiles, discover talented builders, and connect with 
            the vibrant community shaping the decentralized future.
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            className={styles.features}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className={styles.feature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div className={styles.featureIcon}>
                  <feature.icon size={20} />
                </div>
                <div className={styles.featureContent}>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDesc}>{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <div className={styles.floatingElements}>
          <motion.div
            className={`${styles.floatingElement} ${styles.element1}`}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Wallet size={24} />
          </motion.div>

          <motion.div
            className={`${styles.floatingElement} ${styles.element2}`}
            animate={{
              y: [0, 15, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Shield size={20} />
          </motion.div>

          <motion.div
            className={`${styles.floatingElement} ${styles.element3}`}
            animate={{
              y: [0, -25, 0],
              rotate: [0, -180, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Users size={22} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
