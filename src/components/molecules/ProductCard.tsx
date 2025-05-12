import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden w-60 md:w-64 shrink-0 flex p-3 space-x-3 items-center">
    <img
      src={product.imageUrl}
      alt={`Imagen de ${product.name}`}
      className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border border-gray-200"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null;
        target.src = `https://placehold.co/80x80/e2e8f0/94a3b8?text=Img`;
      }}
    />
    <div className="flex flex-col justify-between flex-1">
      <h3 className="text-xs md:text-sm font-semibold text-gray-800 mb-1" title={product.name}>
        {product.name.length > 40 ? product.name.substring(0, 37) + "..." : product.name}
      </h3>
      <p className="text-sm md:text-base font-bold text-blue-600 mb-2">${product.price.toFixed(2)}</p>
      <a
        href={product.productUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center bg-blue-500 text-white text-xs py-1.5 px-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        View Product
      </a>
    </div>
  </div>
);