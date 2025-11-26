const mongoose = require("mongoose");

const LevelDifficultySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    maximunAge:{
        type: Number,
        required: true
    },
    minimunAge:{
        type: Number,
        required: true
    } 
});
module.exports = mongoose.model("LevelDifficulty", LevelDifficultySchema);