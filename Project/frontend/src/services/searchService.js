import api from "./api.js";
import { ENDPOINTS } from "../Utils/constants.js";

/**
 *  Search History
 * SEARCH_HISTORY: 'api/search/history',
 * SEARCH_DETAIL: 'api/search/',
 * SEARCH_DELETE: 'api/search/',
 * SEARCH_CLEAR: 'api/search/history/clear',
 */
const searchService = {
  // Get search history
  getHistory: async () => {
    try {
      const response = await api.get(ENDPOINTS.SEARCH_HISTORY);
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error("Error fetching search history:", error);
      return [];
    }
    // GET /api/search/history
    // Return array of searches
  },

  // Get single search detail
  getSearchDetail: async (id) => {
    try {
      const response = await api.get(`${ENDPOINTS.SEARCH_DETAIL}/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
    // GET /api/search/:id
    // Return search details
  },

  // Delete specific search
  deleteSearch: async (id) => {
    try {
      const response = await api.delete(`${ENDPOINTS.DELETE_SEARCH}/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
    // DELETE /api/search/:id
  },

  // Clear all history
  clearHistory: async () => {
    try {
      const response = await api.delete(ENDPOINTS.CLEAR_SEARCH_HISTORY);
      return response;
    } catch (error) {
      throw error;
    }
    // DELETE /api/search/history/clear
  },
};

export default searchService;