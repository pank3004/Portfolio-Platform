// Blog Routes
// Defines routes for blog and newsletter CRUD operations

const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
// GET /api/blogs - Get all active blogs (can filter by type with ?type=Blog or ?type=Newsletter)
router.get('/', blogController.getAllBlogs);

// GET /api/blogs/:id - Get single blog by ID
router.get('/:id', blogController.getBlogById);

// Admin routes
// GET /api/blogs/admin/all - Get all blogs including inactive
router.get('/admin/all', authMiddleware, blogController.getAllBlogsAdmin);

// POST /api/blogs - Create new blog
router.post('/', authMiddleware, upload.single('image'), blogController.createBlog);

// PUT /api/blogs/:id - Update blog
router.put('/:id', authMiddleware, upload.single('image'), blogController.updateBlog);

// DELETE /api/blogs/:id - Delete blog
router.delete('/:id', authMiddleware, blogController.deleteBlog);

module.exports = router;
