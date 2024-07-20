const express = require("express")
const userController = require('../controller/usercontrollers')
const router = express.Router();

router.post("/app/register/user",userController.registerUser)

router.post("/app/login/user",userController.loginUser)


module.exports = router;


