// Blog Controller
// Handles CRUD operations for blogs and newsletters

const Blog = require('../models/Blog');

// Get all blogs (public)
exports.getAllBlogs = async (req, res) => {
  try {
    const { type } = req.query; // Filter by type if provided
    
    let filter = { isActive: true };
    if (type) {
      filter.type = type;
    }
    
    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: blogs.length,
      blogs
    });
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching blogs' 
    });
  }
};

// Get single blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ 
        success: false, 
        message: 'Blog not found' 
      });
    }
    
    res.json({
      success: true,
      blog
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching blog' 
    });
  }
};

// Create new blog (admin only)
exports.createBlog = async (req, res) => {
  try {
    const { title, content, type, tags, author } = req.body;
    
    // Get image URL from Cloudinary (req.file.path contains the full Cloudinary URL)
    const image = req.file ? req.file.path : '';
    
    const blog = new Blog({
      title,
      content,
      type,
      image,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      author: author || 'Admin'
    });
    
    await blog.save();
    
    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      blog
    });
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating blog' 
    });
  }
};

// Update blog (admin only)
exports.updateBlog = async (req, res) => {
  try {
    const { title, content, type, tags, author, isActive } = req.body;
    
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ 
        success: false, 
        message: 'Blog not found' 
      });
    }
    
    // Update fields
    if (title) blog.title = title;
    if (content) blog.content = content;
    if (type) blog.type = type;
    if (tags) blog.tags = tags.split(',').map(t => t.trim());
    if (author) blog.author = author;
    if (isActive !== undefined) blog.isActive = isActive;
    
    // Update image if new file was uploaded (Cloudinary URL in req.file.path)
    if (req.file) {
      blog.image = req.file.path;
    }
    
    blog.updatedAt = Date.now();
    await blog.save();
    
    res.json({
      success: true,
      message: 'Blog updated successfully',
      blog
    });
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating blog' 
    });
  }
};

// Delete blog (admin only)
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ 
        success: false, 
        message: 'Blog not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting blog' 
    });
  }
};

// Get all blogs for admin (includes inactive)
exports.getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: blogs.length,
      blogs
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching blogs' 
    });
  }
};
