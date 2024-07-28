const express = require("express");
const sellerContoller = require("../controller/sellerController")
const sellerAuthMiddleWare = require("../middlewares/sellerAuthMiddleWare")
const router = express.Router();



router.post("/Signup",sellerContoller.sellerSignup)
router.post("/login",sellerContoller.sellerLogin)
router.post("/addproduct",sellerAuthMiddleWare,sellerContoller.AddProducts)
router.post("/deleteproduct/:productID",sellerAuthMiddleWare,sellerContoller.deleteProducts)
router.post("/updateproduct/:productID",sellerAuthMiddleWare,sellerContoller.updateProducts)

module.exports = router;