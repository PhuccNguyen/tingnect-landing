'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Users, Zap, Shield } from 'lucide-react';
import Image from 'next/image';
import styles from './ContactHero.module.css';

const ContactHero: React.FC = () => {
  const features = [
    {
      icon: <MessageCircle size={24} />,
      title: 'Quick Response',
      description: 'We respond within 24 hours'
    },
    {
      icon: <Users size={24} />,
      title: 'Expert Team',
      description: 'Professional technical support'
    },
    {
      icon: <Zap size={24} />,
      title: 'Effective Solutions',
      description: 'Optimal solutions for every issue'
    },
    {
      icon: <Shield size={24} />,
      title: 'Data Security',
      description: 'Complete information security guarantee'
    }
  ];

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className={styles.headerSection}
        >
          <div className={styles.logoWrapper}>
            <Image
              src="/Image/Logo/TingNect/TingNecticon.svg"
              alt="TingNect Logo"
              width={80}
              height={80}
              className={styles.logo}
            />
            <div className={styles.logoGlow}></div>
          </div>

          <h1 className={styles.title}>
            Connect with{' '}
            <span className={styles.titleGradient}>
              TingNect
            </span>
          </h1>
          <p className={styles.subtitle}>
            We&quot;re always ready to listen and support you. 
            Leave us a message and we&quot;ll get back to you as soon as possible.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={styles.featuresGrid}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className={styles.featureCard}
            >
              <div className={styles.featureIcon}>
                {feature.icon}
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHero;
