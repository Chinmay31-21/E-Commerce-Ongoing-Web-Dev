import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { LockIcon, CreditCard, AlertCircle } from 'lucide-react';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentInfo {
  cardNumber: string;
  nameOnCard: string;
  expiryDate: string;
  cvv: string;
}

const CheckoutPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });
  
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    nameOnCard: '',
    expiryDate: '',
    cvv: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Format price with currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  
  // Calculate shipping cost - free over $100
  const shippingCost = cart.subtotal > 100 ? 0 : 9.99;
  
  // Calculate tax (assumed 8%)
  const taxRate = 0.08;
  const taxAmount = cart.subtotal * taxRate;
  
  // Calculate total
  const total = cart.subtotal + shippingCost + taxAmount;
  
  // Handle shipping form submission
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    
    if (!shippingInfo.firstName) newErrors.firstName = 'First name is required';
    if (!shippingInfo.lastName) newErrors.lastName = 'Last name is required';
    if (!shippingInfo.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(shippingInfo.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!shippingInfo.phone) newErrors.phone = 'Phone is required';
    if (!shippingInfo.address) newErrors.address = 'Address is required';
    if (!shippingInfo.city) newErrors.city = 'City is required';
    if (!shippingInfo.state) newErrors.state = 'State is required';
    if (!shippingInfo.zipCode) newErrors.zipCode = 'ZIP Code is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Clear errors and proceed to payment
    setErrors({});
    setCurrentStep('payment');
  };
  
  // Handle payment form submission
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    
    if (!paymentInfo.cardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(paymentInfo.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    
    if (!paymentInfo.nameOnCard) newErrors.nameOnCard = 'Name on card is required';
    
    if (!paymentInfo.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(paymentInfo.expiryDate)) {
      newErrors.expiryDate = 'Expiry date must be in MM/YY format';
    }
    
    if (!paymentInfo.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(paymentInfo.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Clear errors and proceed to review
    setErrors({});
    setCurrentStep('review');
  };
  
  // Handle order placement
  const placeOrder = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      clearCart();
      navigate('/order-confirmation');
    }, 1500);
  };
  
  if (cart.items.length === 0) {
    return (
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-soft text-center">
            <h1 className="text-2xl font-medium text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-6">
              You don't have any items in your cart. Start shopping to add items.
            </p>
            <Button
              variant="primary"
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>Checkout | CrochetCraft</title>
        <meta name="description" content="Complete your purchase securely at CrochetCraft." />
      </Helmet>
      
      <div className="pt-32 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-medium text-gray-900 mb-8 text-center">
            Checkout
          </h1>
          
          {/* Checkout Steps */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex justify-between">
              <div className={`flex-1 text-center pb-4 ${currentStep === 'shipping' ? 'border-b-2 border-primary-600' : 'border-b border-gray-300'}`}>
                <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full mb-2 ${
                  currentStep === 'shipping' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}>
                  1
                </div>
                <p className={`text-sm font-medium ${currentStep === 'shipping' ? 'text-primary-600' : 'text-gray-600'}`}>
                  Shipping
                </p>
              </div>
              <div className={`flex-1 text-center pb-4 ${currentStep === 'payment' ? 'border-b-2 border-primary-600' : 'border-b border-gray-300'}`}>
                <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full mb-2 ${
                  currentStep === 'payment' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}>
                  2
                </div>
                <p className={`text-sm font-medium ${currentStep === 'payment' ? 'text-primary-600' : 'text-gray-600'}`}>
                  Payment
                </p>
              </div>
              <div className={`flex-1 text-center pb-4 ${currentStep === 'review' ? 'border-b-2 border-primary-600' : 'border-b border-gray-300'}`}>
                <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full mb-2 ${
                  currentStep === 'review' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}>
                  3
                </div>
                <p className={`text-sm font-medium ${currentStep === 'review' ? 'text-primary-600' : 'text-gray-600'}`}>
                  Review
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Left Column - Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-soft">
                {/* Shipping Information */}
                {currentStep === 'shipping' && (
                  <form onSubmit={handleShippingSubmit}>
                    <h2 className="text-xl font-medium text-gray-900 mb-4">
                      Shipping Information
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name*
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          value={shippingInfo.firstName}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                          className={`w-full p-2 border rounded-md ${errors.firstName ? 'border-error-500' : 'border-gray-300'}`}
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-error-600">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name*
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          value={shippingInfo.lastName}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                          className={`w-full p-2 border rounded-md ${errors.lastName ? 'border-error-500' : 'border-gray-300'}`}
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-error-600">{errors.lastName}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email*
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                          className={`w-full p-2 border rounded-md ${errors.email ? 'border-error-500' : 'border-gray-300'}`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-error-600">{errors.email}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone*
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                          className={`w-full p-2 border rounded-md ${errors.phone ? 'border-error-500' : 'border-gray-300'}`}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-error-600">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address*
                      </label>
                      <input
                        type="text"
                        id="address"
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                        className={`w-full p-2 border rounded-md ${errors.address ? 'border-error-500' : 'border-gray-300'}`}
                      />
                      {errors.address && (
                        <p className="mt-1 text-sm text-error-600">{errors.address}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City*
                        </label>
                        <input
                          type="text"
                          id="city"
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                          className={`w-full p-2 border rounded-md ${errors.city ? 'border-error-500' : 'border-gray-300'}`}
                        />
                        {errors.city && (
                          <p className="mt-1 text-sm text-error-600">{errors.city}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State*
                        </label>
                        <input
                          type="text"
                          id="state"
                          value={shippingInfo.state}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                          className={`w-full p-2 border rounded-md ${errors.state ? 'border-error-500' : 'border-gray-300'}`}
                        />
                        {errors.state && (
                          <p className="mt-1 text-sm text-error-600">{errors.state}</p>
                        )}
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code*
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          value={shippingInfo.zipCode}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                          className={`w-full p-2 border rounded-md ${errors.zipCode ? 'border-error-500' : 'border-gray-300'}`}
                        />
                        {errors.zipCode && (
                          <p className="mt-1 text-sm text-error-600">{errors.zipCode}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country*
                      </label>
                      <select
                        id="country"
                        value={shippingInfo.country}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        variant="primary"
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </form>
                )}
                
                {/* Payment Information */}
                {currentStep === 'payment' && (
                  <form onSubmit={handlePaymentSubmit}>
                    <h2 className="text-xl font-medium text-gray-900 mb-4">
                      Payment Information
                    </h2>
                    
                    <div className="mb-6 bg-primary-50 border border-primary-100 rounded-md p-4 flex items-start">
                      <LockIcon className="text-primary-600 mr-3 mt-0.5" size={18} />
                      <p className="text-sm text-primary-800">
                        Your payment information is encrypted and secure. We never store your full credit card details.
                      </p>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number*
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="cardNumber"
                          value={paymentInfo.cardNumber}
                          onChange={(e) => {
                            // Format with spaces every 4 digits
                            const value = e.target.value.replace(/\s/g, '');
                            const formattedValue = value
                              .replace(/\D/g, '')
                              .slice(0, 16)
                              .replace(/(\d{4})(?=\d)/g, '$1 ');
                            
                            setPaymentInfo({ ...paymentInfo, cardNumber: formattedValue });
                          }}
                          className={`w-full p-2 pl-10 border rounded-md ${errors.cardNumber ? 'border-error-500' : 'border-gray-300'}`}
                          placeholder="0000 0000 0000 0000"
                          maxLength={19}
                        />
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      </div>
                      {errors.cardNumber && (
                        <p className="mt-1 text-sm text-error-600">{errors.cardNumber}</p>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700 mb-1">
                        Name on Card*
                      </label>
                      <input
                        type="text"
                        id="nameOnCard"
                        value={paymentInfo.nameOnCard}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, nameOnCard: e.target.value })}
                        className={`w-full p-2 border rounded-md ${errors.nameOnCard ? 'border-error-500' : 'border-gray-300'}`}
                      />
                      {errors.nameOnCard && (
                        <p className="mt-1 text-sm text-error-600">{errors.nameOnCard}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date*
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          value={paymentInfo.expiryDate}
                          onChange={(e) => {
                            // Format as MM/YY
                            const value = e.target.value.replace(/\D/g, '');
                            if (value.length <= 2) {
                              setPaymentInfo({ ...paymentInfo, expiryDate: value });
                            } else {
                              setPaymentInfo({
                                ...paymentInfo,
                                expiryDate: `${value.slice(0, 2)}/${value.slice(2, 4)}`
                              });
                            }
                          }}
                          className={`w-full p-2 border rounded-md ${errors.expiryDate ? 'border-error-500' : 'border-gray-300'}`}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                        {errors.expiryDate && (
                          <p className="mt-1 text-sm text-error-600">{errors.expiryDate}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV*
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          value={paymentInfo.cvv}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            setPaymentInfo({ ...paymentInfo, cvv: value.slice(0, 4) });
                          }}
                          className={`w-full p-2 border rounded-md ${errors.cvv ? 'border-error-500' : 'border-gray-300'}`}
                          placeholder="123"
                          maxLength={4}
                        />
                        {errors.cvv && (
                          <p className="mt-1 text-sm text-error-600">{errors.cvv}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentStep('shipping')}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                      >
                        Continue to Review
                      </Button>
                    </div>
                  </form>
                )}
                
                {/* Order Review */}
                {currentStep === 'review' && (
                  <div>
                    <h2 className="text-xl font-medium text-gray-900 mb-4">
                      Review Your Order
                    </h2>
                    
                    <div className="mb-6">
                      <h3 className="font-medium text-gray-900 mb-2">Shipping Address</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
                        <p>{shippingInfo.address}</p>
                        <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                        <p>{shippingInfo.country}</p>
                        <p>{shippingInfo.email}</p>
                        <p>{shippingInfo.phone}</p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
                      <div className="bg-gray-50 p-4 rounded-md flex items-center">
                        <CreditCard className="text-gray-600 mr-3" size={20} />
                        <div>
                          <p>Credit Card ending in {paymentInfo.cardNumber.slice(-4)}</p>
                          <p className="text-sm text-gray-600">{paymentInfo.nameOnCard}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-medium text-gray-900 mb-2">Order Items</h3>
                      <div className="border rounded-md divide-y">
                        {cart.items.map((item) => (
                          <div key={item.product.id} className="flex items-center p-4">
                            <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="ml-4 flex-1">
                              <h4 className="text-gray-900 text-sm font-medium">
                                {item.product.name}
                              </h4>
                              <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-gray-900">
                                {formatPrice(item.product.price * item.quantity)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 mb-6">
                      <div className="flex justify-between mb-2">
                        <p className="text-gray-600">Subtotal</p>
                        <p className="text-gray-900">{formatPrice(cart.subtotal)}</p>
                      </div>
                      <div className="flex justify-between mb-2">
                        <p className="text-gray-600">Shipping</p>
                        <p className="text-gray-900">
                          {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
                        </p>
                      </div>
                      <div className="flex justify-between mb-2">
                        <p className="text-gray-600">Tax</p>
                        <p className="text-gray-900">{formatPrice(taxAmount)}</p>
                      </div>
                      <div className="flex justify-between font-medium text-lg mt-4">
                        <p>Total</p>
                        <p>{formatPrice(total)}</p>
                      </div>
                    </div>
                    
                    <div className="bg-primary-50 border border-primary-100 rounded-md p-4 flex items-start mb-6">
                      <AlertCircle className="text-primary-600 mr-3 mt-0.5" size={18} />
                      <p className="text-sm text-primary-800">
                        By placing your order, you agree to our Terms of Service and Privacy Policy.
                      </p>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentStep('payment')}
                      >
                        Back
                      </Button>
                      <Button
                        type="button"
                        variant="primary"
                        onClick={placeOrder}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Processing...' : 'Place Order'}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right Column - Order Summary */}
            <div>
              <div className="bg-white p-6 rounded-lg shadow-soft sticky top-32">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Order Summary
                </h2>
                
                <div className="mb-4 max-h-64 overflow-y-auto">
                  {cart.items.map((item) => (
                    <div key={item.product.id} className="flex py-3 border-b border-gray-100 last:border-b-0">
                      <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <h4 className="text-sm text-gray-800 font-medium line-clamp-1">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                        <p className="text-sm text-gray-800 mt-1">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between mb-2">
                    <p className="text-gray-600 text-sm">Subtotal</p>
                    <p className="text-gray-900">{formatPrice(cart.subtotal)}</p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p className="text-gray-600 text-sm">Shipping</p>
                    <p className="text-gray-900">
                      {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
                    </p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p className="text-gray-600 text-sm">Tax</p>
                    <p className="text-gray-900">{formatPrice(taxAmount)}</p>
                  </div>
                  <div className="flex justify-between font-medium text-lg mt-4">
                    <p>Total</p>
                    <p>{formatPrice(total)}</p>
                  </div>
                </div>
                
                {cart.subtotal < 100 && (
                  <div className="mt-4 bg-gray-50 p-3 rounded-md text-sm">
                    <p className="text-gray-700">
                      Add <strong>{formatPrice(100 - cart.subtotal)}</strong> more to get <strong>FREE shipping</strong>!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;