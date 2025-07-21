import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/common/Header';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import WishlistPage from './pages/WishlistPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';
import { useAuth } from './contexts/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useAuth();
  return auth.isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useAuth();
  return auth.isAuthenticated && auth.user?.role === 'admin' ? <>{children}</> : <Navigate to="/" />;
};

const AppRouter: React.FC = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/category/:slug" element={<CategoryPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <WishlistPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default AppRouter;
