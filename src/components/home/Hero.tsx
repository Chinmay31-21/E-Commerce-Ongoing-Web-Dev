import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/5705390/pexels-photo-5705390.jpeg"
          alt="Elegant Lifestyle Products"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-xl">
            <h1 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 leading-tight">
              Elevate Your Lifestyle With Elegance
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-8">
              Discover our curated collection of premium products designed to enhance your everyday life with style and sophistication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="secondary"
                size="lg"
                icon={<ArrowRight size={18} />}
                iconPosition="right"
              >
                <Link to="/category/featured">Shop Featured</Link>
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/20 active:bg-white/30"
              >
                <Link to="/about">Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-pulse">
        <span className="text-white text-sm mb-2">Scroll to explore</span>
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