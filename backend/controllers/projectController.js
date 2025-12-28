// Project Controller
// Handles CRUD operations for projects

const Project = require('../models/Project');

// Get all projects (public)
exports.getAllProjects = async (req, res) => {
  try {
    // Fetch only active projects, sorted by most recent
    const projects = await Project.find({ isActive: true })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: projects.length,
      projects
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching projects' 
    });
  }
};

// Get single project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ 
        success: false, 
        message: 'Project not found' 
      });
    }
    
    res.json({
      success: true,
      project
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching project' 
    });
  }
};

// Create new project (admin only)
exports.createProject = async (req, res) => {
  try {
    const { title, description, technologies, githubLink, liveLink } = req.body;
    
    // Get image URL from Cloudinary (req.file.path contains the full Cloudinary URL)
    const image = req.file ? req.file.path : '';
    
    const project = new Project({
      title,
      description,
      technologies: technologies ? technologies.split(',').map(t => t.trim()) : [],
      image,
      githubLink,
      liveLink
    });
    
    await project.save();
    
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating project' 
    });
  }
};

// Update project (admin only)
exports.updateProject = async (req, res) => {
  try {
    const { title, description, technologies, githubLink, liveLink, isActive } = req.body;
    
    // Find project
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ 
        success: false, 
        message: 'Project not found' 
      });
    }
    
    // Update fields
    if (title) project.title = title;
    if (description) project.description = description;
    if (technologies) project.technologies = technologies.split(',').map(t => t.trim());
    if (githubLink !== undefined) project.githubLink = githubLink;
    if (liveLink !== undefined) project.liveLink = liveLink;
    if (isActive !== undefined) project.isActive = isActive;
    
    // Update image if new file was uploaded (Cloudinary URL in req.file.path)
    if (req.file) {
      project.image = req.file.path;
    }
    
    await project.save();
    
    res.json({
      success: true,
      message: 'Project updated successfully',
      project
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating project' 
    });
  }
};

// Delete project (admin only)
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({ 
        success: false, 
        message: 'Project not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting project' 
    });
  }
};

// Get all projects for admin (includes inactive)
exports.getAllProjectsAdmin = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: projects.length,
      projects
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching projects' 
    });
  }
};
