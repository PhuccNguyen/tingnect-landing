'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import styles from './MainContent.module.css';
import { EventData } from '@/data/events-data';
import FeaturedEventCard from './FeaturedEventCard';
import EventTabsSection from './EventTabsSection';
import EventsList from './EventsList';

interface EventsSectionProps {
  eventsData: Record<string, EventData[]>;
  onCTAClick: (url: string) => void;
}

/**
 * Component chứa toàn bộ Events section:
 * - Header với live badge
 * - Featured event card
 * - Tab lọc events
 * - Events list
 *
 * Có thể fetch từ backend thông qua useEvents hook
 */
export default function EventsSection({
  eventsData,
  onCTAClick,
}: EventsSectionProps) {
  const [activeSection, setActiveSection] = useState<'current' | 'upcoming' | 'past'>('current');
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  // Lấy tất cả event nổi bật (featured) của section
  const featuredEvents = useMemo(() => {
    const section = eventsData[activeSection] || [];
    return section.filter((event) => event.featured);
  }, [eventsData, activeSection]);

  // Lấy danh sách events (loại bỏ featured)
  const activeEvents = useMemo(() => {
    const sectionEvents = eventsData[activeSection] || [];
    return sectionEvents.filter((event) => !event.featured);
  }, [eventsData, activeSection]);

  const handleEventClick = (event: EventData) => {
    setSelectedEvent(selectedEvent?.id === event.id ? null : event);
  };

  return (
    <div className={styles.eventsSection}>
      {/* Header với live badge */}
      <div className={styles.eventsHeader}>
        <h2 className={styles.sectionTitle}>
          <Calendar className={styles.sectionIcon} size={20} />
          Events & Updates
        </h2>
        <div className={styles.liveBadge}>
          <motion.div
            className={styles.liveDot}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <span>Live</span>
        </div>
      </div>

      {/* Hiển thị tất cả event nổi bật (có thể nhiều) */}
      {featuredEvents.length > 0 && (
        <div className={styles.featuredEventsList}>
          {featuredEvents.map((event) => (
            <FeaturedEventCard key={event.id} event={event} onCTAClick={onCTAClick} />
          ))}
        </div>
      )}

      {/* Section tabs */}
      <EventTabsSection
        eventsData={eventsData}
        activeSection={activeSection}
        onSectionChange={(section: string) => setActiveSection(section as 'current' | 'upcoming' | 'past')}
      />

      {/* Events list */}
      <EventsList
        events={activeEvents}
        activeSection={activeSection}
        selectedEvent={selectedEvent}
        onEventClick={handleEventClick}
        onCTAClick={onCTAClick}
      />
    </div>
  );
}
