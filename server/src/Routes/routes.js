const express = require('express');
const { loginUser, userRegister, verifyUser, changeUserPassword } = require('../Models/userModel.js');

const router = express.Router();

router.post('/user/login', async (req, res) => {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    console.log("Response Token: ", token);
    if (token) {
        res.status(200).json({ token });
    } else {
        res.status(401).json({ Boolean: false });
    }
});

router.post('/user/register', async (req, res) => {
    const { firstName, lastName, fatherName, age, gender, bloodGroup, email, password } = req.body;
    
    try {
        const token = await userRegister( firstName, lastName, fatherName, age, gender, bloodGroup, email, password );
        
        if(token) {
            res.status(200).json({ token });
        } else {
            res.status(401).json({ message: "Invalid" });
        }
    } catch (error) {
        console.log(error);
    }
});

router.get('/verify/user', async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        
        const response = await verifyUser(token);

        if (response || null) {
            res.status(200).json({ response });
        } else {
            res.status(401).json({ message: "Something is wrong!"})
        }

    } else {
        return res.status(401).json({ message: "Unauthorized" });
    }
});

router.post('/changePassword', async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;
    const result = await changeUserPassword(email, oldPassword, newPassword);

    if (result == 200) {
        res.status(200).json({ message: "Your Password has been Changed!"});
    } else {
        res.status(401).json({message: "Invalid Password Change, please enter the correct values!"})
    }
})

module.exports = router;