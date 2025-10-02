const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  changePassword
} = require('../controllers/userController');
const {
  profileValidation,
  passwordValidation,
  validate
} = require('../middleware/validation');
const { protect } = require('../middleware/auth');

// All routes are protected (require authentication)

/**
 * @route   GET /api/user/profile
 * @desc    Get user profile
 * @access  Private
 */
router.get('/profile', protect, getProfile);

/**
 * @route   PUT /api/user/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put('/profile', protect, profileValidation, validate, updateProfile);

/**
 * @route   PUT /api/user/password
 * @desc    Change user password
 * @access  Private
 */
router.put('/password', protect, passwordValidation, validate, changePassword);

module.exports = router;