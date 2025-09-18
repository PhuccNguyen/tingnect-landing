'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Sparkles, Users, Calendar, Star } from 'lucide-react';
import styles from './CTAButtons.module.css';

export default function CTAButtons() {
  return (
    <div className={styles.ctaButtons}>
      {/* Primary CTA Button */}
      <motion.a
        href="https://tingvote.com"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.primaryButton}
        whileHover={{ 
          scale: 1.03, 
          y: -3,
          rotateX: 5,
        }}
        whileTap={{ 
          scale: 0.97,
          rotateX: -5,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Multi-layer button effects */}
        <div className={styles.buttonBackground} />
        <div className={styles.buttonGradient} />
        <div className={styles.buttonMesh} />
        <div className={styles.buttonBorder} />
        
        <motion.div 
          className={styles.buttonContent}
          animate={{ x: [0, 1, 0, -1, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className={styles.buttonIconWrapper}>
            <Sparkles size={18} className={styles.buttonIcon} />
            <div className={styles.iconGlow} />
          </div>
          <span className={styles.buttonText}>Register Event</span>
          <motion.div
            className={styles.buttonArrowWrapper}
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ExternalLink size={18} className={styles.buttonArrow} />
          </motion.div>
        </motion.div>
        
        <div className={styles.buttonShine} />
        <div className={styles.buttonGlow} />
        
        {/* Button particles */}
        <div className={styles.buttonParticles}>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={styles.buttonParticle}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </motion.a>

      {/* Secondary CTA Button */}
      <motion.a
        href="https://tingvote.com"
        className={styles.secondaryButton}
        whileHover={{ 
          scale: 1.02, 
          y: -2,
          borderColor: "rgba(59, 130, 246, 0.4)",
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div className={styles.secondaryBackground} />
        <div className={styles.secondaryBorder} />
        
        <div className={styles.buttonContent}>
          <div className={styles.buttonIconWrapper}>
            <Users size={18} className={styles.buttonIcon} />
            <div className={styles.iconGlow} />
          </div>
          <span className={styles.buttonText}>Vote Now</span>
          <motion.div
            className={styles.buttonArrowWrapper}
            animate={{ x: [0, 2, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <ArrowRight size={18} className={styles.buttonArrow} />
          </motion.div>
        </div>
        
        <div className={styles.secondaryGlow} />
        <div className={styles.hoverShimmer} />
      </motion.a>

      {/* Additional Info Cards */}
      <motion.div 
        className={styles.infoCards}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <motion.div 
          className={styles.infoCard}
          whileHover={{ scale: 1.05, y: -2 }}
        >
          <div className={styles.infoIcon}>
            <Calendar size={14} />
          </div>
          <span className={styles.infoText}>Free Registration</span>
          <div className={styles.infoBadge}>
            <Star size={10} />
          </div>
        </motion.div>
        
        <motion.div 
          className={styles.infoCard}
          whileHover={{ scale: 1.05, y: -2 }}
        >
          <div className={styles.infoIcon}>
            <Users size={14} />
          </div>
          <span className={styles.infoText}>Free Voting Daily</span>
          <div className={styles.urgencyBadge}>
            Hot
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
