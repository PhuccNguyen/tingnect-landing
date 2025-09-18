'use client';

import React, { useState } from 'react';
import { Send, User, Mail, MessageSquare, CheckCircle, AlertCircle, Building, Phone, Hash } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './ContactForm.module.css';

interface FormData {
  fullName: string;
  email: string;
  company?: string;
  phone?: string;
  telegramHandle?: string;
  inquiryType: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    telegramHandle: '',
    inquiryType: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: ''
  });

  const inquiryTypes = [
    { value: 'partnership', label: '🤝 Partnership & Collaboration' },
    { value: 'development', label: '💻 Development & Technical' },
    { value: 'investment', label: '💰 Investment Opportunities' },
    { value: 'community', label: '👥 Community & Events' },
    { value: 'technical', label: '🛠️ Technical Support' },
    { value: 'media', label: '📰 Media & Press' },
    { value: 'other', label: '📋 Other Inquiries' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setStatus({ type: 'loading', message: 'Sending your message...' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({
          type: 'success',
          message: result.message || 'Your message has been sent successfully! We\'ll get back to you soon.'
        });
        setFormData({
          fullName: '',
          email: '',
          company: '',
          phone: '',
          telegramHandle: '',
          inquiryType: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error(result.error || 'An error occurred');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or contact us directly at contact@tingnect.com'
      });
    }
  };

  const isFormValid = formData.fullName && formData.email && formData.subject && formData.message;

  return (
    <div className={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.formWrapper}
      >
        <div className={styles.formHeader}>
          <h2 className={styles.formTitle}>Get in Touch</h2>
          <p className={styles.formSubtitle}>
            Send us a message and get a quick response from our team
          </p>
        </div>

        {/* Status Message */}
        {status.type !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${styles.statusMessage} ${styles[status.type]}`}
          >
            {status.type === 'success' && <CheckCircle size={20} />}
            {status.type === 'error' && <AlertCircle size={20} />}
            {status.type === 'loading' && (
              <div className={styles.spinner} />
            )}
            <span>{status.message}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Row 1: Name & Email */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="fullName" className={styles.label}>
                Full Name *
              </label>
              <div className={styles.inputWrapper}>
                <User className={styles.inputIcon} size={18} />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address *
              </label>
              <div className={styles.inputWrapper}>
                <Mail className={styles.inputIcon} size={18} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                  placeholder="your@email.com"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Company & Phone */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="company" className={styles.label}>
                Company/Organization
              </label>
              <div className={styles.inputWrapper}>
                <Building className={styles.inputIcon} size={18} />
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Your company name"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.label}>
                Phone Number
              </label>
              <div className={styles.inputWrapper}>
                <Phone className={styles.inputIcon} size={18} />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="+84 xxx xxx xxx"
                />
              </div>
            </div>
          </div>

          {/* Row 3: Telegram & Inquiry Type */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="telegramHandle" className={styles.label}>
                Telegram Handle
              </label>
              <div className={styles.inputWrapper}>
                <Hash className={styles.inputIcon} size={18} />
                <input
                  type="text"
                  id="telegramHandle"
                  name="telegramHandle"
                  value={formData.telegramHandle}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="@username"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="inquiryType" className={styles.label}>
                Inquiry Type
              </label>
              <select
                id="inquiryType"
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleInputChange}
                className={styles.select}
              >
                <option value="">Select inquiry type</option>
                {inquiryTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Subject Field */}
          <div className={styles.formGroup}>
            <label htmlFor="subject" className={styles.label}>
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className={styles.input}
              placeholder="Brief description of your inquiry"
            />
          </div>

          {/* Message Field */}
          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>
              Message *
            </label>
            <div className={styles.inputWrapper}>
              <MessageSquare className={styles.textareaIcon} size={18} />
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className={styles.textarea}
                placeholder="Please provide detailed information about your inquiry..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={!isFormValid || status.type === 'loading'}
            className={`${styles.submitButton} ${
              isFormValid && status.type !== 'loading' ? styles.active : styles.disabled
            }`}
            whileHover={isFormValid && status.type !== 'loading' ? { scale: 1.02 } : {}}
            whileTap={isFormValid && status.type !== 'loading' ? { scale: 0.98 } : {}}
          >
            {status.type === 'loading' ? (
              <>
                <div className={styles.spinner} />
                Sending...
              </>
            ) : (
              <>
                <Send size={18} />
                Send Message
              </>
            )}
          </motion.button>
        </form>

        {/* Contact Info */}
        <div className={styles.contactInfo}>
          <div className={styles.contactGrid}>
            <div className={styles.contactItem}>
              <h3>Direct Contact</h3>
              <p>Email: contact@tingnect.com</p>
              <p>Telegram: @tingnect_official</p>
            </div>
            <div className={styles.contactItem}>
              <h3>Response Time</h3>
              <p>Within 24 hours</p>
              <p>Mon - Fri: 9:00 - 18:00 (GMT+7)</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactForm;
