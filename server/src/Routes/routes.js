const express = require("express");
const {
  loginUser,
  userRegister,
  verifyUser,
  verifyBank,
  changeUserPassword,
  bloodBankLogin,
  addBloodStock,
  fetchBloodStock
} = require("../Models/userModel.js");

const router = express.Router();

router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  const token = await loginUser(email, password);
  console.log("Response Token: ", token);

  if (token !== null && token !== false) {
    res.status(200).json({ token });
  } else if (token === null) {
    res.status(401).json({ message: "User not found", token: null });
  } else if (token === false) {
    res.status(403).json({ message: "Invalid Credentials", token: false });
  }
});


router.post("/user/register", async (req, res) => {
  const {
    firstName,
    lastName,
    fatherName,
    age,
    gender,
    bloodGroup,
    email,
    password,
  } = req.body;

  try {
    const token = await userRegister(
      firstName,
      lastName,
      fatherName,
      age,
      gender,
      bloodGroup,
      email,
      password
    );

    if (token) {
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Invalid" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/verify/user", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    const response = await verifyUser(token);

    if (response || null) {
      res.status(200).json({ response });
    } else {
      res.status(401).json({ message: "Something is wrong!" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

router.post('/add/bloodstock', async (req, res) => {
  const authHeader = req.headers.authorization;

  const bloodGroup = req.body.bloodGroup;
  const bloodType = req.body.bloodType;
  const quantity = req.body.quantity;

  if(authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    const bankData = await verifyBank(token);

    const bankName = bankData.bloodBankName;
    const city = bankData.city;
    const state = bankData.state;

    const response = await addBloodStock(bankName, city, state, bloodGroup, bloodType, quantity);

    if (response == true) {
      res.status(201).json({ message: "Data added!"});
    } else {
      res.status(401).json({ message: "Unauthorized"});
    }
  }
})

router.get('/fetch/bloodstock', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    const response = await fetchBloodStock(token);

    if(response) {
      res.status(200).json({ response });
    } else {
      res.status(404).json({ message: "No Data Found!" });
    }
  }
})

router.get("/verify/bloodbank", async (req, res) => {
  const authHeader = req.headers.authorization;

  if(authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    const response = await verifyBank(token);

    if (response) {
      res.status(200).json({ response });
    } else {
      res.status(401).json({ message: "Something is wrong!" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

router.post("/changePassword", async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  const result = await changeUserPassword(email, oldPassword, newPassword);

  if (result == 200) {
    res.status(200).json({ message: "Your Password has been Changed!" });
  } else {
    res
      .status(401)
      .json({
        message: "Invalid Password Change, please enter the correct values!",
      });
  }
});

router.post("/bloodbank/login", async (req, res) => {
  const { bankId, password } = req.body;

  console.log("BankId and Password: ", bankId, password);

  const token = await bloodBankLogin(bankId, password);
  console.log("Response Token: ", token);
  if (token) {
    res.status(200).json({ token });
  } else {
    res.status(401).json({ Boolean: false });
  }
});

module.exports = router;
