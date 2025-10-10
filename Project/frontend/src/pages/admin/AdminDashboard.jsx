import React from 'react';
import Navbar from '../../components/NavBar';

const AdminDashboard = () => {
  return (
    <div className="h-screen w-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 px-4 py-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Admin dashboard will be implemented in Phase 7
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;