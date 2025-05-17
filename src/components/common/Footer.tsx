import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <Link to="/" className="font-serif text-2xl font-semibold tracking-wide">
              Elegance
            </Link>
            <p className="mt-4 text-gray-400 text-sm">
              Your destination for premium lifestyle products, offering a curated selection of elegant 
              items for the discerning customer.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/electronics" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/category/home-decor" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Home Decor
                </Link>
              </li>
              <li>
                <Link to="/category/kitchen" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Kitchen
                </Link>
              </li>
              <li>
                <Link to="/category/accessories" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/category/food-beverages" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Food & Beverages
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  123 Elegant Street<br />
                  New York, NY 10001<br />
                  United States
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-gray-400 mr-2" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-gray-400 mr-2" />
                <span className="text-gray-400 text-sm">info@elegance.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row md:justify-between">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Elegance. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-4">
              <Link to="/terms" className="text-gray-500 hover:text-gray-400 text-sm">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-gray-500 hover:text-gray-400 text-sm">
                Privacy Policy
              </Link>
              <Link to="/accessibility" className="text-gray-500 hover:text-gray-400 text-sm">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;