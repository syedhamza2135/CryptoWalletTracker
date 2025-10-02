const rateLimit = require('express-rate-limit');

/**
 * General API rate limiter
 * Limit: 100 requests per 15 minutes
 */
const apiLimiter = rateLimit({
  windowMs: parseInt(process.env.WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

/**
 * Strict rate limiter for auth routes
 * Limit: 5 requests per 15 minutes (prevents brute force)
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login/register attempts
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again after 15 minutes.'
  },
  skipSuccessfulRequests: true, // Don't count successful requests
});

module.exports = {
  apiLimiter,
  authLimiter
};