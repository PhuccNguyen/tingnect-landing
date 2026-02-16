'use client';

import { motion } from 'framer-motion';
import styles from './MainContent.module.css';

interface EventTabsSectionProps {
  eventsData: Record<string, any[]>;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

/**
 * Component hiển thị tab section để lọc events (current, upcoming, past)
 * Fetch từ props data (có thể bll từ backend)
 */
export default function EventTabsSection({
  eventsData,
  activeSection,
  onSectionChange,
}: EventTabsSectionProps) {
  return (
    <div className={styles.sectionTabs}>
      {Object.keys(eventsData).map((section) => {
        const count = eventsData[section].length;
        return (
          <motion.button
            key={section}
            className={`${styles.sectionTab} ${
              activeSection === section ? styles.activeTab : ''
            }`}
            onClick={() => onSectionChange(section)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            disabled={count === 0}
          >
            <span className={styles.tabLabel}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </span>
            <span className={styles.tabCount}>{count}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
