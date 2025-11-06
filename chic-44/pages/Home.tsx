import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { mockProducts } from '../data/mockData';
import type { Product } from '../types';
import { useTranslation } from '../context/LanguageContext';

interface HomeProps {
  onProductClick: (product: Product) => void;
}

export const Home: React.FC<HomeProps> = ({ onProductClick }) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-16">
      <section className="relative h-[60vh] bg-gray-100 flex items-center justify-center text-center">
        <img src="https://picsum.photos/seed/hero/1600/900" alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 p-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-widest">CHIC 44</h1>
            <p className="text-xl md:text-2xl text-white mt-2">{t('brand_subtitle')}</p>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold text-center mb-8">{t('home_featured_products')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {mockProducts.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} onClick={onProductClick} />
          ))}
        </div>
      </section>
    </div>
  );
};