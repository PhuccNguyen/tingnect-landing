import Hero from '@/components/home/Hero/Hero';

export const metadata = {
  title: 'TingNect - Build for Billions | Web3 Platform',
  description: 'Premier platform uniting developers, entrepreneurs, investors, and tech enthusiasts in shaping a sustainable Web3 ecosystem for billions of users worldwide.',
  keywords: 'Web3, Blockchain, TingNect, Build for Billions, Vietnam, Ho Chi Minh City, Event, August 2025',
    icons: {
    icon: '/Image/Logo/TingNect/TingNect-icon.svg',
  },
  openGraph: {
    title: 'TingNect - Build for Billions',
    description: 'Join the premier Web3 event in Ho Chi Minh City. August 16, 2025.',
    images: ['/Image/Logo/TingNect/TingNect-icon.svg'],
  },
};

export default function HomePage() {
  return <Hero />;
}
