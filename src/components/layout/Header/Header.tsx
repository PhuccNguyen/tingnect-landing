'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Lock, Folder } from 'lucide-react';
import styles from './Header.module.css'; // Import file CSS Module

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Heads', href: '#', icon: <Lock size={15} />, locked: true },
    { name: 'Tingnect Club', href: '/', active: pathname === '/' },
    { name: 'Docs', href: '/faq', icon: <Folder size={15} fill="currentColor" style={{ color: '#60A5FA' }} /> },
    { name: '$TING', href: '#', icon: <Lock size={15} />, locked: true },
    { name: 'Store', href: '#', icon: <Lock size={15} />, locked: true },
  ];

  return (
    <header className={styles.header}>
      
      {/* 1. TRÁI: LOGO AREA */}
      <Link href="/" className={styles.logoGroup}>
        <div className={styles.logoCircle}>
          <Image
            src="/Image/Logo/TingnectNew/TingNect icon black.png"
            alt="Tingnect Icon"
            width={44}
            height={44}
          />
        </div>
        
        <div className={styles.textGroup}>
          <span className={styles.byText}>BY</span>
          <div className={styles.textGroup}>

            
            {/* Thay thế span brandText bằng Image logo */}
            <Image
              src="/Image/Logo/TingnectNew/logo-tingnect-white-test.png"
              alt="Tingnect"
              width={120} /* Chỉnh số này to nhỏ để vừa mắt */
              height={50} /* Chiều cao tương đương chữ text cũ */
              style={{ objectFit: 'contain' }}
              priority
            />
            
          </div>
        </div>
      </Link>

      {/* 2. PHẢI: DESKTOP NAV */}
      <nav className={styles.desktopNav}>
        {navItems.map((item) => {
          
          // NÚT ĐANG CHỌN (Màu trắng chữ đen)
          if (item.active) {
            return (
              <Link key={item.name} href={item.href} className={`${styles.navItem} ${styles.navItemActive}`}>
                <div className={styles.activeIconCircle}>
                  <Image 
            src="/Image/Logo/TingnectNew/TingNect icon black.png"
            alt="Tingnect Icon"
            width={28}
            height={28} 
                  />
                </div>
                {item.name}
              </Link>
            );
          }

          // CÁC NÚT CÒN LẠI (Glassmorphism)
          return (
            <Link
              key={item.name}
              href={item.locked ? '#' : item.href}
              onClick={(e) => item.locked && e.preventDefault()}
              className={`${styles.navItem} ${item.locked ? styles.navItemLocked : ''}`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* 3. PHẢI: MOBILE MENU BUTTON */}
      <button
        className={styles.mobileBtn}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Menu"
      >
        <div className={styles.hamburgerLine} />
        <div className={styles.hamburgerLine} />
      </button>
      
    </header>
  );
}