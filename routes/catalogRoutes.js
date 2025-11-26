// routes/catalogRoutes.js
const express = require('express');
const router = express.Router();
const catalogController = require('../controls/catalogController'); // Importar el Controlador

// Ruta para crear un nuevo catálogo (POST) y obtener todos los catálogos (GET)
router.route('/')
    .post(catalogController.createCatalog) // POST /api/catalogs
    .get(catalogController.getAllCatalogs); // GET /api/catalogs

// Rutas para operaciones específicas por ID
router.route('/:id')
    .get(catalogController.getCatalogById)      // GET /api/catalogs/:id
    .put(catalogController.updateCatalog)       // PUT /api/catalogs/:id
    .delete(catalogController.deleteCatalog);   // DELETE /api/catalogs/:id

module.exports = router;