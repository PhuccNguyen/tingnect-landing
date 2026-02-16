'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { easeOut } from 'framer-motion';
import styles from './MainContent.module.css';
import { eventsData } from '@/data/events-data';
import LeftColumn from './LeftColumn';
import EventsSection from './EventsSection';

const typingTexts = [
  'Connect. Build. Scale.',
  'Unlock Web3 Potential',
  'Join Founders, Builders, VCs',
  'Shape the Future Together',
  'Official Platform for Web3',
];

/**
 * MainContent - Hero section chính
 *
 * Cấu trúc component:
 * - LeftColumn: TingNect brand (cố định - logo, slogan, CTA)
 * - EventsSection: Events & Updates (động - fetch từ backend)
 *
 * Backend integration:
 * - EventsSection có thể dùng useEvents hook để fetch từ /api/events
 * - Hiện tại fallback về hardcoded data từ @/data/events-data
 */
export default function MainContent() {
  const [currentTypingIndex, setCurrentTypingIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing animation effect
  useEffect(() => {
    const currentText = typingTexts[currentTypingIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentText.slice(0, displayText.length + 1));

        if (displayText === currentText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentText.slice(0, displayText.length - 1));

        if (displayText === '') {
          setIsDeleting(false);
          setCurrentTypingIndex((prev) => (prev + 1) % typingTexts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTypingIndex]);

  const handleCTAClick = (url: string) => {
    window.open(url, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.06,
        delayChildren: 0.1,
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
    <motion.div
      className={styles.MainContent}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Desktop Two-Column Layout */}
      <div className={styles.desktopLayout}>
        {/* Left Column - TingNect Brand (cố định) */}
        <LeftColumn displayText={displayText} cursor={true} />

        {/* Right Column - Events & Updates (động, fetch từ backend) */}
        <motion.div className={styles.rightColumn} variants={itemVariants}>
          <EventsSection
            eventsData={eventsData}
            onCTAClick={handleCTAClick}
          />
        </motion.div>
      </div>

      {/* Mobile About Section (Hidden on Desktop) */}
      <motion.div className={styles.aboutSection} variants={itemVariants}>
        <div className={styles.aboutContent}>
          <p className={styles.aboutText}>
            <strong>TingNect - Build for Billions</strong> is the premier Web3
            platform uniting developers, entrepreneurs, and tech enthusiasts to
            shape a sustainable ecosystem for the future.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
