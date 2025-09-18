'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink, Sparkles, ArrowRight } from 'lucide-react';
import Portal from './Portal'; 
import styles from './MobileNav.module.css';

interface NavigationItem {
  name: string;
  href: string;
  external?: boolean;
}

interface MobileNavProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  navigation: NavigationItem[];
  pathname: string;
}

export default function MobileNav({ 
  isMenuOpen, 
  setIsMenuOpen, 
  navigation, 
  pathname 
}: MobileNavProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Enhanced mobile menu with swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;

    if (isLeftSwipe && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  // Smart menu auto-close
  useEffect(() => {
    if (isMenuOpen) {
      menuTimeoutRef.current = setTimeout(() => {
        setIsMenuOpen(false);
      }, 30000);

      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      if (menuTimeoutRef.current) {
        clearTimeout(menuTimeoutRef.current);
        menuTimeoutRef.current = null;
      }
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      if (menuTimeoutRef.current) {
        clearTimeout(menuTimeoutRef.current);
        menuTimeoutRef.current = null;
      }
    };
  }, [isMenuOpen, setIsMenuOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen, setIsMenuOpen]);

  return (
    <Portal>
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <>
            {/* Backdrop với click để đóng */}
            <motion.div
              className={styles.mobileBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Navigation Menu */}
            <motion.div
              className={styles.mobileNav}
              initial={{
                opacity: 0,
                y: -100,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -100,
                scale: 0.9,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.4
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Background layers */}
              <div className={styles.mobileNavBackground} />
              <div className={styles.mobileNavGradient} />
              <div className={styles.mobileNavPattern} />

              {/* Swipe indicator */}
              <div className={styles.swipeIndicator}>
                <div className={styles.swipeLine} />
              </div>

              {/* Content */}
              <div className={styles.mobileNavContent}>
                <div className={styles.mobileNavLinks}>
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{
                        opacity: 0,
                        x: -50,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${styles.mobileNavLink} ${styles.externalLink}`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className={styles.linkText}>{item.name}</span>
                          <ExternalLink size={20} className={styles.linkIcon} />
                        </a>
                      ) : (
                        <div className={styles.mobileLinkWrapper}>
                          <Link
                            href={item.href}
                            className={`${styles.mobileNavLink} ${pathname === item.href ? styles.activeLink : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <span className={styles.linkText}>{item.name}</span>
                          </Link>
                          
                          {pathname === item.href && (
                            <motion.div 
                              className={styles.activeIndicator}
                              layoutId="mobileActiveIndicator"
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30
                              }}
                            />
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Register Button */}
                <motion.div
                  className={styles.registerSection}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <a
                    href="https://lu.ma/qji7t8kq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.registerButton}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className={styles.buttonBackground} />
                    <div className={styles.buttonContent}>
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles size={18} />
                      </motion.div>
                      <span>Register Event</span>
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ArrowRight size={18} />
                      </motion.div>
                    </div>
                  </a>
                </motion.div>

                {/* Footer hint */}
                <motion.div 
                  className={styles.menuFooter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <p className={styles.swipeHint}>Vuốt trái để đóng menu</p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
}
