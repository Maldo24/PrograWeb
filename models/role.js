const mongoose = require('mongoose'); // Corregido a 'mongoose'

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        unique: true,
    },
    description: {
        type: String,
        required: true,
    }
},{timestamps: true});

module.exports = mongoose.model('Role', RoleSchema);