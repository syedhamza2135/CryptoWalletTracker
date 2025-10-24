import { useState, useEffect } from 'react';
import * as searchApi from '../api/search';

export const useHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await searchApi.getHistory();
      const data = response.data;
      // Handle different possible response structures
      const searches = data?.data?.searches || data?.searches || (Array.isArray(data) ? data : []);
      setHistory(searches);
    } catch (err) {
      setError(err.message);
      setHistory([]); // Ensure history is always an array
    } finally {
      setLoading(false);
    }
  };

  const deleteSearch = async (id) => {
    try {
      await searchApi.deleteSearch(id);
      setHistory(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      throw err;
    }
  };

  const clearHistory = async () => {
    try {
      await searchApi.clearHistory();
      setHistory([]);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return { history, loading, error, fetchHistory, deleteSearch, clearHistory };
};