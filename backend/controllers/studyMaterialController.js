// Study Material Controller
// Handles CRUD operations for study materials

const StudyMaterial = require('../models/StudyMaterial');

// Get all study materials by category (public)
exports.getMaterialsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    // Fetch active materials for specific category
    const materials = await StudyMaterial.find({ 
      category, 
      isActive: true 
    }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: materials.length,
      materials
    });
  } catch (error) {
    console.error('Get materials error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching study materials' 
    });
  }
};

// Get all study materials (public)
exports.getAllMaterials = async (req, res) => {
  try {
    const materials = await StudyMaterial.find({ isActive: true })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: materials.length,
      materials
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching study materials' 
    });
  }
};

// Get single study material by ID
exports.getMaterialById = async (req, res) => {
  try {
    const material = await StudyMaterial.findById(req.params.id);
    
    if (!material) {
      return res.status(404).json({ 
        success: false, 
        message: 'Study material not found' 
      });
    }
    
    res.json({
      success: true,
      material
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching study material' 
    });
  }
};

// Create new study material (admin only)
exports.createMaterial = async (req, res) => {
  try {
    const { title, description, category, type, content, fileUrl } = req.body;
    
    // Get file path if PDF was uploaded
    let materialFileUrl = fileUrl || '';
    if (type === 'PDF' && req.file) {
      materialFileUrl = `/uploads/${req.file.filename}`;
    }
    
    const material = new StudyMaterial({
      title,
      description,
      category,
      type,
      content: type === 'Text' ? content : '',
      fileUrl: materialFileUrl
    });
    
    await material.save();
    
    res.status(201).json({
      success: true,
      message: 'Study material created successfully',
      material
    });
  } catch (error) {
    console.error('Create material error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating study material' 
    });
  }
};

// Update study material (admin only)
exports.updateMaterial = async (req, res) => {
  try {
    const { title, description, category, type, content, fileUrl, isActive } = req.body;
    
    const material = await StudyMaterial.findById(req.params.id);
    
    if (!material) {
      return res.status(404).json({ 
        success: false, 
        message: 'Study material not found' 
      });
    }
    
    // Update fields
    if (title) material.title = title;
    if (description) material.description = description;
    if (category) material.category = category;
    if (type) material.type = type;
    if (content !== undefined) material.content = content;
    if (fileUrl !== undefined) material.fileUrl = fileUrl;
    if (isActive !== undefined) material.isActive = isActive;
    
    // Update file if new PDF was uploaded
    if (req.file) {
      material.fileUrl = `/uploads/${req.file.filename}`;
    }
    
    await material.save();
    
    res.json({
      success: true,
      message: 'Study material updated successfully',
      material
    });
  } catch (error) {
    console.error('Update material error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating study material' 
    });
  }
};

// Delete study material (admin only)
exports.deleteMaterial = async (req, res) => {
  try {
    const material = await StudyMaterial.findByIdAndDelete(req.params.id);
    
    if (!material) {
      return res.status(404).json({ 
        success: false, 
        message: 'Study material not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'Study material deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting study material' 
    });
  }
};

// Get all materials for admin (includes inactive)
exports.getAllMaterialsAdmin = async (req, res) => {
  try {
    const materials = await StudyMaterial.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: materials.length,
      materials
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching study materials' 
    });
  }
};
