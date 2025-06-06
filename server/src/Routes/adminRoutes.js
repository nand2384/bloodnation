const express = require('express');
// const multer = require('multer');
// const cors = require('cors');
const { adminLogin, fetchUsersService, fetchBloodStockService, addBankService } = require('../Models/adminModel');
const router = express.Router();

// const app = express();
// app.use(cors());

// const storage = multer.memoryStorage(); // Store file in memory for Firebase
// const upload = multer({ storage });

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const response = await adminLogin(username, password);

    res.json({ response });
});

router.get('/fetchUsers', async (req, res) => {
    const response = await fetchUsersService();

    if(response) {
        res.status(200).json(response);
    } else {
        res.status(500).json({ message: "Failed to fetch users"});
    }
});

router.get('/fetchBloodStock', async (req, res) => {
    const response = await fetchBloodStockService();

    if(response) {
        res.status(200).json(response);
    } else {
        res.status(500).json({ message: "Failed to fetch blood stock"});
    }
});

router.post('/addBank', async (req, res) => {
    try {
        const { bloodBankName, state, city, address, contactPerson, contactNumber, bankEmail, licenseNumber, licenseValidity, bloodBankCategory, password } = req.body;

        const response = await addBankService(bloodBankName, state, city, address, contactPerson, contactNumber, bankEmail, licenseNumber, licenseValidity, bloodBankCategory, password);
        
        if (response) {
            res.status(200).json({ message: "Uploaded", response });
        } else {
            res.status(500);
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;