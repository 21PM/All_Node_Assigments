const express = require("express");
const commentController = require("../contoller/commentController")
const router = express.Router();

router.post("/addComment/:postId",commentController.addComment)

router.get('/Comment/:postId',commentController.getComment)

router.post("/updateComment/:commentId",commentController.updateComment)

router.post("/deleteComment/:commentId",commentController.deleteComment)


// router.post("/replyComment/:ToreplycommentId",commentController.replyToComment)


module.exports = router;