// middleware/authMiddleware.js
require('dotenv').config();
const jwt = require('jsonwebtoken');
// Middleware para verificar el JWT
exports.protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            // Verificar y decodificar el token usando la clave secreta
            const decoded = jwt.verify(token, process.env.JWT_SECRET); 

            // Adjuntar los datos del token (userId y rol) al objeto de solicitud
            req.user = decoded; 

            next(); 
        } catch (error) {
            console.error(error);
            // 401 Unauthorized
            res.status(401).json({ message: 'No autorizado, token inválido o expirado' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'No autorizado, no se encontró token' });
    }
};

// Middleware para restringir el acceso por rol
exports.authorize = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        // req.user.rol es el nombre del rol (Admin o Estudiante) adjuntado por 'protect'
        if (!req.user || (roles.length > 0 && !roles.includes(req.user.rol))) {
            // 403 Forbidden
            return res.status(403).json({ message: 'Acceso denegado: Rol no permitido' });
        }
        next();
    };
};