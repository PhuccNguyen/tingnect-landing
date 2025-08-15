// src/components/id/RegisterForm/RegisterForm.tsx
'use client';

import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './RegisterForm.module.css';

// Dynamic import for 3D background
const BlockchainScene = React.lazy(() => import('../BlockchainScene/BlockchainScene'));

interface FormData {
  cardID: string;
  fullName: string;
  phone: string;
  email: string;
  telegram: string;
  role: string;
  experience: string;
  interests: string[];
  consent: boolean;
}

interface FormErrors {
  cardID?: string;
  fullName?: string;
  phone?: string;
  email?: string;
  telegram?: string;
  role?: string;
  experience?: string;
  interests?: string;
  consent?: string;
}

interface SubmissionResponse {
  success: boolean;
  message: string;
  cardID?: string;
}

const ROLES = [
  { value: 'developer', label: 'Developer' },
  { value: 'founder', label: 'Founder' },
  { value: 'investor', label: 'Investor' },
  { value: 'builder', label: 'Builder' },
  { value: 'designer', label: 'Designer' },
  { value: 'marketer', label: 'Marketer' },
  { value: 'community', label: 'Community Manager' },
  { value: 'other', label: 'Other' }
];

const INTERESTS = [
  'DeFi', 'NFTs', 'GameFi', 'Web3 Social', 'Layer 2', 'Cross-chain',
  'DAO', 'Metaverse', 'AI + Blockchain', 'Privacy Tech', 'Green Blockchain', 'Education'
];

const EXPERIENCE_LEVELS = [
  { value: 'beginner', label: 'Beginner (0-1 years)' },
  { value: 'intermediate', label: 'Intermediate (1-3 years)' },
  { value: 'advanced', label: 'Advanced (3-5 years)' },
  { value: 'expert', label: 'Expert (5+ years)' }
];

