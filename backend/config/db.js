// Database configuration file
// This file handles the connection to MongoDB

const mongoose = require('mongoose');

// Function to connect to MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the connection string from .env file
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    // If connection fails, log the error and exit the application
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1); // Exit with failure code
  }
};

module.exports = connectDB;
