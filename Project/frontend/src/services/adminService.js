import api from "./api.js";
import { ENDPOINTS } from "../Utils/constants.js";

/**
 * Admin Operations
 * ADMIN_STATS: 'api/admin/stats',
 * ADMIN_USERS: 'api/admin/users',
 * ADMIN_USER_DETAIL: 'api/admin/users/',
 * ADMIN_USER_DELETE: 'api/admin/users/',
 * ADMIN_SEARCHES: 'api/admin/searches',
 * ADMIN_ANALYTICS: 'api/admin/analytics'
 */

const adminService = {
  //Admin stats
  getAdminStats: async () => {
    try {
      const response = await api.get(ENDPOINTS.ADMIN_STATS);
      return response;
    } catch (error) {
      throw error;
    }
  },
  // Fetch all users
  fetchAllUsers: async () => {
    try {
      const response = await api.get(ENDPOINTS.ADMIN_USERS);
      return response;
    } catch (error) {
      throw error;
    }
  },
  // Get user details by ID
  getUserDetails: async (userId) => {
    try {
      const response = await api.get(
        `${ENDPOINTS.ADMIN_USER_DETAIL}/${userId}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  // Delete a user by ID
  deleteUser: async (userId) => {
    try {
      const response = await api.delete(
        `${ENDPOINTS.ADMIN_USER_DELETE}/${userId}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  // Admin search logs
  fetchAdminSearches: async () => {
    try {
      const response = await api.get(ENDPOINTS.ADMIN_SEARCHES);
      return response;
    } catch (error) {
      throw error;
    }
  },
  // Admin analytics
  fetchAdminAnalytics: async () => {
    try {
      const response = await api.get(ENDPOINTS.ADMIN_ANALYTICS);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default adminService;
