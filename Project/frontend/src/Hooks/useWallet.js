import { useState } from 'react';
import * as walletApi from '../api/wallet';

export const useWallet = () => {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchWallet = async (address) => {
    setLoading(true);
    setError(null);
    try {
      const response = await walletApi.searchWallet(address);
      setWallet(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getWallet = async (address) => {
    setLoading(true);
    setError(null);
    try {
      const response = await walletApi.getWallet(address);
      setWallet(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearWallet = () => {
    setWallet(null);
    setError(null);
  };

  return { wallet, loading, error, searchWallet, getWallet, clearWallet };
};