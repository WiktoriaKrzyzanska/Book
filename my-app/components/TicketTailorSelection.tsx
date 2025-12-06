'use client';

import React from 'react';
import { CursorVariant } from '../lib/bookTypes';

type TicketTailorSectionProps = {
  setCursorVariant: (variant: CursorVariant) => void;
};

const TicketTailorSection: React.FC<TicketTailorSectionProps> = ({
  setCursorVariant,
}) => {
  return (
    <section
      id="rejestracja"
      style={{
        padding: '6rem 1.5rem',
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'center',
      }}
      onMouseEnter={() => setCursorVariant('default')}
      onMouseLeave={() => setCursorVariant('default')}
    >
      <h2
        style={{
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          fontSize: '0.8rem',
          opacity: 0.6,
          marginBottom: '0.75rem',
          color: '#e8e4dc',
        }}
      >
        Zapisy
      </h2>
      <p
        style={{
          opacity: 0.8,
          fontSize: '1rem',
          marginBottom: '3rem',
          color: '#e8e4dc',
        }}
      >
        Wybierz wydarzenie i zarezerwuj miejsce przez platformę Luma.
      </p>

      <div
        style={{
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
          display: 'flex',
          justifyContent: 'center',
          background: '#ecebec', // Jasne tło pod iframe
          padding: '10px'
        }}
      >
        <iframe
          src="https://luma.com/embed/event/evt-OUA0YVvhZYOlNPt/simple"
          width="100%"
          height="450"
          frameBorder="0"
          style={{ 
            border: '1px solid #bfcbda88', 
            borderRadius: '4px',
            maxWidth: '600px',
            width: '100%'
          }}
          allow="fullscreen; payment"
          aria-hidden="false"
          tabIndex={0}
        ></iframe>
      </div>
    </section>
  );
};

export default TicketTailorSection;