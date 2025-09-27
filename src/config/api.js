// API Configuration - Production only
const API_CONFIG = {
    production: {
      baseURL: process.env.REACT_APP_API_BASE_URL || 'https://resturent-backend-n537.onrender.com',
      timeout: 15000
    }
  };
  
  // Get current environment (always production)
  const getEnvironment = () => 'production';
  
  // Get current API configuration
  const getApiConfig = () => {
    return API_CONFIG.production;
  };
  
  // Export API endpoints
  export const API_ENDPOINTS = {
    // Auth endpoints
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      ME: '/api/auth/me'
    },
    // Product endpoints
    PRODUCTS: {
      LIST: '/products',
      CREATE: '/products',
      UPDATE: (id) => `/products/${id}`,
      DELETE: (id) => `/products/${id}`
    },
    // Order endpoints
    ORDERS: {
      LIST: '/api/orders',
      CREATE: '/api/orders'
    },
    // Dashboard endpoints
    DASHBOARD: {
      STATS: '/api/dashboard/stats',
      USERS: '/api/dashboard/users'
    }
  };
  
  // Helper function to get full URL
  export const getApiUrl = (endpoint) => {
    const config = getApiConfig();
    return `${config.baseURL}${endpoint}`;
  };
  
  // Export current configuration
  export const currentConfig = getApiConfig();
  
  // Export for easy access
  export default {
    getApiUrl,
    API_ENDPOINTS,
    currentConfig
  };
  