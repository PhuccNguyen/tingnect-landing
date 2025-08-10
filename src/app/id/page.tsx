import IDHero from '@/components/id/IDHero/IDHero';
import SearchSection from '@/components/id/SearchSection/SearchSection';
import DemoWallets from '@/components/id/DemoWallets/DemoWallets';

export const metadata = {
  title: 'TingNect ID - Web3 Identity Explorer',
  description: 'Explore and verify Web3 identities, discover onchain profiles, and connect with builders in the TingNect ecosystem.',
  keywords: 'Web3 Identity, Blockchain Profile, DeFi, NFT, Cryptocurrency, Wallet Explorer',
};

export default function IDPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <IDHero />
      <SearchSection />
      <DemoWallets />
    </div>
  );
}
