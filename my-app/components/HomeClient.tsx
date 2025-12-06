'use client';

import React, { useEffect, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';

import GrainOverlay from './GrainOverlay';
import CustomCursor from './CustomCursor';
import HeroSection from './HeroSection';
import VibeCarousel from './VibeCarousel';
import BookSection from './BookSection';
import ScrollToTopButton from './ScrollToTopButton';

import { BookData, CursorVariant } from '../lib/bookTypes';
import {
  BOOK_FALLBACK,
  CURRENT_BOOK_ISBN,
  GOOGLE_BOOKS_API,
} from '../lib/bookConstants';
import CookieSommelier from './CookieSommelier';
import EventShowcase from './EventShowcase';
import HowItWorks from './HowItWorks';
import HallOfFame from './HallOfFame';
import Footer from './Footer';
import ProfileSection from './ProfileSection';
import CookiesSommelier from './CookiesSommelier';
import TicketTailorSection from './TicketTailorSelection';
import RegisterModal from './RegisterModal'; 
import AgeVerification from './AgeVerification';

const stylesCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap');
  
  *, *::before, *::after { box-sizing: border-box; } 

  body, html { 
    margin: 0; 
    padding: 0; 
    background-color: #3d1a14; 
    color: #e8e4dc; 
    font-family: 'Inter', sans-serif; 
    overflow-x: hidden; 
    width: 100%;
    cursor: none; 
  }
  
  @media (max-width: 768px) { body, html { cursor: auto; } }
  
  .nav { 
    position: fixed; 
    top: 0; 
    left: 0; 
    width: 100%; 
    padding: 2rem; 
    display: flex; 
    justify-content: space-between; 
    z-index: 40; 
    mix-blend-mode: difference; 
    color: #e8e4dc; 
    pointer-events: none; 
  }

  @media (max-width: 768px) {
    .nav { padding: 1.5rem 1rem; }
  }

  .nav-text { font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 600; }
  
  .hero-title { font-family: 'Playfair Display', serif; font-size: clamp(3.5rem, 15vw, 10rem); line-height: 0.85; text-align: center; background: linear-gradient(to bottom, #e8e4dc, #8a8a8a); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0; pointer-events: none; }
  
  .custom-cursor { position: fixed; pointer-events: none; z-index: 9999; transform: translate(-50%, -50%); display: flex; align-items: center; justify-content: center; border-radius: 50%; top: 0; left: 0; }
  
  .modal-overlay { position: fixed; inset:0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); z-index: 1000; display: flex; align-items: center; justify-content: center; cursor: auto; padding: 20px; }
  .modal-content { background: #e8e4dc; width: 100%; max-width: 500px; border-radius: 16px; position: relative; color: #3d1a14; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
`;

const HomeClient: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const [cursorVariant, setCursorVariant] =
    useState<CursorVariant>('default');
  const [book, setBook] = useState<BookData>(BOOK_FALLBACK);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${GOOGLE_BOOKS_API}?q=isbn:${CURRENT_BOOK_ISBN}`
        );
        const data = await res.json();

        if (data.items && data.items.length > 0) {
          const volume = data.items[0].volumeInfo;

          setBook({
            title: volume.title || BOOK_FALLBACK.title,
            author: volume.authors?.[0] || BOOK_FALLBACK.author,
            description: volume.description
              ? volume.description
                  .replace(/<[^>]*>?/gm, '')
                  .slice(0, 350) + '...'
              : BOOK_FALLBACK.description,
            color: BOOK_FALLBACK.color,
            coverUrl: BOOK_FALLBACK.coverUrl,
          });
        } else {
          setBook(BOOK_FALLBACK);
        }
      } catch (e) {
        console.warn('Błąd API, używam fallbacku', e);
        setBook(BOOK_FALLBACK);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, []);

  const handleScrollToTickets = () => {
    const el = document.getElementById('rejestracja');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: stylesCSS }} />
       <AgeVerification />
      <GrainOverlay />
      <CustomCursor variant={cursorVariant} />
      
      <RegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <nav className="nav">
        <div className="nav-text">Est. 2024</div>
        <div className="nav-text">Łódź / Online</div>
      </nav>

      <div
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <HeroSection
          y={y}
          onGoToTickets={handleScrollToTickets}
          setCursorVariant={setCursorVariant}
        />

        <VibeCarousel setCursorVariant={setCursorVariant} />

        <BookSection
          book={book}
          loading={loading}
          setCursorVariant={setCursorVariant}
          onOpenModal={() => setIsModalOpen(true)}
        />

        <HowItWorks />

        <TicketTailorSection setCursorVariant={setCursorVariant} />

        <HallOfFame />
        <EventShowcase />
        <ProfileSection />
        <CookiesSommelier />
        <Footer />
      </div>
      <CookieSommelier />
      <ScrollToTopButton setCursorVariant={setCursorVariant} />
    </>
  );
};

export default HomeClient;