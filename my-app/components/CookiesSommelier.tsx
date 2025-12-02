'use client';

import React, { useState, useRef } from 'react';
import styles from './CookiesSommelier.module.css';

const BottleSVG = () => (
  <svg viewBox="0 0 100 300" style={{ width: '100%', height: '100%' }}>
    <defs>
      <linearGradient id="wineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#2a0a10" />
        <stop offset="50%" stopColor="#5c1020" />
        <stop offset="100%" stopColor="#2a0a10" />
      </linearGradient>
    </defs>
    <path d="M35,10 L35,60 Q35,90 15,110 L15,280 Q15,300 50,300 Q85,300 85,280 L85,110 Q65,90 65,60 L65,10 Z" fill="url(#wineGradient)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

    <path d="M40,70 Q40,90 25,110 L25,270" stroke="rgba(255,255,255,0.2)" strokeWidth="3" fill="none" strokeLinecap="round" />
    <rect x="20" y="140" width="60" height="80" rx="2" fill="#f8f5f2" />
    <text x="50" y="170" fontFamily="serif" fontSize="14" textAnchor="middle" fill="#1a1a1a" fontWeight="bold">SOTE</text>
    <text x="50" y="185" fontFamily="sans-serif" fontSize="6" textAnchor="middle" fill="#4a4a4a" letterSpacing="1">WIELKOPOLSKA</text>
    <line x1="35" y1="195" x2="65" y2="195" stroke="#8B0000" strokeWidth="1" />
    <path d="M35,10 L35,50 L65,50 L65,10 Z" fill="#360c14" />
  </svg>
);

const LogoPlaceholder = ({ text, color }: { text: string, color: string }) => (
  <div 
    className={styles.logoPlaceholder} 
    style={{ color: color, borderColor: 'currentColor' }}
  >
    {text}
  </div>
);

const CookiesSommelier = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
  
    setRotation({
      x: yPct * -15, 
      y: xPct * 15   
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const sponsors = [
    { name: "Winnica Sote", color: "#991b1b" },     
    { name: "Wydawnictwo Znak", color: "#1e40af" }, 
    { name: "Radio Kultura", color: "#a16207" },    
    { name: "Kawiarnia Relaks", color: "#065f46" }, 
    { name: "Miejski Dom Kultury", color: "#6b21a8" }, 
  ];

  const marqueeItems = [...sponsors, ...sponsors, ...sponsors];

  return (
    <div className="font-sans">
      
      <section className={styles.section}>
        
        <div className={styles.backgroundTypos}>
          <span className={`${styles.floatingText} ${styles.pos1}`}>WIŚNIA</span>
          <span className={`${styles.floatingText} ${styles.pos2}`}>DĄB</span>
          <span className={`${styles.floatingText} ${styles.pos3}`}>POLSKA</span>
          <span className={`${styles.floatingText} ${styles.pos4}`}>CZEKOLADA</span>
        </div>

        <div className={styles.header}>
          <p className={styles.subHeader}>Sommelier Poleca</p>
          <h2 className={styles.mainHeader}>
            W tym miesiącu w kieliszkach
          </h2>
        </div>

        <div 
          ref={containerRef}
          className={styles.perspectiveContainer}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
        >
          <div 
            className={styles.tiltWrapper}
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.05 : 1})`,
            }}
          >
            <div className={styles.bottleSvgContainer}>
              <BottleSVG />
            </div>

            <div className={styles.glassCard}>
              <div style={{ transformStyle: 'preserve-3d' }}>
                <h3 className={styles.cardTitle}>Sote</h3>
                <div className={styles.divider} />
                <p className={styles.cardDesc}>
                  Wyjątkowy kupaż z serca Wielkopolski. Głęboka rubinowa barwa ukrywa nuty dojrzałej wiśni, gorzkiej czekolady i subtelny dym dębowej beczki. 
                </p>
                <div className={styles.tags}>
                  <span className={styles.tag}>Półwytrawne</span>
                  <span className={styles.tag}>Czerwone</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className={styles.disclaimer}>
          Alkohol tylko dla osób pełnoletnich. Pij odpowiedzialnie. 18+
        </div>
      </section>

      <section className={styles.sponsorsSection}>
        <div className={styles.sponsorsContainer}>
          <h3 className={styles.sponsorsTitle}>Nasi Przyjaciele</h3>
          <div className={styles.sponsorsLine} />
        </div>

        <div className={styles.marqueeWrapper}>
          <div className={styles.fadeLeft} />
          <div className={styles.fadeRight} />

          <div className={`${styles.marqueeTrack} ${styles.animateMarquee}`}>
            {marqueeItems.map((sponsor, index) => (
              <div 
                key={`${sponsor.name}-${index}`} 
                className={styles.sponsorItem}
              >
                <LogoPlaceholder text={sponsor.name} color={sponsor.color} />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default CookiesSommelier;