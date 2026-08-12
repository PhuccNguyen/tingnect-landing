// This file has been removed as it is no longer in use.
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Calendar,
  MapPin,
  Crown,
  Sparkles,
  Award,
  Star,
  Trophy,
} from 'lucide-react';
import styles from './MainContent.module.css';
import { EventData } from '@/data/events-data';

interface FeaturedEventCardProps {
  event: EventData;
  onCTAClick: (url: string) => void;
}

/**
 * Component hiển thị featured event card (event đặc biệt, luôn expand)
 * Chứa banner, metadata chips, timeline, CTA buttons
 */
export default function FeaturedEventCard({ event, onCTAClick }: FeaturedEventCardProps) {
  // Badge động theo status.
  // Key phải khớp đúng EventData['status'] = 'upcoming' | 'current' | 'past'.
  const statusBadge: { label: string; className: string } = {
    upcoming: { label: 'Upcoming', className: styles.upcomingBadge },
    current: { label: 'Ongoing', className: styles.currentBadge },
    past: { label: 'Completed', className: styles.pastBadge },
  }[event.status] || { label: event.status, className: styles.currentBadge };

  return (
    <motion.div
      className={styles.featuredEventCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -2 }}
    >
      {/* Banner với sponsor logo và hình ảnh event */}
      <div className={styles.featuredBanner}>
        <div className={styles.bannerGradient} />
        <div className={styles.featuredBadge}>
          <Crown size={12} />
          <span>Premier Showcase</span>
        </div>
        {event.sponsorLogo && (
          <motion.div
            className={styles.floatingIcons}
            animate={{ y: [-5, 5, -5], scale: [1, 1.05, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image
              src={event.sponsorLogo}
              alt={event.title + ' sponsor logo'}
              width={90}
              height={90}
              className={styles.sponsorLogo}
            />
          </motion.div>
        )}
        {event.image && (
          <Image
            src={event.image}
            alt={event.title + ' banner'}
            width={320}
            height={120}
            className={styles.eventBannerImg}
          />
        )}
      </div>

      {/* Nội dung event */}
      <div className={styles.featuredContent}>
        <div className={styles.featuredHeader}>
          <div className={styles.titleBadgeContainer}>
            <div className={styles.statusBadges}>
              <span className={statusBadge.className}>
                <motion.div
                  className={styles.pulsingDot}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                {statusBadge.label}
              </span>
            </div>
          </div>
        </div>

        {/* Meta chips */}
        <div className={styles.featuredMeta}>
          <div className={styles.metaChips}>
            <motion.div
              className={styles.metaChip}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -1, scale: 1.02 }}
            >
              <MapPin size={14} />
              <span>{event.location}</span>
            </motion.div>

            <div className={styles.chipSeparator}>•</div>

            <motion.div
              className={styles.metaChip}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -1, scale: 1.02 }}
            >
              <Crown size={14} />
              <span>{event.type}</span>
            </motion.div>

            <div className={styles.chipSeparator}>•</div>

            <motion.div
              className={styles.metaChip}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -1, scale: 1.02 }}
            >
              <Calendar size={14} />
              <span>{event.date}</span>
            </motion.div>
          </div>
        </div>

        {/* Description */}
        <div className={styles.featuredDescription}>
          <motion.div
            className={styles.descriptionContent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Sparkles size={16} className={styles.descriptionIcon} />
            <p>{event.description}</p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className={styles.timelineSection}>
          <motion.div
            className={styles.timelineHeader}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Award size={16} />
            <span>Competition Timeline</span>
            <div className={styles.timelineHeaderLine}></div>
          </motion.div>

          <div className={styles.neonRail}>
            <div className={styles.railLine}></div>

            {/* Timeline items - tĩnh data, có thể fetch từ BE */}
            <motion.div
              className={styles.railItem}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className={`${styles.railDot} ${styles.activeDot}`}>
                <motion.div
                  className={styles.dotPulse}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span>1</span>
              </div>
              <div className={styles.railContent}>
                <div className={styles.railPhase}>Press Conference</div>
                <div className={styles.railDate}>September 27, 2025</div>
                <div className={styles.railTime}>16:00 - 21:00 ICT</div>
              </div>
            </motion.div>

            <motion.div
              className={styles.railItem}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className={styles.railDot}>
                <span>2</span>
              </div>
              <div className={styles.railContent}>
                <div className={styles.railPhase}>Preliminary Round</div>
                <div className={styles.railDate}>October 5 - November 25, 2025</div>
                <div className={styles.railTime}>Selection & Screening</div>
              </div>
            </motion.div>

            <motion.div
              className={styles.railItem}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className={styles.railDot}>
                <span>3</span>
              </div>
              <div className={styles.railContent}>
                <div className={styles.railPhase}>Semi-Final</div>
                <div className={styles.railDate}>December 15, 2025</div>
                <div className={styles.railTime}>Top Contestants Compete</div>
              </div>
            </motion.div>

            <motion.div
              className={styles.railItem}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
            >
              <div className={styles.railDot}>
                <span>4</span>
              </div>
              <div className={styles.railContent}>
                <div className={styles.railPhase}>Charity Night</div>
                <div className={styles.railSubtitle}>
                  &quot;Compassionate Students — Wings of Dreams&quot;
                </div>
                <div className={styles.railDate}>December 18, 2025</div>
                <div className={styles.railTime}>Humanitarian Event</div>
              </div>
            </motion.div>

            <motion.div
              className={styles.railItem}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
            >
              <div className={`${styles.railDot} ${styles.finalDot}`}>
                <Crown size={12} />
              </div>
              <div className={styles.railContent}>
                <div className={`${styles.railPhase} ${styles.finalPhase}`}>
                  Grand Final
                </div>
                <div className={styles.railDate}>December 28, 2025</div>
                <div className={styles.railTime}>Crown the Winner</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className={styles.featuredCTAs}>
          {event.ctas && event.ctas.length > 0 ? (
            event.ctas.map((cta, idx) => (
              <motion.button
                key={idx}
                className={`${styles.primaryCTA} ${
                  cta.type === 'secondary' ? styles.secondaryCTA : ''
                }`}
                onClick={() => onCTAClick(cta.url)}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  delay: 1.2 + idx * 0.1,
                }}
              >
                {cta.type === 'secondary' ? (
                  <Trophy size={16} />
                ) : (
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <Star size={16} />
                  </motion.div>
                )}
                <span>{cta.label}</span>
                {cta.type === 'primary' && (
                  <span className={styles.ctaHint}>(TingVote)</span>
                )}
                <div className={styles.ctaShine}></div>
              </motion.button>
            ))
          ) : (
            <>
              <motion.button
                className={styles.primaryCTA}
                onClick={() => onCTAClick('https://tingvote.com')}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 400, delay: 1.2 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <Star size={16} />
                </motion.div>
                <span>Vote Now</span>
                <span className={styles.ctaHint}>(TingVote)</span>
                <div className={styles.ctaShine}></div>
              </motion.button>

              <motion.button
                className={styles.secondaryCTA}
                onClick={() =>
                  onCTAClick('https://hhsvhbvn.tingnect.com')
                }
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 400, delay: 1.3 }}
              >
                <Trophy size={16} />
                <span>Check-In</span>
                <div className={styles.ctaShine}></div>
              </motion.button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
