const express = require("express");
const fileController = require("../controller/filecontroller")
const AuthMiddleWare = require("../middlewares/authmiddleware")
const router = express.Router();

router.post("/app/file",AuthMiddleWare,fileController.uploadFile)

router.get("/app/file/:fileId",AuthMiddleWare,fileController.shareAbleLink)

router.get("/app/file/download/:fileID",AuthMiddleWare,fileController.downloadFile)

router.get("/app/file/download/:fileID",AuthMiddleWare,fileController.downloadFile)

module.exports = router;

