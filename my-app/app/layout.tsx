import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Czytam Między Winami',
  description: 'CMWBC',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}