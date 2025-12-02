// controls/userController.js
const userService = require('../services/userService');

// POST /api/users
exports.createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        // El servicio devuelve el objeto Mongoose, lo pasamos a JSON
        // y eliminamos la contraseña si no fue excluida por el servicio.
        const userResponse = user.toObject();
        delete userResponse.password; 
        
        res.status(201).json(userResponse);
    } catch (error) {
        const statusCode = error.status || 500; 
        res.status(statusCode).json({ message: error.message });
    }
};

// GET /api/users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        // El servicio ya excluye la contraseña
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/users/:id
exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT /api/users/:id
exports.updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado para actualizar.' });
        }
        res.status(200).json(user);
    } catch (error) {
        const statusCode = error.status || 500;
        res.status(statusCode).json({ message: error.message });
    }
};

// DELETE /api/users/:id
exports.deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado para eliminar.' });
        }
        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};