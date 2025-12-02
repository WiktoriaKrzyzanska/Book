'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { ArrowRight, Wine, BookOpen } from 'lucide-react';
import { CursorVariant } from '../lib/bookTypes';

type HeroSectionProps = {
  y: MotionValue<number>;
  onGoToTickets: () => void;
  setCursorVariant: (variant: CursorVariant) => void;
};

const HeroSection: React.FC<HeroSectionProps> = ({
  y,
  onGoToTickets,
  setCursorVariant,
}) => {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '0 20px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '20%',
          width: '1px',
          background: '#e8e4dc',
          opacity: 0.05,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: '20%',
          width: '1px',
          background: '#e8e4dc',
          opacity: 0.05,
        }}
      />

      <motion.div
        style={{
          y,
          position: 'absolute',
          bottom: '10%',
          right: '15%',
          opacity: 0.1,
          zIndex: 0,
        }}
      >
        <Wine size={250} strokeWidth={0.5} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{
          position: 'absolute',
          top: '15%',
          left: '15%',
          opacity: 0.1,
          zIndex: 0,
        }}
      >
        <BookOpen size={180} strokeWidth={0.5} />
      </motion.div>

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem',
            opacity: 0.6,
          }}
        >
          <span
            style={{
              fontSize: '10px',
              letterSpacing: '0.4em',
              color: '#cfa86e',
              textTransform: 'uppercase',
              fontWeight: 700,
            }}
          >
            Klub
          </span>
          <div
            style={{ width: '1px', height: '30px', background: '#cfa86e' }}
          />
        </div>

        <h1 className="hero-title">CMWBC</h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p
            style={{
              fontSize: '1.5rem',
              fontStyle: 'italic',
              color: '#cfa86e',
              marginTop: '1rem',
              fontWeight: 300,
            }}
          >
            Czytam Między Winami
          </p>
          <p
            style={{
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              opacity: 0.4,
              marginTop: '0.5rem',
            }}
          >
            Bookclub
          </p>
        </motion.div>

        <div
          style={{
            marginTop: '4rem',
            display: 'flex',
            gap: '1.5rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={onGoToTickets}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            style={{
              padding: '1rem 2rem',
              borderRadius: '99px',
              background: '#e8e4dc',
              color: '#3d1a14',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontWeight: 600,
              fontSize: '0.9rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              cursor: 'none',
            }}
          >
            Dołącz <ArrowRight size={16} />
          </button>
          <button
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            style={{
              padding: '1rem 2rem',
              borderRadius: '99px',
              background: 'transparent',
              border: '1px solid rgba(232,228,220,0.2)',
              color: '#e8e4dc',
              fontWeight: 500,
              fontSize: '0.9rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              cursor: 'none',
            }}
          >
            Terminarz
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
