'use client';

import { motion } from 'framer-motion';
import { FaXTwitter, FaTelegram, FaDiscord, FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa6';
import styles from './TrustRow.module.css';

const socialPlatforms = [
  { name: 'X (Twitter)', icon: FaXTwitter, url: 'https://x.com/tingnect' },
  { name: 'Telegram', icon: FaTelegram, url: 'https://t.me/tingnect' },
  { name: 'Discord', icon: FaDiscord, url: 'https://discord.gg/tingnect' },
  { name: 'YouTube', icon: FaYoutube, url: 'https://youtube.com/@tingnect' },
  { name: 'Instagram', icon: FaInstagram, url: 'https://instagram.com/tingnect' },
  { name: 'TikTok', icon: FaTiktok, url: 'https://tiktok.com/@tingnect' },
];

export default function TrustRow() {
  return (
    <motion.div
      className={styles.trustRow}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
    >
      <div className={styles.labelWrap}>
        <span className={styles.labelMain}>TRUSTED NETWORK</span>
        <span className={styles.labelDivider}>—</span>
        <span className={styles.labelSub}>Join our community</span>
      </div>

      <div className={styles.socialIcons}>
        {socialPlatforms.map((platform, i) => {
          const Icon = platform.icon;
          return (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={platform.name}
              className={styles.socialLink}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.4 + i * 0.08 }}
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={18} />
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  );
}
