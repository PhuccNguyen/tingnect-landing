'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Menu, X, Sparkles, Clock, Wifi } from 'lucide-react';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import styles from './Header.module.css';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Vote', href: 'https://tingvote.com', external: true },
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
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [networkStrength, setNetworkStrength] = useState(4);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 20 });

  // Enhanced scroll transforms
  const headerOpacity = useTransform(scrollY, [0, 50, 100], [0.92, 0.96, 1]);
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.985]);
  const headerBlur = useTransform(scrollY, [0, 50, 100], [0, 15, 30]);
  const borderRadius = useTransform(scrollY, [0, 100], [28, 20]);
  const headerY = useTransform(scrollY, [0, 100], [0, -2]);

  // Auto-hide header on scroll down (mobile optimization)
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollDifference = currentScrollY - lastScrollY;

    if (window.innerWidth <= 768) {
      if (scrollDifference > 5 && currentScrollY > 100) {
        setIsVisible(false);
      } else if (scrollDifference < -5 || currentScrollY < 50) {
        setIsVisible(true);
      }
    }

    setIsScrolled(currentScrollY > 20);
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  // Enhanced time updates with battery simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setBatteryLevel(prev => Math.max(1, prev - 0.01));
      setNetworkStrength(prev => Math.max(1, Math.min(4, prev + (Math.random() - 0.5) * 0.1)));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Optimized scroll handler
  useEffect(() => {
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [handleScroll]);

  // Enhanced mouse tracking
  useEffect(() => {
    let animationFrameId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        if (headerRef.current) {
          const rect = headerRef.current.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;

          setMousePosition({ x, y });
          mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.1);
          mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.1);
        }
      });
    };

    const headerElement = headerRef.current;
    if (headerElement) {
      headerElement.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      if (headerElement) {
        headerElement.removeEventListener('mousemove', handleMouseMove);
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [mouseX, mouseY]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  return (
    <motion.header
      ref={headerRef}
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${!isVisible ? styles.hidden : ''}`}
      style={{
        opacity: headerOpacity,
        scale: headerScale,
        borderRadius,
        y: headerY,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        y: isVisible ? 0 : -100,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
    >
      {/* Advanced Multi-layer Background */}
      <div className={styles.headerBackgroundLayers}>
        <motion.div
          className={styles.headerBackground}
          animate={{
            background: isScrolled
              ? "linear-gradient(135deg, rgba(6, 11, 25, 0.98) 0%, rgba(15, 23, 42, 0.96) 30%, rgba(30, 41, 59, 0.94) 70%, rgba(15, 23, 42, 0.98) 100%)"
              : "linear-gradient(135deg, rgba(6, 11, 25, 0.88) 0%, rgba(15, 23, 42, 0.82) 30%, rgba(30, 41, 59, 0.78) 70%, rgba(15, 23, 42, 0.88) 100%)"
          }}
          transition={{ duration: 0.5 }}
        />

        <div className={styles.meshGradient} />
        <div className={styles.neuralPattern} />

        <motion.div
          className={styles.headerBlur}
          style={{
            backdropFilter: `blur(${headerBlur}px) saturate(1.2)`,
          }}
        />

        <div className={styles.premiumBorder} />

        <motion.div
          className={styles.ambientLight}
          animate={{
            opacity: isHovered ? 0.6 : 0.3,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      {/* Enhanced Mouse Interaction */}
      <motion.div
        className={styles.mouseGlow}
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(59, 130, 246, 0.18) 0%, 
            rgba(139, 92, 246, 0.14) 25%,
            rgba(16, 185, 129, 0.10) 50%,
            transparent 70%)`,
          x: springX,
          y: springY,
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.3 : 1,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* Smart Status Bar */}
      <div className={styles.statusBar}>
        <motion.div
          className={styles.statusIndicators}
          animate={{ opacity: isScrolled ? 1 : 0.7 }}
        >
          <div className={styles.networkIndicator}>
            <Wifi size={12} />
            <div className={styles.signalBars}>
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`${styles.signalBar} ${i < Math.floor(networkStrength) ? styles.active : ''}`}
                  animate={{
                    height: i < Math.floor(networkStrength) ? '100%' : '30%',
                    opacity: i < Math.floor(networkStrength) ? 1 : 0.3,
                  }}
                  transition={{ delay: i * 0.1 }}
                />
              ))}
            </div>
          </div>

          <div className={styles.timeDisplay}>
            <Clock size={12} />
            <span>{currentTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            })}</span>
          </div>

          <div className={styles.batteryIndicator}>
            <div className={styles.batteryContainer}>
              <motion.div
                className={styles.batteryLevel}
                animate={{
                  width: `${batteryLevel}%`,
                  backgroundColor: batteryLevel > 20 ? '#10b981' : '#ef4444'
                }}
              />
            </div>
            <span className={styles.batteryText}>{Math.round(batteryLevel)}%</span>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Floating Particles */}
      <div className={styles.particleSystem}>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`${styles.particle} ${styles[`particle${(i % 3) + 1}`]}`}
            animate={{
              y: [-20, -80, -20],
              x: [Math.sin(i) * 15, Math.sin(i + 1) * 25, Math.sin(i) * 15],
              opacity: [0, 0.7, 0],
              scale: [0.2, 1, 0.2],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            style={{
              left: `${10 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className={styles.container}>
        {/* Premium Logo */}
        <motion.div
          className={styles.logo}
          whileHover={{
            scale: 1.08,
            rotate: [0, -2, 2, 0],
          }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <Link href="/" className={styles.logoLink}>
            <motion.div
              className={styles.logoWrapper}
              animate={{
                boxShadow: isScrolled
                  ? [
                    "0 0 40px rgba(59, 130, 246, 0.5)",
                    "0 0 50px rgba(139, 92, 246, 0.4)",
                    "0 0 40px rgba(59, 130, 246, 0.5)"
                  ]
                  : [
                    "0 0 25px rgba(59, 130, 246, 0.4)",
                    "0 0 35px rgba(139, 92, 246, 0.3)",
                    "0 0 25px rgba(59, 130, 246, 0.4)"
                  ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Image
                src="/Image/Logo/TingNect/TingNect icon.svg"
                alt="TingNect"
                width={40}
                height={40}
                className={styles.logoIcon}
                priority
              />

              <div className={styles.logoGlow} />
              <div className={styles.logoGlowSecondary} />
              <div className={styles.holographicEffect} />

              <motion.div
                className={styles.pulseRing}
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.8, 0, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>


            <motion.div
              className={styles.logoWrapperr}
            >
              <Image
              src="/Image/Logo/TingNect/TING_Nect_01.svg"
              alt="TingNect Logo Mobile"
               width={120}
               height={32}
                className={styles.logoMobile}
                priority
              />
            </motion.div>


            <div className={styles.logoTextContainer}>
              <motion.span
                className={styles.logoText}
                animate={{
                  backgroundPosition: isScrolled ? "300% 0%" : "0% 0%",
                }}
                transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
              >
                TingNect
              </motion.span>




              <div className={styles.badgeContainer}>
                <motion.div
                  className={styles.buildBadge}
                  animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.85, 1, 0.85],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <Sparkles size={10} />
                  Build for Billions
                </motion.div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <DesktopNav navigation={navigation} pathname={pathname} />

        {/* Mobile Menu Button */}
        <motion.button
          className={styles.mobileMenuButton}
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          whileHover={{
            scale: 1.2,
            rotate: 8,
          }}
          whileTap={{
            scale: 0.85,
            rotate: -8,
          }}
          animate={{
            backgroundColor: isMenuOpen
              ? "rgba(59, 130, 246, 0.2)"
              : isScrolled
                ? "rgba(255, 255, 255, 0.15)"
                : "rgba(255, 255, 255, 0.1)",
            borderColor: isMenuOpen
              ? "rgba(59, 130, 246, 0.5)"
              : "rgba(255, 255, 255, 0.25)",
            boxShadow: isMenuOpen
              ? "0 0 30px rgba(59, 130, 246, 0.4)"
              : "0 8px 25px rgba(0, 0, 0, 0.1)"
          }}
          transition={{ duration: 0.3 }}
          aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={isMenuOpen}
        >
          <div className={styles.menuIconContainer}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
          <div className={styles.menuButtonGlow} />
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <MobileNav 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen}
        navigation={navigation}
        pathname={pathname}
      />
    </motion.header>
  );
}
