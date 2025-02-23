const { generateToken, verifyCredentials } = require('../services/AuthService');

const login = (req, res) => {
  const { username, password } = req.body;

  const user = verifyCredentials(username, password);
  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const token = generateToken(user);
  res.json({ token, user: { id: user.id, username: user.username } });
};

module.exports = { login };