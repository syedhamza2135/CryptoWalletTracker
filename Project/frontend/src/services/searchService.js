import api from "./api.js"
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
      return response.data && response.data.searches ? response.data.searches : [];
    } catch (error) {
      console.error("Error fetching search history:", error);
      return [];
    }
    // GET /api/search/history
    // Return array of searches
  },

  // Get single search detail
  getSearchDetail: async (id) => {
    const response = await api.get(`${ENDPOINTS.SEARCH_DETAIL}/${id}`);
    return response.data && response.data.search ? response.data.search : null;
    // GET /api/search/:id
    // Return search details
  },

  // Delete specific search
  deleteSearch: async (id) => {
    const response = await api.delete(`${ENDPOINTS.DELETE_SEARCH}/${id}`);
    return response;
    // DELETE /api/search/:id
  },

  // Clear all history
  clearHistory: async () => {
    const response = await api.delete(ENDPOINTS.CLEAR_SEARCH_HISTORY);
    return response;
    // DELETE /api/search/history/clear
  },
};

export default searchService;
