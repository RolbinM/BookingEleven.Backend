const {getDb} = require("./initializer");
const db = getDb();
const { NotFoundError } = require("../services/TypeHttpsResponses");

//Busca y retorna el ID del rol por descripción
//E: Descripción del rol
//S: ID del rol || Rol no encontrado

async function getRoleIdByDescription(roleDescription) {
    try {
        const rolesSnapshot = await db.collection("user_role").where("uRole_Description", "==", roleDescription.toLowerCase()).get();
        if (!rolesSnapshot.empty) {
            const roleDoc = rolesSnapshot.docs[0];
            return roleDoc.id; 
        } else {
            throw new NotFoundError("Rol no encontrado");
        }
    } catch (error) {
        throw error;
    }
}

module.exports = { getRoleIdByDescription };