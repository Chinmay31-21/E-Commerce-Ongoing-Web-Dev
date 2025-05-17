import React from 'react';
import { Product } from '../../types';
import ProductCard from '../common/ProductCard';
import { products } from '../../data/products';

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProductId, category }) => {
  // Get products from the same category, excluding the current product
  const relatedProducts = products
    .filter(product => product.category === category && product.id !== currentProductId)
    .slice(0, 4); // Limit to 4 products
  
  if (relatedProducts.length === 0) {
    return null;
  }
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl font-medium text-gray-900 mb-8">
          You May Also Like
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;