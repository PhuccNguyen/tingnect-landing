// src/components/home/Hero/CTAButtons/CTAButtonsBlock.tsx
'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Download } from 'lucide-react';
import Logo from '@/components/layout/Logo/Logo';
import styles from './CTAButtonsBlock.module.css';

// Mau QR lay tu brand token thay vi hex cung trong component
const QR_DARK = 'var(--yaa-black)';
const QR_LIGHT = 'var(--yaa-cream)';

export default function CTAButtonsBlock() {
  return (
    <div className={styles.ctaBlock}>
      {/* Row 1: Download App + Explore Features */}
      <div className={styles.buttonRow}>
        {/* DOWNLOAD APP — desktop only */}
        <motion.a
          href="#download"
          className={`${styles.button} ${styles.buttonPrimary} ${styles.desktopOnly}`}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <Download size={18} className={styles.buttonIcon} />
          <span>Download App</span>
        </motion.a>

        {/* EXPLORE FEATURES — luôn hiển thị */}
        <motion.a
          href="#features"
          className={`${styles.button} ${styles.buttonSecondary}`}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <span>Explore Clubs</span>
          <ArrowRight size={15} className={styles.buttonArrow} />
        </motion.a>
      </div>

      {/* Row 2: QR CODE — width = combined button row width */}
      <motion.div
        className={styles.qrCard}
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <div className={styles.qrLeft}>
          <div className={styles.qrWrapper}>
            <svg viewBox="0 0 100 100" className={styles.qrSvg}>
              {/* Generated QR pattern */}
              {Array.from({ length: 12 }).map((_, row) =>
                Array.from({ length: 12 }).map((_, col) => {
                  const shouldFill = (row + col * 3 + row * col) % 3 !== 0;
                  return shouldFill ? (
                    <rect
                      key={`${row}-${col}`}
                      x={col * 8 + 2}
                      y={row * 8 + 2}
                      width={7}
                      height={7}
                      fill={QR_DARK}
                    />
                  ) : null;
                })
              )}
              {/* Corner markers */}
              <rect x="2" y="2" width="22" height="22" fill={QR_DARK} />
              <rect x="6" y="6" width="14" height="14" fill={QR_LIGHT} />
              <rect x="9" y="9" width="8" height="8" fill={QR_DARK} />
              <rect x="76" y="2" width="22" height="22" fill={QR_DARK} />
              <rect x="80" y="6" width="14" height="14" fill={QR_LIGHT} />
              <rect x="83" y="9" width="8" height="8" fill={QR_DARK} />
              <rect x="2" y="76" width="22" height="22" fill={QR_DARK} />
              <rect x="6" y="80" width="14" height="14" fill={QR_LIGHT} />
              <rect x="9" y="83" width="8" height="8" fill={QR_DARK} />
            </svg>
          </div>
        </div>

        <div className={styles.qrCenter}>
          <span className={styles.qrTitle}>Scan to download</span>
          <span className={styles.qrSubtitle}>
            Open camera & point at the QR code
          </span>
        </div>

        <div className={styles.qrRight}>
          <Logo variant="inverted" orientation="icon" height={30} className={styles.qrAppIcon} />
        </div>
      </motion.div>
    </div>
  );
}
