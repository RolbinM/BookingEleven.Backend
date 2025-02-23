const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; 

//Verifica que el token JWT sea válido y no haya expirado
//E: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
//S: 401 Error: Token JWT faltante || Token inválido o expirado. 
//Continua con la ejecución si el token es válido.
const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; 
  if (!token) {
    return res.status(401).json({ error: 'Token JWT faltante' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido o expirado' });
    }
    req.user = decoded; 
    next();
  });
};

module.exports = verifyJWT;