// services/areaService.js
const Area = require('../models/area'); 
const Catalog = require('../models/catalog'); // Necesario para validar la referencia

// C = CREATE
exports.createArea = async (areaData) => {
    // Validación de Negocio: Asegurarse de que el Catalog ID existe
    const catalogExists = await Catalog.findById(areaData.catalog);
    if (!catalogExists) {
        // Lanza un error para ser capturado por el controlador
        const error = new Error("El ID de catálogo proporcionado no es válido.");
        error.status = 400; // Agregar un estado para manejo de errores específico
        throw error;
    }
    
    const newArea = new Area(areaData);
    return await newArea.save();
};

// R = READ ALL (Opcional: Usamos .populate() para obtener el nombre del Catálogo)
exports.getAllAreas = async () => {
    // .populate('catalog') reemplaza el ObjectId por el documento completo del Catálogo
    return await Area.find().populate('catalog', 'name'); 
};

// R = READ BY ID
exports.getAreaById = async (id) => {
    return await Area.findById(id).populate('catalog', 'name');
};

// U = UPDATE
exports.updateArea = async (id, updateData) => {
    // Si se intenta actualizar el catalog ID, validamos que exista
    if (updateData.catalog) {
        const catalogExists = await Catalog.findById(updateData.catalog);
        if (!catalogExists) {
            const error = new Error("El nuevo ID de catálogo proporcionado no es válido.");
            error.status = 400;
            throw error;
        }
    }

    return await Area.findByIdAndUpdate(id, updateData, { 
        new: true, 
        runValidators: true 
    }).populate('catalog', 'name');
};

// D = DELETE
exports.deleteArea = async (id) => {
    return await Area.findByIdAndDelete(id);
};