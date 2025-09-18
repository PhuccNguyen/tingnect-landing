// src/app/privacy/PrivacyPolicyContent.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Users, Database, Globe, Calendar, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const PrivacyPolicyContent: React.FC = () => {
  const sections = [
    {
      icon: <Database size={24} />,
      title: 'Information We Collect',
      content: [
        'Personal Information: Name, email address, phone number, company details',
        'Web3 Data: Wallet addresses, transaction history, blockchain interactions',
        'Usage Data: Platform activity, feature usage, community interactions',
        'Technical Data: IP address, browser type, device information, cookies',
      ],
    },
    {
      icon: <Eye size={24} />,
      title: 'How We Use Your Information',
      content: [
        'Provide and improve our Web3 platform and services',
        'Facilitate community connections and networking opportunities',
        'Send important updates about events, products, and platform changes',
        'Analyze usage patterns to enhance user experience',
        'Ensure platform security and prevent fraudulent activities',
      ],
    },
    {
      icon: <Users size={24} />,
      title: 'Information Sharing',
      content: [
        'We do not sell your personal information to third parties',
        'Community profiles may be visible to other verified members',
        'Anonymous analytics may be shared with trusted partners',
        'Legal compliance: We may disclose information when required by law',
        'Business transfers: Information may be transferred in merger/acquisition scenarios',
      ],
    },
    {
      icon: <Lock size={24} />,
      title: 'Data Security',
      content: [
        'Enterprise-grade encryption for all data transmission and storage',
        'Regular security audits and vulnerability assessments',
        'Multi-factor authentication for sensitive account operations',
        'Secure blockchain integrations with industry best practices',
        'Limited access controls for our team members',
      ],
    },
    {
      icon: <Globe size={24} />,
      title: 'International Transfers',
      content: [
        'Data may be processed in Vietnam, Singapore, and other jurisdictions',
        'We ensure adequate protection through appropriate safeguards',
        'Cross-border transfers comply with applicable data protection laws',
        'Users in the EU are protected under GDPR framework',
        'Users can request data localization where legally required',
      ],
    },
  ];

  const rights = [
    'Access your personal data and receive a copy',
    'Rectify inaccurate or incomplete information',
    'Request deletion of your personal data',
    'Restrict processing of your information',
    'Data portability to another service provider',
    'Object to processing for marketing purposes',
    'Withdraw consent at any time',
  ];

  return (
    <>
      {/* SEO Metadata (not needed here, handled in page.tsx) */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="relative">
                <Image
                  src="/Image/Logo/TingNect/TingNecticon.svg"
                  alt="TingNect Logo"
                  width={80}
                  height={80}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              <Shield className="inline-block mr-3 text-blue-600" size={48} />
              Privacy Policy
            </h1>

            <div className="max-w-4xl mx-auto">
              <p className="text-lg sm:text-xl text-gray-600 mb-4 leading-relaxed">
                At TingNect, we&quotre committed to protecting your privacy and ensuring
                the security of your personal information in our Web3 ecosystem.
              </p>
              <p className="text-base sm:text-lg text-gray-500">
                <strong className="text-blue-600">Last Updated:</strong> January 15, 2025 |{' '}
                <strong className="text-purple-600">Effective Date:</strong> January 1, 2025
              </p>
            </div>
          </motion.div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg border border-gray-100 mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              Our Commitment to Your Privacy
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                TingNect operates as a premier Web3 platform connecting developers, entrepreneurs,
                and innovators globally. This Privacy Policy explains how we collect, use, protect,
                and share your information when you use our platform, services, and community features.
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                By using TingNect services, you agree to the collection and use of information
                in accordance with this policy. We encourage you to read this policy carefully
                and contact us if you have any questions.
              </p>
            </div>
          </motion.div>

          {/* Main Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start gap-4 mb-4 sm:mb-6">
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-3 text-blue-600">
                    {section.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{section.title}</h3>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-sm sm:text-base text-gray-700 leading-relaxed flex items-start gap-3"
                    >
                      <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Your Rights Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 text-white mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-3">
              <Users size={32} />
              Your Privacy Rights
            </h2>
            <p className="text-blue-100 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
              As a user of TingNect, you have several rights regarding your personal data.
              You can exercise these rights by contacting us at any time.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {rights.map((right, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-white/20 rounded-xl p-4 backdrop-blur-sm border border-white/30"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm sm:text-base">{right}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Calendar size={24} className="text-blue-600" />
                Data Retention
              </h3>
              <div className="space-y-3 text-sm sm:text-base text-gray-700">
                <p>We retain your personal data only as long as necessary to:</p>
                <ul className="space-y-2 ml-4">
                  <li>• Provide our services and maintain your account</li>
                  <li>• Comply with legal obligations</li>
                  <li>• Resolve disputes and enforce agreements</li>
                  <li>• Support business operations and analytics</li>
                </ul>
                <p className="mt-4 text-gray-600">
                  Typically, we retain active user data for the duration of your account
                  plus 3 years, unless longer retention is required by law.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Mail size={24} className="text-purple-600" />
                Contact Us
              </h3>
              <div className="space-y-4 text-sm sm:text-base text-gray-700">
                <p>If you have questions about this Privacy Policy or want to exercise your rights:</p>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <p>
                    <strong>Email:</strong> privacy@tingnect.com
                  </p>
                  <p>
                    <strong>General Contact:</strong> contact@tingnect.com
                  </p>
                  <p>
                    <strong>Address:</strong> Ho Chi Minh City, Vietnam
                  </p>
                  <p>
                    <strong>Response Time:</strong> Within 72 hours
                  </p>
                </div>
                <p className="text-gray-600">
                  We&quotre committed to addressing your privacy concerns promptly and transparently.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Footer Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 text-center"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Changes to This Privacy Policy
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
              We may update our Privacy Policy from time to time. We will notify you of any changes
              by posting the new Privacy Policy on this page and updating the Last Updated date.
              You are advised to review this Privacy Policy periodically for any changes.
              Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
              >
                Contact Privacy Team
              </Link>
              <Link
                href="/"
                className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-200"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyContent;