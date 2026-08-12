// src/components/home/FloatingDownloadCTA/FloatingDownloadCTA.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Logo from '@/components/layout/Logo/Logo';
import { SOCIAL_LINKS } from '@/lib/constants';
import styles from './FloatingDownloadCTA.module.css';


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
    // App chua len App Store / Google Play. Link toi store se ra trang loi,
    // nen truoc mat dua nguoi dung sang X de theo doi ngay ra mat.
    window.open(SOCIAL_LINKS.twitter, '_blank', 'noopener,noreferrer');
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
            <Logo variant="standard" orientation="icon" height={22} className={styles.appIcon} />
          </div>

          <div className={styles.content}>
            <p className={styles.title}>Yaa Club is coming</p>
            <p className={styles.subtitle}>Follow us on X for launch</p>
          </div>
          
          <button className={styles.closeBtn} onClick={handleDismiss} aria-label="Close">
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}