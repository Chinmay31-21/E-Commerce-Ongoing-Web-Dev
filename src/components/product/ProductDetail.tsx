import React, { useState } from 'react';
import { Heart, ShoppingBag, Share2, Shield, Clock, ArrowLeft } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const inWishlist = isInWishlist(product.id);
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const handleBuyNow = () => {
    addToCart(product, quantity);
    window.location.href = '/checkout';
  };
  
  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  const handleQuantityChange = (newValue: number) => {
    if (newValue >= 1) {
      setQuantity(newValue);
    }
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };
  
  // Format price with currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  
  // Calculate discount percentage
  const discountPercentage = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;
  
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/" className="flex items-center text-sm text-primary-600 hover:underline">
            <ArrowLeft size={16} className="mr-1" /> Back to shopping
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Images */}
          <div>
            <div className="mb-4 aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex space-x-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative w-16 h-16 rounded-md overflow-hidden ${
                      activeImageIndex === index ? 'ring-2 ring-primary-600' : 'ring-1 ring-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            {/* Badge for product source */}
            {product.sourceType !== 'own' && (
              <div className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded mb-4">
                {product.sourceType === 'affiliate' ? 'Affiliate Product' : 'Dropshipped'}
              </div>
            )}
            
            <h1 className="font-serif text-3xl font-semibold text-gray-900 mb-4">
              {product.name}
            </h1>
            
            {/* Ratings */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-accent-400'
                        : 'text-gray-300'
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
            
            {/* Price */}
            <div className="flex items-end gap-3 mb-6">
              <span className="text-2xl font-semibold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <>
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                  <span className="text-sm font-medium text-accent-600">
                    {discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>
            
            {/* Description */}
            <p className="text-gray-600 mb-8">
              {product.description}
            </p>
            
            {/* Availability */}
            {product.sourceType !== 'affiliate' && (
              <div className="flex items-center text-sm text-gray-600 mb-6">
                <span className="mr-2">Availability:</span>
                {product.stock && product.stock > 0 ? (
                  <span className="text-success-600 font-medium">
                    In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="text-error-600 font-medium">Out of Stock</span>
                )}
              </div>
            )}
            
            {/* Quantity Selector */}
            {product.sourceType !== 'affiliate' && (
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm text-gray-600 mb-2">
                  Quantity
                </label>
                <div className="inline-flex items-center border border-gray-300 rounded">
                  <button
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-gray-800">
                    {quantity}
                  </span>
                  <button
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {product.sourceType === 'affiliate' ? (
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  icon={<ShoppingBag size={18} />}
                  onClick={() => window.open(product.affiliateLink, '_blank')}
                >
                  Shop on Amazon
                </Button>
              ) : (
                <>
                  <Button
                    variant="primary"
                    size="lg"
                    icon={<ShoppingBag size={18} />}
                    onClick={handleAddToCart}
                    fullWidth
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={handleBuyNow}
                    fullWidth
                  >
                    Buy Now
                  </Button>
                </>
              )}
              
              <Button
                variant="outline"
                size="lg"
                icon={<Heart size={18} className={inWishlist ? "fill-accent-500 text-accent-500" : ""} />}
                onClick={handleWishlistToggle}
                className="sm:w-auto"
              >
                {inWishlist ? 'Saved' : 'Save'}
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                icon={<Share2 size={18} />}
                onClick={handleShare}
                className="sm:w-auto"
              >
                Share
              </Button>
            </div>
            
            {/* Product Details */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex flex-col gap-4 text-sm">
                <div className="flex items-center">
                  <Shield size={18} className="text-primary-600 mr-2" />
                  <span>
                    <span className="font-medium">Secure Payments</span> - We use industry-standard encryption
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock size={18} className="text-primary-600 mr-2" />
                  <span>
                    <span className="font-medium">Fast Shipping</span> - Delivery within 3-5 business days
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;