// services/roleService.js
// NOTA: Asegúrate de que tu modelo 'role.js' use 'mongoose' en lugar de 'moogoose'
const Role = require('../models/role'); 

// C = CREATE
exports.createRole = async (roleData) => {
    const newRole = new Role(roleData);
    return await newRole.save();
};

// R = READ ALL
exports.getAllRoles = async () => {
    return await Role.find();
};

// R = READ BY ID
exports.getRoleById = async (id) => {
    return await Role.findById(id); 
};

// U = UPDATE
exports.updateRole = async (id, updateData) => {
    return await Role.findByIdAndUpdate(id, updateData, { 
        new: true, 
        runValidators: true 
    });
};

// D = DELETE
exports.deleteRole = async (id) => {
    return await Role.findByIdAndDelete(id);
};