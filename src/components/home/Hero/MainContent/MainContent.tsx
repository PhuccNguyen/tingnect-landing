'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { easeOut } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  ChevronDown,
  ExternalLink,
  Tag,
  Users,
  Trophy,
  Crown,
  Sparkles,
  Award
} from 'lucide-react';
import styles from './MainContent.module.css';
import { eventsData, EventData } from '@/data/events-data';
import CTAButtons from '../CTAButtons/CTAButtons';

const typingTexts = [
  "Connect. Build. Scale.",
  "Unlock Web3 Potential", 
  "Join Founders, Builders, VCs",
  "Shape the Future Together",
  "Official Platform for Web3"
];

export default function MainContent() {
  const [currentTypingIndex, setCurrentTypingIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [activeSection, setActiveSection] = useState('current');

  // Auto-expand featured event on mount
  useEffect(() => {
    const featuredEvent = eventsData.current.find(event => event.featured);
    if (featuredEvent) {
      setSelectedEvent(featuredEvent);
    }
  }, []);

  // Typing animation effect
  useEffect(() => {
    const currentText = typingTexts[currentTypingIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentText.slice(0, displayText.length + 1));

        if (displayText === currentText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentText.slice(0, displayText.length - 1));

        if (displayText === '') {
          setIsDeleting(false);
          setCurrentTypingIndex((prev) => (prev + 1) % typingTexts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTypingIndex]);

  const handleEventClick = (event: EventData) => {
    setSelectedEvent(selectedEvent?.id === event.id ? null : event);
  };

  const handleCTAClick = (url: string) => {
    window.open(url, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.06,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: easeOut
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: easeOut
      }
    }
  };

  return (
    <motion.div
      className={styles.MainContent}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Desktop Two-Column Layout */}
      <div className={styles.desktopLayout}>
        {/* Left Column - Brand & CTA */}
        <motion.div className={styles.leftColumn} variants={itemVariants}>
          {/* Logo Section */}
          <motion.div className={styles.logoSection} variants={logoVariants}>
            <motion.div
              className={styles.logoContainer}
              whileHover={{ 
                scale: 1.02,
                y: -3
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div className={styles.logoBg}>
                <Image
                  src="/Image/Logo/TingNect/TingNect.svg"
                  alt="TingNect - Official Platform"
                  width={280}
                  height={92}
                  className={styles.logoImage}
                  priority
                />
                <motion.div
                  className={styles.officialBadge}
                  animate={{
                    scale: [1, 1.08, 1],
                    boxShadow: [
                      "0 0 15px rgba(59, 130, 246, 0.4)",
                      "0 0 30px rgba(139, 92, 246, 0.6)",
                      "0 0 15px rgba(59, 130, 246, 0.4)"
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span>Official</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Slogan */}
          <motion.div className={styles.sloganSection} variants={itemVariants}>
            <motion.h1
              className={styles.slogan}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                duration: 12,
                ease: "linear",
                repeat: Infinity
              }}
            >
              Build for Billions
            </motion.h1>
            <motion.div 
              className={styles.sloganUnderline}
              initial={{ width: 0 }}
              animate={{ width: "70%" }}
              transition={{ duration: 1.2, delay: 0.4 }}
            />
          </motion.div>

          {/* Typing Text */}
          <motion.div className={styles.typingSection} variants={itemVariants}>
            <div className={styles.typingContainer}>
              <span className={styles.typingContent}>
                {displayText}
                <motion.span
                  className={styles.cursor}
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  |
                </motion.span>
              </span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants}>
            <CTAButtons />
          </motion.div>
        </motion.div>

        {/* Right Column - Events & Updates */}
        <motion.div className={styles.rightColumn} variants={itemVariants}>
          <div className={styles.eventsSection}>
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
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span>Live</span>
              </div>
            </div>

            {/* Featured Event Card - Always Expanded */}
            <motion.div 
              className={styles.featuredEventCard}
              variants={itemVariants}
              whileHover={{ y: -2 }}
            >
            <div className={styles.featuredBanner}>
  <div className={styles.bannerGradient} />
  <div className={styles.featuredBadge}>
    <Crown size={12} />
    <span>Premier Showcase</span>
  </div>
  <motion.div
    className={styles.floatingIcons}
    animate={{
      y: [-5, 5, -5],
      scale: [1, 1.05, 1]
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <Image
      src="/Image/Other/Logo_tpa.svg"
      alt="Sponsor Logo"
      width={90}
      height={90}
      className={styles.sponsorLogo}
    />
  </motion.div>
</div>

<div className={styles.featuredContent}>
  <div className={styles.featuredHeader}>
    <div className={styles.titleBadgeContainer}>
      <div className={styles.statusBadges}>
        <span className={styles.currentBadge}>
          <motion.div
            className={styles.pulsingDot}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          Current
        </span>
      </div>
    </div>
  </div>


                <div className={styles.featuredMeta}>
                  <div className={styles.metaGrid}>
                    <div className={styles.metaItem}>
                      <Calendar size={16} />
                      <span>Sep 27 – Dec 28, 2025</span>
                    </div>
                    <div className={styles.metaItem}>
                      <Clock size={16} />
                      <span>09:00 – 22:00 ICT</span>
                    </div>
                    <div className={styles.metaItem}>
                      <MapPin size={16} />
                      <span>Tien Son Palace, Da Nang</span>
                    </div>
                    <div className={styles.metaItem}>
                      <Tag size={16} />
                      <span>Beauty Contest</span>
                    </div>
                  </div>
                </div>

                <div className={styles.featuredDescription}>
                  <p>The first national-scale beauty contest exclusively for Vietnamese female students, honoring intellect and beauty. Experience the future of democratic voting through our revolutionary Web3 platform.</p>
                </div>

                {/* Progress Bar */}
                <div className={styles.progressSection}>
                  <div className={styles.progressHeader}>
                    <span>Voting Progress</span>
                    <span className={styles.progressNumbers}>
                      <Users size={14} />
                      35,750 / 50,000
                    </span>
                  </div>
                  <div className={styles.progressBar}>
                    <motion.div 
                      className={styles.progressFill}
                      initial={{ width: 0 }}
                      animate={{ width: "71.5%" }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                    >
                      <motion.div
                        className={styles.progressGlow}
                        animate={{
                          x: ["-100%", "200%"]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </motion.div>
                  </div>
                  <div className={styles.progressLabels}>
                    <span>71.5% Complete</span>
                    <span className={styles.remainingTime}>28 days left</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className={styles.featuredCTAs}>
                  <motion.button
                    className={styles.primaryCTA}
                    onClick={() => handleCTAClick('https://tingvote.com')}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Star size={16} />
                    <span>Vote Now</span>
                    <ExternalLink size={14} />
                  </motion.button>
                  <motion.button
                    className={styles.secondaryCTA}
                    onClick={() => handleCTAClick('https://tingvote.com/event-details')}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Trophy size={16} />
                    <span>View Details</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Section Tabs */}
            <div className={styles.sectionTabs}>
              {Object.keys(eventsData).map((section) => {
                const count = eventsData[section].length;
                return (
                  <motion.button
                    key={section}
                    className={`${styles.sectionTab} ${activeSection === section ? styles.activeTab : ''}`}
                    onClick={() => setActiveSection(section)}
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

            {/* Events List */}
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
                  {eventsData[activeSection].length === 0 ? (
                    <div className={styles.emptyState}>
                      <Calendar size={36} className={styles.emptyIcon} />
                      <h3>No {activeSection} events</h3>
                      <p>Check back later for updates</p>
                    </div>
                  ) : (
                    eventsData[activeSection]
                      .filter(event => !event.featured || activeSection !== 'current') // Hide featured event in current tab since it's shown above
                      .map((event, index) => (
                        <div key={event.id} className={styles.eventItem}>
                          <motion.div
                            className={`${styles.eventRow} ${event.featured ? styles.featured : ''}`}
                            onClick={() => handleEventClick(event)}
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
                                  <span className={`${styles.statusBadge} ${styles[event.status]}`}>
                                    {event.status}
                                  </span>
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
                              </div>
                            </div>
                            
                            <motion.div
                              className={styles.expandButton}
                              animate={{ 
                                rotate: selectedEvent?.id === event.id ? 180 : 0 
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown size={16} />
                            </motion.div>
                          </motion.div>

                          {/* Expandable Details */}
                          <AnimatePresence>
                            {selectedEvent?.id === event.id && (
                              <motion.div
                                className={styles.eventDetails}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
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
                                  </div>

                                  {event.description && (
                                    <div className={styles.eventDescription}>
                                      <p>{event.description}</p>
                                    </div>
                                  )}

                                  {(event.capacity && event.registered !== undefined) && (
                                    <div className={styles.progressSection}>
                                      <div className={styles.progressHeader}>
                                        <span>Progress</span>
                                        <span>{event.registered.toLocaleString()}/{event.capacity.toLocaleString()}</span>
                                      </div>
                                      <div className={styles.progressBar}>
                                        <motion.div 
                                          className={styles.progressFill}
                                          initial={{ width: 0 }}
                                          animate={{ 
                                            width: `${Math.min((event.registered / event.capacity) * 100, 100)}%` 
                                          }}
                                          transition={{ duration: 0.8, ease: "easeOut" }}
                                        />
                                      </div>
                                    </div>
                                  )}

                                  {event.ctas && event.ctas.length > 0 && (
                                    <div className={styles.ctaButtons}>
                                      {event.ctas.map((cta, idx) => (
                                        <motion.button
                                          key={idx}
                                          className={`${styles.ctaButton} ${styles[cta.type || 'primary']}`}
                                          onClick={() => handleCTAClick(cta.url)}
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
          </div>
        </motion.div>
      </div>

      {/* Mobile About Section (Hidden on Desktop) */}
      <motion.div className={styles.aboutSection} variants={itemVariants}>
        <div className={styles.aboutContent}>
          <p className={styles.aboutText}>
            <strong>TingNect - Build for Billions</strong> is the premier Web3 platform uniting developers, 
            entrepreneurs, and tech enthusiasts to shape a sustainable ecosystem for the future.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}