'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter, Zap, Shield, User, TrendingUp, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { searchWallets, type WalletData } from '@/data/demo-wallets';
import ProfileCard from '../ProfileCard/ProfileCard';
import ProfileModal from '../ProfileModal/ProfileModal';
import styles from './SearchSection.module.css';

export default function SearchSection() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<WalletData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<WalletData | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'verified' | 'developer' | 'founder'>('all');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const quickSearches = [
    { term: '0x3900971CbAaBE06Bb316F655dD2aF75896F4c666', type: 'address' },
    { term: '0xfCcf62e5a6B838689E0D21961775b80fb8645666', type: 'address' },
    { term: 'Alex Chen', type: 'name' },
    { term: 'developer', type: 'role' },
    { term: 'Sarah Kim', type: 'name' },
    { term: 'founder', type: 'role' },
  ];

  const filters = [
    { key: 'all', label: 'All', icon: User, color: '#8b5cf6' },
    { key: 'verified', label: 'Verified', icon: Shield, color: '#10b981' },
    { key: 'developer', label: 'Devs', icon: Zap, color: '#f59e0b' },
    { key: 'founder', label: 'Founders', icon: TrendingUp, color: '#ef4444' },
  ];

  // Generate avatar for wallet
 const getAvatarUrl = (wallet: WalletData): string => {
    return '/Icon/user.png';
  };

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (query.trim()) {
      setIsLoading(true);
      searchTimeoutRef.current = setTimeout(() => {
        const searchResults = searchWallets(query.trim());
        
        let filteredResults = searchResults;
        if (activeFilter === 'verified') {
          filteredResults = searchResults.filter(w => w.verified);
        } else if (activeFilter !== 'all') {
          filteredResults = searchResults.filter(w => w.role === activeFilter);
        }
        
        setResults(filteredResults);
        setIsLoading(false);
      }, 300);
    } else {
      setResults([]);
      setIsLoading(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query, activeFilter]);

  const handleQuickSearch = (searchTerm: string) => {
    setQuery(searchTerm);
    setShowSuggestions(false);
    searchInputRef.current?.focus();
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setSelectedWallet(null);
    searchInputRef.current?.focus();
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    setShowSuggestions(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <section className={styles.searchSection}>
      <div className={styles.backgroundPattern}>
        <div className={styles.gridPattern}></div>
        <div className={styles.glowOrb1}></div>
        <div className={styles.glowOrb2}></div>
      </div>

      <div className={styles.container}>
        <motion.div
          className={styles.searchContainer}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Search Header */}
          <div className={styles.searchHeader}>
            <motion.div
              className={styles.headerIcon}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Sparkles className={styles.sparkleIcon} />
            </motion.div>
            <h2 className={styles.searchTitle}>
              Explore Web3 <span className={styles.titleGradient}>Identities</span>
            </h2>
            <p className={styles.searchSubtitle}>
              Discover verified builders, developers, and innovators shaping the decentralized future
            </p>
          </div>

          {/* Enhanced Search Input */}
          <div className={styles.searchInputWrapper}>
            <motion.div
              className={`${styles.searchInput} ${isSearchFocused ? styles.searchInputFocused : ''}`}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.searchInputInner}>
                <Search className={styles.searchIcon} size={20} />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  placeholder="Search wallet, name, or role..."
                  className={styles.input}
                />
                {query && (
                  <motion.button
                    onClick={clearSearch}
                    className={styles.clearButton}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={16} />
                  </motion.button>
                )}
                {isLoading && (
                  <div className={styles.loadingSpinner}>
                    <motion.div
                      className={styles.spinner}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                )}
              </div>
              <div className={styles.searchGlow}></div>
            </motion.div>

            {/* Enhanced Search Suggestions */}
            <AnimatePresence>
              {showSuggestions && !query && (
                <motion.div
                  className={styles.suggestions}
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.suggestionHeader}>
                    <Zap size={14} />
                    <span>Quick searches</span>
                  </div>
                  <div className={styles.suggestionsList}>
                    {quickSearches.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleQuickSearch(suggestion.term)}
                        className={styles.suggestion}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className={styles.suggestionIcon}>
                          <Search size={12} />
                        </div>
                        <div className={styles.suggestionContent}>
                          <span className={styles.suggestionTerm}>{suggestion.term}</span>
                          <span className={styles.suggestionType}>{suggestion.type}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Enhanced Filters */}
          <motion.div 
            className={styles.filtersContainer}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className={styles.filters}>
              {filters.map((filter, index) => (
                <motion.button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key as typeof activeFilter)}
                  className={`${styles.filter} ${activeFilter === filter.key ? styles.filterActive : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ '--filter-color': filter.color } as React.CSSProperties}
                >
                  <filter.icon size={16} />
                  <span>{filter.label}</span>
                  <div className={styles.filterGlow}></div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Search Results */}
          <AnimatePresence>
            {query && (
              <motion.div
                className={styles.resultsContainer}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {isLoading ? (
                  <div className={styles.loadingState}>
                    <motion.div
                      className={styles.loadingContent}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        className={styles.loadingSpinner}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <div className={styles.spinner} />
                      </motion.div>
                      <span>Searching identities...</span>
                    </motion.div>
                  </div>
                ) : results.length > 0 ? (
                  <div className={styles.results}>
                    <motion.div
                      className={styles.resultsHeader}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h3>Found {results.length} identities</h3>
                      <span className={styles.resultsFilter}>
                        {filters.find(f => f.key === activeFilter)?.label}
                      </span>
                    </motion.div>
                    
                    <div className={styles.resultsGrid}>
                      {results.slice(0, 12).map((wallet, index) => (
                        <motion.div
                          key={wallet.address}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                          whileHover={{ y: -4 }}
                          className={styles.resultCard}
                        >
                          <div
                            className={styles.profileCardMini}
                            onClick={() => setSelectedWallet(wallet)}
                          >
                            <div className={styles.avatarContainer}>
                              <Image
                                src={getAvatarUrl(wallet)}
                                alt={wallet.name}
                                width={50}
                                height={50}
                                className={styles.avatar}
                              />
                              {wallet.verified && (
                                <div className={styles.verifiedBadge}>
                                  <Shield size={12} />
                                </div>
                              )}
                            </div>
                            
                            <div className={styles.profileInfo}>
                              <h4 className={styles.profileName}>{wallet.name}</h4>
                              <p className={styles.profileRole}>{wallet.role}</p>
                              <div className={styles.profileStats}>
                                <span>{wallet.transactions.toLocaleString()} tx</span>
                                <span>{wallet.nftCount} NFTs</span>
                              </div>
                            </div>
                            
                            <div className={styles.profileActions}>
                              <motion.button
                                className={styles.viewButton}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                View
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {results.length > 12 && (
                      <motion.div
                        className={styles.loadMore}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <button className={styles.loadMoreButton}>
                          Load more results ({results.length - 12} remaining)
                        </button>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <motion.div
                    className={styles.noResults}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className={styles.noResultsContent}>
                      <Search size={48} />
                      <h3>No identities found</h3>
                      <p>Try searching with a different wallet address, name, or role</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Profile Modal */}
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
