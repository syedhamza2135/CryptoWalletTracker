import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Advanced data fetching hook with caching, error handling, and retry logic
 * @param {Function} fetchFunction - Function that returns a promise
 * @param {Array} dependencies - Dependencies array for useEffect
 * @param {Object} options - Configuration options
 */
const useDataFetch = (
  fetchFunction,
  dependencies = [],
  options = {}
) => {
  const {
    initialData = null,
    cacheKey = null,
    cacheTime = 5 * 60 * 1000, // 5 minutes
    retryCount = 3,
    retryDelay = 1000,
    onSuccess = null,
    onError = null,
    enabled = true
  } = options;

  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isStale, setIsStale] = useState(false);

  const cacheRef = useRef(new Map());
  const abortControllerRef = useRef(null);

  // Cache management
  const getCachedData = useCallback((key) => {
    if (!key) return null;

    const cached = cacheRef.current.get(key);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > cacheTime;
    if (isExpired) {
      cacheRef.current.delete(key);
      return null;
    }

    return cached.data;
  }, [cacheTime]);

  const setCachedData = useCallback((key, data) => {
    if (!key) return;

    cacheRef.current.set(key, {
      data,
      timestamp: Date.now()
    });
  }, []);

  // Retry logic with exponential backoff
  const executeWithRetry = useCallback(async (attempt = 1) => {
    try {
      abortControllerRef.current = new AbortController();

      const result = await fetchFunction();

      // Check if request was aborted
      if (abortControllerRef.current.signal.aborted) {
        return;
      }

      setData(result);
      setError(null);
      setIsStale(false);

      // Cache the result
      if (cacheKey) {
        setCachedData(cacheKey, result);
      }

      if (onSuccess) {
        onSuccess(result);
      }

      return result;
    } catch (err) {
      // Don't retry if request was aborted
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      console.warn(`Fetch attempt ${attempt} failed:`, err.message);

      if (attempt < retryCount) {
        // Exponential backoff
        const delay = retryDelay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
        return executeWithRetry(attempt + 1);
      }

      setError(err.message || 'Failed to fetch data');
      setIsStale(true);

      if (onError) {
        onError(err);
      }

      throw err;
    }
  }, [fetchFunction, cacheKey, retryCount, retryDelay, onSuccess, onError, setCachedData]);

  // Main fetch function
  const fetchData = useCallback(async (force = false) => {
    // Check cache first (unless forcing refresh)
    if (!force && cacheKey) {
      const cached = getCachedData(cacheKey);
      if (cached) {
        setData(cached);
        setError(null);
        setIsStale(false);
        return cached;
      }
    }

    setLoading(true);
    setError(null);

    try {
      const result = await executeWithRetry();
      return result;
    } finally {
      setLoading(false);
    }
  }, [cacheKey, getCachedData, executeWithRetry]);

  // Refresh data (force fetch)
  const refresh = useCallback(() => {
    return fetchData(true);
  }, [fetchData]);

  // Clear cache for this key
  const clearCache = useCallback(() => {
    if (cacheKey) {
      cacheRef.current.delete(cacheKey);
      setIsStale(true);
    }
  }, [cacheKey]);

  // Abort ongoing request
  const abort = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  // Auto-fetch on mount and dependency changes
  useEffect(() => {
    if (enabled) {
      fetchData();
    }

    // Cleanup function to abort requests
    return () => {
      abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...dependencies]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    loading,
    error,
    isStale,
    fetchData,
    refresh,
    clearCache,
    abort
  };
};

export default useDataFetch;