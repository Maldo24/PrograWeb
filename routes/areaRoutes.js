// routes/areaRoutes.js
const express = require('express');
const router = express.Router();
const areaController = require('../controls/areaController'); 

router.route('/')
    .post(areaController.createArea) // POST /api/areas
    .get(areaController.getAllAreas); // GET /api/areas

router.route('/:id')
    .get(areaController.getAreaById)      // GET /api/areas/:id
    .put(areaController.updateArea)       // PUT /api/areas/:id
    .delete(areaController.deleteArea);   // DELETE /api/areas/:id

module.exports = router;