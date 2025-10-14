import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TingNect - Build for Billions',
    short_name: 'TingNect',
    description: 'Leading Web3 community platform connecting innovators and builders across Vietnam',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/Image/Logo/TingNect/TingNect icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/Image/Logo/TingNect/TingNect icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}