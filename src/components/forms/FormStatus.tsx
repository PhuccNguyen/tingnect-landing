import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './ContactForm.module.css';

interface FormStatusProps {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export const FormStatus: React.FC<FormStatusProps> = ({ type, message }) => {
  if (type === 'idle') return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`${styles.statusMessage} ${styles[type]}`}
    >
      {type === 'success' && <CheckCircle size={20} />}
      {type === 'error' && <AlertCircle size={20} />}
      {type === 'loading' && <div className={styles.spinner} />}
      <span>{message}</span>
    </motion.div>
  );
};
