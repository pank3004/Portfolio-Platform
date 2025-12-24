// Project Model
// This model represents portfolio projects in the database

const mongoose = require('mongoose');

// Define the schema for projects
const projectSchema = new mongoose.Schema({
  // Project title
  title: {
    type: String,
    required: true,
    trim: true
  },
  // Project description
  description: {
    type: String,
    required: true
  },
  // Technologies used in the project (array of strings)
  technologies: [{
    type: String
  }],
  // Project image URL or file path
  image: {
    type: String,
    default: ''
  },
  // GitHub repository link
  githubLink: {
    type: String,
    default: ''
  },
  // Live demo link
  liveLink: {
    type: String,
    default: ''
  },
  // Whether to show this project on the website
  isActive: {
    type: Boolean,
    default: true
  },
  // Timestamp for when project was added
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', projectSchema);
