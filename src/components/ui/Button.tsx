'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2 font-semibold rounded-xl 
    transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 
    focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed
    relative overflow-hidden backdrop-blur-sm
  `;
  
  const variants = {
    primary: `
      bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 text-white 
      hover:from-blue-500 hover:via-purple-500 hover:to-cyan-400 
      focus:ring-blue-500 shadow-lg hover:shadow-xl hover:shadow-blue-500/25
      border border-transparent hover:border-blue-400/30
    `,
    secondary: `
      bg-gradient-to-r from-slate-700 to-slate-600 text-white 
      hover:from-slate-600 hover:to-slate-500 focus:ring-slate-500
      shadow-lg hover:shadow-xl border border-slate-600/30 hover:border-slate-500/50
    `,
    outline: `
      border-2 border-blue-500/50 text-blue-400 hover:text-white
      hover:bg-blue-500/10 hover:border-blue-400 focus:ring-blue-500 
      backdrop-blur-md bg-blue-500/5 hover:bg-blue-500/15
      shadow-lg hover:shadow-blue-500/20
    `,
    ghost: `
      text-slate-300 hover:text-white hover:bg-white/10 focus:ring-slate-500
      border border-transparent hover:border-white/20 backdrop-blur-md
    `,
  };

  const sizes = {
    sm: 'px-4 py-2.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`.trim();

  const ButtonContent = () => (
    <>
      {children}
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </>
  );

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonClasses} group`}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <ButtonContent />
        </motion.a>
      );
    }
    
    return (
      <Link href={href} className="inline-block">
        <motion.div
          className={`${buttonClasses} group`}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <ButtonContent />
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${buttonClasses} group`}
      whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -1 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <ButtonContent />
    </motion.button>
  );
};

export default Button;
