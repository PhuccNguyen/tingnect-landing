import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  // Chi khai bao route CO THAT. Sitemap cu liet ke /products, /contact, /id,
  // /privacy — nhung trang do da bi xoa khoi du an, khai bao tiep se sinh
  // hang loat 404 trong Search Console.
  return [
    {
      url: `${SITE_CONFIG.website}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}
