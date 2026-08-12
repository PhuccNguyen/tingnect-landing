import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_CONFIG.name} - ${SITE_CONFIG.slogan}`,
    short_name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    start_url: '/',
    display: 'standalone',
    // Khop palette brand: nen den, thanh he thong mau kem
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    icons: [
      {
        src: '/brand/logo/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/brand/logo/icon-cream-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
