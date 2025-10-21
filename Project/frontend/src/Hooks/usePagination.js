import { useState, useCallback, useMemo } from 'react';

/**
 * Hook for managing pagination state and logic
 * @param {Object} config - Configuration object
 * @param {number} config.initialPage - Starting page (default: 1)
 * @param {number} config.initialLimit - Items per page (default: 10)
 * @param {number} config.totalItems - Total number of items
 * @returns {Object} Pagination state and methods
 */
const usePagination = ({
  initialPage = 1,
  initialLimit = 10,
  totalItems = 0
} = {}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  // Calculate pagination values
  const pagination = useMemo(() => {
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (currentPage - 1) * limit;
    const endIndex = Math.min(startIndex + limit - 1, totalItems - 1);
    const hasNextPage = currentPage < totalPages;
    const hasPrevPage = currentPage > 1;

    return {
      currentPage,
      totalPages,
      totalItems,
      limit,
      startIndex,
      endIndex,
      hasNextPage,
      hasPrevPage,
      startItem: totalItems > 0 ? startIndex + 1 : 0,
      endItem: totalItems > 0 ? endIndex + 1 : 0
    };
  }, [currentPage, limit, totalItems]);

  // Navigation methods
  const goToPage = useCallback((page) => {
    const pageNumber = Math.max(1, Math.min(page, pagination.totalPages));
    setCurrentPage(pageNumber);
  }, [pagination.totalPages]);

  const nextPage = useCallback(() => {
    if (pagination.hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  }, [pagination.hasNextPage]);

  const prevPage = useCallback(() => {
    if (pagination.hasPrevPage) {
      setCurrentPage(prev => prev - 1);
    }
  }, [pagination.hasPrevPage]);

  const firstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const lastPage = useCallback(() => {
    setCurrentPage(pagination.totalPages);
  }, [pagination.totalPages]);

  const setPageSize = useCallback((newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1); // Reset to first page when changing page size
  }, []);

  const reset = useCallback(() => {
    setCurrentPage(initialPage);
    setLimit(initialLimit);
  }, [initialPage, initialLimit]);

  // Generate page numbers for pagination UI
  const getPageNumbers = useCallback((maxVisible = 5) => {
    const { totalPages, currentPage } = pagination;
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisible - 1);

    // Adjust start if we're near the end
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [pagination]);

  return {
    // State
    ...pagination,

    // Methods
    goToPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    setPageSize,
    reset,
    getPageNumbers
  };
};

export default usePagination;