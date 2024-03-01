const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
// For Defining the End point of the Sign up
router.post('/SignUp', authController.SignUp);
// Login
router.post('/login', authController.SignIn);
module.exports = router;
