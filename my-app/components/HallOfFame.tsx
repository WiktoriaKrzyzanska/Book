'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wine } from 'lucide-react';
import styles from './HallOfFame.module.css';

const pastMeetings = [
  {
    id: 1,
    title: 'Wielki Gatsby',
    author: 'F. Scott Fitzgerald',
    date: 'Październik 2024',
    rating: 4.5,
    review: 'Niesamowity klimat lat 20. Wino lało się strumieniami, a dyskusja o moralności trwała do północy.',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Klubowa Kolacja',
    author: 'Spotkanie Integracyjne',
    date: 'Wrzesień 2024',
    rating: 5,
    review: 'Tym razem bez lektury, za to z pysznym jedzeniem. Najlepsza frekwencja w historii!',
    image: 'https://images.unsplash.com/photo-1519671482502-9759101d4574?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Norwegian Wood',
    author: 'Haruki Murakami',
    date: 'Sierpień 2024',
    rating: 4,
    review: 'Melancholijny wieczór przy czerwonym winie. Podzielone zdania co do zakończenia.',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Rok 1984',
    author: 'George Orwell',
    date: 'Lipiec 2024',
    rating: 5,
    review: 'Przerażająco aktualna. Dyskusja była tak gorąca, że musieliśmy domówić lodu do napojów.',
    image: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Duma i Uprzedzenie',
    author: 'Jane Austen',
    date: 'Czerwiec 2024',
    rating: 4.5,
    review: 'Klasyka w najlepszym wydaniu. Pan Darcy zyskał nowe fanki w naszym klubie.',
    image: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=800&auto=format&fit=crop',
  },
    {
    id: 6,
    title: 'Małe Życie',
    author: 'Hanya Yanagihara',
    date: 'Maj 2024',
    rating: 5,
    review: 'Płakałyśmy. Wszystkie. To było najbardziej emocjonalne spotkanie w historii klubu.',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&auto=format&fit=crop',
  },
];

const GrainTexture = () => (
  <svg className={styles.grainSvg}>
    <filter id="noiseFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
  </svg>
);

const WineRating = ({ rating }: { rating: number }) => {
  return (
    <div className={styles.ratingContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={styles.starWrapper}>
          <Wine 
            size={20} 
            className={star <= rating ? styles.starFull : styles.starEmpty} 
          />
          {star > rating && star - 1 < rating && (
            <div className={styles.starHalfContainer}>
               <Wine size={20} className={styles.starFull} />
            </div>
          )}
        </span>
      ))}
    </div>
  );
};

const Marquee = ({ children, direction = 'left', speed = 20 }: { children: React.ReactNode, direction?: 'left' | 'right', speed?: number }) => {
  return (
    <div className={styles.marqueeTrackContainer}>
  
      <div className={styles.gradientLeft} />
      <div className={styles.gradientRight} />

      <motion.div
        className={styles.marqueeContent}
        initial={{ x: direction === 'left' ? 0 : '-50%' }}
        animate={{ x: direction === 'left' ? '-50%' : 0 }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {children}
        {children} 
        {children}
      </motion.div>
    </div>
  );
};

const Card = ({ item, onClick }: { item: typeof pastMeetings[0], onClick: () => void }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05, filter: 'grayscale(0%)' }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={styles.card}
    >
      <img 
        src={item.image} 
        alt={item.title} 
        className={styles.cardImg}
      />
      
      <GrainTexture />

      <div className={styles.cardOverlay}>
        <span className={styles.cardDate}>{item.date}</span>
        <h4 className={styles.cardTitle}>{item.title}</h4>
        <div style={{ marginTop: '0.75rem' }}>
             <WineRating rating={item.rating} />
        </div>
      </div>
    </motion.div>
  );
};

const HallOfFame = () => {
  const [selectedItem, setSelectedItem] = useState<typeof pastMeetings[0] | null>(null);

  return (
    <section className={styles.section}>
      
      <div className={styles.headerContainer}>
        <h2 className={styles.title}>
          Hall of Fame 📸
        </h2>
        <p className={styles.description}>
          Tak to wygląda w praktyce. Dobre książki, szczere dyskusje i atmosfera, której nie da się podrobić. Kliknij, żeby zobaczyć werdykt klubu.
        </p>
      </div>
      <div className={styles.marqueeWrapper}>
        <Marquee direction="left" speed={30}>
          {pastMeetings.map((item) => (
            <Card key={`row1-${item.id}`} item={item} onClick={() => setSelectedItem(item)} />
          ))}
        </Marquee>

        <Marquee direction="right" speed={35}>
          {[...pastMeetings].reverse().map((item) => (
            <Card key={`row2-${item.id}`} item={item} onClick={() => setSelectedItem(item)} />
          ))}
        </Marquee>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className={styles.backdrop}
            >
              <motion.div
                layoutId={`card-${selectedItem.id}`}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className={styles.modalCard}
              >
                
                <div className={styles.modalImageContainer}>
                    <img 
                      src={selectedItem.image} 
                      alt={selectedItem.title} 
                      className={styles.modalImg}
                    />
                    <div className={styles.modalGradient} />
                    
                    <button 
                      onClick={() => setSelectedItem(null)}
                      className={styles.closeButton}
                    >
                      <X size={20} />
                    </button>
                    
                    <div className={styles.modalHeaderInfo}>
                        <div className={styles.modalDate}>{selectedItem.date}</div>
                        <h3 className={styles.modalTitle}>{selectedItem.title}</h3>
                        <p className={styles.modalAuthor}>{selectedItem.author}</p>
                    </div>
                </div>

                <div className={styles.modalContent}>
                  <div className={styles.ratingRow}>
                    <span className={styles.ratingLabel}>Ocena klubu:</span>
                    <WineRating rating={selectedItem.rating} />
                  </div>
                  
                  <blockquote className={styles.quote}>
                    &quot;{selectedItem.review}&quot;
                  </blockquote>

                  <button className={styles.instaLink}>
                     Zobacz post na Instagramie &rarr;
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
};

export default HallOfFame;