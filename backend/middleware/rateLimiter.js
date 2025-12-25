// Rate Limiting Configuration
// Prevents brute force attacks on OTP and authentication endpoints

const rateLimit = require('express-rate-limit');

// Rate limiter for OTP requests
// Allows 50 OTP requests per 15 minutes per IP (INCREASED FOR TESTING)
const otpLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 requests per windowMs
  message: {
    success: false,
    message: 'Too many OTP requests. Please try again after 15 minutes.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Rate limiter for login attempts
// Allows 100 login attempts per 15 minutes per IP (INCREASED FOR TESTING)
const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many login attempts. Please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for OTP verification
// Allows 100 verification attempts per 15 minutes per IP (INCREASED FOR TESTING)
const verifyOTPLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    success: false,
    message: 'Too many verification attempts. Please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for password reset
// Allows 3 reset requests per hour per IP
const resetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: {
    success: false,
    message: 'Too many reset requests. Please try again after 1 hour.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  otpLimiter,
  loginLimiter,
  verifyOTPLimiter,
  resetLimiter
};
