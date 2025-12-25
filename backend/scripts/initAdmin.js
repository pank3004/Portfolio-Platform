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
      const email = process.env.ADMIN_EMAIL;
      const password = process.env.ADMIN_PASSWORD;
      const name = 'Administrator';
      
      // Validate that required environment variables are set
      if (!email || !password) {
        throw new Error(
          '❌ ADMIN_EMAIL and ADMIN_PASSWORD must be set in environment variables!\n' +
          '   Please add them to your .env file or Render environment settings.'
        );
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('❌ Invalid ADMIN_EMAIL format. Please provide a valid email address.');
      }
      
      // Validate password strength
      if (password.length < 6) {
        throw new Error('❌ ADMIN_PASSWORD must be at least 6 characters long.');
      }
      
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
      console.log('⚠️  IMPORTANT: Change the default password after first login!\n');
    } else {
      console.log('✅ Admin user already exists. Skipping initialization.\n');
    }
  } catch (error) {
    console.error('❌ Error initializing admin:', error.message);
    // Stop the server if admin creation fails due to missing credentials
    if (error.message.includes('ADMIN_EMAIL') || error.message.includes('ADMIN_PASSWORD')) {
      console.error('🛑 Server cannot start without proper admin configuration.');
      process.exit(1); // Exit with error code
    }
  }
};

module.exports = initializeAdmin;
