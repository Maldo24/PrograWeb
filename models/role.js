const moogoose = require('mongoose');

const RoleSchema = new moogoose.Schema({
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

module.exports = moogoose.model('Role', RoleSchema);