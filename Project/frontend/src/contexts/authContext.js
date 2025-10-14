import { createContext } from 'react';

// Auth Context - separated for Fast Refresh compatibility
export const AuthContext = createContext({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  authError: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  updateUser: () => {}
});