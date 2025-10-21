import api from "./api.js";
import { ENDPOINTS } from "../Utils/constants.js";

/**  Authentication
 * LOGIN: 'api/auth/login',
 * REGISTER: 'api/auth/register',
 * LOGOUT: 'api/auth/logout',
 * ME: 'api/auth/me',
 */

const authService = {
  login: async (credentials) => {
    const response = await api.post(ENDPOINTS.LOGIN, credentials);
    return response.data; // Extract the data from the response
  },
  register: async (userData) => {
    const response = await api.post(ENDPOINTS.REGISTER, userData);
    return response.data; // Extract the data from the response
  },
  logout: async () => {
    const response = await api.post(ENDPOINTS.LOGOUT);
    return response; // Logout returns { success: true, message: '...' }
  },
  getCurrentUser: async () => {
    const response = await api.get(ENDPOINTS.CURRENT_USER);
    return response.data.user; // Extract user from data
  },
};

export default authService;
