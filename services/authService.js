// services/authService.js
require('dotenv').config();
const User = require('../models/user');
const Role = require('../models/role'); // Asegúrate de haber corregido el typo a 'mongoose' en models/role.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. Servicio de REGISTRO
exports.registerUser = async (userData) => {
    // 1. Buscar Rol por nombre (Admin o Estudiante)
    const role = await Role.findOne({ name: userData.rolName }); 
    if (!role) {
        const error = new Error(`Rol '${userData.rolName}' no encontrado. Crea el rol primero.`);
        error.status = 400; 
        throw error;
    }
    
    // 2. Asignar el ID del rol al usuario
    userData.rol = role._id; 
    
    // 3. Hashear Contraseña
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);
    
    // 4. Crear y guardar el usuario
    const newUser = new User(userData);
    await newUser.save();
    
    // 5. Generar Token
    const token = jwt.sign(
        { userId: newUser._id, rol: role.name }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1d' } // Token válido por 1 día
    );

    return { token };
};


// 2. Servicio de LOGIN
exports.loginUser = async (username, password) => {
    // 1. Buscar usuario y poblar el campo rol para obtener el nombre
    const user = await User.findOne({ username }).populate('rol', 'name');
    if (!user) {
        throw new Error('Credenciales inválidas');
    }

    // 2. Comparar la contraseña hasheada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Credenciales inválidas');
    }
    
    // 3. Generar JWT (usando el nombre del rol poblado: user.rol.name)
    const token = jwt.sign(
        { userId: user._id, rol: user.rol.name }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1d' }
    );

    return { token };
};