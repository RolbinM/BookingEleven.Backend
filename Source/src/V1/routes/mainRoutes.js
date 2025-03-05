
const express = require('express');
const router = express.Router();
const {verifyJWT,verifyAdmin} = require('../../middlewares/TokenAuthentication'); // solo usar siempre es el que verifica la autentificación
const verifyHMAC = require('../../middlewares/TokenIntegrity'); // solo usar si el endpoint requiere integridad de datos
const rateLimit = require('express-rate-limit'); // protege la API de ataques de fuerza bruta
const { check } = require('express-validator'); //validaciones de campos, protege la API de inyecciones SQL


//LLamada a la logica de las rutas controllers
const { login } = require('../../controllers/AuthController');
const { SoccersFieldsInformation } = require('../../controllers/FieldsController');
const { UsersList,CreateUsers } = require('../../controllers/UsersController');
const  validateRequest  = require('../../services/Utils'); //validaciones de campos, protege la API de inyecciones SQL - Funcion auxiliar


//configs de seguridad
const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutos
    max: 5, // permite 5 intentos de inicio de sesión
    message: 'Demasiados intentos fallidos. Por favor, intenta de nuevo más tarde.'
  });

//Rutas de la API
router
    .get("/",verifyJWT,(req, res) => {
        res.json({ message: 'Hello World!' });
    })
    
    .post("/",verifyJWT,verifyHMAC,(req, res) => {
        res.json({ message: 'Hello World!' });
    })//ejemplo de uso diferentes llamados [POST,GET,PUT,DELETE] en la misma ruta
    ;
    

//Login
router

    .post(
        "/login",
        [
        check('password').isLength({ min: 2 }).withMessage('La contraseña debe tener al menos 2 caracteres')
        ],
       // loginLimiter, 
        validateRequest, 
        login 
    );


// Fields
router
    .get(
        "/fields",
        verifyJWT,
        verifyAdmin,
        SoccersFieldsInformation
    );


// Users
router
    .get(
        "/users",
        verifyJWT,
        verifyAdmin,
        UsersList
    )
    
    .post(
        "/users",
        verifyJWT,
        verifyHMAC,
        verifyAdmin,
        CreateUsers
    )
    ;

module.exports = router;