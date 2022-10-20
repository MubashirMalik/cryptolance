const express = require('express')

const userControllers = require('../controllers/user')

const router = express.Router()

router.get('/get-user', userControllers.getUser)

router.post('/post-user', userControllers.postUser)

module.exports = router