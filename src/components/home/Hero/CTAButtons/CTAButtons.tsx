// src/components/home/Hero/CTAButtons/CTAButtons.tsx
'use client';

import { motion } from 'framer-motion';
import { Apple, Sparkles, ArrowRight, Download } from 'lucide-react';
import styles from './CTAButtons.module.css';

export default function CTAButtons() {
  return (
    <div className={styles.ctaButtons}>
      {/* DOWNLOAD APP — hidden md:flex - chỉ hiện desktop */}
      <motion.a
        href="#download"
        className={`${styles.downloadButton} ${styles.desktopOnly}`}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <Download size={18} className={styles.downloadIcon} />
        <span>Download App</span>
      </motion.a>

      {/* EXPLORE FEATURES — flex (luôn hiển thị) */}
      <motion.a
        href="#features"
        className={styles.exploreButton}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <Sparkles size={16} className={styles.exploreIcon} />
        <span>Explore Features</span>
        <ArrowRight size={15} className={styles.exploreArrow} />
      </motion.a>
    </div>
  );
}
