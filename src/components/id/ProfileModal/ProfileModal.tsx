'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Shield, ExternalLink, Copy, CheckCircle, MapPin, Calendar } from 'lucide-react';
import Image from 'next/image';
import { WalletData } from '@/data/demo-wallets';
import styles from './ProfileModal.module.css';

interface ProfileModalProps {
  wallet: WalletData;
  onClose: () => void;
}

export default function ProfileModal({ wallet, onClose }: ProfileModalProps) {
  const [copiedAddress, setCopiedAddress] = React.useState(false);

 const getAvatarUrl = (wallet: WalletData): string => {
    return '/Icon/user.png';
  };
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(wallet.address);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'developer': return '#f59e0b';
      case 'founder': return '#ef4444';
      case 'investor': return '#10b981';
      case 'builder': return '#8b5cf6';
      default: return '#64748b';
    }
  };

  const getNetworkColor = (network: string) => {
    switch (network) {
      case 'ethereum': return '#627eea';
      case 'polygon': return '#8247e5';
      case 'bsc': return '#f3ba2f';
      case 'arbitrum': return '#28a0f0';
      default: return '#64748b';
    }
  };

  return (
    <motion.div
      className={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.modalContent}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.profileSection}>
            <div className={styles.avatarContainer}>
              <Image
                src={getAvatarUrl(wallet)}
                alt={wallet.name}
                width={80}
                height={80}
                className={styles.avatar}
              />
              {wallet.verified && (
                <div className={styles.verifiedBadge}>
                  <Shield size={16} />
                </div>
              )}
            </div>
            
            <div className={styles.profileInfo}>
              <h2 className={styles.profileName}>{wallet.name}</h2>
              <div 
                className={styles.roleTag}
                style={{ '--role-color': getRoleColor(wallet.role) } as React.CSSProperties}
              >
                {wallet.role}
              </div>
              <div className={styles.locationInfo}>
                <MapPin size={14} />
                <span>Global • Web3</span>
              </div>
            </div>
          </div>

          <button onClick={onClose} className={styles.closeButton}>
            <X size={20} />
          </button>
        </div>

        {/* Bio */}
        {wallet.bio && (
          <div className={styles.bioSection}>
            <p className={styles.bio}>{wallet.bio}</p>
          </div>
        )}

        {/* Address Section */}
        <div className={styles.addressSection}>
          <h3 className={styles.sectionTitle}>Wallet Address</h3>
          <div className={styles.addressContainer}>
            <code className={styles.address}>{wallet.address}</code>
            <button
              onClick={copyAddress}
              className={styles.copyButton}
              title="Copy address"
            >
              {copiedAddress ? <CheckCircle size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{wallet.transactions.toLocaleString()}</div>
            <div className={styles.statLabel}>Transactions</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{wallet.nftCount}</div>
            <div className={styles.statLabel}>NFTs</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{wallet.portfolio.toLocaleString()}</div>
            <div className={styles.statLabel}>Portfolio Value</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{wallet.networks.length}</div>
            <div className={styles.statLabel}>Networks</div>
          </div>
        </div>

        {/* Networks */}
        <div className={styles.networksSection}>
          <h3 className={styles.sectionTitle}>Active Networks</h3>
          <div className={styles.networksList}>
            {wallet.networks.map((network, index) => (
              <div
                key={index}
                className={styles.networkItem}
                style={{ '--network-color': getNetworkColor(network) } as React.CSSProperties}
              >
                <div className={styles.networkDot}></div>
                <span className={styles.networkName}>{network}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interests */}
        {wallet.interests && wallet.interests.length > 0 && (
          <div className={styles.interestsSection}>
            <h3 className={styles.sectionTitle}>Interests</h3>
            <div className={styles.interestsTags}>
              {wallet.interests.map((interest, index) => (
                <span key={index} className={styles.interestTag}>
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className={styles.actionsSection}>
          <motion.button
            className={styles.primaryAction}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink size={16} />
            View on Explorer
          </motion.button>
          <motion.button
            className={styles.secondaryAction}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Connect Wallet
          </motion.button>
        </div>

        {/* Footer */}
        <div className={styles.modalFooter}>
          <div className={styles.joinedInfo}>
            <Calendar size={14} />
            <span>Member since 2023</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
