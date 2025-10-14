import React, { useState, useEffect } from 'react';
import { AuthContext } from './authContext';
import { authAPI, authUtils } from '../services/api';

// Pure Auth Provider Component for Fast Refresh compatibility
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('AuthContext: Checking authentication...');
        setAuthError(null);
        const token = authUtils.getToken();
        console.log('AuthContext: Token found:', !!token);
        
        if (token) {
          const userData = authUtils.getUser();
          console.log('AuthContext: User data found:', !!userData, userData);
          if (userData) {
            setUser(userData);
            setIsAuthenticated(true);
            console.log('AuthContext: User authenticated');
          } else {
            authUtils.clearAuth();
            setUser(null);
            setIsAuthenticated(false);
            console.log('AuthContext: No user data, clearing auth');
          }
        } else {
          setIsAuthenticated(false);
          console.log('AuthContext: No token, not authenticated');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setAuthError(error.message);
        authUtils.clearAuth();
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
        console.log('AuthContext: Auth check complete');
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      if (response.success) {
        const { user, token } = response.data;
        authUtils.setAuth(token, user);
        setUser(user);
        setIsAuthenticated(true);
        console.log('Login successful, user set:', user);
        return { success: true, user };
      } else {
        return { success: false, error: response.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error.message || 'Network error' };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      if (response.success) {
        const { user, token } = response.data;
        authUtils.setAuth(token, user);
        setUser(user);
        setIsAuthenticated(true);
        return { success: true, user };
      } else {
        return { success: false, error: response.message || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false, error: error.message || 'Network error' };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      authUtils.clearAuth();
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // Update user data
  const updateUser = (userData) => {
    setUser(userData);
    const currentToken = authUtils.getToken();
    if (currentToken) {
      authUtils.setAuth(currentToken, userData);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    authError,
    login,
    register,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;