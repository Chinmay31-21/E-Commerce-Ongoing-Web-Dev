import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { Helmet } from 'react-helmet';

const NotFoundPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | CrochetCraft</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Helmet>
      
      <div className="pt-32 pb-16 flex items-center justify-center min-h-[80vh]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-9xl font-bold text-primary-200 mb-4">404</h1>
          <h2 className="text-3xl font-serif font-medium text-gray-900 mb-6">
            Page Not Found
          </h2>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back to shopping.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary">
              <Link to="/">Return to Home</Link>
            </Button>
            <Button variant="outline">
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;