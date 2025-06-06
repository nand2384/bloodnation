const { db } = require("../../firebase.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const e = require("express");
dotenv.config();

const SECRET_KEY = process.env.JWT_KEY;

const saltRounds = 10;

const loginUser = async (email, password) => {
  try {
    const userRef = db.collection("users");
    const snapshot = await userRef.where("email", "==", email).get();

    if (snapshot.empty) {
      return null;
    } else {
      const userDoc = snapshot.docs[0];
      const userData = userDoc.data(); // .data() is used to separate the data from snapshot document that came back in response.

      const storedHashedPassword = userData.password;

      const compareResult = await bcrypt.compare(
        password,
        storedHashedPassword
      );

      if (compareResult) {
        const token = jwt.sign(
          { id: userDoc.id, email: userData.email },
          SECRET_KEY,
          { expiresIn: "1h" }
        );
        return token;
      } else {
        return false;
      }
    }
  } catch (error) {
    console.error("Error posting message:", error);
  }
};

const userRegister = async (
  firstName,
  lastName,
  fatherName,
  age,
  gender,
  bloodGroup,
  email,
  password
) => {
  let hashedPassword = await bcrypt.hash(password, saltRounds);

  const userRef = db.collection("users");
  const snapshot = await userRef.where("email", "==", email).get();

  if (snapshot.empty) {
    try {
      const docRef = await db.collection("users").add({
        firstName,
        lastName,
        fatherName,
        age,
        gender,
        bloodGroup,
        email,
        password: hashedPassword,
      });

      if (docRef) {
        try {
          const registeredUser = await userRef
            .where("email", "==", email)
            .get();

          if (registeredUser.empty) {
            return null;
          } else {
            const registeredUserDoc = registeredUser.docs[0];
            const registeredUserData = registeredUserDoc.data();

            try {
              const token = jwt.sign(
                { id: registeredUserDoc.id, email: registeredUserData.email },
                SECRET_KEY,
                { expiresIn: "1h" }
              );
              console.log("Signed reg token: ", token);
              return token;
            } catch (error) {
              console.log("Error generating token: ", error);
            }
          }
        } catch (error) {
          console.log("Error fetching the registered user: ", error);
        }
      }
    } catch (error) {
      console.log("user Model Data sending:", error);
    }
  } else {
    return "There is a user with this email address, please login!";
  }
};

const verifyUser = async (token) => {
  const payload = jwt.decode(token, SECRET_KEY);
  const email = payload.email;
  const docId = payload.id;

  const docRef = db.collection("users").doc(docId);
  const doc = await docRef.get();

  const data = doc.data();

  if (data.email == email) {
    return data;
  } else {
    return "There is no user with that email!";
  }
};

const verifyBank = async (token) => {
  const payload = jwt.decode(token, SECRET_KEY);
  const docId = payload.id;
  const bankId = payload.bankId;

  const docRef = db.collection("bloodbanks").doc(docId);
  const doc = await docRef.get();

  const data = doc.data();

  if (data.bankId == bankId) {
    return data;
  } else {
    return null;
  }
};

const changeUserPassword = async (email, oldPassword, newPassword) => {
  try {
    const userRef = db.collection("users");
    const snapshot = await userRef.where("email", "==", email).get();

    const docRef = snapshot.docs[0];
    const data = docRef.data();

    const storedHashedPassword = data.password;
    let newHashedPassword;
    let comparedResult;
    try {
      comparedResult = await bcrypt.compare(oldPassword, storedHashedPassword);

      if (comparedResult) {
        try {
          newHashedPassword = await bcrypt.hash(newPassword, saltRounds);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("The Password didn't match!");
      }

      try {
        const updateDocRef = db.collection("users").doc(docRef.id);
        console.log("Breakpoint, docref.id: ", docRef.id);
        console.log("Breakpoint 2 newHashedPassword:", newHashedPassword);

        const updatingDocResult = await updateDocRef.update({
          password: newHashedPassword,
        });

        if (updateDocRef) {
          return "200";
        }
      } catch (error) {
        console.log("Updating Doc Error: ", error);
      }
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log("userModel changePassword Error: ", error);
  }
};

const bloodBankLogin = async (bankId, password) => {
  try {
    const bankRef = db.collection("bloodbanks");
    const snapshot = await bankRef.where("bankId", "==", Number(bankId)).get();

    if (snapshot.empty) {
      return null;
    } else {
      const bankDoc = snapshot.docs[0];
      const bankData = bankDoc.data(); // .data() is used to separate the data from snapshot document that came back in response.

      const storedHashedPassword = bankData.bloodBankPassword;

      const compareResult = await bcrypt.compare(
        password,
        storedHashedPassword
      );

      if (compareResult) {
        const token = jwt.sign(
          { id: bankDoc.id, bankId: bankData.bankId },
          SECRET_KEY,
          { expiresIn: "1h" }
        );
        console.log("Token: ", token);
        return token;
      } else {
        return "Please enter the correct password!";
      }
    }
  } catch (error) {
    console.log("MAIN ERROR: ", error);
  }
};

const addBloodStock = async (
  bankName,
  city,
  state,
  bloodGroup,
  bloodType,
  quantity
) => {
  try {
    const docRef = await db.collection("bloodstock").add({
      bloodBankName: bankName,
      city,
      state,
      bloodGroup,
      bloodType,
      quantity,
    });

    if (docRef) {
      return true;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Adding Bank Data Error: ", error);
  }
};

const fetchBloodStock = async (token) => {
  try {
    const bloodStock = [];
    const bankData = await verifyBank(token);

    const bloodBankName = bankData.bloodBankName;

    const snapshot = await db.collection("bloodstock").where("bloodBankName", "==", bloodBankName).get();

    snapshot.forEach((doc) => {
      bloodStock.push({ id: doc.id, ...doc.data() });
    });

    return bloodStock;

  } catch (error) {
    console.log("Error fetching blood stock: ", error);
  }
};

module.exports = {
  loginUser,
  userRegister,
  verifyUser,
  changeUserPassword,
  bloodBankLogin,
  verifyBank,
  addBloodStock,
  fetchBloodStock,
};
