'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  MapPin,
  Tag,
  ChevronDown,
  ExternalLink,
  Star,
} from 'lucide-react';
import styles from './MainContent.module.css';
import { EventData } from '@/data/events-data';

interface EventsListProps {
  events: EventData[];
  activeSection: string;
  selectedEvent: EventData | null;
  onEventClick: (event: EventData) => void;
  onCTAClick: (url: string) => void;
}

/**
 * Component hiển thị danh sách events có thể expand/collapse
 * Fetch data từ props (backend hoặc hardcoded)
 */
export default function EventsList({
  events,
  activeSection,
  selectedEvent,
  onEventClick,
  onCTAClick,
}: EventsListProps) {
  return (
    <div className={styles.eventsTable}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          className={styles.tableContent}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {events.length === 0 ? (
            <div className={styles.emptyState}>
              <Calendar size={36} className={styles.emptyIcon} />
              <h3>No {activeSection} events</h3>
              <p>Check back later for updates</p>
            </div>
          ) : (
            events.map((event, index) => (
              <div key={event.id} className={styles.eventItem}>
                {/* Event row (collapsible) */}
                <motion.div
                  className={`${styles.eventRow} ${event.featured ? styles.featured : ''}`}
                  onClick={() => onEventClick(event)}
                  whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.04)' }}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className={styles.eventMainInfo}>
                    <div className={styles.eventHeader}>
                      <h3 className={styles.eventTitle}>
                        {event.title}
                        {event.featured && <Star className={styles.featuredStar} size={14} />}
                      </h3>
                      <div className={styles.eventBadges}>
                        <span className={`${styles.statusBadge} ${styles[event.status]}`}>{event.status}</span>
                      </div>
                    </div>
                    <div className={styles.eventMeta}>
                      <div className={styles.metaRow}>
                        <Calendar size={12} />
                        <span>{event.date}</span>
                      </div>
                      <div className={styles.metaRow}>
                        <MapPin size={12} />
                        <span>{event.location}</span>
                      </div>
                      {event.image && (
                        <div className={styles.metaRow}>
                          <Image src={event.image} alt={event.title + ' banner'} className={styles.eventThumbImg} width={400} height={200} />
                        </div>
                      )}
                    </div>
                  </div>
                  <motion.div
                    className={styles.expandButton}
                    animate={{ rotate: selectedEvent?.id === event.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </motion.div>
                {/* Expandable details */}
                <AnimatePresence>
                  {selectedEvent?.id === event.id && (
                    <motion.div
                      className={styles.eventDetails}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className={styles.detailsContent}>
                        <div className={styles.detailsGrid}>
                          <div className={styles.detailItem}>
                            <Clock size={14} />
                            <span>{event.time}</span>
                          </div>
                          <div className={styles.detailItem}>
                            <Tag size={14} />
                            <span>{event.type}</span>
                          </div>
                          {event.price && (
                            <div className={styles.detailItem}>
                              <span className={styles.priceTag}>{event.price}</span>
                            </div>
                          )}
                          {event.sponsorLogo && (
                            <div className={styles.detailItem}>
                              <Image src={event.sponsorLogo} alt={event.title + ' sponsor logo'} className={styles.sponsorLogoSmall} width={100} height={40} />
                            </div>
                          )}
                        </div>
                        {event.description && (
                          <div className={styles.eventDescription}>
                            <p>{event.description}</p>
                          </div>
                        )}
                        {event.ctas && event.ctas.length > 0 && (
                          <div className={styles.ctaButtons}>
                            {event.ctas.map((cta, idx) => (
                              <motion.button
                                key={idx}
                                className={`${styles.ctaButton} ${styles[cta.type || 'primary']}`}
                                onClick={() => onCTAClick(cta.url)}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                              >
                                {cta.label}
                                <ExternalLink size={12} />
                              </motion.button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
