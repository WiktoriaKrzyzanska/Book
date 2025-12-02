'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X, Cookie as CookieIcon } from 'lucide-react';

type CookieSommelierProps = {
  onAccept?: () => void;
  onDecline?: () => void;
};

type ConsentData = {
  type: 'full' | 'essential';
  expiry: number; 
};

const CONSENT_KEY = 'wine-cookie-consent';
const CONSENT_DURATION_DAYS = 180; 

const styles = {
  overlay: {
    position: 'fixed' as const,
    left: '1.5rem',
    bottom: '1.5rem',
    zIndex: 100,
    perspective: '1000px', 
  },
  card: {
    width: '340px',
    maxWidth: 'calc(100vw - 3rem)',
    backgroundColor: 'rgba(60, 10, 20, 0.65)', 
    backdropFilter: 'blur(16px)', 
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    borderRadius: '24px 24px 24px 4px', 
    padding: '1.5rem',
    color: '#e8e4dc', 
    fontFamily: 'inherit',
    overflow: 'hidden',
    position: 'relative' as const,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '0.75rem',
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: 700,
    margin: 0,
    color: '#fff',
    letterSpacing: '0.02em',
  },
  text: {
    fontSize: '0.9rem',
    lineHeight: 1.5,
    margin: '0 0 1.25rem 0',
    opacity: 0.9,
    color: '#e8e4dc',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem',
  },
  primaryBtn: {
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    background: 'rgba(255, 255, 255, 0.95)',
    color: '#4a0404', 
    border: 'none',
    padding: '12px 20px',
    borderRadius: '12px',
    fontWeight: 600,
    fontSize: '0.95rem',
    cursor: 'pointer',
    overflow: 'hidden',
    transition: 'transform 0.2s ease',
  },
  secondaryBtn: {
    background: 'transparent',
    color: 'rgba(232, 228, 220, 0.6)',
    border: '1px solid rgba(232, 228, 220, 0.2)',
    padding: '8px 16px',
    borderRadius: '12px',
    fontSize: '0.8rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  toastOverlay: {
    position: 'absolute' as const,
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column' as const,
    background: 'rgba(60, 10, 20, 0.95)',
    borderRadius: '24px 24px 24px 4px',
    zIndex: 10,
  }
};

const AnimatedWineGlass = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  
      <path 
        d="M7 2C7 2 7 10 7 11C7 14 9 16 12 16C15 16 17 14 17 11C17 10 17 2 17 2H7Z" 
        stroke="#4a0404" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        style={{ zIndex: 2, position: 'relative' }}
      />
      <path d="M12 16V22" stroke="#4a0404" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 22H16" stroke="#4a0404" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      
      <motion.path
        d="M7.5 11C7.5 13.5 9.5 15.5 12 15.5C14.5 15.5 16.5 13.5 16.5 11V11H7.5V11Z"
        fill="#722F37" 
        initial={{ scaleY: 0, originY: 1 }}
        animate={{ scaleY: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
     
      <motion.path 
        d="M7.5 6H16.5" 
        stroke="#722F37" 
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 5 : 10 }}
        transition={{ duration: 0.4 }}
      />
    </svg>
  );
};


const setConsent = (type: 'full' | 'essential') => {
  const expiryDate = new Date();
  expiryDate.setTime(expiryDate.getTime() + (CONSENT_DURATION_DAYS * 24 * 60 * 60 * 1000));
  
  const data: ConsentData = {
    type,
    expiry: expiryDate.getTime()
  };
  
  localStorage.setItem(CONSENT_KEY, JSON.stringify(data));
};

const checkConsent = (): boolean => {
  if (typeof window === 'undefined') return true; 
  
  const stored = localStorage.getItem(CONSENT_KEY);
  if (!stored) return false;

  try {
    const data: ConsentData = JSON.parse(stored);
    const now = new Date().getTime();
    
    if (now > data.expiry) {
      localStorage.removeItem(CONSENT_KEY);
      return false;
    }
    
    return true; 
  } catch (e) {
    return false;
  }
};


const CookieSommelier: React.FC<CookieSommelierProps> = ({ onAccept, onDecline }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [status, setStatus] = useState<'idle' | 'celebrating' | 'closed'>('idle');

  useEffect(() => {
    const hasValidConsent = checkConsent();
    
    if (!hasValidConsent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setStatus('celebrating');
    
    setConsent('full');
    
    if (onAccept) onAccept();

    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setStatus('closed'), 600); 
    }, 1500);
  };

  const handleDecline = () => {
    setConsent('essential');
    
    setIsVisible(false);
    if (onDecline) onDecline();
  };

  if (status === 'closed') return null;

  const cardVariants: Variants = {
    hidden: { 
      y: 150, 
      opacity: 0,
      rotate: -5 
    },
    visible: { 
      y: 0, 
      opacity: 1, 
      rotate: 0,
      transition: { 
        type: 'spring', 
        stiffness: 120, 
        damping: 15,
        mass: 1
      }
    },
    exit: { 
      y: 200, 
      opacity: 0,
      transition: { duration: 0.5, ease: "backIn" }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div style={styles.overlay}>
          <motion.div
            style={styles.card}
            initial="hidden"
            exit="exit"
            variants={cardVariants}
            animate={status === 'celebrating' ? { rotateY: 360 } : "visible"}
            transition={status === 'celebrating' ? { duration: 0.6 } : undefined}
          >
            {status === 'idle' && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
              >
                <div style={styles.header}>
                  <CookieIcon size={24} color="#e8e4dc" />
                  <h3 style={styles.title}>Polityka Cookies</h3>
                </div>

                <p style={styles.text}>
                  Nasza strona serwuje cyfrowe ciasteczka, żeby wszystko działało gładko jak dobre Merlot. 
                  Zgadzasz się na cookies?
                </p>

                <div style={styles.buttonGroup}>
                  <motion.button
                    style={styles.primaryBtn}
                    onClick={handleAccept}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <AnimatedWineGlass isHovered={isHovered} />
                    <span>Akceptuję</span>
                  </motion.button>

                  <button 
                    style={styles.secondaryBtn} 
                    onClick={handleDecline}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(232, 228, 220, 0.6)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(232, 228, 220, 0.2)'}
                  >
                    Tylko niezbędne
                  </button>
                </div>
              </motion.div>
            )}

            {status === 'celebrating' && (
              <motion.div
                style={styles.toastOverlay}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  initial={{ rotate: -15, scale: 0.5 }}
                  animate={{ rotate: 0, scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  🥂
                </motion.div>
                <h3 style={{ ...styles.title, marginTop: '1rem', fontSize: '1.4rem' }}>
                  Na zdrowie!
                </h3>
              </motion.div>
            )}
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CookieSommelier;