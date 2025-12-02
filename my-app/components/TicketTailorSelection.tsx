'use client';

import React, { useEffect, useRef } from 'react';
import { CursorVariant } from '../lib/bookTypes';

type TicketTailorSectionProps = {
  setCursorVariant: (variant: CursorVariant) => void;
};

const TicketTailorSection: React.FC<TicketTailorSectionProps> = ({
  setCursorVariant,
}) => {
  const widgetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!widgetRef.current) return;

    const oldScripts = widgetRef.current.querySelectorAll('script');
    oldScripts.forEach((s) => s.remove());

    const script = document.createElement('script');
    script.src = 'https://cdn.tickettailor.com/js/widgets/min/widget.js';
    script.async = true;

    script.dataset.url =
      'https://www.tickettailor.com/all-tickets/none21/?ref=website_widget&show_search_filter=true&show_date_filter=true&show_sort=true';
    script.dataset.type = 'inline';
    script.dataset.inlineMinimal = 'true';
    script.dataset.inlineShowLogo = 'false';
    script.dataset.inlineBgFill = 'false';
    script.dataset.inlineInheritRefFromUrlParam = '';
    script.dataset.inlineRef = 'website_widget';

    widgetRef.current.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <section
      id="rejestracja"
      style={{
        padding: '6rem 1.5rem',
        maxWidth: '900px',
        margin: '0 auto',
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
        }}
      >
        Zapisy
      </h2>
      <p
        style={{
          opacity: 0.6,
          fontSize: '0.9rem',
          marginBottom: '2rem',
        }}
      >
        Wybierz termin spotkania i zarezerwuj miejsce przez Ticket Tailor.
      </p>

      <div
        style={{
          backgroundColor: '#ecebec',
          borderRadius: '16px',
          padding: '2rem 1.5rem',
          boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
          color: '#3d1a14',
        }}
      >
        <div ref={widgetRef} className="tt-widget">
          <div className="tt-widget-fallback">
            <p>
              <a
                href="https://www.tickettailor.com/all-tickets/none21/?ref=website_widget&show_search_filter=true&show_date_filter=true&show_sort=true"
                target="_blank"
                rel="noreferrer"
              >
                Kliknij tutaj, aby przejść do zapisów
              </a>
              <br />
              <small>
                <a
                  href="https://www.tickettailor.com?rf=wdg_280226"
                  className="tt-widget-powered"
                  target="_blank"
                  rel="noreferrer"
                >
                  Sell tickets online with Ticket Tailor
                </a>
              </small>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TicketTailorSection;
