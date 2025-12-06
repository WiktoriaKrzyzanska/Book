import { MetadataRoute } from 'next';

const BASE_URL = 'https://cmwbc.pl';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/redakcja/', '/redakcja'], 
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}