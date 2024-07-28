const express = require("express");
const blogControllers = require("../controller/blogcontroller")
const authMiddleWare = require("../middlewares/authmiddleware")
const router = express.Router();

router.post("/addblog",authMiddleWare,blogControllers.addBlog)
router.post("/deleteblog/:blogId",authMiddleWare,blogControllers.deleteBlog)
router.post("/updateBlog/:blogId",authMiddleWare,blogControllers.updateBlog)



module.exports = router;