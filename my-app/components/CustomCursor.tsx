'use client';

import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Wine, BookOpen } from 'lucide-react';
import { CursorVariant } from '../lib/bookTypes';

type CustomCursorProps = {
  variant: CursorVariant;
};

const CustomCursor: React.FC<CustomCursorProps> = ({ variant }) => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 400, mass: 0.6 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [cursorX, cursorY]);

  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: '#e8e4dc',
      mixBlendMode: 'difference' as const,
    },
    hover: {
      width: 40,
      height: 40,
      backgroundColor: '#e8e4dc',
      mixBlendMode: 'difference' as const,
      opacity: 0.8,
    },
    wine: {
      width: 80,
      height: 80,
      backgroundColor: '#cfa86e',
      mixBlendMode: 'normal' as const,
    },
    book: {
      width: 80,
      height: 80,
      backgroundColor: '#59241e',
      border: '2px solid #e8e4dc',
      mixBlendMode: 'normal' as const,
    },
  };

  return (
    <motion.div
      className="custom-cursor"
      style={{ x, y }}
      animate={variant}
      variants={variants}
    >
      {variant === 'wine' && <Wine size={32} color="#3d1a14" />}
      {variant === 'book' && <BookOpen size={32} color="#e8e4dc" />}
    </motion.div>
  );
};

export default CustomCursor;
