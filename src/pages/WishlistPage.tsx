import React from 'react';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import Button from '../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const handleAddToCart = (productId: string) => {
    const product = wishlist.items.find(item => item.id === productId);
    if (product) {
      addToCart(product, 1);
    }
  };
  
  // Format price with currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  
  return (
    <>
      <Helmet>
        <title>Wishlist | Elegance</title>
        <meta name="description" content="View and manage your saved items." />
      </Helmet>
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-medium text-gray-900 mb-8">
            Your Wishlist
          </h1>
          
          {wishlist.items.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-soft text-center max-w-lg mx-auto">
              <Heart className="mx-auto text-gray-300 mb-4" size={64} />
              <h2 className="text-xl font-medium text-gray-900 mb-2">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-6">
                Save items you love to your wishlist. Review them anytime and easily move them to your cart.
              </p>
              <Button
                onClick={() => navigate('/')}
                variant="primary"
                icon={<ArrowRight size={18} />}
                iconPosition="right"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.items.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-soft overflow-hidden">
                  <Link to={`/product/${product.id}`} className="block relative">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    
                    {/* Remove button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        removeFromWishlist(product.id);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-error-500 hover:text-error-600 transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Heart size={18} className="fill-error-500" />
                    </button>
                  </Link>
                  
                  <div className="p-4">
                    <Link to={`/product/${product.id}`} className="block">
                      <h3 className="text-gray-800 font-medium text-lg mb-2 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>
                    </Link>
                    
                    <div className="flex items-end gap-2 mb-4">
                      <span className="text-gray-900 font-medium">
                        {formatPrice(product.price)}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-gray-500 text-sm line-through">
                          {formatPrice(product.compareAtPrice)}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="primary"
                        fullWidth
                        icon={<ShoppingBag size={16} />}
                        onClick={() => handleAddToCart(product.id)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistPage;