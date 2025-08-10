'use client';

import { motion } from 'framer-motion';
import { Rocket, Code, Globe, Zap } from 'lucide-react';
import styles from './ProductsHero.module.css';

export default function ProductsHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <div className={styles.gradientOverlay} />
      </div>

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 50 }}
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
            <Rocket size={16} />
            <span>Our Products</span>
          </motion.div>

          {/* Title */}
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Built for the <span className={styles.highlight}>Future</span>
          </motion.h1>

          {/* Description */}
<motion.p 
  className={styles.description}
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.4 }}
>
  We&apos;re crafting revolutionary Web3 and AI solutions that will power 
  the next generation of decentralized applications and services.
</motion.p>

          {/* Stats */}
          <motion.div 
            className={styles.stats}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className={styles.stat}>
              <Code className={styles.statIcon} />
              <span className={styles.statNumber}>10+</span>
              <span className={styles.statLabel}>Products in Pipeline</span>
            </div>
            <div className={styles.stat}>
              <Globe className={styles.statIcon} />
              <span className={styles.statNumber}>5</span>
              <span className={styles.statLabel}>Blockchain Networks</span>
            </div>
            <div className={styles.stat}>
              <Zap className={styles.statIcon} />
              <span className={styles.statNumber}>24/7</span>
              <span className={styles.statLabel}>Development</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
