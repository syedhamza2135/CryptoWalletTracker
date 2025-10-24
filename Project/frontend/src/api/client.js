import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - attach token
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors globally
client.interceptors.response.use(
  (response) => response.data, // Return only data portion
  (error) => {
    const errorData = error.response?.data;
    
    // Handle 401 - token expired/invalid
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    // Return structured error
    return Promise.reject({
      message: errorData?.message || 'An error occurred',
      errors: errorData?.errors || [],
      status: error.response?.status,
    });
  }
);

export default client;