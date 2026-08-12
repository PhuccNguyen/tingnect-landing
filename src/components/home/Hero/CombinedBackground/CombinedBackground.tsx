// src/components/home/Hero/CombinedBackground/CombinedBackground.tsx
'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './CombinedBackground.module.css';

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

  const stardust = useRef<StarParticle[]>([]);

  useEffect(() => {
    const checkPerformance = () => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const isLowEnd =
        navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
      setIsLowPerformance(isMobile || isLowEnd || window.innerWidth < 768);
    };
    checkPerformance();
    window.addEventListener('resize', checkPerformance);
    return () => window.removeEventListener('resize', checkPerformance);
  }, []);

  useEffect(() => {
    const colors = ['#ffffff', '#93c5fd', '#bfdbfe', '#d2ff00', '#dbeafe'];
    const particleCount = isLowPerformance ? 12 : 22;

    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 1.5 + Math.random() * 2,
      amplitude: 8 + Math.random() * 12,
    }));
    setFloatingParticles(newParticles);
  }, [isLowPerformance]);

  const initializeStardust = useCallback(
    (width: number, height: number) => {
      if (isLowPerformance) {
        stardust.current = [];
        return;
      }

      stardust.current = [];
      const particleCount = 70;

      for (let i = 0; i < particleCount; i++) {
        stardust.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          life: Math.random() * 200,
          maxLife: 200 + Math.random() * 200,
          size: Math.random() * 1.6 + 0.4,
          opacity: Math.random() * 0.6 + 0.3,
        });
      }
    },
    [isLowPerformance]
  );

  const updateStardust = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      if (isLowPerformance) return;

      stardust.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;

        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        if (particle.life >= particle.maxLife) {
          particle.x = Math.random() * width;
          particle.y = Math.random() * height;
          particle.life = 0;
          particle.opacity = Math.random() * 0.6 + 0.3;
        }

        const alpha =
          particle.opacity * (1 - particle.life / particle.maxLife) * 0.7;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#bfdbfe';
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    },
    [isLowPerformance]
  );

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.fillStyle = 'rgba(10, 10, 10, 0.08)';
    ctx.fillRect(0, 0, width, height);
    updateStardust(ctx, width, height);

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [updateStardust]);

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

  useEffect(() => {
    handleResize();
    if (!isLowPerformance) animate();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [handleResize, animate, isLowPerformance]);

  return (
    <div className={styles.combinedBackground}>


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
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
          }}
          animate={{
            y: [0, -particle.amplitude, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: 4 + particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}
