// AI Update Model
// This model represents AI and tech news/updates in the database

const mongoose = require('mongoose');

// Define the schema for AI updates
const aiUpdateSchema = new mongoose.Schema({
  // Update title
  title: {
    type: String,
    required: true,
    trim: true
  },
  // Update content/description
  content: {
    type: String,
    required: true
  },
  // Source link (article, paper, news)
  sourceLink: {
    type: String,
    default: ''
  },
  // Category/topic of the update
  category: {
    type: String,
    default: 'General AI'
  },
  // Featured image
  image: {
    type: String,
    default: ''
  },
  // Whether to show this update on the website
  isActive: {
    type: Boolean,
    default: true
  },
  // Timestamp for when update was added
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AIUpdate', aiUpdateSchema);
