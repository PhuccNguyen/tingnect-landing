'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { easeOut } from 'framer-motion';
import styles from './MainContent.module.css';
import CTAButtons from '../CTAButtons/CTAButtons';

interface LeftColumnProps {
  displayText: string;
  cursor: boolean;
}

/**
 * Component Left Column - TingNect Brand (cố định, không thay đổi)
 * Chứa: Logo, Slogan, Typing text, CTA buttons
 */
export default function LeftColumn({ displayText, cursor }: LeftColumnProps) {
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: easeOut,
      },
    },
  };

  return (
    <motion.div className={styles.leftColumn} variants={itemVariants}>
      {/* Logo Section - TingNect brand (cố định) */}
      <motion.div className={styles.logoSection} variants={logoVariants}>
        <motion.div
          className={styles.logoContainer}
          whileHover={{
            scale: 1.02,
            y: -3,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <div className={styles.logoBg}>
            <Image
              src="/Image/Logo/TingnectNew/logo-tingnect-white.png"
              alt="TingNect - Build for Billions Web3 community platform logo"
              width={280}
              height={92}
              className={styles.logoImage}
              sizes="(max-width: 768px) 100%, (max-width: 1200px) 80%, 280px"
              priority
            />
            <motion.div
              className={styles.officialBadge}
              animate={{
                scale: [1, 1.08, 1],
                boxShadow: [
                  '0 0 15px rgba(59, 130, 246, 0.4)',
                  '0 0 30px rgba(139, 92, 246, 0.6)',
                  '0 0 15px rgba(59, 130, 246, 0.4)',
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <span>Official</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Slogan - Build for Billions (cố định) */}
      <motion.div className={styles.sloganSection} variants={itemVariants}>
        <motion.h1
          className={styles.slogan}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 12,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          Build for Billions
        </motion.h1>
        <motion.div
          className={styles.sloganUnderline}
          initial={{ width: 0 }}
          animate={{ width: '70%' }}
          transition={{ duration: 1.2, delay: 0.4 }}
        />
      </motion.div>

      {/* Typing Text (động, thay đổi) */}
      <motion.div className={styles.typingSection} variants={itemVariants}>
        <div className={styles.typingContainer}>
          <span className={styles.typingContent}>
            {displayText}
            {cursor && (
              <motion.span
                className={styles.cursor}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                |
              </motion.span>
            )}
          </span>
        </div>
      </motion.div>

      {/* CTA Buttons (cố định) */}
      <motion.div variants={itemVariants}>
        <CTAButtons />
      </motion.div>
    </motion.div>
  );
}
