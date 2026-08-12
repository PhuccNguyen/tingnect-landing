// src/components/home/Hero/MainContent/LeftColumn.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { easeOut } from 'framer-motion';
import styles from './MainContent.module.css';
import CTAButtonsBlock from '../CTAButtons/CTAButtonsBlock';
import TrustedNetwork from '../TrustedNetwork/TrustedNetwork';

interface LeftColumnProps {
  displayText: string;
  cursor: boolean;
}

export default function LeftColumn({ displayText, cursor }: LeftColumnProps) {
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: easeOut },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: easeOut },
    },
  };

  return (
    <motion.div className={styles.leftColumn} variants={itemVariants}>
      {/* Top group: Logo + Heading + Subtitle + CTA Block */}
      <div className={styles.topGroup}>


{/* MAIN SLOGAN */}
        <motion.div className={styles.sloganSection} variants={itemVariants}>
          <h1 className={styles.slogan}>
            <span>YOUR TRUSTED</span>
            <span>LIFESTYLE</span>
            <span>SOCIAL CLUB</span>
          </h1>
        </motion.div>

        {/* Subtitle — text-xl với mt rộng để không bị "lost" */}
        <motion.div className={styles.subtitleSection} variants={itemVariants}>

          {/* Typing line nhỏ hơn */}
          <p className={styles.typingLine}>
            <span>{displayText}</span>
            {cursor && (
              <motion.span
                className={styles.cursor}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                |
              </motion.span>
            )}
          </p>
        </motion.div>

        {/* CTA + QR Block — width đồng nhất */}
        <motion.div variants={itemVariants}>
          <CTAButtonsBlock />
        </motion.div>
      </div>

      {/* Trusted Network — đẩy xuống đáy bằng mt-auto */}
      <motion.div
        className={styles.trustedNetworkWrap}
        variants={itemVariants}
      >
        <TrustedNetwork />
      </motion.div>
    </motion.div>
  );
}
