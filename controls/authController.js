// controls/authController.js
const authService = require('../services/authService');

// POST /api/auth/register
exports.register = async (req, res) => {
    try {
        // La data debe incluir: username, age, password, y rolName (Admin o Estudiante)
        const { token } = await authService.registerUser(req.body);
        res.status(201).json({ token });
    } catch (error) {
        const statusCode = error.status || 400;
        res.status(statusCode).json({ message: error.message });
    }
};

// POST /api/auth/login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const { token } = await authService.loginUser(username, password);
        res.status(200).json({ token });
    } catch (error) {
        // 401 Unauthorized para fallo de credenciales
        res.status(401).json({ message: 'Error de autenticación: Credenciales incorrectas' });
    }
};