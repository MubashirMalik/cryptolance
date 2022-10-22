const express = require('express')

const userControllers = require('../controllers/user')

const router = express.Router()

router.get('/get-user', userControllers.getUser)

router.get('/get-freelancers', userControllers.getFreelancers)

router.post('/post-user', userControllers.postUser)

module.exports = router