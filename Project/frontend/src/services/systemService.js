import api from "./api.js";
import { ENDPOINTS } from "../Utils/constants.js";

/** System
 * HEALTH: 'api/health',
 */
const systemService = {
  // Check system health
  checkHealth: async () => {
    const response = await api.get(ENDPOINTS.HEALTH);
    return response;
  },
};

export default systemService;
