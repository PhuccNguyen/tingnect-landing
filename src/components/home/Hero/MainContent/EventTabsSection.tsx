'use client';

import { motion } from 'framer-motion';
import styles from './MainContent.module.css';

interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image?: string;
  status: 'current' | 'upcoming' | 'past';
}

interface EventTabsSectionProps {
  eventsData: Record<string, EventItem[]>;
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
  const sections = Object.keys(eventsData);

  return (
    <div className={styles.eventTabsSection}>
      {/* Tab Navigation */}
      <div className={styles.tabsContainer}>
        {sections.map((section) => (
          <motion.button
            key={section}
            className={`${styles.tabButton} ${
              activeSection === section ? styles.active : ''
            }`}
            onClick={() => onSectionChange(section)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)} Events
            <span className={styles.eventCount}>
              ({eventsData[section]?.length || 0})
            </span>
          </motion.button>
        ))}
      </div>

      {/* Events Grid */}
      <motion.div
        className={styles.eventsGrid}
        key={activeSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {eventsData[activeSection]?.map((event) => (
          <motion.div
            key={event.id}
            className={styles.eventCard}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {event.image && (
              <div className={styles.eventImage}>
                <img src={event.image} alt={event.title} />
              </div>
            )}
            <div className={styles.eventContent}>
              <h3 className={styles.eventTitle}>{event.title}</h3>
              <p className={styles.eventDate}>{event.date}</p>
              <p className={styles.eventLocation}>{event.location}</p>
              <p className={styles.eventDescription}>{event.description}</p>
            </div>
          </motion.div>
        )) || (
          <div className={styles.noEvents}>
            <p>No {activeSection} events available.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}