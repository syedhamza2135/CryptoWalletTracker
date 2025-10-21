import api from "./api.js";
import { ENDPOINTS } from "../Utils/constants.js";

/**
 * User Management
 * USER_PROFILE: 'api/user/profile',
 * USER_PASSWORD: 'api/user/password',
 */

const userService = {
  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.put(ENDPOINTS.USER_PROFILE, userData);
    return response;
  },
  // Change user password
  changePassword: async (passwordData) => {
    const response = await api.put(ENDPOINTS.USER_PASSWORD, passwordData);
    return response;
  },
};

export default userService;
