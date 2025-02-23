require('dotenv').config(); //llama a la libreria dotenv para cargar las variables de entorno

//Librerias de configuraciones API
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet'); // Protege la API de ataques de XSS y clickjacking
const rateLimit = require('express-rate-limit'); // Protege la API de ataques de fuerza bruta
//const cors = require('cors');

//Rutas API
const V1Router = require('./V1/routes/mainRoutes');

// Preconfigs seguridad 
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // máximo de 100 peticiones por IP
  });

//Configuración de la API
const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());

//configs de seguridad
app.use(helmet());

app.use(limiter);

//app.use(cors());

app.use('/v1', V1Router);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});