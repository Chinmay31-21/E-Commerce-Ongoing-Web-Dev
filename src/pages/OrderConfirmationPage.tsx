import React, { useEffect } from 'react';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const OrderConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <Helmet>
        <title>Order Confirmation | CrochetCraft</title>
        <meta name="description" content="Your order has been confirmed and is being processed." />
      </Helmet>
      
      <div className="pt-32 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-soft text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-success-100 rounded-full mb-6">
              <CheckCircle className="text-success-600" size={32} />
            </div>
            
            <h1 className="text-3xl font-serif font-medium text-gray-900 mb-4">
              Thank You for Your Order!
            </h1>
            
            <p className="text-gray-600 mb-6">
              Your order has been placed successfully and is being processed. 
              We've sent a confirmation email to your registered email address.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-md mb-8">
              <p className="text-sm text-gray-600 mb-2">Your Order Number</p>
              <p className="text-xl font-medium text-gray-900">{orderNumber}</p>
            </div>
            
            <p className="text-gray-600 mb-4">
              You can check the status of your order anytime in the "My Orders" section of your account.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button
                variant="primary"
                icon={<ShoppingBag size={18} />}
                onClick={() => navigate('/')}
              >
                Continue Shopping
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/account/orders')}
              >
                View My Orders
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmationPage;