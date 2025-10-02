const express = require('express');
const router = express.Router();
const {
  getSearchHistory,
  getSearchById,
  deleteSearch,
  clearSearchHistory
} = require('../controllers/searchController');
const { protect } = require('../middleware/auth');

/**
 * @route   GET /api/search/history
 * @desc    Get user's search history
 * @access  Private
 */
router.get('/history', protect, getSearchHistory);

/**
 * @route   DELETE /api/search/history/clear
 * @desc    Clear all search history
 * @access  Private
 */
router.delete('/history/clear', protect, clearSearchHistory);

/**
 * @route   GET /api/search/:id
 * @desc    Get single search details
 * @access  Private
 */
router.get('/:id', protect, getSearchById);

/**
 * @route   DELETE /api/search/:id
 * @desc    Delete specific search
 * @access  Private
 */
router.delete('/:id', protect, deleteSearch);

module.exports = router;