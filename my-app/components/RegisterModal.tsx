'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Calendar, X } from 'lucide-react';

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              <X color="#3d1a14" size={24} />
            </button>

            <div
              style={{
                padding: '4rem 2rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'center',
              }}
            >
              <Calendar
                size={48}
                style={{
                  opacity: 0.2,
                  marginBottom: '2rem',
                  color: '#3d1a14',
                }}
              />

              <h3
                style={{
                  fontFamily: 'Playfair Display',
                  fontSize: '2rem',
                  margin: '0 0 1.5rem 0',
                  fontStyle: 'italic',
                  color: '#3d1a14',
                }}
              >
                Rejestracja Zewnętrzna
              </h3>

              <p
                style={{
                  opacity: 0.7,
                  lineHeight: 1.6,
                  marginBottom: '2.5rem',
                  maxWidth: '300px',
                  fontSize: '0.95rem',
                }}
              >
                Zapisy na nasze spotkania prowadzimy przez platformę Luma. Za
                chwilę zostaniesz tam przekierowany.
              </p>

              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <button
                  onClick={onClose}
                  style={{
                    padding: '1rem 2rem',
                    borderRadius: '99px',
                    background: 'transparent',
                    border: '1px solid rgba(61,26,20,0.2)',
                    color: '#3d1a14',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                  }}
                >
                  Wróć
                </button>
                <a
                  href="https://luma.com/gqvv6of9"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  style={{
                    background: '#3d1a14',
                    color: '#e8e4dc',
                    padding: '1rem 2rem',
                    borderRadius: '99px',
                    textDecoration: 'none',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  Przejdź do Luma <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegisterModal;
