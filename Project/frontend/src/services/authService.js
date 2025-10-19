import api from "./api.js";
import { ENDPOINTS } from "../Utils/constants.js";
import storage from "../Utils/storage.js";

/**  Authentication
 * LOGIN: 'api/auth/login',
 * REGISTER: 'api/auth/register',
 * LOGOUT: 'api/auth/logout',
 * ME: 'api/auth/me',
 */

const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post(ENDPOINTS.LOGIN, credentials);
      return response;
    } catch (error) {
      throw error;
    }
  },
  register: async (userData) => {
    try {
      const response = await api.post(ENDPOINTS.REGISTER, userData);
      return response;
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    try {
      const response = await api.post(ENDPOINTS.LOGOUT);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getCurrentUser: async () => {
    try {
      const response = await api.get(ENDPOINTS.CURRENT_USER);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
