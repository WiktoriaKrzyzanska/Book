'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useAnimation } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cards } from '../lib/bookConstants';
import { CursorVariant } from '../lib/bookTypes';

type VibeCarouselProps = {
  setCursorVariant: (variant: CursorVariant) => void;
};

const VibeCarousel: React.FC<VibeCarouselProps> = ({ setCursorVariant }) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);
  const controls = useAnimation();

  useEffect(() => {
    if (!carouselRef.current) return;
    const measure = () => {
      if (carouselRef.current) {
        setWidth(
          carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
        );
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    const hint = async () => {
      await controls.start({ x: -40, transition: { duration: 0.4 } });
      await controls.start({ x: 0, transition: { duration: 0.4 } });
    };
    hint();
  }, [controls]);

  const step = 360;

  const move = (dir: 'left' | 'right') => {
    const current = x.get();
    let target = dir === 'left' ? current + step : current - step;

    if (target > 0) target = 0;
    if (target < -width) target = -width;

    x.set(target);
  };

  return (
    <section
      style={{
        background: '#ecebec',
        padding: '8rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          width: '1px',
          height: '60px',
          background: '#d3c3a0',
          opacity: 0.6,
          transform: 'translateX(-50%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '80px',
            background:
              'linear-gradient(to right, #ecebec 0%, rgba(236,235,236,0) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '80px',
            background:
              'linear-gradient(to left, #ecebec 0%, rgba(236,235,236,0) 100%)',
          }}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '3.5rem',
            color: '#3d1a14',
            fontStyle: 'italic',
            margin: 0,
          }}
        >
          Vibe
        </h2>
        <p
          style={{
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            opacity: 0.7,
            marginTop: '1rem',
            color: '#7a5b3f',
          }}
        >
          Przesuń, aby odkryć lub użyj strzałek
        </p>
      </div>

      <button
        aria-label="Poprzednie"
        onClick={() => move('left')}
        style={{
          position: 'absolute',
          left: '1.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 5,
          background: 'rgba(255,255,255,0.9)',
          borderRadius: '999px',
          border: '1px solid rgba(15,23,42,0.08)',
          padding: '0.5rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 12px 25px rgba(15,23,42,0.15)',
          backdropFilter: 'blur(6px)',
        }}
        onMouseEnter={() => setCursorVariant('hover')}
        onMouseLeave={() => setCursorVariant('default')}
      >
        <ChevronLeft size={20} color="#3d1a14" />
      </button>

      <button
        aria-label="Następne"
        onClick={() => move('right')}
        style={{
          position: 'absolute',
          right: '1.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 5,
          background: 'rgba(255,255,255,0.9)',
          borderRadius: '999px',
          border: '1px solid rgba(15,23,42,0.08)',
          padding: '0.5rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 12px 25px rgba(15,23,42,0.15)',
          backdropFilter: 'blur(6px)',
        }}
        onMouseEnter={() => setCursorVariant('hover')}
        onMouseLeave={() => setCursorVariant('default')}
      >
        <ChevronRight size={20} color="#3d1a14" />
      </button>

      <motion.div
        ref={carouselRef}
        style={{ width: '100%', overflowX: 'hidden' }}
        whileTap={{ cursor: 'grabbing' }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          style={{
            x,
            display: 'flex',
            gap: '2rem',
            padding: '0 10vw',
            width: 'max-content',
          }}
          animate={controls}
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              style={{
                width: '320px',
                height: '420px',
                background: 'rgba(255,255,255,0.92)',
                border: '1px solid rgba(15,23,42,0.06)',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: '12px',
                boxShadow: '0 18px 45px rgba(15,23,42,0.08)',
              }}
              onMouseEnter={() => setCursorVariant(card.cursorType)}
              onMouseLeave={() => setCursorVariant('default')}
              whileHover={{
                y: -10,
                backgroundColor: 'rgba(255,255,255,1)',
                boxShadow: '0 22px 55px rgba(15,23,42,0.12)',
              }}
            >
              <div style={{ color: '#b9854b' }}>{card.icon}</div>
              <div>
                <h3
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.75rem',
                    marginBottom: '1rem',
                    color: '#2b1c1a',
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.95rem',
                    opacity: 0.85,
                    lineHeight: 1.6,
                    fontWeight: 300,
                    color: '#4a3a35',
                  }}
                >
                  {card.desc}
                </p>
              </div>
              <div
                style={{
                  fontSize: '0.8rem',
                  fontFamily: 'monospace',
                  opacity: 0.5,
                  color: '#7a5b3f',
                }}
              >
                0{card.id}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default VibeCarousel;
