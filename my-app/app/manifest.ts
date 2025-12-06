import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Czytam Między Winami',
    short_name: 'CMWBC',
    description: 'Klub książki Łódź & Online',
    start_url: '/',
    display: 'standalone',
    background_color: '#3d1a14',
    theme_color: '#3d1a14',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}