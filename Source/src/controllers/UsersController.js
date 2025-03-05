
const { response } = require('express');
const { getUsers, createUser } = require('../services/UsersService');

const UsersList = async (req, res) => {
  try {
    const users = await getUsers();
    res.json({ users });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

const CreateUsers = async (req, res) => {
  try {
    const user = req.body;
    const response = await createUser(user);
    res.json({ response });
  }
  catch (error) {
      if (error.name && error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
      } else {
          console.error("Error al crear usuario:", error);
          res.status(500).json({ error: "Error interno del servidor" });
      }
    }
};
  
  module.exports = { UsersList,CreateUsers };