// services/levelDifficultyService.js
const LevelDifficulty = require('../models/LevelDifficulty'); 

// C = CREATE
exports.createDifficulty = async (difficultyData) => {
    const newDifficulty = new LevelDifficulty(difficultyData);
    return await newDifficulty.save();
};

// R = READ ALL
exports.getAllDifficulties = async () => {
    return await LevelDifficulty.find();
};

// R = READ BY ID
exports.getDifficultyById = async (id) => {
    return await LevelDifficulty.findById(id); 
};

// U = UPDATE
exports.updateDifficulty = async (id, updateData) => {
    return await LevelDifficulty.findByIdAndUpdate(id, updateData, { 
        new: true, 
        runValidators: true 
    });
};

// D = DELETE
exports.deleteDifficulty = async (id) => {
    return await LevelDifficulty.findByIdAndDelete(id);
};