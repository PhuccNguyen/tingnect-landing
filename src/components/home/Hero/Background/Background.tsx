'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Background.module.css';

// Particle system interfaces
interface StarParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
  color: string;
}

interface NetworkNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
  pulse: number;
  pulseSpeed: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  trail: { x: number; y: number; opacity: number }[];
  life: number;
  maxLife: number;
  size: number;
}

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Particle arrays
  const stardust = useRef<StarParticle[]>([]);
  const networkNodes = useRef<NetworkNode[]>([]);
  const shootingStars = useRef<ShootingStar[]>([]);

  // Initialize particles
  const initializeStardust = useCallback((width: number, height: number) => {
    stardust.current = [];
    const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];

    for (let i = 0; i < 150; i++) {
      stardust.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        life: Math.random() * 300,
        maxLife: 300 + Math.random() * 200,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }, []);

  const initializeNetworkNodes = useCallback((width: number, height: number) => {
    networkNodes.current = [];
    const nodeCount = 20;

    for (let i = 0; i < nodeCount; i++) {
      networkNodes.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        connections: [],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02
      });
    }
  }, []);

  const createShootingStar = useCallback((width: number, height: number) => {
    const isHorizontal = Math.random() > 0.5;
    let x, y, vx, vy;

    if (isHorizontal) {
      x = -50;
      y = Math.random() * height * 0.6; // Upper 60% of screen
      vx = 3 + Math.random() * 4;
      vy = (Math.random() - 0.5) * 2;
    } else {
      x = Math.random() * width;
      y = -50;
      vx = (Math.random() - 0.5) * 3;
      vy = 2 + Math.random() * 3;
    }

    shootingStars.current.push({
      x,
      y,
      vx,
      vy,
      trail: [],
      life: 0,
      maxLife: 100 + Math.random() * 50,
      size: 2 + Math.random() * 2
    });
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = dimensions;

    // Clear canvas with fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, width, height);

    // Update and draw stardust
    stardust.current.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life++;

      // Wrap around edges
      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;

      // Fade out near end of life
      const lifeRatio = particle.life / particle.maxLife;
      const currentOpacity = particle.opacity * (1 - lifeRatio);

      if (currentOpacity > 0.01) {
        ctx.save();
        ctx.globalAlpha = currentOpacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else {
        // Reset particle
        particle.life = 0;
        particle.x = Math.random() * width;
        particle.y = Math.random() * height;
      }
    });

    // Update and draw network nodes
    networkNodes.current.forEach((node) => {
      node.x += node.vx;
      node.y += node.vy;
      node.pulse += node.pulseSpeed;

      // Wrap around edges
      if (node.x < 0) node.x = width;
      if (node.x > width) node.x = 0;
      if (node.y < 0) node.y = height;
      if (node.y > height) node.y = 0;

      // Draw connections
      networkNodes.current.forEach((otherNode) => {
        if (node !== otherNode) {
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
          );

          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.3;
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      });

      // Draw node
      const pulseOpacity = 0.5 + Math.sin(node.pulse) * 0.3;
      ctx.save();
      ctx.globalAlpha = pulseOpacity;
      ctx.fillStyle = '#8b5cf6';
      ctx.beginPath();
      ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // Update and draw shooting stars
    shootingStars.current.forEach((star, index) => {
      star.x += star.vx;
      star.y += star.vy;
      star.life++;

      // Add trail point
      star.trail.push({
        x: star.x,
        y: star.y,
        opacity: 1
      });

      // Limit trail length
      if (star.trail.length > 20) {
        star.trail.shift();
      }

      // Fade trail
      star.trail.forEach((point, trailIndex) => {
        point.opacity = (star.trail.length - trailIndex) / star.trail.length;
      });

      // Draw trail
      star.trail.forEach((point, trailIndex) => {
        const trailOpacity = point.opacity * 0.8;
        ctx.save();
        ctx.globalAlpha = trailOpacity;
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(point.x, point.y, star.size * (trailIndex / star.trail.length), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Remove if off screen or life ended
      if (star.x > width + 100 || star.y > height + 100 || star.life > star.maxLife) {
        shootingStars.current.splice(index, 1);
      }
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [dimensions]);

  // Handle resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    canvas.width = width;
    canvas.height = height;

    setDimensions({ width, height });
    initializeStardust(width, height);
    initializeNetworkNodes(width, height);
  }, [initializeStardust, initializeNetworkNodes]);

  useEffect(() => {
    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    if (canvasRef.current) {
      resizeObserver.observe(canvasRef.current);
    }

    // Start animation
    animate();

    // Create shooting stars occasionally
    const shootingStarInterval = setInterval(() => {
      if (Math.random() < 0.02) { // 2% chance per frame
        createShootingStar(dimensions.width, dimensions.height);
      }
    }, 100);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameRef.current);
      clearInterval(shootingStarInterval);
    };
  }, [handleResize, animate, createShootingStar, dimensions]);

  return (
    <motion.canvas
      ref={canvasRef}
      className={styles.backgroundCanvas}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1
      }}
    />
  );
}