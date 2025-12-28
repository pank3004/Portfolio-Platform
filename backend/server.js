// Main Server File
// This is the entry point of the backend application

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const initializeAdmin = require('./scripts/initAdmin');

// Import route files
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const studyMaterialRoutes = require('./routes/studyMaterialRoutes');
const blogRoutes = require('./routes/blogRoutes');
const aiUpdateRoutes = require('./routes/aiUpdateRoutes');

// Initialize Express app
const app = express();

// Trust proxy - Required for Render and other cloud platforms
// This allows express-rate-limit to work correctly behind a proxy
app.set('trust proxy', 1);

// Connect to MongoDB database and initialize admin
connectDB().then(() => {
  // Auto-create default admin if not exists
  initializeAdmin();
});

// Middleware
// Enable CORS (Cross-Origin Resource Sharing) - allows frontend to make requests

          // for local
// app.use(cors())
          // for production 
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://portfolio-frontend-7v82.onrender.com'  // Add your frontend URL
  ],
  credentials: true
}));


// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Note: We're using Cloudinary for file storage, so no need to serve static files locally
// Images are now served directly from Cloudinary CDN

// API Routes
// All routes are prefixed with /api
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/study-materials', studyMaterialRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/ai-updates', aiUpdateRoutes);

// Root route - test if server is running
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Portfolio Platform API is running!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      projects: '/api/projects',
      studyMaterials: '/api/study-materials',
      blogs: '/api/blogs',
      aiUpdates: '/api/ai-updates'
    }
  });
});

// 404 Error handler - route not found
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════╗
  ║  🚀 Server running on port ${PORT}    ║
  ║  📡 API URL: http://localhost:${PORT}  ║
  ╚══════════════════════════════════════╝
  `);
});
