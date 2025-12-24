// Study Material Routes
// Defines routes for study material CRUD operations

const express = require('express');
const router = express.Router();
const studyMaterialController = require('../controllers/studyMaterialController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
// GET /api/study-materials - Get all active study materials
router.get('/', studyMaterialController.getAllMaterials);

// GET /api/study-materials/category/:category - Get materials by category
router.get('/category/:category', studyMaterialController.getMaterialsByCategory);

// GET /api/study-materials/:id - Get single material by ID
router.get('/:id', studyMaterialController.getMaterialById);

// Admin routes
// GET /api/study-materials/admin/all - Get all materials including inactive
router.get('/admin/all', authMiddleware, studyMaterialController.getAllMaterialsAdmin);

// POST /api/study-materials - Create new study material
router.post('/', authMiddleware, upload.single('file'), studyMaterialController.createMaterial);

// PUT /api/study-materials/:id - Update study material
router.put('/:id', authMiddleware, upload.single('file'), studyMaterialController.updateMaterial);

// DELETE /api/study-materials/:id - Delete study material
router.delete('/:id', authMiddleware, studyMaterialController.deleteMaterial);

module.exports = router;
