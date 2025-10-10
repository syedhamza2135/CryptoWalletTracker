import React from 'react';
import { Link } from 'react-router-dom';

const SimpleLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">
            🔗 Crypto Wallet Tracker
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Track and analyze Bitcoin wallets with advanced insights
          </p>
          
          <div className="space-x-4">
            <Link 
              to="/login"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/register"
              className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleLanding;