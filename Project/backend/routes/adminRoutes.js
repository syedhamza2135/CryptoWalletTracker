const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getAllUsers,
  getUserById,
  deleteUser,
  getAllSearches,
  getSearchAnalytics
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

// All routes require authentication AND admin role

/**
 * @route   GET /api/admin/stats
 * @desc    Get dashboard statistics
 * @access  Private/Admin
 */
router.get('/stats', protect, admin, getDashboardStats);

/**
 * @route   GET /api/admin/users
 * @desc    Get all users
 * @access  Private/Admin
 */
router.get('/users', protect, admin, getAllUsers);

/**
 * @route   GET /api/admin/users/:id
 * @desc    Get specific user details
 * @access  Private/Admin
 */
router.get('/users/:id', protect, admin, getUserById);

/**
 * @route   DELETE /api/admin/users/:id
 * @desc    Delete user
 * @access  Private/Admin
 */
router.delete('/users/:id', protect, admin, deleteUser);

/**
 * @route   GET /api/admin/searches
 * @desc    Get all searches
 * @access  Private/Admin
 */
router.get('/searches', protect, admin, getAllSearches);

/**
 * @route   GET /api/admin/analytics
 * @desc    Get search analytics
 * @access  Private/Admin
 */
router.get('/analytics', protect, admin, getSearchAnalytics);

module.exports = router;