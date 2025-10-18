import api from './api.js';
import { ENDPOINTS } from '../Utils/constants.js';

  /**
   * User Management
   * USER_PROFILE: 'api/user/profile',
   * USER_PASSWORD: 'api/user/password',
  */

const userService = {
  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await api.put(ENDPOINTS.USER_PROFILE, userData);
      return response;
    } catch (error) {
      throw error;
    }
  },
    // Change user password
    changePassword: async (passwordData) => {
      try {
        const response = await api.put(ENDPOINTS.USER_PASSWORD, passwordData);
        return response;
      } catch (error) {
        throw error;
      }
    }
};

export default userService;
