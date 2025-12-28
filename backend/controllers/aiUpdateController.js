// AI Update Controller
// Handles CRUD operations for AI updates

const AIUpdate = require('../models/AIUpdate');

// Get all AI updates (public)
exports.getAllUpdates = async (req, res) => {
  try {
    const updates = await AIUpdate.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(20); // Limit to 20 most recent updates
    
    res.json({
      success: true,
      count: updates.length,
      updates
    });
  } catch (error) {
    console.error('Get AI updates error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching AI updates' 
    });
  }
};

// Get single AI update by ID
exports.getUpdateById = async (req, res) => {
  try {
    const update = await AIUpdate.findById(req.params.id);
    
    if (!update) {
      return res.status(404).json({ 
        success: false, 
        message: 'AI update not found' 
      });
    }
    
    res.json({
      success: true,
      update
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching AI update' 
    });
  }
};

// Create new AI update (admin only)
exports.createUpdate = async (req, res) => {
  try {
    const { title, content, sourceLink, category } = req.body;
    
    // Get image URL from Cloudinary (req.file.path contains the full Cloudinary URL)
    const image = req.file ? req.file.path : '';
    
    const update = new AIUpdate({
      title,
      content,
      sourceLink,
      category,
      image
    });
    
    await update.save();
    
    res.status(201).json({
      success: true,
      message: 'AI update created successfully',
      update
    });
  } catch (error) {
    console.error('Create AI update error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating AI update' 
    });
  }
};

// Update AI update (admin only)
exports.updateUpdate = async (req, res) => {
  try {
    const { title, content, sourceLink, category, isActive } = req.body;
    
    const update = await AIUpdate.findById(req.params.id);
    
    if (!update) {
      return res.status(404).json({ 
        success: false, 
        message: 'AI update not found' 
      });
    }
    
    // Update fields
    if (title) update.title = title;
    if (content) update.content = content;
    if (sourceLink !== undefined) update.sourceLink = sourceLink;
    if (category) update.category = category;
    if (isActive !== undefined) update.isActive = isActive;
    
    // Update image if new file was uploaded (Cloudinary URL in req.file.path)
    if (req.file) {
      update.image = req.file.path;
    }
    
    await update.save();
    
    res.json({
      success: true,
      message: 'AI update updated successfully',
      update
    });
  } catch (error) {
    console.error('Update AI update error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating AI update' 
    });
  }
};

// Delete AI update (admin only)
exports.deleteUpdate = async (req, res) => {
  try {
    const update = await AIUpdate.findByIdAndDelete(req.params.id);
    
    if (!update) {
      return res.status(404).json({ 
        success: false, 
        message: 'AI update not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'AI update deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting AI update' 
    });
  }
};

// Get all AI updates for admin (includes inactive)
exports.getAllUpdatesAdmin = async (req, res) => {
  try {
    const updates = await AIUpdate.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: updates.length,
      updates
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching AI updates' 
    });
  }
};
