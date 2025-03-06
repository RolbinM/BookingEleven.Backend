const { validationResult } = require('express-validator');
const otpGenerator = require("otp-generator");
const { BadRequestError } = require("./TypeHttpsResponses"); 


const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return BadRequestError("Validation failed", { cause: errors.array() });
  }
  next(); 
};

//Generador de OTP de 6 digitos, para confirmar correo o olvido de contraseña
function generateNumericOTP() {
  return otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
}

module.exports ={validateRequest,generateNumericOTP};