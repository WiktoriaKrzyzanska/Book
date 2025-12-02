'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, Loader2 } from 'lucide-react';
import { BookData, CursorVariant } from '../lib/bookTypes';
import BookScene from './BookScene';

type BookSectionProps = {
  book: BookData;
  loading: boolean;
  setCursorVariant: (variant: CursorVariant) => void;
  onOpenModal: () => void;
};

const BookSection: React.FC<BookSectionProps> = ({
  book,
  loading,
  setCursorVariant,
  onOpenModal,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '4rem 2rem',
        background: '#3d1a14',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: '1200px',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '4rem',
        }}
      >
        <div
          style={{
            flex: '1 1 400px',
            height: '650px',
            position: 'relative',
            zIndex: 1,
            cursor: 'pointer',
          }}
          onMouseEnter={() => setCursorVariant('book')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          {loading ? (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.5,
                color: '#e8e4dc',
              }}
            >
              <Loader2 size={32} className="animate-spin" />
            </div>
          ) : (
            <motion.div
              initial={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: 40 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.19, 1, 0.22, 1],
              }}
              style={{ width: '100%', height: '100%' }}
            >
              <BookScene
                bookData={book}
                reducedMotion={!!prefersReducedMotion}
              />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1, duration: 1 }}
            style={{
              position: 'absolute',
              left: 0,
              bottom: '2rem',
              width: '100%',
              textAlign: 'center',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#e8e4dc',
              pointerEvents: 'none',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            Kliknij książkę, aby otworzyć
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            flex: '1 1 350px',
            maxWidth: '450px',
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '3rem',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            zIndex: 2,
          }}
        >
          <div
            style={{
              textTransform: 'uppercase',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              color: '#cfa86e',
              marginBottom: '1.5rem',
              fontWeight: 600,
            }}
          >
            Klub Książki • Listopad
          </div>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '2.5rem',
              margin: '0 0 1.5rem 0',
              lineHeight: 1.1,
              color: '#e8e4dc',
            }}
          >
            {book.title}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 0',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                color: 'rgba(232,228,220,0.8)',
                fontSize: '0.9rem',
              }}
            >
              <Calendar size={18} color="#cfa86e" />{' '}
              <span>30 Listopada, 18:00</span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 0',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                color: 'rgba(232,228,220,0.8)',
                fontSize: '0.9rem',
              }}
            >
              <MapPin size={18} color="#cfa86e" />{' '}
              <span>Kawiarnia XYZ</span>
            </div>
          </div>

          <div
            style={{
              fontStyle: 'italic',
              padding: '1.5rem 0',
              opacity: 0.7,
              fontSize: '0.9rem',
              color: '#e8e4dc',
            }}
          >
            &mdash; {book.author}
          </div>

          <button
            onClick={onOpenModal}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            style={{
              marginTop: '1rem',
              background: '#cfa86e',
              color: '#3d1a14',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '99px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              width: '100%',
              cursor: 'none',
              transition: 'transform 0.2s',
            }}
          >
            Zapisz się <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BookSection;