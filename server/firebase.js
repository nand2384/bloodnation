var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bloodnation-6c07d-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.firestore();

module.exports = { admin, db };