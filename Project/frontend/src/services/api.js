// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  // Handle network errors
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      // If response isn't JSON, create a generic error
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data;
};

// Helper function to make fetch requests with better error handling
const fetchWithErrorHandling = async (url, options = {}) => {
  try {
    console.log(`Making API request to: ${url}`);
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`API request failed for ${url}:`, error);
    
    // Provide more specific error messages
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Unable to connect to server. Please check if the backend is running on http://localhost:5000');
    }
    
    if (error.message.includes('NetworkError') || error.message.includes('CORS')) {
      throw new Error('Network error. Please check your connection and ensure the backend server is running.');
    }
    
    throw error;
  }
};

// Auth API calls
export const authAPI = {
  // Register new user
  register: async (userData) => {
    try {
      console.log('Attempting to register user...');
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(userData)
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Registration API error:', error);
      if (error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check if the backend is running.');
      }
      throw error;
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      console.log('Attempting to login user...');
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(credentials)
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Login API error:', error);
      if (error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check if the backend is running.');
      }
      throw error;
    }
  },

  // Get current user
  getMe: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Get user API error:', error);
      if (error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check if the backend is running.');
      }
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Logout API error:', error);
      // Don't throw error for logout, just log it
      return { success: false, message: 'Logout request failed, but local session will be cleared' };
    }
  }
};

// Wallet API calls
export const walletAPI = {
  // Search wallet and save to history
  searchWallet: async (address) => {
    const response = await fetch(`${API_BASE_URL}/wallet/search`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ address })
    });
    return handleResponse(response);
  },

  // Get wallet info without saving
  getWallet: async (address) => {
    const response = await fetch(`${API_BASE_URL}/wallet/${address}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

// User API calls
export const userAPI = {
  // Get user profile
  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData)
    });
    return handleResponse(response);
  },

  // Change password
  changePassword: async (passwordData) => {
    const response = await fetch(`${API_BASE_URL}/user/password`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(passwordData)
    });
    return handleResponse(response);
  }
};

// Search API calls
export const searchAPI = {
  // Get search history
  getHistory: async () => {
    try {
      const response = await fetchWithErrorHandling(`${API_BASE_URL}/search/history`, {
        method: 'GET',
        headers: getAuthHeaders()
      });
      return response;
    } catch (error) {
      console.error('Search history API error:', error);
      // Return a safe response instead of throwing
      return {
        success: false,
        message: error.message,
        data: []
      };
    }
  },

  // Get specific search
  getSearchById: async (searchId) => {
    try {
      const response = await fetchWithErrorHandling(`${API_BASE_URL}/search/${searchId}`, {
        method: 'GET',
        headers: getAuthHeaders()
      });
      return response;
    } catch (error) {
      console.error('Get search by ID API error:', error);
      throw error;
    }
  },

  // Delete specific search
  deleteSearch: async (searchId) => {
    try {
      const response = await fetchWithErrorHandling(`${API_BASE_URL}/search/${searchId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return response;
    } catch (error) {
      console.error('Delete search API error:', error);
      throw error;
    }
  },

  // Clear all search history
  clearHistory: async () => {
    try {
      const response = await fetchWithErrorHandling(`${API_BASE_URL}/search/history/clear`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return response;
    } catch (error) {
      console.error('Clear history API error:', error);
      throw error;
    }
  }
};

// Health check
export const healthAPI = {
  check: async () => {
    const response = await fetch(`${API_BASE_URL}/health`);
    return handleResponse(response);
  }
};

// Auth helper functions
export const authUtils = {
  // Store token and user data
  setAuth: (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  // Get stored user data
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Get stored token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Clear auth data
  clearAuth: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};