// src/components/home/Hero/MainContent/MainContent.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { easeOut } from 'framer-motion';
import styles from './MainContent.module.css';
import LeftColumn from './LeftColumn';
import RightVisual from '../RightVisual/RightVisual';

const typingTexts = [
  'Play. Connect. Grow.',
  'Discover clubs. Join communities.',
  'Book activities. Host events.',
];

export default function MainContent() {
  const [currentTypingIndex, setCurrentTypingIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeOut },
    },
  };

  return (
    <motion.div
      className={styles.mainContent}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={styles.layout}>
        <motion.div className={styles.leftWrapper} variants={itemVariants}>
          <LeftColumn displayText={displayText} cursor={true} />
        </motion.div>

        <motion.div className={styles.rightWrapper} variants={itemVariants}>
          <RightVisual />
        </motion.div>
      </div>
    </motion.div>
  );
}
