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
    const response = await api.get(ENDPOINTS.ADMIN_STATS);
    return response;
  },
  // Fetch all users
  fetchAllUsers: async () => {
    const response = await api.get(ENDPOINTS.ADMIN_USERS);
    return response;
  },
  // Get user details by ID
  getUserDetails: async (userId) => {
    const response = await api.get(
      `${ENDPOINTS.ADMIN_USER_DETAIL}/${userId}`
    );
    return response;
  },
  // Delete a user by ID
  deleteUser: async (userId) => {
    const response = await api.delete(
      `${ENDPOINTS.ADMIN_USER_DELETE}/${userId}`
    );
    return response;
  },
  // Admin search logs
  fetchAdminSearches: async () => {
    const response = await api.get(ENDPOINTS.ADMIN_SEARCHES);
    return response;
  },
  // Admin analytics
  fetchAdminAnalytics: async () => {
    const response = await api.get(ENDPOINTS.ADMIN_ANALYTICS);
    return response;
  },
};

export default adminService;
