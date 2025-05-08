const { db } = require("../../firebase.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const adminLogin = async (username, password) => {
    try {
        const adminRef = db.collection("admin");
        const snapshot = await adminRef
            .where("username", "==", username)
            .get();

        if(snapshot.empty) {
            return false;
        } else {
            const docRef = snapshot.docs[0];
            const data = docRef.data();
            const storedHashedPassword = data.password;
            const bcryptResult = await bcrypt.compare(password, storedHashedPassword);

            if(bcryptResult) {
                return true;
            } else {
                return false;
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const fetchUsersService = async () => {
    const snapshot = await db.collection('users').get();
    const users = [];

    snapshot.forEach(doc => {
        users.push({ id: doc.id, ...doc.data() });
    });

    return users;
}

const fetchBloodStockService = async () => {
    const snapshot = await db.collection('bloodstock').get();
    const bloodStock = [];

    snapshot.forEach(doc => {
        bloodStock.push({ id: doc.id, ...doc.data()});
    });

    return bloodStock;
}

module.exports = { adminLogin, fetchUsersService, fetchBloodStockService }