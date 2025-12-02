// routes/catalogRoutes.js
const express = require('express');
const router = express.Router();
const catalogController = require('../controls/catalogController'); // Importar el Controlador
const { protect, authorize } = require('../middleware/authMiddleware');

// Ruta para crear un nuevo catálogo (POST) y obtener todos los catálogos (GET)
router.route('/')
    // Solo el Admin puede crear catálogos
    .post(protect, authorize(['Admin']), catalogController.createCatalog) 
    // Todos los usuarios autenticados (Admin o Estudiante) pueden leer la lista
    .get(protect, catalogController.getAllCatalogs);
// Rutas para operaciones específicas por ID
router.route('/:id')
    // Todos los usuarios autenticados pueden leer por ID
    .get(protect, catalogController.getCatalogById)      
    // Solo el Admin puede modificar o eliminar
    .put(protect, authorize(['Admin']), catalogController.updateCatalog)       
    .delete(protect, authorize(['Admin']), catalogController.deleteCatalog);

module.exports = router;