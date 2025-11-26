// controls/areaController.js
const areaService = require('../services/areaService');

// 1. POST /api/areas
exports.createArea = async (req, res) => {
    try {
        const areaData = req.body;
        const area = await areaService.createArea(areaData);
        res.status(201).json(area);
    } catch (error) {
        // Manejo de error de validación de negocio (status 400)
        const statusCode = error.status || 500; 
        res.status(statusCode).json({ message: error.message });
    }
};

// 2. GET /api/areas
exports.getAllAreas = async (req, res) => {
    try {
        const areas = await areaService.getAllAreas();
        res.status(200).json(areas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. GET /api/areas/:id
exports.getAreaById = async (req, res) => {
    try {
        const area = await areaService.getAreaById(req.params.id);
        if (!area) {
            return res.status(404).json({ message: 'Área no encontrada.' });
        }
        res.status(200).json(area);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. PUT /api/areas/:id
exports.updateArea = async (req, res) => {
    try {
        const area = await areaService.updateArea(req.params.id, req.body);
        if (!area) {
            return res.status(404).json({ message: 'Área no encontrada para actualizar.' });
        }
        res.status(200).json(area);
    } catch (error) {
        const statusCode = error.status || 500;
        res.status(statusCode).json({ message: error.message });
    }
};

// 5. DELETE /api/areas/:id
exports.deleteArea = async (req, res) => {
    try {
        const area = await areaService.deleteArea(req.params.id);
        if (!area) {
            return res.status(404).json({ message: 'Área no encontrada para eliminar.' });
        }
        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};