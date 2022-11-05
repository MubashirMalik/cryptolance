const express = require('express')

const messageControllers = require('../controllers/message')

const router = express.Router()

router.get('/get-messages/:projectId', messageControllers.getMessages)

router.post('/post-message', messageControllers.postMessage)

module.exports = router