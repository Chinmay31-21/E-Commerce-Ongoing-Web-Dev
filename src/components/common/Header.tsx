import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Menu, X, User } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import CartSidebar from '../cart/CartSidebar';
import { categories } from '../../data/categories';

const Header: React.FC = () => {
  const location = useLocation();
  const { cart, toggleCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="font-serif text-2xl font-semibold tracking-wide transition-colors"
          >
            <span className={isScrolled ? 'text-primary-900' : 'text-white'}>Elegance</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-accent-500 ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}
            >
              Home
            </Link>
            <div className="relative group">
              <button 
                className={`text-sm font-medium transition-colors hover:text-accent-500 ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`}
              >
                Shop
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                {categories.map(category => (
                  <Link
                    key={category.id}
                    to={`/category/${category.slug}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors hover:text-accent-500 ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm font-medium transition-colors hover:text-accent-500 ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}
            >
              Contact
            </Link>
          </nav>
          
          {/* Search Bar */}
          <div className="hidden md:block relative">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search products..."
                className={`pl-3 pr-10 py-1 rounded-full text-sm transition-all focus:outline-none ${
                  isScrolled 
                    ? 'bg-gray-100 text-gray-800 focus:bg-gray-200' 
                    : 'bg-white/20 text-white placeholder-white/70 focus:bg-white/30'
                }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <Search 
                  size={16} 
                  className={isScrolled ? 'text-gray-500' : 'text-white'} 
                />
              </button>
            </form>
          </div>
          
          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/account" 
              className={`hidden md:block transition-colors hover:text-accent-500 ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}
            >
              <User size={20} />
            </Link>
            <Link 
              to="/wishlist" 
              className={`hidden md:block transition-colors hover:text-accent-500 ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}
            >
              <Heart size={20} />
            </Link>
            <button 
              onClick={toggleCart} 
              className={`relative transition-colors hover:text-accent-500 ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}
            >
              <ShoppingBag size={20} />
              {cart.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.itemCount}
                </span>
              )}
            </button>
            <button 
              className={`md:hidden transition-colors hover:text-accent-500 ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="px-4 pt-4 pb-8 space-y-6">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-3 pr-10 py-2 rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <Search size={16} className="text-gray-500" />
              </button>
            </form>
            
            <nav className="space-y-4">
              <Link 
                to="/" 
                className="block text-gray-800 hover:text-primary-600 font-medium"
              >
                Home
              </Link>
              <div className="space-y-2">
                <h3 className="font-medium text-gray-800">Shop By Category</h3>
                <div className="space-y-2 pl-2">
                  {categories.map(category => (
                    <Link
                      key={category.id}
                      to={`/category/${category.slug}`}
                      className="block text-gray-600 hover:text-primary-600"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link 
                to="/about" 
                className="block text-gray-800 hover:text-primary-600 font-medium"
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="block text-gray-800 hover:text-primary-600 font-medium"
              >
                Contact
              </Link>
              <Link 
                to="/account" 
                className="block text-gray-800 hover:text-primary-600 font-medium"
              >
                My Account
              </Link>
              <Link 
                to="/wishlist" 
                className="block text-gray-800 hover:text-primary-600 font-medium"
              >
                Wishlist
              </Link>
            </nav>
          </div>
        </div>
      )}
      
      {/* Cart Sidebar */}
      <CartSidebar />
    </header>
  );
};

export default Header;