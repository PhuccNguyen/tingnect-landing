'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Users, Calendar, Star, Crown, Vote, UserPlus } from 'lucide-react';
import styles from './CTAButtons.module.css';

export default function CTAButtons() {
  return (
    <div className={styles.ctaButtons}>

      {/* BUTTON 1: CHECK-IN REGISTRATION - Enhanced 3D */}
      <motion.a
        href="https://hhsv.tingnect.com"
        target="_blank"
        rel="noopener noreferrer"
  className={`${styles.checkInButton} ${styles.isCompact}`}
        whileHover={{ 
          scale: 1.02, 
          y: -4,
          rotateX: 5,
          rotateY: 2,
        }}
        whileTap={{ 
          scale: 0.98,
          rotateX: -3,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <div className={styles.checkInBackground} />
        <div className={styles.checkInGradient} />
        <div className={styles.checkInMesh} />
        <div className={styles.checkInBorder} />
        
        <motion.div 
          className={styles.buttonContent}
          animate={{ x: [0, 1, 0, -1, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <div className={styles.checkInIconWrapper}>
            <motion.div
              animate={{ 
                rotate: [0, 5, 0, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Crown size={18} className={styles.checkInIcon} />
            </motion.div>
            <div className={styles.checkInIconGlow} />
            <div className={styles.checkInIconRings} />
          </div>
          
          <span className={styles.checkInText}>Check-In Contest</span>
          
          <motion.div
            className={styles.checkInArrowWrapper}
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <ArrowRight size={16} className={styles.checkInArrow} />
          </motion.div>
        </motion.div>
        
        <div className={styles.checkInShine} />
        <div className={styles.checkInGlow} />
        <div className={styles.checkInParticles}>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={styles.checkInParticle}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          ))}
        </div>
      </motion.a>

      {/* BUTTON 2: ACCOUNT REGISTRATION - Enhanced 3D */}
      <motion.a
        href="https://tingvote.com"
        target="_blank"
        rel="noopener noreferrer"
  className={`${styles.registerButton} ${styles.isCompact}`}
        whileHover={{ 
          scale: 1.02, 
          y: -4,
          rotateX: 5,
          rotateY: -2,
        }}
        whileTap={{ 
          scale: 0.98,
          rotateX: -3,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <div className={styles.registerBackground} />
        <div className={styles.registerGradient} />
        <div className={styles.registerMesh} />
        <div className={styles.registerBorder} />
        
        <motion.div 
          className={styles.buttonContent}
          animate={{ x: [0, 1, 0, -1, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <div className={styles.registerIconWrapper}>
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 10, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <UserPlus size={18} className={styles.registerIcon} />
            </motion.div>
            <div className={styles.registerIconGlow} />
            <div className={styles.registerIconRings} />
          </div>
          
          <span className={styles.registerText}>Register Event</span>
          
          <motion.div
            className={styles.registerArrowWrapper}
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <ExternalLink size={16} className={styles.registerArrow} />
          </motion.div>
        </motion.div>
        
        <div className={styles.registerShine} />
        <div className={styles.registerGlow} />
        <div className={styles.registerParticles}>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={styles.registerParticle}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          ))}
        </div>
      </motion.a>

      {/* BUTTON 3: VOTE NOW - Premium 3D Transparent */}
      <motion.a
        href="https://tingvote.com"
  className={`${styles.voteButton} ${styles.isCompact}`}
        whileHover={{ 
          scale: 1.03, 
          y: -6,
          rotateX: 8,
          rotateY: 3,
        }}
        whileTap={{ 
          scale: 0.97,
          rotateX: -5,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {/* Glass morphism layers */}
        <div className={styles.voteGlassBackground} />
        <div className={styles.voteGlassBorder} />
        <div className={styles.voteHolographicLayer} />
        <div className={styles.voteMesh} />
        
        {/* Dynamic rainbow gradient */}
        <motion.div 
          className={styles.voteRainbowGradient}
          animate={{ 
            background: [
              'linear-gradient(45deg, rgba(255,215,0,0.08), rgba(255,20,147,0.06), rgba(138,43,226,0.07), rgba(0,191,255,0.05))',
              'linear-gradient(45deg, rgba(0,191,255,0.08), rgba(138,43,226,0.06), rgba(255,215,0,0.07), rgba(255,20,147,0.05))',
              'linear-gradient(45deg, rgba(255,20,147,0.08), rgba(255,215,0,0.06), rgba(0,191,255,0.07), rgba(138,43,226,0.05))',
            ]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        
        <motion.div 
          className={styles.buttonContent}
          animate={{ 
            x: [0, 2, 0, -2, 0],
            y: [0, -0.5, 0, 0.5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <div className={styles.voteIconWrapper}>
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.15, 1]
              }}
              transition={{ 
                rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity }
              }}
            >
              <Vote size={20} className={styles.voteIcon} />
            </motion.div>
            <div className={styles.voteIconAura} />
            <div className={styles.voteIconOrbs} />
            
            {/* Magic sparkles around icon */}
            <div className={styles.voteIconSparkles}>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className={styles.voteIconSparkle}
                  animate={{
                    scale: [0, 1.2, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                />
              ))}
            </div>
          </div>
          
          <motion.span 
            className={styles.voteText}
            animate={{ 
              textShadow: [
                '0 0 10px rgba(255,215,0,0.6), 0 0 20px rgba(255,20,147,0.3)',
                '0 0 15px rgba(255,20,147,0.6), 0 0 25px rgba(0,191,255,0.3)',
                '0 0 12px rgba(0,191,255,0.6), 0 0 22px rgba(138,43,226,0.3)',
                '0 0 10px rgba(255,215,0,0.6), 0 0 20px rgba(255,20,147,0.3)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Vote Beauty Queen
          </motion.span>
          
          <motion.div
            className={styles.voteArrowWrapper}
            animate={{ 
              x: [0, 4, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <ArrowRight size={17} className={styles.voteArrow} />
          </motion.div>
        </motion.div>
        
        {/* Premium light effects */}
        <div className={styles.voteLightBeam} />
        <div className={styles.voteHologramScan} />
        <div className={styles.voteAuraGlow} />
        
        {/* Floating magic particles */}
        <div className={styles.voteMagicParticles}>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className={styles.voteMagicParticle}
              animate={{
                y: [0, -25, 0],
                x: [0, Math.sin(i) * 15, 0],
                scale: [0, 1.5, 0],
                opacity: [0, 0.9, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {/* Rainbow border effect */}
        <motion.div 
          className={styles.voteRainbowBorder}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
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
            <Star size={15} />
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
