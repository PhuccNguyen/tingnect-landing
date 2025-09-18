'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Variants, Transition, easeOut } from 'framer-motion';
import styles from './CombinedBackground.module.css';

// Simplified Particle Interface
interface StarParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
}

interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  delay: number;
  color: string;
  size: number;
  amplitude: number;
}

export default function CombinedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [floatingParticles, setFloatingParticles] = useState<FloatingParticle[]>([]);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  
  // Simplified particle array
  const stardust = useRef<StarParticle[]>([]);

  // Detect performance capability
  useEffect(() => {
    const checkPerformance = () => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
      setIsLowPerformance(isMobile || isLowEnd || window.innerWidth < 768);
    };
    
    checkPerformance();
    window.addEventListener('resize', checkPerformance);
    return () => window.removeEventListener('resize', checkPerformance);
  }, []);

  // Generate optimized floating particles
  useEffect(() => {
    const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];
    const particleCount = isLowPerformance ? 15 : 30;
    
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 2 + Math.random() * 3,
      amplitude: 10 + Math.random() * 20,
    }));
    setFloatingParticles(newParticles);
  }, [isLowPerformance]);

  // Optimized stardust initialization
  const initializeStardust = useCallback((width: number, height: number) => {
    if (isLowPerformance) {
      stardust.current = [];
      return;
    }

    stardust.current = [];
    const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'];
    const particleCount = 100; // Reduced from 200
    
    for (let i = 0; i < particleCount; i++) {
      stardust.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        life: Math.random() * 200,
        maxLife: 200 + Math.random() * 200,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.7 + 0.3,
      });
    }
  }, [isLowPerformance]);

  // Simplified stardust update
  const updateStardust = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (isLowPerformance) return;

    stardust.current.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life++;

      // Wrapping
      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;

      // Reset
      if (particle.life >= particle.maxLife) {
        particle.x = Math.random() * width;
        particle.y = Math.random() * height;
        particle.life = 0;
        particle.opacity = Math.random() * 0.7 + 0.3;
      }

      // Simple rendering
      const alpha = particle.opacity * (1 - particle.life / particle.maxLife) * 0.6;
      
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }, [isLowPerformance]);

  // Optimized animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;

    // Clear with fade
    ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
    ctx.fillRect(0, 0, width, height);

    // Update particles
    updateStardust(ctx, width, height);

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [updateStardust]);

  // Resize handler
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    canvas.width = width;
    canvas.height = height;
    
    setDimensions({ width, height });
    initializeStardust(width, height);
  }, [initializeStardust]);

  // Initialize
  useEffect(() => {
    handleResize();
    if (!isLowPerformance) {
      animate();
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleResize, animate, isLowPerformance]);

  // Animation variants
  const globeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: easeOut, delay: 0.2 }
    }
  };

  const elementVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.5 + i * 0.1
      } as Transition
    })
  };

  return (
    <div className={styles.combinedBackground}>
      {/* Optimized Animated Canvas Layer */}
      {!isLowPerformance && (
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          style={{ 
            width: dimensions.width, 
            height: dimensions.height 
          }}
        />
      )}

      {/* Full Screen Gradient Overlays */}
      <div className={styles.gradientOverlay} />
      
      {/* Full Screen Mesh Gradients */}
      <motion.div 
        className={`${styles.meshGradient} ${styles.meshGradient1}`}
        animate={{ 
          x: [0, 80, 0], 
          y: [0, -40, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className={`${styles.meshGradient} ${styles.meshGradient2}`}
        animate={{ 
          x: [0, -80, 0], 
          y: [0, 80, 0],
          scale: [1, 0.8, 1]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className={`${styles.meshGradient} ${styles.meshGradient3}`}
        animate={{ 
          x: [0, 60, 0], 
          y: [0, -60, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />

      {/* Full Screen Visual Elements */}
      <motion.div
        className={styles.fullScreenVisual}
        initial="hidden"
        animate="visible"
      >
        {/* Enhanced Background Glow - Full Screen */}
        <div className={styles.backgroundGlow} />

        {/* 3D Globe - Centered */}
        <motion.div className={styles.globe} variants={globeVariants}>
          <motion.div
            className={styles.globeInner}
            initial={{ rotateX: -20, rotateY: 0 }}
            animate={{ rotateY: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            <div className={styles.globeGrid} />
            <div className={styles.globeShine} />
          </motion.div>
          
          {/* Main globe ring */}
          <motion.div
            className={styles.mainRing}
            animate={{ rotateZ: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Optimized Orbital Rings System */}
        <motion.div
          className={`${styles.orbitalRing} ${styles.ring1}`}
          animate={{ rotateZ: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className={`${styles.orbitalRing} ${styles.ring2}`}
          animate={{ rotateZ: -360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className={`${styles.orbitalRing} ${styles.ring3}`}
          animate={{ rotateZ: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating Elements - Distributed across screen */}
        <motion.div
          className={`${styles.floatingElement} ${styles.element1}`}
          custom={0}
          variants={elementVariants}
          animate={{
            y: [0, -15, 0],
            rotateY: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotateY: { duration: 10, repeat: Infinity, ease: "linear" },
            scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <Image
            src="/Image/Logo/TingNect/TingNect icon.svg"
            alt="Tech Icon"
            width={24}
            height={24}
            className={styles.elementIcon}
          />
        </motion.div>

        <motion.div
          className={`${styles.floatingElement} ${styles.element2}`}
          custom={1}
          variants={elementVariants}
          animate={{
            y: [0, 12, 0],
            rotateX: [0, 180, 360],
            scale: [1, 0.9, 1]
          }}
          transition={{
            y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
            rotateX: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <Image
            src="/Image/Logo/TingNect/TingNect icon.svg"
            alt="AI Icon"
            width={22}
            height={22}
            className={styles.elementIcon}
          />
        </motion.div>

        <motion.div
          className={`${styles.floatingElement} ${styles.element3}`}
          custom={2}
          variants={elementVariants}
          animate={{
            y: [0, -18, 0],
            rotateZ: [0, 360],
            scale: [1, 1.15, 1]
          }}
          transition={{
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            rotateZ: { duration: 12, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <Image
            src="/Image/Logo/TingNect/TingNect icon.svg"
            alt="Blockchain Icon"
            width={26}
            height={26}
            className={styles.elementIcon}
          />
        </motion.div>

        <motion.div
          className={`${styles.floatingElement} ${styles.element4}`}
          custom={3}
          variants={elementVariants}
          animate={{
            y: [0, 10, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.05, 1]
          }}
          transition={{
            y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 8.5, repeat: Infinity, ease: "linear" },
            scale: { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <Image
            src="/Image/Logo/TingNect/TingNect icon.svg"
            alt="Web3 Icon"
            width={20}
            height={20}
            className={styles.elementIcon}
          />
        </motion.div>

        {/* Floating Particles */}
        {floatingParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className={styles.particle}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              backgroundColor: particle.color,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            }}
            animate={{
              y: [0, -particle.amplitude, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 4 + particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}
      </motion.div>

      {/* Full Screen Ambient Light Effect */}
      <div className={styles.ambientLight} />
    </div>
  );
}
