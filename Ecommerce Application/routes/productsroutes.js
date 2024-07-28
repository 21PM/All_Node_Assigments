const express = require("express");
const productController = require("../controller/productcontroller")

const router = express.Router();


router.get("/list",productController.getProdcuts)


module.exports = router;