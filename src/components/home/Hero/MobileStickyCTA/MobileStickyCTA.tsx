// src/components/home/Hero/MobileStickyCTA/MobileStickyCTA.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import styles from './MobileStickyCTA.module.css';

export default function MobileStickyCTA() {
  const handleDownload = () => {
    // Smart redirect theo platform
    const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/i.test(ua)) {
      window.open('https://apps.apple.com/app/tingnect', '_blank');
    } else if (/Android/i.test(ua)) {
      window.open(
        'https://play.google.com/store/apps/details?id=com.tingnect',
        '_blank'
      );
    } else {
      const el = document.getElementById('download');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      className={styles.stickyCTA}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8, ease: 'easeOut' }}
    >
      <div className={styles.iconWrapper}>
        <Image
          src="/Image/Logo/TingnectNew/TingNect icon white.png"
          alt="Tingnect"
          width={32}
          height={32}
          className={styles.icon}
        />
      </div>

      <div className={styles.content}>
        <p className={styles.title}>Download Tingnect Now</p>
        <p className={styles.subtitle}>Your Trusted Lifestyle Social Club</p>
      </div>

      <motion.button
        className={styles.actionButton}
        onClick={handleDownload}
        whileTap={{ scale: 0.92 }}
        aria-label="Download Tingnect App"
      >
        <ArrowRight size={20} />
      </motion.button>
    </motion.div>
  );
}
