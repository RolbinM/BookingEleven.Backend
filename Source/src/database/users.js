const {getDb} = require("./initializer");
const db = getDb();
const { ConflictError,ForbiddenError,UnauthorizedError,NotFoundError } = require("../services/TypeHttpsResponses");
const {generateNumericOTP}  = require('../services/Utils'); 



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
      const { username, mail } = userData;

      
      const usernameSnapshot = await db.collection("user")
          .where("username", "==", username)
          .get();

      if (!usernameSnapshot.empty) {
          throw new ConflictError("El username ya está registrado");
      }


      const userMailSnapshot = await db.collection("user")
          .where("mail", "==", mail)
          .get();

      if (!userMailSnapshot.empty) {
          throw new ConflictError("El correo electrónico ya está registrado");
      }

      const token = generateNumericOTP();
      const roleRef = db.collection("user_role").doc(uroleId);

      // Agregar campos adicionales
      const fullUserData = {
          ...userData,
          urole_id: roleRef,
          state: "Pending",
          sfield_favorites: [],
          create_date: new Date(),
          update_date: new Date(),
          verification_token: token
      };


       const response = await db.collection("user").add(fullUserData);

      return {message: "Creación de usuario exitosa", id: response.id};
  } catch (error) {
      throw error; 
  }
}



//Registra  un usuario con su respectivo rol de manera automata
//E: Datos del usuario
//S: id del usuario || Error
async function Register(userData, uroleId) {
  try {
      const { username, user_mail } = userData;
      const now = new Date();
      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

      // Buscar por username o email
      const userQuery = await db.collection("user")
          .where("username", "==", username)
          .get();

      const mailQuery = await db.collection("user")
          .where("user_mail", "==", user_mail)
          .get();

      let existingUser = null;

      if (!userQuery.empty) {
          existingUser = userQuery.docs[0]; // Tomamos el primer usuario encontrado
      } else if (!mailQuery.empty) {
          existingUser = mailQuery.docs[0];
      }

      if (existingUser) {
          const userData = existingUser.data();

          if (userData.state === "Pending" && userData.update_date.toDate() < fiveMinutesAgo) {
              // Si está en estado Pending y han pasado más de 5 minutos, eliminar y continuar con la creación
              await db.collection("user").doc(existingUser.id).delete();
          } else {
              // Si no está en estado Pending o no han pasado más de 5 minutos, lanzar error
              throw new ConflictError("El usuario ya está registrado con este correo o username");
          }
      }
      const roleRef = db.collection("user_role").doc(uroleId);
      const token = generateNumericOTP();

      // Agregar campos adicionales
      const fullUserData = {
          ...userData,
          urole_id: roleRef,
          state: "Pending",
          sfield_favorites: [],
          create_date: now,
          update_date: now,
          verification_token: token
      };

      const response = await db.collection("user").add(fullUserData);

      return { message: "Creación de usuario exitosa", id: response.id };
  } catch (error) {
      throw error;
  }
}



//Verifica que el usuario tiene el token correcto con acceso al correo ingresado
//E: id del usuario, token de verificación
//S: Mensaje de verificación || Error
async function verifyUserOTPMail(userId, otpToken) {
  try {
      const userDocRef = db.collection("user").doc(userId);
      const userDoc = await userDocRef.get();

      if (!userDoc.exists) {
          throw new NotFoundError("Usuario no encontrado");
      }

      const userData = userDoc.data();
      const currentTime = new Date();
      const updateTime = userData.update_date.toDate();
      const timeDifference = (currentTime - updateTime) / (1000 * 60); // Diferencia en minutos

      if (timeDifference > 5) {
          throw new UnauthorizedError("El token ha expirado");
      }

      if (userData.verification_token !== otpToken) {
        throw new ForbiddenError("Token OTP inválido");
      }

      await userDocRef.update({
          state: "Active",
          update_date: new Date()
      });

      return "Usuario verificado exitosamente";
  } catch (error) {
      throw error;
  }
}

// Regenera el OTP de un usuario
// E: id del usuario
// S: Mensaje de éxito || Error
async function regenerateOTP(userId) {
  try {
      const userDocRef = db.collection("user").doc(userId);
      const userDoc = await userDocRef.get();

      if (!userDoc.exists) {
          throw new NotFoundError("Usuario no encontrado");
      }

      const newOTP = generateNumericOTP(); // Genera un nuevo OTP
      const currentTime = new Date();

      await userDocRef.update({
          verification_token: newOTP,
          update_date: currentTime
      });

      return "OTP regenerado exitosamente";
  } catch (error) {
      throw error;
  }
}


//Actualiza los datos de un usuario
//E: id del usuario, datos a actualizar
//S: Mensaje de éxito || Error
async function updateUser(userId, updateData) {
  try {
      const userRef = db.collection("user").doc(userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
          throw new NotFoundError("Usuario no encontrado");
      }

      const updates = {};


      if (updateData.username) updates.username = updateData.username;
      if (updateData.first_name) updates.first_name = updateData.first_name;
      if (updateData.last_name) updates.last_name = updateData.last_name;
      if (updateData.password) updates.password = updateData.password;
      if (updateData.role) updates.urole_id = `/user_role/${updateData.role}`;
      if (updateData.mail) updates.user_mail = updateData.mail;
      if (updateData.phone) updates.user_phone = updateData.phone;
      if (updateData.gender) updates.gender = updateData.gender;
      if (updateData.city) updates.city = updateData.city;
      if (updateData.address) updates.address = updateData.address;

      if (Object.keys(updates).length > 0) {
        updates.update_date = new Date(); 
        await userRef.update(updates);
        return { message: "Usuario actualizado exitosamente", id: userId };
      } else {
          return { message: "No se realizaron cambios", id: userId };
      }
  } catch (error) {
      throw error;
  }
}

//Elimina un usuario
//E: id del usuario
//S: Mensaje de éxito || Error
async function deleteUserById(userId) {
  try {
      const userRef = db.collection("user").doc(userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
          throw new Error("Usuario no encontrado");
      }

      await userRef.delete();

      return { message: "Usuario eliminado exitosamente", id: userId };
  } catch (error) {
      throw error;
  }
}

module.exports = { getAllUsers, loginUser,insertUserWithRole, deleteUserById,
                  verifyUserOTPMail, regenerateOTP,Register,updateUser };