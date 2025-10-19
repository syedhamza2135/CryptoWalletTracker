import api from "./api.js";
import { ENDPOINTS } from "../Utils/constants.js";

/**
 * Wallet Operations
 * WALLET_SEARCH: 'api/wallet/search',
 * WALLET_GET: 'api/wallet/',
 */
const walletService = {
  searchWallet: async (address) => {
    try {
      const response = await api.post(ENDPOINTS.WALLET_SEARCH, { address });
      return response;
    } catch (error) {
      throw error;
    }
  },

  getWallet: async (address) => {
    try {
      const response = await api.get(`${ENDPOINTS.WALLET_GET}/${address}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default walletService;
