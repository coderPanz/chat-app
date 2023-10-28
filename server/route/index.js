const express = require('express')
const router = express.Router()
const uploadImg = require('../control/image-message.js')
const multer = require('multer')
const path = require('path');

// 指定上传文件的存储路径
// const uploadDir = path.join(__dirname, '../../public/uploads/images')
// 注意需要在存放目录的结尾加一个 '/'符号, 否则会在上一个目录下创建
const uploadDir = path.join(__dirname, '../../public/uploads/images/');
const upload = multer({ dest: uploadDir })

console.log(uploadDir)
router.post("/sent-message/image-message", upload.single('image'), uploadImg);

module.exports = router;
