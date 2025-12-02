// controls/roleController.js
const roleService = require('../services/roleService');

// POST /api/roles
exports.createRole = async (req, res) => {
    try {
        const role = await roleService.createRole(req.body);
        res.status(201).json(role);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/roles
exports.getAllRoles = async (req, res) => {
    try {
        const roles = await roleService.getAllRoles();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/roles/:id
exports.getRoleById = async (req, res) => {
    try {
        const role = await roleService.getRoleById(req.params.id);
        if (!role) {
            return res.status(404).json({ message: 'Rol no encontrado.' });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT /api/roles/:id
exports.updateRole = async (req, res) => {
    try {
        const role = await roleService.updateRole(req.params.id, req.body);
        if (!role) {
            return res.status(404).json({ message: 'Rol no encontrado para actualizar.' });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE /api/roles/:id
exports.deleteRole = async (req, res) => {
    try {
        const role = await roleService.deleteRole(req.params.id);
        if (!role) {
            return res.status(404).json({ message: 'Rol no encontrado para eliminar.' });
        }
        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};