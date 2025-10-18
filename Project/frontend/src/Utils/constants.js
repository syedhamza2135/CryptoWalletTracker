export const API_BASE_URL = "http://localhost:5000";

export const ENDPOINTS = {
  // Authentication
  LOGIN: 'api/auth/login',
  REGISTER: 'api/auth/register',
  LOGOUT: 'api/auth/logout',
  CURRENT_USER: 'api/auth/me',

  // Wallet Operations
  WALLET_SEARCH: 'api/wallet/search',
  WALLET_GET: 'api/wallet/',

  // Search History
  SEARCH_HISTORY: 'api/search/history',
  SEARCH_DETAIL: 'api/search/',
  DELETE_SEARCH: 'api/search/',
  CLEAR_SEARCH_HISTORY: 'api/search/history/clear',

  // User Management
  USER_PROFILE: 'api/user/profile',
  USER_PASSWORD: 'api/user/password',

  // Admin Operations
  ADMIN_STATS: 'api/admin/stats',
  ADMIN_USERS: 'api/admin/users',
  ADMIN_USER_DETAIL: 'api/admin/users/',
  ADMIN_USER_DELETE: 'api/admin/users/',
  ADMIN_SEARCHES: 'api/admin/searches',
  ADMIN_ANALYTICS: 'api/admin/analytics',

  // System
  HEALTH: 'api/health',
  API_DOCS: 'api'
};