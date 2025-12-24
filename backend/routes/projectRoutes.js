// Project Routes
// Defines routes for project CRUD operations

const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes (no authentication required)
// GET /api/projects - Get all active projects
router.get('/', projectController.getAllProjects);

// GET /api/projects/:id - Get single project by ID
router.get('/:id', projectController.getProjectById);

// Admin routes (authentication required)
// GET /api/projects/admin/all - Get all projects including inactive
router.get('/admin/all', authMiddleware, projectController.getAllProjectsAdmin);

// POST /api/projects - Create new project
router.post('/', authMiddleware, upload.single('image'), projectController.createProject);

// PUT /api/projects/:id - Update project
router.put('/:id', authMiddleware, upload.single('image'), projectController.updateProject);

// DELETE /api/projects/:id - Delete project
router.delete('/:id', authMiddleware, projectController.deleteProject);

module.exports = router;
