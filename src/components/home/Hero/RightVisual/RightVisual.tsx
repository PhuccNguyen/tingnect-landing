'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Variants, Transition, easeOut } from 'framer-motion';

import styles from './RightVisual.module.css';

const RightVisual: React.FC = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  const logoVariants: Variants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut } // ✅ dùng function
    }
  };

  const globeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: easeOut, delay: 0.2 }
    }
  };

  // Vì elementVariants sử dụng function nên cần khai báo rõ kiểu
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
    <motion.div
      className={styles.rightVisual}
      initial="hidden"
      animate="visible"
    >
      {/* Logo Group - Top Right */}
      <motion.div className={styles.logoGroup} variants={logoVariants}>
        <div className={styles.logoContainer}>
          <motion.div
            className={styles.logoWrapper}
            whileHover={{
              scale: 1.1,
              rotateY: 10,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className={styles.logoBackground} />
            <Image
              src="/Image/Logo/TingNect/TingNect.svg"

              alt="TingNect"
              width={168}
              height={98}
              className={styles.logoIcon}
            />
            <div className={styles.logoGlow} />
          </motion.div>
        </div>

        <div className={styles.logoSeparator} />

        <div className={styles.logoContainer}>
          <motion.div
            className={styles.logoWrapper}
            whileHover={{
              scale: 1.1,
              rotateY: -10,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className={styles.logoBackground} />
            <Image
              src="/Image/Logo/TingFoundation/TingFoundation-white.svg"

              alt="Ting Foundation"
              width={208}
              height={128}
              className={styles.logoIcon}
            />
            <div className={styles.logoGlow} />
          </motion.div>
        </div>
      </motion.div>


      {/* Background Glow */}
      <div className={styles.backgroundGlow} />

      {/* 3D Globe - Center */}
    <motion.div className={styles.globe} variants={globeVariants}>
      <motion.div
        className={styles.globeInner}
        initial={{ rotateX: -20, rotateY: 0 }}
        animate={{ rotateY: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <div className={styles.globeGrid} />
        <div className={styles.globeShine} />
      </motion.div>
      <motion.div
        className={styles.ring}
        animate={{ rotateZ: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>

      {/* Orbital Rings */}
      <motion.div
        className={`${styles.orbitalRing} ${styles.ring1}`}
        animate={{ rotateZ: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className={`${styles.orbitalRing} ${styles.ring2}`}
        animate={{ rotateZ: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className={`${styles.orbitalRing} ${styles.ring3}`}
        animate={{ rotateZ: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating Elements with Logo Icons */}
      <motion.div
        className={`${styles.floatingElement} ${styles.element1}`}
        custom={0}
        variants={elementVariants}
        animate={{
          y: [0, -10, 0],
          rotateY: [0, 180, 360]
        }}
        transition={{
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          rotateY: { duration: 8, repeat: Infinity, ease: "linear" }
        }}
      >
        <Image
          src="/Image/Logo/TingNect/TingNect icon.svg"
          alt="Blockchain"
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
          y: [0, 10, 0],
          rotateX: [0, 180, 360]
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotateX: { duration: 6, repeat: Infinity, ease: "linear" }
        }}
      >
        <Image
          src="/Image/Logo/TingFoundation/TingFoundation-icon.svg"
          alt="AI"
          width={24}
          height={24}
          className={styles.elementIcon}
        />
      </motion.div>

      <motion.div
        className={`${styles.floatingElement} ${styles.element3}`}
        custom={2}
        variants={elementVariants}
        animate={{
          y: [0, -15, 0],
          rotateZ: [0, 360]
        }}
        transition={{
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          rotateZ: { duration: 10, repeat: Infinity, ease: "linear" }
        }}
      >
        <Image
          src="/Image/Logo/TingNect/TingNect icon.svg"
          alt="Web3"
          width={24}
          height={24}
          className={styles.elementIcon}
        />
      </motion.div>


      <motion.div
        className={`${styles.floatingElement} ${styles.element4}`}
        custom={3}
        variants={elementVariants}
        animate={{
          y: [0, 8, 0],
          rotate: [0, 180, 360]
        }}
        transition={{
          y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 6.5, repeat: Infinity, ease: "linear" }
        }}
      >
        <Image
          src="/Image/Logo/TingFoundation/TingFoundation-icon.svg"
          alt="AI Tech"
          width={20}
          height={20  }
          className={styles.elementIcon}
        />
      </motion.div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={styles.particle}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3 + particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </motion.div>
  );
};

export default RightVisual;
