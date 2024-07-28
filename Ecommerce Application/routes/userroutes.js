const express = require("express");
const userController = require("../controller/usercontroller")
const authMiddleWare = require("../middlewares/authmiddleware")
const router = express.Router();

router.post("/signup",userController.SignUp)

router.post("/login",userController.Login)

router.post("/logout",authMiddleWare,userController.Logout)

router.post("/forget-password",userController.forgetPassword)

router.post("/reset-password",userController.resetPassword)


module.exports = router;