const { db } = require("../../firebase.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const saltRounds = 10;

const adminLogin = async (username, password) => {
  try {
    const adminRef = db.collection("admin");
    const snapshot = await adminRef.where("username", "==", username).get();

    if (snapshot.empty) {
      return false;
    } else {
      const docRef = snapshot.docs[0];
      const data = docRef.data();
      const storedHashedPassword = data.password;
      const bcryptResult = await bcrypt.compare(password, storedHashedPassword);

      if (bcryptResult) {
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchUsersService = async () => {
  const snapshot = await db.collection("users").get();
  const users = [];

  snapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });

  return users;
};

const fetchBloodStockService = async () => {
  const snapshot = await db.collection("bloodstock").get();
  const bloodStock = [];

  snapshot.forEach((doc) => {
    bloodStock.push({ id: doc.id, ...doc.data() });
  });

  return bloodStock;
};

const addBankService = async (
  bloodBankName,
  state,
  city,
  address,
  contactPerson,
  contactNumber,
  bankEmail,
  licenseNumber,
  licenseValidity,
  bloodBankCategory,
  password
) => {
  let bankId;

  const generateUniqueBankID = async () => {
    let exists = true;

    while (exists) {
      bankId = Math.floor(100000 + Math.random() * 900000);
      try {
        const snapshot = await db
          .collection("bloodbanks")
          .where("bloodBankID", "==", bankId)
          .get();

        exists = !snapshot.empty;
      } catch (error) {
        console.log("Error checking bloodBankID: ", error);
        exists = true;
      }
    }
  };

  await generateUniqueBankID();

  let bloodBankPassword = await bcrypt.hash(password, saltRounds);

  const bloodBankData = {
    bloodBankName,
    state,
    city,
    address,
    contactPerson,
    contactNumber,
    bankEmail,
    licenseNumber,
    licenseValidity,
    bloodBankCategory,
    bankId,
    bloodBankPassword
  };

  try {
    const dbResult = await db.collection("bloodbanks").add(bloodBankData);
    return bankId;
  } catch (error) {
    console.error("Error adding blood bank data: ", error);
    return null;
  }
};


module.exports = { adminLogin, fetchUsersService, fetchBloodStockService, addBankService };