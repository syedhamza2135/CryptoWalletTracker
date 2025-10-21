import axios from "axios";
import storage from "../Utils/storage.js";
import { API_BASE_URL } from "../Utils/constants.js";

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Increased timeout to 30 seconds
  timeoutErrorMessage: "Request timed out. Please try again.",
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR - Attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR - Handle responses and errors
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle 401 - Unauthorized (logout user)
    if (error.response?.status === 401) {
      storage.clearAll();
      window.location.href = "/login";
    }

    // Handle 403 - Forbidden
    if (error.response?.status === 403) {
      console.warn('Access forbidden - you may not have permission for this action');
    }

    // Handle 500 - Server error
    if (error.response?.status === 500) {
      console.error('Server error occurred:', error.response.data);
    }

    // Handle network errors
    if (!error.response) {
      console.error('Network error - please check your connection');
    }

    return Promise.reject(error);
  }
);

export default api;
