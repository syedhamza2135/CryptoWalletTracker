/**
 * Form validation utilities
 */

// Validation rules
export const validationRules = {
  required: (value) => {
    if (Array.isArray(value)) return value.length > 0 || 'This field is required';
    return value && String(value).trim().length > 0 || 'This field is required';
  },

  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) || 'Please enter a valid email address';
  },

  minLength: (min) => (value) => {
    return String(value).length >= min || `Must be at least ${min} characters long`;
  },

  maxLength: (max) => (value) => {
    return String(value).length <= max || `Must be no more than ${max} characters long`;
  },

  bitcoinAddress: (value) => {
    if (!value) return true; // Let required rule handle empty values

    const address = String(value).trim();

    // Bitcoin Legacy addresses (starts with 1 or 3)
    if (address.match(/^[13]/)) {
      return address.length >= 25 && address.length <= 34 &&
             /^[13][123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$/.test(address) ||
             'Invalid Bitcoin legacy address format';
    }

    // Bitcoin Bech32 addresses (starts with bc1)
    if (address.match(/^bc1/)) {
      return address.length >= 39 && address.length <= 62 &&
             /^bc1[023456789qpzry9x8gf2tvdw0s3jn54khce6mua7l]+$/.test(address) ||
             'Invalid Bitcoin Bech32 address format';
    }

    return 'Invalid Bitcoin address format';
  },

  password: (value) => {
    const password = String(value);
    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);

    if (!hasMinLength) return 'Password must be at least 8 characters long';
    if (!hasNumber) return 'Password must contain at least one number';
    if (!hasUpperCase) return 'Password must contain at least one uppercase letter';
    if (!hasLowerCase) return 'Password must contain at least one lowercase letter';

    return true;
  },

  confirmPassword: (passwordField) => (value, formData) => {
    return value === formData[passwordField] || 'Passwords do not match';
  }
};

/**
 * Validate a single field
 * @param {any} value - Field value
 * @param {Array} rules - Array of validation rules
 * @param {Object} formData - Complete form data (for cross-field validation)
 * @returns {string|null} Error message or null if valid
 */
export const validateField = (value, rules, formData = {}) => {
  for (const rule of rules) {
    const result = typeof rule === 'function' ? rule(value, formData) : rule;

    if (result !== true) {
      return result; // Return the error message
    }
  }
  return null; // No errors
};

/**
 * Validate entire form
 * @param {Object} formData - Form data object
 * @param {Object} validationSchema - Validation schema { fieldName: [rules] }
 * @returns {Object} Errors object { fieldName: errorMessage }
 */
export const validateForm = (formData, validationSchema) => {
  const errors = {};

  for (const [fieldName, rules] of Object.entries(validationSchema)) {
    const error = validateField(formData[fieldName], rules, formData);
    if (error) {
      errors[fieldName] = error;
    }
  }

  return errors;
};

/**
 * Check if form has any errors
 * @param {Object} errors - Errors object from validateForm
 * @returns {boolean} True if form is valid
 */
export const isFormValid = (errors) => {
  return Object.keys(errors).length === 0;
};