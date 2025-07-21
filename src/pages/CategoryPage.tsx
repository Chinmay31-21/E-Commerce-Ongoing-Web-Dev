import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getCategoryBySlug } from '../data/categories';
import { filterProducts } from '../data/products';
import ProductCard from '../components/common/ProductCard';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { Helmet } from 'react-helmet';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getCategoryBySlug(slug) : undefined;
  
  const [products, setProducts] = useState(filterProducts({ category: slug }));
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 500 });
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'newest' | 'popular'>('popular');
  const [sourceType, setSourceType] = useState<'affiliate' | 'dropship' | 'own' | 'all'>('all');
  
  // Apply filters
  useEffect(() => {
    const filteredProducts = filterProducts({
      category: slug,
      priceRange,
      sortBy,
      sourceType: sourceType === 'all' ? undefined : sourceType,
    });
    setProducts(filteredProducts);
  }, [slug, priceRange, sortBy, sourceType]);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  if (!category) {
    return <Navigate to="/404" />;
  }
  
  return (
    <>
      <Helmet>
        <title>{category.name} | CrochetCraft</title>
        <meta name="description" content={category.description} />
        <link rel="canonical" href={`https://yourdomain.com/category/${slug}`} />
      </Helmet>
      
      <div className="pt-24 pb-16">
        {/* Category Header */}
        <div className="relative">
          <div className="h-64 overflow-hidden">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
          </div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="font-serif text-white text-4xl font-semibold mb-2">
                {category.name}
              </h1>
              <p className="text-white/80 max-w-xl">
                {category.description}
              </p>
            </div>
          </div>
        </div>
        
        {/* Filter and Sort Controls */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <p className="text-gray-600 mb-4 md:mb-0">
              Showing {products.length} products
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Filter Toggle Button (Mobile) */}
              <button
                className="md:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <SlidersHorizontal size={18} />
                <span>Filters</span>
              </button>
              
              {/* Sort Dropdown */}
              <div className="relative">
                <label className="block text-sm text-gray-600 mb-1 sm:hidden">
                  Sort by
                </label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-md bg-white text-gray-700 w-full"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown size={18} className="text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Filters (Desktop) */}
            <div className="hidden md:block">
              <div className="bg-white p-6 rounded-lg shadow-soft">
                <h2 className="font-medium text-lg text-gray-900 mb-4">Filters</h2>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-800 mb-3">Price Range</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          Min ($)
                        </label>
                        <input
                          type="number"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          Max ($)
                        </label>
                        <input
                          type="number"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Product Source */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-800 mb-3">Product Source</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="source-type"
                        value="all"
                        checked={sourceType === 'all'}
                        onChange={() => setSourceType('all')}
                        className="h-4 w-4 text-primary-600"
                      />
                      <span className="ml-2 text-gray-700">All Products</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="source-type"
                        value="own"
                        checked={sourceType === 'own'}
                        onChange={() => setSourceType('own')}
                        className="h-4 w-4 text-primary-600"
                      />
                      <span className="ml-2 text-gray-700">Our Products</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="source-type"
                        value="affiliate"
                        checked={sourceType === 'affiliate'}
                        onChange={() => setSourceType('affiliate')}
                        className="h-4 w-4 text-primary-600"
                      />
                      <span className="ml-2 text-gray-700">Affiliate Products</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="source-type"
                        value="dropship"
                        checked={sourceType === 'dropship'}
                        onChange={() => setSourceType('dropship')}
                        className="h-4 w-4 text-primary-600"
                      />
                      <span className="ml-2 text-gray-700">Dropship Products</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile Filters */}
            {isFilterOpen && (
              <div className="md:hidden fixed inset-0 z-50 overflow-hidden">
                {/* Backdrop */}
                <div 
                  className="absolute inset-0 bg-black/30 transition-opacity"
                  onClick={() => setIsFilterOpen(false)}
                />
                
                {/* Filter Panel */}
                <div className="absolute inset-y-0 right-0 max-w-full flex">
                  <div className="relative w-screen max-w-md">
                    <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
                      {/* Header */}
                      <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900 flex items-center">
                          <SlidersHorizontal className="mr-2" size={20} />
                          Filters
                        </h2>
                        <button 
                          onClick={() => setIsFilterOpen(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X size={24} />
                        </button>
                      </div>
                      
                      {/* Filter Content */}
                      <div className="p-6 space-y-6">
                        {/* Price Range */}
                        <div>
                          <h3 className="font-medium text-gray-800 mb-3">Price Range</h3>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                  Min ($)
                                </label>
                                <input
                                  type="number"
                                  value={priceRange.min}
                                  onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                />
                              </div>
                              <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                  Max ($)
                                </label>
                                <input
                                  type="number"
                                  value={priceRange.max}
                                  onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Product Source */}
                        <div>
                          <h3 className="font-medium text-gray-800 mb-3">Product Source</h3>
                          <div className="space-y-2">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="mobile-source-type"
                                value="all"
                                checked={sourceType === 'all'}
                                onChange={() => setSourceType('all')}
                                className="h-4 w-4 text-primary-600"
                              />
                              <span className="ml-2 text-gray-700">All Products</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="mobile-source-type"
                                value="own"
                                checked={sourceType === 'own'}
                                onChange={() => setSourceType('own')}
                                className="h-4 w-4 text-primary-600"
                              />
                              <span className="ml-2 text-gray-700">Our Products</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="mobile-source-type"
                                value="affiliate"
                                checked={sourceType === 'affiliate'}
                                onChange={() => setSourceType('affiliate')}
                                className="h-4 w-4 text-primary-600"
                              />
                              <span className="ml-2 text-gray-700">Affiliate Products</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="mobile-source-type"
                                value="dropship"
                                checked={sourceType === 'dropship'}
                                onChange={() => setSourceType('dropship')}
                                className="h-4 w-4 text-primary-600"
                              />
                              <span className="ml-2 text-gray-700">Dropship Products</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      {/* Apply Button */}
                      <div className="border-t border-gray-200 p-6">
                        <button
                          onClick={() => setIsFilterOpen(false)}
                          className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
                        >
                          Apply Filters
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Product Grid */}
            <div className="md:col-span-3">
              {products.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-soft text-center">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No Products Found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;