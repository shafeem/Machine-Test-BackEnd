const express = require('express');


const {
    signin,
    signup,
    createCourse,
} = require('../controller/userController')



const router = express.Router();

router.post('/login',signin)
router.post('/signup',signup)
router.post('/create-course',createCourse)



module.exports = router