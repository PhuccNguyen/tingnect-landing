'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink, ArrowRight } from 'lucide-react';
import styles from './DesktopNav.module.css';

interface NavigationItem {
  name: string;
  href: string;
  external?: boolean;
}

interface DesktopNavProps {
  navigation: NavigationItem[];
  pathname: string;
}

export default function DesktopNav({ navigation, pathname }: DesktopNavProps) {
  return (
    <>
      {/* Enhanced Desktop Navigation */}
      <nav className={styles.desktopNav}>
        <div className={styles.navBackground} />
        <div className={styles.navIndicatorTrack} />

        {navigation.map((item, index) => (
          <motion.div
            key={item.name}
            className={styles.navItemWrapper}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
          >
            {item.external ? (
              <motion.a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.navLink} ${styles.externalLink}`}
                whileHover={{
                  y: -4,
                  scale: 1.08,
                  rotateX: 8,
                }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <span className={styles.navText}>{item.name}</span>
                <ExternalLink size={14} className={styles.externalIcon} />
                <div className={styles.navHoverEffect} />
                <div className={styles.navGlow} />
                <div className={styles.navShimmer} />
              </motion.a>
            ) : (
              <motion.div className={styles.navLinkContainer}>
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${pathname === item.href ? styles.navLinkActive : ''}`}
                >
                  <span className={styles.navText}>{item.name}</span>
                  <div className={styles.navHoverEffect} />
                  <div className={styles.navGlow} />
                  <div className={styles.navShimmer} />

                  <motion.div
                    className={styles.navRipple}
                    whileHover={{
                      scale: [0, 1],
                      opacity: [0.6, 0],
                    }}
                    transition={{ duration: 0.6 }}
                  />
                </Link>

                {pathname === item.href && (
                  <>
                    <motion.div
                      className={styles.activeIndicator}
                      layoutId="activeIndicator"
                      transition={{
                        type: "spring",
                        stiffness: 600,
                        damping: 40
                      }}
                    />
                    <motion.div
                      className={styles.activeGlow}
                      animate={{
                        boxShadow: [
                          "0 0 25px rgba(59, 130, 246, 0.6)",
                          "0 0 35px rgba(139, 92, 246, 0.5)",
                          "0 0 25px rgba(59, 130, 246, 0.6)"
                        ],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </>
                )}
              </motion.div>
            )}
          </motion.div>
        ))}
      </nav>

      {/* Ultra Premium Register Button */}
      <div className={styles.registerSection}>
        <motion.a
          href="https://tingnect.com/contact"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.registerButton}
          whileHover={{
            scale: 1.08,
            y: -6,
            rotateX: 8,
          }}
          whileTap={{
            scale: 0.92,
            rotateX: -5,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <div className={styles.buttonBackground} />
          <div className={styles.buttonGradient} />
          <div className={styles.buttonMesh} />
          <div className={styles.buttonShine} />
          <div className={styles.buttonBorder} />

          <motion.div
            className={styles.buttonContent}
            animate={{
              x: [0, 2, 0, -2, 0],
              rotateY: [0, 5, 0, -5, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >            </motion.div>
            <span className={styles.buttonText}>Contact Us</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowRight size={18} className={styles.buttonArrow} />
            </motion.div>
          </motion.div>

          <div className={styles.buttonGlow} />

          <div className={styles.buttonParticles}>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className={styles.buttonParticle}
                animate={{
                  scale: [0, 1.2, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 360],
                  x: [0, Math.cos(i * 45) * 20, 0],
                  y: [0, Math.sin(i * 45) * 20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.a>
      </div>
    </>
  );
}
