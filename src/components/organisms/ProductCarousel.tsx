import React from 'react';
import type { Product } from '../types';
import { ProductCard } from '../molecules/ProductCard';

interface ProductCarouselProps {
  products: Product[];
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => (
  <div className="bg-gray-200 p-3 rounded-lg shadow rounded-bl-none max-w-full">
    <p className="text-sm text-gray-700 mb-2 font-medium">Here are some product recommendations for you:</p>
    <div className="flex space-x-3 overflow-x-auto pb-2 custom-scrollbar-horizontal">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </div>
);