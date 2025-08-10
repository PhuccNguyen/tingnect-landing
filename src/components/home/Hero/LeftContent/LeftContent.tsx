'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { easeOut } from 'framer-motion';
import { Calendar, Clock, MapPin, Sparkles, Users, Trophy, Zap } from 'lucide-react';
import styles from './LeftContent.module.css';
import CTAButtons from '../CTAButtons/CTAButtons';

const typingTexts = [
  "Connect. Build. Scale.",
  "Unlock Web3 Potential",
  "Join Founders, Builders, VCs",
  "Shape the Future Together",
  "Build for Billions"
];

const statsData = [
  { label: "Founders", value: "500+", icon: Users },
  { label: "Startups", value: "150+", icon: Trophy },
  { label: "VCs", value: "50+", icon: Sparkles }
];

export default function LeftContent() {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: easeOut // hoặc array như [0.4, 0, 0.2, 1]
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, x: -50, rotateX: -30 },
    visible: {
      opacity: 1,
      x: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: easeOut // ✅ đúng kiểu
      }
    }
  }

  return (
    <motion.div
      className={styles.leftContent}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Logo Group Section */}
      <motion.div className={styles.logoGroupMobile} variants={logoVariants}>
        <motion.div
          className={styles.logoItem}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Image
            src="/Image/Logo/TingNect/TingNect.svg"
            alt="TingNect"
            width={138} /* Tăng kích thước logo */
            height={276}
            className={styles.logoImage}
          />
        </motion.div>
        <motion.div
          className={styles.logoItem}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Image
            src="/Image/Logo/TingFoundation/TingFoundation-white.svg"
            alt="Ting Foundation"
            width={198} /* Tăng kích thước logo */
            height={356}
            className={styles.logoImage}
          />
        </motion.div>
      </motion.div>

      {/* <motion.div> </motion.div> */}

      {/* Title Section */}
      <motion.div className={styles.titleWrapper} variants={itemVariants}>
        <motion.div className={styles.titleRow}>
          <motion.h1
            className={styles.mainTitle}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
              duration: 8,
              ease: "linear",
              repeat: Infinity
            }}
          >
            TingNect
          </motion.h1>
          <motion.div
            className={styles.titleBadge}
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 1, -1, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Zap size={12} />
            Event 2025
          </motion.div>
        </motion.div>
        <motion.p
          className={styles.slogan}
          variants={itemVariants}
        >
          Build for Billions
        </motion.p>
      </motion.div>


      <motion.div className={styles.titleWrapperMobile} variants={itemVariants}>
        <motion.div className={styles.titleRowMobile}>
          <motion.h1
            className={styles.mainTitleMobile}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
              duration: 8,
              ease: "linear",
              repeat: Infinity
            }}
          >
            TingNect
          </motion.h1>
          <motion.div
            className={styles.titleBadgeMobile}
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 1, -1, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Zap size={10} />
            Event
          </motion.div>
        </motion.div>
        <motion.p
          className={styles.sloganMobile}
          variants={itemVariants}
        >
          Build for Billions
        </motion.p>
      </motion.div>

      {/* Typing Text Animation */}
      <motion.div className={styles.typingText} variants={itemVariants}>
        <span className={styles.typingContent}>
          {displayText}
          <motion.span
            className={styles.cursor}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            |
          </motion.span>
        </span>
      </motion.div>

      {/* Event Info Card */}
      <motion.div className={styles.eventInfo}>
        <div className={styles.eventHeader}>
          <motion.div
            className={styles.eventBadge}
            animate={{
              boxShadow: [
                "0 0 15px rgba(59, 130, 246, 0.3)",
                "0 0 25px rgba(139, 92, 246, 0.2)",
                "0 0 15px rgba(59, 130, 246, 0.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles size={14} />
            UPCOMING EVENT
          </motion.div>
        </div>

        <div className={styles.eventDetails}>
          <motion.div
            className={styles.eventItem}
            whileHover={{ x: 5, scale: 1.01 }}
          >
            <div className={styles.eventIcon}>
              <Calendar size={16} />
            </div>
            <div className={styles.eventText}>
              <span className={styles.eventLabel}>Date</span>
              <span className={styles.eventValue}>August 16, 2025</span>
            </div>
          </motion.div>

          <motion.div
            className={styles.eventItem}
            whileHover={{ x: 5, scale: 1.01 }}
          >
            <div className={styles.eventIcon}>
              <Clock size={16} />
            </div>
            <div className={styles.eventText}>
              <span className={styles.eventLabel}>Time</span>
              <span className={styles.eventValue}>14:00 - 17:00 ICT</span>
            </div>
          </motion.div>

          <motion.div
            className={styles.eventItem}
            whileHover={{ x: 5, scale: 1.01 }}
          >
            <div className={styles.eventIcon}>
              <MapPin size={16} />
            </div>
            <div className={styles.eventText}>
              <span className={styles.eventLabel}>Location</span>
              <span className={styles.eventValue}>Ho Chi Minh City, Vietnam</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Event Summary */}
      <motion.div className={styles.eventSummary} variants={itemVariants}>
        <p className={styles.summaryText}>
          Join the premier Web3 ecosystem event bringing together visionary founders,
          innovative builders, and leading VCs to shape the future of decentralized technology
          for billions of users worldwide.
        </p>

        {/* Stats
        <div className={styles.statsGrid}>
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={styles.statItem}
              whileHover={{ y: -2, scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.8 }}
            >
              <div className={styles.statIcon}>
                <stat.icon size={16} />
              </div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </motion.div>
          ))}
        </div> */}
      </motion.div>

      {/* CTA Buttons */}
      <motion.div variants={itemVariants}>
        <CTAButtons />
      </motion.div>

      {/* Background Effects */}
      <div className={styles.backgroundEffects}>
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.floatingParticle}
            animate={{
              y: [-40, -100, -40],
              x: [Math.sin(i) * 20, Math.sin(i + 1) * 25, Math.sin(i) * 20],
              opacity: [0.2, 0.9, 0.2],
              scale: [0.5 + i * 0.05, 1.4, 0.5 + i * 0.05],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 6 + i * 0.2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
            style={{
              left: `${2 + i * 5}%`,
              top: `${5 + (i % 6) * 15}%`,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
