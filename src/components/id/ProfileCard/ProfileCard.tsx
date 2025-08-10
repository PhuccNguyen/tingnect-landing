'use client';

import { motion } from 'framer-motion';
import { 
  Copy, 
  ExternalLink, 
  Shield, 
  ShieldCheck,
  Twitter, 
  Github, 
  Globe, 
  MessageCircle,
  Wallet,
  TrendingUp,
  Users,
  Zap,
  Calendar,
  Hash
} from 'lucide-react';
import { useState } from 'react';
import { WalletData } from '@/data/demo-wallets';
import styles from './ProfileCard.module.css';

interface ProfileCardProps {
  wallet: WalletData;
  detailed?: boolean;
  onClick?: () => void;
}

export default function ProfileCard({ wallet, detailed = false, onClick }: ProfileCardProps) {
  const [copied, setCopied] = useState(false);

  const copyAddress = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatRole = (role?: string): string => {
  if (!role) return 'Member';
  return role.charAt(0).toUpperCase() + role.slice(1);
};


  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getRoleIcon = (role?: string) => {
    switch (role) {
      case 'developer': return <Zap size={16} />;
      case 'founder': return <TrendingUp size={16} />;
      case 'investor': return <Wallet size={16} />;
      case 'builder': return <Hash size={16} />;
      default: return <Users size={16} />;
    }
  };

  const getRoleColor = (role?: string) => {
    switch (role) {
      case 'developer': return '#10b981';
      case 'founder': return '#f59e0b';
      case 'investor': return '#8b5cf6';
      case 'builder': return '#06b6d4';
      default: return '#6b7280';
    }
  };

  const getNetworkInfo = (network: string) => {
    switch (network) {
      case 'ethereum': return { name: 'Ethereum', color: '#627eea', symbol: 'ETH' };
      case 'polygon': return { name: 'Polygon', color: '#8247e5', symbol: 'MATIC' };
      case 'bsc': return { name: 'BSC', color: '#f0b90b', symbol: 'BNB' };
      case 'arbitrum': return { name: 'Arbitrum', color: '#28a0f0', symbol: 'ARB' };
      default: return { name: 'Unknown', color: '#6b7280', symbol: 'ETH' };
    }
  };

  if (detailed) {
    return (
      <motion.div
        className={styles.detailedCard}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className={styles.detailedHeader}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarWrapper}>
              <img
                src={wallet.avatar || '/api/placeholder/120/120'}
                alt={wallet.name || 'Anonymous'}
                className={styles.avatar}
              />
              {wallet.verified && (
                <div className={styles.verifiedBadge}>
                  <ShieldCheck size={20} />
                </div>
              )}
            </div>
            <div className={styles.nameSection}>
              <h2 className={styles.detailedName}>
                {wallet.name || 'Anonymous User'}
              </h2>
              <div className={styles.roleTag} style={{ borderColor: getRoleColor(wallet.role) }}>
                {getRoleIcon(wallet.role)}
<span style={{ color: getRoleColor(wallet.role) }}>
  {formatRole(wallet.role)}
</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        {wallet.bio && (
          <div className={styles.bioSection}>
            <p className={styles.bio}>{wallet.bio}</p>
          </div>
        )}

        {/* Address */}
        <div className={styles.addressSection}>
          <div className={styles.addressLabel}>Wallet Address</div>
          <div className={styles.addressRow}>
            <span className={styles.fullAddress}>{wallet.address}</span>
            <button
              onClick={copyAddress}
              className={styles.copyButton}
              title="Copy address"
            >
              {copied ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={styles.copiedIcon}
                >
                  ✓
                </motion.div>
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>
        </div>

        {/* Network Info */}
        <div className={styles.networkSection}>
          <div className={styles.networkBadge}>
            <div 
              className={styles.networkDot} 
              style={{ backgroundColor: getNetworkInfo(wallet.network).color }}
            />
            <span>{getNetworkInfo(wallet.network).name}</span>
            <span className={styles.balance}>
              {wallet.balance} {getNetworkInfo(wallet.network).symbol}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              <Hash size={18} />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statValue}>{wallet.nfts?.toLocaleString() || '0'}</span>
              <span className={styles.statLabel}>NFTs</span>
            </div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              <Wallet size={18} />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statValue}>{wallet.tokens?.toLocaleString() || '0'}</span>
              <span className={styles.statLabel}>Tokens</span>
            </div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              <TrendingUp size={18} />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statValue}>{wallet.transactions?.toLocaleString() || '0'}</span>
              <span className={styles.statLabel}>Transactions</span>
            </div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              <Calendar size={18} />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statValue}>
                {wallet.created ? new Date(wallet.created).getFullYear() : 'N/A'}
              </span>
              <span className={styles.statLabel}>Joined</span>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className={styles.socialSection}>
          <h3 className={styles.socialTitle}>Connect</h3>
          <div className={styles.socialLinks}>
            {wallet.twitter && (
              <a
                href={`https://twitter.com/${wallet.twitter.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <Twitter size={18} />
                <span>{wallet.twitter}</span>
              </a>
            )}
            {wallet.github && (
              <a
                href={`https://github.com/${wallet.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <Github size={18} />
                <span>{wallet.github}</span>
              </a>
            )}
            {wallet.website && (
              <a
                href={wallet.website}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <Globe size={18} />
                <span>Website</span>
              </a>
            )}
            {wallet.discord && (
              <div className={styles.socialLink}>
                <MessageCircle size={18} />
                <span>{wallet.discord}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={styles.card}
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.avatarContainer}>
          <img
            src={wallet.avatar || '/api/placeholder/60/60'}
            alt={wallet.name || 'Anonymous'}
            className={styles.cardAvatar}
          />
          {wallet.verified && (
            <div className={styles.cardVerifiedBadge}>
              <Shield size={12} />
            </div>
          )}
        </div>
        <div className={styles.cardInfo}>
          <h3 className={styles.cardName}>
            {wallet.name || 'Anonymous User'}
          </h3>
          <div className={styles.cardRole} style={{ color: getRoleColor(wallet.role) }}>
            {getRoleIcon(wallet.role)}
<span>{formatRole(wallet.role)}</span>
          </div>
        </div>
      </div>

      <div className={styles.cardAddress}>
        <span className={styles.addressText}>{truncateAddress(wallet.address)}</span>
        <button
          onClick={copyAddress}
          className={styles.cardCopyButton}
          title="Copy address"
        >
          {copied ? '✓' : <Copy size={14} />}
        </button>
      </div>

      {wallet.bio && (
        <p className={styles.cardBio}>
          {wallet.bio.length > 80 ? `${wallet.bio.substring(0, 80)}...` : wallet.bio}
        </p>
      )}

      <div className={styles.cardStats}>
        <div className={styles.cardStat}>
          <span className={styles.cardStatValue}>{wallet.nfts || 0}</span>
          <span className={styles.cardStatLabel}>NFTs</span>
        </div>
        <div className={styles.cardStat}>
          <span className={styles.cardStatValue}>{wallet.tokens || 0}</span>
          <span className={styles.cardStatLabel}>Tokens</span>
        </div>
        <div className={styles.cardStat}>
          <span className={styles.cardStatValue}>{wallet.transactions || 0}</span>
          <span className={styles.cardStatLabel}>Txns</span>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <div 
          className={styles.cardNetwork}
          style={{ borderColor: getNetworkInfo(wallet.network).color }}
        >
          <div 
            className={styles.cardNetworkDot}
            style={{ backgroundColor: getNetworkInfo(wallet.network).color }}
          />
          <span>{getNetworkInfo(wallet.network).name}</span>
        </div>
        {wallet.balance && (
          <span className={styles.cardBalance}>
            {wallet.balance} {getNetworkInfo(wallet.network).symbol}
          </span>
        )}
      </div>
    </motion.div>
  );
}
