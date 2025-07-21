import React, { useState } from 'react';
import Button from '../common/Button';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, you would send this to your API
    console.log('Submitting email:', email);
    
    // Show success message
    setIsSubmitted(true);
    
    // Reset form
    setEmail('');
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };
  
  return (
    <section className="py-16 bg-primary-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-medium text-white mb-4">
            Join Our Crafting Community
          </h2>
          <p className="text-primary-200 mb-8">
            Subscribe to receive new patterns, crafting tips, exclusive designs, and special offers for our crochet community.
          </p>
          
          {isSubmitted ? (
            <div className="bg-success-100 border border-success-200 text-success-800 px-4 py-3 rounded">
              <p>Thank you for subscribing! You'll receive our next newsletter soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 rounded-md bg-white/10 text-white placeholder-white/60 border border-primary-700 focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                >
                  Subscribe
                </Button>
              </div>
              <p className="mt-4 text-sm text-primary-300">
                We respect your privacy. You can unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;