// Authentication Routes
// Defines routes for admin authentication with 2FA

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const { loginLimiter, verifyOTPLimiter, otpLimiter, resetLimiter } = require('../middleware/rateLimiter');

// POST /api/auth/login - Step 1: Admin login (email + password)
router.post('/login', loginLimiter, authController.login);

// POST /api/auth/verify-otp - Step 2: Verify OTP and get JWT token
router.post('/verify-otp', verifyOTPLimiter, authController.verifyOTP);

// POST /api/auth/resend-otp - Resend OTP
router.post('/resend-otp', otpLimiter, authController.resendOTP);

// POST /api/auth/reset-email - Reset admin email (JWT protected)
router.post('/reset-email', authMiddleware, resetLimiter, authController.resetEmail);

// POST /api/auth/reset-password - Reset admin password (JWT protected)
router.post('/reset-password', authMiddleware, resetLimiter, authController.resetPassword);

// POST /api/auth/create-admin - Create first admin (use once)
router.post('/create-admin', authController.createAdmin);

// GET /api/auth/me - Get current admin info (JWT protected)
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
