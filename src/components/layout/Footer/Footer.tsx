'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, ArrowUp, ExternalLink, Send } from 'lucide-react';
// Icon social lay tu react-icons: lucide da deprecate Twitter/Facebook,
// va fa6 co san glyph X (Twitter) dung chuan thuong hieu moi.
import { FaXTwitter, FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa6';
import { socialLinks } from '@/data/social-links';
import { SITE_CONFIG } from '@/lib/constants';
import Logo from '../Logo/Logo';
import styles from './Footer.module.css';

// Yaa Club dang pre-launch: cac muc chua co trang that deu tro ve '#' thay vi
// link toi route khong ton tai (/products, /blog, /faq... da bi xoa khoi du an).
interface FooterLink {
  name: string;
  href: string;
  external?: boolean;
}

const quickLinks: FooterLink[] = [
  { name: 'Home', href: '/' },
  { name: 'Communities', href: '#' },
  { name: 'Events', href: '#' },
  { name: 'Bookings', href: '#' },
];

const resources: FooterLink[] = [
  { name: 'List a Venue', href: '#' },
  { name: 'Host an Event', href: '#' },
  { name: 'Manage Events', href: '#' },
  { name: 'Support', href: `mailto:${SITE_CONFIG.email}`, external: true },
];

const legal: FooterLink[] = [
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms of Service', href: '#' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSocialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'x (twitter)': return FaXTwitter;
      case 'facebook': return FaFacebook;
      case 'youtube': return FaYoutube;
      case 'instagram': return FaInstagram;
      default: return ExternalLink;
    }
  };

  return (
    <footer className={styles.footer}>
      {/* Main Footer Content */}
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Company Info */}
          <div className={styles.companySection}>
            <motion.div 
              className={styles.brand}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/" className={styles.brandLink} aria-label="Yaa Club — trang chủ">
                <Logo variant="inverted" orientation="horizontal" height={34} />
              </Link>
              <p className={styles.tagline}>{SITE_CONFIG.slogan}</p>
            </motion.div>

            <motion.p 
              className={styles.description}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Discover clubs, join communities, book sports activities and organize events,
              all in one place. Pickleball, yoga, run club, football, padel and more.
            </motion.p>

            {/* Contact Info */}
            <motion.div 
              className={styles.contactInfo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className={styles.contactItem}>
                <Mail size={16} />
                <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>
              </div>
              {/* Da bo dong dia chi "Ho Chi Minh City, Vietnam": khong co
                  nguon nao xac nhan dia chi doanh nghiep cua Yaa Club. */}
            </motion.div>
          </div>

          {/* Links Sections */}
          <div className={styles.linksGrid}>
            {/* Quick Links */}
            <motion.div 
              className={styles.linkSection}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className={styles.sectionTitle}>Quick Links</h3>
              <ul className={styles.linksList}>
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.footerLink}
                      >
                        {link.name}
                        <ExternalLink size={12} />
                      </a>
                    ) : (
                      <Link href={link.href} className={styles.footerLink}>
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div 
              className={styles.linkSection}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className={styles.sectionTitle}>Resources</h3>
              <ul className={styles.linksList}>
                {resources.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.footerLink}
                    >
                      {link.name}
                      <ExternalLink size={12} />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div 
              className={styles.linkSection}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className={styles.sectionTitle}>Legal</h3>
              <ul className={styles.linksList}>
                {legal.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className={styles.footerLink}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Social & Newsletter */}
          <div className={styles.socialSection}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className={styles.sectionTitle}>Stay Connected</h3>
              <p className={styles.socialDescription}>
                Join our community and stay updated with the latest news
              </p>

              {/* Social Links */}
              <div className={styles.socialLinks}>
                {socialLinks.slice(0, 6).map((social, index) => {
                  const IconComponent = getSocialIcon(social.name);
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <IconComponent size={20} />
                      <span className={styles.tooltip}>{social.name}</span>
                    </motion.a>
                  );
                })}
              </div>

              {/* Newsletter Signup */}
              <div className={styles.newsletter}>
                <h4 className={styles.newsletterTitle}>Get Updates</h4>
                <div className={styles.newsletterForm}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={styles.newsletterInput}
                  />
                  <button className={styles.newsletterButton}>
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Back to Top */}
        <motion.button
          className={styles.backToTop}
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <ArrowUp size={20} />
        </motion.button>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.container}>
          <div className={styles.bottomContent}>
            <motion.p 
              className={styles.copyright}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
}
