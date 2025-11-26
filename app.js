// app.js

// 1. Cargar Variables de Entorno (siempre al inicio)
require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const app = express();

// --- 2. FUNCIÓN DE CONEXIÓN A MONGOOSE ---

const DB_URI = process.env.MONGO_URI; 

const connectDB = async () => {
    try {
        if (!DB_URI) {
            console.error('❌ Error: La variable MONGO_URI no está definida en .env');
            process.exit(1);
        }

        await mongoose.connect(DB_URI, {
            // Se eliminan useNewUrlParser y useUnifiedTopology por ser obsoletas en Mongoose 6+
        });

        console.log('🎉 MongoDB Atlas conectado exitosamente.');

    } catch (error) {
        console.error('❌ Error de conexión a MongoDB:', error.message);
        process.exit(1);
    }
};

// Invocación de la conexión a la base de datos
connectDB();


// --- 3. MIDDLEWARE DE APLICACIÓN ---

// Permite a Express leer el cuerpo de la solicitud como JSON
app.use(express.json()); 


// --- 4. CONFIGURACIÓN DE RUTAS ---

// Importar todos los routers
const catalogRoutes = require('./routes/catalogRoutes'); 
const difficultyRoutes = require('./routes/levelDifficultyRoutes'); 
const areaRoutes = require('./routes/areaRoutes'); // <-- NUEVO

// Ruta base
app.get('/', (req, res) => {
    res.send('Servidor Express funcionando y conectado a MongoDB.');
});

// Conectar las rutas
app.use('/api/catalogs', catalogRoutes); 
app.use('/api/difficulty', difficultyRoutes); 
app.use('/api/areas', areaRoutes); // <-- NUEVO


// --- 5. INICIO DEL SERVIDOR ---

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));