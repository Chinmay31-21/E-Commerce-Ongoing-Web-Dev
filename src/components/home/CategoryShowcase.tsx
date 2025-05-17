import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';

const CategoryShowcase: React.FC = () => {
  // We'll display only the first 3 categories for this showcase
  const showcaseCategories = categories.slice(0, 3);
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl font-medium text-gray-900 text-center mb-12">
          Browse By Category
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {showcaseCategories.map((category) => (
            <Link 
              key={category.id} 
              to={`/category/${category.slug}`}
              className="group block relative overflow-hidden rounded-lg"
            >
              <div className="aspect-w-3 aspect-h-4 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-2xl font-medium text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-white/80 mb-4">
                  {category.description}
                </p>
                <span className="inline-block text-white border-b border-white pb-1 transition-all group-hover:border-accent-500 group-hover:text-accent-300">
                  Shop Now
                </span>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/categories"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;