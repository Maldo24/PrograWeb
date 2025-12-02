// services/userService.js
const User = require('../models/user');
const Role = require('../models/role'); 
const bcrypt = require('bcryptjs'); // Importar para hashing

// C = CREATE
exports.createUser = async (userData) => {
    // 1. Validar ID de Rol
    const roleExists = await Role.findById(userData.rol);
    if (!roleExists) {
        const error = new Error("El ID de rol proporcionado no es válido.");
        error.status = 400; 
        throw error;
    }
    
    // 2. Hashear Contraseña (Seguridad)
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);
    
    // 3. Guardar Usuario
    const newUser = new User(userData);
    return await newUser.save();
};

// R = READ ALL (Poblar el campo rol)
exports.getAllUsers = async () => {
    // Poblar 'rol' y solo devolver el campo 'name' del rol
    return await User.find().select('-password').populate('rol', 'name'); // Excluir contraseña
};

// R = READ BY ID
exports.getUserById = async (id) => {
    return await User.findById(id).select('-password').populate('rol', 'name'); // Excluir contraseña
};

// U = UPDATE
exports.updateUser = async (id, updateData) => {
    // Hashear nueva contraseña si se proporciona
    if (updateData.password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    // Validar nuevo ID de Rol si se proporciona
    if (updateData.rol) {
        const roleExists = await Role.findById(updateData.rol);
        if (!roleExists) {
            const error = new Error("El nuevo ID de rol proporcionado no es válido.");
            error.status = 400;
            throw error;
        }
    }

    // Actualizar y poblar, excluyendo la contraseña
    const user = await User.findByIdAndUpdate(id, updateData, { 
        new: true, 
        runValidators: true 
    }).select('-password').populate('rol', 'name');

    return user;
};

// D = DELETE
exports.deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};