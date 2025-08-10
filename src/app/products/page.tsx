import ProductsHero from '@/components/products/ProductsHero/ProductsHero';
import ProductsGrid from '@/components/products/ProductsGrid/ProductsGrid';
import TechStack from '@/components/products/TechStack/TechStack';

export const metadata = {
  title: 'Products - TingNect',
  description: 'Discover our cutting-edge Web3 and AI products built for the future.',
};

export default function ProductsPage() {
  return (
    <>
      <ProductsHero />
      <ProductsGrid />
      <TechStack />
    </>
  );
}
