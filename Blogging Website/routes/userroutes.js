const express = require("express")
const userController = require("../contoller/usercontroller")
const authMiddleWare = require("../middlewares/authmiddleware")
const router = express.Router();


router.post("/Signup",userController.signUp)

router.post("/login",userController.Login)

router.post("/logout",authMiddleWare,userController.Logout)



module.exports = router;
