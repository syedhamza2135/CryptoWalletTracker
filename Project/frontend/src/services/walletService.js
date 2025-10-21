import api from "./api.js";
import { ENDPOINTS } from "../Utils/constants.js";

/**
 * Wallet Operations
 * WALLET_SEARCH: 'api/wallet/search',
 * WALLET_GET: 'api/wallet/',
 */
const walletService = {
  searchWallet: async (address) => {
    const response = await api.post(ENDPOINTS.WALLET_SEARCH, { address });
    return response; // Response interceptor already returns response.data
  },

  getWallet: async (address) => {
    const response = await api.get(`${ENDPOINTS.WALLET_GET}/${address}`);
    return response;
  },
};

export default walletService;
