// services/catalogService.js
const Catalog = require('../models/catalog'); // Asegúrate que el path sea correcto

// C = CREATE (Crear un nuevo catálogo)
exports.createCatalog = async (catalogData) => {
    // Aquí puedes añadir validaciones de negocio antes de guardar
    const newCatalog = new Catalog(catalogData);
    return await newCatalog.save();
};

// R = READ (Leer todos los catálogos)
exports.getAllCatalogs = async () => {
    return await Catalog.find();
};

// R = READ (Leer un catálogo por ID)
exports.getCatalogById = async (id) => {
    // findById es más eficiente que find({ _id: id }) cuando buscas por ID
    return await Catalog.findById(id); 
};

// U = UPDATE (Actualizar un catálogo)
exports.updateCatalog = async (id, updateData) => {
    // new: true devuelve el documento actualizado, no el original.
    // runValidators: true asegura que las validaciones del schema se apliquen al actualizar.
    return await Catalog.findByIdAndUpdate(id, updateData, { 
        new: true, 
        runValidators: true 
    });
};

// D = DELETE (Eliminar un catálogo)
exports.deleteCatalog = async (id) => {
    return await Catalog.findByIdAndDelete(id);
};