// Authentication Routes
// Defines routes for admin login and registration

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// POST /api/auth/login - Admin login
router.post('/login', authController.login);

// POST /api/auth/create-admin - Create first admin (use once)
router.post('/create-admin', authController.createAdmin);

// GET /api/auth/me - Get current admin info (protected route)
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
