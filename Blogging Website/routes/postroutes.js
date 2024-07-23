const express = require("express");
const postController = require("../contoller/postscontroller")
const router = express.Router();

router.post("/addpost",postController.addPost)
router.post("/updatepost/:postId",postController.updatePost)
router.post("/deletepost/:postId",postController.deletePost)
router.get("/posts",postController.getPosts)


module.exports = router;

