'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Shuffle, TrendingUp, Users, Code, Briefcase } from 'lucide-react';
import { demoWallets, type WalletData } from '@/data/demo-wallets';
import ProfileCard from '../ProfileCard/ProfileCard';
import Button from '@/components/ui/Button';
import styles from './DemoWallets.module.css';

export default function DemoWallets() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'developer' | 'founder' | 'investor' | 'builder'>('all');
  const [selectedWallet, setSelectedWallet] = useState<WalletData | null>(null);
  const [shuffledWallets, setShuffledWallets] = useState<WalletData[]>(
    demoWallets.slice(0, 12)
  );

  const filters = [
    { key: 'all', label: 'All Identities', icon: Users, count: demoWallets.length },
    { key: 'developer', label: 'Developers', icon: Code, count: demoWallets.filter(w => w.role === 'developer').length },
    { key: 'founder', label: 'Founders', icon: TrendingUp, count: demoWallets.filter(w => w.role === 'founder').length },
    { key: 'investor', label: 'Investors', icon: Briefcase, count: demoWallets.filter(w => w.role === 'investor').length },
    { key: 'builder', label: 'Builders', icon: Code, count: demoWallets.filter(w => w.role === 'builder').length },
  ];

  const shuffleWallets = () => {
    const filtered = selectedFilter === 'all' 
      ? demoWallets 
      : demoWallets.filter(w => w.role === selectedFilter);
    
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    setShuffledWallets(shuffled.slice(0, 12));
  };

  const handleFilterChange = (filter: typeof selectedFilter) => {
    setSelectedFilter(filter);
    const filtered = filter === 'all' 
      ? demoWallets 
      : demoWallets.filter(w => w.role === filter);
    
    setShuffledWallets(filtered.slice(0, 12));
  };

  return (
    <section className={styles.demoSection}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.headerContent}>
            <h2 className={styles.title}>
              Community <span className={styles.highlight}>Spotlight</span>
            </h2>
            <p className={styles.subtitle}>
              Discover verified Web3 builders, developers, and innovators in our ecosystem.
              Each identity represents a real contributor to the decentralized future.
            </p>
          </div>
          
          <motion.div
            className={styles.shuffleButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={shuffleWallets}
              variant="outline"
              size="md"
            >
              <Shuffle size={18} />
              Shuffle
            </Button>
          </motion.div>
        </motion.div>

        {/* Filters */}
        <motion.div
          className={styles.filtersSection}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className={styles.filters}>
            {filters.map((filter) => (
              <motion.button
                key={filter.key}
onClick={() =>
  handleFilterChange(filter.key as typeof selectedFilter)
}                className={`${styles.filter} ${selectedFilter === filter.key ? styles.filterActive : ''}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <filter.icon size={18} />
                <span className={styles.filterLabel}>{filter.label}</span>
                <span className={styles.filterCount}>{filter.count}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          className={styles.statsOverview}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.stat}>
            <div className={styles.statValue}>100+</div>
            <div className={styles.statLabel}>Verified Identities</div>
          </div>
          <div className={styles.statSeparator} />
          <div className={styles.stat}>
            <div className={styles.statValue}>4</div>
            <div className={styles.statLabel}>Networks</div>
          </div>
          <div className={styles.statSeparator} />
          <div className={styles.stat}>
            <div className={styles.statValue}>2.5M+</div>
            <div className={styles.statLabel}>Total Transactions</div>
          </div>
          <div className={styles.statSeparator} />
          <div className={styles.stat}>
            <div className={styles.statValue}>15K+</div>
            <div className={styles.statLabel}>NFTs Owned</div>
          </div>
        </motion.div>

        {/* Wallets Grid */}
        <motion.div
          className={styles.walletsGrid}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
            {shuffledWallets.map((wallet: WalletData, index) => (
            <motion.div
              key={`${wallet.address}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.4, 
                delay: 0.4 + (index * 0.05),
                ease: [0.21, 1.11, 0.81, 0.99] 
              }}
            >
              <ProfileCard
                wallet={wallet}
                onClick={() => setSelectedWallet(wallet)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        <motion.div
          className={styles.loadMoreSection}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Button
            onClick={shuffleWallets}
            variant="secondary"
            size="lg"
            className={styles.loadMoreButton}
          >
            <Shuffle size={20} />
            Discover More Identities
          </Button>
          <p className={styles.loadMoreText}>
            Explore {demoWallets.length} verified Web3 identities in our community
          </p>
        </motion.div>

        {/* Featured Roles */}
        <motion.div
          className={styles.featuredRoles}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className={styles.featuredTitle}>Join Our Community</h3>
          <div className={styles.roleCards}>
            <div className={styles.roleCard}>
              <div className={styles.roleIcon}>
                <Code size={24} />
              </div>
              <h4 className={styles.roleCardTitle}>Developers</h4>
              <p className={styles.roleCardDesc}>
                Build the infrastructure of tomorrow with cutting-edge Web3 technologies
              </p>
            </div>
            <div className={styles.roleCard}>
              <div className={styles.roleIcon}>
                <TrendingUp size={24} />
              </div>
              <h4 className={styles.roleCardTitle}>Founders</h4>
              <p className={styles.roleCardDesc}>
                Lead innovative projects that will shape the decentralized future
              </p>
            </div>
            <div className={styles.roleCard}>
              <div className={styles.roleIcon}>
                <Briefcase size={24} />
              </div>
              <h4 className={styles.roleCardTitle}>Investors</h4>
              <p className={styles.roleCardDesc}>
                Support groundbreaking ideas and fuel the next generation of Web3
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal for detailed view */}
      {selectedWallet && (
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedWallet(null)}
        >
          <motion.div
            className={styles.modalContent}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ProfileCard wallet={selectedWallet} detailed />
            <button
              onClick={() => setSelectedWallet(null)}
              className={styles.modalClose}
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
