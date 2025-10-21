import { useState } from 'react';
import userService from '../Services/userService';

/**
 * Custom hook for user operations
 * Handles profile updates and password changes
 */
const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update user profile
  const updateProfile = async (userData) => {
    if (!userData || typeof userData !== 'object') {
      setError('Invalid user data');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await userService.updateProfile(userData);
      return response;
    } catch (err) {
      const errorMessage = err.message || 'Failed to update profile';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const changePassword = async (passwordData) => {
    if (!passwordData || typeof passwordData !== 'object') {
      setError('Invalid password data');
      return;
    }

    // Basic validation
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      setError('Current and new passwords are required');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await userService.changePassword(passwordData);
      return response;
    } catch (err) {
      const errorMessage = err.message || 'Failed to change password';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    loading,
    error,
    updateProfile,
    changePassword,
    clearError
  };
};

export default useUser;