export default function RegisterForm(): React.ReactElement {
  const [formData, setFormData] = useState<FormData>({
    cardID: '',
    fullName: '',
    phone: '',
    email: '',
    telegram: '',
    role: '',
    experience: '',
    interests: [],
    consent: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Validate Card ID (2+ digits)
  const validateCardID = (value: string): string => {
    const numericValue = value.replace(/\D/g, '');
    return numericValue.slice(0, 12);
  };

  // Format phone number with +84
  const formatPhoneNumber = (value: string): string => {
    const numericValue = value.replace(/\D/g, '');
    return numericValue;
  };

  // Real-time validation
  const validateField = (name: keyof FormData, value: string | string[] | boolean): string => {
    switch (name) {
      case 'cardID':
        if (!value || (typeof value === 'string' && value.length === 0)) return 'Card ID is required';
        if (typeof value === 'string' && value.length < 2) return 'Card ID must be at least 2 digits';
        if (typeof value === 'string' && !/^\d+$/.test(value)) return 'Card ID must contain only numbers';
        return '';

      case 'fullName':
        if (!value || (typeof value === 'string' && value.trim().length === 0)) return 'Full name is required';
        if (typeof value === 'string' && value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';

      case 'phone':
        if (!value || (typeof value === 'string' && value.length === 0)) return 'Phone number is required';
        if (typeof value === 'string' && !/^\d{9,10}$/.test(value)) return 'Phone must be 9-10 digits';
        return '';

      case 'email':
        if (!value || (typeof value === 'string' && value.length === 0)) return 'Email is required';
        if (typeof value === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
        return '';

      case 'telegram':
        if (value && typeof value === 'string' && value.length > 0) {
          if (!/^@?[a-zA-Z0-9_]{5,32}$/.test(value.replace('@', ''))) {
            return 'Invalid Telegram username';
          }
        }
        return '';

      case 'consent':
        if (typeof value === 'boolean' && !value) return 'Please accept the terms';
        return '';

      default:
        return '';
    }
  };

  // Handle input change
  const handleInputChange = (name: keyof FormData, value: string | string[] | boolean): void => {
    let processedValue = value;

    if (name === 'cardID' && typeof value === 'string') {
      processedValue = validateCardID(value);
    } else if (name === 'phone' && typeof value === 'string') {
      processedValue = formatPhoneNumber(value);
    } else if (name === 'telegram' && typeof value === 'string') {
      processedValue = value.startsWith('@') ? value : (value ? `@${value}` : '');
    }

    setFormData(prev => ({ ...prev, [name]: processedValue }));

    // Real-time validation
    const error = validateField(name, processedValue);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Handle interest toggle
  const toggleInterest = (interest: string): void => {
    const currentInterests = formData.interests;
    const newInterests = currentInterests.includes(interest)
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest];

    handleInputChange('interests', newInterests);
  };

  // Validate form step
  const validateStep = (step: number): boolean => {
    const stepFields: { [key: number]: (keyof FormData)[] } = {
      1: ['cardID', 'fullName'],
      2: ['phone', 'email'],
      3: [],
      4: ['consent']
    };

    const fieldsToValidate = stepFields[step] || [];
    let isValid = true;
    const newErrors: FormErrors = { ...errors };

    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      } else {
        delete newErrors[field];
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (honeypot) return;

    const requiredFieldsValid = validateStep(1) && validateStep(2) && validateStep(4);
    if (!requiredFieldsValid) return;

    setIsSubmitting(true);

    try {
      const submissionData = {
        ...formData,
        phone: `+84${formData.phone}`,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        consentTimestamp: new Date().toISOString()
      };

      const response = await fetch('/api/member-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result: SubmissionResponse = await response.json();

      if (result.success) {
        setShowSuccessDialog(true);
        setTimeout(() => {
          setIsSuccess(true);
          setShowSuccessDialog(false);
        }, 2000);

        // Reset form
        setFormData({
          cardID: '',
          fullName: '',
          phone: '',
          email: '',
          telegram: '',
          role: '',
          experience: '',
          interests: [],
          consent: false
        });
        setErrors({});
        setCurrentStep(1);
      } else {
        throw new Error(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ 
        consent: error instanceof Error ? error.message : 'Registration failed. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Next/Previous step handlers
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Success Dialog
  const SuccessDialog = () => (
    <AnimatePresence>
      {showSuccessDialog && (
        <motion.div
          className={styles.dialogOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.dialogContent}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.dialogIcon}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                ✓
              </motion.div>
            </div>
            <h3>Thank you for joining!</h3>
            <p>Your TingNect card is being created...</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Success Screen
  if (isSuccess) {
    return (
      <section id="register" className={styles.container}>
        <Suspense fallback={<div className={styles.loadingBg}>Loading...</div>}>
          <BlockchainScene />
        </Suspense>
        
        <div className={styles.wrapper}>
          <motion.div
            className={styles.successCard}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.successIcon}>
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ✨
              </motion.div>
            </div>
            <h2>Welcome to TingNect!</h2>
            <p>Your membership has been confirmed. You&apos;ll receive updates about exclusive opportunities and community events.</p>
            
            <div className={styles.successStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>15K+</span>
                <span className={styles.statLabel}>Members</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>50+</span>
                <span className={styles.statLabel}>Countries</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>24/7</span>
                <span className={styles.statLabel}>Support</span>
              </div>
            </div>

            <motion.button
              className={styles.successButton}
              onClick={() => setIsSuccess(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Create Another Card
            </motion.button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className={styles.container}>
      <Suspense fallback={<div className={styles.loadingBg}>Loading...</div>}>
        <BlockchainScene />
      </Suspense>

      <SuccessDialog />

      <div className={styles.wrapper}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className={styles.header}>
            <motion.div 
              className={styles.logoContainer}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Image
                src="/Image/Logo/TingNect/TingNect.svg"
                alt="TingNect"
                width={120}
                height={40}
                className={styles.logo}
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Join TingNect Community
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Connect with Web3 builders, innovators, and pioneers
            </motion.p>
          </div>

          {/* Progress Indicator */}
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <motion.div 
                className={styles.progressFill}
                initial={{ width: '25%' }}
                animate={{ width: `${(currentStep / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className={styles.progressText}>
              Step {currentStep} of 4
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Honeypot */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            <AnimatePresence mode="wait">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  className={styles.stepContent}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.stepHeader}>
                    <h3>Basic Information</h3>
                    <p>Let&apos;s start with your details</p>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="cardID" className={styles.label}>
                      Card ID <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      id="cardID"
                      value={formData.cardID}
                      onChange={(e) => handleInputChange('cardID', e.target.value)}
                      className={`${styles.input} ${errors.cardID ? styles.inputError : ''}`}
                      placeholder="Enter 2+ digits"
                      maxLength={12}
                    />
                    {errors.cardID && (
                      <motion.span 
                        className={styles.errorText}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {errors.cardID}
                      </motion.span>
                    )}
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="fullName" className={styles.label}>
                      Full Name <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
                      placeholder="Your full name"
                    />
                    {errors.fullName && (
                      <motion.span 
                        className={styles.errorText}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {errors.fullName}
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Contact Information */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  className={styles.stepContent}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.stepHeader}>
                    <h3>Contact Information</h3>
                    <p>How can we reach you?</p>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="phone" className={styles.label}>
                      Phone Number <span className={styles.required}>*</span>
                    </label>
                    <div className={styles.phoneContainer}>
                      <span className={styles.phonePrefix}>+84</span>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`${styles.phoneInput} ${errors.phone ? styles.inputError : ''}`}
                        placeholder="9XXXXXXXX"
                        maxLength={10}
                      />
                    </div>
                    {errors.phone && (
                      <motion.span 
                        className={styles.errorText}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {errors.phone}
                      </motion.span>
                    )}
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="email" className={styles.label}>
                      Email Address <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <motion.span 
                        className={styles.errorText}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {errors.email}
                      </motion.span>
                    )}
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="telegram" className={styles.label}>
                      Telegram <span className={styles.optional}>(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="telegram"
                      value={formData.telegram}
                      onChange={(e) => handleInputChange('telegram', e.target.value)}
                      className={`${styles.input} ${errors.telegram ? styles.inputError : ''}`}
                      placeholder="@username"
                    />
                    {errors.telegram && (
                      <motion.span 
                        className={styles.errorText}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {errors.telegram}
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Profile (Optional) */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  className={styles.stepContent}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.stepHeader}>
                    <h3>Profile Information</h3>
                    <p>Tell us about your Web3 journey <span className={styles.optional}>(Optional)</span></p>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Role</label>
                    <div className={styles.dropdown}>
                      <button
                        type="button"
                        onClick={() => setShowDropdown(showDropdown === 'role' ? null : 'role')}
                        className={styles.dropdownToggle}
                      >
                        {formData.role ? ROLES.find(r => r.value === formData.role)?.label || 'Select role' : 'Select your role'}
                        <span className={styles.dropdownArrow}>▼</span>
                      </button>
                      <AnimatePresence>
                        {showDropdown === 'role' && (
                          <motion.div
                            className={styles.dropdownMenu}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                          >
                            {ROLES.map((role) => (
                              <button
                                key={role.value}
                                type="button"
                                onClick={() => {
                                  handleInputChange('role', role.value);
                                  setShowDropdown(null);
                                }}
                                className={`${styles.dropdownItem} ${formData.role === role.value ? styles.dropdownItemSelected : ''}`}
                              >
                                {role.label}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Experience Level</label>
                    <div className={styles.dropdown}>
                      <button
                        type="button"
                        onClick={() => setShowDropdown(showDropdown === 'experience' ? null : 'experience')}
                        className={styles.dropdownToggle}
                      >
                        {formData.experience ? EXPERIENCE_LEVELS.find(e => e.value === formData.experience)?.label || 'Select experience' : 'Select experience level'}
                        <span className={styles.dropdownArrow}>▼</span>
                      </button>
                      <AnimatePresence>
                        {showDropdown === 'experience' && (
                          <motion.div
                            className={styles.dropdownMenu}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                          >
                            {EXPERIENCE_LEVELS.map((level) => (
                              <button
                                key={level.value}
                                type="button"
                                onClick={() => {
                                  handleInputChange('experience', level.value);
                                  setShowDropdown(null);
                                }}
                                className={`${styles.dropdownItem} ${formData.experience === level.value ? styles.dropdownItemSelected : ''}`}
                              >
                                {level.label}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Areas of Interest</label>
                    <div className={styles.dropdown}>
                      <button
                        type="button"
                        onClick={() => setShowDropdown(showDropdown === 'interests' ? null : 'interests')}
                        className={styles.dropdownToggle}
                      >
                        {formData.interests.length > 0 ? `${formData.interests.length} selected` : 'Select interests'}
                        <span className={styles.dropdownArrow}>▼</span>
                      </button>
                      <AnimatePresence>
                        {showDropdown === 'interests' && (
                          <motion.div
                            className={styles.dropdownMenu}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className={styles.interestsGrid}>
                              {INTERESTS.map((interest) => (
                                <button
                                  key={interest}
                                  type="button"
                                  onClick={() => toggleInterest(interest)}
                                  className={`${styles.interestTag} ${formData.interests.includes(interest) ? styles.interestSelected : ''}`}
                                >
                                  {interest}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Consent & Preview */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  className={styles.stepContent}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.stepHeader}>
                    <h3>Review & Confirm</h3>
                    <p>Final step to join the community</p>
                  </div>

                  <div className={styles.cardPreview}>
                    <div className={styles.previewHeader}>Your TingNect Card</div>
                    <div className={styles.previewContent}>
                      <div className={styles.previewId}>#{formData.cardID || '••••••'}</div>
                      <div className={styles.previewName}>{formData.fullName || 'Your Name'}</div>
                      <div className={styles.previewRole}>{formData.role ? ROLES.find(r => r.value === formData.role)?.label : 'Member'}</div>
                    </div>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => handleInputChange('consent', e.target.checked)}
                        className={styles.checkbox}
                      />
                      <span className={styles.checkboxCustom}></span>
                      <span className={styles.consentText}>
                        I agree to the{' '}
                        <a href="/terms" target="_blank" className={styles.link}>Terms of Service</a>
                        {' '}and{' '}
                        <a href="/privacy" target="_blank" className={styles.link}>Privacy Policy</a>
                      </span>
                    </label>
                    {errors.consent && (
                      <motion.span 
                        className={styles.errorText}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {errors.consent}
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className={styles.navigation}>
              {currentStep > 1 && (
                <motion.button
                  type="button"
                  onClick={prevStep}
                  className={styles.navButton}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Previous
                </motion.button>
              )}

              {currentStep < 4 ? (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  className={`${styles.navButton} ${styles.navButtonPrimary}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Next
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${styles.navButton} ${styles.navButtonPrimary} ${isSubmitting ? styles.submitting : ''}`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className={styles.spinner}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Creating...
                    </>
                  ) : (
                    'Join Community'
                  )}
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
