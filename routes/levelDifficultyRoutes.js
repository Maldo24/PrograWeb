// routes/levelDifficultyRoutes.js
const express = require('express');
const router = express.Router();
const levelDifficultyController = require('../controls/levelDifficultyController'); 

router.route('/')
    .post(levelDifficultyController.createDifficulty) // POST /api/difficulty
    .get(levelDifficultyController.getAllDifficulties); // GET /api/difficulty

router.route('/:id')
    .get(levelDifficultyController.getDifficultyById)   // GET /api/difficulty/:id
    .put(levelDifficultyController.updateDifficulty)    // PUT /api/difficulty/:id
    .delete(levelDifficultyController.deleteDifficulty); // DELETE /api/difficulty/:id

module.exports = router;