import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import CartSidebar from '../cart/CartSidebar';
import LoginModal from '../auth/LoginModal';
import RegisterModal from '../auth/RegisterModal';
import { categories } from '../../data/categories';
import { GoogleLogin } from '@react-oauth/google';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, toggleCart } = useCart();
  const { auth, logout, setAuth } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

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

  // Close account menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setShowAccountMenu(false);
      }
    }
    if (showAccountMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAccountMenu]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSwitchToRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  // Email/Password Login Handler
  const handleEmailLogin = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error('Login failed');
      const data = await res.json();
      setAuth({ isAuthenticated: true, user: data.user, token: data.token });
      setShowLoginModal(false);
    } catch (err) {
      alert('Login failed. Please check your credentials.');
    }
  };

  // Email/Password Register Handler
  const handleEmailRegister = async (name: string, email: string, password: string, phone: string) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Registration failed');
      }
      const data = await res.json();
      setAuth({ isAuthenticated: true, user: data.user, token: data.token });
      setShowRegisterModal(false);
    } catch (err: any) {
      alert(err.message || 'Registration failed. Please try again.');
    }
  };

  // Google Auth Handlers
  const handleGoogleAuth = async (credentialResponse: any, mode: 'login' | 'register') => {
    try {
      const res = await fetch(`/api/auth/google-${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      if (!res.ok) throw new Error('Google authentication failed');
      const data = await res.json();
      setAuth({ isAuthenticated: true, user: data.user, token: data.token });
      setShowLoginModal(false);
      setShowRegisterModal(false);
    } catch (err) {
      alert('Google authentication failed. Please try again.');
    }
  };

  // Account menu for authenticated users
  const AccountMenu = () => (
    <div className="relative" ref={accountMenuRef}>
      <button
        className={`flex items-center space-x-2 transition-colors hover:text-accent-500 ${isScrolled ? 'text-gray-800' : 'text-white'}`}
        onClick={() => setShowAccountMenu((v) => !v)}
      >
        <User size={20} />
        <span className="hidden md:inline">{auth.user?.name?.split(' ')[0] || 'Account'}</span>
        <ChevronDown size={16} />
      </button>
      {showAccountMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-2">
          <div className="px-4 py-2 text-gray-700 font-semibold border-b">Hello, {auth.user?.name}</div>
          <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">My Profile</Link>
          <Link to="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">My Orders</Link>
          <Link to="/wishlist" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Wishlist</Link>
          {auth.user?.role === 'admin' && (
            <Link to="/admin" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Admin Dashboard</Link>
          )}
          <button
            onClick={() => { logout(); setShowAccountMenu(false); }}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <span className="flex items-center"><LogOut size={16} className="mr-2" />Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );

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
            <span className={`font-script text-3xl ${isScrolled ? 'text-primary-900' : 'text-white'}`}>CrochetCraft</span>
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
            {auth.isAuthenticated ? (
              <>
                <span className={`hidden md:block text-sm ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                  Welcome, {auth.user?.name}
                </span>
                <div className="hidden md:block">
                  <AccountMenu />
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className={`transition-colors hover:text-accent-500 ${
                    isScrolled ? 'text-gray-800' : 'text-white'
                  }`}
                >
                  Sign In
                </button>
                <button 
                  onClick={() => setShowRegisterModal(true)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    isScrolled 
                      ? 'bg-primary-600 text-white hover:bg-primary-700' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            )}
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
              {auth.isAuthenticated && (
                <>
                  <div className="text-gray-600 text-sm mb-1">
                    Welcome, {auth.user?.name}
                  </div>
                  <div>
                    <AccountMenu />
                  </div>
                </>
              )}
              {!auth.isAuthenticated && (
                <>
                  <button 
                    onClick={() => setShowLoginModal(true)}
                    className="block text-gray-800 hover:text-primary-600 font-medium w-full text-left"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => setShowRegisterModal(true)}
                    className="block text-gray-800 hover:text-primary-600 font-medium w-full text-left"
                  >
                    Sign Up
                  </button>
                  <div className="my-2">
                    <GoogleLogin
                      onSuccess={cred => handleGoogleAuth(cred, 'login')}
                      onError={() => alert('Google login failed')}
                      width="100%"
                    />
                  </div>
                </>
              )}
              {auth.isAuthenticated && auth.user?.role === 'admin' && (
                <Link 
                  to="/admin" 
                  className="block text-gray-800 hover:text-primary-600 font-medium"
                >
                  Admin Dashboard
                </Link>
              )}
              <Link 
                to="/wishlist" 
                className="block text-gray-800 hover:text-primary-600 font-medium"
              >
                Wishlist
              </Link>
              {auth.isAuthenticated && (
                <button 
                  onClick={logout}
                  className="block text-gray-800 hover:text-primary-600 font-medium w-full text-left"
                >
                  Sign Out
                </button>
              )}
            </nav>
          </div>
        </div>
      )}
      
      {/* Cart Sidebar */}
      <CartSidebar />
      
      {/* Auth Modals */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={handleSwitchToRegister}
        onLogin={handleEmailLogin}
        GoogleLoginComponent={
          <GoogleLogin
            onSuccess={cred => handleGoogleAuth(cred, 'login')}
            onError={() => alert('Google login failed')}
            width="100%"
          />
        }
      />
      <RegisterModal 
        isOpen={showRegisterModal} 
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={handleSwitchToLogin}
        onRegister={handleEmailRegister}
        GoogleLoginComponent={
          <GoogleLogin
            onSuccess={cred => handleGoogleAuth(cred, 'register')}
            onError={() => alert('Google registration failed')}
            width="100%"
          />
        }
      />
    </header>
  );
};

export default Header;