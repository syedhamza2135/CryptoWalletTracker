import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './Context/AuthContext';
import { Header, Footer } from './Components/Layout';
import ProtectedRoute from './Components/Auth/ProtectedRoute';

// Pages
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import DashboardPage from './Pages/DashboardPage';

function App() {
  const { isAuthenticated } = useAuthContext();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <HomePage />
            }
          />
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />
            }
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Catch all route */}
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;