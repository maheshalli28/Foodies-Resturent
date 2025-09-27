// ✅ Simple API Configuration
const API_CONFIG = {
  baseURL: 'https://resturent-backend-n537.onrender.com',
  timeout: 15000
};

// ✅ API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    ME: '/api/auth/me'
  },
  PRODUCTS: {
    LIST: '/products',
    CREATE: '/products',
    UPDATE: (id) => `/products/${id}`,
    DELETE: (id) => `/products/${id}`
  },
  ORDERS: {
    LIST: '/api/orders',
    CREATE: '/api/orders'
  },
  DASHBOARD: {
    STATS: '/api/dashboard/stats',
    USERS: '/api/dashboard/users'
  }
};

// ✅ Helper function to build full API URL
export const getApiUrl = (endpoint) => `${API_CONFIG.baseURL}${endpoint}`;

// ✅ Export configuration for optional usage
export const currentConfig = API_CONFIG;
