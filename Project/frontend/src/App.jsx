import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './Components/Layout';

// Pages
import LoginPage from './Pages/LoginPage';  // ← Import

function App() {
  const user = null; // We'll add auth context later
  
  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Public Routes */}
      
        <Route path="/login" element={<LoginPage />} />  {/* ← Add this */}
       
      </Routes>
    </div>
  );
}

export default App;