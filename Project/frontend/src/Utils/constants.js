export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

export const API_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  PARTIAL: 'partial',
};

export const TOKEN_KEY = 'token';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  WALLET_SEARCH: '/wallet-search',
  HISTORY: '/history',
  PROFILE: '/profile',
  ADMIN: '/admin',
};