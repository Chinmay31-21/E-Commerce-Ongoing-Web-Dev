import React, { useState } from 'react';
import { X, Eye, EyeOff, User, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
  onLogin: (email: string, password: string) => Promise<void>;
  GoogleLoginComponent?: React.ReactNode;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSwitchToRegister,
  onLogin,
  GoogleLoginComponent,
}) => {
  const { auth } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await onLogin(formData.email, formData.password);
      onClose();
      setFormData({ email: '', password: '' });
      // Show success message
      alert('Login successful!');
    } catch (error: any) {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg relative">
        <button className="absolute top-2 right-2" onClick={onClose}>
          <X size={24} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Sign In</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter your email"
                required
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter your password"
                required
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={auth.isLoading}
          >
            {auth.isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        {GoogleLoginComponent && (
          <div className="my-4">
            {GoogleLoginComponent}
          </div>
        )}

        <div className="text-sm mt-2">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToRegister}
            className="text-primary-600 underline"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;