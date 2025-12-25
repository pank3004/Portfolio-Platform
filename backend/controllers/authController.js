// Auth Controller
// Handles admin authentication (login with 2FA, OTP verification, credential reset)

const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateOTP, getOTPExpiry, sendOTPEmail, validateOTP } = require('../services/otpService');

// STEP 1: Admin Login - Email & Password Verification
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide email and password' 
      });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email });
    
    if (!admin) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = getOTPExpiry();

    // Generate temporary token (valid for 10 minutes, only for OTP verification)
    const tempToken = jwt.sign(
      { id: admin._id, type: 'temp' },
      process.env.JWT_SECRET,
      { expiresIn: '10m' }
    );

    // Store OTP and temp token in database
    admin.otp = otp;
    admin.otpExpiry = otpExpiry;
    admin.otpUsed = false;
    admin.tempToken = tempToken;
    await admin.save();

    // Send OTP via email
    try {
      await sendOTPEmail(admin.email, otp);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      return res.status(500).json({
        success: false,
        message: 'Failed to send OTP email. Please check email configuration.'
      });
    }

    res.json({
      success: true,
      message: 'Email and password verified. OTP sent to your email.',
      tempToken,
      requiresOTP: true,
      email: admin.email
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login' 
    });
  }
};

// STEP 2: Verify OTP and Issue JWT Token
exports.verifyOTP = async (req, res) => {
  try {
    const { otp } = req.body;
    const tempToken = req.header('Authorization')?.replace('Bearer ', '');

    // Validate input
    if (!otp) {
      return res.status(400).json({
        success: false,
        message: 'Please provide OTP'
      });
    }

    if (!tempToken) {
      return res.status(401).json({
        success: false,
        message: 'Temporary token required'
      });
    }

    // Verify temporary token
    let decoded;
    try {
      decoded = jwt.verify(tempToken, process.env.JWT_SECRET);
      
      // Ensure it's a temp token
      if (decoded.type !== 'temp') {
        return res.status(401).json({
          success: false,
          message: 'Invalid token type'
        });
      }
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired temporary token. Please login again.'
      });
    }

    // Find admin
    const admin = await Admin.findById(decoded.id);
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    // Verify temp token matches stored one
    if (admin.tempToken !== tempToken) {
      return res.status(401).json({
        success: false,
        message: 'Invalid session. Please login again.'
      });
    }

    // Validate OTP
    const validation = validateOTP(admin.otp, admin.otpExpiry, otp, admin.otpUsed);
    
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.message
      });
    }

    // Mark OTP as used and clear OTP data
    admin.otp = null;
    admin.otpExpiry = null;
    admin.otpUsed = true;
    admin.tempToken = null;
    admin.lastLogin = new Date();
    await admin.save();

    // Generate actual JWT token (valid for 7 days)
    const token = jwt.sign(
      { id: admin._id, email: admin.email, type: 'access' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'OTP verified successfully. Login complete.',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name
      }
    });

  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during OTP verification'
    });
  }
};

// Resend OTP
exports.resendOTP = async (req, res) => {
  try {
    const tempToken = req.header('Authorization')?.replace('Bearer ', '');

    if (!tempToken) {
      return res.status(401).json({
        success: false,
        message: 'Temporary token required'
      });
    }

    // Verify temporary token
    let decoded;
    try {
      decoded = jwt.verify(tempToken, process.env.JWT_SECRET);
      
      if (decoded.type !== 'temp') {
        return res.status(401).json({
          success: false,
          message: 'Invalid token type'
        });
      }
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired temporary token. Please login again.'
      });
    }

    // Find admin
    const admin = await Admin.findById(decoded.id);
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpiry = getOTPExpiry();

    // Update OTP in database
    admin.otp = otp;
    admin.otpExpiry = otpExpiry;
    admin.otpUsed = false;
    await admin.save();

    // Send OTP via email
    try {
      await sendOTPEmail(admin.email, otp);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      return res.status(500).json({
        success: false,
        message: 'Failed to send OTP email.'
      });
    }

    res.json({
      success: true,
      message: 'New OTP sent to your email.'
    });

  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while resending OTP'
    });
  }
};

// Reset Admin Email (JWT Protected)
exports.resetEmail = async (req, res) => {
  try {
    const { newEmail, password } = req.body;
    const adminId = req.adminId;

    // Validate input
    if (!newEmail || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide new email and password'
      });
    }

    // Find admin
    const admin = await Admin.findById(adminId);
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, admin.password);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password'
      });
    }

    // Check if new email already exists
    const existingAdmin = await Admin.findOne({ email: newEmail });
    if (existingAdmin && existingAdmin._id.toString() !== adminId) {
      return res.status(400).json({
        success: false,
        message: 'Email already in use'
      });
    }

    // Update email
    admin.email = newEmail;
    await admin.save();

    res.json({
      success: true,
      message: 'Email updated successfully',
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name
      }
    });

  } catch (error) {
    console.error('Reset email error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while resetting email'
    });
  }
};

// Reset Admin Password (JWT Protected)
exports.resetPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const adminId = req.adminId;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide current and new password'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters'
      });
    }

    // Find admin
    const admin = await Admin.findById(adminId);
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    admin.password = hashedPassword;
    await admin.save();

    res.json({
      success: true,
      message: 'Password updated successfully'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while resetting password'
    });
  }
};

// Create Admin (First time setup)
exports.createAdmin = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ 
        success: false, 
        message: 'Admin already exists' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const admin = new Admin({
      email,
      password: hashedPassword,
      name
    });

    await admin.save();

    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name
      }
    });

  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating admin' 
    });
  }
};

// Get current admin info
exports.getMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select('-password -otp -otpExpiry -tempToken');
    res.json({
      success: true,
      admin
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching admin info' 
    });
  }
};
