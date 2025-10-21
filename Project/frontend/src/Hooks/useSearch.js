import { useState, useEffect } from 'react';
import searchService from '../Services/searchService';

/**
 * Custom hook for search history operations
 * Handles fetching, deleting, and clearing search history
 */
const useSearch = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch search history
  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const history = await searchService.getHistory();
      setSearchHistory(history);
      return history;
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch search history';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get search detail
  const getSearchDetail = async (id) => {
    if (!id) {
      setError('Search ID is required');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const detail = await searchService.getSearchDetail(id);
      return detail;
    } catch (err) {
      const errorMessage = err.message || 'Failed to get search detail';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a search
  const deleteSearch = async (id) => {
    if (!id) {
      setError('Search ID is required');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await searchService.deleteSearch(id);
      // Update local state by removing the deleted search
      setSearchHistory(prev => prev.filter(search => search._id !== id));
      return true;
    } catch (err) {
      const errorMessage = err.message || 'Failed to delete search';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Clear all history
  const clearHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      await searchService.clearHistory();
      setSearchHistory([]);
      return true;
    } catch (err) {
      const errorMessage = err.message || 'Failed to clear search history';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  // Auto-fetch history on mount (optional)
  // useEffect(() => {
  //   fetchHistory();
  // }, []);

  return {
    searchHistory,
    loading,
    error,
    fetchHistory,
    getSearchDetail,
    deleteSearch,
    clearHistory,
    clearError
  };
};

export default useSearch;