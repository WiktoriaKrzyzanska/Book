'use client';

import React from 'react';
import { Cormorant_Garamond, Lato } from 'next/font/google';
import styles from './ProfileSection.module.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-lato',
});

const PROFILE_PLACEHOLDER = {
  image: '/images/profile-placeholder.jpg', 
  imageCaption: 'lorem ipsum, 2024',
  title: 'Lorem ipsum dolor sit amet',
  subtitle: 'Curated Book Club Host',
  quote:
    '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempus, risus at semper laoreet, est leo eleifend nisl.”',
  paragraphs: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet lacus lorem. Vivamus nec dignissim lorem. Nunc consequat, ipsum at rutrum pellentesque, nulla lorem fringilla mauris, non cursus sem odio non neque.',
    'Sed quis neque et sapien euismod malesuada. Mauris commodo, arcu in imperdiet dignissim, lectus ipsum interdum dui, sit amet pulvinar elit risus ut ipsum. Suspendisse potenti. Fusce efficitur justo a mi tincidunt, at tincidunt odio ultricies.',
    'Curabitur at tellus id leo condimentum tristique. Integer euismod, neque at varius sodales, ipsum augue laoreet quam, sed pretium leo nisl id mauris.',
  ],
  signature: 'Lorem Ipsum',
};

const ProfileSection = () => {
  return (
    <section className={`${styles.section} ${cormorant.variable} ${lato.variable}`}>
      <div className={styles.profileCard}>
        <div className={styles.photoContainer}>
          <div className={styles.tape} />
          <div className={styles.polaroid}>
            <img
              src={PROFILE_PLACEHOLDER.image}
              alt="Profile placeholder"
              className={styles.polaroidImg}
            />
            <div className={`${styles.polaroidCaption} ${cormorant.className}`}>
              {PROFILE_PLACEHOLDER.imageCaption}
            </div>
          </div>
        </div>

        <div className={styles.textContainer}>
          <div className={styles.paperclip} />

          <h1 className={`${styles.title} ${cormorant.className}`}>
            {PROFILE_PLACEHOLDER.title}
          </h1>

          <span className={`${styles.subtitle} ${lato.className}`}>
            {PROFILE_PLACEHOLDER.subtitle}
          </span>

          <div className={`${styles.quote} ${cormorant.className}`}>
            {PROFILE_PLACEHOLDER.quote}
          </div>

          {PROFILE_PLACEHOLDER.paragraphs.map((text, index) => (
            <p key={index} className={`${styles.paragraph} ${lato.className}`}>
              {text}
            </p>
          ))}

          <div className={`${styles.signature} ${cormorant.className}`}>
            {PROFILE_PLACEHOLDER.signature}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
