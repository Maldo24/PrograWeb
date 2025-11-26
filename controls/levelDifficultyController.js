// controls/levelDifficultyController.js
const levelDifficultyService = require('../services/levelDifficultyService');

// 1. POST /api/difficulty
exports.createDifficulty = async (req, res) => {
    try {
        const difficultyData = req.body;
        const difficulty = await levelDifficultyService.createDifficulty(difficultyData);
        res.status(201).json(difficulty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. GET /api/difficulty
exports.getAllDifficulties = async (req, res) => {
    try {
        const difficulties = await levelDifficultyService.getAllDifficulties();
        res.status(200).json(difficulties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. GET /api/difficulty/:id
exports.getDifficultyById = async (req, res) => {
    try {
        const difficulty = await levelDifficultyService.getDifficultyById(req.params.id);
        if (!difficulty) {
            return res.status(404).json({ message: 'Nivel de dificultad no encontrado.' });
        }
        res.status(200).json(difficulty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. PUT /api/difficulty/:id
exports.updateDifficulty = async (req, res) => {
    try {
        const difficulty = await levelDifficultyService.updateDifficulty(req.params.id, req.body);
        if (!difficulty) {
            return res.status(404).json({ message: 'Nivel de dificultad no encontrado para actualizar.' });
        }
        res.status(200).json(difficulty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 5. DELETE /api/difficulty/:id
exports.deleteDifficulty = async (req, res) => {
    try {
        const difficulty = await levelDifficultyService.deleteDifficulty(req.params.id);
        if (!difficulty) {
            return res.status(404).json({ message: 'Nivel de dificultad no encontrado para eliminar.' });
        }
        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};