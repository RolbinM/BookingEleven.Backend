const { getAllUsers,insertUserWithRole,regenerateOTP,verifyUserOTPMail,
  updateUser, deleteUserById } = require("../database/users");
const { getRoleIdByDescription } = require("../database/role");


const getUsers = async () => {
    const users = await getAllUsers();
    return users;
  };


//E: Objeto con los datos del usuario
//E: {user_name: "nombre", first_name: "nombre", last_name: "apellido", password: "contraseña", role: "rol",
//  mail: "correo", phone: "telefono", gender: "genero", city: "ciudad", address: "direccion"}
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


//E: Objeto con los datos del usuario
//E: {user_name: "nombre", first_name: "nombre", last_name: "apellido", password: "contraseña", role: "rol",
//  mail: "correo", phone: "telefono", gender: "genero", city: "ciudad", address: "direccion"}
//S: Usuario creado || Error
const RegisterUser = async (user) => {
  try {
    //quita el role de los datos
    const { role, ...userData } = user;

    const roleId = await getRoleIdByDescription(role);

    return await insertUserWithRole(userData, roleId);
  } catch (error) {
      throw error;
  }
}


//E: Objeto con los datos del usuario
//E: { id:"id", user: {user_name: "nombre", first_name: "nombre", last_name: "apellido", password: "contraseña", role: "rol",
//  mail: "correo", phone: "telefono", gender: "genero", city: "ciudad", address: "direccion"} }
//S: Usuario creado || Error
const updateUsers = async (data) => {
  try {


    const roleId = await updateUser(data.id, data.user);

    return await insertUserWithRole(userData, roleId);
  } catch (error) {
      throw error;
  }
}


//Objeto  ID del usuario
//E: {id: "id del usuario"}
//S: Usuario Eliminado || Error
const deleteUser = async (data) => {
    try {

      return await deleteUserById(data.id);
    } catch (error) {
        throw error;
    }
}



//E: Objeto  ID del usuario y el token de verificacion
//E: {id: "id del usuario", token: "codigo de verificacion"}
//S: Usuario Aprobado || Error
const VerifyFirstTimeUser = async (data) => {
    try {

      return await verifyUserOTPMail(data.id, data.token);
    } catch (error) {
        throw error;
    }
}


//E: Objeto  ID del usuario
//E: {id: "id del usuario"}
//S: Usuario Aprobado || Error
const RegenerateOTP = async (data) => {
    try {
      return await regenerateOTP(data.id);
    } catch (error) {
        throw error;
    }
}



module.exports = { getUsers,createUser,VerifyFirstTimeUser,RegenerateOTP,RegisterUser, updateUsers
  ,deleteUser
};