const uploads = require('../multer')
const express = require('express')

const messageControllers = require('../controllers/message')

const router = express.Router()

router.get('/get-messages/:projectId', messageControllers.getMessages)

router.post('/post-file', uploads.single('file'), messageControllers.postFile)

router.get('/download-file/:messageId', messageControllers.downloadFile)

router.post('/post-message', messageControllers.postMessage)

module.exports = router