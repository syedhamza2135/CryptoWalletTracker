const { body, validationResult } = require('express-validator');

/**
 * Validation rules for user registration
 */
const registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/\d/).withMessage('Password must contain at least one number')
];

/**
 * Validation rules for user login
 */
const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required')
];

/**
 * Validation rules for password change
 */
const passwordValidation = [
  body('currentPassword')
    .notEmpty().withMessage('Current password is required'),
  
  body('newPassword')
    .notEmpty().withMessage('New password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/\d/).withMessage('Password must contain at least one number')
];

/**
 * Validation rules for profile update
 */
const profileValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters')
];

/**
 * Validation rules for wallet address
 */
const walletValidation = [
  body('address')
    .trim()
    .notEmpty().withMessage('Wallet address is required')
    .custom((value) => {
      // Bitcoin address validation - handles all valid Bitcoin address formats
      
      // Bitcoin Base58 characters: 123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz
      // Excludes: 0 (zero), O (capital o), I (capital i), l (lowercase L)
      
      // Legacy addresses (starts with 1 or 3) - typically 25-34 characters
      if (value.match(/^[13]/)) {
        return value.length >= 25 && value.length <= 34 && 
               /^[13][123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$/.test(value);
      }
      
      // Bech32 addresses (starts with bc1) - typically 42-62 characters, lowercase
      // Bech32 uses specific character set: qpzry9x8gf2tvdw0s3jn54khce6mua7l
      if (value.match(/^bc1/)) {
        return value.length >= 39 && value.length <= 62 &&
               /^bc1[023456789qpzry9x8gf2tvdw0s3jn54khce6mua7l]+$/.test(value);
      }
      
      throw new Error('Invalid Bitcoin address format');
    })
];

/**
 * Middleware to check validation results
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  
  next();
};

module.exports = {
  registerValidation,
  loginValidation,
  passwordValidation,
  profileValidation,
  walletValidation,
  validate
};