'use client';

import { motion } from 'framer-motion';
import styles from './Hero.module.css';
import Background from './Background/Background';
import LeftContent from './LeftContent/LeftContent';
import RightVisual from './RightVisual/RightVisual';

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Background Layer */}
      <Background />
      
      {/* Main Content */}
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Left Content */}
          <motion.div 
            className={styles.leftSection}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <LeftContent />
          </motion.div>
          
          {/* Right Visual */}
          <motion.div 
            className={styles.rightSection}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <RightVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
