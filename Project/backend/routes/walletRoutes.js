const express = require('express');
const router = express.Router();
const { searchWallet, getWallet } = require('../controllers/walletController');
const { walletValidation, validate } = require('../middleware/validation');
const { protect } = require('../middleware/auth');

/**
 * @route   POST /api/wallet/search
 * @desc    Search wallet and save to history
 * @access  Private
 */
router.post('/search', protect, walletValidation, validate, searchWallet);

/**
 * @route   GET /api/wallet/:address
 * @desc    Get wallet info (no save)
 * @access  Private
 */
router.get('/:address', protect, getWallet);

module.exports = router;