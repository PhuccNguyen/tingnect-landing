'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2, HelpCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ChatWidget.module.css';
import Image from 'next/image';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatWidgetProps {
  assistantId?: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ assistantId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m TingNect AI Assistant. I can help you learn about our Web3 ecosystem, community, and opportunities. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestedQuestions = [
    "What is TingNect Build for Billions?",
    "How can I join the TingNect community?",
    "What Web3 products are you building?",
    "How to become a verified builder?",
    "Partnership opportunities?",
    "Developer resources and documentation"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Test API connection
  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            message: 'test', 
            threadId: null, 
            assistantId: assistantId 
          }),
        });
        setIsConnected(response.ok);
      } catch (error) {
        setIsConnected(false);
      }
    };

    if (isOpen) {
      testConnection();
    }
  }, [isOpen, assistantId]);

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    setShowSuggestions(false);
    setTimeout(() => sendMessage(question), 100);
  };

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setShowSuggestions(false);

    try {
      if (!isConnected) {
        throw new Error('API connection failed');
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          threadId: threadId,
          assistantId: assistantId
        }),
      });

      const data = await response.json();

      if (data.success) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: data.message,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
        
        if (data.threadId && !threadId) {
          setThreadId(data.threadId);
        }
      } else {
        throw new Error(data.error || 'API Error');
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'Sorry, I\'m experiencing technical difficulties. Please try again later or contact us directly at contact@tingnect.com.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* Chat Widget Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            onClick={() => setIsOpen(true)}
            className={styles.chatButton}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className={styles.buttonIcon}>
              <Image
                src="/Image/Logo/TingNect/TingNecticon.svg"
                alt="TingNect AI"
                width={28}
                height={28}
                className={styles.logoIcon}
              />
            </div>
            <span className={styles.pingAnimation}></span>
<div className={styles.notificationBadge}>
  <Image
    src="/Image/Logo/TingNect/TingNect icon.png"
    alt="TingNect Logo"
    width={25} 
    height={25}
  />
</div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.3 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 60 : 'auto'
            }}
            exit={{ opacity: 0, y: 100, scale: 0.3 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={styles.chatWindow}
          >
            {/* Header */}
            <div className={styles.chatHeader}>
              <div className={styles.headerContent}>
                <div className={styles.botAvatar}>
                  <Image
                    src="/Image/Logo/TingNect/TingNecticon.svg"
                    alt="TingNect AI"
                    width={24}
                    height={24}
                  />
                </div>
                <div className={styles.headerInfo}>
                  <h3 className={styles.headerTitle}>TingNect AI Assistant</h3>
                  <span className={styles.status}>
                    <span className={`${styles.onlineIndicator} ${!isConnected ? styles.offline : ''}`}></span>
                    {isConnected ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
              <div className={styles.headerActions}>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className={styles.headerButton}
                  title={isMinimized ? 'Expand' : 'Minimize'}
                >
                  <Minimize2 size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className={styles.headerButton}
                  title="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className={styles.messagesContainer}>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`${styles.message} ${styles[message.type]}`}
                    >
                      <div className={styles.messageAvatar}>
                        {message.type === 'bot' ? (
                          <Image
                            src="/Image/Logo/TingNect/TingNecticon.svg"
                            alt="TingNect AI"
                            width={16}
                            height={16}
                          />
                        ) : (
                          <User size={16} />
                        )}
                      </div>
                      <div className={styles.messageContent}>
                        <p className={styles.messageText}>{message.content}</p>
                        <span className={styles.timestamp}>
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Suggested Questions */}
                  {showSuggestions && messages.length === 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={styles.suggestionsContainer}
                    >
                      <div className={styles.suggestionsHeader}>
                        <HelpCircle size={16} />
                        <span>Suggested Questions</span>
                      </div>
                      <div className={styles.suggestions}>
                        {suggestedQuestions.map((question, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestedQuestion(question)}
                            className={styles.suggestionButton}
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`${styles.message} ${styles.bot}`}
                    >
                      <div className={styles.messageAvatar}>
                        <Image
                          src="/Image/Logo/TingNect/TingNecticon.svg"
                          alt="TingNect AI"
                          width={16}
                          height={16}
                        />
                      </div>
                      <div className={styles.messageContent}>
                        <div className={styles.typingIndicator}>
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className={styles.inputContainer}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about TingNect..."
                    className={styles.messageInput}
                    disabled={isLoading || !isConnected}
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!inputValue.trim() || isLoading || !isConnected}
                    className={styles.sendButton}
                    title="Send message"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
