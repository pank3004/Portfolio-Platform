// Authentication Middleware
// This middleware protects routes that require admin login with valid JWT

const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
const authMiddleware = (req, res, next) => {
  try {
    // Get token from request header
    // Expected format: "Bearer <token>"
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Check if token exists
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. No token provided.' 
      });
    }

    // Verify the token using JWT_SECRET from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Ensure it's an access token (not temp token)
    if (decoded.type !== 'access') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token type. Please complete OTP verification.'
      });
    }
    
    // Add admin ID to request object so it can be used in route handlers
    req.adminId = decoded.id;
    
    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // Token is invalid or expired
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired. Please login again.'
      });
    }
    
    res.status(401).json({ 
      success: false, 
      message: 'Invalid token.' 
    });
  }
};

module.exports = authMiddleware;
