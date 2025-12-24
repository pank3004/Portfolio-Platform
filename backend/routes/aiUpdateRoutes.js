// AI Update Routes
// Defines routes for AI update CRUD operations

const express = require('express');
const router = express.Router();
const aiUpdateController = require('../controllers/aiUpdateController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
// GET /api/ai-updates - Get all active AI updates
router.get('/', aiUpdateController.getAllUpdates);

// GET /api/ai-updates/:id - Get single AI update by ID
router.get('/:id', aiUpdateController.getUpdateById);

// Admin routes
// GET /api/ai-updates/admin/all - Get all AI updates including inactive
router.get('/admin/all', authMiddleware, aiUpdateController.getAllUpdatesAdmin);

// POST /api/ai-updates - Create new AI update
router.post('/', authMiddleware, upload.single('image'), aiUpdateController.createUpdate);

// PUT /api/ai-updates/:id - Update AI update
router.put('/:id', authMiddleware, upload.single('image'), aiUpdateController.updateUpdate);

// DELETE /api/ai-updates/:id - Delete AI update
router.delete('/:id', authMiddleware, aiUpdateController.deleteUpdate);

module.exports = router;
