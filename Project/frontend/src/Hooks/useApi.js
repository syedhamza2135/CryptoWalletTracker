import { useState, useCallback } from 'react';

/**
 * Generic hook for API calls with loading, error, and success states
 * @param {Function} apiFunction - The API function to call
 * @param {Object} options - Configuration options
 * @returns {Object} Hook state and methods
 */
const useApi = (apiFunction, options = {}) => {
  const [data, setData] = useState(options.initialData || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await apiFunction(...args);
      setData(result);
      setSuccess(true);

      if (options.onSuccess) {
        options.onSuccess(result);
      }

      return result;
    } catch (err) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);
      setData(options.initialData || null);

      if (options.onError) {
        options.onError(err);
      }

      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, options]);

  const reset = useCallback(() => {
    setData(options.initialData || null);
    setError(null);
    setSuccess(false);
    setLoading(false);
  }, [options.initialData]);

  const retry = useCallback(async (...args) => {
    return execute(...args);
  }, [execute]);

  return {
    data,
    loading,
    error,
    success,
    execute,
    reset,
    retry
  };
};

export default useApi;