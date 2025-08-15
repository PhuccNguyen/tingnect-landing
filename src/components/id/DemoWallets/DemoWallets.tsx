'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Shuffle, TrendingUp, Users, Code, Briefcase, Sparkles, Eye } from 'lucide-react';
import Image from 'next/image';
import { demoWallets, type WalletData } from '@/data/demo-wallets';
import ProfileModal from '../ProfileModal/ProfileModal';
import Button from '@/components/ui/Button';
import styles from './DemoWallets.module.css';

export default function DemoWallets() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'developer' | 'founder' | 'investor' | 'builder'>('all');
  const [selectedWallet, setSelectedWallet] = useState<WalletData | null>(null);
  const [shuffledWallets, setShuffledWallets] = useState<WalletData[]>(
    demoWallets.slice(0, 12)
  );

  const filters = [
    { key: 'all', label: 'All', icon: Users, count: demoWallets.length, color: '#8b5cf6' },
    { key: 'developer', label: 'Developers', icon: Code, count: demoWallets.filter(w => w.role === 'developer').length, color: '#f59e0b' },
    { key: 'founder', label: 'Founders', icon: TrendingUp, count: demoWallets.filter(w => w.role === 'founder').length, color: '#ef4444' },
    { key: 'investor', label: 'Investors', icon: Briefcase, count: demoWallets.filter(w => w.role === 'investor').length, color: '#10b981' },
    { key: 'builder', label: 'Builders', icon: Code, count: demoWallets.filter(w => w.role === 'builder').length, color: '#3b82f6' },
  ];

  // Generate avatar for wallet
 const getAvatarUrl = (wallet: WalletData): string => {
    return '/Icon/user.png';
  };

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
      {/* Background Elements */}
      <div className={styles.backgroundPattern}>
        <div className={styles.gridOverlay}></div>
        <div className={styles.glowOrb1}></div>
        <div className={styles.glowOrb2}></div>
        <div className={styles.glowOrb3}></div>
      </div>

      <div className={styles.container}>
        {/* Enhanced Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.headerContent}>
            <motion.div
              className={styles.headerIcon}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Sparkles className={styles.sparkleIcon} />
            </motion.div>
            <h2 className={styles.title}>
              Community <span className={styles.highlight}>Spotlight</span>
            </h2>
            <p className={styles.subtitle}>
              Discover verified Web3 builders, innovators, and pioneers shaping the decentralized future.
              Each profile represents real contributors in our ecosystem.
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
              className={styles.shuffleBtn}
            >
              <Shuffle size={18} />
              Shuffle
            </Button>
          </motion.div>
        </motion.div>

        {/* Enhanced Filters */}
        <motion.div
          className={styles.filtersSection}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className={styles.filters}>
            {filters.map((filter, index) => (
              <motion.button
                key={filter.key}
                onClick={() => handleFilterChange(filter.key as typeof selectedFilter)}
                className={`${styles.filter} ${selectedFilter === filter.key ? styles.filterActive : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{ '--filter-color': filter.color } as React.CSSProperties}
              >
                <filter.icon size={16} />
                <span className={styles.filterLabel}>{filter.label}</span>
                <span className={styles.filterCount}>{filter.count}</span>
                <div className={styles.filterGlow}></div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Stats Overview */}
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
            <div className={styles.statLabel}>Total Volume</div>
          </div>
          <div className={styles.statSeparator} />
          <div className={styles.stat}>
            <div className={styles.statValue}>15K+</div>
            <div className={styles.statLabel}>NFTs Owned</div>
          </div>
        </motion.div>

        {/* Enhanced Wallets Grid with Avatars */}
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
              whileHover={{ y: -8 }}
              className={styles.walletCard}
            >
              <div
                className={styles.profileCard}
                onClick={() => setSelectedWallet(wallet)}
              >
                {/* Card Background Gradient */}
                <div className={styles.cardGradient}></div>
                
                {/* Avatar Section */}
                <div className={styles.avatarSection}>
                  <div className={styles.avatarContainer}>
                    <Image
                      src={getAvatarUrl(wallet)}
                      alt={wallet.name}
                      width={64}
                      height={64}
                      className={styles.avatar}
                    />
                    {wallet.verified && (
                      <div className={styles.verifiedBadge}>
                        <div className={styles.verifiedIcon}>✓</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Profile Info */}
                <div className={styles.profileInfo}>
                  <h3 className={styles.profileName}>{wallet.name}</h3>
                  <div 
                    className={styles.roleTag}
                    style={{ '--role-color': filters.find(f => f.key === wallet.role)?.color || '#8b5cf6' } as React.CSSProperties}
                  >
                    {wallet.role}
                  </div>
                </div>

                {/* Stats */}
                <div className={styles.profileStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>{wallet.transactions.toLocaleString()}</span>
                    <span className={styles.statLabel}>Transactions</span>
                  </div>
                  <div className={styles.statDivider}></div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>{wallet.nftCount}</span>
                    <span className={styles.statLabel}>NFTs</span>
                  </div>
                </div>

                {/* Networks */}
                <div className={styles.networksBadges}>
                  {wallet.networks.slice(0, 3).map((network, idx) => (
                    <div
                      key={idx}
                      className={styles.networkBadge}
                      title={network}
                    >
                      {network.charAt(0).toUpperCase()}
                    </div>
                  ))}
                  {wallet.networks.length > 3 && (
                    <div className={styles.networkBadge}>
                      +{wallet.networks.length - 3}
                    </div>
                  )}
                </div>

                {/* Hover Action */}
                <motion.div
                  className={styles.cardAction}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Eye size={16} />
                  <span>View Profile</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Section */}
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
            Explore <span className={styles.totalCount}>{demoWallets.length}</span> verified Web3 identities in our community
          </p>
        </motion.div>

        {/* Enhanced Featured Roles */}
        <motion.div
          className={styles.featuredRoles}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className={styles.featuredTitle}>Join Our Community</h3>
          <div className={styles.roleCards}>
            {filters.slice(1, 4).map((role, index) => (
              <motion.div
                key={role.key}
                className={styles.roleCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 + (index * 0.1) }}
                whileHover={{ y: -4 }}
                style={{ '--role-color': role.color } as React.CSSProperties}
              >
                <div className={styles.roleIcon}>
                  <role.icon size={24} />
                </div>
                <h4 className={styles.roleCardTitle}>{role.label}</h4>
                <p className={styles.roleCardDesc}>
                  {role.key === 'developer' && 'Build the infrastructure of tomorrow with cutting-edge Web3 technologies'}
                  {role.key === 'founder' && 'Lead innovative projects that will shape the decentralized future'}
                  {role.key === 'investor' && 'Support groundbreaking ideas and fuel the next generation of Web3'}
                </p>
                <div className={styles.roleCardGlow}></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Enhanced Profile Modal */}
      <AnimatePresence>
        {selectedWallet && (
          <ProfileModal
            wallet={selectedWallet}
            onClose={() => setSelectedWallet(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
