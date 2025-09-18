'use client';

import { motion } from 'framer-motion';
import styles from './Hero.module.css';
import Background from './Background/Background';
import MainContent from './MainContent/MainContent';
import CombinedBackground from './CombinedBackground/CombinedBackground';
export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Background Layer với RightVisual */}
      <div className={styles.backgroundLayer}>
        <CombinedBackground />

      </div>
      
      {/* Main Content */}
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Main Content - Toàn bộ chiều rộng */}
          <motion.div 
            className={styles.mainSection}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <MainContent />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
