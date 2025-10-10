import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Landing = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex flex-col">
      {/* Navigation */}
      <nav className="w-full px-4 py-6 flex-shrink-0">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-white text-2xl font-bold flex items-center">
            <span className="text-3xl mr-2">₿</span>
            CryptoTracker
          </div>
          <div className="space-x-4">
            <Link
              to="/login"
              className="text-white hover:text-blue-200 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-4xl mx-auto text-center w-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Track Bitcoin Wallets
            <br />
            <span className="text-blue-200">Like Never Before</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8">
            Analyze Bitcoin wallet addresses, view transaction history, and gain
            insights with powerful analytics tools.
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition transform hover:scale-105"
          >
            Get Started Free
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">Wallet Search</h3>
            <p className="text-blue-100">
              Search any Bitcoin address and get instant detailed information
              about balance, transactions, and activity.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">Analytics</h3>
            <p className="text-blue-100">
              Visualize transaction patterns, connected wallets, and activity
              timelines with interactive charts.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold mb-2">Search History</h3>
            <p className="text-blue-100">
              Keep track of all your wallet searches in one place with detailed
              historical data.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-blue-200">
        <p>&copy; 2024 CryptoTracker. Built with MERN Stack.</p>
      </footer>
    </div>
  );
};

export default Landing;