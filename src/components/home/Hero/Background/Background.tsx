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
    
    return {
      x,
      y,
      vx,
      vy,
      trail: [],
      life: 0,
      maxLife: 120 + Math.random() * 60,
      size: 1 + Math.random() * 2
    };
  }, []);

  // Update particles
  const updateStardust = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    stardust.current.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life++;

      // Wrap around screen
      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;

      // Reset if life exceeded
      if (particle.life >= particle.maxLife) {
        particle.x = Math.random() * width;
        particle.y = Math.random() * height;
        particle.life = 0;
        particle.opacity = Math.random() * 0.8 + 0.2;
      }

      // Draw particle with twinkle effect
      const twinkle = Math.sin(particle.life * 0.1) * 0.3 + 0.7;
      const alpha = particle.opacity * twinkle * (1 - particle.life / particle.maxLife);
      
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = particle.color;
      ctx.shadowColor = particle.color;
      ctx.shadowBlur = particle.size * 2;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }, []);

  const updateNetworkNodes = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Update node positions and pulses
    networkNodes.current.forEach((node, i) => {
      node.x += node.vx;
      node.y += node.vy;
      node.pulse += node.pulseSpeed;

      // Bounce off edges
      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      // Keep in bounds
      node.x = Math.max(0, Math.min(width, node.x));
      node.y = Math.max(0, Math.min(height, node.y));

      // Find connections
      node.connections = [];
      networkNodes.current.forEach((otherNode, j) => {
        if (i !== j) {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
            node.connections.push(j);
          }
        }
      });
    });

    // Draw connections
    networkNodes.current.forEach((node, i) => {
      node.connections.forEach((connectionIndex) => {
        const otherNode = networkNodes.current[connectionIndex];
        const dx = node.x - otherNode.x;
        const dy = node.y - otherNode.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          const opacity = (200 - distance) / 200 * 0.15;
          const pulse = (Math.sin(node.pulse) + Math.sin(otherNode.pulse)) / 2;
          const finalOpacity = opacity * (0.5 + pulse * 0.3);
          
          ctx.save();
          ctx.globalAlpha = finalOpacity;
          ctx.strokeStyle = '#3b82f6';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(otherNode.x, otherNode.y);
          ctx.stroke();
          ctx.restore();
        }
      });
    });

    // Draw nodes
    networkNodes.current.forEach((node) => {
      const pulse = Math.sin(node.pulse);
      const size = 2 + pulse * 1;
      const opacity = 0.6 + pulse * 0.3;
      
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = '#60a5fa';
      ctx.shadowColor = '#60a5fa';
      ctx.shadowBlur = size * 2;
      ctx.beginPath();
      ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }, []);

  const updateShootingStars = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Add new shooting stars occasionally
    if (Math.random() < 0.002 && shootingStars.current.length < 3) {
      shootingStars.current.push(createShootingStar(width, height));
    }

    // Update existing shooting stars
    shootingStars.current = shootingStars.current.filter((star) => {
      star.x += star.vx;
      star.y += star.vy;
      star.life++;

      // Add to trail
      star.trail.push({ 
        x: star.x, 
        y: star.y, 
        opacity: 1 
      });

      // Limit trail length and fade
      if (star.trail.length > 20) {
        star.trail.shift();
      }
      
      star.trail.forEach((point, index) => {
        point.opacity = (index / star.trail.length) * 0.8;
      });

      // Draw trail
      star.trail.forEach((point, index) => {
        if (index > 0) {
          const prevPoint = star.trail[index - 1];
          ctx.save();
          ctx.globalAlpha = point.opacity;
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = star.size * (point.opacity * 2);
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(prevPoint.x, prevPoint.y);
          ctx.lineTo(point.x, point.y);
          ctx.stroke();
          ctx.restore();
        }
      });

      // Draw star head
      ctx.save();
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = star.size * 4;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Remove if out of bounds or life exceeded
      return star.x < width + 100 && star.y < height + 100 && 
             star.x > -100 && star.y > -100 && 
             star.life < star.maxLife;
    });
  }, [createShootingStar]);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Update all particle systems
    updateStardust(ctx, width, height);
    updateNetworkNodes(ctx, width, height);
    updateShootingStars(ctx, width, height);

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [updateStardust, updateNetworkNodes, updateShootingStars]);

  // Resize handler
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    canvas.width = width;
    canvas.height = height;
    
    setDimensions({ width, height });

    // Reinitialize particles with new dimensions
    initializeStardust(width, height);
    initializeNetworkNodes(width, height);
  }, [initializeStardust, initializeNetworkNodes]);

  // Initialize
  useEffect(() => {
    handleResize();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleResize, animate]);

  return (
    <div className={styles.background}>
      {/* Animated Canvas */}
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        style={{ 
          width: dimensions.width, 
          height: dimensions.height 
        }}
      />

      {/* Gradient Overlays */}
      <div className={styles.gradientOverlay} />
      
      {/* Mesh Gradients */}
      <motion.div 
        className={`${styles.meshGradient} ${styles.meshGradient1}`}
        animate={{ 
          x: [0, 100, 0], 
          y: [0, -50, 0],
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
          y: [0, 100, 0],
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
          y: [0, -80, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />

      {/* Ambient Light Effect */}
      <div className={styles.ambientLight} />
    </div>
  );
}
