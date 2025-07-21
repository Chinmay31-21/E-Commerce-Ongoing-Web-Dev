import React from 'react';
import { TrendingUp, Users, Award, BookOpen } from 'lucide-react';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

const BrandBuilding: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-script text-4xl font-bold text-gray-900 mb-4">
            Build Your Crochet Empire
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your passion for crochet into a thriving business. We provide everything you need 
            to create, market, and sell your unique crochet creations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="h-10 w-10 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Learn & Create</h3>
            <p className="text-gray-600">
              Access exclusive patterns and tutorials to master new techniques and create stunning pieces.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-pink-100 rounded-full flex items-center justify-center mb-4">
              <Award className="h-10 w-10 text-pink-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Perfect Your Craft</h3>
            <p className="text-gray-600">
              Use premium supplies and tools to ensure your finished products meet professional standards.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Users className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Build Community</h3>
            <p className="text-gray-600">
              Connect with fellow crafters, share your work, and build a loyal customer base.
            </p>
          </div>

          {/* Step 4 */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">4. Grow Your Business</h3>
            <p className="text-gray-600">
              Scale your operations with our business resources and marketing support.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Start Your Crochet Business?
              </h3>
              <p className="text-gray-600 mb-6">
                Join thousands of successful crochet entrepreneurs who have built thriving businesses 
                with our patterns, supplies, and support. Get started today with our comprehensive 
                business starter kit.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">50+ Premium Patterns to Start</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Business Planning Guide</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Marketing Templates & Tips</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Community Access & Support</span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg">
                  <Link to="/category/crochet-patterns">Get Started Now</Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/6474472/pexels-photo-6474472.jpeg"
                alt="Successful Crochet Business"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">$2K+</div>
                  <div className="text-sm text-gray-600">Avg Monthly Revenue</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandBuilding;