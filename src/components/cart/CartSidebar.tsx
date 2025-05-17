import React from 'react';
import { X, ShoppingBag, TrashIcon } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';

const CartSidebar: React.FC = () => {
  const { cart, toggleCart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  
  const handleQuantityChange = (productId: string, newValue: number) => {
    updateQuantity(productId, newValue);
  };
  
  const proceedToCheckout = () => {
    toggleCart();
    navigate('/checkout');
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  
  if (!cart.isOpen) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 transition-opacity"
        onClick={toggleCart}
      />
      
      {/* Cart Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <ShoppingBag className="mr-2" size={20} />
                Your Cart ({cart.itemCount})
              </h2>
              <button 
                onClick={toggleCart}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Cart Content */}
            <div className="flex-1">
              {cart.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8">
                  <ShoppingBag size={64} className="text-gray-300 mb-4" />
                  <p className="text-gray-500 text-center mb-6">
                    Your cart is empty. Start shopping to add items to your cart.
                  </p>
                  <Button 
                    onClick={toggleCart}
                    variant="primary"
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200 px-4 py-6">
                  {cart.items.map((item) => (
                    <li key={item.product.id} className="py-4 flex">
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="ml-4 flex-1 flex flex-col">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium text-gray-900">
                            {item.product.name}
                          </h4>
                          <p className="text-sm font-medium text-gray-900">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-1">
                          {item.product.price === item.product.compareAtPrice ? (
                            formatPrice(item.product.price)
                          ) : (
                            <span>
                              {formatPrice(item.product.price)}
                              {item.product.compareAtPrice && (
                                <span className="line-through text-gray-400 ml-2">
                                  {formatPrice(item.product.compareAtPrice)}
                                </span>
                              )}
                            </span>
                          )}
                        </p>
                        
                        <div className="mt-2 flex items-center justify-between">
                          {/* Quantity Selector */}
                          <div className="inline-flex items-center border border-gray-300 rounded">
                            <button
                              className="px-2 py-1 text-gray-600 hover:text-gray-800"
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="px-3 py-1 text-gray-800">
                              {item.quantity}
                            </span>
                            <button
                              className="px-2 py-1 text-gray-600 hover:text-gray-800"
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          
                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <TrashIcon size={18} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            {/* Footer */}
            {cart.items.length > 0 && (
              <div className="border-t border-gray-200 p-4">
                <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                  <p>Subtotal</p>
                  <p>{formatPrice(cart.subtotal)}</p>
                </div>
                <div className="mt-6">
                  <Button
                    onClick={proceedToCheckout}
                    variant="primary"
                    fullWidth
                  >
                    Checkout
                  </Button>
                </div>
                <div className="mt-4">
                  <Button
                    onClick={toggleCart}
                    variant="outline"
                    fullWidth
                  >
                    Continue Shopping
                  </Button>
                </div>
                <p className="mt-4 text-xs text-gray-500 text-center">
                  Shipping and taxes calculated at checkout.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;