import React from 'react';
import { Scissors, Heart, Users } from 'lucide-react';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CategoryShowcase from '../components/home/CategoryShowcase';
import BrandBuilding from '../components/home/BrandBuilding';
import Newsletter from '../components/home/Newsletter';
import { Helmet } from 'react-helmet';

const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>CrochetCraft - Home</title>
        <meta name="description" content="Shop the best handmade crochet products online." />
        <meta name="keywords" content="crochet, handmade, crafts, shop, ecommerce" />
        <link rel="canonical" href="https://yourdomain.com/" />
      </Helmet>
      
      <Hero />
      <FeaturedProducts />
      <CategoryShowcase />
      <BrandBuilding />
      
      {/* Testimonial Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl font-medium text-center text-gray-900 mb-12">
            What Our Crafters Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-soft">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-accent-400"
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
              </div>
              <p className="text-gray-600 mb-4">
                "The crochet patterns from CrochetCraft are incredibly detailed and easy to follow. I've made several beautiful pieces that my customers absolutely love!"
              </p>
              <div className="flex items-center">
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Sarah Mitchell</p>
                  <p className="text-gray-500">Crochet Artist & Shop Owner</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-soft">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-accent-400"
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
              </div>
              <p className="text-gray-600 mb-4">
                "The yarn quality is outstanding and the finished products are absolutely gorgeous. CrochetCraft has helped me build a successful crochet business!"
              </p>
              <div className="flex items-center">
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Emily Rodriguez</p>
                  <p className="text-gray-500">Professional Crocheter</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-soft">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-accent-400"
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
              </div>
              <p className="text-gray-600 mb-4">
                "As a beginner, I was worried about starting my own crochet brand. CrochetCraft's patterns and supplies made it so easy. Now I have a thriving online shop!"
              </p>
              <div className="flex items-center">
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Jessica Chen</p>
                  <p className="text-gray-500">Crochet Entrepreneur</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Feature Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Scissors className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="font-medium text-lg text-gray-900 mb-2">Exclusive Designs</h3>
              <p className="text-gray-600 text-sm">
                Unique, original crochet patterns and designs you won't find anywhere else, created by expert designers.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="font-medium text-lg text-gray-900 mb-2">Handmade with Love</h3>
              <p className="text-gray-600 text-sm">
                Every finished product is carefully handcrafted with attention to detail and premium materials.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="font-medium text-lg text-gray-900 mb-2">Brand Building Support</h3>
              <p className="text-gray-600 text-sm">
                Get the tools, patterns, and guidance you need to build your own successful crochet brand.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="font-medium text-lg text-gray-900 mb-2">Crafting Community</h3>
              <p className="text-gray-600 text-sm">
                Join thousands of crocheters sharing tips, inspiration, and supporting each other's creative journey.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Newsletter />
    </>
  );
};

export default HomePage;