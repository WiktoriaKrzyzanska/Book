import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const domain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'localhost:3000';
  const protocol = domain.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${domain}`;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/redakcja/', '/redakcja'], 
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}