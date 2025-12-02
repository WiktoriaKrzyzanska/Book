import React from 'react';
import EventTicket from './EventTicket';
import { EVENTS_DATA } from '@/lib/eventConstants';
import styles from './EventShowcase.module.css';

const EventShowcase = () => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Nadchodzące <span className={styles.italic}>spotkania</span>
        </h2>
        <p className={styles.intro}>
          Dołącz do nas przy winie i literaturze. Wybierz wydarzenie i zarezerwuj miejsce.
        </p>
      </div>

      <div className={styles.container}>
        {EVENTS_DATA.map((event) => (
          <EventTicket key={event.id} {...event} />
        ))}
      </div>
    </section>
  );
};

export default EventShowcase;