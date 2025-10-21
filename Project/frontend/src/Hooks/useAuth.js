import { useState, useEffect } from 'react';
import authService from '../services/authService';
import storage from '../Utils/storage';

/**
 * Custom hook for authentication management
 * Handles login, register, logout, and current user state
 */
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = storage.getToken();
        if (token) {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        storage.clearAll();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(credentials);
      storage.setToken(response.token);
      setUser(response.user);
      return response;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(userData);
      storage.setToken(response.token);
      setUser(response.user);
      return response;
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      storage.clearAll();
      setUser(null);
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
    isAuthenticated: !!user
  };
};

export default useAuth;