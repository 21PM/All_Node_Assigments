const express = require("express");
const wishlistController = require("../controller/wishlistcontroller")
const authMiddleWare = require("../middlewares/authmiddleware")

const router = express.Router();

router.post("/addwishlist",authMiddleWare,wishlistController.addWishList)

router.post("/deleteWishlist",authMiddleWare,wishlistController.deleteWishlist)

router.get("/wishlist",authMiddleWare,wishlistController.getWishlist)

module.exports = router;