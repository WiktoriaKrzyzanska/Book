import './globals.css';
import type { Metadata, Viewport } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://cmwbc.pl'; 

export const viewport: Viewport = {
  themeColor: '#3d1a14',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Czytam Między Winami | Klub Książki Łódź & Online',
    template: '%s | CMWBC',
  },
  description: 'Klub książki dla ludzi, którzy lubią czytać, ale nie lubią presji. Spotkania w Łodzi i online. Wino, literatura i szczere dyskusje.',
  keywords: ['klub książki', 'book club', 'Łódź', 'literatura', 'wino', 'spotkania online', 'dyskusja o książkach', 'CMWBC'],
  authors: [{ name: 'Klaudia' }],
  creator: 'CMWBC',
  publisher: 'CMWBC',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    title: 'Czytam Między Winami',
    description: 'Dołącz do klubu książki. Czytamy, pijemy wino, dyskutujemy. Bez presji.',
    url: SITE_URL,
    siteName: 'CMWBC',
    locale: 'pl_PL',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'Czytam Między Winami - Klub Książki',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Czytam Między Winami',
    description: 'Klub książki inny niż wszystkie. Sprawdź, co czytamy w tym miesiącu.',
    images: ['/og-image.jpg'], 
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png', 
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <head>
        <link rel="canonical" href={SITE_URL} />
      </head>
      <body className="font-sans antialiased selection:bg-[#cfa86e] selection:text-[#3d1a14]">
        {children}
      </body>
    </html>
  );
}