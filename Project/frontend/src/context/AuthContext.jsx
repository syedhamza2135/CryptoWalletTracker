import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AuthContext } from './AuthContext';
import axiosInstance from '../services/axios';
import { toast } from 'react-toastify';

// Constants for localStorage keys
const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Helper function to clear auth data
  const clearAuthData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  // Helper function to set auth data
  const setAuthData = useCallback((userData, token) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  }, []);

  // Check authentication status
  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);

    if (token && savedUser) {
      try {
        // Verify token with backend
        const response = await axiosInstance.get('/auth/me');
        const userData = response.data?.data?.user;
        
        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
          // Update localStorage with fresh user data
          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
        } else {
          clearAuthData();
        }
      } catch (error) {
        console.warn('Token verification failed:', error.message);
        clearAuthData();
      }
    } else {
      clearAuthData();
    }
    setLoading(false);
  }, [clearAuthData]);

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Register user
  const register = useCallback(async (name, email, password) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post('/auth/register', {
        name,
        email,
        password,
      });

      const { user: userData, token } = response.data?.data || {};

      if (userData && token) {
        setAuthData(userData, token);
        toast.success('Registration successful! Welcome aboard!');
        return { success: true, user: userData };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [setAuthData]);

  // Login user
  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });

      const { user: userData, token } = response.data?.data || {};

      if (userData && token) {
        setAuthData(userData, token);
        toast.success(`Welcome back, ${userData.name}!`);
        return { success: true, user: userData };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [setAuthData]);

  // Logout user
  const logout = useCallback(async () => {
    try {
      // Attempt to notify backend
      await axiosInstance.post('/auth/logout');
    } catch (error) {
      console.warn('Logout notification failed:', error.message);
    } finally {
      clearAuthData();
      toast.info('You have been logged out successfully');
    }
  }, [clearAuthData]);

  // Update user profile
  const updateProfile = useCallback(async (updateData) => {
    try {
      setLoading(true);
      const response = await axiosInstance.put('/user/profile', updateData);
      const updatedUser = response.data?.data?.user;

      if (updatedUser) {
        // Update localStorage and state with new user data
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
        setUser(updatedUser);
        toast.success('Profile updated successfully');
        return { success: true, user: updatedUser };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Profile update failed. Please try again.';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Change password
  const changePassword = useCallback(async (currentPassword, newPassword) => {
    try {
      setLoading(true);
      await axiosInstance.put('/user/password', {
        currentPassword,
        newPassword,
      });

      toast.success('Password changed successfully');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Password change failed. Please try again.';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Refresh user data
  const refreshUser = useCallback(async () => {
    if (isAuthenticated) {
      await checkAuth();
    }
  }, [isAuthenticated, checkAuth]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    // State
    user,
    loading,
    isAuthenticated,
    // Actions
    register,
    login,
    logout,
    updateProfile,
    changePassword,
    refreshUser,
    // Computed values
    isAdmin: user?.role === 'admin',
    userId: user?._id,
    userEmail: user?.email,
    userName: user?.name,
  }), [
    user,
    loading,
    isAuthenticated,
    register,
    login,
    logout,
    updateProfile,
    changePassword,
    refreshUser,
  ]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};