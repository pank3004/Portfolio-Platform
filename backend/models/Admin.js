// Admin User Model
// This model represents the admin user in the database

const mongoose = require('mongoose');

// Define the schema (structure) for admin user
const adminSchema = new mongoose.Schema({
  // Admin email - must be unique
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  // Admin password - will be hashed before storing
  password: {
    type: String,
    required: true
  },
  // Admin name
  name: {
    type: String,
    default: 'Administrator'
  },
  // Timestamp for when admin was created
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export the model so it can be used in other files
module.exports = mongoose.model('Admin', adminSchema);
