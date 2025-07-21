import React from 'react';
import { ArrowRight, Scissors, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg"
          alt="Beautiful Crochet Designs"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-pink-900/50" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <div className="flex items-center mb-4">
              <Scissors className="text-pink-300 mr-3" size={32} />
              <span className="text-pink-200 text-lg font-medium">Handcrafted with Love</span>
            </div>
            
            <h1 className="font-script text-white text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Create Your Crochet Brand
            </h1>
            
            <p className="text-white/90 text-xl md:text-2xl mb-8 leading-relaxed">
              Discover exclusive crochet patterns, premium supplies, and finished masterpieces. 
              Build your brand with our curated collection of unique designs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                variant="secondary"
                size="lg"
                icon={<ArrowRight size={18} />}
                iconPosition="right"
                className="bg-pink-500 hover:bg-pink-600 text-white border-pink-500"
              >
                <Link to="/category/crochet-patterns">Shop Patterns</Link>
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/20 active:bg-white/30"
                icon={<Heart size={18} />}
              >
                <Link to="/category/finished-products">View Gallery</Link>
              </Button>
            </div>
            
            <div className="flex items-center space-x-8 text-white/80">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm">Exclusive Patterns</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10K+</div>
                <div className="text-sm">Happy Crafters</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4.9★</div>
                <div className="text-sm">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-pulse">
        <span className="text-white text-sm mb-2">Explore our collection</span>
        <svg 
          className="w-6 h-6 text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </div>
    </div>
  );
};

export default Hero;