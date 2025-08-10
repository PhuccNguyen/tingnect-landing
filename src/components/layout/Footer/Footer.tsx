'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Github, 
  Twitter, 
  Send, 
  Youtube, 
  Facebook,
  BookOpen,
  Mail,
  MapPin,
  Phone,
  ArrowUp,
  ExternalLink
} from 'lucide-react';
import { socialLinks } from '@/data/social-links';
import styles from './Footer.module.css';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'ID Platform', href: '/id' },
  { name: 'Events', href: 'https://event.tingnect.com', external: true },
];

const resources = [
  { name: 'Documentation', href: 'https://docs.tingnect.com', external: true },
  { name: 'GitHub', href: 'https://github.com/TingNect', external: true },
  { name: 'Community', href: 'https://t.me/TingNectGroup', external: true },
  { name: 'Support', href: 'mailto:contact@tingnect.com', external: true },
];

const legal = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Cookie Policy', href: '/cookies' },
  { name: 'Disclaimer', href: '/disclaimer' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSocialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'github': return Github;
      case 'twitter/x': return Twitter;
      case 'telegram channel':
      case 'telegram group': return Send;
      case 'youtube': return Youtube;
      case 'facebook page':
      case 'facebook group': return Facebook;
      case 'documentation': return BookOpen;
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
              <Link href="/" className={styles.brandLink}>
                <div className={styles.logoWrapper}>
                  <Image
                    src="/Image/Logo/TingNect/TingNect icon.svg"
                    alt="TingNect"
                    width={40}
                    height={40}
                    className={styles.logo}
                  />
                  <div className={styles.logoGlow} />
                </div>
                <span className={styles.brandName}>TingNect</span>
              </Link>
              <p className={styles.tagline}>Build for Billions</p>
            </motion.div>

            <motion.p 
              className={styles.description}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Premier platform uniting developers, entrepreneurs, investors, and tech enthusiasts 
              in shaping a sustainable Web3 ecosystem for billions of users worldwide.
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
                <a href="mailto:contact@tingnect.com">contact@tingnect.com</a>
              </div>
              <div className={styles.contactItem}>
                <MapPin size={16} />
                <span>Ho Chi Minh City, Vietnam</span>
              </div>
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
              © {new Date().getFullYear()} TingNect. All rights reserved.
            </motion.p>
            
            <motion.div 
              className={styles.partnerLogos}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className={styles.poweredBy}>Powered by</span>
              <Image
                src="/Image/Logo/TingFoundation/TingFoundation-white.svg"
                alt="Ting Foundation"
                width={100}
                height={24}
                className={styles.partnerLogo}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
