'use client';

import React from 'react';
import { Instagram, Mail, Heart, ExternalLink } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.bgDecoration}>
        <span className={styles.bigText}>CMWBC</span>
      </div>

      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brandColumn}>
            <h2 className={styles.brandTitle}>
              CMWBC <span className={styles.brandDot}>.</span>
            </h2>
            <p className={styles.brandDesc}>
              Klub książki dla ludzi, którzy lubią czytać, ale nie lubią presji.
            </p>
            <div className={styles.socialRow}>
              <SocialLink
                href="https://instagram.com"
                icon={Instagram}
                label="Instagram"
              />
              <SocialLink
                href="mailto:kontakt@cmwbc.pl"
                icon={Mail}
                label="Email"
              />
            </div>
          </div>

          <div className={styles.ctaColumn}>
            <h3 className={styles.ctaTitle}>Chcesz być na bieżąco?</h3>
            <p className={styles.ctaDesc}>
              Nie spamujemy. Wszystkie ogłoszenia o nowych spotkaniach i
              książkach wrzucamy na bieżąco na Instagram.
            </p>

            <div>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaButton}
              >
                <Instagram size={18} />
                Obserwuj nas na IG
                <ExternalLink size={14} className={styles.externalIcon} />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.linksGrid}>
          <FooterColumn title="Klub">
            <FooterLink href="#">O nas</FooterLink>
            <FooterLink href="#">Jak to działa?</FooterLink>
            <FooterLink href="#">...</FooterLink>
          </FooterColumn>

          <FooterColumn title="Wsparcie">
            <FooterLink href="#">Kontakt</FooterLink>
          </FooterColumn>

          <FooterColumn title="Wydarzenia">
            <FooterLink href="#">Kalendarz spotkań</FooterLink>
            <FooterLink href="#">Zasady zapisów</FooterLink>
          </FooterColumn>

          <FooterColumn title="Legal">
            <FooterLink href="#">Polityka Prywatności</FooterLink>
          </FooterColumn>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.copyright}>
            &copy; {new Date().getFullYear()} CMWBC.
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  label: string;
}) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    className={styles.socialLink}
  >
    <Icon size={18} />
  </a>
);

const FooterColumn = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className={styles.column}>
    <h4 className={styles.columnTitle}>{title}</h4>
    <nav className={styles.linkList}>{children}</nav>
  </div>
);

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a href={href} className={styles.footerLink}>
    {children}
  </a>
);

export default Footer;
