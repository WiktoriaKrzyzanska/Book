'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wine } from 'lucide-react';
import styles from './AgeVerification.module.css';

const AGE_COOKIE_NAME = 'cmwbc-age-verified';

const setCookie = (name: string, value: string, days: number) => {
  if (typeof document === 'undefined') return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

const getCookie = (name: string) => {
  if (typeof document === 'undefined') return null;
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const AgeVerification = () => {
  const [isVisible, setIsVisible] = useState(false);

 useEffect(() => {
  const hasVerified = getCookie(AGE_COOKIE_NAME);
  let timeoutId: number | undefined;

  if (!hasVerified) {
    document.body.style.overflow = 'hidden';
    timeoutId = window.setTimeout(() => {
      setIsVisible(true);
    }, 0);
  }
  return () => {
    if (timeoutId !== undefined) {
      window.clearTimeout(timeoutId);
    }
    document.body.style.overflow = 'unset';
  };
}, []);

  const handleVerify = () => {
    setCookie(AGE_COOKIE_NAME, 'true', 30);
    setIsVisible(false);
    document.body.style.overflow = 'unset';
  };

  const handleReject = () => {
    window.location.href = 'https://www.google.pl';
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={styles.overlay}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={styles.card}
          >
            <div className={styles.iconWrapper}>
              <div className={styles.iconCircle}>
                <Wine size={40} strokeWidth={1.5} />
              </div>
            </div>

            <h2 className={styles.title}>
              Witaj w CMWBC
            </h2>
            
            <p className={styles.description}>
              Dobre historie i wino smakują najlepiej w odpowiednim wieku. 
              Czy masz ukończone 18 lat?
            </p>

            <div className={styles.actions}>
              <button
                onClick={handleVerify}
                className={styles.btnPrimary}
              >
                TAK, wchodzę
              </button>

              <button
                onClick={handleReject}
                className={styles.btnSecondary}
              >
                NIE, opuść stronę
              </button>
            </div>
            
            <p className={styles.footer}>
              Używamy jednego pliku cookie tylko po to, aby zapamiętać Twój wiek. 
              Nie śledzimy Cię ani nie zbieramy Twoich danych.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AgeVerification;