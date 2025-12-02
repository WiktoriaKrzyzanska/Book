'use client';

import React from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { CursorVariant } from '../lib/bookTypes';

type ScrollToTopButtonProps = {
  setCursorVariant: (variant: CursorVariant) => void;
};

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  setCursorVariant,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const scrollTop = () => {
    const behavior: ScrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';

    window.scrollTo({ top: 0, behavior });

    const scrollingElement = document.scrollingElement || document.documentElement;
    scrollingElement.scrollTo({ top: 0, behavior });

    document.body.scrollTop = 0;
    (document.documentElement || document.body).scrollTop = 0;
  };

  return (
    <button
      type="button"
      aria-label="Wróć na górę strony"
      onClick={scrollTop}
      onMouseEnter={() => setCursorVariant('hover')}
      onMouseLeave={() => setCursorVariant('default')}
      style={{
        position: 'fixed',
        right: '1.5rem',
        bottom: '4.5rem',
        zIndex: 1200,
        width: '52px',
        height: '52px',
        borderRadius: '999px',
        border: '1px solid rgba(232,228,220,0.5)',
        background: 'rgba(0,0,0,0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 10px 25px rgba(0,0,0,0.45)',
      }}
    >
      <ArrowUp size={22} color="#e8e4dc" />
    </button>
  );
};

export default ScrollToTopButton;
