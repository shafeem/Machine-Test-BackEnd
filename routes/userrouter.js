const express = require('express');


const {
    signin,
    signup,
} = require('../controller/userController')



const router = express.Router();

router.post('/login',signin)
router.post('/signup',signup)



module.exports = router