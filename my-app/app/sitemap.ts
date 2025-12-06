import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'localhost:3000';
  const protocol = domain.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${domain}`;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}