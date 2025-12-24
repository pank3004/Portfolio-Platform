// Blog/Newsletter Model
// This model represents blog posts and newsletters in the database

const mongoose = require('mongoose');

// Define the schema for blogs/newsletters
const blogSchema = new mongoose.Schema({
  // Blog title
  title: {
    type: String,
    required: true,
    trim: true
  },
  // Blog content (can be rich text/markdown)
  content: {
    type: String,
    required: true
  },
  // Type: Blog or Newsletter
  type: {
    type: String,
    required: true,
    enum: ['Blog', 'Newsletter']
  },
  // Featured image
  image: {
    type: String,
    default: ''
  },
  // Tags for the blog post
  tags: [{
    type: String
  }],
  // Author name
  author: {
    type: String,
    default: 'Admin'
  },
  // Whether to show this blog on the website
  isActive: {
    type: Boolean,
    default: true
  },
  // Timestamp for when blog was created
  createdAt: {
    type: Date,
    default: Date.now
  },
  // Timestamp for last update
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Blog', blogSchema);
