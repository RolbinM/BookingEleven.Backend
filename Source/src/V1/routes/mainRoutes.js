
const express = require('express');
const router = express.Router();
const {verifyJWT,verifyAdmin} = require('../../middlewares/TokenAuthentication'); // solo usar siempre es el que verifica la autentificación
const verifyHMAC = require('../../middlewares/TokenIntegrity'); // solo usar si el endpoint requiere integridad de datos
const rateLimit = require('express-rate-limit'); // protege la API de ataques de fuerza bruta
const { check } = require('express-validator'); //validaciones de campos, protege la API de inyecciones SQL
const { BadRequestError } = require("../../services/TypeHttpsResponses"); 


//LLamada a la logica de las rutas controllers
const { login } = require('../../controllers/AuthController');
const { SoccersFieldsInformation } = require('../../controllers/FieldsController');
const { UsersList,CreateUsers,FirstTimeUserVerification,RegenerateOTPS ,RegisterUsers,UpdateUsers,
    DeleteUsers
} = require('../../controllers/UsersController');
const  {validateRequest,generateNumericOTP}  = require('../../services/Utils'); //validaciones de campos, protege la API de inyecciones SQL - Funcion auxiliar


//configs de seguridad
const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutos
    max: 5, // permite 5 intentos de inicio de sesión
    message: 'Demasiados intentos fallidos. Por favor, intenta de nuevo más tarde.'
  });

//Rutas de la API


//pruebas
router
    .get("/prueba", (req, res) => {
    const otp = generateNumericOTP();
    res.json({ otp }); 
  })
    
    ;
    

//UTILS
router

    .post(
        "/login",
        [
        check('password').isLength({ min: 4 }).withMessage('La contraseña debe tener al menos 4 caracteres'),
        check('username')
            .custom(value => {
                if (!value.includes('@') && !/^\w+$/.test(value)) {
                    throw new BadRequestError('El usuario debe ser un nombre de usuario válido o un email');
                }
                return true;
            })
        ],
       // loginLimiter, 
        validateRequest, 
        login 
    )

    .post(
        "/register",
        verifyHMAC,
        [
            check('user_name')
                .isString()
                .notEmpty()
                .withMessage('El nombre de usuario es obligatorio'),

            check('first_name')
                .isString()
                .notEmpty()
                .withMessage('El primer nombre es obligatorio'),

            check('last_name')
                .isString()
                .notEmpty()
                .withMessage('El apellido es obligatorio'),

            check('password')
                .isLength({ min: 6 })
                .withMessage('La contraseña debe tener al menos 6 caracteres'),

            check('role')
                .isString()
                .notEmpty()
                .withMessage('El rol es obligatorio'),

            check('mail')
                .isEmail()
                .withMessage('Debe ser un correo electrónico válido'),

            check('phone')
                .isMobilePhone()
                .withMessage('Debe ser un número de teléfono válido'),

            check('gender')
                .isIn(['male', 'female', 'other'])
                .withMessage('El género debe ser male, female o other'),

            check('city')
                .isString()
                .notEmpty()
                .withMessage('La ciudad es obligatoria'),

            check('address')
                .isString()
                .notEmpty()
                .withMessage('La dirección es obligatoria')
        ],
        validateRequest, 
        RegisterUsers
    )
    
    .post(
        "/verifyFirstToken",
        verifyHMAC,
        [        
        check("id")
            .notEmpty()
            .withMessage("El ID del usuario es obligatorio"),
        check("token")
            .notEmpty()
            .withMessage("El código de verificación es obligatorio"),
        ],
        validateRequest,
        FirstTimeUserVerification
    )

    .post(
        "/regenerateOTP",
        verifyHMAC,
        [        
            check("id")
                .notEmpty()
                .withMessage("El ID del usuario es obligatorio")
        ],
        validateRequest,
        RegenerateOTPS
    )
    ;


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
        [
            check('user_name')
                .isString()
                .notEmpty()
                .withMessage('El nombre de usuario es obligatorio'),

            check('first_name')
                .isString()
                .notEmpty()
                .withMessage('El primer nombre es obligatorio'),

            check('last_name')
                .isString()
                .notEmpty()
                .withMessage('El apellido es obligatorio'),

            check('password')
                .isLength({ min: 6 })
                .withMessage('La contraseña debe tener al menos 6 caracteres'),

            check('role')
                .isString()
                .notEmpty()
                .withMessage('El rol es obligatorio'),

            check('mail')
                .isEmail()
                .withMessage('Debe ser un correo electrónico válido'),

            check('phone')
                .isMobilePhone()
                .withMessage('Debe ser un número de teléfono válido'),

            check('gender')
                .isIn(['male', 'female', 'other'])
                .withMessage('El género debe ser male, female o other'),

            check('city')
                .isString()
                .notEmpty()
                .withMessage('La ciudad es obligatoria'),

            check('address')
                .isString()
                .notEmpty()
                .withMessage('La dirección es obligatoria')
        ],
        validateRequest, 
        CreateUsers
    )

    .patch(
        "/users",
        verifyJWT,
        verifyAdmin,
        [        
            check("id")
                .notEmpty()
                .withMessage("El ID del usuario es obligatorio")
        ],
        validateRequest,
        UpdateUsers
    )

    .delete(
        "/users",
        verifyJWT,
        verifyAdmin,
        [        
            check("id")
                .notEmpty()
                .withMessage("El ID del usuario es obligatorio")
        ],
        validateRequest,
        DeleteUsers
    )
    ;

module.exports = router;