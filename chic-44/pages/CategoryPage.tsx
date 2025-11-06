
import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { mockProducts } from '../data/mockData';
import type { Product, Category } from '../types';

interface CategoryPageProps {
  category: Category;
  onProductClick: (product: Product) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ category, onProductClick }) => {
  const filteredProducts = mockProducts.filter(p => p.category === category);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center">{category}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onClick={onProductClick} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No hay productos en esta categoría.</p>
        )}
      </div>
    </div>
  );
};
