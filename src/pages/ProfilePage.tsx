import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Package, Heart, CreditCard, LogOut } from 'lucide-react';
import { Helmet } from 'react-helmet';
import Button from '../components/common/Button';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'settings'>('profile');
  
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    joinDate: 'March 2024',
    orders: [
      {
        id: 'ORD-123456',
        date: '2024-03-15',
        total: 249.99,
        status: 'Delivered',
        items: 3
      },
      {
        id: 'ORD-123457',
        date: '2024-03-10',
        total: 189.99,
        status: 'Processing',
        items: 2
      }
    ]
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Helmet>
        <title>My Profile | CrochetCraft</title>
        <meta name="description" content="Manage your account settings and view your orders." />
      </Helmet>

      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg shadow-soft p-6">
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                      <motion.img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    </div>
                    <h2 className="text-xl font-medium text-gray-900">{user.name}</h2>
                    <p className="text-sm text-gray-500">Member since {user.joinDate}</p>
                  </div>

                  <nav className="space-y-2">
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
                        activeTab === 'profile'
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <User size={18} className="mr-3" />
                      Profile
                    </button>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
                        activeTab === 'orders'
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Package size={18} className="mr-3" />
                      Orders
                    </button>
                    <button
                      onClick={() => setActiveTab('settings')}
                      className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
                        activeTab === 'settings'
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Settings size={18} className="mr-3" />
                      Settings
                    </button>
                    <hr className="my-4" />
                    <button className="w-full flex items-center px-4 py-2 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
                      <LogOut size={18} className="mr-3" />
                      Sign Out
                    </button>
                  </nav>
                </div>
              </div>

              {/* Main Content */}
              <div className="md:col-span-3">
                <div className="bg-white rounded-lg shadow-soft p-6">
                  {/* Profile Tab */}
                  {activeTab === 'profile' && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={tabVariants}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-medium text-gray-900 mb-6">Profile Information</h3>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={user.name}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            value={user.email}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <Button variant="primary">Save Changes</Button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Orders Tab */}
                  {activeTab === 'orders' && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={tabVariants}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-medium text-gray-900 mb-6">Order History</h3>
                      <div className="space-y-4">
                        {user.orders.map((order) => (
                          <motion.div
                            key={order.id}
                            className="border border-gray-200 rounded-lg p-4"
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-gray-900">{order.id}</span>
                              <span className={`px-3 py-1 rounded-full text-sm ${
                                order.status === 'Delivered'
                                  ? 'bg-success-100 text-success-800'
                                  : 'bg-warning-100 text-warning-800'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">
                              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                              <p>Items: {order.items}</p>
                              <p>Total: ${order.total.toFixed(2)}</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-3"
                            >
                              View Details
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Settings Tab */}
                  {activeTab === 'settings' && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={tabVariants}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-medium text-gray-900 mb-6">Account Settings</h3>
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-4">Notifications</h4>
                          <div className="space-y-3">
                            <label className="flex items-center">
                              <input type="checkbox" className="form-checkbox h-4 w-4 text-primary-600" />
                              <span className="ml-2 text-gray-700">Order updates</span>
                            </label>
                            <label className="flex items-center">
                              <input type="checkbox" className="form-checkbox h-4 w-4 text-primary-600" />
                              <span className="ml-2 text-gray-700">Newsletter</span>
                            </label>
                            <label className="flex items-center">
                              <input type="checkbox" className="form-checkbox h-4 w-4 text-primary-600" />
                              <span className="ml-2 text-gray-700">Special offers</span>
                            </label>
                          </div>
                        </div>
                        
                        <hr />

                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-4">Password</h4>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Current Password
                              </label>
                              <input
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded-md"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                New Password
                              </label>
                              <input
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded-md"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm New Password
                              </label>
                              <input
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded-md"
                              />
                            </div>
                            <Button variant="primary">Update Password</Button>
                          </div>
                        </div>

                        <hr />

                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-4">Danger Zone</h4>
                          <Button variant="outline" className="text-error-600 border-error-600 hover:bg-error-50">
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;