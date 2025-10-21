import { useState } from 'react';
import walletService from '../Services/walletService';

/**
 * Custom hook for wallet operations
 * Handles searching and getting wallet data with loading states
 */
const useWallet = () => {
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchWallet = async (address) => {
    if (!address || typeof address !== 'string' || address.trim() === '') {
      setError('Invalid address: must be a non-empty string.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await walletService.searchWallet(address);
      setWalletData(response.data); // Extract the data property
      return response.data;
    } catch (err) {
      const errorMessage = err.message || 'Failed to search wallet';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getWallet = async (address) => {
    if (!address || typeof address !== 'string' || address.trim() === '') {
      setError('Invalid address: must be a non-empty string.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await walletService.getWallet(address.trim());
      setWalletData(response.data); // Extract the data property
      return response.data;
    } catch (err) {
      const errorMessage = err.message || 'Failed to get wallet data';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearWalletData = () => {
    setWalletData(null);
    setError(null);
  };

  const clearError = () => setError(null);

  return {
    walletData,
    loading,
    error,
    searchWallet,
    getWallet,
    clearWalletData,
    clearError
  };
};

export default useWallet;