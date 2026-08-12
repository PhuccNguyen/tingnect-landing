// src/components/home/Hero/TrustedNetwork/TrustedNetwork.tsx
'use client';

import { motion } from 'framer-motion';
import { FaXTwitter, FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa6';
import { SOCIAL_LINKS } from '@/lib/constants';
import styles from './TrustedNetwork.module.css';

// Chi 4 kenh Yaa Club that su co. Cac kenh cu (Telegram, Discord, TikTok)
// da bo vi khong ton tai — icon tro toi tai khoan khong co la link chet.
const socialPlatforms = [
  { name: 'X (Twitter)', icon: FaXTwitter, url: SOCIAL_LINKS.twitter, external: true },
  { name: 'Facebook', icon: FaFacebook, url: SOCIAL_LINKS.facebook, external: true },
  { name: 'YouTube', icon: FaYoutube, url: SOCIAL_LINKS.youtube, external: true },
  { name: 'Instagram', icon: FaInstagram, url: SOCIAL_LINKS.instagram, external: false },
];

export default function TrustedNetwork() {
  return (
    <motion.div
      className={styles.trustedNetwork}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
    >
      <div className={styles.labelWrap}>
        <span className={styles.labelMain}>JOIN THE CLUB</span>
        <span className={styles.labelDivider}>-</span>
        <span className={styles.labelSub}>Follow us for launch updates</span>
      </div>

      <div className={styles.socialIcons}>
        {socialPlatforms.map((platform, i) => {
          const Icon = platform.icon;
          return (
            <motion.a
              key={platform.name}
              href={platform.url}
              {...(platform.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              aria-label={platform.name}
              className={styles.socialLink}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.1 + i * 0.06 }}
              whileHover={{ scale: 1.12, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className={styles.socialIcon} />
            </motion.a>
          );
        })}

        {/* Da bo con so "1M+ members": Yaa Club dang pre-launch, chua co
            nguoi dung nao — de nguyen la tuyen bo sai su that. */}
        <span className={styles.memberCount}>
          <span className={styles.memberDot} />
          Launching soon
        </span>
      </div>
    </motion.div>
  );
}
