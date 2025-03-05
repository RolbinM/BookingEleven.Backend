const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const { cert } = require("firebase-admin/app");

let dbInstance = null;

try {
  const serviceAccount = require("./firebase.json");

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: cert(serviceAccount),
    });
    dbInstance = getFirestore();
  }
} catch (error) {
  console.error("Error initializing Firebase:", error);
  process.exit(1); // Detener la aplicación si Firebase no se inicializa
}

const getDb = () => {
  if (!dbInstance) {
    dbInstance = getFirestore();
  }
  return dbInstance;
};

module.exports = {getDb};