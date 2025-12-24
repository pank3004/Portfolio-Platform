// Study Material Model
// This model represents learning materials (PDFs, links, notes) in the database

const mongoose = require('mongoose');

// Define the schema for study materials
const studyMaterialSchema = new mongoose.Schema({
  // Title of the study material
  title: {
    type: String,
    required: true,
    trim: true
  },
  // Description of what this material covers
  description: {
    type: String,
    required: true
  },
  // Category: Python, Machine Learning, Deep Learning, Generative AI, Agentic AI
  category: {
    type: String,
    required: true,
    enum: ['Python', 'Machine Learning', 'Deep Learning', 'Generative AI', 'Agentic AI']
  },
  // Type of material: PDF, Link, or Text
  type: {
    type: String,
    required: true,
    enum: ['PDF', 'Link', 'Text']
  },
  // File path (for PDFs) or URL (for links)
  fileUrl: {
    type: String,
    default: ''
  },
  // Text content (for text-based materials)
  content: {
    type: String,
    default: ''
  },
  // Whether to show this material on the website
  isActive: {
    type: Boolean,
    default: true
  },
  // Timestamp for when material was added
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('StudyMaterial', studyMaterialSchema);
