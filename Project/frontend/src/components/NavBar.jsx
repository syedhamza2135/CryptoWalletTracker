import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinkClass = (path) => {
    return `px-3 py-2 rounded-md text-sm font-medium transition ${
      isActive(path)
        ? 'bg-blue-700 text-white'
        : 'text-gray-300 hover:bg-blue-700 hover:text-white'
    }`;
  };

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center">
            <span className="text-3xl text-white mr-2">₿</span>
            <span className="text-white text-xl font-bold">CryptoTracker</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/dashboard" className={navLinkClass('/dashboard')}>
              Dashboard
            </Link>
            <Link to="/history" className={navLinkClass('/history')}>
              History
            </Link>
            <Link to="/profile" className={navLinkClass('/profile')}>
              Profile
            </Link>

            {/* Admin Link */}
            {user?.role === 'admin' && (
              <Link
                to="/admin/dashboard"
                className={navLinkClass('/admin/dashboard')}
              >
                Admin Panel
              </Link>
            )}

            {/* User Menu */}
            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-blue-500">
              <div className="text-white">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-blue-200">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-blue-200 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link
                to="/dashboard"
                className={navLinkClass('/dashboard')}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/history"
                className={navLinkClass('/history')}
                onClick={() => setIsMenuOpen(false)}
              >
                History
              </Link>
              <Link
                to="/profile"
                className={navLinkClass('/profile')}
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              {user?.role === 'admin' && (
                <Link
                  to="/admin/dashboard"
                  className={navLinkClass('/admin/dashboard')}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Panel
                </Link>
              )}
              <div className="pt-4 border-t border-blue-500">
                <p className="text-white text-sm font-medium mb-2">
                  {user?.name}
                </p>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;