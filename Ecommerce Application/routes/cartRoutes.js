const express = require("express");
const cartController = require("../controller/carcontroller")
const authMiddleWare = require("../middlewares/authmiddleware")
const router = express.Router();

router.post("/additem",authMiddleWare,cartController.addToCart)

router.post("/deletecart",authMiddleWare,cartController.deleteCart)



module.exports  = router;