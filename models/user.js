const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,  
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    // FIX: Debemos usar 'mongoose.Schema.Types.ObjectId'
    rol:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Role',
        required: true
    }

},{timestamps: true});

module.exports = mongoose.model('User', UserSchema);