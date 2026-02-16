import React from 'react';
import { MessageSquare } from 'lucide-react';
import styles from './ContactForm.module.css';

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  icon: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = 'text',
  icon,
  value,
  onChange,
  placeholder,
  required = false,
}) => (
  <div className={styles.formGroup}>
    <label htmlFor={name} className={styles.label}>
      {label} {required && '*'}
    </label>
    <div className={styles.inputWrapper}>
      {icon}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={styles.input}
        placeholder={placeholder}
      />
    </div>
  </div>
);

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  onChange,
  options,
}) => (
  <div className={styles.formGroup}>
    <label htmlFor={name} className={styles.label}>
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={styles.select}
    >
      <option value="">Select {label.toLowerCase()}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

interface TextAreaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  rows?: number;
  required?: boolean;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 5,
  required = false,
}) => (
  <div className={styles.formGroup}>
    <label htmlFor={name} className={styles.label}>
      {label} {required && '*'}
    </label>
    <div className={styles.inputWrapper}>
      <MessageSquare className={styles.textareaIcon} size={18} />
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className={styles.textarea}
        placeholder={placeholder}
      />
    </div>
  </div>
);

export const INQUIRY_TYPES = [
  { value: 'partnership', label: '🤝 Partnership & Collaboration' },
  { value: 'development', label: '💻 Development & Technical' },
  { value: 'investment', label: '💰 Investment Opportunities' },
  { value: 'community', label: '👥 Community & Events' },
  { value: 'technical', label: '🛠️ Technical Support' },
  { value: 'media', label: '📰 Media & Press' },
  { value: 'other', label: '📋 Other Inquiries' }
];
