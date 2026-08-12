// src/components/home/FloatingDownloadCTA/FloatingDownloadCTA.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone } from 'lucide-react';
import styles from './FloatingDownloadCTA.module.css';
import Image from 'next/image';


export default function FloatingDownloadCTA() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Không cần isDismissed nữa, vì cứ load lại là làm mới từ đầu
  const [isClosedNow, setIsClosedNow] = useState(false); 

  /* ========================================================
     KÍCH HOẠT HIỂN THỊ: Luôn luôn hiện sau 2.5s mỗi khi F5
     ======================================================== */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2500); // Vẫn giữ delay 2.5s để mượt mắt, bác có thể sửa thành 1000 nếu muốn lẹ hơn
    return () => clearTimeout(timer);
  }, []);

  /* ========================================================
     DEEP TECH CORE: TRUYỀN TÍN HIỆU ĐẨY CHAT WIDGET LÊN TRÊN
     ======================================================== */
  useEffect(() => {
    if (isVisible && !isClosedNow) {
      document.documentElement.style.setProperty('--cta-offset', '90px');
    } else {
      document.documentElement.style.setProperty('--cta-offset', '0px');
    }
    
    return () => document.documentElement.style.setProperty('--cta-offset', '0px');
  }, [isVisible, isClosedNow]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    setIsClosedNow(true); 
    // ĐÃ XÓA LOCAL STORAGE Ở ĐÂY -> Load lại trang là quên ngay!
  };

  const handleClick = () => {
    const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/i.test(ua)) {
      window.open('https://apps.apple.com/app/tingnect', '_blank');
    } else if (/Android/i.test(ua)) {
      window.open('https://play.google.com/store/apps/details?id=com.tingnect', '_blank');
    } else {
      const el = document.getElementById('download');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && !isClosedNow && (
<motion.div
          className={styles.floatingCTA}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={handleClick}
        >
          {/* Lớp hào quang Vercel-style chìm bên dưới */}
          <div className={styles.glowEffect} />

          <div className={styles.imageWrapper}>
            <Image 
              src="/Image/Logo/TingnectNew/TingNect icon black.png" 
              alt="TingNect App Icon"
              width={26}
              height={26}
              className={styles.appIcon}
            />
          </div>
          
          <div className={styles.content}>
            <p className={styles.title}>Get TingNect App</p>
            <p className={styles.subtitle}>Build for Billions & Earn</p>
          </div>
          
          <button className={styles.closeBtn} onClick={handleDismiss} aria-label="Close">
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}