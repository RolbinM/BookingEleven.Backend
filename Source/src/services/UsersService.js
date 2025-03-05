const { getAllUsers,insertUserWithRole } = require("../database/users");
const { getRoleIdByDescription } = require("../database/role");


const getUsers = async () => {
    const users = await getAllUsers();
    return users;
  };


//E: Objeto con los datos del usuario
//E: {user_name: "nombre", first_name: "nombre", last_name: "apellido", password: "contraseña", role: "rol",
//  mail: "correo", phone: "telefono", gender: "genero", state: "estado", city: "ciudad", address: "direccion"
//  creation_date: "fecha de creacion", update_date: "fecha de actualizacion", verification_token: "codigo de verificacion"}
//S: Usuario creado || Error
const createUser = async (user) => {
    try {
      //quita el role de los datos
      const { role, ...userData } = user;

      const roleId = await getRoleIdByDescription(role);

      return await insertUserWithRole(userData, roleId);
    } catch (error) {
        throw error;
    }
}

module.exports = { getUsers,createUser };