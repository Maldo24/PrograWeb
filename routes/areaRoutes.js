// routes/areaRoutes.js
const express = require('express');
const router = express.Router();
const areaController = require('../controls/areaController'); 
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, authorize(['Admin']),areaController.createArea) // POST /api/areas
    .get(protect, areaController.getAllAreas); // GET /api/areas

router.route('/:id')
    .get(protect, areaController.getAreaById)      // GET /api/areas/:id
    .put(protect, authorize(['Admin']),areaController.updateArea)       // PUT /api/areas/:id
    .delete(protect, authorize(['Admin']),areaController.deleteArea);   // DELETE /api/areas/:id

module.exports = router;