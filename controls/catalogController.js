// controls/catalogController.js
const catalogService = require('../services/catalogService'); // Importar la lógica de negocio

// 1. POST /api/catalogs
exports.createCatalog = async (req, res) => {
    try {
        const catalogData = req.body;
        const catalog = await catalogService.createCatalog(catalogData);
        // Respuesta 201 Created
        res.status(201).json(catalog);
    } catch (error) {
        // Manejo de errores (ej: si falla la validación de Mongoose o la BD)
        res.status(500).json({ message: error.message });
    }
};

// 2. GET /api/catalogs
exports.getAllCatalogs = async (req, res) => {
    try {
        const catalogs = await catalogService.getAllCatalogs();
        res.status(200).json(catalogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. GET /api/catalogs/:id
exports.getCatalogById = async (req, res) => {
    try {
        const catalog = await catalogService.getCatalogById(req.params.id);
        if (!catalog) {
            return res.status(404).json({ message: 'Catálogo no encontrado.' });
        }
        res.status(200).json(catalog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. PUT /api/catalogs/:id
exports.updateCatalog = async (req, res) => {
    try {
        const catalog = await catalogService.updateCatalog(req.params.id, req.body);
        if (!catalog) {
            return res.status(404).json({ message: 'Catálogo no encontrado para actualizar.' });
        }
        res.status(200).json(catalog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 5. DELETE /api/catalogs/:id
exports.deleteCatalog = async (req, res) => {
    try {
        const catalog = await catalogService.deleteCatalog(req.params.id);
        if (!catalog) {
            return res.status(404).json({ message: 'Catálogo no encontrado para eliminar.' });
        }
        // Respuesta 204 No Content para indicar eliminación exitosa
        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};