'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './ContactForm.module.css';
import { InputField, SelectField, TextAreaField, INQUIRY_TYPES } from './FormFields';
import { FormStatus } from './FormStatus';
import { ContactInfo } from './ContactInfo';
import { User, Mail, Building, Phone, Hash } from 'lucide-react';

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

interface FormStatusType {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

const initialFormData: FormData = {
  fullName: '',
  email: '',
  company: '',
  phone: '',
  telegramHandle: '',
  inquiryType: '',
  subject: '',
  message: ''
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<FormStatusType>({
    type: 'idle',
    message: ''
  });

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
        setFormData(initialFormData);
        // Reset status after 3 seconds
        setTimeout(() => setStatus({ type: 'idle', message: '' }), 3000);
      } else {
        throw new Error(result.error || 'An error occurred');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error 
          ? error.message
          : 'Failed to send message. Please try again or contact us directly at contact@tingnect.com'
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

        <FormStatus type={status.type} message={status.message} />

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Row 1: Name & Email */}
          <div className={styles.formRow}>
            <InputField
              label="Full Name"
              name="fullName"
              icon={<User className={styles.inputIcon} size={18} />}
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />

            <InputField
              label="Email Address"
              name="email"
              type="email"
              icon={<Mail className={styles.inputIcon} size={18} />}
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              required
            />
          </div>

          {/* Row 2: Company & Phone */}
          <div className={styles.formRow}>
            <InputField
              label="Company/Organization"
              name="company"
              icon={<Building className={styles.inputIcon} size={18} />}
              value={formData.company || ''}
              onChange={handleInputChange}
              placeholder="Your company name"
            />

            <InputField
              label="Phone Number"
              name="phone"
              type="tel"
              icon={<Phone className={styles.inputIcon} size={18} />}
              value={formData.phone || ''}
              onChange={handleInputChange}
              placeholder="+84 xxx xxx xxx"
            />
          </div>

          {/* Row 3: Telegram & Inquiry Type */}
          <div className={styles.formRow}>
            <InputField
              label="Telegram Handle"
              name="telegramHandle"
              icon={<Hash className={styles.inputIcon} size={18} />}
              value={formData.telegramHandle || ''}
              onChange={handleInputChange}
              placeholder="@username"
            />

            <SelectField
              label="Inquiry Type"
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleInputChange}
              options={INQUIRY_TYPES}
            />
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
          <TextAreaField
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Please provide detailed information about your inquiry..."
            required
          />

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

        <ContactInfo />
      </motion.div>
    </div>
  );
};

export default ContactForm;
