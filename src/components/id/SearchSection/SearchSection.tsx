'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter, Zap, Shield, User, TrendingUp } from 'lucide-react';
import { searchWallets, type WalletData } from '@/data/demo-wallets';
import ProfileCard from '../ProfileCard/ProfileCard';
import styles from './SearchSection.module.css';

export default function SearchSection() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<WalletData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<WalletData | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'verified' | 'developer' | 'founder'>('all');
  
  const searchInputRef = useRef<HTMLInputElement>(null);
const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const quickSearches = [
    '0x3900971CbAaBE06Bb316F655dD2aF75896F4c666',
    '0xfCcf62e5a6B838689E0D21961775b80fb8645666',
    '0xB143856Ab1224D722Dbd0576E3Fc05D98f345666',
    'Alex Chen',
    'developer',
  ];

  const filters = [
    { key: 'all', label: 'All', icon: User },
    { key: 'verified', label: 'Verified', icon: Shield },
    { key: 'developer', label: 'Developers', icon: Zap },
    { key: 'founder', label: 'Founders', icon: TrendingUp },
  ];

// Update cleanup in useEffect:
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
    searchInputRef.current?.focus();
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setSelectedWallet(null);
    searchInputRef.current?.focus();
  };

  return (
    <section className={styles.searchSection}>
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
            <h2 className={styles.searchTitle}>
              Explore Web3 Identities
            </h2>
            <p className={styles.searchSubtitle}>
              Search by wallet address, name, or role to discover verified builders in our community
            </p>
          </div>

          {/* Search Input */}
          <div className={styles.searchInputWrapper}>
            <div className={styles.searchInput}>
              <Search className={styles.searchIcon} size={20} />
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Search wallet address, name, or role..."
                className={styles.input}
              />
              {query && (
                <button onClick={clearSearch} className={styles.clearButton}>
                  <X size={18} />
                </button>
              )}
              {isLoading && (
                <div className={styles.loadingSpinner}>
                  <div className={styles.spinner} />
                </div>
              )}
            </div>

            {/* Search Suggestions */}
            <AnimatePresence>
              {showSuggestions && !query && (
                <motion.div
                  className={styles.suggestions}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.suggestionHeader}>
                    <span>Quick searches</span>
                  </div>
                  {quickSearches.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickSearch(suggestion)}
                      className={styles.suggestion}
                    >
                      <Search size={14} />
                      <span>{suggestion}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Filters */}
          <div className={styles.filters}>
            {filters.map((filter) => (
              <button
                key={filter.key}
onClick={() => setActiveFilter(filter.key as typeof activeFilter)}
                className={`${styles.filter} ${activeFilter === filter.key ? styles.filterActive : ''}`}
              >
                <filter.icon size={16} />
                <span>{filter.label}</span>
              </button>
            ))}
          </div>

          {/* Search Results */}
          <AnimatePresence>
            {query && (
              <motion.div
                className={styles.resultsContainer}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isLoading ? (
                  <div className={styles.loadingState}>
                    <div className={styles.loadingContent}>
                      <div className={styles.loadingSpinner}>
                        <div className={styles.spinner} />
                      </div>
                      <span>Searching identities...</span>
                    </div>
                  </div>
                ) : results.length > 0 ? (
                  <div className={styles.results}>
                    <div className={styles.resultsHeader}>
                      <h3>Found {results.length} identities</h3>
                      <span className={styles.resultsFilter}>
                        Filter: {filters.find(f => f.key === activeFilter)?.label}
                      </span>
                    </div>
                    <div className={styles.resultsGrid}>
                      {results.slice(0, 12).map((wallet, index) => (
                        <motion.div
                          key={wallet.address}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                          <ProfileCard
                            wallet={wallet}
                            onClick={() => setSelectedWallet(wallet)}
                          />
                        </motion.div>
                      ))}
                    </div>
                    {results.length > 12 && (
                      <div className={styles.loadMore}>
                        <button className={styles.loadMoreButton}>
                          Load more results
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={styles.noResults}>
                    <div className={styles.noResultsContent}>
                      <Search size={48} />
                      <h3>No identities found</h3>
                      <p>Try searching with a different wallet address, name, or role</p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Selected Wallet Modal */}
        <AnimatePresence>
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
                  <X size={24} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
