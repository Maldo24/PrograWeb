// routes/levelDifficultyRoutes.js
const express = require('express');
const router = express.Router();
const levelDifficultyController = require('../controls/levelDifficultyController'); 
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, authorize(['Admin']), levelDifficultyController.createDifficulty) // POST /api/difficulty
    .get(protect,levelDifficultyController.getAllDifficulties); // GET /api/difficulty

router.route('/:id')
    .get(protect,levelDifficultyController.getDifficultyById)   // GET /api/difficulty/:id
    .put(protect, authorize(['Admin']),levelDifficultyController.updateDifficulty)    // PUT /api/difficulty/:id
    .delete(protect, authorize(['Admin']),levelDifficultyController.deleteDifficulty); // DELETE /api/difficulty/:id

module.exports = router;