const { db } = require("../../firebase.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const SECRET_KEY = process.env.JWT_KEY;

const saltRounds = 10;

const loginUser = async (email, password) => {
  try {
    const userRef = db.collection("users");
    const snapshot = await userRef
      .where("email", "==", email)
      .get();

    if (snapshot.empty) {
      return null;
    }
    else {
      const userDoc = snapshot.docs[0];
      const userData = userDoc.data(); // .data() is used to separate the data from snapshot document that came back in response.

      const storedHashedPassword = userData.password;

      const compareResult = await bcrypt.compare(password, storedHashedPassword);

      if (compareResult) {
        const token = jwt.sign({ id: userDoc.id, email: userData.email }, SECRET_KEY, { expiresIn: '1h' });
        console.log("Token: ", token);
        return token;
      } else {
        return null;
      }
    }
  } catch (error) {
    console.error("Error posting message:", error);
  }
};

const userRegister = async (firstName, lastName, fatherName, age, gender, bloodGroup, email, password) => {
  let hashedPassword;

  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      console.log("Error hashing password: ", err);
    } else {
      hashedPassword = hash;
    }
  })

    const userRef = db.collection("users");
    const snapshot = await userRef
    .where ("email", "==", email)
    .get();  
    
    if(snapshot.empty) {
      try {
        const docRef = await db.collection("users").add({
          firstName, 
          lastName, 
          fatherName, 
          age, 
          gender, 
          bloodGroup, 
          email, 
          password: hashedPassword
        });
        
        if(docRef) {
          try {
            const registeredUser = await userRef
            .where ("email", "==", email)
            .get();

            if(registeredUser.empty) {
              return null
            } else {
              const registeredUserDoc = registeredUser.docs[0];
              const registeredUserData = registeredUserDoc.data();

              try {
                const token = jwt.sign({ id: registeredUserDoc.id, email: registeredUserData.email }, SECRET_KEY, { expiresIn: '1h' });
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
      return 'user';
    }
};

const verifyUser = async (token) => {
  const payload = jwt.decode(token, SECRET_KEY);
  const email = payload.email;
  const docId = payload.id;

  const docRef = db.collection("users").doc(docId);
  const doc = await docRef.get();

  const data = doc.data();

  if(data.email == email) {
    return data;
  } else {
    return null;
  }
};

const changeUserPassword = async (email, oldPassword, newPassword) => {
  try {
    const userRef = db.collection("users");
    const snapshot = await userRef
    .where("email", "==", email)
    .get();

    const docRef = snapshot.docs[0];
    const data = docRef.data();
    
    const storedHashedPassword = data.password;
    let newHashedPassword;
    let comparedResult;
    try {
      comparedResult = await bcrypt.compare(oldPassword, storedHashedPassword);

      if(comparedResult) {
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
          password: newHashedPassword
        });

        if(updateDocRef) {
          return '200';
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
}

module.exports = { loginUser, userRegister, verifyUser, changeUserPassword };