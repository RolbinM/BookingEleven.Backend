const { getUsers, createUser,VerifyFirstTimeUser,RegenerateOTP,updateUsers ,
  deleteUser
} = require('../services/UsersService');


//Se encarga de obtener todos los usuarios
const UsersList = async (req, res) => {
  try {
    const users = await getUsers();
    res.json({ users });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

//Se encarga de crear un usuario
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

//Se encarga de registrar un usuario
const RegisterUsers = async (req, res) => {
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


//Se encarga de actualizar un usuario
const UpdateUsers = async (req, res) => {
  try {
    const user = req.body;
    const response = await updateUsers(user);
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


//Se encarga de eliminar un usuario
const DeleteUsers = async (req, res) => {
  try {
    const user = req.body;
    const response = await deleteUser(user);
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


//Se encarga de verificar que el usuario sea un usuario nuevo, pasa de pendiente a activo
const  FirstTimeUserVerification = async (req, res) => {
  try {
    const data = req.body;
    const response = await VerifyFirstTimeUser(data);
    res.json({ response });
  } catch (error) {
    if (error.name && error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.error("Error al verificar usuario:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}


//Se encarga de regenerar el codigo de verificacion
const RegenerateOTPS = async (req, res) => {
  try {
    const data = req.body;
    const response = await RegenerateOTP(data);
    res.json({ response });
  } catch (error) {
    if (error.name && error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.error("Error al verificar usuario:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

  
  module.exports = { UsersList,CreateUsers, FirstTimeUserVerification,RegenerateOTPS,RegisterUsers,UpdateUsers,DeleteUsers};