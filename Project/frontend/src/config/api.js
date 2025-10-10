// API Configuration with environment support
const config = {
  // API Base URL with fallback
  API_BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  
  // App Configuration
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Crypto Wallet Tracker',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  APP_ENV: import.meta.env.VITE_APP_ENV || 'development',
  
  // Feature Flags
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_SENTRY: import.meta.env.VITE_ENABLE_SENTRY === 'true',
  DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE === 'true',
  
  // API Settings
  REQUEST_TIMEOUT: parseInt(import.meta.env.VITE_REQUEST_TIMEOUT) || 30000,
  MAX_RETRIES: parseInt(import.meta.env.VITE_MAX_RETRIES) || 3,
  
  // Development flags
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

// Validate critical config
if (!config.API_BASE_URL) {
  console.error('❌ API_BASE_URL is not configured');
}

if (config.DEBUG_MODE) {
  console.log('🔧 App Config:', config);
}

export default config.API_BASE_URL;
export { config };