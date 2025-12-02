import React from 'react';
import { CalendarPlus, MapPin } from 'lucide-react';
import { EventProps } from '@/lib/eventTypes';
import { generateGoogleCalendarUrl } from '@/lib/eventUtils';
import styles from './EventTicket.module.css';

const EventTicket: React.FC<EventProps> = ({
  title,
  subtitle,
  description,
  date,
  time,
  location,
  imageUrl,
  type,
  status,
  ticketLink,
}) => {
  if (!date || !date.day || !date.weekday) return null;

  const isSoldOut = status === 'sold-out';

  const handleAddToCalendar = () => {
    const url = generateGoogleCalendarUrl({ title, description, location });
    window.open(url, '_blank');
  };

  return (
    <div className={styles.ticketContainer}>
      <div className={styles.ticket}>
        
        <div className={styles.imageSection}>
          {imageUrl ? (
            <img src={imageUrl} alt={title} className={styles.image} />
          ) : (
            <div className={styles.noImage}>Brak zdjęcia</div>
          )}
        </div>

        <div className={styles.perforation}>
          <div className={styles.holeTop} />
          <div className={styles.dashedLine} />
          <div className={styles.holeBottom} />
        </div>

        <div className={styles.contentSection}>
          <div className={styles.headerRow}>
            <span className={styles.typeLabel}>
              {type === 'members-only' ? 'Dla Klubowiczów' : 'Wstęp Wolny'}
            </span>
            
            {status === 'last-places' && (
              <span className={`${styles.statusBadge} ${styles.statusLast}`}>
                Ostatnie miejsca
              </span>
            )}
            {status === 'sold-out' && (
              <span className={`${styles.statusBadge} ${styles.statusSold}`}>
                Wyprzedane
              </span>
            )}
          </div>

          <h3 className={styles.title}>{title}</h3>
          
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          
          <p className={styles.description}>{description}</p>

          {location && (
            <div className={styles.locationRow}>
              <MapPin size={14} />
              <span>{location}</span>
            </div>
          )}
        </div>

        <div className={styles.metaSection}>
          <div className={styles.dateBlock}>
            <div className={styles.weekday}>{date.weekday}</div>
            <div className={styles.day}>{date.day}</div>
            <div className={styles.time}>{time}</div>
          </div>

          <div className={styles.actionsBlock}>
            {!isSoldOut ? (
              <a 
                href={ticketLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.buttonPrimary}
              >
                Zapisz się
              </a>
            ) : (
              <button disabled className={`${styles.buttonPrimary} ${styles.buttonDisabled}`}>
                Brak miejsc
              </button>
            )}

            <button onClick={handleAddToCalendar} className={styles.calendarBtn}>
              <CalendarPlus size={12} />
              <span>Kalendarz</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EventTicket;