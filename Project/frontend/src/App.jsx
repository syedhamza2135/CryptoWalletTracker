import React from 'react';
import './index.css';

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-2xl p-8 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-2">Crypto Wallet Tracker</h1>
        <p className="text-gray-600 mb-4">Welcome — your dev server is serving the latest source.</p>
  <div className="text-sm text-gray-500">This page is served from your local source (HMR enabled).</div>
      </div>
    </div>
  );
}
