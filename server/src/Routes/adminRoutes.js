const express = require('express');
const { adminLogin, fetchUsersService, fetchBloodStockService } = require('../Models/adminModel');

const router = express.Router();

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

module.exports = router;