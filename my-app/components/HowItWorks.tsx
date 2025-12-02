'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Ticket, Mail, Coffee, BellRing } from 'lucide-react';
import styles from './HowItWorks.module.css';

const steps = [
  {
    id: 1,
    title: 'Zapisujesz się',
    description: 'Kto pierwszy, ten lepszy. Klikasz, podajesz imię i maila. Bez zakładania kont, haseł i skomplikowanych formularzy.',
    icon: Ticket,
  },
  {
    id: 2,
    title: 'Szczegóły wpadają na maila',
    description: 'Dostajesz potwierdzenie z tytułem książki i dokładną lokalizacją.',
    icon: Mail,
  },
  {
    id: 3,
    title: 'Widzimy się na miejscu',
    description: 'Przychodzisz, zamawiamy kawę lub wino. Siedzimy, gadamy o książce.',
    icon: Coffee,
  },
];

const HowItWorks = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className={styles.section}>
      <div className={styles.container}>
        
        <div className={styles.header}>
          <h2 className={styles.title}>
            Jak to działa? 
          </h2>
          <p className={styles.description}>
            Prosty proces, żadnych niespodzianek. Zobacz, jak wygląda nasza ścieżka od kliknięcia do spotkania.
          </p>
        </div>

        <div className={styles.timelineWrapper}>
    
          <div className={styles.trackLine} />

          <motion.div 
            style={{ scaleY, originY: 0 }}
            className={styles.progressLine}
          />

          <div className={styles.stepsContainer}>
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`${styles.stepRow} ${!isEven ? styles.stepRowReverse : ''}`}
                >
                  <div className={styles.stepContent}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDesc}>{step.description}</p>
                  </div>

                  <div className={styles.iconWrapper}>
                    <div className={styles.iconCircle}>
                      <step.icon size={24} />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={styles.waitlistWrapper}
        >
          <div className={styles.waitlistCard}>
            <div className={styles.bellIconBox}>
              <BellRing size={32} />
            </div>
            
            <div className={styles.waitlistContent}>
              <h4 className={styles.waitlistTitle}>
                Brak miejsc? Spokojnie.
              </h4>
              <p className={styles.waitlistText}>
                Nasze spotkania są kameralne, ale życie bywa nieprzewidywalne. Zapisz się na <span className={styles.highlight}>listę rezerwową</span> (Waitlistę). System automatycznie da Ci znać mailem w sekundę, gdy tylko zwolni się krzesło.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;