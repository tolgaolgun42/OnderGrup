const express = require('express');
const multer = require('multer');
const fileController = require('../controllers/fileController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const upload = multer();

const router = express.Router();

router.post('/upload', authMiddleware, upload.single('file'), fileController.uploadFile);
router.get('/download', authMiddleware, fileController.downloadFile);

module.exports = router;
