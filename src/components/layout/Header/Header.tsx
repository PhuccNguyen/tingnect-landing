'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Menu, X, ExternalLink, Sparkles, ArrowRight, Zap, Star } from 'lucide-react';
import styles from './Header.module.css';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Event', href: 'https://event.tingnect.com', external: true },
  { name: 'ID', href: '/id' },
  { name: 'Products', href: '/products' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 1]);
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.98]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 25]);
  const borderRadius = useTransform(scrollY, [0, 100], [0, 24]);

  // Update time every second for premium feel
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Enhanced scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Advanced mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setMousePosition({ x, y });
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
      }
    };

    const headerElement = headerRef.current;
    headerElement?.addEventListener('mousemove', handleMouseMove);

    return () => headerElement?.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <motion.header
      ref={headerRef}
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      style={{
        opacity: headerOpacity,
        scale: headerScale,
        borderRadius,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Multi-layer Premium Background */}
      <div className={styles.headerBackgroundLayers}>
        {/* Base gradient */}
        <motion.div
          className={styles.headerBackground}
          animate={{
            background: isScrolled
              ? "linear-gradient(135deg, rgba(6, 11, 25, 0.98) 0%, rgba(15, 23, 42, 0.96) 30%, rgba(30, 41, 59, 0.94) 70%, rgba(15, 23, 42, 0.98) 100%)"
              : "linear-gradient(135deg, rgba(6, 11, 25, 0.85) 0%, rgba(15, 23, 42, 0.80) 30%, rgba(30, 41, 59, 0.75) 70%, rgba(15, 23, 42, 0.85) 100%)"
          }}
        />

        {/* Animated mesh gradient */}
        <div className={styles.meshGradient} />

        {/* Neural network pattern */}
        <div className={styles.neuralPattern} />

        {/* Blur layer */}
        <motion.div
          className={styles.headerBlur}
          style={{
            backdropFilter: `blur(${headerBlur}px)`,
          }}
        />

        {/* Premium border with gradient */}
        <div className={styles.premiumBorder} />
      </div>

      {/* Advanced Mouse Glow Effect */}
      <motion.div
        className={styles.mouseGlow}
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(59, 130, 246, 0.15) 0%, 
            rgba(139, 92, 246, 0.12) 25%,
            rgba(16, 185, 129, 0.08) 50%,
            transparent 70%)`,
          x: springX,
          y: springY,
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Floating Particles System */}
      <div className={styles.particleSystem}>
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`${styles.particle} ${styles[`particle${i % 3 + 1}`]}`}
            animate={{
              y: [-30, -120, -30],
              x: [Math.sin(i) * 20, Math.sin(i + 1) * 30, Math.sin(i) * 20],
              opacity: [0, 0.8, 0],
              scale: [0.3, 1.2, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeInOut",
            }}
            style={{
              left: `${5 + i * 8}%`,
            }}
          />
        ))}
      </div>

      {/* Status Indicators */}
      <div className={styles.statusIndicators}>
        <motion.div
          className={styles.onlineIndicator}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div className={styles.timeDisplay}>
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      <div className={styles.container}>
        {/* Enhanced Logo Section */}
        <motion.div
          className={styles.logo}
          whileHover={{
            scale: 1.05,
            rotate: [0, -1, 1, 0],
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Link href="/" className={styles.logoLink}>
            <motion.div
              className={styles.logoWrapper}
              animate={{
                boxShadow: isScrolled
                  ? [
                    "0 0 30px rgba(59, 130, 246, 0.4)",
                    "0 0 40px rgba(139, 92, 246, 0.3)",
                    "0 0 30px rgba(59, 130, 246, 0.4)"
                  ]
                  : [
                    "0 0 20px rgba(59, 130, 246, 0.3)",
                    "0 0 30px rgba(139, 92, 246, 0.2)",
                    "0 0 20px rgba(59, 130, 246, 0.3)"
                  ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Image
                src="/Image/Logo/TingNect/TingNect icon.svg"
                alt="TingNect"
                width={36}
                height={36}
                className={styles.logoIcon}
              />

              {/* Multi-layer glow effects */}
              <div className={styles.logoGlow} />
              <div className={styles.logoGlowSecondary} />
              <div className={styles.holographicEffect} />
            </motion.div>

            <div className={styles.logoTextContainer}>
              <motion.span
                className={styles.logoText}
                animate={{
                  backgroundPosition: isScrolled ? "200% 0%" : "0% 0%",
                }}
                transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
              >
                TingNect
              </motion.span>

              {/* New "Build for Billions" Badge */}
              <div className={styles.badgeContainer}>
                <motion.div
                  className={styles.buildBadge}
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  aria-label="Build for Billions badge"
                >
                  Build for Billions
                </motion.div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Premium Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <div className={styles.navBackground} />
          {navigation.map((item, index) => (
            <motion.div
              key={item.name}
              className={styles.navItemWrapper}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
            >
              {item.external ? (
                <motion.a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.navLink} ${styles.externalLink}`}
                  whileHover={{
                    y: -3,
                    scale: 1.05,
                    rotateX: 5,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
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
                  </Link>

                  {pathname === item.href && (
                    <>
                      <motion.div
                        className={styles.activeIndicator}
                        layoutId="activeIndicator"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 35
                        }}
                      />
                      <motion.div
                        className={styles.activeGlow}
                        animate={{
                          boxShadow: [
                            "0 0 20px rgba(59, 130, 246, 0.5)",
                            "0 0 30px rgba(139, 92, 246, 0.4)",
                            "0 0 20px rgba(59, 130, 246, 0.5)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
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
            href="https://lu.ma/qji7t8kq"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.registerButton}
            whileHover={{
              scale: 1.06,
              y: -4,
              rotateX: 5,
            }}
            whileTap={{
              scale: 0.94,
              rotateX: -5,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {/* Multi-layer button effects */}
            <div className={styles.buttonBackground} />
            <div className={styles.buttonGradient} />
            <div className={styles.buttonMesh} />
            <div className={styles.buttonShine} />
            <div className={styles.buttonBorder} />

            <motion.div
              className={styles.buttonContent}
              animate={{ x: [0, 1, 0, -1, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles size={18} className={styles.buttonIcon} />
              <span className={styles.buttonText}>Register Event</span>
              <ArrowRight size={18} className={styles.buttonArrow} />
            </motion.div>

            <div className={styles.buttonGlow} />
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
        </div>

        {/* Enhanced Mobile Menu Toggle */}
        <motion.button
          className={styles.mobileMenuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{
            scale: 1.15,
            rotate: 5,
          }}
          whileTap={{
            scale: 0.9,
            rotate: -5,
          }}
          animate={{
            backgroundColor: isScrolled
              ? "rgba(255, 255, 255, 0.12)"
              : "rgba(255, 255, 255, 0.08)",
            borderColor: isMenuOpen
              ? "rgba(59, 130, 246, 0.4)"
              : "rgba(255, 255, 255, 0.2)"
          }}
        >
          <div className={styles.menuIconContainer}>
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 180, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -180, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className={styles.menuButtonGlow} />
        </motion.button>
      </div>

      {/* Ultra Premium Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Enhanced Mobile Menu Backdrop */}
            <motion.div
              className={styles.mobileBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Premium Mobile Menu */}
            <motion.div
              className={styles.mobileNav}
              initial={{ opacity: 0, y: -150, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -150, scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.5
              }}
            >
              {/* Mobile menu background effects */}
              <div className={styles.mobileNavBackground} />
              <div className={styles.mobileNavMesh} />

              <div className={styles.mobileNavContent}>
                <div className={styles.mobileNavLinks}>
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -50, rotateX: -30 }}
                      animate={{ opacity: 1, x: 0, rotateX: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      {item.external ? (
                        <motion.a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${styles.mobileNavLink} ${styles.mobileExternalLink}`}
                          onClick={() => setIsMenuOpen(false)}
                          whileHover={{
                            x: 12,
                            scale: 1.02,
                            rotateX: 5,
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span>{item.name}</span>
                          <ExternalLink size={20} />
                          <div className={styles.mobileLinkGlow} />
                        </motion.a>
                      ) : (
                        <motion.div className={styles.mobileLinkWrapper}>
                          <Link
                            href={item.href}
                            className={`${styles.mobileNavLink} ${pathname === item.href ? styles.mobileNavLinkActive : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.name}
                            <div className={styles.mobileLinkGlow} />
                          </Link>
                          {pathname === item.href && (
                            <motion.div
                              className={styles.mobileActiveIndicator}
                              layoutId="mobileActiveIndicator"
                            />
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className={styles.mobileRegisterSection}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <motion.a
                    href="https://lu.ma/qji7t8kq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.mobileRegisterButton}
                    onClick={() => setIsMenuOpen(false)}
                    whileHover={{
                      scale: 1.03,
                      y: -3,
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className={styles.mobileButtonBackground} />
                    <div className={styles.mobileButtonGradient} />

                    <Sparkles size={20} />
                    <span className={styles.pandacu}>Register Event</span>
                    <ArrowRight size={20} />

                    <div className={styles.mobileButtonGlow} />
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
