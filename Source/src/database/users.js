const {getDb} = require("./initializer");
const db = getDb();
const { ConflictError } = require("../services/TypeHttpsResponses");



//Retorna todos los usuarios con su respectivo rol
//E: N/A
//S: Lista de usuarios con su respectivo rol || Error

async function getAllUsers() {
    try {
      const usersSnapshot = await db.collection("user").get();
      const users = await Promise.all(
        usersSnapshot.docs.map(async (doc) => {
          const userData = doc.data();
          const uroleId = userData.urole_id._path.segments[1]; 

  
          // Consultar la colección User_Role para obtener el rol
          const roleDoc = await db.collection("User_Role").doc(uroleId).get();
          const roleData = roleDoc.data();

          return {
            id: doc.id,
            ...userData,
            role: roleData ? roleData.uRole_Description : "Rol no encontrado", 
          };
        })
      );
      return users;
    } catch (error) {

      throw error; 
    }
  }

//Retorna todos los usuarios con su respectivo rol
//E: Usuario o email y contraseña
//S: id del usuario, rol del usuario || Error
  async function loginUser(usernameOrEmail, password) {
    try {

      const usersSnapshot = await db.collection("user")
        .where("user_name", "==", usernameOrEmail)
        .get();
  

      if (usersSnapshot.empty) {
        const emailSnapshot = await db.collection("user")
          .where("username", "==", usernameOrEmail)
          .get();
  
        if (emailSnapshot.empty) {
          console.log("Usuario no encontrado");
          return { success: false, message: "Usuario no encontrado" };
        }
  
        // Usar el resultado de la búsqueda por correo
        const userDoc = emailSnapshot.docs[0];
        const userData = userDoc.data();
  
        // Verificar si la contraseña coincide
        if (userData.password === password) {

          const uroleId = userData.urole_id._path.segments[1];
          const roleDoc = await db.collection("user_role").doc(uroleId).get();
          const roleData = roleDoc.data();
  
          return {
            success: true,
            message: "Inicio de sesión exitoso",
            user: {
              id: userDoc.id,
              role: roleData ? roleData.uRole_Description : "Rol no encontrado",
            },
          };
        } else {
          console.log("Contraseña incorrecta");
          return { success: false, message: "Contraseña incorrecta" };
        }
      }
  

      const userDoc = usersSnapshot.docs[0];
      const userData = userDoc.data();
  

      if (userData.password === password) {

        const uroleId = userData.urole_id._path.segments[1];
        const roleDoc = await db.collection("User_Role").doc(uroleId).get();
        const roleData = roleDoc.data();
  
        return {
          success: true,
          message: "Inicio de sesión exitoso",
          user: {
            id: userDoc.id,
            role: roleData ? roleData.uRole_Description : "Rol no encontrado",
          },
        };
      } else {
        console.log("Contraseña incorrecta");
        return { success: false, message: "Contraseña incorrecta" };
      }
    } catch (error) {

      return { success: false, message: "Error durante el inicio de sesión" };
    }
  }

//Inserta un usuario con su respectivo rol
//E: Datos del usuario
//S: id del usuario || Error
async function insertUserWithRole(userData, uroleId) {
  try {
      const { username, user_mail } = userData;


      const usernameSnapshot = await db.collection("user")
          .where("username", "==", username)
          .get();

      if (!usernameSnapshot.empty) {
          throw new ConflictError("El username ya está registrado");
      }


      const userMailSnapshot = await db.collection("user")
          .where("user_mail", "==", user_mail)
          .get();

      if (!userMailSnapshot.empty) {
          throw new ConflictError("El correo electrónico ya está registrado");
      }

      // Agregar campos adicionales
      const fullUserData = {
          ...userData,
          urole_id: `/user_role/${uroleId}`,
          state: "Active",
          sfield_favorites: [],
          create_date: new Date().toISOString(),
          update_date: new Date().toISOString(),
          verification_token: ""
      };


      await db.collection("user").add(fullUserData);

      return "Creación de usuario exitosa";
  } catch (error) {
      throw error; 
  }
}

module.exports = { getAllUsers, loginUser,insertUserWithRole };