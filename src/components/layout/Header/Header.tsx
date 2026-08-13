'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Lock } from 'lucide-react';
import Logo from '../Logo/Logo';
import styles from './Header.module.css'; // Import file CSS Module

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // App dang pre-launch: cac muc chua co trang that deu khoa lai thay vi
  // tro toi link chet. Nhan theo Nav map trong tai lieu brand.
  const navItems = [
    { name: 'Discover', href: '/', active: pathname === '/' },
    { name: 'Communities', href: '#', icon: <Lock size={15} />, locked: true },
    { name: 'Events', href: '#', icon: <Lock size={15} />, locked: true },
    { name: 'Bookings', href: '#', icon: <Lock size={15} />, locked: true },
    { name: 'For Organizers', href: '#', icon: <Lock size={15} />, locked: true },
  ];

  return (
    <header className={styles.header}>
      
      {/* 1. TRÁI: LOGO AREA */}
      <Link href="/" className={styles.logoGroup} aria-label="Yaa Club — trang chủ">
        <div className={styles.logoCircle}>
          <Logo variant="inverted" orientation="icon" height={34} priority />
        </div>
        <div className={styles.textGroup}>
          <span className={styles.byText}>BY</span>
          <span className={styles.brandText}>YAACLUB</span>
        </div>
      </Link>

      {/* 2. PHẢI: DESKTOP NAV */}
      <nav className={styles.desktopNav}>
        {navItems.map((item) => {
          
          // NÚT ĐANG CHỌN (Màu trắng chữ đen)
          if (item.active) {
            return (
              <Link key={item.name} href={item.href} className={`${styles.navItem} ${styles.navItemActive}`}>
                {/* Vòng tròn nền = --surface (xanh đậm) nên icon phải bản kem */}
                <div className={styles.activeIconCircle}>
                  <Logo variant="inverted" orientation="icon" height={18} />
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