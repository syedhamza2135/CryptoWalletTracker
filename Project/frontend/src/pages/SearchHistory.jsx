import React from 'react';
import Navbar from '../components/NavBar';

const SearchHistory = () => {
  return (
    <div className="h-screen w-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 px-4 py-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800">Search History</h1>
          <p className="text-gray-600 mt-2">
            Search history will be implemented here in Phase 6
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchHistory;