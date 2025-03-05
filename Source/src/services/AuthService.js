const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const { loginUser } = require('../database/users');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: (user.role).toLowerCase() },
    JWT_SECRET,
    { expiresIn: '10h' }
  );
};

const verifyCredentials = async (username, password) => {
  // Lógica para verificar las credenciales del usuario

  var user  = await loginUser(username,password);

  return user;
};

module.exports = { generateToken, verifyCredentials };