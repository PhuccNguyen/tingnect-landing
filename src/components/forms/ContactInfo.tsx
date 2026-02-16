import React from 'react';
import styles from './ContactForm.module.css';

export const ContactInfo: React.FC = () => (
  <div className={styles.contactInfo}>
    <div className={styles.contactGrid}>
      <div className={styles.contactItem}>
        <h3>Direct Contact</h3>
        <p>Email: contact@tingnect.com</p>
        <p>Telegram: @tingnect_official</p>
      </div>
      <div className={styles.contactItem}>
        <h3>Response Time</h3>
        <p>Within 24 hours</p>
        <p>Mon - Fri: 9:00 - 18:00 (GMT+7)</p>
      </div>
    </div>
  </div>
);
