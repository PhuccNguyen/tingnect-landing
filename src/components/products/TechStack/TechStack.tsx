'use client';

import { motion } from 'framer-motion';
import styles from './TechStack.module.css';

const technologies = [
  { name: 'Solidity', category: 'Smart Contracts' },
  { name: 'Rust', category: 'Blockchain' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Framework' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'GraphQL', category: 'API' },
  { name: 'IPFS', category: 'Storage' },
  { name: 'Ethereum', category: 'Blockchain' },
  { name: 'Polygon', category: 'Blockchain' },
  { name: 'Chainlink', category: 'Oracles' },
  { name: 'The Graph', category: 'Indexing' },
];

export default function TechStack() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>Built with Cutting-Edge Technology</h2>
          <p className={styles.description}>
            We leverage the best tools and frameworks to deliver world-class products
          </p>
        </motion.div>

        <div className={styles.techGrid}>
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              className={styles.techItem}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className={styles.techContent}>
                <span className={styles.techName}>{tech.name}</span>
                <span className={styles.techCategory}>{tech.category}</span>
              </div>
              <div className={styles.techGlow} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
