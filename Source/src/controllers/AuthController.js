const { generateToken, verifyCredentials } = require('../services/AuthService');

const login = async (req, res) => {
  const { username, password } = req.body;

  var data =  await verifyCredentials(username, password);
  if (data.success === false) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  const user = data.user;

  const token = generateToken(user);
  res.json({ token, user: { id: user.id, role: (user.role).toLowerCase() } });
};

module.exports = { login };