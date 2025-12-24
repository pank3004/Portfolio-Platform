// Admin Initialization Script
// This script automatically creates the default admin user if it doesn't exist
// Runs every time the server starts

const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

/**
 * Initialize default admin user
 * Creates admin with credentials from .env file if no admin exists
 */
const initializeAdmin = async () => {
  try {
    // Check if any admin exists in the database
    const adminCount = await Admin.countDocuments();
    
    if (adminCount === 0) {
      console.log('📝 No admin found. Creating default admin...');
      
      // Get admin credentials from environment variables
      const email = process.env.ADMIN_EMAIL || 'admin@portfolio.com';
      const password = process.env.ADMIN_PASSWORD || 'admin123';
      const name = 'Administrator';
      
      // Hash the password for security
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create new admin user
      const admin = new Admin({
        email,
        password: hashedPassword,
        name
      });
      
      await admin.save();
      
      console.log('✅ Default admin created successfully!');
      console.log('📧 Email:', email);
      console.log('🔑 Password:', password);
      console.log('⚠️  IMPORTANT: Change the default password after first login!\n');
    } else {
      console.log('✅ Admin user already exists. Skipping initialization.\n');
    }
  } catch (error) {
    console.error('❌ Error initializing admin:', error.message);
    // Don't stop the server if admin creation fails
  }
};

module.exports = initializeAdmin;
