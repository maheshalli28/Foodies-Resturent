# Restaurant App Deployment Guide

## Easy API Configuration for Deployment

The app is now configured to easily switch between development and production APIs without code changes.

### Configuration Options

#### 1. Environment-based Configuration
The app automatically detects the environment and uses the appropriate API configuration:

- **Development**: `http://localhost:5000`
- **Production**: `https://your-backend-domain.com` (update in `src/config/api.js`)

#### 2. Environment Variables (Recommended)
Create a `.env` file in the frontend root directory:

```bash
# For development
REACT_APP_API_ENV=development

# For production
REACT_APP_API_ENV=production

# Or use a custom URL (overrides environment-based config)
REACT_APP_API_BASE_URL=https://your-deployed-backend.com
```

### Deployment Steps

#### Frontend Deployment (Vercel/Netlify)

1. **Set Environment Variables**:
   - Go to your deployment platform's environment variables section
   - Add `REACT_APP_API_BASE_URL` with your deployed backend URL
   - Example: `https://resturent-backend-n537.onrender.com`

2. **Build and Deploy**:
   ```bash
   # For production build with optimized chunks
   npm run build:prod
   
   # For regular build
   npm run build
   
   # Deploy the dist folder
   ```

3. **Production Configuration**:
   - Uses `vite.config.prod.js` for optimized production builds
   - Automatic code splitting for better performance
   - Minified and compressed assets

#### Backend Deployment (Heroku/Railway/DigitalOcean)

1. **Set Environment Variables**:
   ```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=https://your-frontend-domain.com
   ADMIN_SECRET=123456
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

2. **Deploy**:
   ```bash
   git push heroku main
   # or your preferred deployment method
   ```

### Quick API URL Changes

#### Method 1: Environment Variable (Recommended)
```bash
# In your .env file
REACT_APP_API_BASE_URL=https://new-backend-url.com
```

#### Method 2: Update Configuration File
Edit `src/config/api.js`:
```javascript
production: {
  baseURL: 'https://your-new-backend-url.com',
  timeout: 15000
}
```

#### Method 3: Runtime Environment
```bash
# Set environment variable before build
REACT_APP_API_ENV=production npm run build
```

### All API Endpoints Centralized

All API calls now use the centralized configuration:
- Auth: `/api/auth/*`
- Products: `/products`
- Orders: `/api/orders`
- Dashboard: `/api/dashboard/*`

### Testing Configuration

To test with a different API URL:
```bash
# Development with custom URL
REACT_APP_API_BASE_URL=http://localhost:3001 npm start

# Production build with custom URL
REACT_APP_API_BASE_URL=https://staging-api.com npm run build
```

### Troubleshooting

1. **CORS Issues**: Ensure your backend has the correct `CLIENT_URL` set
2. **API Not Found**: Check that your backend is deployed and accessible
3. **Environment Variables**: Make sure they're set correctly in your deployment platform
4. **Build Issues**: Clear cache with `npm run build -- --reset-cache`

### File Structure
```
resturent_frontend/
├── src/
│   ├── config/
│   │   └── api.js          # Centralized API configuration
│   ├── components/         # All components use centralized config
│   └── context/
│       └── AuthContext.jsx # Uses centralized config
├── .env.example           # Environment variables template
└── DEPLOYMENT.md          # This guide
```

The app is now deployment-ready with easy API configuration management!
