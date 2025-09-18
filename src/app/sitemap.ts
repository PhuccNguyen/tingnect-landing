// src/app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: 'https://tingnect.com/', lastModified: now, changeFrequency: 'yearly', priority: 1 },
    { url: 'https://tingnect.com/products', lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://tingnect.com/contact', lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://tingnect.com/id', lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://tingnect.com/privacy', lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
  ];
}
