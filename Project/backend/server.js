require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/database');
const { apiLimiter, authLimiter } = require('./middleware/rateLimiter');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const walletRoutes = require('./routes/walletRoutes');
const searchRoutes = require('./routes/searchRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Initialize Express app
const app = express();

// Validate critical environment variables
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  console.error('❌ JWT_SECRET must be at least 32 characters long');
  process.exit(1);
}

if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI is required');
  process.exit(1);
}

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS for frontend
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies with size limit
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Parse URL-encoded bodies with size limit

// Apply general rate limiting to all routes
app.use('/api/', apiLimiter);

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Crypto Wallet Tracker API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      user: '/api/user',
      wallet: '/api/wallet',
      search: '/api/search',
      admin: '/api/admin'
    }
  });
});

// API Routes
app.use('/api/auth', authLimiter, authRoutes); // Apply stricter rate limit to auth
app.use('/api/user', userRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/admin', adminRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Documentation endpoint - shows all available endpoints
app.get('/api', (req, res) => {
  const apiEndpoints = {
    title: "Crypto Wallet Tracker API",
    version: "1.0.0",
    baseUrl: `http://localhost:${process.env.PORT || 5000}`,
    endpoints: {
      "Authentication": {
        "POST /api/auth/register": "Register new user",
        "POST /api/auth/login": "Login user", 
        "GET /api/auth/me": "Get current user info (requires auth)",
        "POST /api/auth/logout": "Logout user (requires auth)"
      },
      "User Management": {
        "GET /api/user/profile": "Get user profile (requires auth)",
        "PUT /api/user/profile": "Update user profile (requires auth)",
        "PUT /api/user/password": "Change password (requires auth)"
      },
      "Wallet Operations": {
        "POST /api/wallet/search": "Search wallet and save to history (requires auth)",
        "GET /api/wallet/:address": "Get wallet info without saving (requires auth)"
      },
      "Search History": {
        "GET /api/search/history": "Get user's search history (requires auth)",
        "DELETE /api/search/history/clear": "Clear all search history (requires auth)",
        "GET /api/search/:id": "Get specific search details (requires auth)",
        "DELETE /api/search/:id": "Delete specific search (requires auth)"
      },
      "Admin Operations": {
        "GET /api/admin/stats": "Get dashboard statistics (requires admin)",
        "GET /api/admin/users": "Get all users (requires admin)",
        "GET /api/admin/users/:id": "Get specific user (requires admin)",
        "DELETE /api/admin/users/:id": "Delete user (requires admin)",
        "GET /api/admin/searches": "Get all searches (requires admin)",
        "GET /api/admin/analytics": "Get search analytics (requires admin)"
      },
      "System": {
        "GET /api/health": "Health check endpoint",
        "GET /api": "This API documentation"
      }
    },
    notes: {
      "Authentication": "Include 'Authorization: Bearer <token>' header for protected routes",
      "Admin Routes": "Require admin role in addition to authentication",
      "Rate Limiting": "Auth routes have stricter rate limits applied"
    }
  };

  res.json(apiEndpoints);
});

// 404 handler - must be after all routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler - must be last
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});
// In your backend server file (e.g., server.js or app.js)



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 API URL: http://localhost:${PORT}/api`);
});