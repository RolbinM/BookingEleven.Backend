const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
};

const verifyCredentials = (username, password) => {
  // Lógica para verificar las credenciales del usuario
  const mockUser = {
    id: 1,
    username: 'Rivel',
    password: 'lr',
    role: 'admin'
  }; //tmp para pruebas

  return username === mockUser.username && password === mockUser.password 
    ? mockUser 
    : null;
};

module.exports = { generateToken, verifyCredentials };